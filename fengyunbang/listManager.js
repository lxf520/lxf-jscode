class ListManager {
    constructor(data) {
        this.title = data.title;
        this.types = data.types;
        this.currentIndex = 0;

        this.dataList = data.dataList;
        this.root = null;
        this.uls = null;
    }
    createHTML() {
        let htm1 = this.createHeaderHTML();
        let htm2 = this.createListHTML();

        // var oBox = document.createElement("div");
        // oBox.className = 'box';
        // oBox.innerHTML = htm1 + htm2;
        // document.body.appendChild(oBox);

        var oBox = $(`<div class='box'>${htm1+htm2}</div>`)
        $("body").append(oBox);


        this.root = oBox[0];
        // 设置第一个ul列表显示出来
        // this.uls = oBox.querySelectorAll('.list');
        this.uls = oBox.find('.list');

        this.toggleClass(this.uls, 0, 'list', 'list cur')


    }
    createHeaderHTML() {
        let html = `
                    <h1>${this.title}</h1>
                    <div class= 'tab'>
                        <ul class='tab-list'>
                            <li class="active">${this.types[0]}</li>
                            <li>${this.types[1]}</li>
                            <li>${this.types[2]}</li>
                            <li>${this.types[3]}</li>
                        </ul>
                    </div>
`
        return html;
    }
    createListHTML() {
        let res = '';
        this.dataList.forEach(element => {
            let lisStr = element.map((item) => {
                let html = `
                            <li>
                            <p><span>${item.index}</span>${item.name}</p>
                            <div class="content">
                                <img src=${item.img}>
                                <p>${item.detail}</p>
                            </div>
                            </li>
    `
                return html
            }).join('');
            let ulStr = `<ul class='list'>${lisStr}</ul>`
            res += ulStr;
        });
        return res
    }
    toggleClass(elements, index, defaultClass, currentClass) {
        Array.from(elements).forEach((ele) => {
            ele.className = defaultClass;
        })
        elements[index].className = currentClass;
    }
    addClickEventWithTab() {
        // let oLis = this.root.querySelector('.tab-list').children;

        // Array.from(oLis).forEach((ele, i) => {
        //     ele.onclick = () => {
        //         this.currentIndex = i;
        //         // 排他
        //         this.toggleClass(oLis, i, "", "active");
        //         // 设置切换显示相对应的列表
        //         this.toggleClass(this.uls, i, "list", "list cur");
        //         // 给当前列表添加鼠标移入事件
        //         this.addMouseenterEventWithLi();
        //     }
        // })

        let oLis = $(this.root).find('.tab-list > li');
        var self = this;
        oLis.click( function(){
            self.currentIndex = $(this).index();

            $(this).addClass("active").siblings().removeClass("active");
            self.uls.eq(self.currentIndex).addClass("cur").siblings().removeClass("cur");
            self.addMouseenterEventWithLi();
        })
    }
    addMouseenterEventWithLi() {
        // let oLis = this.uls[this.currentIndex].children;
        // Array.from(oLis).forEach((ele, i) => {
        //     ele.onmouseenter = () => {
        //         /* 切换li标签的样式 */
        //         this.toggleClass(oLis, i, "", "current");
        //     }
        // })

        var oLis = this.uls.eq(this.currentIndex).children();
        oLis.mouseenter(function(){
            console.log('21342');
            
            $(this).addClass('current').siblings().removeClass('current');
        })
    }
    init() {
        this.createHTML();
        this.addClickEventWithTab();
        this.addMouseenterEventWithLi();
    }
}
