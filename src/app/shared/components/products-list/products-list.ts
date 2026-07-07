import { Component, inject, signal, type OnInit } from '@angular/core';
import type { Product } from '../../types/types';
import { ProductCard } from '../product-card/product-card';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-products-list',
  imports: [ProductCard],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList implements OnInit {
  private supabaseService = inject(SupabaseService);

  products = signal<Product[]>([]);
  productsByCategory = signal<{ category: string; products: Product[] }[]>([]);

  ngOnInit(): void {
    this.loadProducts().then(() => {
      this.groupProductsByCategory(this.products());
      console.table(this.productsByCategory());
    });
  }

  async loadProducts() {
    try {
      const data = await this.supabaseService.getProducts();
      this.products.set(data);

      console.table(this.products());
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  groupProductsByCategory(products: Product[]) {
    const categories = [
      ...new Set(
        products.map((product) => {
          return product.category;
        }),
      ),
    ];
    this.productsByCategory.set(
      categories.map((category) => {
        return {
          category,
          products: products.filter((product) => product.category === category),
        };
      }),
    );
  }
}
