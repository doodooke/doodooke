## **新特性**

### 3.0

1. 支持migrations，可以快速的创建和修改表

   > 通过命令`./bin/migrate.js make [name] --scope [module]`创建migration，然后使用`./bin/migrate.js latest`执行migration，使用`./bin/migrate.js rollback`回滚migration，具体migration的用法可以参考knex文档 https://knexjs.org

1. 支持rewrite，可以将请求转发到修改过的接口

   > 二次开发最大的问题就是如何在保证系统一致性和更新的情况下，二次修改代码。比如我们需要修改app模块，然后我们复制app模块，起名apps，然后修改rewrite.js，添加如下数据，即完成了配置。此时我们请求app模块会全部转发到apps模块。提示：一个模块下前端路由不带/api，后端路由以/api开头
   >
   > ```js
   > module.exports = {
   >      "/app": "/apps",
   >      "/api/app": "/api/apps"
   >  }
   > ```
   >


1. 支持view逻辑钩子，可以扩展vue逻辑

   > 3.0重要的特性之一，可以很方便到扩展vue前端逻辑。通过调用`this.$hook.run("xxx", 1, 2)`自动加载view_hook目录下hook.js名称为`xxx`的函数，修改data里面的数据等。

1. 支持view视图钩子，可以扩展vue视图

   > 3.0重要的特性之二，可以很方便的扩展vue前端视图，通过调用`<doodoo-hook name="xxx" abc="2"></doodoo-hook>`实现，当系统发现view_hook目录下，名称是`xxx.vue`会自动加载到调用的位置

1. 支持cluster，可以启动多个项目

   > 目前仅支持同一个序列号，同一台服务器启动多个实例，如需多台服务器启动，请联系客服

1. 支持本地调试，可以将生产环境的请求转发或复制到本地

   > 解决生产环境的bug，是一个很头痛的问题，我们除了有错误监控外，新增加了本地调试功能。本地调试功能可以将线上生产环境的请求转发或者复制到本地系统，这样可以快速的发现和修复bug。线上的已全部集成到所有的系统，线下的命令行工具会随后发布。

1. 支持bin命令，可以快速的处理migration等

   > 目前支持doodoo.sh和migrate.js命令

