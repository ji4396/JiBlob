# typescript基本知识

## 基础类型

##### 布尔值
```
let isDone:boolean = false
```
##### 数字
```js
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```
##### 字符串
```js
let name:string = "bob";
name = "smith";
```
##### 数组
1. 在元素类型后面接上 []，表示由此类型元素组成的一个数组：
```js
let list: number[] = [1, 2, 3]
```
2. 使用数组泛型，Array<元素类型>：
```js
let list: Array<number> = [1, 2, 3]
```

##### 元组
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
```js
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```
##### 枚举
enum类型是对JavaScript标准数据类型的一个补充。
```js
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

##### Any
在编程阶段还不清楚类型的变量指定一个类型,这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量：
这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量：
```js
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

let list: any[] = [1, true, "free"];
list[1] = 100;
```
##### Void
void类型像是与any类型相反，它表示没有任何类型。
1.  当一个函数没有返回值时，你通常会见到其返回值类型是 void：
2.  只能为它赋予undefined和null
```js
function warnUser(): void {
    console.log("This is my warning message");
}

let unusable: void = undefined;
```
##### Null 和 Undefined
TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大
```js
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

##### Never
never类型表示的是那些永不存在的值的类型。
```js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

##### Object
object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
```js
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

#### 类型断言
通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

类型断言有两种形式。 
1. “尖括号”语法：
2. as语法：
```js
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
```



##  接口
TypeScript的核心原则之一是对值所具有的结构进行类型检查。
在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
```js
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

##### 可选属性
带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。
```js
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

#### 只读属性
```js
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```
::: tip
这是一个提示
:::
```js
TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是
把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改.

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

::: tip
绕开语法检查的一些方法
1. 使用类型断言
2. 添加一个字符串索引签名
3. 将这个对象赋值给一个另一个变量
```js
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
// error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: "red", width: 100 });
//使用类型断言
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
//添加一个字符串索引签名
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
// 将这个对象赋值给一个另一个变量  
//因为 squareOptions不会经过额外属性检查，
//所以编译器不会报错。
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```
:::

#### 函数类型
接口也可以描述函数类型。
```js
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```
```js
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```
* 函数的参数名不需要与接口里定义的名字相匹配
```js
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```
* 如果你不想指定类型，TypeScript的类型系统会推断出参数类型
```js
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

#### 可索引的类型
描述那些能够“通过索引得到”的类型，比如a[10]或ageMap["daniel"]
```js
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```
* 索引签名设置为只读，这样就防止了给索引赋值
```js
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```

#### 继承接口
```js
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```
一个接口可以继承多个接口，创建出多个接口的合成接口。
```js
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

#### 混合类型
一个对象可以同时具有多种类型。
```js
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```





## 泛型

* 不用泛型的例子
```js
function identity(arg: number): number {
    return arg;
}
//或者，我们使用any类型来定义函数：
function identity(arg: any): any {
    return arg;
}
```
* 使用泛型的形式
```js
function identity<T>(arg: T): T {
    return arg;
}
```
* 定义了泛型函数后，可以用两种方法使用 
```js
// 1. 传入所有的参数，包含类型参数
let output = identity<string>("myString");  // type of output will be 'string'
// 2. 利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定的类型：
let output = identity("myString");  // type of output will be 'string'
```
* 注意点：
```js
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
//
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
```





## 枚举

TypeScript支持数字的和基于字符串的枚举。

#### 数字枚举

```js
//Up的值为 0， Down的值为 1等等。
enum Direction {
    Up,
    Down,
    Left,
    Right,
}
```

我们定义了一个数字枚举， Up使用初始化为 1。 其余的成员会从 1开始自动增长。 换句话说， Direction.Up的值为 1， Down为 2， Left为 3， Right为 4
```js
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
```
通过枚举的属性来访问枚举成员，和枚举的名字来访问枚举类型：
```js
enum Response {
    No = 0,
    Yes = 1,
}

function respond(recipient: string, message: Response): void {
    // ...
}

respond("Princess Caroline", Response.Yes)
```
#### 字符串枚举
```js
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```