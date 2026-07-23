import { Component, inject, signal, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
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
export class Cart {
  private cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
  total = signal<number>(0);

  getQuantities(currentQuantity: number): number[] {
    const maxQuantity = Math.max(currentQuantity, 10);
    return Array.from({ length: maxQuantity }, (_, i) => i + 1);
  }

  updateQuantity(productId: number, newQuantity: number) {}

  removeItem(productId: number) {
    this.cartService.removeCartItem(productId);
  }

  finalizePurchase() {}

  continueShopping() {}
}
