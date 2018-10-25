// 如果是微信内打开 from=... ，
//    则根据是否带有指定页信息 pageid=进行页面定位设置
//    否则从第一页开始
// 如果不是微信内打开，不做处理
var ua = navigator.userAgent.toLowerCase();
if (/wxdebug/.test(window.location.href)){
  alert(window.location.href);
}
if (/micromessenger/.test(ua)){
  
  page_v = message_link.match(/&pageid=page_(\w*)/);
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
      location.hash = '';
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
}
var audio,audioelement;
function playbgsound(){
       if(typeof bgsound_id!="undefined"&&typeof bgsound_src!="undefined"){
            var newElement = document.createElement('div'); 
            newElement.id='soundcontainer'; 
            document.body.appendChild(newElement); 
            var audiocontainer=document.getElementById('soundcontainer');
            var gSound=bgsound_src;
            audiocontainer.innerHTML = '<audio id="bgsound" loop="loop"> <source src="' + gSound + '" /> </audio>'; 
            audio = document.getElementById('bgsound');
            audio.src = gSound;
            audio.play(); 
           if(!audioelement) audio.pause();           
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
                'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu',
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
          title: shareTitle,
          desc: descContent,
          link: message_link,
          imgUrl: imgUrl,
          trigger: function (res) {
            _gaq.push(['_trackEvent', 'weixin', 'share', 'appmessage', 'click']);
          },
          success: function (res) {
            shareSuccess();
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
          title: shareTitle,
          desc: descContent,
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
          title: shareTitle,
          desc: descContent,
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
            wx.hideOptionMenu();
        }
        //微信全局推送触发事件(测试代码)
        playbgsound();
    });
};
if (weixin_initial==0 && weixin_config_ready==1){
    load_wx();
}
wx.error(function (res) {
  wxConfigReady = false;
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
