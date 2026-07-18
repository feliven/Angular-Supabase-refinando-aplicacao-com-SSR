import { Component, inject, signal, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import type { CartItem } from '../../../shared/types/types';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink,
    DecimalPipe,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private cartService = inject(CartService);

  cartItems = signal<CartItem[]>([]);
  total = signal<number>(0);

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems.set(items);
    });
  }

  getQuantities(currentQuantity: number): number[] {
    const maxQuantity = Math.max(currentQuantity, 10);
    return Array.from({ length: maxQuantity }, (_, i) => i + 1);
  }

  updateQuantity(productId: number, newQuantity: number) {}

  removeItem(productId: number) {}

  finalizePurchase() {}

  continueShopping() {}
}
