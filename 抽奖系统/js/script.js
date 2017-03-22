var data = ['iphone7', 'ipad', '佳能相机', '三星笔记本', '50元充值卡', '惠普打印机', '谢谢参与'];
var timer = null;
var flag = 0;

window.onload = function () {
    var play = document.getElementById('play');
    var stop = document.getElementById('stop');
    //开始抽奖
    play.onclick = function () {
        playFun();
        flag = 1
    }
    stop.onclick = function () {
        stopFun();
        flag = 0;
    }

    //键盘事件
    document.onkeyup = function (event) {
        event = event || window.event;
        if (event.keyCode == 13) {
            if (flag == 0) {
                playFun();
                flag = 1;
            } else {
                stopFun();
                flag = 0;
            }
        }
    }
}

function playFun() {
    var play = document.getElementById('play');
    var title = document.getElementById('title');
    clearInterval(timer);
    timer = setInterval(function () {
        var random = Math.floor(Math.random() * data.length);
        title.innerHTML = data[random];
    }, 50);
    play.style.background = '#999';
}
function stopFun() {
    clearInterval(timer);
    var play = document.getElementById('play');
    play.style.background = '#036';
}