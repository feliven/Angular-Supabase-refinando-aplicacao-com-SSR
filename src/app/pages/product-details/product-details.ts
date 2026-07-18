import { Component } from '@angular/core';
import { ProductDetail } from './product-detail/product-detail';

@Component({
  selector: 'app-product-details',
  imports: [ProductDetail],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {}
