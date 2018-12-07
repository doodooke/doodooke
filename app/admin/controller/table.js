const base = require("./base");
const moment = require("moment");
const _ = require("lodash");

module.exports = class extends base {
    async _initialize() {
        await super.isAdminAuth();
    }

    /**
     *
     * @api {get} /admin/table/index 获取数据库所有表
     * @apiDescription 获取数据库所有表
     * @apiGroup Admin
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiSampleRequest /admin/table/index
     *
     */
    async index() {
        const sql = `show table status from ${"`" +
            process.env.MYSQL_DATABASE +
            "`"}`;

        const tables = (await doodoo.bookshelf.knex.raw(sql))[0];
        const data = [];
        for (const table of tables) {
            if (table.Comment.indexOf("@hidden") < 0) {
                data.push(table);
            }
        }
        this.success(data);
    }
    /**
     *
     * @api {get} /admin/table/searchInfo 获取搜索条件
     * @apiDescription 获取搜索条件
     * @apiGroup Admin
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token.
     * @apiParam {String} table 数据表名
     *
     * @apiSampleRequest /admin/table/searchInfo
     *
     */
    async searchInfo() {
        const { table } = this.query;
        const database = process.env.MYSQL_DATABASE;

        // 函数
        const functions = await this.functions();
        // 集合
        const grouping = await this.grouping();
        // 搜索
        const operators = await this.operators();
        // 字段
        const fields = await this.fields(database, table);
        for (const field of fields) {
            if (field.Comment.indexOf("@editor") >= 0) {
                field.Comment = field.Comment.replace(/@editor/g, "");
            }
            if (field.Comment.indexOf("@must") >= 0) {
                field.Comment = field.Comment.replace(/@must/g, "");
            }
            if (field.Comment.indexOf("@editor") >= 0) {
                field.Comment = field.Comment.replace(/@editor/g, "");
            }
            if (field.Comment.indexOf("@upload") >= 0) {
                field.Comment = field.Comment.replace(/@upload/g, "");
            }
            if (field.Comment.indexOf("@dateTimePicker") >= 0) {
                field.Comment = field.Comment.replace(/@dateTimePicker/g, "");
            }
            if (field.Comment.indexOf("@hidden") >= 0) {
                field.Comment = field.Comment.replace(/@hidden/g, "");
            }
        }
        const data = {
            functions: functions,
            grouping: grouping,
            operators: operators,
            fields: fields
        };
        this.success(data, "搜索条件");
    }
    /**
     *
     * @api {post} /admin/table/data 获取数据表数据
     * @apiDescription 获取数据表数据
     * @apiGroup Admin
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token.
     *
     * @apiSampleRequest /admin/table/data
     * @apiParamExample {json} Request-Example:
     *  {
     *       table: 'admin',//数据表名
     *       select: [{
     *           func: 'min',
     *           column: 'id'
     *       }],
     *       where: [{
     *           column: 'id',
     *           func: '=',
     *           value: '1'
     *       }],
     *       order: [{
     *           column: 'id',
     *           desc: 1
     *       }],
     *       limit: 50,
     *       page: 1,
     *   }
     *
     */
    async data() {
        const {
            table,
            select = [],
            where = [],
            order = [],
            limit = 50,
            page = 1
        } = this.post;
        const database = process.env.MYSQL_DATABASE;

        // 选择
        const selectOr = [];
        for (const row of select) {
            if (row.func && row.column) {
                selectOr.push("{" + row.func + "(`" + row.column + "`)" + "}");
            }
        }

        const offset = page ? limit * (page - 1) : 0;
        const fields = await this.fields(database, table);

        for (const field of fields) {
            if (field.Comment.indexOf("@editor") >= 0) {
                field.Comment = field.Comment.replace(/@editor/g, "");
            }
            if (field.Comment.indexOf("@must") >= 0) {
                field.Comment = field.Comment.replace(/@must/g, "");
            }
            if (field.Comment.indexOf("@editor") >= 0) {
                field.Comment = field.Comment.replace(/@editor/g, "");
            }
            if (field.Comment.indexOf("@upload") >= 0) {
                field.Comment = field.Comment.replace(/@upload/g, "");
            }
            if (field.Comment.indexOf("@dateTimePicker") >= 0) {
                field.Comment = field.Comment.replace(/@dateTimePicker/g, "");
            }
            if (field.Comment.indexOf("@hidden") >= 0) {
                field.Comment = field.Comment.replace(/@hidden/g, "");
            }
        }

        let whereOr = "";
        for (const row of where) {
            if (row.column) {
                whereOr += whereOr
                    ? " and `" +
                      row.column +
                      "` " +
                      row.func +
                      " '" +
                      row.value +
                      "'"
                    : "`" +
                      row.column +
                      "` " +
                      row.func +
                      " '" +
                      row.value +
                      "'";
            } else {
                if (row.value) {
                    let orwhere = "";
                    if (whereOr) {
                        whereOr += " and (";
                    } else {
                        whereOr += " (";
                    }
                    for (const field of fields) {
                        orwhere += orwhere
                            ? " or `" +
                              field.Field +
                              "` " +
                              row.func +
                              " '" +
                              row.value +
                              "'"
                            : "`" +
                              field.Field +
                              "` " +
                              row.func +
                              " '" +
                              row.value +
                              "'";
                    }
                    whereOr += orwhere + ")";
                }
            }
        }

        let orderBy = "";
        for (const row of order) {
            if (row.column) {
                orderBy +=
                    "`" + row.column + "` " + (row.desc ? "desc" : "") + ",";
            }
        }
        if (orderBy) {
            orderBy = orderBy.substr(0, orderBy.length - 1);
        } else {
            orderBy = "id asc";
        }

        let dataSql = await doodoo.bookshelf
            .knex(database + "." + table)
            .select(selectOr)
            .whereRaw(whereOr)
            .orderByRaw(orderBy)
            .limit(limit)
            .offset(offset)
            .toString();
        dataSql = dataSql.replace(/`{|}`/g, "");
        dataSql = dataSql.replace(/``/g, "`");

        const result = (await doodoo.bookshelf.knex.raw(dataSql))[0];
        for (const k in result) {
            if (this.isSeted(result[k].created_at)) {
                result[k].created_at = moment(result[k].created_at).format(
                    "YYYY-MM-DD HH:mm:ss"
                );
            }
            if (this.isSeted(result[k].updated_at)) {
                result[k].updated_at = moment(result[k].updated_at).format(
                    "YYYY-MM-DD HH:mm:ss"
                );
            }
            if (this.isSeted(result[k].deleted_at)) {
                result[k].deleted_at = moment(result[k].deleted_at).format(
                    "YYYY-MM-DD HH:mm:ss"
                );
            }
        }

        let countSql = await doodoo.bookshelf
            .knex(database + "." + table)
            .select(selectOr)
            .whereRaw(whereOr)
            .count()
            .toString();
        countSql = countSql.replace(/`{|}`/g, "");
        countSql = countSql.replace(/``/g, "`");

        const countData = (await doodoo.bookshelf.knex.raw(countSql))[0];
        const count = countData.length ? countData[0]["count(*)"] : 0;

        let pageCount = 1;
        if (limit) {
            pageCount = Math.ceil(count / limit);
        }

        const data = {
            fields: fields,
            data: result,
            pagination: {
                page: page,
                pageCount: pageCount,
                pageSize: limit,
                rowCount: count
            }
        };

        this.success(data, "数据查询");
    }
    /**
     *
     * @api {get} /admin/table/edit 获取单个数据
     * @apiDescription 获取单个数据
     * @apiGroup Admin
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token
     *
     * @apiParam {String} table 数据表名
     * @apiParam {Number} id
     *
     * @apiSampleRequest /admin/table/edit
     *
     */
    async edit() {
        const { table, id = 0 } = this.query;
        const database = process.env.MYSQL_DATABASE;

        const fields = await this.fields(database, table);
        let result = "";
        if (id) {
            result = (await doodoo.bookshelf
                .knex(database + "." + table)
                .where("id", id))[0];
            if (this.isSeted(result.created_at)) {
                result.created_at = moment(result.created_at).format(
                    "YYYY-MM-DD HH:mm:ss"
                );
            }
            if (this.isSeted(result.updated_at)) {
                result.updated_at = moment(result.updated_at).format(
                    "YYYY-MM-DD HH:mm:ss"
                );
            }
            if (this.isSeted(result.deleted_at)) {
                result.deleted_at = moment(result.deleted_at).format(
                    "YYYY-MM-DD HH:mm:ss"
                );
            }
        }

        const data = [];
        for (const field of fields) {
            let columnInput = "string";
            let required = false;
            const intof = _.indexOf(
                [
                    "tinyint",
                    "smallint",
                    "mediumint",
                    "int",
                    "bigint",
                    "decimal",
                    "float",
                    "double"
                ],
                field.Type_index
            );
            const strof = _.indexOf(
                [
                    "char",
                    "varchar",
                    "tinytext",
                    "text",
                    "mediumtext",
                    "longtext"
                ],
                field.Type_index
            );
            const timeof = _.indexOf(
                ["date", "datetime", "timestamp", "time", "year"],
                field.Type_index
            );
            if (intof >= 0) {
                columnInput = "int";
            }
            if (strof >= 0) {
                columnInput = "string";
            }
            if (timeof >= 0) {
                // columnInput = "time";
            }
            if (field.Comment.indexOf("@must") >= 0) {
                required = true;
                field.Comment = field.Comment.replace(/@must/g, "");
            }
            if (field.Comment.indexOf("@editor") >= 0) {
                columnInput = "editor";
                field.Comment = field.Comment.replace(/@editor/g, "");
            }
            if (field.Comment.indexOf("@upload") >= 0) {
                columnInput = "upload";
                field.Comment = field.Comment.replace(/@upload/g, "");
            }
            if (field.Comment.indexOf("@dateTimePicker") >= 0) {
                columnInput = "dateTimePicker";
                field.Comment = field.Comment.replace(/@dateTimePicker/g, "");
            }
            if (field.Comment.indexOf("@hidden") < 0) {
                data.push({
                    column_name: field.Field,
                    column_type: field.Type_index,
                    column_value: result ? result[field.Field] : "",
                    column_comment: field.Comment,
                    column_input: columnInput,
                    column_required: required
                });
            }
        }

        this.success(data);
    }
    /**
     *
     * @api {post} /admin/table/add 新增修改数据
     * @apiDescription 新增修改数据
     * @apiGroup Admin
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token.
     * @apiParamExample {json} Request-Example:
     *  {
     *       table: 'admin', //数据表名
     *       data:{
     *           id: 1,
     *           nickname: 'admin'
     *       }
     *   }
     *
     * @apiSampleRequest /admin/table/add
     *
     */
    async add() {
        const { table, data } = this.post;
        const database = process.env.MYSQL_DATABASE;
        const fields = await this.fields(database, table);
        for (const key in data) {
            for (const row of fields) {
                if (key === row.Field) {
                    if (
                        row.Comment.indexOf("@must") >= 0 &&
                        !this.isSeted(data[key])
                    ) {
                        row.Comment = row.Comment.replace(/@must/g, "");
                        this.fail(row.Comment + key + " is must");
                        return;
                    }
                }
            }
        }
        if (this.isSeted(data.id)) {
            const id = data.id;
            delete data.id;
            try {
                const result = await doodoo.bookshelf
                    .knex(database + "." + table)
                    .where("id", "=", id)
                    .update(data);

                this.success(result[0]);
            } catch (err) {
                this.fail(err);
            }
        } else {
            try {
                const result = await doodoo.bookshelf
                    .knex(database + "." + table)
                    .insert(data);

                this.success(result[0]);
            } catch (err) {
                this.fail(err);
            }
        }
    }
    /**
     *
     * @api {get} /admin/table/del 删除数据
     * @apiDescription 删除数据
     * @apiGroup Admin
     * @apiVersion 0.0.1
     *
     * @apiHeader {String} Token 用户登录授权token.
     * @apiParam {String} table 数据表名
     * @apiParam {String} ids
     *
     * @apiSampleRequest /admin/table/del
     *
     */
    async del() {
        const { table, ids } = this.query;
        const database = process.env.MYSQL_DATABASE;

        try {
            const result = await doodoo.bookshelf
                .knex(database + "." + table)
                .whereIn("id", ids.split(","))
                .del();

            this.success(result[0], "操作成功");
        } catch (err) {
            this.fail(err, "操作失败");
        }
    }
};
