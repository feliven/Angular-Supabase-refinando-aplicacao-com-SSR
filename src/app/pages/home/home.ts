import { afterNextRender, Component, type OnInit } from '@angular/core';
import { ProductsList } from '../../shared/components/products-list/products-list';

@Component({
  selector: 'app-home',
  imports: [ProductsList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor() {
    afterNextRender(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(JSON.stringify(position.coords.toJSON(), null, ' '));
        });
      } else {
        console.warn('Acesso à localização não foi liberado');
      }
    });
  }
}
