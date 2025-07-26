Array.reduce()
As compared to map() which always returns an array, reduce can give us any type
of value transforming any array that is required.

```
const menuItems = [
{ item: "Blue Cheese Salad", price: 8 },
{ item: "Spicy Chicken Rigatoni", price: 18 },
{ item: "Ponzu Glazed Salmon", price: 23 },
{ item: "Philly Cheese Steak", price: 13 },
{ item: "Baked Italian Chicken Sub", price: 12 },
{ item: "Pan Seared Ribeye", price: 31 }
];

`menuItems.reduce(() = {}, 0); // Takes two arguments, a callback (reducer) and
an initial value` The initial value determined by the data type of the result
```

Unlike other array methods which iterate over the array element, in reduce,
before we get each array element in the parameters of the callback, we get a
special value called accumulator and the accumulator is the value which is
returned by the the callback.

```
const total = menuItems.reduce((accumulator, menuItem) => {
  return accumulator + menuItem.price;
}, 0);
```

what's neat about the accumulator is that it can be thought of as a kind of
safe, a kind of storage for whatever value we want to hold in it
`reduce` is going to "remember" the value of accumulator every time the callback
runs for every element. For the accumulator to work and store new values it
has to be returned every time the function runs. Accumulator, for the first time
that this function runs, for the first array element is set to the initial value
that we provided as the second argumet to the reduce function.

```
const greaterNumbers = numbers.reduce(
  (acc, num) => num > 3 ? acc.push(num) : acc,
  []
);
```

Why this doesn't work?
`TypeError: acc.push is not a function`
`acc.push(num)` returns the new length of the array, not the array itself.
So when `num > 3`, you effectively do:
`acc = acc.push(num) // => a number`
In the next iteration, `acc` is now a number, not an array—so `.push` fails.
How to fix it?

```
const greaterNumbers = numbers.reduce((acc, num) => {
  if (num > 3) {
    acc.push(num);
  }
  return acc;
}, []);
```

you can use `.concat()` with the same effect—and it's actually safer than .push()
in reduce, because `.concat()` returns a new array, not a number.

Here's how you'd do it:

```
const greaterNumbers = numbers.reduce(
(acc, num) => num > 3 ? acc.concat(num) : acc,
[]
);
```

✅ Why this works:
`acc.concat(num)` returns a new array with `num` appended (if condition is met).

No mutation involved, so acc remains predictable and safe across iterations.
`.push()` mutates and returns a number → you must manually return acc.

`.concat()` is immutable and returns the updated array → cleaner in functional
code.

`.push()` mutates the array
Mutates means it changes the original array (acc) in place.

Example:

```
const arr = [1, 2];
arr.push(3);
console.log(arr); // [1, 2, 3]   <- same array, now modified
```

It also returns the new length:

```
const len = arr.push(4);
console.log(len); // 4
```

So in reduce, if you do:

```
acc.push(num)
```

acc is still the same array, but the expression returns a number (length).

`.concat()` is immutable
Immutable here means it does not change the original array.

Instead, it creates a new array with the added elements.

Example:

```
const arr = [1, 2];
const newArr = arr.concat(3);
console.log(arr);    // [1, 2]      <- unchanged
console.log(newArr); // [1, 2, 3]   <- new array
```

So in reduce, you can safely do:

```
acc = acc.concat(num);
```

and acc will always be a fresh array without mutating the previous one.

How to avoid array mutations?

```
const lunchMenuIdeas = ['Harvest Salad', 'Southern Fried Chicken'];

const allMenuIdeas = lunchMenuIdeas;

allMenuIdeas.push('Club Sandwich');
```

`.push()` mutates the existing array and doesn't create a new one.
To mutably update the array -> to make the copy of the array and update the
copied array.
`.concat()` is one such method.
Using array spread operator to clone the original array and use that cloned
array to make the changes

```
const allMenuIdeas = [...lunchMenuIdeas];
```

.push() adds items to the end of the array, .unshift() adds them at the
beginning but both the methods mutate the array.

Array spread -> converts an array to a list of elements

.slice() to get a part of the array or subarray -> its immutable / non-mutating
and it returns a brand new array

Example for updating an array element using spread and slice

```
Updating Harvest Salad to Garden salad
const breakfastMenuIdeas = ["Buckwheat Pancakes"];
const dinnerMenuIdeas = ["Glazed Salmon", "Meatloaf", "American Cheeseburger"];

const allMenuIdeas = [
    ...breakfastMenuIdeas,
    "Harvest Salad",
    "Southern Fried Chicken",
    ...dinnerMenuIdeas
];

const saladIndex = allMenuIdeas.findIndex(idea => idea === 'Harvest Salad');

const finalMenuIdeas = [
  ...allMenuIdeas.slice(0, saladIndex),
  "Garden Salad",
  ...allMenuIdeas.slice(saladIndex + 1)
];

Deleting 'Meat loaf'
const meatloafIndex = allMenuIdeas.findIndex(idea => idea === 'Meatloaf');

const finalMenuIdeas = [
  ...allMenuIdeas.slice(0, meatloafIndex),
  ...allMenuIdeas.slice(meatloafIndex + 1)
]
```

Turn objects into arrays
Looping through objects: for ..in loop

Object.keys() -> array of keys
Object.values() -> array of values
Object.entries() -> array of [key, value] pairs

new Set() -> enforces uniqueness of its elements
We can use for..of loop to iterate over a set.

master all these array features:
/\*

- map()
- filter()
- reduce()
- some() / every()
- find() / findIndex()
- forEach()

Plus:

- slice()
- concat()
- includes()
- array spread operator
  \*/

constructor function represents the data, the object it makes, not the
specific operation like the every other function.

```
function Student(id, name, subjects = []) {
  this.id = id;
  this.name = name;
  this.subjects = subjects;
}

Student.prototype.addSubject = function(subject) {
  this.subjects = [...this.subjects, subject];
}

const student1 = new Student(1, 'Reed');
const student2 = new Student(2, 'Doug');

student1.addSubject('Math');
student2.addSubject('Physics');
console.log(student2.subjects);
```

```
function Book(id, title, author, themes = []) {
	// your code here
	this.id = id;
	this.title = title;
	this.author = author;
	this.themes = themes;
}

Book.prototype.addTheme = function (theme) {
	this.themes = [...this.themes, theme];
}

const book1 = new Book(1, "1984", "George Orwell");
const book2 = new Book(2, "The Hobbit", "J.R.R. Tolkien");

// Add themes
book1.addTheme("Dystopian");
book2.addTheme("Fantasy");

// Log
console.log(book1);
console.log(book2);
```

Every JavaScript function (constructor or not) has a .prototype property.

When you create an object via new, that object’s internal [[Prototype]]
(sometimes called **proto**) is set to the constructor’s .prototype.

This creates a prototype chain:

If you try to access a property or method on the object, and it’s not found,
JavaScript automatically looks in its prototype.

```
function Book(title) {
  this.title = title;
}

// Add a method to the prototype
Book.prototype.describe = function() {
  console.log(`Book: ${this.title}`);
};

const b = new Book("1984");
b.describe(); // Book: 1984
```

How this works:

`new Book("1984")` creates an object `b`.

`b.title` is set directly.

When you call `b.describe()`, JavaScript:

Looks for describe on `b` itself: not found.

Looks in `Book.prototype`: found.

Calls it with `this = b`.

Prototype chain visual:

```
b --> Book.prototype --> Object.prototype --> null
```

Each --> means “if property is not here, look there.”

If you set something on Book.prototype, all instances share it:

```
Book.prototype.sharedArray = [];
const b1 = new Book("Book 1");
const b2 = new Book("Book 2");

b1.sharedArray.push("A");
console.log(b2.sharedArray); // ["A"]  ⚠️ shared across instances!
```

That’s why you should initialize arrays inside the constructor
(this.themes = []), not on the prototype.

Prototype is great for:

Methods you want to share (so there’s only one copy in memory).
Properties that are constant or shared intentionally.

Prototypical Inheritance
Each of the created object from constructor function inherits from its
constructor's prototype that is each instantiated object (from constructor
function) inherits from prototype
Every object has this prototype property.

to look at one object's prototype:
`Object.getPrototypeOf({}).constructor // what the constructor function was of
{} -> Object()`

Whether an object is made by the original constructor function Object() or our
own custom constructor function, it'll point to that constructor through this
prototypical inheritance since objects at their core are reference types and
therfore they refer to their constructor function's prototype and can access
any of its methods.

```
console.log(student1.__proto__.__proto__ === Object.prototype); -> true
```

student1 was created with a constructor function, e.g.,

```
function Student() { ... }
const student1 = new Student();
```

When you do new Student(), JavaScript sets:

```
student1.__proto__ === Student.prototype
```

But Student.prototype itself is just a plain object (created by default as {}),
so its own prototype is:

```
Student.prototype.__proto__ === Object.prototype
```

Therefore:

```
student1.__proto__.__proto__ === Object.prototype
```

is true.
`student1.__proto__` is the prototype object that comes from the Student
constructor (Student.prototype). That prototype object is itself a regular
JavaScript object, so its prototype is Object.prototype.
This is why `student1.__proto__.__proto__ === Object.prototype`
evaluates to true.

student1
⬇︎ **proto**
Student.prototype
⬇︎ **proto**
Object.prototype
⬇︎ **proto**
null

This is the standard prototype chain for any object created via a constructor
function.

```
console.log(typeof class Student {});
 function
```

Classes -> to create objects with shared behaviour or methods
In any class, there are no commas after its methods, class methods arn't
properties unlike object methods
Everything in javascript classes is public

Every function in JS has a .prototype property (used for `new`).

Every object (except the one created by `Object.create(null)`) has an internal
[[Prototype]] (accessible as `__proto__`) pointing to its prototype.

The chain always ends at `Object.prototype`, which itself has `null` as its
prototype.

```
class Product {
  constructor(name, price, discountable) {
    this.name = name;
    this.price = price;
    this.discountable = discountable;
  }
}

class SaleProduct extends Product {
  constructor(percentOff) {
     this.percentOff = percentOff;
  }
}

const product1 = new SaleProduct("Coffee Maker", 99, true, 20);
```

`Must call super constructor in derived class before accessing 'this' or
returning from derived constructor`
The derived class is saleProduct class
Currently we're trying to extend product (parent) class but we're not telling
it to do so.
`super()` is a function that's used in the constructor of the derived calls
that calls the constructor method of the class that is being extended.

```
class SaleProduct extends Product {
  constructor(name, price, discountable, percentOff) {
     super(name, price, discountable);
     this.percentOff = percentOff;
  }
}
```

```
class Product {
  constructor(name, price, discountable) {
    this.name = name;
    this.price = price;
    this.discountable = discountable;
  }

  isDiscountable() {
    return this.discountable;
  }
}

class SaleProduct extends Product {
  constructor(name, price, discountable, percentOff) {
     super(name, price, discountable);
     this.percentOff = percentOff;
  }

  getSalePrice() {
     if (super.isDiscountable()) {
       return this.price * ((100 - this.percentOff) / 100);
     } else {
        return `${this.name} is not eligible for a discount`;
     }
  }
}

const saleProduct1 = new SaleProduct("Coffee Maker", 99, true, 20);
console.log(saleProduct1.getSalePrice())
```

Functions create their own context, which can change what 'this' refers to.
Classes are merely functions and also include functions in the form of methods

Arrow functions don't create a new 'this' binding. Instead they refer to the
'this' binding one level/context above.

We can use `bind()` to explicitly binding functions to appropriate context
TODO: study bind();
TOOD: Study class field proposal and private fields

`querySelectorAll` returns a nodeList and this can be looped over
using `forEach()` whereas `querySelector` returns a single element, the first
element that is found.

`matches` -> `link.matches('a[href="/login"]')` return `true/false`

```
const links = document.querySelectorAll('a');

links.forEach(link => {
  if (link.matches('a[href="/login"]')) {

  }
})
```

To create element through javaScript -> `document.createElement`

```
const newPost = document.createElement('div');
newPost.className = 'top-post';
newPost.innerHTML = "<strong>This is a new post</strong>"

const post = document.querySelector('.post');

post.prepend(newPost);
```

Add or remove a class -> use classList

```
const post = document.querySelector(".post");
// post.style.margin = '30px';  // Css props to be in camelCase and values to be
strings
post.classList.remove('post');
```

`addEventListener` takes two arguments -> a string event (the event that we're
going to listen for) and a callback function that determines what should happen
when that event takes place.

When you see:

```
Promise {<fulfilled>: 'done'}
```

and you expand it in DevTools, you see:

```
[[Prototype]]: Promise
```

✅ **What does `[[Prototype]]` mean?**

This `[[Prototype]]` is an **internal slot** (not directly accessible via dot
notation) that points to the prototype object from which the Promise instance
inherits methods.

In this case:

- Every `Promise` you create is an instance of the `Promise` constructor.
- The `[[Prototype]]` is effectively the same as `Promise.prototype`.

This is why you can do things like:

```
const p = Promise.resolve('done');
p.then(value => console.log(value)); // 'done'
```

Here:

- `then` is defined on `Promise.prototype`.
- `p`’s `[[Prototype]]` chain links it to `Promise.prototype`.

✅ **How this fits in the prototype chain:**

Conceptually:

```
p --> Promise.prototype --> Object.prototype --> null
```

- `p` is your Promise object.
- `Promise.prototype` has `.then()`, `.catch()`, `.finally()`.
- `Object.prototype` has methods like `.toString()`, `.hasOwnProperty()`.

So, in summary:
**`[[Prototype]]: Promise` means this Promise object inherits all the methods
from `Promise.prototype`.**

-> Simplest way to show a promise failure:

```
async function runAsync() {
  await Promise.reject();
}
```
### Module
A module is just a file. One Script is one module.
Using modules, created values aren't put on the global object. In fact, modules are automatically put on in 'strict mode'.

The reason console.log(this) gives undefined in a JavaScript module but not in a regular (non-module) script comes down to how this behaves in different execution contexts.

🧾 In short:
Environment	        ->              `this` in top-level
Script (non-module)	    ->          `window` (in browser)
Module (`type="module"`)	  ->        `undefined` (in strict mode)

📌 Why `this` is `undefined` in a module:
Modules are always in strict mode:

Top-level `this` is `undefined` in strict mode.

Even if you don’t write "use strict", ES modules behave as if you did.

In regular scripts, top-level `this` refers to the global object (`window` in browsers, `global` in Node).

✅ Examples
📦 Module (e.g. `<script type="module">`)
```
console.log(this); // undefined
```
📄 Regular script (e.g. `<script>`)
```
console.log(this); // window (in browser)
```
🧠 Takeaway:
If you're writing ES modules, avoid relying on this at the top level.

Use `globalThis` instead if you need the global object (works in all environments):
```
console.log(globalThis); // works in both modules and non-modules
```
### `this` keyword
`this` is a reference to an object.
It's value is implicitly set according to how a function is called. e.g. as an arrow function or a function declaration, as a normal function
or as a method, as a function constructor or as a class or within a callback function

One key reason why `this` in JavaScript is dynamic (i.e., determined by how a function is called) is to ensure that when methods are accessed via the prototype chain, they still operate with the correct `this` context.

This dynamic behavior is essential for prototypal inheritance. It allows both constructor functions and classes to behave correctly, maintaining the right `this` value when an object inherits methods from its prototype.

```
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound`);
};

const dog = new Animal('Buddy');
dog.speak(); // "Buddy makes a sound"

// Even though speak is defined on Animal.prototype, calling it on dog correctly sets this to dog.

// This is possible because this is resolved at call time, not at definition time.

```
4 Rules to 'this'. How is it called?

1) in the global context (global object, undefined in strict mode)
2) as a method on an object (object on left side of dot when the method's called)
3) as a constructor function or class constructor (the instance itself with new)
4) as a DOM event handler (the element itself)

1 -> if you're with javaScript on the client, `this` is going to be the window object. However, functions have their own context as well
for function declarations, `this` still refers to the global object -> the window in normal mode
Why is this an improvement for `this` to be `undefined` when working with functions instead of the global object window?
if `this` refers to the global object that is window, its very easy to add values on to it by directly mutating the object. We never want data
that's scoped to a function to be able to leak out into the outer scope. That contradicts the purpose of having data scoped to a function
all together.

2 -> as a method on an object, the method uses `this` to refer to the properties of the object. For any method `this` refers to the object
that its on.

3 -> `new` keyword creates an instance of a class or a constructor function. When a class is instantiated with `new`, the `this` keyword is
bound to that instance.

4 -> In an event handler called by `addEventListener()` `this` is going to refer to `event.target`

Whatever is passed to `call()` or `apply()` is what the `this` context is going to be set to for a given function.
```
function whatIsThis() {
  console.log(this);
}

console.log(whatIsThis.apply({ first: "Reed" })); // { first: "Reed" }
```
`call()` takes separate arguments whereas `apply()` takes any further arguments as an array.

In JavaScript, `call`, `apply`, and `bind` are methods available on functions. They let you explicitly set the value of `this` when invoking or preparing to invoke a function.

#### `call`
Invokes the function immediately, allowing you to pass `this` and arguments one by one.
```
function greet(greeting: string) {
  console.log(`${greeting}, ${this.name}`);
}

const person = { name: 'Alice' };
greet.call(person, 'Hello'); // Hello, Alice
```
#### `apply`
Also invokes the function immediately, but you pass arguments as an array.
```
greet.apply(person, ['Hi']); // Hi, Alice
```

sometimes we might need to use a method over and over with the `this` context of another object and in that case we need to use
another function named `bind()`

#### `bind`
Does not invoke the function immediately. It returns a new function with `this` permanently bound.

what `bind` does is it gives us a brand new function with an explicitly bound `this. So this always going to be bound to the context that
is provided to it.
```
const greetAlice = greet.bind(person);
greetAlice('Hey'); // Hey, Alice
```
Arrow functions don't have their own `this` binding. Instead, they go up the next execution context.

### State and Reducer
State is simply the data that has to be managed in our application. State is important because it tell us the status of the application.

A Reducer is a function that takes two arguments -> state and action and return -> based on both of these arguments -> a new state
`const reducer = (state, action) => newState`

Reducers are special because they're predictable. In fact, they're what's known as pure functions. Pure function is a concept from
functional programming which means that given a certain input to the function, the function's always going to give us the same output.

Imperative code -> code for computer
Declarative code -> code for computer
