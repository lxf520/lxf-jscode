// console.log(a1); /* A.js */
// console.log(a2);
// console.log(b1); /* B.js */
// console.log(name);

console.log(moduleA.a1, moduleA.a2);
console.log(moduleB.b1, moduleB.b2, moduleB.name);
moduleB.logStringB();
console.log(moduleA.name, moduleB.name);