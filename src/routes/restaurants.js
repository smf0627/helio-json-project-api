import { Router } from 'express';

const router = new Router();

router.route('/')
  .get((req, res) => {
    const services = req.app.get('services');
    
    return services.restaurants.all()
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
  .use((req, res, next) => {
    req.id = req.params.id;
    req.services = req.app.get('services');
    
    return next();
  })
  .get((req, res) => {
    const { services } = req;
    
    return services.restaurants.findById(req.id);
    
    return res.json({});
  })
  .put((req, res) => {
    const { services } = req;
    
    return res.json({});
  })
  .delete((req, res) => {
    const { services } = req;
    
    return res.json({});
  });


export default router;
