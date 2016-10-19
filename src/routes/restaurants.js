import { Router } from 'express';
import Joi from 'joi';
import Validator from 'express-joi-validator';


const RestaurantModel = Joi.object().keys({
  name: Joi.string().min(3).trim().label('Name'),
  cuisine: Joi.string().min(2).trim().label('Cuisine'),
  address: Joi.object().keys({
    building: Joi.string().trim().label('Building'),
    coord: Joi.array().items(Joi.number()),
    street: Joi.string().trim().label('Street'),
    zipcode: Joi.string().trim().min(5).max(11).label('Zip')
  }),
  grades: Joi.array().items(Joi.object().keys({
    date: Joi.date(),
    grade: Joi.string().max(1).trim().uppercase(),
    score: Joi.number().max(10).min(0)
  })),
  borough: Joi.string().min(2).trim().label('Borough'),
});

const router = new Router();



router.route('/')
  .get((req, res) => {
    const { pageSize = 100, index = 0 } = req.query;
    const services = req.app.get('services');
    
    return services.restaurants.all(index, pageSize)
      .then(restaurants => {
        return res.json(restaurants);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  })
  .post(Validator({ body: RestaurantModel.requiredKeys('', 'name', 'address.building', 'address.street', 'address.zipcode', 'borough', 'cuisine') }), (req, res) => {
    const restaurant = req.body;
    const services = req.app.get('services');
    
    return services.restaurants.create(restaurant)
      .then(result => res.status(201).json(result));
  });

router.get('/favorites', (req, res) => {
  const services = req.app.get('services');
  
  return services.restaurants.favorites()
    .then(restaurants => res.json(restaurants));
});

router.get('/top-rated', (req, res) => {
  const services = req.app.get('services');
  
  return services.restaurants.topRated()
    .then(restaurants => res.json(restaurants));
});

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const services = req.app.get('services');
    
    return services.restaurants.findById(id)
      .then(restaurant => res.json(restaurant));
  })
  .put(Validator({ body: RestaurantModel.requiredKeys('', 'name', 'address.building', 'address.street', 'address.zipcode', 'borough', 'cuisine') }), (req, res) => {
    const { id } = req.params;
    const restaurant = req.body;
    const services = req.app.get('services');
    
    return services.restaurants.update(id, restaurant)
      .then(restaurant => res.json(restaurant));
  })
  .patch(Validator({ body: RestaurantModel.requiredKeys('', 'name') }), (req, res) => {
    const { id } = req.params;
    const restaurant = req.body;
    const services = req.app.get('services');
    
    return services.restaurants.update(id, restaurant)
      .then(restaurant => res.json(restaurant));
  })
  .delete((req, res) => {
    const { id } = req.params;
    const services = req.app.get('services');
    
    return services.restaurants.remove(id)
      .then(result => res.json(result))
  });


export default router;
