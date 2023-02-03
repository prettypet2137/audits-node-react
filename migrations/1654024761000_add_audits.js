exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('audits', {
    id: 'id',
    event: {
      type: 'varchar(255)',
    },
    status: {
      type: 'varchar(255)',
    },
    message: {
      type: 'text',
    },
    context: {
      type: 'jsonb',
    },
    user_id: {
      type: 'integer'
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
  });
  pgm.createIndex('audits', 'event');
  pgm.createIndex('audits', 'status');
  pgm.createIndex('audits', 'user_id');
};

exports.down = () => {
};
