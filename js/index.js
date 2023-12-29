 var ym = window.location.protocol + "//" + window.location.host;
// var ym = 'https://haohaibang.com';
//  var dz = ym + "/hxhrbmp/";
var dz = "http://localhost:14000/";

// var userid = 18;//sessionStorage.getItem("userid");

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

//选择图片，马上预览
function xmTanUploadImg(obj, id) {
    var file = obj.files[0];
    var reader = new FileReader();
    // reader.onloadstart = function(e) {
    //     console.log("开始读取....");
    // }
    // reader.onprogress = function(e) {
    //     console.log("正在读取中....");
    // }
    // reader.onabort = function(e) {
    //     console.log("中断读取....");
    // }
    // reader.onerror = function(e) {
    //     console.log("读取异常....");
    // }
    reader.onload = function(e) {
        // console.log("成功读取....");
        var img = document.getElementById(id);
        img.src = e.target.result;
        $("#" + id).attr("alt", 1);
        //或者 img.src = this.result;  //e.target == this
    }
    reader.readAsDataURL(file)
}

$("#xjhm").click(function() {
    $(".xjhm").show();
    $(".hmxgts").hide();
    $(".qdsc").attr("data-id", 1);
    $(".hmbt").text("新建活码");

})

function hmcz() {
    $(".hmxg").click(function() {
        $(".xjhm").show();
        $(".hmxgts").show();
        $(".qdsc").attr("data-id", 2);
        $(".qdsc").attr("data-hmid", $(this).attr("data-id"));
        $(".qdsc").attr("data-ewm", $(this).attr("data-ewm"));
        $(".hmbt").text("修改");
        $("#hmmc").val($(this).attr("data-name"));
        $("#smsx").val($(this).attr("data-sx"));
        $("#hmbz").val($(this).attr("data-bz"));

    })
    $(".zmlb").click(function() {
        $(".zmgl").show();
        $(".zmq").show();
        $(".hmgl").hide();
        var id = $(this).attr("data-id");
        $("#zmxj").attr("data-id", id);
        $("#zmsx").attr("data-id", id);
        zmlb(id, '');
    })
    $(".hmsc").click(function() {
        $(".scmb").show();
        $(".scqd").attr("data-id", $(this).attr("data-id"));
        $(".scqd").attr("data-pd", "hm");
    })
}

$("#zmsc").click(function() {
    var ids = getIdSelections();
    if (ids.length == 0) {
        swal("提示！！", "请勾选要删除的项", "error");
    } else {
        for (var i = 0; i < ids.length; i++) {
            zmsc(ids[i].id);
        }
    }
    // $(".scmb").show();
    // $(".scqd").attr("data-id", $(this).attr("data-id"));
    // $(".scqd").attr("data-pd", "zm");
})

$("#zmjy").click(function() {
    var ids = getIdSelections();
    if (ids.length == 0) {
        swal("提示！！", "请勾选要禁用的项", "error");
    } else {
        for (var i = 0; i < ids.length; i++) {
            zmjy(ids[i].id);
        }
    }
})

$("#hmsx").click(function() {
    hmlb('');
})
$("#zmsx").click(function() {
    zmlb($(this).attr("data-id"), '');
})

$(".scqd").click(function() {
    var id = $(this).attr("data-id");
    var pd = $(this).attr("data-pd");
    if (pd == "hm") {
        hmsc(id)
    } else {
        zmsc(id)
    }
})
$(".hmq, #fhhm").click(function() {
    $(".zmgl").hide();
    $(".zmq").hide();
    $(".hmgl").show();

})
// 活码查询
$("#search").click(function() {
    var tj = $("#search_input").val();
    if (tj != null || tj != "") {
        hmlb(tj);
    }
})
// 子码查询
$("#zmsearch").click(function() {
    var tj = $("#zminput").val();
    if (tj != null || tj != "") {
        zmlb($("#zmxj").attr("data-id"), tj);
    }
})
$(".gbtb,.qx").click(function() {
    gb();
})
$("#zmxj").click(function() {
    $(".xjzm").show();
    $(".zmtj").attr("data-id", 1);
    $(".zmxjbt").text("新建子码");
})
$("#zmxg").click(function() {
    var ids = getIdSelections();
    // console.log(ids)
    if (ids.length == 0) {
        swal("提示！！", "请勾选要修改的项！！", "error");
    } else if (ids.length == 1) {
        $(".xjzm").show();
        $(".zmtj").attr("data-id", 2);
        $(".zmtj").attr("data-zmid", ids[0].id);
        $(".zmtj").attr("data-ewm", ids[0].ewm);
        $("#ewmmc").val(ids[0].name);
        $("#ewmlx").val(ids[0].lx);
        $("#zmbz").val(ids[0].bz);
        $(".zmxjbt").text("修改");
        // upzmsj(ids);
    } else {
        swal("提示！！", "一次只能修改一项数据！！", "error");
    }

})

function upzmsj(cs) {
    $.ajax({
        url: dz + "upSubcode",
        method: "POST",
        data: cs,
        contentType: false,
        processData: false,
        cache: false,
        success: function(data) {
            gb();
            zmlb($("#zmxj").attr("data-id"), '');
        },
        error: function(data) {
            $("#zmtx").text("用户数据上传失败，请重新上传！");
        }
    });
};

function gb() {
    $(".mode").hide();
    $("#zmtx,#hmts").text("")
    $("textarea,input").val("")
}

function hmlb(tj) {
    var url = dz + "qrCodeList";
    $.ajax({
        type: 'post',
        url: url,
        cache: false,
        async: false,
        data: {
            userid: userid,
            sel: tj,
            pagesize: 5,
            page: 1
        },
        error: function(data) {
            var cw = '<div class="cwts"><p>哎呀！一不小心跑丢了～</p></div>'
            $('#hmlb').append(cw);
        }
    }).done(function(data) {
        $('#hmlb').empty();
        if (data.total == 0) {
            var cw = '<div class="cwts"><p>暂无数据～</p></div>'
            $('#hmlb').append(cw);
        } else {
            $.each(data.rows, function(index, item) {
                creatlist(item);
            })

            $('#pages').empty();
            fygj(url, data.total, tj);
        }
        hmcz()
    })
}

function fygj(url, total, tj) {
    $('#pages').append('<div class="box" id="newsyf"></div>');

    var pagesize = 10;
    var onPagechange = function(page) {
        //console.log('当前点击页码', page);
        var data = {
            userid: userid,
            sel: tj,
            pagesize: pagesize,
            page: page
        }
        $.ajax({
            type: 'post',
            url: url,
            cache: false,
            async: false,
            data: data
        }).done(function(data) { //作品id、作品名称、作品图片地址、发布时间、作者、作品查看量、收藏量、点赞量
            // console.log(data.content);
            $('#hmlb').empty();
            $.each(data.rows, function(index, item) {
                creatlist(item);
            })
        })
        //opennews()
    }
    var obj = {
        wrapid: 'newsyf', //页面显示分页器容器id
        total: total, //总条数
        pagesize: pagesize, //每页显示10条
        currentPage: 1, //当前页
        onPagechange: onPagechange,
        btnCount: 5 //页数过多时，显示省略号的边界页码按钮数量，可省略，且值是大于5的奇数
    }
    pagination.init(obj);
}

function creatlist(item) {
    var lbz = '<div class="news-list" data-id="' + item.id + '">' +
        '    <div class="news-img"><img src="../xthm/' + item.ewm + '" alt=""></div>' +
        '    <div style="width: calc(100% - 126px);">' +
        '        <p class="news-title">' +
        '            <span>' + item.name + '</span>' +
        '            <span style="margin-left: 30px;">扫码次数：</span><span>' + item.smcs + '</span>' +
        '            <span style="margin-left: 30px;">子码数：</span><span>' + item.zms + '</span>' +
        '            <span style="margin-left: 30px;">子码扫码上限：</span><span>' + item.rssx + '</span>' +
        '            <span style="margin-left: 30px;">' + item.cjsj + '</span>' +
        '        </p>' +
        '        <div style="padding: 5px 0;color: #999;">' +
        '            <span>' + item.ms + '</span>' +
        '        </div>' +
        '        <div style="display: flex;padding: 5px 0;color: #999;float: right;">' +
        '            <div class="button hand hmxg" data-id="' + item.id + '" data-name="' + item.name + '" data-sx="' + item.rssx + '" data-bz="' + item.ms + '" data-ewm="' + item.ewm + '">修改</div>' +
        '            <div class="button hand hmsc"  data-id="' + item.id + '">删除</div>' +
        '            <div class="button hand zmlb"  data-id="' + item.id + '">子码管理</div>' +
        '            <a href="../xthm/' + item.ewm + '" download="../xthm/' + item.ewm + '">' +
        '                <div class="button hand" id="">下载二维码</div>' +
        '            </a>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    $('#hmlb').append(lbz);
}

function zmlb(id, tj) {
    $('#zmlb').empty();
    var str = '<table id="fk"></table>';
    $('#zmlb').append(str);
    $('#fk').bootstrapTable({
        url: dz + 'subcodeList?hmid=' + id + '&tj=' + tj,
        columns: [{
            field: 'state',
            checkbox: true,
            valign: 'middle',
            align: 'center'
        }, {
            field: 'id',
            title: 'id',
            valign: 'middle',
            visible: false,
            align: 'center'
        }, {
            field: 'name',
            title: '名称',
            valign: 'middle',
            align: 'center'
        }, {
            field: 'lx',
            title: '二维码类型',
            valign: 'middle',
            align: 'center'
        }, {
            field: 'smcs',
            title: '扫码次数',
            valign: 'middle',
            align: 'center'
        }, {
            field: 'rssx',
            title: '扫码上限',
            valign: 'middle',
            align: 'center'
        }, {
            field: 'gqsj',
            title: '过期时间',
            valign: 'middle',
            align: 'center'
        }, {
            field: 'zt',
            title: '当前状态',
            valign: 'middle',
            align: 'center'
        }, {
            field: 'bz',
            title: '备注',
            valign: 'middle',
            align: 'center'
        }],
        pagination: true,
        sidePagination: 'server',
        pageSize: 15,
        pageList: [5, 10, 'all'],
    });
}

function getIdSelections() {
    return $.map($('#fk').bootstrapTable('getSelections'), function(
        row) {
        return row;
    });
}

// 新建活码/修改活码
$(".qdsc").click(function() {
    $("#hmts").text("数据上传中...");
    var fd = new FormData();
    var files = $("#fileField")[0].files[0];
    var mc = $("#hmmc").val();
    var sx = $("#smsx").val();
    var bz = $("#hmbz").val();
    var id = $(this).attr("data-hmid");
    var ewm = $(this).attr("data-ewm");
    var yh = userid;
    var zt = 1;
    var pd = $(this).attr("data-id");
    if (files == undefined || files == "") {
        zt = 0;
    }
    if (sx == null || sx == "") {
        sx = 100;
    }
    fd.append("lgo", files);
    fd.append("mc", mc);
    fd.append("sx", sx);
    fd.append("bz", bz);
    fd.append("userid", yh);
    fd.append("zt", zt);
    fd.append("gsid", gsid);
    if (mc == null || mc == "") {
        $("#hmts").text("活码名称不能为空！");
    } else {
        if (pd == "1") {
            $.ajax({
                url: dz + "createLogoQRCode",
                method: "POST",
                data: fd,
                contentType: false,
                processData: false,
                cache: false,
                success: function(data) {
                    gb();
                    hmlb('');
                },
                error: function(data) {
                    $("#hmts").text("用户数据上传失败，请重新上传！");
                }
            });
        } else {
            fd.append("id", id);
            fd.append("ewm", ewm);
            $.ajax({
                url: dz + "upLogoQRCode",
                method: "POST",
                data: fd,
                contentType: false,
                processData: false,
                cache: false,
                success: function(data) {
                    gb();
                    hmlb('');
                },
                error: function(data) {
                    $("#hmts").text("用户数据上传失败，请重新上传！");
                }
            });
        }
    }
});
// 新建子码
$(".zmtj").click(function() {
    $("#zmtx").text("数据上传中...");
    var fd = new FormData();
    var files = $("#fileFields")[0].files[0];
    var mc = $("#ewmmc").val();
    var lx = $("#ewmlx").val();
    var bz = $("#zmbz").val();
    var hmid = $("#zmxj").attr("data-id");
    var zt = 1;
    if (files == undefined || files == "") {
        zt = 0;
    }
    var pd = $(this).attr("data-id");
    var id = $(this).attr("data-zmid");
    var ewm = $(this).attr("data-ewm");
    fd.append("lgo", files);
    fd.append("mc", mc);
    fd.append("lx", lx);
    fd.append("bz", bz);
    fd.append("hmid", hmid);
    fd.append("zt", zt);
    fd.append("id", id);
    fd.append("ewm", ewm);
    if (pd == "1") {
        if (files == undefined || files == "" || mc == null || mc == "") {
            zt = 0;
            $("#zmtx").text("图片不或二维码名称不能为空！");
        } else {
            $.ajax({
                url: dz + "createSubcode",
                method: "POST",
                data: fd,
                contentType: false,
                processData: false,
                cache: false,
                success: function(data) {
                    gb();
                    zmlb(hmid, '');
                },
                error: function(data) {
                    $("#zmtx").text("用户数据上传失败，请重新上传！");
                }
            });
        }
    } else {
        if (mc == null || mc == "") {
            $("#zmtx").text("二维码名称不能为空！");
        } else {
            upzmsj(fd);
        }
    }
});

function hmsc(id) {
    $.ajax({
        url: dz + "delLogoQRCode",
        method: "POST",
        data: { id: id },
        cache: false,
        async: false,
        success: function(data) {
            gb();
            hmlb('');
        },
        error: function(data) {
            $("#cwtx").text("删除失败，请重删除！");
        }
    });
}

function zmsc(id) {
    $.ajax({
        type: 'post',
        url: dz + 'delSubcode',
        async: false,
        cache: false,
        data: { id: id },
        success: function() {
            swal("", "删除成功", "success");
            zmlb($(this).attr("data-id"), '');
        },
        error: function(data) {
            swal("", "删除失败，请重删除！", "success");
        }
    });
}

function zmjy(id) {
    $.ajax({
        type: 'post',
        url: dz + 'disablesQRCode',
        async: false,
        cache: false,
        data: { id: id },
        success: function() {
            swal("", "禁用成功", "success");
            zmlb($(this).attr("data-id"), '');
        },
        error: function(data) {
            swal("", "禁用失败，请重新尝试！", "success");
        }
    });
}


// 微信登录注册
function WxLogn() {
    $.ajax({
        type: 'post',
        url: dz + 'WxEntryPh',
        cache: false,
        async: false,
        // data:{id:userid}
    }).done(function(data) {
        // if (data.msg == "0") {
        //     $('#sjzc-ts').attr("value", "产品已到期，暂无权限访问，请获取新的权限！");
        // } else {
        $(location).attr('href', "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + data.id + "&redirect_uri=" + ym + "/hxhrmp/ewm.html&response_type=code&scope=snsapi_userinfo&id=" + getQueryVariable("id") + "&state=STATE#wechat_redirect");
        // }
    });
}

function ewmpd(id) {
    $.ajax({
        type: 'post',
        url: dz + "wxQRCodeJudge",
        cache: false,
        async: false,
        data: {
            id: id
        },
        error: function(data) {
            $('#sbtx').text("微信二维码获取失败，请重新扫描进入。");
        }
    })
}

function ewmjz(id, code) {
    $.ajax({
        type: 'post',
        url: dz + "wxQRCode",
        cache: false,
        async: false,
        data: {
            id: id,
            code: code
        },
        error: function(data) {
            $('#sbtx').text("微信二维码获取失败，请重新扫描进入。");
        }
    }).done(function(data) {
        //console.log(data.content);//返回验证结果
        if (data.code == 200) {
            $('title').text(data.rows[0].name);
            var ewm = '<img src="' + ym + '/hxhrmp/xthm/zmtp/' + data.rows[0].ewm + '" alt=""><p>' + data.rows[0].name + '</p><p style="color: rgb(153, 153, 153);font-size: 14px;">扫码添加群或长按二维码识别</p>'
            $('.wxewm').append(ewm);
        } else if (data.code == 300) {
            $('#sbtx').text("您添加的群聊天已经存在，请进入微信查看。");
        } else {
            $('#sbtx').text("微信二维码获取失败，请重新扫描进入。");
        }
        // $("#dlmm-ts").attr("src",data.tpdz);
        // $("#avarimgs").attr("src",data.tpdz);
        // $("#txlg-img").attr("src",data.tpdz);

    })
}