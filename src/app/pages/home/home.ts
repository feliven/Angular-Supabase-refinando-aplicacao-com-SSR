import { Component } from '@angular/core';
import { ProductsList } from '../../shared/components/products-list/products-list';

@Component({
  selector: 'app-home',
  imports: [ProductsList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
