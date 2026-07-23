import { computed, Service, signal } from '@angular/core';
import type { CartItem, Product } from '../types/types';
import { supabaseClient } from './supabase.client';

@Service()
export class CartService {
  private _cartItems = signal<CartItem[]>([]);
  cartItems = this._cartItems.asReadonly();

  totalQuantity = computed(() => {
    return this._cartItems().reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  });

  constructor() {
    this.loadCart();
  }

  getCartItems(): PromiseLike<CartItem[]> {
    return supabaseClient
      .from('cart_items')
      .select('quantity, product:product_id (id, title, price, image)')
      .overrideTypes<CartItem[]>()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching cart items:', error);
          return [];
        } else {
          return data || [];
        }
      });
  }

  async addCartItem(product: Product, quantity: number = 1) {
    let promise: Promise<void> = Promise.resolve();

    this._cartItems.update((currentItems) => {
      const itemIndex = currentItems.findIndex((item) => {
        return item.product.id === product.id;
      });

      const updatedItems = [...currentItems];

      if (itemIndex > -1) {
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: updatedItems[itemIndex].quantity + quantity,
        };
        promise = this.saveCartItem(updatedItems[itemIndex]);
        console.log('updatedItems[itemIndex]:', updatedItems[itemIndex]);
      } else {
        const newItem = { product, quantity };
        updatedItems.push(newItem);
        promise = this.saveCartItem(newItem);
        console.log('newItem:', newItem);
      }

      return updatedItems;
    });

    await promise;
  }

  private saveCartItem(cartItem: CartItem): Promise<void> {
    const upsertPromiseLike = supabaseClient
      .from('cart_items')
      .upsert(
        {
          product_id: cartItem.product.id,
          quantity: cartItem.quantity,
        },
        { onConflict: 'product_id' },
      )
      .then(({ error }) => {
        if (error) {
          console.error('Error saving cart items:', error);
        }
      });

    return Promise.resolve(upsertPromiseLike);
  }

  private async loadCart() {
    try {
      const savedItems = await this.getCartItems();
      console.table(savedItems);

      this._cartItems.set(savedItems);
    } catch (error) {
      console.error('Error displaying saved cart items', error);
    }
  }
}
