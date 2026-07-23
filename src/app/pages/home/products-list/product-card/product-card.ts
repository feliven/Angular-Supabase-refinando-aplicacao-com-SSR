import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import type { Product } from '../../../../shared/types/types';
import { CartService } from '../../../../shared/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  private router = inject(Router);
  private cartService = inject(CartService);

  product = input<Product>({
    id: 0,
    title: '',
    price: 0,
    image: '',
    ingredients: '',
    category: '',
    imageDetails: '',
  });

  goToDetails(productId: number) {
    this.router.navigate(['/details', productId]);
  }

  async addToCart(product: Product) {
    await this.cartService.addUpdateCart(product);
  }
}
