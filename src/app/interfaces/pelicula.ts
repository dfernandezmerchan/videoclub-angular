export interface Pelicula {
    id: number;
    title: string;
    description: string;
    year: number;
    image_url: string;
    genre: string;
    stars: number;

    // Propiedades customizadas de la interfaz
    favorita: boolean;
}