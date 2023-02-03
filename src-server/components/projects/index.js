module.exports = (app) => {
  const db = app.get('db');
  const { projects } = db;
  const module = {};

  // Create
  module.create = async (user, row) => {
    if (!row) throw new Error('No row data given');
    delete row.id;
    return projects.save({ ...row, owner_id: user.id });
  };

  // Get all
  module.get = async () => db.query(`
    SELECT p.*,
      u.email AS owner
    FROM projects p
    LEFT JOIN users u ON p.owner_id=u.id
  `);

  // Get one
  module.getOne = async (id) => db.query(
    `SELECT p.*,
       u.email AS author
     FROM projects p
     LEFT JOIN users u ON p.owner_id=u.id
     WHERE p.id=$1
    `,
    [id],
    { single: true }
  );

  // Update
  module.update = async (id, row) => {
    if (!Number(id)) throw new Error('No id given');
    row.id = id;
    return projects.save(row);
  };

  // Delete
  module.delete = async (id) => {
    if (!Number(id)) throw new Error('No id given');
    return projects.destroy({ id });
  };

  return module;
};
