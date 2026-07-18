import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { SupabaseService } from './shared/services/supabase.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'details/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const productService = inject(SupabaseService);
      const productList = await productService.getProducts();
      const ids = productList.map((product) => {
        return String(product.id);
      });

      console.log({ ids });

      return ids.map((id) => ({ id })); // Generates paths like: /details/1, /details/2, /details/3
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
