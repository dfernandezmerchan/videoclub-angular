import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Pelicula } from '../interfaces/pelicula';

@Component({
  selector: 'app-anadir',

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './anadir.html',

  styleUrl: './anadir.css',
})

export class Anadir {

  nuevaPelicula: Pelicula = {

    id: 0,

    title: '',

    description: '',

    year: 2025,

    image_url: '',

    genre: '',

    stars: 1,

    favorita: false
  };

  guardarPelicula(): void {

    console.log(this.nuevaPelicula);

  }
}
