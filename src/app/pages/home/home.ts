import { afterNextRender, Component, inject, type OnInit } from '@angular/core';
import { ProductsList } from '../../shared/components/products-list/products-list';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [ProductsList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

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

  ngOnInit(): void {
    this.setTitleMetadata();
  }

  setTitleMetadata() {
    this.title.setTitle('Deleite - dê leite!');
    this.meta.addTags([
      {
        name: 'description',
        content: 'Descubra os melhores milkshakes, sorvetes e smoothies na Deleite',
      },
      { property: 'og:title', content: 'Deleite - dê leite!' },
      {
        property: 'og:description',
        content: 'Descubra os melhores milkshakes, sorvetes e smoothies na Deleite',
      },
      {
        property: 'og:image',
        content: 'assets/images/logo.png',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ]);
  }
}
