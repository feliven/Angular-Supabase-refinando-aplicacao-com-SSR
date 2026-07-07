import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';
import type { Product } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  getProducts(): PromiseLike<Product[]> {
    return this.supabase
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
    return this.supabase
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
