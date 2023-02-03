exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('users', {
    daily_email_updates: {
      type: 'boolean',
    }
  });
};

exports.down = (pgm) => {
};
