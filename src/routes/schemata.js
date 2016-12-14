import { Router } from 'express';
import Joi from 'joi';
import Validator from 'express-joi-validator';


const SchemaModel = Joi.object().keys({
  name: Joi.string().min(3).trim().label('Name'),
  schema: Joi.string().min(2).trim().label('Schema'),
  uri: Joi.string().min(2).trim().label('uri'),
  isActive: Joi.string().min(2).trim().label('Active'),

  // address: Joi.object().keys({
  //   building: Joi.string().trim().label('Building'),
  //   coord: Joi.array().items(Joi.number()),
  //   street: Joi.string().trim().label('Street'),
  //   zipcode: Joi.string().trim().min(5).max(11).label('Zip')
  // }),
  // grades: Joi.array().items(Joi.object().keys({
  //   date: Joi.date(),
  //   grade: Joi.string().max(1).trim().uppercase(),
  //   score: Joi.number().max(10).min(0)
  // })),
  // borough: Joi.string().min(2).trim().label('Borough'),
});

const router = new Router();


router.route('/')
  .get((req, res) => {
    const { pageSize = 100, index = 0 } = req.query;
    const services = req.app.get('services');

    return services.schemata.all(index, pageSize)
      .then(schemata => {
        return res.json(schemata);
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  })
  .post(Validator({ body: SchemaModel.requiredKeys('', 'name', 'schema', 'uri', 'isActive')  }), (req, res) => {
    const schema = req.body;
    const services = req.app.get('services');

    return services.schemata.create(schema)
      .then(result => res.status(201).json(result))
      .catch(err => {
        throw err
      });
  });

router.get('/favorites', (req, res) => {
  const services = req.app.get('services');

  return services.schemata.favorites()
    .then(schemata => res.json(schemata))
    .catch(err => {
      throw err
    });
});

router.get('/top-rated', (req, res) => {
  const services = req.app.get('services');

  return services.schemata.topRated()
    .then(schemata => res.json(schemata))
    .catch(err => {
      throw err
    });
});

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const services = req.app.get('services');

    return services.schemata.findById(id)
      .then(schema => res.json(schema))
      .catch(err => {
        throw err
      });
  })
  .put(Validator({ body: SchemaModel.requiredKeys('', 'name', 'schema', 'uri', 'isActive') }), (req, res) => {
    const { id } = req.params;
    const schema = req.body;
    const services = req.app.get('services');

    return services.schemata.update(id, schema)
      .then(schema => res.json(schema))
      .catch(err => {
        throw err
      });
  })
  .patch(Validator({ body: SchemaModel.requiredKeys('', 'name') }), (req, res) => {
    const { id } = req.params;
    const schema = req.body;
    const services = req.app.get('services');

    return services.schemata.update(id, schema)
      .then(schema => res.json(schema))
      .catch(err => {
        throw err
      });
  })
  .delete((req, res) => {
    const { id } = req.params;
    const services = req.app.get('services');

    return services.schemata.remove(id)
      .then(result => res.json(result))
      .catch(err => {
        throw err
      });
  });


export default router;
