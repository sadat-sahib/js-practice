const obj = {
  name: 'Sarah',

  // In this case, regularMethod is a normal function,
  // so when it's called as obj.regularMethod(),
  // 'this' correctly refers to 'obj'.
  // The arrow function returned here "closes over" that 'this',
  // so it keeps referring to obj.name.
  regularMethod: function() {
    return () => {
      console.log(this.name);
    };
  },

  // In this case, arrowMethod itself is defined as an arrow function.
  // Arrow functions do NOT bind their own 'this';
  // instead, they use 'this' from the surrounding scope
  // (NOT from obj). So here 'this' does not refer to 'obj'.
  // The returned arrow function also inherits that same outer 'this'.
  arrowMethod: () => {
    return () => {
      console.log(this.name);
    };
  }
};

const regular = obj.regularMethod(); // returns arrow fn bound to obj
const arrow = obj.arrowMethod();     // returns arrow fn bound to outer scope
// regular(); // logs "Sarah"
// arrow();   // logs undefined
// -------------------------------#######------------------------


const original = {
  name: 'Emma',
  skills: ['JavaScript', 'Python'],
  config: { theme: 'dark', notifications: true }
};

// Spread operator (...) makes a shallow copy.
// Primitives are copied, but nested objects/arrays keep references.
const copy1 = { ...original };

// JSON.stringify + JSON.parse makes a deep copy.
// It converts the object to a JSON string and then back to a new object.
// This breaks references, but it can lose special types (Date, Map, etc.).
const copy2 = JSON.parse(JSON.stringify(original));

// Object.assign also makes a shallow copy.
// Same behavior as spread, older syntax.
const copy3 = Object.assign({}, original);

// Change primitive property (only affects copy1, not original)
copy1.name = 'Sarah';

// Modify array inside copy1 (affects original too, since it's shallow copy)
copy1.skills.push('React');

// Modify nested object property in copy1 (affects original too)
copy1.config.theme = 'light';

// original.name not affected (still "Emma")
// console.log(original.name);

// original.skills is affected (length now 3, because "React" was pushed)
// console.log(original.skills.length);

// original.config is affected (theme now "light")
// console.log(original.config.theme);




// -------------------------------#######------------------------

class EventManager {
  constructor() {
    this.listeners = new Map();
  }
  
  addListener(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
  }
}

const manager = new EventManager();
//here if we declare the obj const it will give the type error
// if we put this class inside another scope it will not give the scope error on let variable 
// let obj = { name: 'Component' };
// manager.addListener('click', () => console.log(obj.name));
// obj = null;
// console.log(manager.listeners.get('click').size);