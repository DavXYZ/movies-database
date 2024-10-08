// src/seeds/seedDatabase.ts

import { AppDataSource } from '../data-source';
import { Director } from '../entities/director';
import { Actor } from '../entities/actor';
import { Genre } from '../entities/genre';
import { Movie } from '../entities/movie';
import { Rating } from '../entities/rating';
import { MovieActor } from '../entities/movieActor';
import { MovieGenres } from '../entities/movieGenres';

(async () => {
  const connection = await AppDataSource.initialize();
  const directorRepository = connection.getRepository(Director);
  const actorRepository = connection.getRepository(Actor);
  const genreRepository = connection.getRepository(Genre);
  const movieRepository = connection.getRepository(Movie);
  const ratingRepository = connection.getRepository(Rating);
  const movieActorRepository = connection.getRepository(MovieActor);
  const movieGenreRepository = connection.getRepository(MovieGenres);

  try {
    // Seed Directors
    const directors = await directorRepository.save([
      { name: 'Christopher Nolan', nationality: 'British-American', dob: new Date('1970-07-30') },
      { name: 'Quentin Tarantino', nationality: 'American', dob: new Date('1963-03-27') },
      { name: 'Martin Scorsese', nationality: 'American', dob: new Date('1942-11-17') },
      { name: 'Greta Gerwig', nationality: 'American', dob: new Date('1983-08-04') },
      { name: 'Sofia Coppola', nationality: 'American', dob: new Date('1971-05-14') },
      { name: 'Steven Spielberg', nationality: 'American', dob: new Date('1946-12-18') },
      { name: 'Alfonso Cuarón', nationality: 'Mexican', dob: new Date('1961-11-28') },
      { name: 'Bong Joon-ho', nationality: 'South Korean', dob: new Date('1969-09-14') },
      { name: 'James Cameron', nationality: 'Canadian', dob: new Date('1954-08-16') },
      { name: 'Patty Jenkins', nationality: 'American', dob: new Date('1971-07-23') },
    ]);

    // Seed Actors
    const actors = await actorRepository.save([
      { name: 'Leonardo DiCaprio',nationality: 'American', dob: new Date('1974-11-11') },
      { name: 'Brad Pitt',nationality: 'American', dob: new Date('1963-12-18') },
      { name: 'Margot Robbie',nationality: 'Australian', dob: new Date('1990-07-02') },
      { name: 'Scarlett Johansson',nationality: 'American', dob: new Date('1984-11-22') },
      { name: 'Ryan Gosling',nationality: 'Canadian', dob: new Date('1980-11-12') },
      { name: 'Meryl Streep',nationality: 'American', dob: new Date('1949-06-22') },
      { name: 'Denzel Washington',nationality: 'American', dob: new Date('1954-12-28') },
      { name: 'Emma Stone',nationality: 'American', dob: new Date('1988-11-06') },
      { name: 'Tom Hanks',nationality: 'American', dob: new Date('1956-07-09') },
      { name: 'Natalie Portman',nationality: 'Israeli-American', dob: new Date('1981-06-09') },
      { name: 'Idris Elba',nationality: 'British', dob: new Date('1972-09-06') },
      { name: 'Michael B. Jordan',nationality: 'American', dob: new Date('1987-02-09') },
      { name: 'Joaquin Phoenix',nationality: 'American', dob: new Date('1974-10-28') },
      { name: 'Anne Hathaway',nationality: 'American', dob: new Date('1982-11-12') },
      { name: 'Florence Pugh',nationality: 'British', dob: new Date('1996-01-03') },
    ]);

    // Seed Genres
    const genres = await genreRepository.save([
      { genreName: 'Action' },
      { genreName: 'Drama' },
      { genreName: 'Comedy' },
      { genreName: 'Thriller' },
      { genreName: 'Horror' },
      { genreName: 'Romance' },
      { genreName: 'Science Fiction' },
      { genreName: 'Fantasy' },
      { genreName: 'Adventure' },
      { genreName: 'Mystery' },
    ]);
    // Seed Movies
    const movies = await movieRepository.save([
      { title: 'Inception', releaseYear: 2010, director: directors[0] },
      { title: 'Pulp Fiction', releaseYear: 1994, director: directors[1] },
      { title: 'The Wolf of Wall Street', releaseYear: 2013, director: directors[0] },
      { title: 'Little Women', releaseYear: 2019, director: directors[3] },
      { title: 'Lost in Translation', releaseYear: 2003, director: directors[4] },
      { title: 'Interstellar', releaseYear: 2014, director: directors[0] },
      { title: 'The Shape of Water', releaseYear: 2017, director: directors[7] },
      { title: 'Get Out', releaseYear: 2017, director: directors[1] },
      { title: 'Mad Max: Fury Road', releaseYear: 2015, director: directors[6] },
      { title: 'Parasite', releaseYear: 2019, director: directors[8] },
      { title: 'Wonder Woman', releaseYear: 2017, director: directors[9] },
      { title: 'The Revenant', releaseYear: 2015, director: directors[0] },
      { title: 'La La Land', releaseYear: 2016, director: directors[2] },
      { title: 'The Martian', releaseYear: 2015, director: directors[5] },
      { title: 'Black Panther', releaseYear: 2018, director: directors[5] },
    ]);

    // Seed MovieActor bridge table
    const movieActors = [
      { movie: movies[0], actor: actors[0] },
      { movie: movies[0], actor: actors[1] },
      { movie: movies[1], actor: actors[1] },
      { movie: movies[1], actor: actors[3] },
      { movie: movies[2], actor: actors[0] },
      { movie: movies[2], actor: actors[2] },
      { movie: movies[3], actor: actors[3] },
      { movie: movies[3], actor: actors[4] },
      { movie: movies[4], actor: actors[0] },
      { movie: movies[5], actor: actors[0] },
      { movie: movies[5], actor: actors[6] },
      { movie: movies[6], actor: actors[2] },
      { movie: movies[6], actor: actors[7] },
      { movie: movies[7], actor: actors[8] },
      { movie: movies[8], actor: actors[4] },
      { movie: movies[8], actor: actors[9] },
      { movie: movies[9], actor: actors[0] },
      { movie: movies[9], actor: actors[10] },
      { movie: movies[10], actor: actors[0] },
      { movie: movies[10], actor: actors[11] },
      { movie: movies[12], actor: actors[1] },
      { movie: movies[12], actor: actors[12] },
      { movie: movies[13], actor: actors[1] },
      { movie: movies[13], actor: actors[2] },
      { movie: movies[14], actor: actors[3] },
      { movie: movies[14], actor: actors[4] },
    ].map(({ movie, actor }) => {
      const movieActor = new MovieActor();
      movieActor.movie = movie;
      movieActor.actor = actor;
      return movieActor;
    });

    await movieActorRepository.save(movieActors);

    // Seed MovieGenre bridge table
    const movieGenres = [
      { movie: movies[0], genre: genres[0] },
      { movie: movies[0], genre: genres[1] },
      { movie: movies[1], genre: genres[0] },
      { movie: movies[1], genre: genres[1] },
      { movie: movies[2], genre: genres[1] },
      { movie: movies[2], genre: genres[2] },
      { movie: movies[3], genre: genres[1] },
      { movie: movies[3], genre: genres[4] },
      { movie: movies[4], genre: genres[0] },
      { movie: movies[5], genre: genres[0] },
      { movie: movies[5], genre: genres[3] },
      { movie: movies[6], genre: genres[1] },
      { movie: movies[6], genre: genres[3] },
      { movie: movies[7], genre: genres[2] },
      { movie: movies[8], genre: genres[1] },
      { movie: movies[8], genre: genres[0] },
      { movie: movies[9], genre: genres[2] },
      { movie: movies[10], genre: genres[4] },
      { movie: movies[10], genre: genres[3] },
      { movie: movies[11], genre: genres[5] },
      { movie: movies[12], genre: genres[1] },
      { movie: movies[13], genre: genres[1] },
      { movie: movies[14], genre: genres[0] },
      { movie: movies[14], genre: genres[1] },
    ].map(({ movie, genre }) => {
      const movieGenre = new MovieGenres();
      movieGenre.movie = movie;
      movieGenre.genre = genre;
      return movieGenre;
    });

    await movieGenreRepository.save(movieGenres);

    // Seed Ratings
    await ratingRepository.save([
      { movie: movies[0], rating: 8 },
      { movie: movies[1], rating: 8 },
      { movie: movies[2], rating: 7 },
      { movie: movies[3], rating: 8 },
      { movie: movies[4], rating: 7 },
      { movie: movies[5], rating: 8 },
      { movie: movies[6], rating: 8 },
      { movie: movies[7], rating: 7 },
      { movie: movies[8], rating: 8 },
      { movie: movies[9], rating: 7 },
      { movie: movies[10], rating: 4 },
      { movie: movies[11], rating: 7 },
      { movie: movies[12], rating: 8 },
      { movie: movies[13], rating: 7 },
      { movie: movies[14], rating: 8 },
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await connection.destroy();
  }
})();
