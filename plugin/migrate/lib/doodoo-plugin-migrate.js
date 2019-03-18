const getRawBody = require("raw-body");
const xml2js = require("xml2js");
const _url = require("url");
const fs = require("fs");
let _host;
if (process.env.OPEN_DOMAIN) {
    _host = _url.parse(process.env.OPEN_DOMAIN).host;
}

function parseXML(xml) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(
            xml,
            {
                trim: true,
                explicitArray: false
            },
            (err, obj) => {
                if (err) {
                    return reject(err);
                }

                resolve(obj);
            }
        );
    });
}

doodoo.use(async (ctx, next) => {
    // 新增prefix，兼容小程序api请求
    if (_host && ctx.get("host") === _host) {
        Object.assign(ctx, {
            path: `${process.env.APP_PREFIX}${ctx.path}`,
            url: `${process.env.APP_PREFIX}${ctx.url}`,
            originalUrl: `${process.env.APP_PREFIX}${ctx.originalUrl}`
        });
    }

    // 安装检测
    if (!fs.existsSync("install.lock") && ctx.path === "/") {
        ctx.redirect("/install");
        return
    }

    // 安装成功，第一次不重启，需加载
    if (!ctx.bookshelf && doodoo.bookshelf) {
        ctx.bookshelf = doodoo.bookshelf;
    }
    if (!ctx.redis && doodoo.redis) {
        ctx.redis = doodoo.redis;
    }
    if (!ctx.models && doodoo.models) {
        ctx.models = doodoo.models;
    }

    // 自动创建model，兼容之前遗漏的model
    ctx.model = model => {
        if (doodoo.models[model]) {
            return doodoo.models[model];
        } else {
            return (doodoo.models[model] = doodoo.bookshelf.Model.extend({
                tableName: model,
                hasTimestamps: true
            }));
        }
    };

    // 解析xml
    if (
        ctx.path.indexOf("/wechat") === -1 &&
        ctx.is("application/xml", "text/xml", "xml") &&
        ctx.method === "POST"
    ) {
        // 取原始数据
        const xml = await getRawBody(ctx.req, {
            length: ctx.length,
            limit: "1mb",
            encoding: "utf8"
        });

        // 解析xml
        const result = await parseXML(xml);
        ctx.xml = result.xml;
    }


    await next();
});
