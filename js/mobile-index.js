  var ym = window.location.protocol + "//" + window.location.host;
// var ym = 'https://haohaibang.com';
//  var dz = ym + "/hxhrbmp/";
 var dz = "http://localhost:14000/";
sessionStorage.setItem("gsid", 6);
sessionStorage.setItem("yhid", 118);
sessionStorage.setItem("jsid", 3);
  // sessionStorage.setItem("pdfhym", window.location.href);
  // alert(0)
  if (cs("gsid")) {
	  // alert(cs("gsid"))
    sessionStorage.setItem("gsid", cs("gsid"));
  }
  // if (cs("js")) {
  //     sessionStorage.setItem("jsid", cs("js"));
  // }
  var yhid = sessionStorage.getItem("yhid");
  var gsid = sessionStorage.getItem("gsid");
  var jsid = sessionStorage.getItem("jsid");
  var jbxx;
gsxx()
function gsxx() {
    $.ajax({
        type: 'post',
        url: dz + 'company',
        async: false,
        cache: false,
        data: {
            gsid: gsid
        },
        success: function(data) {
            jbxx = data.cont[0];
            $('title').html(jbxx.wyzbt);
            $('[rel="shortcut icon"]').attr("href", "../dynamic-material/"+gsid+"/"+jbxx.xtb);
        },
        error: function(data) {}
    });
}

// $('title').html("百千万人力 专注蓝领人群服务");
$('.sqqk').append('<a href="./tzym.html" target="_blank">©2021 百通教育科技</a>');
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

        function cs(variable) {
            var query = window.location.search.substring(1);
            var vars = Base64.decode(query).split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) { return pair[1]; }
            }
            return (false);
        }
function dlpd() {
	id=yhid;
	// alert(id+'**'+gsid);
      if (id == false || id == undefined || id == null || id == "") {
          WxLogn()
      }
}

// 微信登录注册
function WxLogn() {
    $.ajax({
        type: 'post',
        url: dz + 'WxEntryPh',
        cache: false,
        async: false,
          data:{id:gsid}
    }).done(function(data) {
        // if (data.msg == "0") {
        //     $('#sjzc-ts').attr("value", "产品已到期，暂无权限访问，请获取新的权限！");
        // } else {
        $(location).attr('href', "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + data.id + "&redirect_uri=" + ym + "/hxhrmp/mobileTerminal/login.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect");
        // }
    });
}

function dlyz(a) {
	$.ajax({
		type: 'post',
			// dataType: 'json',
			url: dz+'mobLoginValidation',
			async: false,
			cache: false,
			data: a,
			error: function(data) {},
			success: function(data) {
				console.log(data);
				if (data.code==200) {
					sessionStorage.setItem("yhid", data.userid);
					// sessionStorage.setItem("gsid", data.gsid);
					sessionStorage.setItem("jsid", data.jsid);
                  $(location).attr('href',sessionStorage.getItem("pdfhym"));
					// window.history.go(-1);
				}
			}
		});
}

function share(a,b,c,d){
	// var d=ym+'/hxhrmp/images/ico.png';
	// console.log(a+b+ym+c)
    // var url=window.location.href;
    $.ajax({
        type:'post',
        url:dz+'WxAccredit',
        cache:false,
        async:false,
        data:{
            url:window.location.href,
              id:gsid
        }
    }).done(function(data){
       wx.config({
        debug:false,
        appId:data.id,
        timestamp:data.timestamp,
        nonceStr:data.nonceStr,
        signature:data.signature,
        jsApiList:['updateAppMessageShareData','updateTimelineShareData']
        });
       wx.ready(function () { 
            //alert(1)  //需在用户可能点击分享按钮前就先调用
            wx.updateAppMessageShareData({ 
                title: a, // 分享标题
                desc: b, // 分享描述
                 link: ym+c, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                 imgUrl: d, // 分享图标
             }, function(res) { 
                // alert("cf")
             //这里是回调函数 
            }); 
            wx.updateTimelineShareData({
                title: a, // 分享标题
                desc: b, // 分享描述
                 link: ym+c, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                 imgUrl: d, // 分享图标
             }, function(res) { 
             //这里是回调函数 
            });
          wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function(res) {
                  var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              }
          }); 

         });
       wx.error(function(res){
            //alert(2)
             // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
       });
   });
}

  //获取窗口可视范围的高度
  function getClientHeight() {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      } else {
          clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      return clientHeight;
  }

  function getScrollTop() {
      var scrollTop = 0;
      scrollTop = (document.body.scrollTop > document.documentElement.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
      return scrollTop;
  }
  //滚动加载
  function scrollLoad(a, b, c, d, e) {
      //可视窗口的高度
      var scrollTop = 0;
      var scrollBottom = 0;
      $(document).scroll(function() {
          var dch = getClientHeight();
          scrollTop = getScrollTop();
          scrollBottom = document.body.scrollHeight - scrollTop;
		  // alert(1)
          if ( scrollBottom <= (dch + 10)) {
                var ps = parseInt((b + d - 1) / d);
              if (c != (ps) && ps != 1) {
                  c++;
                  a(d, c, e);
              }
          }
      });
  }