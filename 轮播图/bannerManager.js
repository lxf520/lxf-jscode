class BannerManger {
    constructor(data, root = document.body) {
        this.data = data;
        this.slider = null;
        this.sliderBox = null;
        this.sliderControl = null;
        this.sliderNav = null;
        this.root = root;

        this.sliderItemWidth = 700;
        this.index = 0;
        this.sliderItemCount = this.data.length;
        this.timer = null;
    }
    init() {
        this.createHtml();
        this.root.appendChild(this.slider);
        this.autoPlayer();
        // this.randomColor();
        this.addClickHandle();
        this.addMouseHandle();
        this.switchSlider(0);
        this.addMouseHandleWithItem();
    }
    createHtml() {
        let sliderBox = document.createElement('ul');
        sliderBox.className = 'slider-box';
        // `
        //     <span class="slider-box-item">1</span>
        //     <span class="slider-box-item">2</span>
        //     <span class="slider-box-item">3</span>
        //     <span class="slider-box-item">4</span>
        //     <span class="slider-box-item">5</span>
        //     <span class="slider-box-item">6</span>
        // ` ;
        let html1 = this.data.map((ele)=>{
            return `<li class='slider-box-item'><img src = ${ele}> </li>`
        }).join('');
        sliderBox.innerHTML = html1;

        let sliderControl = document.createElement('div');
        sliderControl.className = 'slider-control';
        sliderControl.innerHTML = `
            <span class="prev">&lt;</span>
            <span class="next">&gt;</span>
        `;
        let sliderNav = document.createElement('ol');
        sliderNav.className = 'slider-nav';
        let html2 = this.data.map((ele,index)=>{
            return `<li class="slider-nav-item">${index+1}</li>`
        }).join('');
        sliderNav.innerHTML = html2;
        // `
        //     <li class="slider-nav-item">1</li>
        //     <li class="slider-nav-item">2</li>
        //     <li class="slider-nav-item">3</li>
        //     <li class="slider-nav-item">4</li>
        //     <li class="slider-nav-item">5</li>
        //     <li class="slider-nav-item">6</li>
        // `
        

        let slider = document.createElement('div');
        slider.className = 'slider';
        slider.appendChild(sliderBox);
        slider.appendChild(sliderControl);
        slider.appendChild(sliderNav);

        this.slider = slider;
        this.sliderBox = sliderBox;
        this.sliderControl = sliderControl;
        this.sliderNav = sliderNav;

    }
    randomColor() {
        let getColor = () => {
            let r = Math.random() * 256;
            let g = Math.random() * 256;
            let b = Math.random() * 256;
            let a = Math.random();
            let color = `rgba(${r},${g},${b},${a})`;
            return color;
        }
        Array.from(this.sliderBox.children).forEach((ele) => {
            ele.style.background = getColor();
        })
    }
    autoPlayer() {
        this.timer = setInterval(() => {
            this.next()
        }, 2000)
    }
    // 左右按钮点击事件
    addClickHandle() {
        this.sliderControl.onclick = (e) => {
            if (e.target.className == 'prev') {
                this.prev();
            } else if (e.target.className == 'next') {
                this.next();
            }
            console.log(e.target);
        }
    }
    next() {
        this.index++;
        if (this.index > (this.sliderItemCount - 1)) {
            this.index = 0;
        }
        this.sliderBox.style.left = -this.index * this.sliderItemWidth + 'px';
        this.switchSlider(this.index);
    
    }
    prev() {
        this.index--;
        if (this.index < 0) {
            this.index = this.sliderItemCount - 1;
        }
        this.sliderBox.style.left = -this.index * this.sliderItemWidth + 'px';
        this.switchSlider(this.index);
    }
    // 鼠标放上去的时候轮播图静止
    addMouseHandle() {
        this.slider.onmouseover = () => {
            clearInterval(this.timer);
        }
        this.slider.onmouseout = () => {
            this.autoPlayer();
        }
    }
    // 当前页面数字小圆的颜色
    switchSlider(index) {
        Array.from(this.sliderNav.children).forEach((ele) => {
            ele.className = 'slider-nav-item'
        });
        this.sliderNav.children[index].className = 'slider-nav-item active'
    }
    // 点击数字小圆跳转到对应的图片
    addMouseHandleWithItem(){
        Array.from(this.sliderNav.children).forEach((ele,index)=>{
            ele.onclick = ()=>{
                this.index = index;
                this.sliderBox.style.left = -this.index * this.sliderItemWidth + 'px';
                this.switchSlider(this.index);
            }
        })
    }
}