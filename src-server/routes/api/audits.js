const Router = require('express-promise-router');
const Audits = require('../../components/audits');
const auth = require('../../components/auth/helpers');

module.exports = (app) => {
  const router = Router();
  const audits = Audits(app);

  // Get all
  router.post('/', auth.authenticate, async (req, res) => {
    const data = await audits.get(req.body.q.filters);
    res.json(data);
  });

  return Router().use('/audits', router);
};
