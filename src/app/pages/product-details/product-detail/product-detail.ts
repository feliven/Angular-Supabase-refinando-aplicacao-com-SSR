import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal, type OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import type { Product } from '../../../shared/types/types';
import { Spinner } from '../../../shared/components/spinner/spinner';
import { ShellNoRenderDirective } from '../../../shared/directives/shell-no-render.directive';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [
    RouterLink,
    CurrencyPipe,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    Spinner,
    ShellNoRenderDirective,
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cartService = inject(CartService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  quantities: number[] = [1, 2, 3, 4, 5];
  product = signal<Product | null>(null);
  selectedQuantity = signal(1);

  ngOnInit(): void {
    const productData = this.route.snapshot.data['product'] as Product;

    this.product.set(productData);
    if (productData) {
      this.setTitleMetadata(productData);
    }
  }

  addToCart(product: Product, quantity: number) {
    this.cartService.addCartItem(product, quantity);
    this.router.navigate(['/checkout']);
  }

  setTitleMetadata(product: Product) {
    this.title.setTitle(`${product.title}`);
    this.meta.addTags([
      {
        name: 'description',
        content: product.ingredients,
      },
      { property: 'og:title', content: product.title },
      {
        property: 'og:description',
        content: product.ingredients,
      },
      {
        property: 'og:image',
        content: product.imageDetails,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ]);
  }
}
