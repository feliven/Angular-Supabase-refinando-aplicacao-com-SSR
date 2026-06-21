import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import type { Product } from '../../types/types';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  private router = inject(Router);

  product = input<Omit<Product, 'ingredients' | 'category' | 'imageDetails'>>({
    id: 0,
    title: '',
    price: 0,
    image: '',
  });

  goToDetails(productId: number) {
    this.router.navigate(['/details', productId]);
  }
}
