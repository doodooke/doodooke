
exports.up = function (knex, Promise) {
  return Promise.all([
    // 创建表
    knex.schema.hasTable('admin').then(function (exists) {
      if (!exists) {
        return knex.schema.createTable('admin', function (table) {
          table.increments('id').primary().notNullable();
          table.integer('avater_id').defaultTo(0).comment('头像');
          table.text('nickname').nullable().comment('姓名');
          table.text('password').nullable().comment('密码');
          table.text('phone').nullable().comment('手机号');
          table.text('email').nullable().comment('邮箱');
          table.specificType('status', 'tinyint(1)').defaultTo(0).comment('状态0:禁用1:启用');
          table.timestamp('created_at').nullable();
          table.timestamp('updated_at').nullable();
          table.timestamp('deleted_at').nullable();
          table.comment('超管用户表');
        });
      }
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    // 删除表
    knex.schema.dropTable('admin')
  ]);
};
