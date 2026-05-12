import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Pelicula } from '../interfaces/pelicula';

@Component({
    selector: 'app-anadir',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './anadir.html',
    styleUrl: './anadir.css',
})
export class Anadir {
    private router = inject(Router);

    nuevaPelicula: Pelicula = {
        id: 0,
        title: '',
        description: '',
        year: 2025,
        image_url: '',
        genre: '',
        stars: 1,
        favorita: false,
    };

    mostrarAlerta: boolean = false;
    mensajeAlerta: string = '';

    guardarPelicula(): void {
        const peliculasGuardadas = JSON.parse(localStorage.getItem('peliculasUsuario') || '[]');

        const nueva = {
            ...this.nuevaPelicula,

            id: Date.now(),
        };

        peliculasGuardadas.push(nueva);

        localStorage.setItem('peliculasUsuario', JSON.stringify(peliculasGuardadas));

        this.nuevaPelicula = {
            id: 0,
            title: '',
            description: '',
            year: new Date().getFullYear(),
            image_url: '',
            genre: '',
            stars: 1,
            favorita: false,
        };

        this.mensajeAlerta = 'Película guardada correctamente';
        this.mostrarAlerta = true;

        this.router.navigate(['/']);
    }
}
