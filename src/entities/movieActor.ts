import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie';
import { Actor } from './actor';

@Entity('movie_actors')
export class MovieActor {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Movie, (movie) => movie.movieActors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie!: Movie;
  
  @ManyToOne(() => Actor, (actor) => actor.movieActors)
  @JoinColumn({ name: 'actor_id' })
  actor!: Actor;
}
