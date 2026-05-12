import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideSearch } from '@lucide/angular';

@Component({
  selector: 'app-buscador',
  imports: [FormsModule, LucideSearch],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css'
})
export class Buscador {

  textoBusqueda: string = '';

  constructor(private router: Router) {}

  buscar() {
    this.router.navigate(['/'], {
      queryParams: {
        buscador: this.textoBusqueda
      }
    });
  }
}