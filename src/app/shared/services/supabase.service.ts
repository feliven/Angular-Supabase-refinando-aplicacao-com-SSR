import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import type { Product } from '../types/types';
import { supabaseClient } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  getProducts(): PromiseLike<Product[]> {
    return supabaseClient
      .from('products')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching products:', error);
          return [];
        } else {
          return data;
        }
      });
  }

  getProductById(id: number): PromiseLike<Product> {
    return supabaseClient
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching products:', error);
          return;
        } else {
          return data;
        }
      });
  }
}
