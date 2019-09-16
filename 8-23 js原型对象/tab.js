// 提供构造函数
function Tab() { };

// 设置原型对象
Tab.prototype = {
    constructor: Tab,
    init: function () {
        // 初始化的方法：处理数据和主要函数
        this.ele = this.createEle();

        this.oLis = this.ele.getElementsByTagName("li");
        this.oDivs = this.ele.getElementsByClassName("tab-content");

        this.insetView();
        this.addEvent();
    },
    createEle() {
        var oDiv = document.createElement('div');

        oDiv.innerHTML = `
                            <ul>
                                <li>关注</li>
                                <li class="active">新闻</li>
                                <li>本地</li>
                                <li>体育</li>
                            </ul>
                            <div class="tab-content">关注+</div>
                            <div class="tab-content current">新闻+</div>
                            <div class="tab-content">本地+</div>
                            <div class="tab-content">体育+</div>`
        oDiv.className = "tabItem";
        return oDiv;
    },
    addEvent: function () {
        for (var i = 0, len = this.oLis.length; i < len; i++) {
            this.oLis[i].index = i;
            var self = this;

            this.oLis[i].onclick = function () {
                //运行toggleClassName这个函数
                self.toggleClassName(this.index);
            }
        }
    },
    toggleClassName(i) {
        // 设置当前的li标签选中 排他
        // 设置让当前对应div切换显示 排他
        for (var k = 0; k < 4; k++) {
            this.oLis[k].className = '';
            this.oDivs[k].className = "tab-content";
        }

        this.oLis[i].className = "active";
        this.oDivs[i].className = "tab-content current";
    },
    insetView() {
        document.body.appendChild(this.ele);
    }
}