import { ResolveFn } from '@angular/router';
import type { Product } from './shared/types/types';
import { inject } from '@angular/core';
import { SupabaseService } from './shared/services/supabase.service';

export const productResolver: ResolveFn<Product> = (route, state) => {
  const productService = inject(SupabaseService);

  const productId = parseInt(route.paramMap.get('id') ?? '0', 10);

  const productPromiseLike = productService.getProductById(productId);

  return Promise.resolve(productPromiseLike);
};
