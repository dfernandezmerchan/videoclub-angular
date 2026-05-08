import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/pelicula';
import { Peliculas } from '../servicios/peliculas';
import { AsyncPipe, NgForOf } from '@angular/common';
import { map, Observable, tap } from 'rxjs';

interface EstadoPeliculas {
    lista: Pelicula[];
    destacada: Pelicula | null;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
  imports: [AsyncPipe],
})
export class Inicio implements OnInit {
    peliculas$!: Observable<EstadoPeliculas>;

    constructor(private peliculasService: Peliculas) {}

    ngOnInit(): void {
        this.peliculas$ = this.peliculasService.getPeliculas().pipe(
            map(res => {
                const randomIndex = Math.floor(Math.random() * res.length);
                return {
                    lista: res,
                    destacada: res[randomIndex]
                }
            })
        )
        /* this.peliculas$ = this.peliculasService.getPeliculas().pipe(
            tap(peliculas => {
                if (peliculas.length > 0) {
                    const peliculaRandomIndex = Math.floor(Math.random() * peliculas.length);
                    this.peliculaDestacada = peliculas[peliculaRandomIndex];
                }
            })
        ) */
    }
}
