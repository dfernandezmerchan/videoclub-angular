import { Component, OnInit } from '@angular/core';
import { Peliculas } from '../servicios/peliculas';
import { Pelicula } from '../interfaces/pelicula';
import { FormsModule } from '@angular/forms';
import { Estrella } from '../componentes/estrella/estrella';

@Component({
  selector: 'app-administrar',
  standalone: true,
  imports: [FormsModule, Estrella],
  templateUrl: './administrar.html',
  styleUrls: ['./administrar.css'],
})
export class Administrar implements OnInit {

  peliculas: Pelicula[] = [];

  peliculaEditando: Pelicula | null = null;

  constructor(private peliculasService: Peliculas) {}

  ngOnInit() {
    this.cargar();
  }

  // cargar del localStorage
  cargar() {
    this.peliculas = this.peliculasService.getPeliculasLocal();
  }

  // eliminar película
  eliminar(id: number) {
    this.peliculas = this.peliculas.filter(p => p.id !== id);
    this.peliculasService.setPeliculasLocal(this.peliculas);
  }

  // iniciar edición
  editar(pelicula: Pelicula) {
    this.peliculaEditando = { ...pelicula };
  }

  // guardar edición
  guardarEdicion() {
    if (!this.peliculaEditando) return;

    const index = this.peliculas.findIndex(
      p => p.id === this.peliculaEditando!.id
    );

    if (index !== -1) {
      this.peliculas[index] = this.peliculaEditando;
      this.peliculasService.setPeliculasLocal(this.peliculas);
    }

    this.peliculaEditando = null;
  }

  // cancelar edición
  cancelarEdicion() {
    this.peliculaEditando = null;
  }
}