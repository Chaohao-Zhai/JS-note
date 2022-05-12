/*  for in 循环遍历 和   in操作符  都会寻找对象的原型链   原型链的尽头是Object.prototype */
var obj1 = {
    a: 2,
    b: 3
}
var obj2 = Object.create(obj1)   //将新对象的原型链 关联到指定对象
//for in  遍历
for (var k in obj2) {    //遍历是否有属性
    console.log(k);  // a  b
}
console.log("a" in obj2);   //true

/* P147 */
function Foo () {

}
var foo = new Foo()
console.log(foo.__proto__ == Foo.prototype);  //true
console.log(Object.getPrototypeOf(foo) === Foo.prototype);  //true
console.log(typeof Foo.prototype);  //object
console.log(Foo.prototype instanceof Object);   //true
console.log(Object.prototype.toString.call(Foo.prototype));  //[object Object]