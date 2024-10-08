import express from 'express';
import movieRoutes from './routes/movieRoutes';
import actorRoutes from './routes/actorRoutes';
import genreRoutes from './routes/genreRoutes';
import ratingRoutes from './routes/ratingRoutes';
import directorRoutes from './routes/directorRoutes';
import movieGenresRoutes from './routes/movieGenresRoutes';
import movieActorRoutes from './routes/movieActorRoutes';
import { AppDataSource } from './data-source';
const app = express();

app.use(express.json());
app.use('/movies', movieRoutes);
app.use('/actors', actorRoutes);
app.use('/genres', genreRoutes);
app.use('/directors', directorRoutes);
app.use('/ratings',ratingRoutes)
app.use('/movie-genres', movieGenresRoutes);
app.use('/movie-actor', movieActorRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
  next(err);
});

const PORT = process.env.PORT || 3000;


AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

