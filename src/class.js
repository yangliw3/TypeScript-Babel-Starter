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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name, color) {
        this.name = name;
        this.color = color;
        Animal.counter++;
    }
    Object.defineProperty(Animal, "counterComputed", {
        get: function () {
            return Animal.counter;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Animal.prototype.move = function (distance) {
        if (distance === void 0) { distance = 5; }
        console.log(this.color + " 's " + this.name + " is moved " + distance + "m ");
    };
    /**
     * static
     */
    Animal.counter = 0;
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name, color, gender) {
        var _this = _super.call(this, name, color) || this;
        _this.gender = gender;
        return _this;
    }
    /**
     * 覆盖方法
     */
    Dog.prototype.move = function (distance) {
        if (distance === void 0) { distance = 10; }
        console.log('pa ya pa ... ...');
        _super.prototype.move.call(this);
    };
    return Dog;
}(Animal));
var a = new Animal('yangli', 'black');
var dog = new Dog('cooky', 'white', 'male');
a.move();
dog.move();
console.log("couter: " + Animal.counterComputed);
