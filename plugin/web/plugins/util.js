import Vue from "vue";

const util = {
    getLogo() {
        return `/api/home/public/logo`;
    },

    go(url) {
        if (this.isHttpUrl(url)) {
            window.open(url);
        } else {
            this.$router.push(url);
        }
    },

    getImageUrl(savename) {
        return `http://img.qingful.com/${savename}`;
    },

    getAvater(file, type = "") {
        if (file && file.id) {
            return this.getImageUrl(file.savename);
        } else {
            if (type == "1024") {
                return "/assets/avater-1024.png";
            } else {
                return "/assets/avater.png";
            }
        }
    },

    getAvaterUrl(url) {
        if (url) {
            return url;
        } else {
            return "/assets/avater.png";
        }
    },

    getUrl(url) {
        if (this.isHttpUrl(url)) {
            return url;
        } else {
            return this.$store.state.env.API_DOMAIN + url;
        }
    },

    getCoryright() {
        return location.origin;
    },

    strToArr(str) {
        if (str.indexOf(",") != -1) {
            return str.split(",");
        }
        return [str];
    },

    randomStrCode(len, str = "*") {
        let code;
        for (let i = 0; i < len; i--) {
            code += str;
        }
        return code;
    },

    getTokenUrl(url) {
        let str = "?";
        if (url.indexOf("?") !== -1) {
            str = "&";
        }

        return this.getUrl(url) + str + `Token=${this.$cookies.get("Token")}`;
    },

    getAppTokenUrl(url) {
        let str = "?";
        if (url.indexOf("?") !== -1) {
            str = "&";
        }

        return (
            this.getUrl(url) + str + `AppToken=${this.$cookies.get("AppToken")}`
        );
    },

    getAppWxaTokenUrl(url) {
        let str = "?";
        if (url.indexOf("?") !== -1) {
            str = "&";
        }

        return (
            this.getUrl(url) + str + `AppToken=${this.$cookies.get("AppToken")}&WxaToken=${this.$cookies.get("WxaToken")}`
        );
    },
    getWxaTokenUrl(url) {
        let str = "?";
        if (url.indexOf("?") !== -1) {
            str = "&";
        }

        return (
            this.getUrl(url) + str + `Token=${this.$cookies.get("Token")}&WxaToken=${this.$cookies.get("WxaToken")}`
        );
    },

    isHttpUrl(url) {
        if (url.substr(0, 7) == "http://" || url.substr(0, 8) == "https://") {
            return true;
        }
        return false;
    },

    isFn(fn) {
        if (typeof fn === "function") {
            return true;
        }
        return false;
    },

    isAgent() {
        const copyright = this.getCoryright();
        if (copyright.split(":")[0] === this.$store.state.env.DOMAIN) {
            return false;
        }
        return true;
    },

    isStepInStr(str, step = "/") {
        if (str.indexOf(step) != 0) {
            return false;
        }
        return true;
    },

    uploadHeaders() {
        return {
            Token: this.$cookies.get("Token") || "",
            AppToken: this.$cookies.get("AppToken") || "",
            WxaToken: this.$cookies.get("WxaToken") || ""
        };
    },

    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isLt2M;
    },
    format(time) {
        if (time) {
            const y = new Date(time).getFullYear();
            let m = new Date(time).getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            let d = new Date(time).getDate();
            d = d < 10 ? "0" + d : d;

            let h = new Date(time).getHours();
            h = h < 10 ? "0" + h : h;
            let mi = new Date(time).getMinutes();
            mi = mi < 10 ? "0" + mi : mi;
            let s = new Date(time).getSeconds();
            s = s < 10 ? "0" + s : s;
            return y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
        }
        return "";
    },
    getDiyComponentConfigOffset($el) {
        let offset = 0;
        function findWrap($el) {
            if ($el.className !== "layout-content-wrap") {
                offset += $el.offsetLeft;
                return findWrap($el.offsetParent);
            }
            return offset;
        }
        return 400 - findWrap($el);
    }
};

Vue.use(vue => {
    Object.assign(vue.prototype, util);
});

export default util;
