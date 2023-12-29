var ym = window.location.host;
// var yms = window.location.protocol + "//" + window.location.host;
// var yms = "https://bianchengbaobei.com";
// document.cookie = "userid=2018103";

var fwdz="http://localhost:14000/";
// var fwdz = window.location.protocol + "//" + window.location.host + "/hxhrbmp/";
// var allcookies = document.cookie;
// var timestamp = (new Date()).getTime();

// function getCookie(cookie_name) {
//     var allcookies = document.cookie;
//     var cookie_pos = allcookies.indexOf(cookie_name); //索引的长度

//     // 如果找到了索引，就代表cookie存在，
//     // 反之，就说明不存在。
//     if (cookie_pos != -1) {
//         // 把cookie_pos放在值的开始，只要给值加1即可。
//         cookie_pos += cookie_name.length + 1; //这里容易出问题，所以请大家参考的时候自己好好研究一下
//         var cookie_end = allcookies.indexOf(";", cookie_pos);

//         if (cookie_end == -1) {
//             cookie_end = allcookies.length;
//         }

//         var value = unescape(allcookies.substring(cookie_pos, cookie_end)); //这里就可以得到你想要的cookie的值了。。。
//     }
//     return value;
// }
var userid = $.cookie("userid");
var xtsydz = "/hxhrmp/management";



function keyup_submit(e){ 
 var evt = window.event || e; 
  if (evt.keyCode == 13){
    //回车事件
	sjzhdl('sjdl-zhdls');
  }
}

// 获取验证码
function invokeSettime(sjid, obj) {
    hqsjyzm(sjid);
    var countdown = 30;
    settime(obj);

    function settime(obj) {
        if (countdown == 0) {
            $(obj).addClass("dls");
            $(obj).attr("disabled", false);
            $(obj).text("获取验证码");
            countdown = 30;
            return;
        } else {
            // $(".sjhxg-con-xyb").attr('id','');
            $(obj).attr("disabled", true);
            $(obj).removeClass("dls");
            $(obj).text(countdown + "s 后重发");
            countdown--;
        }
        setTimeout(function() {
            settime(obj)
        }, 1000)
    }
}
//获取手机验证码
function hqsjyzm(id) {
    var tel = $(id).val();
    $.ajax({
        type: 'post',
        url: fwdz + 'SMSVerification',
        cache: false,
        async: false,
        data: {
            tel: tel
        }
    }).done(function(data) {
        console.log(data.content); //验证成功
    })
}

//验证手机号格式
function yzsjh(id, tsid, btid) {
    var theinput = $(id).val();
    // console.log(theinput)
    var p1 = /^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\d{8}|14[57]\d{8}|17[0-9]\d{8}|16[0-9]\d{8}|19[0-9]\d{8})$/;
    //(p1.test(theinput));
    if (p1.test(theinput) == false) { // console.log(0)
        $(tsid).attr("value", "请输入正确的手机号码！");
        $(btid).attr("disabled", true);
        $(btid).removeClass("dls");
    } else { //console.log(1)
        $(tsid).attr("value", "");
        $(btid).attr("disabled", false);
        $(btid).addClass("dls");
        // document.getElementById("sjhts").value="";
    }
}

//手机注册
function sjzcqk() {
    var tel = $('#sjzc-sjh').val();
    var yzm = $('#sjzc-sjyzm').val();
    var mm = $('#yhmm').val();
    var nc = $('#nc').val();
    var xb = $('#xb').val();
    var sz = /^[0-9]+[0-9]*]*$/;
    var p1 = /^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\d{8}|14[57]\d{8}|17[0-9]\d{8}|16[0-9]\d{8}|19[0-9]\d{8})$/;
    //(p1.test(theinput));
    if (tel == null || tel == '') {
        $('#sjzc-ts').attr("value", "手机号码不能为空！");
    } else if (p1.test(tel) == false) {
        $('#sjzc-ts').attr("value", "请输入正确的手机号码！");
    } else if (sz.test(yzm) == false || yzm.length != 6) {
        $('#sjzc-ts').attr("value", "验证码格式错误");
    } else if (8 > mm.length > 16) { //console.log(mm.length)
        $('#sjzc-ts').attr("value", "密码须由8-16个字符或数字组成");
    } else { //console.log(1)
        $('#sjzc-ts').attr("value", "");
        $.ajax({
            type: 'post',
            url: fwdz + 'mobileRegistration', //向用户表注册新用户、手机号、密码、注册时间、默认头像地址
            cache: false,
            async: false,
            data: {
                tel: tel,
                yzm: yzm,
                mm: mm,
                nc: nc,
                xb:xb
            }
        }).done(function(data) { //alert(data.message)
            // console.log(data);//先查询验证成功后台返回结果，并将用户id传给Cookie，  若未注册或验证失败则返回相应提示
            if (data.message == "OK") {
                $.cookie("userid", data.userid);
                $.cookie("jsid", data.js);
                $.cookie("gsid", data.gsid);
                // window.location.href = document.referrer;
                $(location).attr('href', xtsydz);
            } else {
                $('#sjzc-ts').attr("value", data.message);
            }
        })
    }

}

//手机登录
function sjdxdl(id) {
    // sessionStorage.setItem("userid", "1235");
    // window.location.href = "http://localhost/hxhrmp/";
    $("#dlzc").hide();
    $("#tcdl").show();
    var tel = $('#sjdl-sjh').val();
    var yzm = $('#sjdl-sjyzm').val();
    // var tpyz = $('#tpyz-dlts').val(); //alert(tpyz)
    var sz = /^[0-9]+[0-9]*]*$/;
    var p1 = /^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\d{8}|14[57]\d{8}|17[0-9]\d{8}|16[0-9]\d{8}|19[0-9]\d{8})$/;
    //(p1.test(theinput));
    if (tel == null || tel == '') {
        $('#sjdl-ts').attr("value", "手机号码不能为空！");
    } else if (p1.test(tel) == false) {
        $('#sjdl-ts').attr("value", "请输入正确的手机号码！");
    } else if (sz.test(yzm) == false || yzm.length != 6) {
        $('#sjdl-ts').attr("value", "验证码格式错误");
    } else { //console.log(1)
        $('#sjdl-ts').attr("value", "");
        $.ajax({
            type: 'post',
            url: fwdz + 'mobileSMSLogin',
            cache: false,
            async: false,
            data: {
                tel: tel,
                yzm: yzm
            }
        }).done(function(data) { //alert(data.message)
            // console.log(data);//先查询验证成功后台返回结果，并将用户id传给Cookie，  若未注册或验证失败则返回相应提示
            if (data.message == "OK") {
                $.cookie("userid", data.userid);
                $.cookie("jsid", data.js);
                $.cookie("gsid", data.gsid);
                // window.location.href = document.referrer;
                $(location).attr('href', xtsydz);
            } else {
                $('#sjdl-ts').attr("value", data.message);
            }
        })
    }

}

//手机账号登陆
function sjzhdl(id) {
    var tel = $('#zhdl-sjh').val();
    var mm = $('#zhdl-mm').val();
    var gsid = $('#zhgs').val();
    if (gsid==""){
        gsid=0
    }
    // var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\d{8}|14[57]\d{8})$/;
    //(p1.test(theinput));
    if (tel == null || tel == '' || mm == null || mm == '') {
        if (tel == null || tel == '') {
            $('#zhdl-ts').attr("value", "手机号码不能为空！");
        } else if (mm == null || mm == '') {
            $('#zhdl-ts').attr("value", "密码不能为空！");
        }
    } else {
        if (8 > mm.length || mm.length > 16) {
            $('#zhdl-ts').attr("value", "密码须由8-16个字符或数字组成");
        } else {
            $('#zhdl-ts').attr("value", "");
            $.ajax({
                type: 'post',
                url: fwdz + 'hxhr/userinfo/accountLogin',
                cache: false,
                async: false,
                contentType:'application/json;charset=UTF-8',
                dataType:'json',
                data: JSON.stringify({
                    sjh: tel,
                    mm: mm,
                    gsid:gsid
                })
            }).done(function(data) {
                // console.log(data);
                if (data.code == 0) {
                    $.cookie("userid", data.data[0].id);
                    $.cookie("jsid", data.data[0].jsid);
                    $.cookie("gsid", data.data[0].gsid);
                    // window.location.href = document.referrer;
                    $(location).attr('href', xtsydz);
                } else if (data.code==301) {
                    $.each(data.data,function(index,item){
                        $('#zhgs').append('<option value="'+item.id+'">'+item.jc+'</option>');
                    });
                    $('#zhgs').show();
                    $('#zhdl-ts').attr("value", data.msg);
                } else {
                    $('#zhdl-ts').attr("value", data.msg);
                }
            })
        }
    }
}

//密码修改验证
function dlmmsjhyz() {
    // alert(0)
    var tel = $('#dlmm-sjh').val();
    var yzm = $('#dlmm-yzm').val();
    if (userid == undefined || userid == null || userid == "") {
        userid = '';
    }
    // alert(0)
    var sz = /^[0-9]+[0-9]*]*$/;
    var p1 = /^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\d{8}|14[57]\d{8}|17[0-9]\d{8}|16[0-9]\d{8}|19[0-9]\d{8})$/;
    //(p1.test(theinput));
    if (tel == null || tel == '') {
        $('#dlmmsjh-ts').attr("value", "手机号码不能为空！");
    } else if (p1.test(tel) == false) {
        $('#dlmmsjh-ts').attr("value", "请输入正确的手机号码！");
    } else if (sz.test(yzm) == false || yzm.length != 6) {
        $('#dlmmsjh-ts').attr("value", "验证码格式错误");
    } else { //console.log(1)
        $('#dlmmsjh-ts').attr("value", "");
        $.ajax({
            type: 'post',
            url: fwdz + 'judgementmobile',
            cache: false,
            async: false,
            data: {
                id: userid,
                jbsj: tel,
                jbyzm: yzm
            }
        }).done(function(data) {
            //console.log(data.content);//返回验证结果
            if (data.sj == 1) {
                if (data.yzm == 1) {
                    $('#dlmm-szxmm').show();
                    $('#dlmm-wj').hide();
                    $('.dlmm-one').removeClass('sjhxg-con-xz');
                    $(".dlmm-one div").removeClass("sjhxg-con-xz1");
                    $(".dlmm-two div").addClass("sjhxg-con-xz1");
                    $('.dlmm-two').addClass('sjhxg-con-xz');
                    $('#xmm-sjh').attr("value", tel);
                } else {
                    $('#dlmmsjh-ts').attr("value", "验证码不正确或已超时！");
                }
            } else {
                $('#dlmmsjh-ts').attr("value", "该手机号还未被注册！");
            }
            // $("#dlmm-ts").attr("src",data.tpdz);
            // $("#avarimgs").attr("src",data.tpdz);
            // $("#txlg-img").attr("src",data.tpdz);

        })
    }
}

//密码更改
function dqzhmmgg() {
    var mm = $('#dlmm-xmm').val();
    var qrmm = $('#dlmm-qrxmm').val();
    var tel = $('#xmm-sjh').attr("value");
    if (userid == undefined || userid == null || userid == "") {
        userid = '';
    }
    if (mm.length == 0) {
        $('#xmm-ts').attr("value", "请输入密码");
    } else if (mm != qrmm) {
        $('#xmm-ts').attr("value", "两次输入密码不一致");
    } else if (mm.length > 16 || mm.length < 8) {
        $('#xmm-ts').attr("value", "密码须由8-16个字符或数字组成");
    } else {
        $.ajax({
            type: 'post',
            url: fwdz + 'passwordChange',
            cache: false,
            async: false,
            data: {
                mm: mm,
                id: userid,
                dh: tel
            }
        }).done(function(data) {
            //console.log(data.content);//返回验证结果
            if (data.code == 200) {
                $('#dlmm-wcbd').show();
                $('#dlmm-szxmm').hide();
                $('.dlmm-two').removeClass('sjhxg-con-xz');
                $(".dlmm-two div").removeClass("sjhxg-con-xz1");
                $(".dlmm-three div").addClass("sjhxg-con-xz1");
                $('.dlmm-three').addClass('sjhxg-con-xz');
            } else {
                $('#xmm-ts').attr("value", "密码修改失败，请重新提交");
            }
            // $("#dlmm-ts").attr("src",data.tpdz);
            // $("#avarimgs").attr("src",data.tpdz);
            // $("#txlg-img").attr("src",data.tpdz);

        })
    }
}
$(".xyzh").click(function() {
    $('.sjdl').removeClass('sjhxg-con-xz');
    $('.xyzh').addClass('sjhxg-con-xz');
    $('#xyzh-xs').hide();
    $('#sjdl-sjhdl').hide();
    $('#wxh-dl').hide();
    $('#dl-sjzhdl').show();
})
$(".sjdl").click(function() {
    $('.xyzh').removeClass('sjhxg-con-xz');
    $('.sjdl').addClass('sjhxg-con-xz');
    $('#xyzh-xs').hide();
    $('#dl-sjzhdl').hide();
    $('#sjdl-sjhdl').show();
})
//打开登录
$("#zx-qdl").click(function() {
    $('#sjzc-zc').hide();
    $('#sjdl-dl').show();
})
//打开注册
$("#zx-qzc").click(function() {
    $('#sjzc-zc').show();
    $('#sjzc-sjhzc').show();
    $('#sjdl-dl').hide();
    $('#tpyz-zcxs').empty();
})
$("#dl-dxdl").click(function() {
    $('#dl-sjzhdl').hide();
    $('#sjdl-sjhdl').show();
    $('#tpyz-dlxs').empty();
})
$("#dl-zhdl").click(function() {
    $('#dl-sjzhdl').show();
    $('#sjdl-sjhdl').hide();
})
$("#zh-qzc").click(function() {
    $('#sjzc-zc').show();
    $('#sjzc-sjhzc').show();
    $('#sjdl-dl').hide();
    $('#tpyz-zcxs').empty();
})
//密码修改验证
$("#zhdl-wjmm").click(function() {
    //$('.header').show();
    $('#zhzcdl').hide();
    $('.sjhxg input').val('');
    $('#tpyz-dlxs').empty();
    $('#tpyz-zcxs').empty();
    $('.xyzh').removeClass('sjhxg-con-xz');
    $('.sjdl').addClass('sjhxg-con-xz');
    $('#xyzh-xs').hide();
    $('#sjdl-sjhdl').hide();
    $('#wxh-dl').hide();
    $('#sjzc-sjhzc').hide();
    $('#wxh-zc').hide();
    $('#sjzc-wc').hide();
    $('#dl-sjzhdl').hide();
    $('#sjdl-dl').show();
    $('#sjdl-sjhdl').show();
    $('.content-grzl').show();
    $('#dlmmgh').show();
    $('#dlmm-yz').hide();
    $('#dlmm-wj').show();

})
$("#mmxg-qx").click(function() {
    $('.header').show();
    $('#dlmmgh').hide();
    $('.dlmm-three').removeClass('sjhxg-con-xz');
    $('.dlmm-two').removeClass('sjhxg-con-xz');
    $(".dlmm-two div").removeClass("sjhxg-con-xz1");
    $(".dlmm-three div").removeClass("sjhxg-con-xz1");
    $('.dlmm-one').addClass('sjhxg-con-xz');
    $(".dlmm-one div").addClass("sjhxg-con-xz1");
    $('#dlmm-wcbd').hide();
    $('#dlmm-szxmm').hide();
    $('#dlmm-yz').hide();
    $('#dlmm-yz').show();
    $('.sjhxg-con-jb input').attr('value', '');
})
$("#yhmm-zhmm").click(function() {
    var type = $("#zhdl-mm").prop("type");
    if (type == 'password') {
        $("#zhdl-mm").prop("type", "text");
        $("#yhmm-zhmm").attr("src", "images/look.png");

    } else {
        $("#yhmm-zhmm").attr("src", "images/no-look.png");
        $("#zhdl-mm").prop("type", "password");
    }
})

//验证手机号是否正确     
$("#sjdl-sjh").bind('input propertychange', function() {
    // var summary=$(this).val();
    yzsjh('#sjdl-sjh', '#sjdl-ts', '#sjdl-yzm');
});
$("#sjdl-zhdls").click(function() {
    sjzhdl('sjdl-zhdls')
})
$("#sjdl-dxdls").click(function() {
    sjdxdl('sjdl-dxdls')
})
$("#sjzc-sjh").bind('input propertychange', function() {
    // var summary=$(this).val();
    yzsjh('#sjzc-sjh', '#sjzc-ts', '#sjzc-yzm');
});

$("#sjzc").click(function() {
    sjzcqk();
})
//密码修改验证
$("#dlmmsjh-xyb").click(function() {
    dlmmsjhyz();
})

$("#dlmm-sjh").bind('input propertychange', function() {
    // var summary=$(this).val();
    yzsjh('#dlmm-sjh', '#dlmmsjh-ts', '#dlmm-hqyzm');
});
//密码显示
$("#mmxs-xmm").click(function() {
    var type = $("#dlmm-xmm").prop("type");
    if (type == 'password') {
        $("#dlmm-xmm").prop("type", "text");
        $("#mmxs-xmm").attr("src", "images/look.png");

    } else {
        $("#mmxs-xmm").attr("src", "images/no-look.png");
        $("#dlmm-xmm").prop("type", "password");
    }
})
$("#mmxs-qrxmm").click(function() {
    var type = $("#dlmm-qrxmm").prop("type");
    if (type == 'password') {
        $("#dlmm-qrxmm").prop("type", "text");
        $("#mmxs-qrxmm").attr("src", "images/look.png");

    } else {
        $("#mmxs-qrxmm").attr("src", "images/no-look.png");
        $("#dlmm-qrxmm").prop("type", "password");
    }
})
$("#xyb-mmgg").click(function() {
    dqzhmmgg();
})
$("#mmwc-btn").click(function() {
    $('.header').show();
    $('#dlmmgh').hide();
    $('.dlmm-three').removeClass('sjhxg-con-xz');
    $('.dlmm-three div').removeClass('sjhxg-con-xz1');
    $('.dlmm-two').removeClass('sjhxg-con-xz');
    $(".dlmm-one div").addClass("sjhxg-con-xz1");
    $('.dlmm-one').addClass('sjhxg-con-xz');
    $('#dlmm-wcbd').hide();
    $('#dlmm-szxmm').hide();
    $('#dlmm-wj').show();
    $('#dlmm-yz').show();
    $('.sjhxg-con-jb input').attr('value', '');
    $(".zhmm").html("修改");
    $('.zhmm').removeClass("aq-ljbd");
    $(".zhmm").attr("id", "xg-zhmm");
})
