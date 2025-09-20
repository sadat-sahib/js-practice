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

console.log('Result', result); // [9, 11]
console.log('Nums', nums);     // [1, 2, 3, 4, 5] (unchanged)
