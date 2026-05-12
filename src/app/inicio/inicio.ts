import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/pelicula';
import { Peliculas } from '../servicios/peliculas';
import { AsyncPipe } from '@angular/common';
import { Observable, scan, shareReplay, take } from 'rxjs';
import { LucideHeart, LucidePlay, LucideList, LucideChevronDown } from '@lucide/angular';
import { Estrella } from '../componentes/estrella/estrella';
import { RouterLink, RouterModule } from "@angular/router";

interface EstadoPeliculas {
    lista: Pelicula[];
    destacada: Pelicula | null;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
  imports: [AsyncPipe, RouterModule, LucideHeart, LucidePlay, LucideList, LucideChevronDown, Estrella, RouterLink],
})
export class Inicio implements OnInit {
    peliculas$!: Observable<EstadoPeliculas>;
    generos: string[] = [
        'Todos',
        'Acción',
        'Aventura',
        'Biografía',
        'Ciencia ficción',
        'Crimen',
        'Drama',
        'Fantasía'
    ];
    generoActivo: string = 'Todos';
    filtroActual: string = '';

    public readonly MAPA_GENEROS: Record<string, string> = {
        'Acción': 'Action',
        'Aventura': 'Adventure',
        'Biografía': 'Biography',
        'Ciencia ficción': 'Sci-Fi',
        'Crimen': 'Crime',
        'Drama': 'Drama',
        'Fantasía': 'Fantasy',
        'Bélica': 'War'
        };

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

    cambiarGeneroSelect(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.generoActivo = select.value;
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

    getListaFiltrada(lista: Pelicula[]): Pelicula[] {
        if (!lista) return [];

        let resultado = [...lista];

        // Filtrar por género
        if (this.generoActivo !== 'Todos') {
            // Obtenemos la traducción (ej: 'Acción' -> 'Action')
            const generoBuscado = this.MAPA_GENEROS[this.generoActivo] || this.generoActivo;
            
            resultado = resultado.filter(p => 
                p.genre.toLowerCase() === generoBuscado.toLowerCase()
            );
        }

        // Aplicar orden (Año, Rating, etc.)
        switch (this.filtroActual) {
            case 'recientes': resultado.sort((a, b) => b.year - a.year); break;
            case 'antiguos': resultado.sort((a, b) => a.year - b.year); break;
            case 'rating': resultado.sort((a, b) => b.stars - a.stars); break;
            case 'alfabetico': resultado.sort((a, b) => a.title.localeCompare(b.title)); break;
        }

        return resultado;
    }   
    
}
