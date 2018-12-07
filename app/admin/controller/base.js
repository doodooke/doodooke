const jwt = require("jsonwebtoken");

function jwtVerify(str, secret) {
    return jwt.verify(str, secret || process.env.JWT_SECRET);
}

module.exports = class extends doodoo.Controller {
    async getAdminInfo() {
        const admin = await this.isAdminAuth();
        if (admin) {
            const admin = await this.model("admin")
                .query({ where: { id: this.state.admin.id } })
                .fetch({ withRelated: [] });
            this.success(admin);
        }
    }

    async isAdminAuth() {
        try {
            const Token = this.query.Token || this.get("Token");
            if (!Token) {
                this.status = 401;
                this.fail("授权失败", "Admin Unauthorized");
                return false;
            }

            const decoded = jwtVerify(Token, process.env.JWT_ADMIN_SECRET);
            if (decoded.code && decoded.code === this.securityCode) {
                return (this.state.admin = decoded);
            }
            const admin = await this.model("admin")
                .query({ where: { id: decoded.id } })
                .fetch();
            if (!admin) {
                this.status = 401;
                this.fail("用户未授权", "Admin Unauthorized");
                return false;
            }
            if (!admin.status) {
                this.status = 401;
                this.fail("用户被禁用", "Admin Status Unauthorized");
                return false;
            }

            return (this.state.admin = admin);
        } catch (err) {
            this.status = 401;
            this.fail("授权失败", "Admin Unauthorized");
            return false;
        }
    }
    // 函数
    async functions() {
        return [
            "char_length",
            "date",
            "from_unixtime",
            "lower",
            "round",
            "sec_to_time",
            "time_to_sec",
            "upper"
        ];
    }
    // 集合
    async grouping() {
        return [
            "avg",
            "count",
            "count distinct",
            "group_concat",
            "max",
            "min",
            "sum"
        ];
    }
    // 搜索
    async operators() {
        return [
            "=",
            "<",
            ">",
            "<=",
            ">=",
            "!=",
            "LIKE",
            "LIKE %%",
            "REGEXP",
            "IN",
            "IS NULL",
            "NOT LIKE",
            "NOT REGEXP",
            "NOT IN",
            "IS NOT NULL",
            "SQL"
        ];
    }
    // mysql函数
    async fus() {
        return [
            {
                name: "数学函数",
                sub: [
                    {
                        fn_name: "ABS(x)",
                        fn_value: "ABS",
                        describe: "返回x的绝对值",
                        sql: "SELECT ABS(-1) -- 返回1"
                    },
                    {
                        fn_name: "CEIL(x)",
                        fn_value: "CEIL",
                        describe: "返回大于或等于x的最小整数",
                        sql: "SELECT CEIL(1.5) -- 返回2"
                    },
                    {
                        fn_name: "FLOOR(x)",
                        fn_value: "FLOOR",
                        describe: "返回小于或等于x的最大整数",
                        sql: "SELECT FLOOR(1.5) -- 返回1"
                    },
                    {
                        fn_name: "RAND(x)",
                        fn_value: "RAND",
                        describe: "返回0->1的随机数，x值相同时返回的随机数相同",
                        sql: "SELECT RAND(2) --1.5865798029924"
                    },
                    {
                        fn_name: "SIGN(x)",
                        fn_value: "SIGN",
                        describe: "返回x的符号,x是负数0、正数分别返回-1、0和1",
                        sql: "SELECT SIGN(-10) -- (-1)"
                    },
                    {
                        fn_name: "PI()",
                        fn_value: "PI",
                        describe: "返回圆周率(3.141593)",
                        sql: "SELECT PI() --3.141593"
                    },
                    {
                        fn_name: "TRUNCATE(x,y)",
                        fn_value: "TRUNCATE",
                        describe:
                            "返回数值x保留到小数点后y位的值（与ROUND最大的区别是不会进行四舍五入）",
                        sql: "SELECT TRUNCATE(1.23456,3) -- 1.234"
                    },
                    {
                        fn_name: "ROUND(x)",
                        fn_value: "ROUND",
                        describe: "返回离x最近的整数",
                        sql: "SELECT ROUND(1.23456) --1"
                    },
                    {
                        fn_name: "ROUND(x,y)",
                        fn_value: "ROUND",
                        describe: "保留x小数点后y位的值,但截断时要进行四舍五入",
                        sql: "SELECT ROUND(1.23456,3) -- 1.235"
                    },
                    {
                        fn_name: "POW(x,y)",
                        fn_value: "POW",
                        describe: "返回x的y次方",
                        sql: "SELECT POW(2,3) -- 8"
                    },
                    {
                        fn_name: "SQRT(x)",
                        fn_value: "SQRT",
                        describe: "返回x的平方根",
                        sql: "SELECT SQRT(25) -- 5"
                    },
                    {
                        fn_name: "EXP(x)",
                        fn_value: "EXP",
                        describe: "返回e的x次方",
                        sql: "SELECT EXP(3) -- 20.085536923188"
                    },
                    {
                        fn_name: "MOD(x,y)",
                        fn_value: "MOD",
                        describe: "返回x除以y以后的余数",
                        sql: "SELECT MOD(5,2) -- 1"
                    },
                    {
                        fn_name: "LOG(x)",
                        fn_value: "LOG",
                        describe: "返回自然对数(以e为底的对数)",
                        sql: "SELECT LOG(20.085536923188) -- 3"
                    },
                    {
                        fn_name: "LOG10(x)",
                        fn_value: "LOG10",
                        describe: "返回以10为底的对数",
                        sql: "SELECT LOG10(100) -- 2"
                    },
                    {
                        fn_name: "RADIANS(x)",
                        fn_value: "RADIANS",
                        describe: "将角度转换为弧度",
                        sql: "SELECT RADIANS(180) -- 3.1415926535898"
                    },
                    {
                        fn_name: "DEGREES(x)",
                        fn_value: "DEGREES",
                        describe: "将弧度转换为角度",
                        sql: "SELECT DEGREES(3.1415926535898) -- 180"
                    },
                    {
                        fn_name: "SIN(x)",
                        fn_value: "SIN",
                        describe: "求正弦值(参数是弧度)",
                        sql: "SELECT SIN(RADIANS(30)) -- 0.5"
                    },
                    {
                        fn_name: "ASIN(x)",
                        fn_value: "ASIN",
                        describe: "求反正弦值(参数是弧度)",
                        sql: ""
                    },
                    {
                        fn_name: "COS(x)",
                        fn_value: "COS",
                        describe: "求余弦值(参数是弧度)",
                        sql: ""
                    },
                    {
                        fn_name: "ACOS(x)",
                        fn_value: "ACOS",
                        describe: "求反余弦值(参数是弧度)",
                        sql: ""
                    },
                    {
                        fn_name: "TAN(x)",
                        fn_value: "TAN",
                        describe: "求正切值(参数是弧度)",
                        sql: ""
                    },
                    {
                        fn_name: "ATAN(x)",
                        fn_value: "ATAN",
                        describe: "求反正切值(参数是弧度)",
                        sql: ""
                    },
                    {
                        fn_name: "COT(x)",
                        fn_value: "COT",
                        describe: "求余切值(参数是弧度)",
                        sql: ""
                    }
                ]
            },
            {
                name: "字符串函数",
                sub: [
                    {
                        fn_name: "CHAR_LENGTH(s)",
                        fn_value: "CHAR_LENGTH",
                        describe: "返回字符串s的字符数",
                        sql: "SELECT CHAR_LENGTH('你好123') -- 5"
                    },
                    {
                        fn_name: "LENGTH(s)",
                        fn_value: "LENGTH",
                        describe: "返回字符串s的长度",
                        sql: "SELECT LENGTH('你好123') -- 9"
                    },
                    {
                        fn_name: "CONCAT(s1,s2,...)",
                        fn_value: "CONCAT",
                        describe: "将字符串s1,s2等多个字符串合并为一个字符串",
                        sql: "SELECT CONCAT('12','34') -- 1234"
                    }
                ]
            },
            {
                name: "日期时间函数",
                sub: [
                    {
                        fn_name: "CURDATE()",
                        fn_value: "CURDATE",
                        describe: "返回当前日期",
                        sql: "SELECT CURDATE() ->2014-12-17"
                    },
                    // {
                    //     fn_name: "CURRENT_DATE()",
                    //     fn_value: "CURRENT_DATE",
                    //     describe: "返回当前日期",
                    //     sql: `SELECT CURRENT_DATE() ->2014-12-17`
                    // },
                    {
                        fn_name: "CURTIME()",
                        fn_value: "CURTIME",
                        describe: "返回当前时间",
                        sql: "SELECT CURTIME() ->15:59:02"
                    },
                    // {
                    //     fn_name: "CURRENT_TIME",
                    //     fn_value: "CURRENT_TIME",
                    //     describe: "返回当前时间",
                    //     sql: `SELECT CURRENT_TIME ->15:59:02`
                    // },
                    {
                        fn_name: "NOW()",
                        fn_value: "NOW",
                        describe: "返回当前日期和时间",
                        sql: "SELECT NOW() ->2014-12-17 15:59:02"
                    },
                    {
                        fn_name: "UNIX_TIMESTAMP()",
                        fn_value: "UNIX_TIMESTAMP",
                        describe: "以UNIX时间戳的形式返回当前时间",
                        sql: "SELECT UNIX_TIMESTAMP() ->1418803177"
                    }
                ]
            },
            {
                name: "加密函数",
                sub: [
                    {
                        fn_name: "PASSWORD(str)",
                        fn_value: "PASSWORD",
                        describe:
                            "该函数可以对字符串str进行加密，一般情况下，PASSWORD(str)用于给用户的密码加密",
                        sql: `SELECT PASSWORD('123')
    ->*23AE809DDACAF96AF0FD78ED04B6A265E05AA257`
                    },
                    {
                        fn_name: "MD5(str)",
                        fn_value: "MD5",
                        describe:
                            "MD5(str)函数可以对字符串str进行散列，可以用于一些普通的不需要解密的数据加密",
                        sql: `SELECT md5('123')
    ->202cb962ac59075b964b07152d234b70`
                    },
                    {
                        fn_name: "ENCODE(str,pswd_str)",
                        fn_value: "ENCODE",
                        describe:
                            "ENCODE函数可以使用加密密码pswd_str来加密字符串str，加密结果是二进制数，需要使用BLOB类型的字段保存。该函数与DECODE是一对，需要同样的密码才能够解密",
                        sql: `SELECT ENCODE('123','xxoo')
    ->;vx`
                    },
                    {
                        fn_name: "DECODE(crypt_str,pswd_str)",
                        fn_value: "DECODE",
                        describe: "该函数与ENCODE是一对，解密",
                        sql: `SELECT DECODE(';vx','xxoo')
    ->123`
                    }
                ]
            },
            {
                name: "其他函数",
                sub: [
                    {
                        fn_name: "FORMAT(x,n)",
                        fn_value: "FORMAT",
                        describe:
                            "FORMAT(x,n)函数可以将数字x进行格式化，将x保留到小数点后n位。",
                        sql: `SELECT FORMAT(3.1415926,3)
    ->3.142`
                    },
                    {
                        fn_name: "ASCII(s)",
                        fn_value: "ASCII",
                        describe: "返回字符串s的第一个字符的ASCII码",
                        sql: ""
                    },
                    {
                        fn_name: "BIN(x)",
                        fn_value: "BIN",
                        describe: "返回x的二进制编码",
                        sql: ""
                    }
                ]
            }
        ];
    }
    async fields(database, table_name, column_name) {
        let sql =
            "show full fields from `" + database + "`.`" + table_name + "`";
        if (column_name) {
            sql =
                "show full fields from `" +
                database +
                "`.`" +
                table_name +
                "` where field = '" +
                column_name +
                "'";
        }

        const fields = (await doodoo.bookshelf.knex.raw(sql))[0];
        for (const key in fields) {
            const match = fields[key].Type.match(
                "^([^( ]+)(?:\\((.+)\\))?( unsigned)?( zerofill)?$"
            );
            fields[key].Type_index = match[1] ? match[1] : "";
            fields[key].Type_length = match[2] ? match[2] : "";
        }

        return column_name ? fields[0] : fields;
    }
    isSeted(name) {
        if (name !== "" && name !== undefined && name !== "undefined") {
            return true;
        }
        return false;
    }
};
