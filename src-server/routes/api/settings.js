const Router = require('express-promise-router');
const Settings = require('../../components/settings');
const auth = require('../../components/auth/helpers');

module.exports = (app) => {
  const router = Router();
  const settings = Settings(app);

  // Get all
  router.get('/', auth.authenticate, async (req, res) => {
    const data = await settings.get(req.user.id);
    res.json(data);
  });

  // Update
  router.put('/:settingName', auth.authenticate, async (req, res) => {
    const data = await settings.update(
      req.params.settingName,
      req.body.value,
      req.user.id
    );
    res.json(data);
  });

  return Router().use('/settings', router);
};
