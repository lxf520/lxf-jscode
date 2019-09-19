(function () {
    'use strict'
    var jQuery = function (selector) {
        return new jQuery.fn.init(selector);
    }

    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function (selector) {
            if (typeof selector == 'string') {
                var items = document.querySelectorAll(selector);
                Array.from(items).forEach((ele, index) => {
                    this[index] = ele;
                })
                this.length = items.length;
            }
            if (typeof selector == 'object' && selector.nodeType == 1) {
                this[0] = selector;
                this.length = 1
            }
            return this;
        },
        get: function (index) {
            return index >= 0 ? this[index] : this[index + this.length];
        },
        eq: function (index) {
            let ele = this.get(index);
            return $(ele);
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        each: function () {
            $.each(this, fn);
        }
    }
    // 封装函数：把所有的方法都添加到jquery上面去
    jQuery.fn.extend = jQuery.extend = function (target) {
        for (let k in target) {
            if (target.hasOwnProperty(k) && typeof target[k] == 'function') {
                this[k] = target[k];
            }
        }
    }

    jQuery.fn.extend({
        html() {},
        text() {},
        append() {},
        appendTo() {}
    })

    jQuery.extend({
        each: function (target, fn) {
            if (isArrayOrLikeArray(target)) {
                for (let i = 0; i < target.length; i++) {
                    if (fn.call(target[i], i, target[i]) == false) break;
                }
            } else {
                for (let key in target) {
                    if (fn.call(target[key], key, target[key]) == false) break;
                }
            }
        },
        trim: function (str) {
            return str.replace(/^\s+|\s+$/g, "");
        },
    })

    function isArrayOrLikeArry(arg) {
        if (Array.isArray(arg)) {
            return true;
            // {0:"zs",1:"ls",2:"ss",length:3}
        } else if (typeof arg == "object" && "length" in arg && (arg.length - 1) in arg) {
            return true;
        } else {
            return false;
        }
    }

    jQuery.fn.init.prototype = jQuery.prototype;

    window.$ = window.jQuery = jQuery;

    /* 处理事件相关的方法 */
    jQuery.fn.extend({
        on: function (type, handler) {
            /* this 给jquery实例对象中每个标签都添加事件 */
            for (let i = 0; i < this.length; i++) {
                if (window.addEventListener) {
                    this[i].addEventListener(type, handler);
                } else {
                    this[i].attachEvent("on" + type, handler);
                }
            }
        },
        click: function (fn) {
            this.on("click", fn);
        },
        mouseenter: function (fn) {
            this.on("mouseenter", fn);
        },
        mouseleave: function (fn) {
            this.on("mouseleave", fn);
        }
    })
})()