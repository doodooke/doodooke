// 如果是微信内打开 from=... ，
//    则根据是否带有指定页信息 pageid=进行页面定位设置
//    否则从第一页开始
// 如果不是微信内打开，不做处理
var ua = navigator.userAgent.toLowerCase();

if (/micromessenger/.test(ua)){
  
  page_v = message_link.match(/&pageid=page_(\w*)/);
  page_h = message_hash.match(/page\/page_(\w*)/);

  if(message_link.indexOf('return=1')!=-1){

      // 打开新网页后返回的处理,避免因为带有from参数而无法定位
      message_link = message_link.replace('return=1', '');

  }else if(message_link.indexOf('disableHistoryStart=1')==-1 && page_v && page_v.length){

      // 设置了指定分享页的
      page_query_string = page_v[0];
      page_id = 'page_' + page_v[1];
      // message_link = message_link.replace(page_query_string,'');
      location.hash = '#page/'+page_id;
      
  }else{

    // 来自朋友圈分享／转发消息
    if ( window.location.search.indexOf('from=')>0){
      if (page_h && page_h.length){
        location.hash = message_hash.replace(page_h[0],'');
      }
    }
  }
}

// 背景音乐文件处理
if ( typeof bgsound_id!="undefined"&& window.location.search.indexOf(bgsound_id) >= 0 ){

    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i<vars.length; i++ ) {
        var pair = vars[i].split("=");
        if(pair[0] == bgsound_id){
            bgsound_src = pair[1];
            break;
        }
    }
}

// 严格依照微信JS-SDK说明文档开发 http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html

var wxConfigReady = true;
function shareSuccess(){
    $('#epub360-ad').addClass('show');
    if(typeof epub360ShareEvent =='function'){
      epub360ShareEvent();
    }
}
var audio,audioelement;
function playbgsound(){
    if(typeof config_player!="undefined" && config_player){
        return false; //如果是应用配置,则不自动播放
    }
       if(typeof bgsound_id!="undefined"&&typeof bgsound_src!="undefined"){
            var autostart = false;
            if(typeof bgsound_repeat!="undefined"&&bgsound_repeat==false){
                var loop="";
            }
            else{
                var loop='loop="loop"';
            }
            if(typeof bgsound_autostart!="undefined"&&bgsound_autostart==false){
            }
            else{
                autostart=true;
            }
            var d = new Date(), h = d.getHours();
            if (h>=20 && h<=23){
              if(wx_config['countnum']>30000 && clear_loading_progress_waiting > 200) autostart=false;
            }
            var newElement = document.createElement('div'); 
            newElement.id='soundcontainer'; 
            document.body.appendChild(newElement); 
            var audiocontainer=document.getElementById('soundcontainer');
            var gSound=bgsound_src;
            audiocontainer.innerHTML = '<audio id="bgsound" ' + loop + '> <source src="' + gSound + '" /> </audio>';
            audio = document.getElementById('bgsound');
            audio.src = gSound;
            if(autostart) audio.play();
           if(!audioelement) ;
           else interaction_view.playbgsound();
       }
}
var wx_permissions = {};
function load_wx(){
    weixin_initial = 1;
    
    wx.config({
      debug: wx_config['debug'],
      appId: wx_config['appId'],
      timestamp: wx_config['timestamp'],
      nonceStr: wx_config['nonceStr'],
      signature: wx_config['signature'],
      jsApiList: [
                'chooseImage', 'previewImage', 'uploadImage', 'downloadImage',
                'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',
                'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems','showMenuItems',
                'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 
                'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice','downloadVoice'
          ]
    });
    wx.ready(function () {
        
        if (wxConfigReady){
            wx.checkJsApi({
              jsApiList: [
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'hideMenuItems',
                'showMenuItems',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice'
              ],
              success: function (res) {
                wx_permissions = res['checkResult'];
              }
            });
        }
    
        wx.onMenuShareAppMessage({
          title: msgTitle,
          desc: msgContent,
          link: message_link,
          imgUrl: imgUrl,
          trigger: function (res) {
            _gaq.push(['_trackEvent', 'weixin', 'share', 'appmessage', 'click']);
          },
          success: function (res) {
            shareSuccess();
            interaction_view.weixin.eventStatistic('发送给朋友');
            _gaq.push(['_trackSocial', 'Wechat', 'appmessage', ga_opt_target, ga_opt_pagePath]);
            _paq.push(['trackEvent', 'weixin', 'share', 'appmessage']);
          },
          cancel: function (res) {
            _gaq.push(['_trackEvent', 'weixin', 'share', 'appmessage', 'cancel']);
          },
          fail: function (res) {
            _gaq.push(['_trackEvent', 'error', 'weixinjsapi', 'appmessage', JSON.stringify(res)]);
          }
        });
    
        wx.onMenuShareTimeline({
          title: shareTitle,
          link: message_link,
          imgUrl: imgUrl,
          trigger: function (res) {
            _gaq.push(['_trackEvent', 'weixin', 'share', 'timeline', 'click']);
          },
          success: function (res) {
            shareSuccess();
            interaction_view.weixin.eventStatistic('分享到朋友圈');
            _gaq.push(['_trackSocial', 'Wechat', 'timeline', ga_opt_target, ga_opt_pagePath]);
            _paq.push(['trackEvent', 'weixin', 'share', 'timeline']);
          },
          cancel: function (res) {
            _gaq.push(['_trackEvent', 'weixin', 'share', 'timeline', 'cancel']);
          },
          fail: function (res) {
            _gaq.push(['_trackEvent', 'error', 'weixinjsapi', 'timeline', JSON.stringify(res)]);
          }
        });
    
        wx.onMenuShareQQ({
          title: msgTitle,
          desc: msgContent,
          link: message_link,
          imgUrl: imgUrl,
          trigger: function (res) {
            _gaq.push(['_trackEvent', 'weixin', 'share', 'QQ', 'click']);
          },
          complete: function (res) {
            _gaq.push(['_trackEvent', 'weixin', 'share', 'QQ', 'complete']);
          },
          success: function (res) {
            shareSuccess();
            interaction_view.weixin.eventStatistic('分享到QQ');
            _gaq.push(['_trackSocial', 'Wechat', 'QQ', ga_opt_target, ga_opt_pagePath]);
            _paq.push(['trackEvent', 'weixin', 'share', 'QQ']);
          },
          cancel: function (res) {
            _gaq.push(['_trackEvent', 'weixin', 'share', 'QQ', 'cancel']);
          },
          fail: function (res) {
            _gaq.push(['_trackEvent', 'error', 'weixinjsapi', 'QQ', JSON.stringify(res)]);
          }
        });
    
        wx.onMenuShareWeibo({
          title: msgTitle,
          desc: msgContent,
          link: message_link,
          imgUrl: imgUrl,
          trigger: function (res) {
            _gaq.push(['_trackEvent', 'weixin', 'share', 'Weibo', 'click']);
          },
          complete: function (res) {
            _gaq.push(['_trackEvent', 'weixin', 'share', 'Weibo', 'complete']);
          },
          success: function (res) {
            shareSuccess();
            interaction_view.weixin.eventStatistic('分享到微博');
            _gaq.push(['_trackSocial', 'Wechat', 'Weibo', ga_opt_target, ga_opt_pagePath]);
            _paq.push(['trackEvent', 'weixin', 'share', 'Weibo']);
          },
          cancel: function (res) {
            _gaq.push(['_trackEvent', 'weixin', 'share', 'Weibo', 'cancel']);
          },
          fail: function (res) {
            _gaq.push(['_trackEvent', 'error', 'weixinjsapi', 'Weibo', JSON.stringify(res)]);
          }
        });
        // 预览模式下屏蔽右上角菜单
        if (preview_mode){
            // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            wx.hideMenuItems({
              menuList: [
                "menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp",
                "menuItem:share:facebook", "menuItem:share:QZone"
              ],
              fail: function(res){
                wx.hideOptionMenu();
              }
            });
        }
        //微信全局推送触发事件(测试代码)
        playbgsound();
    });
};
if (weixin_initial==0 && weixin_config_ready>0 && clear_loading_progress_waiting < 200){ load_wx(); }
wx.error(function (res) {
  wxConfigReady = false;
  _gaq.push(['_trackEvent', 'error', 'weixinjsapi', 'initial', res.errMsg, 'false']);
});
/*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 如有问题请通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
*/   

_gaq.push(['_setAccount', 'UA-8828452-4']);
_gaq.push(['_setDomainName', 'epub360.com']);
_gaq.push(['_trackPageview']);
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
window.loadAnalytics = function(){
        console.log("DOM fully loaded and parsed");
        workEnd("--------window.loadAnalytics --------");
        (function() {
            if(!window.Analytics_loaded) { //防止重复加载

                var s = document.getElementsByTagName('script')[0];

                // 播放模式下暂不进行谷歌统计
                // var ga = document.createElement('script');
                // ga.type = 'text/javascript';
                // ga.async = true;
                // ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                // s.parentNode.insertBefore(ga, s);

                // 去除百度统计
                // var ba = document.createElement('script'); ba.type = 'text/javascript';
                // ba.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + "hm.baidu.com/h.js?8f8817ff462f173893d1e1118c2a0ab8";
                // s.parentNode.insertBefore(ba, s);

                if (typeof Ta == 'undefined') {
                    var qa = document.createElement('script');
                    qa.type = 'text/javascript';
                    qa.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + "tajs.qq.com/stats?sId=46837630";
                    s.parentNode.insertBefore(qa, s);
                }

                // initila pwiki analytics
                var u = "//piwik.epub360.com/";
                _paq.push(['setTrackerUrl', u + 'piwik.php']);
                _paq.push(['setSiteId', 1]);
                var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                g.type = 'text/javascript';
                g.async = true;
                g.defer = true;
                g.src = 'http://v2.static.epub360.com/thirdparty/piwik/piwik.js';
                s.parentNode.insertBefore(g, s);

                window.Analytics_loaded = true;
            }
        })();
}

//处理不是微信的情况下音频的播放
var ua = navigator.userAgent.toLowerCase();
if(!(/micromessenger/.test(ua))){
  if(window.location.search.indexOf('autoplay=false')==-1){
    playbgsound();
  }
};