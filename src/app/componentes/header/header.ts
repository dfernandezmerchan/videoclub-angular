import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideHouse, LucideHeart, LucideMenu, LucideSearch, LucidePlus } from '@lucide/angular';
import { HeaderButtonLinks } from '../header-button-links/header-button-links';
import { Pelicula } from '../../interfaces/pelicula';
import { Peliculas } from '../../servicios/peliculas';
import { Buscador } from '../buscador/buscador';



@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, LucideHouse, LucideHeart, LucideMenu, LucideSearch, LucidePlus, HeaderButtonLinks,Buscador],
  templateUrl: './header.html'
})
export class HeaderComponent {
    favoritos: Pelicula[] = [];

    constructor(
        private peliculasService: Peliculas
    ) {
        this.peliculasService.favoritos$
            .subscribe((peliculas: Pelicula[]) => {
                this.favoritos = peliculas;
            });
    }

    getNumberoFavoritos(): number {
        return this.favoritos.length;
    }
}
