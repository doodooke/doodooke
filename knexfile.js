const debug = require("debug")("migrate");
const dotenv = require("doodoo.js/lib/dotenv/main");

const devEnv = dotenv.config().parsed;
const dockerEnv = Object.assign(
    {},
    devEnv,
    dotenv.config({
        path: "docker.env"
    }).parsed
);

debug("process.env %O", process.env);

module.exports = {
    development: {
        client: "mysql",
        connection: {
            host: devEnv.MYSQL_HOST,
            user: devEnv.MYSQL_USER,
            password: devEnv.MYSQL_PASSWORD,
            port: devEnv.MYSQL_PORT,
            database: devEnv.MYSQL_DATABASE,
            charset: devEnv.MYSQL_CHARSET
        }
    },
    docker: {
        client: "mysql",
        connection: {
            host: dockerEnv.MYSQL_HOST,
            user: dockerEnv.MYSQL_USER,
            password: dockerEnv.MYSQL_PASSWORD,
            port: dockerEnv.MYSQL_PORT,
            database: dockerEnv.MYSQL_DATABASE,
            charset: dockerEnv.MYSQL_CHARSET
        }
    }
};
