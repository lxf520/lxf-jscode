var name = 'xx';
var age = 18;
var show = function(){
    console.log(name,age);
}

module.exports = { name, age, show};

let moduleB = require('./B');
console.log(moduleB);
