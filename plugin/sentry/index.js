const Raven = require("raven");

module.exports = () => {
    if (process.env.NODE_ENV === "docker") {
        Raven.config(
            "http://fcf1a891a4034a5dae916be924d9a241@sentry.oneqing.com/2",
            {
                release: "20181023"
            }
        ).install();
        doodoo.on("error", err => {
            console.error(err);
            Raven.captureException(err, (err, eventId) => {
                console.log("Reported error " + eventId);
            });
        });
    }

    doodoo.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            console.error(err);
            Raven.captureException(err, (err, eventId) => {
                console.log("Reported error " + eventId);
            });
            ctx.fail(err.name + " : " + err.message);
        }
    });
};
