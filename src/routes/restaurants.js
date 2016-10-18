import { Router } from 'express';

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
  .post((req, res) => {
    return res.json([]);
  });

router.get('/favorites', (req, res) => {
  const services = req.app.get('services');
  
  return res.json([]);
});

router.get('/top-rated', (req, res) => {
  const services = req.app.get('services');
  
  return res.json([]);
});

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const services = req.app.get('services');
    return services.restaurants.findById(id).then(restaurant => res.json(restaurant));
  })
  .put((req, res) => {
    const { id } = req.params;
    const services = req.app.get('services');
    
    return res.json({});
  })
  .delete((req, res) => {
    const { id } = req.params;
    const services = req.app.get('services');
    
    return res.json({});
  });


export default router;
