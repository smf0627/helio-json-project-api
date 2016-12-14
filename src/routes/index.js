import Schemata from './schemata';

export default (app) => {
  app.use('/v1/schemata', Schemata);
}

// http://localhost:4000/v1/schemata
