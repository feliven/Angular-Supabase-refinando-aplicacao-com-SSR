import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  private router = inject(Router);

  cartItems = this.cartService.cartItems;
  totalValue = this.cartService.totalValue;

  getQuantities(currentQuantity: number): number[] {
    const maxQuantity = Math.max(currentQuantity, 10);
    return Array.from({ length: maxQuantity }, (_, i) => i + 1);
  }

  updateQuantity(productId: number, newQuantity: number) {
    const cartItems = this.cartItems();

    const index = cartItems.findIndex((item) => {
      return item.product.id === productId;
    });

    if (index !== -1) {
      this.cartService.addUpdateCart(cartItems[index].product, newQuantity);
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  finalizePurchase() {
    alert('Compra finalizada');
  }

  continueShopping() {
    this.router.navigate(['/home']);
  }
}
