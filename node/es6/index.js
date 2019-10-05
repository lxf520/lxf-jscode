var i = "我是index.js文件";

// 导入a.js模块
import {a,a2,Person} from './a.js';
console.log('index.js----',a,a2);
console.log(new Person());


import {b} from './b.js';
console.log(b);

import newc from './c.js';
console.log('-------------',newc);
