const WXBizMsgCrypt = require("wechat-crypto");
const getRawBody = require("raw-body");
const xml2js = require("xml2js");

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

module.exports = function() {
    doodoo.use(async function(ctx, next) {
        if (
            !(
                ctx.is("application/xml", "text/xml", "xml") &&
                ctx.method === "POST"
            )
        ) {
            return await next();
        }

        if (ctx.path === `${process.env.APP_PREFIX}/app/home/wechat/index`) {
            return await next();
        }

        // 取原始数据
        const xml = await getRawBody(ctx.req, {
            length: ctx.length,
            limit: "1mb",
            encoding: "utf8"
        });

        // 解析xml
        const result = await parseXML(xml);
        const formated = result.xml;
        if (
            !ctx.path.startsWith(`${process.env.APP_PREFIX}/app/home/wxa/open`)
        ) {
            ctx.xml = formated;
            return next();
        }

        const query = ctx.query;
        const timestamp = query.timestamp;
        const nonce = query.nonce;
        const encryptMessage = formated.Encrypt;
        const cryptor = new WXBizMsgCrypt(
            process.env.OPEN_TOKEN,
            process.env.OPEN_ENCODINGAESKEY,
            process.env.OPEN_APPID
        );

        if (
            query.msg_signature !==
            cryptor.getSignature(timestamp, nonce, encryptMessage)
        ) {
            ctx.status = 401;
            ctx.body = "Invalid signature";
            return;
        }

        const decryptedXML = cryptor.decrypt(encryptMessage);
        const messageWrapXml = decryptedXML.message;
        const decodedXML = await parseXML(messageWrapXml);
        if (messageWrapXml === "") {
            ctx.status = 401;
            ctx.body = "Invalid signature";
            return;
        }

        ctx.xml = decodedXML.xml;

        console.log(ctx.xml);

        await next();
    });
};
