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
import { SupabaseService } from '../../services/supabase.service';
import { Spinner } from '../spinner/spinner';
import { ShellNoRenderDirective } from '../../../directives/shell-no-render.directive';

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
  quantities: number[] = [1, 2, 3, 4, 5];
  product = signal<Product | null>(null);

  private route = inject(ActivatedRoute);
  private supabaseService = inject(SupabaseService);

  ngOnInit(): void {
    const productId = parseInt(this.route.snapshot.paramMap.get('id') ?? '0', 10);
    this.supabaseService.getProductById(productId).then((data) => {
      this.product.set(data || null);
    });
  }
}
