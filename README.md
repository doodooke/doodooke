# 多多客(doodooke)小程序开源版

多多客免费开源的小程序SaaS系统，支持微信小程序，支付宝小程序，百度小程序，公众号等。

## 安装部署

### 开发环境安装

1. 手动下载zip代码或者使用命令下载`git clone https://gitee.com/doodooke/doodoo.git`

2. 进入代码根目录，然后执行命令安装依赖`npm run bootstrap`

3. 进入mysql数据库，创建`doodoo`数据库

4. 执行命令启动`npm run dev`，此时会同时启动前端和后端，并且修改前端代码会自动生效

5. 打开浏览器访问`http://127.0.0.1:3000`，会跳转到安装界面，完成安装。

6. 进入后台插件下载开源版，安装完成之后手动执行命令重启`npm run dev`

7. 打开浏览器访问`http://127.0.0.1:3000`，会跳转到登录页面，默认没有帐号密码，需要自己注册

8. 通过以上步骤即已成功安装多多小程序开源版

### 生成环境部署

1. 通过开发环境安装，调试，配置完成之后，执行以下命令编译启动`npm run web:build && pm2 start pm2.config.js`


## 协议规定的约束和限制

1. 未获得商业授权之前，不得将本软件用于商业用途（包括但不限于二次开发销售，以营利为目的的商业用途等）

## 问题反馈

在使用中有任何问题，请使用以下联系方式联系我们

QQ群: 874449168(交流群①)

邮箱: 786699892@qq.com

码云: https://gitee.com/doodooke/doodoo

文档: http://doodooke.gitee.io/doodoo/#/

## 官网
[多多客Doodooke小程序](https://www.doodooke.com)

## 缩略图
![](/docs/thumb/1.jpg)
![](/docs/thumb/2.jpg)
![](/docs/thumb/3.jpg)
![](/docs/thumb/4.jpg)
![](/docs/thumb/5.jpg)
![](/docs/thumb/6.jpg)
![](/docs/thumb/7.jpg)
