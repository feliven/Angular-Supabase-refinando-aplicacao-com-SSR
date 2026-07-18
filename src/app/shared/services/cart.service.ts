import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { CartItem, Product } from '../types/types';

@Service()
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private getCurrentItems() {
    return this.cartItemsSubject.getValue();
  }

  addCartItem(product: Product) {
    const currentItems = this.getCurrentItems();
    const itemIndex = currentItems.findIndex((item) => {
      return item.product.id === product.id;
    });

    if (itemIndex > -1) {
      currentItems[itemIndex].quantity++;
    } else {
      currentItems.push({ product: product, quantity: 1 });
    }

    this.cartItemsSubject.next(currentItems);
  }
}
