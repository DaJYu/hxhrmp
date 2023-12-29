// var dz = "http://192.168.2.101/:8080/";
// var dz = window.location.protocol + "//" + window.location.host + "/hmglxt/";
var theme = {
    // 默认色板
    color: [
        '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ]
}
var user = sessionStorage.getItem("userid");
echarts.registerTheme('themes', theme);
var myChart = echarts.init(document.getElementById('chart'), "themes");
var myChart1 = echarts.init(document.getElementById('chart1'), "themes");
var myChart2 = echarts.init(document.getElementById('chart2'), "themes");
var myChart3 = echarts.init(document.getElementById('chart3'), "themes");
var title;
var datax = [];
var datay = [];

function zxt(a, b, c, d) {
    option = {
        title: {
            text: a,
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        // dataZoom: {
        //     show: true,
        //     start: 50
        // },
        calculable: true,
        xAxis: [{
            type: 'category',
            name: '时间',
            boundaryGap: false,
            data: b
        }],
        yAxis: [{
            type: 'value',
            name: '人数'
        }],
        series: [{
            name: '人数',
            type: 'line',
            data: c
        }]
    };
    d.setOption(option);
}

function dtzxt(a, b, c, d, e, f) {
    option = {
        title: {
            text: a,
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: { data: c },
        dataZoom: {
            show: true,
            start: 50
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            name: '时间',
            boundaryGap: false,
            data: b
        }],
        yAxis: [{
            type: 'value',
            name: '扫码次数'
        }],
        series: [{
            name: '已发布',
            type: 'line',
            data: d
        }, {
            name: '未发布',
            type: 'line',
            data: e
        }]
    };
    f.setOption(option);
}

function txt(a, b, c, d, e, f) {
    var options = {
        title: {
            text: a,
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            name: e,
            data: b
        }],
        yAxis: [{
            type: 'value',
            name: f
        }],
        series: [{
            name: f,
            type: 'bar',
            label: {
                show: true,
                position: 'inside'
            },
            data: c
        }]
    };
    d.setOption(options);
}

function dqfzl() {
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: dz + 'worksStatistics',
        async: false,
        cache: false,
        success: function(data) {
            // console.log(data.datax);
            datax = data.datax;
            dataleg = data.dataleg;
            datayf = data.datayf;
            datawf = data.datawf;
            dtzxt("今天扫码加群情况统计", datax, dataleg, datayf, datawf, myChart);
        }
    });
}

function bmqk(a, b) {
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: dz+'signUpSum',
        async: false,
        cache: false,
        data: {
            id: userid,
            gsid: gsid,
            jsid: jsid,
            qx: a,
            sj: b
        },
        success: function(data) {
            // var data = data.bmsj[0];
            datax = data.datax;
            datay = data.datay;
            txt("当前报名客户情况汇总", datax, datay, myChart, '类型', '人数');
        }
    });
}

function ygkh(a, b) {
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: dz+'staffCustomer',
        async: false,
        cache: false,
        data: {
            id: userid,
            gsid: gsid,
            jsid: jsid,
            qx: a,
            sj: b
        },
        success: function(data) {
            // var data = data.ygkhs[0];
            datax = data.datax;
            datay = data.datay;
            txt("员工客户量汇总", datax, datay, myChart1, '员工', '人数');
        }
    });
}

function dcqk(a, b) {
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: dz+'jobIntension',
        async: false,
        cache: false,
        data: {
            id: userid,
            gsid: gsid,
            jsid: jsid,
            qx: a,
            sj: b
        },
        success: function(data) {
            // var data = data.dcqk[0];
            datax = data.datax;
            datay = data.datay;
            txt("客户找工作意向情况", datax, datay, myChart2, '意向', '人数');
        }
    });
}

function tsml(a, b) {
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: dz+'scanSum',
        async: false,
        cache: false,
        data: {
            id: userid,
            gsid: gsid,
            jsid: jsid,
            qx: a,
            sj: b
        },
        success: function(data) {
            // var data = data.dcqk[0];
            datax = data.datax;
            datay = data.datay;
            txt("客户扫码加群情况统计", datax, datay, myChart3, '群名称', '人数');
        }
    });
}

myChart.on('click', function(data) {
    yhzs(data.name, 'd', data.data.id);
})
myChart1.on('click', function(data) {
    console.log(data.data.id)
    yhzs(data.name, 'm', data.data.id);
})
myChart2.on('click', function(data) {
    yhzs(data.name, 'z', data.data.id);
})
myChart3.on('click', function(data) {
    yhzs(data.name, 'z', data.data.id);
})

function yhzs(mc, cs, id) {
    $('.khsjzs').show();
    $('.khbt').text(mc + "的客户");
    $('#khlb').empty();
    var str = '<table id="customer"></table>';
    $('#khlb').append(str);
    $('#customer').bootstrapTable({
        url: dz + 'customer?hmid=' + id + '&lx=' + cs,
        columns: [{
            field: 'tx',
            title: '头像',
            align: 'center',
            formatter: function(value, row, index) {
                // var lx = value.substring(value.length - 3);
                return '<img  src="' + value + '" width="48" height="36" class="img-rounded" >';
            }
        }, {
            field: 'nc',
            title: '名称',
            valign: 'middle',
            align: 'center'
        }, {
            field: 'xb',
            title: '性别',
            valign: 'middle',
            align: 'center'
        }, {
            field: 'dq',
            title: '地区',
            valign: 'middle',
            align: 'center'
        }, {
            field: 'cjsj',
            title: '扫码时间',
            valign: 'middle',
            align: 'center'
        }],
        pagination: true,
        sidePagination: 'server',
        pageSize: 5,
        pageList: [5, 10, 'all'],
    });
}

function zqk(a, b) {
    $.ajax({
        type: 'post',
        // dataType: 'json',
        url: dz+'summaryDisplay',
        async: false,
        cache: false,
        data: {
            id: userid,
            gsid: gsid,
            jsid: jsid,
            qx: a,
            sj: b
        },
        success: function(data) {
            var data = data.cont[0];
            $("#zkh").text(data.zkh);
            $("#bldh").text(data.zdh);
            $("#blsfz").text(data.zsfz);
        },
        error: function(data) {
            $("#zkh").text("0");
            $("#bldh").text("0");
            $("#blsfz").text("0");
        }
    });
}