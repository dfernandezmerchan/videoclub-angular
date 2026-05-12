import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { Pelicula } from '../interfaces/pelicula';
import { Peliculas } from '../servicios/peliculas';
import { LucideArrowLeft, LucideHeart } from '@lucide/angular';
import { Estrella } from '../componentes/estrella/estrella';

@Component({
    selector: 'app-detalles-pelicula',
    imports: [RouterLink, LucideArrowLeft, LucideHeart, Estrella],
    templateUrl: './detalles-pelicula.html'
})
export class DetallesPelicula implements OnInit, OnDestroy {
    idPelicula: number | null = null;
    peliculaSeleccionada: Pelicula | null = null;
    cargando = true;
    private sub!: Subscription;

    constructor(private route: ActivatedRoute, private peliculasService: Peliculas) {}

    ngOnInit(): void {
        this.idPelicula = Number(this.route.snapshot.paramMap.get('id'));

        this.sub = this.peliculasService.peliculas$
            .pipe(filter(lista => lista.length > 0))
            .subscribe(peliculas => {
                this.peliculaSeleccionada = peliculas.find(p => p.id === this.idPelicula) ?? null;
                this.cargando = false;
            });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    toggleFavorito(): void {
        if (this.peliculaSeleccionada) {
            this.peliculasService.toggleFavorito(this.peliculaSeleccionada.id);
        }
    }
}
