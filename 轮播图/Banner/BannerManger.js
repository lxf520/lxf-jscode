   class BannerManager {
       constructor(data, root = document.body) {
           this.index = 0;
           this.root = root;
           this.data = data;
           this.slider = null;
           this.sliderBox = null;
           this.sliderControl = null;
           this.sliderNav = null;
           this.sliderItemWidth = 700;
           this.len = this.data.length;
           this.timer = null;
       }
       init() {
           this.createHTML(); /* 创建this.slider */
           this.root.appendChild(this.slider);

           /* 设置让轮播图自动播放 */
           this.autoPlayer();
           this.addClickEventHandler();
           this.addClickEventHandlerWithSliderNavItem();
           this.switchNavItem(0);
           this.addMouseEventHandler();
       }
       getColor() {
           let r = parseInt(Math.random() * 255);
           let g = parseInt(Math.random() * 255);
           let b = parseInt(Math.random() * 255);
           let a = (Math.random()).toFixed(2) * 1;
           return `rgba(${r},${g},${b},${a})`
       }
       createHTML() {
           this.sliderBox = document.createElement("ul");
           this.sliderBox.className = "slider-box";
           this.sliderBox.innerHTML = this.data.map((ele, index) => {
               // return `<li class="slider-box-item" style="background:${this.getColor()}">${index + 1}</li>`
               return `<li class="slider-box-item"><img src=${ele}></li>`
           }).join("");

           console.log(this.sliderBox);
           this.sliderControl = document.createElement("div");
           this.sliderControl.className = "slider-control";
           this.sliderControl.innerHTML = `<span class="prev">&lt;</span> <span class="next">&gt;</span>`

           this.sliderNav = document.createElement("ol");
           this.sliderNav.className = "slider-nav";
           this.sliderNav.innerHTML = this.data.map((ele, index) => {
               return `<li class="slider-nav-item">${index + 1}</li>`
           }).join("");

           this.slider = document.createElement("div");
           this.slider.className = "slider";
           this.slider.appendChild(this.sliderBox);
           this.slider.appendChild(this.sliderControl);
           this.slider.appendChild(this.sliderNav);
           console.log(this.slider);
       }
       autoPlayer() {
           /* 利用定时器来实现，每隔2秒就显示下一张图片 */
           this.timer = setInterval(() => this.next(), 2000);
       }
       addClickEventHandler() {
           this.sliderControl.onclick = (e) => {
               if (e.target.className == "prev") {
                   this.prev();
               } else if (e.target.className == "next") {
                   this.next();
               }
           }
       }
       next() {
           this.index++;
           if (this.index > this.len - 1) {
               this.index = 0;
           }
           this.sliderBox.style.left = -this.index * this.sliderItemWidth + "px";
           this.switchNavItem(this.index);
       }
       prev() {
           this.index--;
           if (this.index < 0) {
               this.index = this.len - 1;
           }
           this.sliderBox.style.left = -this.index * this.sliderItemWidth + "px";
           this.switchNavItem(this.index);
       }
       addClickEventHandlerWithSliderNavItem() {
           /* 添加点击事件 */
           Array.from(this.sliderNav.children).forEach((ele, index) => {
               ele.onclick = () => {
                   this.switchNavItem(index)
                   this.index = index;
                   this.sliderBox.style.left = -this.index * this.sliderItemWidth + "px";
               }
           })
       }
       switchNavItem(i) {
           Array.from(this.sliderNav.children).forEach(ele => ele.className = "slider-nav-item")
           this.sliderNav.children[i].className = "slider-nav-item active";
       }
       addMouseEventHandler() {
           this.slider.onmouseenter = () => clearInterval(this.timer)
           this.slider.onmouseleave = () => this.autoPlayer()
       }
   }