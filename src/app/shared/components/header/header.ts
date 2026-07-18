import { Component, inject, signal, type OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatIconModule, MatToolbarModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private cartService = inject(CartService);

  totalQuantity = signal(0);

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(() => {
      this.totalQuantity.set(this.cartService.getTotalQuantity());
    });
  }
}
