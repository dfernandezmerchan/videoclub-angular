import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Pelicula } from '../interfaces/pelicula';

@Injectable({
  providedIn: 'root',
})
export class Peliculas {

    private apiUrl = 'https://devsapihub.com/api-movies';
    private peliculasSubject = new BehaviorSubject<Pelicula[]>([]);
    private STORAGE_KEY = 'peliculasUsuario';

    peliculas$: Observable<Pelicula[]> = this.peliculasSubject.asObservable();

    favoritos$: Observable<Pelicula[]> = this.peliculas$.pipe(
        map(peliculas => peliculas.filter(p => p.favorita))
    );

    constructor(private http: HttpClient) {
        this.cargarPeliculas();
    }

    private cargarPeliculas(): void {
        this.http.get<any[]>(this.apiUrl).pipe(
            map(apiPeliculas =>
                apiPeliculas.map(p => ({ ...p, favorita: false }))
            )
        ).subscribe(apiPeliculas => {

            const local: Pelicula[] = JSON.parse(
                localStorage.getItem(this.STORAGE_KEY) || '[]'
            );

            const todas: Pelicula[] = [
                ...apiPeliculas,
                ...local.filter(lp => !apiPeliculas.some(ap => ap.id === lp.id))
            ];

            this.peliculasSubject.next(todas);
        });
    }

    private recargarPeliculas(): void {
        this.cargarPeliculas();
    }

    toggleFavorito(id: number): void {
        const actualizadas = this.peliculasSubject.getValue().map(p =>
            p.id === id ? { ...p, favorita: !p.favorita } : p
        );

        this.peliculasSubject.next(actualizadas);
    }


    getPeliculasLocal(): Pelicula[] {
        return JSON.parse(
            localStorage.getItem(this.STORAGE_KEY) || '[]'
        );
    }


    setPeliculasLocal(peliculas: Pelicula[]): void {
        localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(peliculas)
        );

        this.recargarPeliculas();
    }
}