# doodoo

多多小程序开源版



## API接口文件 server

#### 环境需求
> node >= 8.0
> mysql

#### 配置文件 .env
```
# 应用配置
APP_PORT=3001
APP_HOST=http://127.0.0.1:3001

# 验证码
VERIFY_MAXIP=36 		//验证码最大ip限制
VERIFY_MAXPHONE=6 		//验证码最大个数限制

# MYSQL数据库链接
MYSQL=true				
MYSQL_HOST=127.0.0.1 	//服务器地址
MYSQL_USER=root 		//用户名
MYSQL_PASSWORD=root 	//密码
MYSQL_DATABASE=doodoo 	//数据库名
MYSQL_PORT=3306 		//端口
MYSQL_CHARSET=utf8mb4 	//数据库编码

# REDIS链接
REDIS=true				//开启
REDIS_HOST=127.0.0.1 	//主机地址
REDIS_PORT=6379 		//端口
REDIS_PREFIX=xxx 		//前缀

# 七牛云 https://www.qiniu.com/
QINIU=false				//七牛云开启true，关闭false
QINIU_ACCESSKEY=xxx 	//个人中心-密钥管理-AccessKey
QINIU_SECRETKEY=xxx		//个人中心-密钥管理-SecretKey
QINIU_BUCKET=xxx		//存储空间名
QINIU_DOMAIN=xxx		//七牛云存储域名

# 分页
PAGE_SIZE=20			//分页，每页显示数据个数

# jwt配置 https://www.npmjs.com/package/jsonwebtoken
JWT_SECRET=xxx 			//密钥，自己设置
JWT_EXPIRESIN=7 days	//过期时间

# 微信开放平台 https://open.weixin.qq.com/
OPEN_APPID=xxx 			//管理中心-第三方平台-创建第三方-AppID
OPEN_APPSECRET=xxx		//管理中心-第三方平台-创建第三方-AppSecret
OPEN_TOKEN=xxx			//消息校验Token
OPEN_ENCODINGAESKEY=xxx //消息加解密Key

授权登录相关
登录授权的发起页域名		   api.xx.com
授权测试公众号列表			xxxxx
授权事件接收URL			  http://api.xx.com/app/home/wxa/open/wxaNotice

授权后实现业务
消息校验Token			   xxxxx
消息加解密Key			  xxxxxxxxx
消息与事件接收URL			 http://api.xx.com/app/home/wxa/open/wxaMsg/$APPID$
小程序服务器域名			api.xx.com
小程序业务域名				 api.xx.com

# 微信服务号 https://mp.weixin.qq.com
WX_APPID=xxx 			 	//开发-基本配置-开发者ID(AppID)
WX_APPSECRET=xxx		 	//开发-基本配置-开发者密码(AppSecret)
WX_TOKEN=xxx			 	//开发-基本配置-令牌(Token)
WX_ENCODINGAESKEY=xxx	 	//开发-基本配置-消息加解密密钥(EncodingAESKey)

http://api.xx.com/app/home/wechat/index


# 支付宝支付
ALIPAY_ACCOUNT=xxx		 	//商户号
ALIPAY_PARTNER=xxx		 	//合作身份者ID，以2088开头由16位纯数字组成的字符串
ALIPAY_KEY=xxx			 	//MD5密钥

我的商家服务-账户管理-商户信息管理-查看PID|KEY-
合作伙伴身份
MD5密钥

# 阿里云短信
ALISMS_APPKEY=xxx 		 	//AccessKey ID
ALISMS_APPSECRET=xxx		//Access Key Secret
ALISMS_FREE_SIGN_NAME=xxx	//签名名称
ALISMS_TEMPLATE_CODE=xxx	//模版CODE

尊敬的用户, 您的验证码是${code}，请及时输入验证码完成操作。
```

#### 安装使用
```sh
// 进入项目
cd server
// 使用yarn或者npm安装依赖
yarn 或者 npm install
// 导入数据库文件 
/sql/doodoo.sql
// 配置数据库连接文件 
.env
// 启动项目
node app.js
```

#### 启动信息

```text
[doodoo] Version: 1.0.1
[doodoo] Website: http://127.0.0.1:3001
[doodoo] Nodejs Version: v10.9.0
[doodoo] Nodejs Platform: darwin x64
[doodoo] Server Enviroment: dev
[doodoo] Server Startup Time: 2497ms
[doodoo] Server Current Time: 2018-09-05 15:21:30
[doodoo] Server Running At: http://127.0.0.1:3001
```

## 后台 client

#### 安装使用
```sh
// 进入项目
cd client
// 使用yarn或者npm安装依赖
yarn 或者 npm install
// 配置API接口文件
nuxt.config.js
const apiHost = "http://127.0.0.1:3001"
// 启动项目
// 后台地址：http://127.0.0.1:3000/public/login 默认账号：18538253627 密码：18538253627
// 超管地址：http://127.0.0.1:3000/admin 默认账号：admin 密码：admin
yarn dev 或者npm run dev
```

## 小程序端 wxa

#### 使用说明
```sh
// 配置API接口文件
utils/doodoo.js // 第8行
wx.doodoo.host = "127.0.0.1:3001"
wx.doodoo.secure = true; // 开发模式
// 正式上线请把开发模式关闭
```

## 问题反馈
在使用中有任何问题，请使用以下联系方式联系我们

QQ群: 874449168(交流群①)

 <img src="https://gitee.com/doodooke/doodoo/raw/master/thumb/qqqun.jpg" width="300" alt="874449168"/>

EMAIL: 786699892@qq.com

码云: https://gitee.com/doodooke/doodoo

## 官网
[多多客Doodooke小程序](http://www.doodooke.qingful.com)

## 缩略图
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/1.jpg)
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/2.jpg)
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/3.jpg)
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/4.jpg)
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/5.jpg)
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/6.jpg)
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/7.jpg)