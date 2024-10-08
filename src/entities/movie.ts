import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Director } from './director';
import { MovieGenres } from './movieGenres';
import { MovieActor } from './movieActor';
import { Rating } from './rating';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  movieId!: number;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'int' })
  releaseYear!: number;

  @ManyToOne(() => Director, (director) => director.movies)
  @JoinColumn({ name: 'director_id' })
  director!: Director;

  @OneToMany(() => MovieGenres, (movieGenres) => movieGenres.movie)
  movieGenres!: MovieGenres[];

  @OneToMany(() => MovieActor, (movieActor) => movieActor.movie)
  movieActors!: MovieActor[];

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings!: Rating[];
}
