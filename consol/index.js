const a = 9007199254740991n;
const b = BigInt(9007199254740991);
const c = 9007199254740992;
const d = BigInt(9007199254740992);

console.log(a === b);
console.log(Number(a) === c);
console.log(c === Number.MAX_SAFE_INTEGER + 1);
console.log(d > a);
console.log(typeof (a + 1n));
console.log(Number(d) === c);