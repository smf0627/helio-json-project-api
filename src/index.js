import Express from 'express';
import Parser from 'body-parser';
import Router from './routes';
import Services from './services';

const app = Express();

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

app.use(Parser.json());
app.set('services', Services);

Router(app);

app.use((err, req, res) => {
  if (err.isBoom) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }
});

if (ENV !== 'testing') {
  app.listen(PORT, () => console.log(`Application started at: http://localhost:${PORT}`));
}


export default app;
