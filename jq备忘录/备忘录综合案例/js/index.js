$(function () {
    /*添加操作*/

    //拿到标签
    let oText = $('#textID');
    let oTask = $(".task");

    // 定义一个数组拿到缓存的值或者初始化
    var arr = JSON.parse(localStorage.getItem("data")) || [];

    // 刷新页面
    renderView();

    // 提供一个函数动态生成标签
    function renderView() {
        // var res = arr.map(function (ele, index) {
        //     return `
        //     <li data-index=${index}>
        //         <input type="checkbox">
        //         <span class="iTem_title">${ele}</span>
        //         <span class="detail">详情</span>
        //         <span class="del">删除</span>
        //     </li>`;

        // }).join('');
        // oTask.html(res);

        $(".finish_task").empty();
        $(".task").empty();

        arr.forEach((ele, index) => {
            let oLi = `
                <li data-index=${index}>
                    <input type="checkbox" ${ele.isCheck ? "checked" : ""}>
                    <span class="iTem_title">${ele.title}</span>
                    <span class="detail">详情</span>
                    <span class="del">删除</span>
                </li>`;
            if(ele.isCheck){
                $(".finish_task").append(oLi);
            }else{
                $(".task").append(oLi);
            }
        })
    }

    // 点击按钮
    $('input[type="submit"]').click(function (event) {
        // 禁止默认行为
        event.preventDefault();
        // 拿到输入框的值进行检查
        let val = $.trim(oText.val());
        if (val.length == 0) {
            alert("请输入内容");
            return
        }

        // 处理数据（吧输入框的值存进数组并且同步本地数据）
        // 搞一个对象来存数据
        let item = {
            title: val,
            isCheck: false,
            detail: '默认',
            timer: "2019-09-09"
        }

        arr.push(item);
        localStorage.setItem('data', JSON.stringify(arr));

        //更新页面
        renderView();
        // 清空输入框的值
        oText.val('').focus();
    })


    /*删除操作 */
    $(".body").on("click", ".del", function () {
        let index = $(this).parent().index();
        console.log($(this).parent().index());

        arr.splice(index, 1);
        // 同步本地保存数据
        localStorage.setItem("data", JSON.stringify(arr));
        // 更新视图
        renderView();
    })

    /*切换任务列表*/
    $(".header li").click(function () {
        $(this).addClass("cur").siblings().removeClass('cur');
        let index = $(this).index();
        $(".body").eq(index).addClass("active").siblings().removeClass("active");
    })

    /*切换复选框状态的时候刷新UI */
    $(".body").on("click", "input[type='checkbox']", function () {
        let flag = $(this).is(":checked");
        console.log(flag);
        
        let index = $(this).parent().data().index;

        arr[index].isCheck = flag;
        // [2]同步本地保存的数据
        localStorage.setItem("data", JSON.stringify(arr));
        // [3] 更新视图
        renderView();
    })


    let _index;
    /*展示详情页面*/
    $(".body").on("click",".detail",function(){
        $(".mask").fadeIn();

        let index = $(this).parent().data().index;
        _index = index;
        
        let currentTask = arr[index];
        $(".title").text(currentTask.title);
        $("textarea").val(currentTask.detail);
        $("#dateTime").val(currentTask.timer);
    })
    /*关闭*/
    $(".close, .mask").click(function(){
        $(".mask").fadeOut();
    })
    // 阻止冒泡
    $(".detail_content").click(function(e){
        e.stopPropagation();
    })

    /*更新详情 */
    $(".update").click(function(){
        arr[_index].detail = $("textarea").val();
        arr[_index].timer = $("#dateTime").val();
        localStorage.setItem("data",JSON.stringify(arr));

        $(".mask").fadeOut();

    })
})



//有什么区别吗
// let index = $(this).parent().index();
// let index = $(this).parent().data().index;
