exports.up = function (knex, Promise) {
    return Promise.all([
        // 创建表
        knex.schema.hasTable('file').then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('file', function (table) {
                    table.increments('id').primary().notNullable();
                    table.integer('custom_id').defaultTo(0).comment('客户');
                    table.integer('app_id').defaultTo(0).comment('应用');
                    table.specificType('url', 'varchar(255)').nullable().comment('图片链接');
                    table.specificType('url_org', 'varchar(255)').nullable();
                    table.specificType('name', 'varchar(255)').nullable().comment('名称');
                    table.specificType('ext', 'varchar(255)').nullable().comment('扩展');
                    table.specificType('type', 'varchar(255)').nullable().comment('类型');
                    table.specificType('size', 'varchar(255)').nullable().comment('大小');
                    table.specificType('savename', 'varchar(255)').nullable().comment('存储文件名');
                    table.specificType('savepath', 'varchar(255)').nullable().comment('存储文件路径');
                    table.timestamp('created_at').nullable();
                    table.timestamp('updated_at').nullable();
                    table.timestamp('deleted_at').nullable();
                    table.comment('图片表');
                });
            }
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        // 删除表
        knex.schema.dropTable('file')
    ]);
};