import { computed, Service, signal } from '@angular/core';
import type { CartItem, Product } from '../types/types';

@Service()
export class CartService {
  private _cartItems = signal<CartItem[]>([]);
  cartItems = this._cartItems.asReadonly();

  totalQuantity = computed(() => {
    return this._cartItems().reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  });

  addCartItem(product: Product) {
    this._cartItems.update((currentItems) => {
      const itemIndex = currentItems.findIndex((item) => {
        return item.product.id === product.id;
      });

      const updatedItems = [...currentItems];

      if (itemIndex > -1) {
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity + 1,
        };
      } else {
        updatedItems.push({ product: product, quantity: 1 });
      }

      return updatedItems;
    });
  }
}
