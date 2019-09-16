 var $ = {
     isArray: function(arr) {
         if (Array.isArray) {
             return Array.isArray(arr);
         } else {
             return Object.prototype.toString.call(arr) == "[object Array]";
         }
     },
     isFunction: function(func) {
         return typeof func == "function";
     },
     isString: function(str) {
         return typeof str == "string";
     },
     isNumber: function(num) {
         return typeof num == "number";
     },
     isBoolean: function(bool) {
         return typeof bool == "boolean";
     },
     isElementNode: function(ele) {
         if (ele != null) {
             return ele.nodeType == 1;
         } else {
             return false;
         }
     },
     isObject: function(o) {
         /* null  | Array */
         // typeof o == "object"
         if (o != null && !this.isArray(o) && typeof o == "object") {
             return true;
         } else {
             return false;
         }
     },
     getRandom: function(min, max) {
         return parseInt(Math.random() * (max - min + 1)) + min
     },
     getRandomColor: function() {
         var r = this.getRandom(0, 255);
         var g = this.getRandom(0, 255);
         var b = this.getRandom(0, 255);
         var a = Math.random();
         return `rgba(${r},${g},${b},${a})`;
     },
     getStyleWithEleAndKey(ele, key) {
         /* 获取颜色 */
         if (window.getComputedStyle) {
             return window.getComputedStyle(ele)[key];
         } else if (ele.currentStyle) {
             return ele.currentStyle[key];
         } else {
             return ele.style[key];
         }
     }
 }