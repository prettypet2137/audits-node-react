module.exports = (app) => {
  const db = app.get('db');
  const module = {};

  // Get all
  module.get = async (userId) => db.query(`
    SELECT u.daily_email_updates AS daily_email_updates
    FROM users u
    WHERE u.id = $1
  `, [userId]);

  // Update
  module.update = async (field, value, userId) => {
    db.query(`
      UPDATE users
      SET ${field}=$1
      WHERE users.id=$2
    `, [value, userId]);
  };

  return module;
};
