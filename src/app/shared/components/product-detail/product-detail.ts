import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal, type OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Product } from '../../types/types';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Spinner } from '../spinner/spinner';
import { ShellNoRenderDirective } from '../../../directives/shell-no-render.directive';
import { Title, Meta } from '@angular/platform-browser';

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
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  quantities: number[] = [1, 2, 3, 4, 5];
  product = signal<Product | null>(null);

  ngOnInit(): void {
    const productData = this.route.snapshot.data['product'] as Product;

    this.product.set(productData);
    if (productData) {
      this.setTitleMetadata(productData);
    }
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
