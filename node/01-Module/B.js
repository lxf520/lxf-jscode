let moduleB = (function() {
    let b1 = "我是b1";
    let b2 = "我是b2";
    var name = "lw";

    let logStringB = () => console.log(b1 + b2);
    console.log("加载B.js");

    return { b1, b2, name, logStringB };
})()