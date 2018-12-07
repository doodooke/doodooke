const base = require("./base");
const fse = require("fs-extra");
const uuid = require("uuid/v4");
const moment = require("moment");
const path = require("path");
const yn = require("yn");
const Jimp = require("jimp");

module.exports = class extends base {
    async _initialize() {
        await super.isAdminAuth();
    }

    /**
     *
     * @api {get} /admin/file/add 上传图片
     * @apiDescription 上传图片
     * @apiGroup Admin
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token.
     *
     * @apiSuccess {Object} success 上传的图片信息
     *
     * @apiSampleRequest /admin/file/add
     *
     */
    async add() {
        const file = this.file.file;

        let ext = ""; // 后缀名
        switch (file.type) {
            case "image/jpg":
                ext = "jpg";
                break;
            case "image/pjpeg":
                ext = "jpg";
                break;
            case "image/jpeg":
                ext = "jpg";
                break;
            case "image/png":
                ext = "png";
                break;
            case "image/x-png":
                ext = "png";
            case "image/gif":
                ext = "gif";
                break;
        }
        if (!ext) {
            await fse.remove(file.path);
            this.fail(
                `Upload Image Error File Type ${file.type} Don\`t Support`
            );
            return;
        }

        const savepath = moment().format("YYYY-MM-DD");
        const savename = uuid() + "." + ext;

        let url =
            process.env.APP_HOST + "/uploads/" + savepath + "/" + savename;
        // 存数据库
        const _file = await this.model("file")
            .forge({
                name: file.name,
                ext: ext,
                type: file.type,
                size: file.size,
                url: url,
                url_org: url,
                savename: savename,
                savepath: savepath
            })
            .save();

        // 上传七牛
        if (yn(process.env.QINIU)) {
            await this.uploadFile(file.path, savename);

            url = `${process.env.QINIU_DOMAIN}/${savename}`;
            await this.model("file")
                .forge({
                    id: _file.id,
                    url: url,
                    url_org: url
                })
                .save();

            if (this.query.type === "1") {
                this.body = url;
            } else {
                this.success(url);
            }
        } else {
            // 上传本地
            const _savepath = path.resolve("www/uploads", savepath, savename);
            await fse.move(file.path, _savepath);

            // 图片压缩 质量 30
            const lenna = await Jimp.read(_savepath);
            lenna.quality(30).write(_savepath);

            this.success(_file);
        }
    }
};
