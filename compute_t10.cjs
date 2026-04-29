const X = [1, 2, 3, 4, 5, 6];
const Y = [45.13, 53.46, 66.15, 78.72, 80.83, 86.67];

const n = X.length;
const sumX = X.reduce((a,b)=>a+b,0);
const sumY = Y.reduce((a,b)=>a+b,0);
const sumX2 = X.reduce((a,b)=>a+b*b,0);
const sumXY = X.reduce((a,v,i)=>a+v*Y[i],0);

const xBar = sumX/n;
const yBar = sumY/n;

const covXY = sumXY/n - xBar*yBar;
const varX = sumX2/n - xBar*xBar;

const a = covXY / varX;
const b = yBar - a * xBar;

// Correlation
const sumY2 = Y.reduce((a,v)=>a+v*v,0);
const varY = sumY2/n - yBar*yBar;
const r = covXY / Math.sqrt(varX * varY);

console.log(`a = ${a}`);
console.log(`b = ${b}`);
console.log(`r = ${r}`);

const y2022_affine = a * 8 + b;
const y2022_exp = 41.68 * Math.exp(0.13 * 8);

console.log(`y2022_affine = ${y2022_affine}`);
console.log(`y2022_exp = ${y2022_exp}`);
