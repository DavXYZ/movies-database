import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MovieGenres } from './movieGenres';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  genreId!: number;

  @Column({ type: 'varchar', length: 50 })
  genreName!: string;

  @OneToMany(() => MovieGenres, (movieGenres) => movieGenres.genre)
  movieGenres!: MovieGenres[];
}
