import { AppDataSource } from '../data-source';

async function dropTables() {
    // Initialize the data source
    await AppDataSource.initialize();

    const queryRunner = AppDataSource.createQueryRunner();

    // Start a transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // Drop tables with cascade
        await queryRunner.query('DROP TABLE IF EXISTS ratings CASCADE;');
        await queryRunner.query('DROP TABLE IF EXISTS movie_actors CASCADE;');
        await queryRunner.query('DROP TABLE IF EXISTS movies CASCADE;');
        await queryRunner.query('DROP TABLE IF EXISTS actors CASCADE;');
        await queryRunner.query('DROP TABLE IF EXISTS movie_genres CASCADE;');
        await queryRunner.query('DROP TABLE IF EXISTS genres CASCADE;');
        await queryRunner.query('DROP TABLE IF EXISTS directors CASCADE;');
        await queryRunner.query('DROP TABLE IF EXISTS migrations CASCADE;');

        // Commit the transaction
        await queryRunner.commitTransaction();
        console.log('All tables dropped successfully with CASCADE.');

    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('Error dropping tables:', error);

    }
    finally {
        await queryRunner.release();
        await AppDataSource.destroy();
    }
}

dropTables().catch((error) => console.error('Error executing drop function:', error));
