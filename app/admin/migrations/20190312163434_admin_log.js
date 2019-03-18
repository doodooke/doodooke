
exports.up = function(knex, Promise) {
  return Promise.all([
    // 创建表
    knex.schema.hasTable('admin_log').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('admin_log', function(table) {
          table.increments('id').primary().notNullable();
          table.integer('admin_id').defaultTo(0).comment('超管');
          table.specificType('ip','varchar(32)').nullable().comment('ip');
          table.specificType('info','varchar(32)').nullable().comment('信息');
          table.timestamp('created_at').nullable();
          table.timestamp('updated_at').nullable();
          table.timestamp('deleted_at').nullable();
          table.comment('超管登录日志');
        });
      }
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    // 删除表
    knex.schema.dropTable('admin_log')
  ]);
};
