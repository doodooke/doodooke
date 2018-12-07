const base = require("./base");
const glob = require("glob");
const path = require("path");
const fse = require("fs-extra");
module.exports = class extends base {
    async _initialize() {
        await super.isAdminAuth();
    }

    /**
     *
     * @api {get} /admin/menu/index 菜单列表
     * @apiDescription 菜单列表
     * @apiGroup Admin超管快速功能页
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiSampleRequest /admin/menu/index
     *
     */
    async index() {
        const modules = glob.sync("app/*/package.json");
        let menuList = [];
        for (const row of modules) {
            const config = await fse.readJson(path.resolve(row));
            if (config && config.adminInfo) {
                for (const item of config.adminInfo) {
                    if (menuList.length) {
                        let has = false;
                        for (let menu of menuList) {
                            if (item.name === menu.name) {
                                has = true;
                                menu.sub = menu.sub.concat(item.sub);
                            }
                        }
                        if (!has) {
                            menuList.push(item);
                        }
                    }else{
                        menuList.push(item);
                    }
                }
                
            }
        }
        
        this.success(menuList);
    }
};
