const Router = require('express-promise-router');
const _ = require('lodash');
const Projects = require('../../components/projects');
const auth = require('../../components/auth/helpers');

module.exports = (app) => {
  const router = Router();
  const projects = Projects(app);

  // Create
  router.post('/', auth.authenticate, async (req, res) => {
    const data = await projects.create(req.user, _.pick(req.body, 'description', 'title'));
    res.json(data);
  });

  // Get all
  router.get('/', auth.authenticate, async (req, res) => {
    const data = await projects.get();
    res.json(data);
  });

  // Get one
  router.get('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await projects.getOne(req.params.id);
    res.json(data);
  });

  // Update
  router.put('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await projects.update(req.params.id, _.pick(req.body, 'description', 'title'));
    res.json(data);
  });

  // Delete
  router.delete('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await projects.delete(req.params.id);
    res.json(data);
  });

  return Router().use('/projects', router);
};
