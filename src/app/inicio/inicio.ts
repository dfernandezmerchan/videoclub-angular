import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/pelicula';
import { Peliculas } from '../servicios/peliculas';
import { AsyncPipe } from '@angular/common';
import { Observable, scan, shareReplay, take } from 'rxjs';
import { LucideHeart, LucidePlay, LucideList, LucideChevronDown } from '@lucide/angular';
import { Estrella } from '../componentes/estrella/estrella';

interface EstadoPeliculas {
    lista: Pelicula[];
    destacada: Pelicula | null;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
  imports: [AsyncPipe, LucideHeart, LucidePlay, LucideList, LucideChevronDown, Estrella],
})
export class Inicio implements OnInit {
    peliculas$!: Observable<EstadoPeliculas>;
    generos: string[] = [
        'Todos',
        'Acción',
        'Bélica',
        'Ciencia ficción',
        'Crimen',
        'Drama'
    ];
    generoActivo: string = 'Todos';
    filtroActual: string = '';

    constructor(private peliculasService: Peliculas) {}

    ngOnInit(): void {
        this.peliculas$ = this.peliculasService.peliculas$.pipe(
            scan((estado, lista) => {
                const destacada = estado.destacada
                    ? lista.find(p => p.id === estado.destacada!.id) ?? null
                    : null;
                return {
                    lista,
                    destacada: destacada ?? (lista.length
                        ? lista[Math.floor(Math.random() * lista.length)]
                        : null)
                };
            }, { lista: [], destacada: null } as EstadoPeliculas),
            shareReplay(1)
        );
    }

    cambiarGenero(genero: string) {
        this.generoActivo = genero;
    }

    cambiarFiltro(event: Event) {
        this.filtroActual = (event.target as HTMLSelectElement).value;
    }

    agregarFavorito(pelicula: Pelicula) {
        this.peliculasService.toggleFavorito(pelicula.id);
    }

    agregarFavoritoDestacada() {
        this.peliculas$.pipe(take(1)).subscribe(estado => {
            if (estado.destacada) {
                this.peliculasService.toggleFavorito(estado.destacada.id);
            }
        });
    }
}
