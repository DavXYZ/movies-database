import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MovieActor } from './movieActor';

@Entity('actors')
export class Actor {
  @PrimaryGeneratedColumn()
  actorId!: number;

  @Column()
  name!: string;

  @Column()
  nationality!: string;

  @Column()
  dob!: Date;

  @OneToMany(() => MovieActor, (movieActor) => movieActor.actor)
  movieActors!: MovieActor[];
}
