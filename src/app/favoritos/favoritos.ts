import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Pelicula } from '../interfaces/pelicula';
import { Peliculas } from '../servicios/peliculas';

import { Estrella } from '../componentes/estrella/estrella';

@Component({
  selector: 'app-favoritos',

  imports: [
    CommonModule,
    Estrella
  ],

  templateUrl: './favoritos.html',

  styleUrl: './favoritos.css',
})
export class Favoritos implements OnInit {

  favoritos: Pelicula[] = [];

  ordenActual: string = 'alfabeto';

  constructor(
    private peliculasService: Peliculas
  ) {}

  ngOnInit(): void {

    this.peliculasService.favoritos$
      .subscribe((peliculas: Pelicula[]) => {

        this.favoritos = peliculas;

        this.ordenarFavoritos();
      });
  }

  ordenarFavoritos(): void {

    switch(this.ordenActual) {

      // ======================
      // ALFABÉTICO
      // ======================
      case 'alfabeto':

        this.favoritos.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

      break;

      // ======================
      // AÑO ASC
      // ======================
      case 'yearAsc':

        this.favoritos.sort((a, b) =>
          a.year - b.year
        );

      break;

      // ======================
      // AÑO DESC
      // ======================
      case 'yearDesc':

        this.favoritos.sort((a, b) =>
          b.year - a.year
        );

      break;

      // ======================
      // ESTRELLAS ASC
      // ======================
      case 'starsAsc':

        this.favoritos.sort((a, b) =>
          a.stars - b.stars
        );

      break;

      // ======================
      // ESTRELLAS DESC
      // ======================
      case 'starsDesc':

        this.favoritos.sort((a, b) =>
          b.stars - a.stars
        );

      break;
    }
  }

  cambiarOrden(event: Event): void {

    const select = event.target as HTMLSelectElement;

    this.ordenActual = select.value;

    this.ordenarFavoritos();
  }
}