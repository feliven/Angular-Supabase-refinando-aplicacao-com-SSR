import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShellRenderDirective } from '../../directives/shell-render.directive';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinnerModule, ShellRenderDirective],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner {}
