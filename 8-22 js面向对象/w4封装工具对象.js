// 封装工具对象把我们以前上课时候封装的获取随机数、获取随机颜色、获取标签样式等方法全部写到该对象中

function Fn() { };
Fn.prototype = {
    constructor : f,

    getRandom: function (max, min) {
        return parseInt(Math.random() * (max - min + 1)) + min
    },
    getRandomColor: function () {
        var text = '0123456789ABCDEF';
        var cont = '#';
        for (var i = 0; i < 6; i++) {
            var index = parseInt(Math.random() * 16);
            cont += text[index];
        }
        return cont;
    },
    getStyle: function (ele, name) {
        if (ele.currentStyle) {
            return ele.currentStyle[name];
        } else if (window.getComputedStyle) {
            return window.getComputedStyle(ele)[name];
        } else {
            return ele.style[name];
        }
    }
}

var $ = new Fn();

$.getRandom(10,1);