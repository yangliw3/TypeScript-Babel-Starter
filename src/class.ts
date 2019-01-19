/**
 * class
 *  property 
 *  constructor and method
 *  extend
 *  
 * 
 * 
 *  类型校验
 *  函数默认值
 */



class Animal {
    /**
     * static
     */
    private static counter: number = 0
    public static get counterComputed(): number {
        return Animal.counter
    }

/**
 * normal properties and methods
 */
    name: string
    color: string

    constructor(name: string, color: string) {
        this.name = name
        this.color = color
        Animal.counter++;
    };

    public move(distance: number = 5): void { 
        console.log(`${this.color} 's ${this.name} is moved ${distance}m `)
    }

    
}


class Dog extends Animal {
    gender: string;

    constructor(name: string, color: string, gender: string) {
        super(name, color);
        this.gender = gender;
    }

    /**
     * 覆盖方法
     */
    public move(distance: number = 10) {
        console.log('pa ya pa ... ...');
        super.move();
        
    }
}


let a: Animal = new Animal('yangli', 'black');
let dog: Dog = new Dog('cooky', 'white', 'male');


a.move();
dog.move();
console.log(`couter: ${Animal.counterComputed}`);

let num: number = 1;
let str: string = '1';
let logic: boolean = true;
let numberArray: number[] = [1,2,3]
let tuple:[string, number, boolean] = ['1', 2, true]; // tuple
let union: (string | number)[]  = [1, '2', 'lesten to mum'];  // unionArray

enum Color {Red = 1, Green = 3, Blue = 5};   // enum
let color: Color = Color.Red;
console.log(`color: ${color}`)

let anyType: any = '1';
// anyType.fix();  // 因为是any， 所以可以随便调用，比Object更加宽泛


let voidVar: void = undefined; //
let undefinedVar: undefined = undefined;
let nullVar: null = null;

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}


// 类型断言
let anyValue: any = 'this is string.';
let anyValueLen: number = (anyValue as string).length
let anyValueLen2: number = (<string>anyValue).length

console.log(anyValueLen2, anyValueLen)


let a1: number = 10;

function showa1(): void{
    console.log(a1)
}

showa1();



// 函数结构

function showMsg([num1, num2]: number[] = [11,22]){
    console.log(num1)
    console.log(num2)
}


showMsg();  // 11 22
showMsg([1, 2]);  // 1 2


interface SquareConfig {
    width: number;
    color?: string;
}

interface point {
    readonly x: number;
    readonly y: number;
    [propName: string]: any;  // 允许point 有多余的属性
}

class Square{
    area: number;
    width: number;
    color: string;


    constructor({width, color="red"}: SquareConfig = {width:10, color:'red'}){
        this.area = width * width;
        this.width = width;
        this.color = color;
    }
}

new Square({width: 100})
let point: point = {x: 1, y:1, z: 1}
// point.x = 2;  // [ts] Cannot assign to 'x' because it is a read-only property. [2540]











