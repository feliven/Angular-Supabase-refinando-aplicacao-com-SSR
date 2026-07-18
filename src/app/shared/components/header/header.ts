import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatIconModule, MatToolbarModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
