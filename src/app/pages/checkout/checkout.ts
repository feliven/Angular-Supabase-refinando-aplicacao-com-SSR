import { Component } from '@angular/core';
import { Cart } from './cart/cart';

@Component({
  selector: 'app-checkout',
  imports: [Cart],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {}
