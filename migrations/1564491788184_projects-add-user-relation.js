exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('projects', {
    owner_id: {
      type: 'integer'
    }
  });
  pgm.createIndex('projects', 'owner_id');
};

exports.down = () => {

};
