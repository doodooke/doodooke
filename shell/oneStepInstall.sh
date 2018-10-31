# !/bin/bash

echo "环境检测"
if  node -v > /dev/null; then
	echo "[1/4] 检测环境node通过"
else
	exit;
fi

if  yarn -v > /dev/null; then
	echo "[2/4] 检测环境yarn通过"
else
	exit;
fi

if  pm2 -v > /dev/null; then
	echo "[3/4] 检测环境pm2通过"
else
	exit;
fi

if  wget --version > /dev/null; then
	echo "[4/4] 检测环境wget通过"
else
	exit;
fi

echo "下载系统"
git clone https://gitee.com/doodooke/doodoo.git
cd doodoo
yarn install

echo "后端配置"
echo "[1/10] 应用配置"
read -p "APP_PORT（应用端口，推荐3000端口）: " APP_PORT
read -p "APP_HOST（应用域名，例如https://www.doodooke.com）: " APP_HOST

echo "[2/10] MYSQL数据库链接"
read -p "MYSQL_HOST（主机）: " MYSQL_HOST
read -p "MYSQL_USER（用户名）: " MYSQL_USER
read -p "MYSQL_PASSWORD（密码）: " MYSQL_PASSWORD
read -p "MYSQL_DATABASE（数据库）: " MYSQL_DATABASE

echo "[3/10] REDIS链接"
read -p "REDIS_HOST（主机）: " REDIS_HOST
read -p "REDIS_PREFIX（前缀）: " REDIS_PREFIX

echo "[4/10] 七牛云"
read -p "QINIU_ACCESSKEY（AccessKey）: " QINIU_ACCESSKEY
read -p "QINIU_SECRETKEY（SecretKey）: " QINIU_SECRETKEY
read -p "QINIU_BUCKET（存储空间名称）: " QINIU_BUCKET
read -p "QINIU_DOMAIN（绑定域名，例如http://img.doodooke.com）: " QINIU_DOMAIN

echo "[5/10] jwt配置"
read -p "JWT_SECRET（秘钥）: " JWT_SECRET

echo "[6/10] jwt admin配置"
read -p "JWT_ADMIN_SECRET（超管秘钥）: " JWT_ADMIN_SECRET

echo "[7/10] 微信开放平台"
read -p "OPEN_APPID（AppID）: " OPEN_APPID
read -p "OPEN_APPSECRET（AppSecret）: " OPEN_APPSECRET
read -p "OPEN_TOKEN（消息校验Token）: " OPEN_TOKEN
read -p "OPEN_ENCODINGAESKEY（消息加解密Key）: " OPEN_ENCODINGAESKEY

echo "[8/10] 微信服务号"
read -p "WX_APPID（AppID）: " WX_APPID
read -p "WX_APPSECRET（AppSecret）: " WX_APPSECRET
read -p "WX_TOKEN（令牌Token）: " WX_TOKEN
read -p "WX_ENCODINGAESKEY（消息加解密密钥）: " WX_ENCODINGAESKEY

echo "[9/10] 支付宝支付"
read -p "ALIPAY_ACCOUNT（支付宝账号）: " ALIPAY_ACCOUNT
read -p "ALIPAY_PARTNER（合作伙伴身份）: " ALIPAY_PARTNER
read -p "ALIPAY_KEY（MD5密钥）: " ALIPAY_KEY

echo "[10/10] 阿里云短信"
echo '请前往阿里云短信添加一个模版：尊敬的用户, 您的验证码是${code}，请及时输入验证码完成操作。'
read -p "ALISMS_APPKEY（AccessKey ID）: " ALISMS_APPKEY
read -p "ALISMS_APPSECRET（Access Key Secret）: " ALISMS_APPSECRET
read -p "ALISMS_FREE_SIGN_NAME（签名名称）: " ALISMS_FREE_SIGN_NAME
read -p "ALISMS_TEMPLATE_CODE（模版CODE）: " ALISMS_TEMPLATE_CODE

echo -e "
# 应用配置
APP_PORT=$APP_PORT
APP_HOST=$APP_HOST
APP_PREFIX=/api

# 验证码
VERIFY_MAXIP=36
VERIFY_MAXPHONE=6

# MYSQL数据库链接
MYSQL=true
MYSQL_HOST=$MYSQL_HOST
MYSQL_USER=$MYSQL_USER
MYSQL_PASSWORD=$MYSQL_PASSWORD
MYSQL_DATABASE=$MYSQL_DATABASE
MYSQL_PORT=3306
MYSQL_CHARSET=utf8mb4

# REDIS链接
REDIS=true
REDIS_HOST=$REDIS_HOST
REDIS_PORT=$REDIS_PORT
REDIS_PREFIX=$REDIS_PREFIX

# 七牛云
QINIU=true
QINIU_ACCESSKEY=$QINIU_ACCESSKEY
QINIU_SECRETKEY=$QINIU_SECRETKEY
QINIU_BUCKET=$QINIU_BUCKET
QINIU_DOMAIN=$QINIU_DOMAIN

# 分页
PAGE_SIZE=20

# jwt配置
JWT_SECRET=$JWT_SECRET
JWT_EXPIRESIN=7 days

# jwt admin配置
JWT_ADMIN_SECRET=$JWT_ADMIN_SECRET
JWT_ADMIN_EXPIRESIN=7 days

# 微信开放平台
OPEN_APPID=$OPEN_APPID
OPEN_APPSECRET=$OPEN_APPSECRET
OPEN_TOKEN=$OPEN_TOKEN
OPEN_ENCODINGAESKEY=$OPEN_ENCODINGAESKEY

# 微信服务号
WX_APPID=$WX_APPID
WX_APPSECRET=$WX_APPSECRET
WX_TOKEN=$WX_TOKEN
WX_ENCODINGAESKEY=$WX_ENCODINGAESKEY

# 支付宝支付
ALIPAY_ACCOUNT=$ALIPAY_ACCOUNT
ALIPAY_PARTNER=$ALIPAY_PARTNER
ALIPAY_KEY=$ALIPAY_KEY

# 阿里云短信 1阿里大雨 2阿里云
ALISMS_TYPE=2
ALISMS_APPKEY=$ALISMS_APPKEY
ALISMS_APPSECRET=$ALISMS_APPSECRET
ALISMS_FREE_SIGN_NAME=$ALISMS_FREE_SIGN_NAME
ALISMS_TEMPLATE_CODE=$ALISMS_TEMPLATE_CODE

# 常用命令
CMD_INSTALL=yarn install
CMD_BUILD=npm run web:build
" > ./.env

# ===============================

echo "node环境"
read -p "是否安装doodooke node环境（yes/no）: " DOODOO_NODE
if test "$DOODOO_NODE" == "yes" ; then

	if [[ `uname` -eq "Darwin" ]]; then
		OS="mac"
	elif [[ `uname` -eq "Linux" ]]; then
		OS="linux"
	else
		OS="windows"
	fi

	NODE_PWD=`which node`

	wget -O $NODE_PWD "https://raw.githubusercontent.com/doodooke/node/master/8.12.0/$OS/node"
	chmod a+w $NODE_PWD
fi

echo "配置完成"

echo "========"
echo "常见问题"
echo "如何修改配置文件？"
echo "答：直接修改系统根目录下.env和.env.web文件"
echo "========"

echo "执行以下命令启动"
echo "1. 开发环境启动(npm run dev)"
echo "2. 生产环境启动(npm run web:build && pm2 start pm2.json)"
read -p "请输入要执行的序号: " type

if test "$type" == "1"; then
	npm run dev
elif test "$type" == "2"; then
	npm run web:build && pm2 start pm2.json
fi
