/* 
iterable可迭代对象
==> 身上实现了Iterable接口(可迭代协议)
==> 支持迭代的自我识别  +++ 创建实现Iterable接口的对象的能力
*/

/* 在JS中 属性名 ：【Symbol.iterator】作为 默认迭代器   ；
这个默认迭代器属性必须引用一个迭代器工厂函数，调用这个迭代器工厂函数，会返回一个新的迭代器
*/

/* 实现Iterable接口的内置类型 */
/* 
Stiring
Number
Map
Set
arguments
NodeList等DOM
*/

/* 检查 是否存在默认迭代器属性  */
let num = 1;
let obj = {};
console.log(num[Symbol.iterator]);  //undefined
console.log(obj[Symbol.iterator]);  //undefined

//实现迭代器 工厂函数
let str = "abc";
let arr = ["a", "b", "c"];
let map = new Map().set("a", 1).set("b", 2).set("c", 3);
let set = new Set().add("a").add("b").add("c");
console.log(str[Symbol.iterator]);  // ƒ [Symbol.iterator]() { [native code] }
console.log(arr[Symbol.iterator]);  // ƒ values() { [native code] }
console.log(map[Symbol.iterator]);  // ƒ entries() { [native code] }
console.log(set[Symbol.iterator]);  // ƒ values() { [native code] }

//调用迭代器工厂函数==>生成一个迭代器 
console.log(str[Symbol.iterator]());  // StringIterator {}
console.log(arr[Symbol.iterator]());  // Array Iterator {}
console.log(map[Symbol.iterator]());  // MapIterator {}
console.log(set[Symbol.iterator]());  // SetIterator{}


/* --------------------------------------------------------------------------- */
/* 迭代器协议 */
/* 首先 迭代器是一个对象，迭代与其关联的可迭代对象；使用迭代器中next()方法遍历可迭代对象的数据，返回一个IteratorResult对象,两个属性：done  and  value */

//可迭代对象
let arr1 = ['a', 'b', 'c', 'd']
//调用迭代器工厂函数，生成一个迭代器
let iterator1 = arr1[Symbol.iterator]();
//执行迭代   按顺序进行迭代
console.log(iterator1.next());   //{ value: 'a', done: false }
console.log(iterator1.next());   //{ value: 'b', done: false }
console.log(iterator1.next());   //{ value: 'c', done: false }
console.log(iterator1.next());   //{ value: 'd', done: false }
console.log(iterator1.next());   //{ value: 'undefined', done: true } 迭代结束

/* 不同迭代器的实例之间 没有关系 */
let arr2 = ["foo", "baz"]
let iterator2 = arr2[Symbol.iterator]();
let iterator22 = arr2[Symbol.iterator]();
console.log(iterator2 === iterator22);   //false  遍历结果虽然一样 但是两个迭代器独立遍历可迭代对象

/* 迭代期间修改迭代器对象  迭代器反应相应变化 */
let arr3 = ["foo", "baz"]
let iterator3 = arr3[Symbol.iterator]();
console.log(iterator3.next());   //{ value: 'foo', done: false }

arr3.push("bar")
console.log(arr3);   //[ 'foo', 'baz', 'bar' ]
console.log(iterator3.next());   //{ value: 'baz', done: false }
console.log(iterator3.next());   //{ value: 'bar', done: false }
console.log(iterator3.next());   //{ value: undefined, done: true }
//是在迭代期间，可迭代对象修改了，迭代器会有相应的变化，若迭代已经完成，则不会有变化


/* -------------------------------------------------------------------------------------- */
/* 显示迭代器实现和原生迭代器实现 */
/* class Foo {
    [Symbol.iterator] () {   //调用迭代器工厂函数，会返回一个迭代器对象
        return {
            next () {  //
                return {   //迭代器的next()方法，会返回一个iteratorResult对象
                    done: false,
                    value: "foo"
                }
            }


        }
    }
}

let f = new Foo()   //可迭代对象
let ff = f[Symbol.iterator]();//调用迭代器工厂函数，生产迭代器对象
console.log(ff);   //{ next: [Function: next] } */

/* ------------------------------------------------------------------------------ */
/* 自定义迭代器 */
class Counter {
    constructor(limit) {
        this.limit = limit;
    }
    [Symbol.iterator] () {
        let count = 1,
            limit = this.limit
        return {
            next () {
                if (count <= limit) {
                    return {
                        done: false,
                        value: count++
                    }
                } else {
                    return {
                        done: true,
                        value: undefined
                    }
                }

            }
        }

    }
}
let counter = new Counter(3);
for (let i of counter) {
    console.log(i);
}

/* 让迭代器也实现了Iterator接口 */
let me = ["foo", "baz", "bar"];
console.log(me[Symbol.iterator]);
let iter1 = me[Symbol.iterator]()
let iter2 = iter1[Symbol.iterator]()
console.log(iter1 === iter2);   //true

/* 每个迭代器实现了 Iterator 接口，所以可迭代对象和实现Iterator 接口的迭代器相同作用 */
let arrr = [1, 2, 3, 4, 5]
let iterr = arrr[Symbol.iterator]()
for (let i of arrr) {
    console.log(i);
}   //返回  1 2 3 4 5
for (let i of iterr) {
    console.log(i);
}   //返回  1 2 3 4 5


/* ----------------------------------------------------------- */
/* 提前终止迭代器 */
/* 提前终止迭代器
    **for of 循环使用 break throw 等提前退出 */
class Counter1 {
    constructor(limit) {
        this.limit = limit
    }
    [Symbol.iterator] () {
        let count = 1,
            limit = this.limit;
        return {
            next () {
                if (count <= limit) {
                    return {
                        value: count++,
                        done: false
                    }
                } else {
                    return {
                        done: true
                    }
                }
            },
            return () {
                console.log("提前 退出");
                return { done: true };
            }
        }
    }
}

let count1 = new Counter1(6);
for (let i of count1) {
    if (i > 4) {
        break;
    }
    console.log(i);  //1 2 3 4
}

console.log("****************");

let counter2 = new Counter1(5);
try {
    for (let i of counter2) {
        if (i > 2) {
            throw 'err'
        }
        console.log(i);
    }
} catch (e) { }
console.log("****************");
/* 数组的迭代器不会关闭的 */
let arr11 = [1, 2, 3, 4, 5]
let iter11 = arr11[Symbol.iterator]()
for (let i of iter11) {
    console.log(i);  // 1 2 3
    if (i > 2) {
        break;
    }
}

console.log("----");

for (let i of iter11) {   //中断后，又继续迭代
    console.log(i);   //4 5
}
