// 1. 전역 스코프와 함수 스코프에 대한 이해
var x = 10; // 전역 스코프

function example() {
    console.log(x); // x 가 실행 아래 20으로 선언된 부분이 호이스팅으로 함수 최상단으로 이동
    var x = 20;     // 함수 내에서 새로운 x를 선언하고 20으로 설정 
    console.log(x); // x 를 다시 출력
}

example();

/* 첫번째 consol.log(x)는 함수 내의 `x`가 초기화 되지 않았기 때문에 => `undefined`출력
    두번째 consol.log(x)는 `var x = 20;` 실행된 이후이기 때문에 20으로 초기화되어서 `20`출력 */

// 2. IIFE(즉시 실행 함수) 동작 이해
(function() {
    var a = 5;
    console.log(a); // 5 (함수 스코프 : 함수의 스코프 내에서만 유효)
})();

console.log(a); // ReferenceError

/* 즉시실행함수로, 함수가 정의되자마자 실행되기 때문에 `var a = 5;`로 `a` 를 선언하고 초기화 됨.
    함수 내의 `a`는 함수 스코프에 속하므로, 외부 console.log(a);가 참조 할수 없어서 `ReferenceError`출력
*/

// 3.this 바인딩 규칙1: 전역 컨테스트
function showThis() {
    console.log(this);
}

showThis(); // 브라우저 기준 `window`객체 출력

// 4. this 바인딩 규칙2: 메서드 호출
const car = {
    brand: 'Toyota',
    displayBrand() {
        console.log(this.brand);    // Toyota
    }
};

car.displayBrand();

// `this` 는 `car`객체를 가리킴

// 5. call() 을 사용한 명시적 바인딩
const person = { name: 'Gyejin'};

function sayHello(){
    console.log(`Hello, ${this.name}`); // Hello, Gyejin
}

sayHello.call(person);  // `sayHello`함수의 `this`를 `person`객체로 설정 -> `this.name`은 `person`객체의 `name`속성을 참조하게 됨

// 6. bind() 메서드를 활용한 바인딩
function greet() {
    console.log(`Hello, ${this.name}`); 
}

const person2 = { name: 'Gyejin' };
const boundGreet = greet.bind(person2); //greet함수를 person2애 바인딩

boundGreet();   // Hello, Gyejin

// 7. 프로토타입 상속
function Animal(type) {
    this.type = type;
}

Animal.prototype.speak = function() {
    console.log(`${this.type} makes a sound.`); 
};

const dog = new Animal('Dog');

dog.speak();    //Dog makes a sound.

// `speak()`메서드는 `dog`객체에서 호출

// 8. 콜 스택과 비동기 함수의 순서
console.log('Start');   // 출력순서: 1

setTimeout(() => {
    console.log('Timeout'); // 출력순서: 3
}, 1000);

console.log('End'); // 출력순서: 2

/* `console.log('start')`와`console.log('End')`는 동기적으로 실행되어 즉시 출력
    `setTimeout`의 콜백 함수는 비동기적으로 실행되고, 1초 후 출력됨.*/

// 9. 마이크로태스크 큐와 태스크 큐의 차이
console.log('Start');   // 출력순서: 1

setTimeout(() => {
    console.log('Timeout');     // 출력순서: 4
}, 0);

Promise.resolve().then(() => {
    console.log('Promise');     // 출력순서: 3
});

console.log('End');     // 출력순서: 2

// 마이크로 테스크 큐에서 처리되는 Promise(비동기작업)가 먼저 출력되고, 태스크 큐에서 처리되는 setTimeout은 마이크로 태스크가 모두 처리된 후에 실행됨

// 10. Strict 모드에서의 오류 탐지
"use strict";

x = 5;

console.log(x);
// 엄격모드에서는 변수를 선언하지 않고 사용하려고 하면 오류가 발생함.

// 11. 클로저를 이용한 상태 유지
function createCounter() {
    let count = 0;  // count변수를 선언하고 초기화

    return function() { // 내부함수(클로저)반환
        count++;    // count 변수 증가
        console.log(count); // 증가된 count값을 출력
    };
}

const counter = createCounter();    // createCounter함수를 호출하여 클로저 생성

counter();  // 첫번째 호출 : 1
counter();  // 두번째 호출 : 2

// 12. 화살표 함수에서의 this 바인딩
const person3 = {
    name: 'Gyejin',
    greet: () => {
        console.log(this.name);
    }
};

person.greet();
/* 화살표 함수는 자신의 `this`를 가지지 않고 상위 스코프의 `this`사용.
`person3.greet()`호출 시 `this`는 전역 객체를 가리키는데, 전역 객체에 `name`속성이 없기 때문에 `undefined`가 출력됨*/

// 13. setTimeout과 this 바인딩 문제 해결
const user = {
    name: 'Gyejin',
    greet(){
        setTimeout(function() {
            console.log(this.name);
        }, 1000);
    }
};

user.greet();
/* `setTimeout`의 콜백 함수가 일반 함수로 정의되어 있어 `this`가 전역 객체를 가리키기 때문에 `undefined`출력 
    이를 해결하기 위해서는 화살표 함수를 사용하거나 `bind`메서드를 사용하거나 `this`를 변수에 저장하여 사용하는 방법이 있음*/

// 14. Promise의 기본 이해
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 1000);
});

promise.then((result) => {
    console.log(result);    // Success
});
//`promise`객체가 생성되고, 1초 뒤에 `resolve`가 호추되어 상태가 변경, `then`메서드에 등록된 콜백 함수 실행되어 `success`가 출력

// 15. 