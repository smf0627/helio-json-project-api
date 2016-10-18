import Restaurants from './restaurants';

export default (app) => {
  app.use('/v1/restaurants', Restaurants);
}
