const Wxa = require("./wxa.class");

module.exports = class Analysis extends Wxa {
    getweanalysisappiddailysummarytrend(
        begin_date,
        end_date,
        authorizer_access_token
    ) {
        const url = `https://api.weixin.qq.com/datacube/getweanalysisappiddailysummarytrend?access_token=${authorizer_access_token}`;
        const params = {
            begin_date: begin_date,
            end_date: end_date
        };
        return this.post(url, params);
    }

    getweanalysisappiddailyvisittrend(
        begin_date,
        end_date,
        authorizer_access_token
    ) {
        const url = `https://api.weixin.qq.com/datacube/getweanalysisappiddailyvisittrend?access_token=${authorizer_access_token}`;
        const params = {
            begin_date: begin_date,
            end_date: end_date
        };
        return this.post(url, params);
    }

    getweanalysisappidweeklyvisittrend(
        begin_date,
        end_date,
        authorizer_access_token
    ) {
        const url = `https://api.weixin.qq.com/datacube/getweanalysisappidweeklyvisittrend?access_token=${authorizer_access_token}`;
        const params = {
            begin_date: begin_date,
            end_date: end_date
        };
        return this.post(url, params);
    }

    getweanalysisappidmonthlyvisittrend(
        begin_date,
        end_date,
        authorizer_access_token
    ) {
        const url = `https://api.weixin.qq.com/datacube/getweanalysisappidmonthlyvisittrend?access_token=${authorizer_access_token}`;
        const params = {
            begin_date: begin_date,
            end_date: end_date
        };
        return this.post(url, params);
    }

    getweanalysisappidvisitdistribution(
        begin_date,
        end_date,
        authorizer_access_token
    ) {
        const url = `https://api.weixin.qq.com/datacube/getweanalysisappidvisitdistribution?access_token=${authorizer_access_token}`;
        const params = {
            begin_date: begin_date,
            end_date: end_date
        };
        return this.post(url, params);
    }

    getweanalysisappiddailyretaininfo(
        begin_date,
        end_date,
        authorizer_access_token
    ) {
        const url = `https://api.weixin.qq.com/datacube/getweanalysisappiddailyretaininfo?access_token=${authorizer_access_token}`;
        const params = {
            begin_date: begin_date,
            end_date: end_date
        };
        return this.post(url, params);
    }

    getweanalysisappidweeklyretaininfo(
        begin_date,
        end_date,
        authorizer_access_token
    ) {
        const url = `https://api.weixin.qq.com/datacube/getweanalysisappidweeklyretaininfo?access_token=${authorizer_access_token}`;
        const params = {
            begin_date: begin_date,
            end_date: end_date
        };
        return this.post(url, params);
    }

    getweanalysisappidmonthlyretaininfo(
        begin_date,
        end_date,
        authorizer_access_token
    ) {
        const url = `https://api.weixin.qq.com/datacube/getweanalysisappidmonthlyretaininfo?access_token=${authorizer_access_token}`;
        const params = {
            begin_date: begin_date,
            end_date: end_date
        };
        return this.post(url, params);
    }

    getweanalysisappidvisitpage(begin_date, end_date, authorizer_access_token) {
        const url = `https://api.weixin.qq.com/datacube/getweanalysisappidvisitpage?access_token=${authorizer_access_token}`;
        const params = {
            begin_date: begin_date,
            end_date: end_date
        };
        return this.post(url, params);
    }
};
