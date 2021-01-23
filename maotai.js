const needReturnUrls = [
    'www.taobao.com/markets/bx/wait_pc',
    'www.tmall.com/home'
];
const maotaiUrl = 'https://product.suning.com/0000000000/11001203841.html';
const buyBtnId = 'buyNowAddCart';
const submitBtnId = 'submit-btn';

//检测状态
function checkElementState(path, callback, index = 0) {
    var ele = document.querySelector(path);
    if (ele) {
        callback && callback();
    }
    else {
        setTimeout(function () {
            if (index < 6) {
                checkElementState(path, callback, index + 1);
            }
            else {
                window.location.href = maotaiUrl;
            }
        }, 200);
    }
}

//下单
function checkOut() {
    console.log('开始抢购....');
    var btn = document.getElementById(buyBtnId);

    if (btn) {
        btn.click();
    }
    else {
        console.log('下单按钮没找到');
    }
}

function checkOutAsync() {
    checkElementState('#' + buyBtnId, checkOut);
}

//提交订单
function submitOrder() {
    console.log('提交订单开始....');

    checkElementState('.' + submitBtnId, function () {
        var btn = document.querySelector("." + submitBtnId);

        if (btn) {
            btn.click();
        }
        else {
            console.log('提交订单按钮没找到');
        }
    });
}

//目标时间
var dDate = new Date();
dDate.setHours(09, 29, 59);

//进入时间判断循环
function enterTimeCheckLoop(callback) {
    var date = new Date();

    var diff = Date.parse(dDate) - Date.parse(date);

    var leave1 = diff % (24 * 3600 * 1000);             //计算天数后剩余的毫秒数  
    var hours = Math.floor(leave1 / (3600 * 1000));  //计算出小时数  

    var leave2 = leave1 % (3600 * 1000);             //计算小时数后剩余的毫秒数  
    var minutes = Math.floor(leave2 / (60 * 1000));  //计算相差分钟数  

    var leave3 = leave2 % (60 * 1000);               //计算分钟数后剩余的毫秒数  
    var seconds = Math.round(leave3 / 1000);       //计算相差秒数  
    console.log("倒计时: " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒");

    if (diff < -5 * 60 * 1000) {
        console.log('时间过了！');
        return;
    } else if (diff < 500) {
        callback && callback();

        console.log('时间到了！！！');
    } else {
        setTimeout(function () { enterTimeCheckLoop(callback); }, 50);
    }
}

//主要函数
function main() {
    console.log('############################开始抢购茅台############################');

    var href = window.location.href;
    if (href.indexOf('product.suning.com') > -1) {
        var title = document.getElementById('itemDisplayName').innerHTML;

        if (!title.includes('贵州茅台酒')) {
            console.log('请打开茅台商品页');
            return;
        }
    
        //结算页面
        //进入时间判断
        enterTimeCheckLoop(checkOutAsync);
    }
    else if (href.indexOf('shopping.suning.com') > -1) {
        //提交订单页面
        submitOrder();
    }
    else {
        needReturnUrls.forEach(function(url) {
            if (href.indexOf(url) > -1) {
                window.location.href = maotaiUrl;
            }
        });
    }
}


main();