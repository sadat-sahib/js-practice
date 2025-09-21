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
console.log(cache.size);

// 8. Even after clearing from the cache, the closure still holds a reference
//    to 'user-1' data, so we can still access it
console.log(handler1('get').id); // "user-1"


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
