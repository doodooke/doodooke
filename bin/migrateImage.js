const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'doodoo',
        port: '3306',
    }
});

String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

async function main() {
    const tables = await knex.raw('show tables;');
    for (const table of tables[0]) {
        const datas = await knex(table.Tables_in_doodoo).select();
        for (const data of datas) {
            const newRow = {};
            for (const key in data) {
                if (data[key] && typeof (data[key]) == 'string' && data[key].indexOf('img.dhcs520.cn') > -1) {
                    newRow[key] = data[key].replaceAll('img.dhcs520.cn', 'img.wangketo.com')
                }
            }
            if (Object.keys(newRow).length > 0) {
                console.log('id', data.id, newRow)
                await knex(table.Tables_in_doodoo).where({ id: data.id }).update(newRow)
            }
        }
    }
    console.log('end')
}; main();