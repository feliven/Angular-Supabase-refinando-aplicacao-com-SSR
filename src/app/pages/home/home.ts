import { Component, type OnInit } from '@angular/core';
import { ProductsList } from '../../shared/components/products-list/products-list';

@Component({
  selector: 'app-home',
  imports: [ProductsList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  ngOnInit(): void {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(JSON.stringify(position.coords.toJSON(), null, ' '));
      });
    } catch (error) {
      console.warn('Acesso à localização não foi liberado', error);
    }
  }
}
