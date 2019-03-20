# 多多客(doodooke)小程序开源版

多多客免费开源的小程序SaaS系统，koa.js + vue.js插件化最佳实践。

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



## 常见问题

1. 前后端如何分离启动？

   > 前端开发人员启动命令：`npm run web:dev`
   >
   > 后端开发人员启动命令：`npm run api:dev`

2. 启动成功之后，微信自动登录扫描之后没反应？

   > 默认启动是使用一个域名，如果遇到当前问题，需要使用两个域名，一个绑定后端，一个绑定前端

3. 从插件市场下载到插件为什么没有自动生效？

   > 环境因素，代码启动的方式不同，所有默认生产环境启动推荐使用pm2。当代码没有自动生效时，请手动重启生效

4. 如何获得安全码？
   
   > 系统第一次启动会自动生成安装码到代码根目录`SECURITY_CODE.key`， 也可以通过超管后台更多获取安全码

## 问题反馈

在使用中有任何问题，请使用以下联系方式联系我们

QQ群: 874449168(交流群①)

 <img src="https://gitee.com/doodooke/doodoo/raw/master/thumb/qqqun.jpg" width="300" alt="874449168"/>

EMAIL: 786699892@qq.com

码云: https://gitee.com/doodooke/doodoo

## 官网
[多多客Doodooke小程序](https://www.doodooke.com)

## 缩略图
![](./raw/master/thumb/1.jpg)
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/2.jpg)
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/3.jpg)
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/4.jpg)
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/5.jpg)
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/6.jpg)
![](https://gitee.com/doodooke/doodoo/raw/master/thumb/7.jpg)