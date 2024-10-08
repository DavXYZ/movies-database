import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11728389593815 implements MigrationInterface {
    name = 'Migration11728389593815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "directors" ("directorId" SERIAL NOT NULL, "name" character varying NOT NULL, "nationality" character varying NOT NULL, "dob" TIMESTAMP NOT NULL, CONSTRAINT "PK_9a103c5f4a4216ea2dcedfac211" PRIMARY KEY ("directorId"))`);
        await queryRunner.query(`CREATE TABLE "genres" ("genreId" SERIAL NOT NULL, "genreName" character varying(50) NOT NULL, CONSTRAINT "PK_8e3e2a59aac7ee7889b047fdc0c" PRIMARY KEY ("genreId"))`);
        await queryRunner.query(`CREATE TABLE "movie_genres" ("id" SERIAL NOT NULL, "movie_id" integer, "genre_id" integer, CONSTRAINT "PK_ac57ed4f1d4d90418c135d6785a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actors" ("actorId" SERIAL NOT NULL, "name" character varying NOT NULL, "nationality" character varying NOT NULL, "dob" TIMESTAMP NOT NULL, CONSTRAINT "PK_12642dfdd299726e6b8732973f2" PRIMARY KEY ("actorId"))`);
        await queryRunner.query(`CREATE TABLE "movie_actors" ("id" SERIAL NOT NULL, "movie_id" integer, "actor_id" integer, CONSTRAINT "PK_73b85ba413844176a75ceecdabb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("movieId" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "releaseYear" integer NOT NULL, "director_id" integer, CONSTRAINT "PK_2a16ee7e212bb3f953112c83127" PRIMARY KEY ("movieId"))`);
        await queryRunner.query(`CREATE TABLE "ratings" ("ratingId" SERIAL NOT NULL, "rating" integer NOT NULL, "movie_id" integer, CONSTRAINT "PK_fe5a1ca832a8d42cde9eb99183d" PRIMARY KEY ("ratingId"))`);
        await queryRunner.query(`ALTER TABLE "movie_genres" ADD CONSTRAINT "FK_ae967ce58ef99e9ff3933ccea48" FOREIGN KEY ("movie_id") REFERENCES "movies"("movieId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_genres" ADD CONSTRAINT "FK_bbbc12542564f7ff56e36f5bbf6" FOREIGN KEY ("genre_id") REFERENCES "genres"("genreId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actors" ADD CONSTRAINT "FK_f6a1b0c5b2996114fe159c68744" FOREIGN KEY ("movie_id") REFERENCES "movies"("movieId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actors" ADD CONSTRAINT "FK_a6d6b6d55428c189b0f48e6a016" FOREIGN KEY ("actor_id") REFERENCES "actors"("actorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "FK_f7858d3bc5b00ea8eec379c4d50" FOREIGN KEY ("director_id") REFERENCES "directors"("directorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_45c7bafa4e537191add4eeed5b3" FOREIGN KEY ("movie_id") REFERENCES "movies"("movieId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_45c7bafa4e537191add4eeed5b3"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "FK_f7858d3bc5b00ea8eec379c4d50"`);
        await queryRunner.query(`ALTER TABLE "movie_actors" DROP CONSTRAINT "FK_a6d6b6d55428c189b0f48e6a016"`);
        await queryRunner.query(`ALTER TABLE "movie_actors" DROP CONSTRAINT "FK_f6a1b0c5b2996114fe159c68744"`);
        await queryRunner.query(`ALTER TABLE "movie_genres" DROP CONSTRAINT "FK_bbbc12542564f7ff56e36f5bbf6"`);
        await queryRunner.query(`ALTER TABLE "movie_genres" DROP CONSTRAINT "FK_ae967ce58ef99e9ff3933ccea48"`);
        await queryRunner.query(`DROP TABLE "ratings"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "movie_actors"`);
        await queryRunner.query(`DROP TABLE "actors"`);
        await queryRunner.query(`DROP TABLE "movie_genres"`);
        await queryRunner.query(`DROP TABLE "genres"`);
        await queryRunner.query(`DROP TABLE "directors"`);
    }

}
