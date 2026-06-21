import { Component, signal } from '@angular/core';
import type { Product } from '../../types/types';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products-list',
  imports: [ProductCard],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {
  productsByCategory = signal<{ category: string; products: Product[] }[]>([]);

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
