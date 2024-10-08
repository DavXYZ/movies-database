import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie';
import { Genre } from './genre';

@Entity('movie_genres')
export class MovieGenres {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Movie, (movie) => movie.movieGenres)
  @JoinColumn({ name: 'movie_id' })
  movie!: Movie;

  @ManyToOne(() => Genre, (genre) => genre.movieGenres)
  @JoinColumn({ name: 'genre_id' })
  genre!: Genre;
}
