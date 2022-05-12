/* 简单基本类型和内置对象 今天一次说明白
**简单基本类型：string object number null undefined boolean symbol
**内置对象：String Object Number Boolean Array Function Date 
 */

//简单基本类型
const string1 = "today is monday";//这是简单基本类型
console.log(typeof string1);  //string 
console.log(string1 instanceof String);  //false
console.log(Object.prototype.toString.call(string1));  //[object String]
/* 在不知道变量是什么类型的时候，可以使用typeof返回是什么简单基本数据类型，但是简单基本数据类型中只有object是对象，其余都不是对象;内置对象有很多种，这时可以使用instanceof判断是什么类型的对象 */
console.log(string1.length);   //15   原始值string1不是对象，但是却有对象的属性，说明对原始值转换成了String对象了

//内置对象有很多种，这时可以使用instanceof判断是什么类型的对象
const string2 = new String("today is friday")
console.log(typeof string2);   //object    new 调用生成一个对应构造函数的实例对象
console.log(string2 instanceof String);   //  true
console.log(string2.length);   //15
console.log(Object.prototype.toString.call(string2));  //[object String]


/* 可计算属性名 */
var name = "today";
var day = {
    [name + " is"]: "monday"
}
console.log(day["today is"])  //momday



/* 属性描述符 */
var myObj = {}
Object.defineProperty(myObj, "a", {
    value: 2,
    writable: true,
    enumerable: true,
    configurable: true
})
console.log(myObj.a)   //2
//writable改为false
Object.defineProperty(myObj, "a", {
    value: 2,
    writable: false,
    enumerable: true,
    configurable: true
})
myObj.a = 3;
console.log(myObj.a);  //2 属性值修改失败
//configurable改为false    单向修改 并且这个属性不会被删除
Object.defineProperty(myObj, "a", {
    value: 2,
    writable: true,
    enumerable: true,
    configurable: false   //配置修改是单向的  再修改configurable就会报错
})
//因此 writable:false  +++ configurable:false  可以创建一个真正的常量属性，不能修改 定义或删除
//另外还有：Object.preventExtension(obj)  Object.freeze(obj)

/* getter and setter */
//给属性定义getter和setter时，属性会被定义为"访问描述符"————》set get enumerable configurable

var myobj = {
    //给a定义一个getter
    get a () {    //我们自定义 a =2  下面代码中没有setter 
        return 2
    }
}
Object.defineProperty(
    myobj,   //目标对象
    "b",     //属性名
    {//描述符
        //给b设置一个getter
        get: function () {
            return this.a * 2
        },
        enumerable: true
    })
myobj.a = 5  //只定义了getter ,set操作会忽略赋值操作
console.log(myobj.a, myobj.b);   //2   4


/* 存在性 */
//  in 操作符   判断属性是否存在于对象及其原型链中
var me = {
    age: 25
}
console.log("age" in me);   //true
console.log("name" in me);  //false

//hasOwnProperty   判断属性是否存在于对象中  不检查原型链
console.log(me.hasOwnProperty("age"));  //true

//显示绑定
console.log(Object.prototype.hasOwnProperty.call(me, "age"))  //true


/*enumerable */
//propertyIsEnumerable()  //属性直接存在于对象中      +++++     enumerable:true
//Object.keys()  //返回数组，属性直接存在于对象中      +++++     enumerable:true
//7Object.getOwnPropertyNames()    //返回数组。属性直接存在于对象中
//in  查找对象和原型链 不管可不可枚举
//hasOwnProperty   查找对象 不管可不可枚举



/* 遍历 */
var arr = [1, 2, 3, 4, 5, 6]
for (const keys in arr) {
    console.log(keys);   //返回index   0 1 2 3 4 5 
}

for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);    //  返回值 1 2 3 4 5 6
}

for (let key of arr.keys()) {   //相当于 for in
    console.log(key);
}

for (let key of arr.values()) {   //相当于 for
    console.log(key);
}

for (let pair of arr.entries()) {
    console.log(pair);  //[ 0, 1 ][ 1, 2 ][ 2, 3 ]  [ 3, 4 ][ 4, 5 ] [ 5, 6 ] 
}