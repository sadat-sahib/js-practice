// Factory function that creates a logger function.
// Takes a `prefix` (like "INFO" or "ERROR") and returns a new function
// that formats messages with that prefix.
const createLogger = (prefix) => (message) => `${prefix}: ${message}`;

// Factory function that creates a counter function using closure.
// The internal variable `count` is private and only accessible through the returned function.
// Every time the function is called, it increments and returns the counter.
const createCounter = () => {
  let count = 0;            // private state, hidden from outside
  return () => ++count;     // increment and return updated count
};

// Higher-order function that takes another function `fn`
// and returns a wrapped version of it. The wrapper logs
// both the arguments passed to `fn` and the result it returns.
const withLogging = (fn) => (...args) => {
  const result = fn(...args);
  console.log(`Called with: ${args}, Result: ${result}`);
  return result;
};

// Create a counter instance (with its own private `count` state).
const counter = createCounter();

// Wrap the counter with logging so every call will log its input and result.
const loggedCounter = withLogging(counter);

// Create a logger with the prefix "INFO".
const logger = createLogger('INFO');

// First call: increments counter to 1, logs the call, and prints "1".
// console.log(loggedCounter());

// Second call: increments counter to 2, logs the call, then passes the result (2)
// into the logger, which prefixes it with "INFO: " before printing.
// console.log(logger(loggedCounter()));

// ----------------------------$$$$$$$$$$$----------------------------
const target = { name: 'Sarah', age: 25 };
const handler = {
  get(obj, prop) {
    if (prop === 'toString') {
      return () => `Person: ${obj.name}`;
    }
    return Reflect.get(obj, prop);
  },
  has(obj, prop) {
    return prop !== 'age' && Reflect.has(obj, prop);
  }
};
const proxy = new Proxy(target, handler);
console.log(proxy.name);
console.log('age' in proxy);
console.log(proxy.toString());