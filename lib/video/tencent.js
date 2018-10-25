const axios = require("axios");
module.exports = {
    async getVideoUrl(url, options = {}) {
        try {
            const res = await axios(
                Object.assign(
                    {
                        url: url,
                        method: "get"
                    },
                    options
                )
            );
            if (res.data.errmsg && res.data.errmsg !== "ok") {
                console.error(moment().format("YYYY-MM-DD HH:mm:ss"));
                console.error(res.data);
            }
            const body = res.data;
            const videoInfoReg = /VIDEO_INFO = ({[^}]*})/;
            const listInfoReg = /LIST_INFO = ({[^}]*})/;
            const videoMatch =
                (body.match(videoInfoReg) && body.match(videoInfoReg)[1]) ||
                "{}";
            const listMatch =
                (body.match(listInfoReg) && body.match(listInfoReg)[1]) || "{}";
            const videoInfo = jsonParse(videoMatch) || {};
            const listInfo = jsonParse(listMatch) || {};

            const params = {
                // 'isHLS': false,
                // 'charge': 0,
                vid: videoInfo.vid,
                // 'defaultfmt': 'auto',
                // 'defn': 'sd',//sd（标清）、hd（高清）、shd（超清）、fhd（1080P）
                // 'defnpayver': 1,
                otype: "json",
                platform: 11001,
                sdtfrom: "v1103"
                // 'host': 'v.qq.com',
                // 'fhdswitch': 0,
                // 'show1080p': 0,
                // 'guid': '8e66ae036ed5662c168c925a0efd5014',
                // 'flowid': 'db40b1fce11f76377c845c1cef95fae4_70901',
                // 'defnpayver': 0,
                // 'appVer': '3.3.131',
                // 'ehost': 'https%3A%2F%2Fm.v.qq.com%2Fplay.html%3F%26vid%3Dl0560fsmenm%26ptag%3Dv_qq_com%2523v.play.adaptor%25233',
                // 'sphttps': 1,
                // '_rnd': 1508213457,
                // 'spwm': 4,
                // 'defn': 'auto',
                // 'fmt': 'auto',
                // 'defsrc': 1
            };

            const baseUrl =
                "http://h5vv.video.qq.com/getinfo?callback=formatParams&";
            const paramsArr = [];
            for (const key in params) {
                paramsArr.push("" + key + "=" + params[key]);
            }
            const paramsStr = paramsArr.join("&");

            const result = await axios(
                Object.assign(
                    {
                        url: baseUrl + paramsStr,
                        method: "get"
                    },
                    options
                )
            );
            return eval(result.data);
        } catch (err) {
            console.error(err);
        }
        function formatParams(para) {
            const result = [];
            const vi = (para && para.vl && para.vl.vi) || [];

            for (let i = 0, len = vi.length; i < len; i++) {
                const fileName = vi[i].fn;
                const fvkey = vi[i].fvkey;
                const ui = vi[i].ul.ui;
                for (let j = 0; j < ui.length; j++) {
                    result.push(
                        ui[j].url +
                            fileName +
                            "?vkey=" +
                            fvkey +
                            "&sdtfrom=v1103"
                    );
                }
            }
            return result;
        }
        function jsonParse(str) {
            str = str.replace(/\s+/g, "");
            str = str.replace(/\"+/g, "");
            str = str.replace(/\'+/g, "");
            str = str.substr(1, str.length - 1);
            const arr = str.split(",");
            const result = {};
            let temp;
            for (let i = 0, len = arr.length; i < len; i++) {
                temp = arr[i].split(":");
                result[temp[0]] = temp[1];
            }
            return result;
        }
    }
};
