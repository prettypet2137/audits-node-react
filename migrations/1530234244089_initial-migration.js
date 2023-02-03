exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('projects', {
    id: 'id',
    title: {
      type: 'text',
      notNull: true
    },
    description: {
      type: 'text',
      notNull: true
    },
  });
};

exports.down = (pgm) => {

};
