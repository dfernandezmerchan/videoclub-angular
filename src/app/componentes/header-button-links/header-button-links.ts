import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header-button-links',
  imports: [],
  templateUrl: './header-button-links.html',
  styleUrl: './header-button-links.css',
})
export class HeaderButtonLinks {
  nombre = input<string>('');
  activo = input<boolean>(false);
}
