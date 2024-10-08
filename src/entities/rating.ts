import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn } from 'typeorm';
import { Movie } from './movie';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  ratingId!: number;

  @Column({ type: 'int' })
  rating!: number;

  @ManyToOne(() => Movie, (movie) => movie.ratings) 
  @JoinColumn({ name: 'movie_id' })
  movie!: Movie;
}
