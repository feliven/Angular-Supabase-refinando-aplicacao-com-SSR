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
    const itemIndex = this.cartItems().findIndex((item) => {
      return item.product.id === product.id;
    });

    const updatedItems = [...this.cartItems()];

    try {
      if (itemIndex > -1) {
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: quantity,
        };

        await this.saveCartItem(updatedItems[itemIndex]);
        this._cartItems.set(updatedItems);
      } else {
        const newItem = { product, quantity };
        await this.saveCartItem(newItem);
        updatedItems.push(newItem);
        this._cartItems.set(updatedItems);
      }
    } catch (error) {
      console.error('Error adding cart item', error);
    }
  }

  async removeCartItem(productId: number) {
    try {
      await this.deleteCartItem(productId);

      this._cartItems.update((items) => {
        const updatedItems = [...items];
        const index = updatedItems.findIndex((item) => {
          return item.product.id === productId;
        });

        if (index > -1) {
          updatedItems.splice(index, 1);
        }

        return updatedItems;
      });
    } catch (error) {
      console.error('Error removing cart item', error);
    }
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
          throw error;
        }
      });

    return Promise.resolve(upsertPromiseLike);
  }

  private deleteCartItem(id: number) {
    const deletePromiseLike = supabaseClient
      .from('cart_items')
      .delete()
      .eq('product_id', id)
      .then(({ error }) => {
        if (error) {
          console.error('Error deleting cart items:', error);
          throw error;
        }
      });

    return Promise.resolve(deletePromiseLike);
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
