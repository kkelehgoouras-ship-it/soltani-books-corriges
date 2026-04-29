const X = [0.30, 0.35, 0.45, 0.65, 0.80, 1.00];
const Y = [6.25, 4.90, 3.75, 2.75, 2.40, 2.25];
const Z = [1.25, 1.30, 1.30, 1.50, 1.55, 1.60];

const mean = L => L.reduce((a,b)=>a+b)/L.length;
const cov = (L1, L2) => mean(L1.map((v,i)=>v*L2[i])) - mean(L1)*mean(L2);
const varP = L => cov(L, L);

const mx = mean(X), my = mean(Y), mz = mean(Z);
const cov_xy = cov(X, Y), cov_xz = cov(X, Z);
const var_x = varP(X), var_y = varP(Y), var_z = varP(Z);

const r1 = cov_xy / Math.sqrt(var_x * var_y);
const a1 = cov_xy / var_x;
const b1 = my - a1 * mx;

const r2 = cov_xz / Math.sqrt(var_x * var_z);
const a2 = cov_xz / var_x;
const b2 = mz - a2 * mx;

console.log(`Y on X: r1=${r1.toFixed(3)}, a1=${a1.toFixed(3)}, b1=${b1.toFixed(3)}`);
console.log(`Z on X: r2=${r2.toFixed(3)}, a2=${a2.toFixed(3)}, b2=${b2.toFixed(3)}`);

const eq_x = (1.1 - b1) / (a1 - 0.53);
console.log(`Equilibrium X = ${eq_x.toFixed(3)}`);
