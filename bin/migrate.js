#!/usr/bin/env node

const argv = require('yargs').argv;
const yaml = require('js-yaml');
const fs = require('fs');
const glob = require("glob");
const env = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: env.mysql.host,
        user: env.mysql.user,
        password: env.mysql.password,
        database: env.mysql.database,
        port: env.mysql.port,
        charset: env.mysql.charset,
    },
    migrations: {
        tableName: 'migrations'
    }
});

/**
 * ./bin/migrate.js make [name] --scope admin
 */
if (argv._[0] === "make") {
    const scope = argv.scope;
    if (!scope) {
        throw new Error("Missing required argument: scope");
    }

    knex.migrate.make(argv._[1], {
        directory: `app/${scope}/migrations`
    }).then(() => {
        console.log("Ok")
        process.exit()
    });
}

/**
 * ./bin/migrate.js latest
 */
if (argv._[0] === "latest") {
    const directorys = glob.sync("app/*/migrations");
    knex.migrate.latest({
        directory: directorys
    }).then(() => {
        console.log("Ok")
        process.exit()
    });
}

/**
 * ./bin/migrate.js rollback
 */
if (argv._[0] === "rollback") {
    const directorys = glob.sync("app/*/migrations");
    knex.migrate.rollback({
        directory: directorys
    }).then(() => {
        console.log("Ok")
        process.exit()
    });
}
