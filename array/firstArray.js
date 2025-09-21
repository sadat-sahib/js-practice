const nums = [1, 2, 3, 4, 5];

const result = nums
  // 1. Keep only numbers greater than 2 → [3, 4, 5]
  .filter(n => n > 2)

  // 2. Multiply each number by 2 → [6, 8, 10]
  .map(n => n * 2)

  // 3. Add 1 to each number and collect them into a new array → [7, 9, 11]
  .reduce((acc, n) => {
    acc.push(n + 1);
    return acc;
  }, [])

  // 4. Remove the first element → [9, 11]
  .slice(1);

// console.log('Result', result); // [9, 11]
// console.log('Nums', nums);     // [1, 2, 3, 4, 5] (unchanged)

//-------------------------------------------------------------


// 1. Create a Map to store cached user data
const cache = new Map();

function createHandler(id) {
  // 2. Build a data object with `id` and an array of 1000 elements filled with that id
  const data = { id, value: new Array(1000).fill(id) };

  // 3. Save this data object in the cache using `id` as the key
  cache.set(id, data);
  
  // 4. Return a closure that can handle two types of actions for this specific id
  return function(action) {
    // If action is "get", return the data object
    if (action === 'get') return data;

    // If action is "clear", remove the entry from the cache
    if (action === 'clear') cache.delete(id);
  };
}

// 5. Create two handlers, each associated with a different user
const handler1 = createHandler('user-1');
const handler2 = createHandler('user-2');

// 6. Clear the data for 'user-1' from the cache
handler1('clear');

// 7. Log the number of entries still in the cache (only 'user-2' remains → size = 1)
// console.log(cache.size);

// 8. Even after clearing from the cache, the closure still holds a reference
//    to 'user-1' data, so we can still access it
// console.log(handler1('get').id); // "user-1"


// ------------------------------------------------
// 💡 About JavaScript Map:
//
// A Map is a collection of key-value pairs where keys can be any type.
// Common methods and properties:
//   - set(key, value): Add/Update a value by key
//   - get(key): Retrieve a value by key
//   - has(key): Check if a key exists
//   - delete(key): Remove an entry by key
//   - clear(): Remove all entries
//   - size: Number of entries in the Map
//
// Example:
//   const map = new Map();
//   map.set('name', 'Nawid');
//   console.log(map.get('name')); // "Nawid"
//   console.log(map.size);        // 1
//   map.delete('name');
//   console.log(map.has('name')); // false




//-------------------------------------------------------------

// 1. Create a Map to store loaded modules by name
const moduleCache = new Map();

async function loadModule(name) {
  // 2. If the module is already cached, return it immediately
  if (moduleCache.has(name)) {
    return moduleCache.get(name);
  }
  
  // 3. Otherwise, simulate loading the module asynchronously
  //    (like fetching from a server or using dynamic import)
  const module = await Promise.resolve({
    default: () => `Module ${name} loaded`,
    version: '1.0.0'
  });
  
  // 4. Store the loaded module in the cache for future calls
  moduleCache.set(name, module);

  // 5. Return the newly loaded module
  return module;
}

// 6. Create an array to collect the results
const results = [];

// 7. Load "auth" module for the first time → caches it and pushes its default message
loadModule('auth').then(m => results.push(m.default()));

// 8. Load "auth" again → this time comes directly from cache and pushes its version
loadModule('auth').then(m => results.push(m.version));

// 9. Load "utils" module → caches it and pushes its default message
loadModule('utils').then(m => results.push(m.default()));

// 10. After promises resolve, log the results array
//     Expected output: "Module auth loaded, 1.0.0, Module utils loaded"
setTimeout(() => console.log(results.join(', ')), 0);
