let moduleA = (function() {
    let a1 = "我是a1";
    let a2 = "我是a2";
    var name = "zs";
    let logStringA = () => console.log(a1 + a2);
    console.log("加载A.js");
    return { a1, a2, name };
})()