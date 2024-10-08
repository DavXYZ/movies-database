import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Movie } from './movie';

@Entity('directors')
export class Director {
  @PrimaryGeneratedColumn()
  directorId!: number;

  @Column()
  name!: string;

  @Column()
  nationality!: string;

  @Column()
  dob!: Date;

  @OneToMany(() => Movie, (movie) => movie.director)
  movies!: Movie[];
}
