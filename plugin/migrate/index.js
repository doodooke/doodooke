module.exports = () => {
    doodoo.use(async (ctx, next) => {
        // 新增prefix，兼容小程序api请求
        if (ctx.get("host") === "api.doodooke.com") {
            Object.assign(ctx, {
                path: `${process.env.APP_PREFIX}${ctx.path}`,
                url: `${process.env.APP_PREFIX}${ctx.url}`,
                originalUrl: `${process.env.APP_PREFIX}${ctx.originalUrl}`
            });
        }
        //分销红包兼容小程序
        if (ctx.path.indexOf(`/shop/api/shop/fxhb`) > -1) {
            Object.assign(ctx, {
                path: `${process.env.APP_PREFIX}${ctx.path.replace('/shop/api/shop/fxhb', "/fxhb/api/fxhb")}`,
                url: `${process.env.APP_PREFIX}${ctx.url.replace('/shop/api/shop/fxhb', "/fxhb/api/fxhb")}`,
                originalUrl: `${process.env.APP_PREFIX}${ctx.originalUrl}`
            });
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

        await next();
    });
};
