/**
 * Module dependencies.
 */

TopClient = require("./topClient").TopClient;

const client = new TopClient({
  appkey: "4272",
  appsecret: "0ebbcccfee18d7ad1aebc5b135ffa906",
  REST_URL: "http://api.daily.taobao.net/router/rest"
});

client.execute(
  "taobao.user.get",
  {
    fields: "nick,type,sex,location",
    nick: "sandbox_c_1"
  },
  (error, response) => {
    if (!error) console.log(response);
    else console.log(error);
  }
);
