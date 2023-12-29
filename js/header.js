
var nowDate = new Date();
var year = nowDate.getFullYear();
var footer = '<div class="conts footer-bq">' +
    '<div style="width: 100%;">' +
    ' Copyright©2018-' + year + ' <a href="http://beian.miit.gov.cn/" target="_blank">渝ICP备19016006号</a>' +
    '</div>' +
    '</div>'
$('.footer').append(footer);

// var dz = window.location.protocol + "//" + window.location.host + "/hxhrbmp/";
// var dz="https://haohaibang.com/hmglxt/"
var dz = "http://localhost:14000/";
var userid = $.cookie("userid");
var jsid = $.cookie("jsid");
var gsid = $.cookie("gsid");
// console.log(userid + jsid + gsid)

var jbxx;
    dlpd();
header();

function header() {
gsxx();
    $.ajax({
        type: 'post',
        url: dz + 'menuList',
        cache: false,
        async: false,
        data: {
            id: jsid
        },
        error: function(data) {}
    }).done(function(data) {
        var header = '' ;
            if (jbxx.logo==null) {
                header+='<h2>'+jbxx.jc+'</h2>';
            } else {
                header+='<div style="margin-left: 30px;height: 50px;width:20%;"><img src="../dynamic-material/'+gsid+'/'+jbxx.logo+'" style="max-width: 100%;max-height: 100%;"></div>';
            }
            // '<h2>重庆百千万人力</h2>' +
            header+='<div class="containers" style="height:80px;"><div class="sms"><a id="xxzsl" href="./message-centre.html" target="_blank"><span class="hand glyphicon glyphicon-bell" id="xx"></span><span id="xxtx" style="color: red;">10</span></a><a href="./login.html"><span class="hand jg fb yc" id="tcdl">退出</span></a><a href="./login.html"><span class="hand jg fb" id="dlzc">登录</span></a></div><div class="conts-tit">' +
            '  <ul class="header-title" id="nrth">';
        $.each(data.content, function(index, item) {
            var dz = item.dz;
            if (dz == null) {
                dz = ""
            }
            if (index == 0) {
                header += '    <a href="./' + dz + '"><li class="hand" id="' + item.mid + '">' + item.mname + '</li></a>';
            } else {
                header += '    <a href="./' + dz + '"><li class="hand jg fb" id="' + item.mid + '">' + item.mname + '</li></a>';
            }
        });
        header += ' </ul>' +
            '</div>' +
            '</div>';
        // console.log(header)
        $('.header').append(header);
    })
    dlpd();
    $("#tcdl").click(function() {
        $.removeCookie("userid");
        $.removeCookie("jsid");
    })
}

function dlpd() {
    // console.log(userid);
    if (userid == null) {
        window.location.href = "./login.html";
    } else {
        $("#dlzc").hide();
        $("#tcdl").show();
        console.log(jsid)
        if (jsid == "1" || jsid == "2" || jsid == "6") {
            // $(".xzpd").hide();
        } else {
            $(".xzpd").hide();
        }
    }
}

// qxpd()
function qxpd() {
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: dz + 'termJudge',
        async: false,
        cache: false,
        data: {
            yhid: userid,
            gsid: gsid
        },
        success: function(data) {
            if (data.code == 200) {
                if (data.pd == 0) {
                    $(".xtdqjy").show();
                }
            }

        }
    });
}
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

xttx()
// 咨询老师
function xttx() {
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: dz + 'unreadMessage',
        async: false,
        cache: false,
        data: { yhid: userid, js: 1 },
        error: function(data) {
            // console.log(data)
        },
        success: function(data) { //返回list数据并循环获取 
            $("#xxtx").text(data.rows[0].sl);
        }
    });
}
// var ztxxsl = setInterval(function() {
//         xttx();
//     }, 60000);