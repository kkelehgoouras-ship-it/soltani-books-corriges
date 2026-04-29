const f = x => (x + 1 - Math.log(x))/x;
console.log(`f(1.36) = ${f(1.36)}`);
console.log(`f(1.37) = ${f(1.37)}`);
console.log(`f(e^2) = ${f(Math.exp(2))}`);
