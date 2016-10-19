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
  borough: Joi.string().min(2).trim().label('Borough'),
});

const router = new Router();

// {
//   "_id": "580681b6fa3bd76f675c7c34",
//   "address": {
//   "building": "59",
//     "coord": [
//     -74.00790599999999,
//     40.708772
//   ],
//     "street": "Maiden Lane",
//     "zipcode": "10038"
// },
//   "borough": "Manhattan",
//   "cuisine": "Other",
//   "grades": [],
//   "name": "Test",
//   "restaurant_id": "50003171"
// }

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
      .then(result => res.status(204))
  });


export default router;
