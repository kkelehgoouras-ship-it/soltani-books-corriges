import json

X = [0.30, 0.35, 0.45, 0.65, 0.80, 1.00]
Y = [6.25, 4.90, 3.75, 2.75, 2.40, 2.25]
Z = [1.25, 1.30, 1.30, 1.50, 1.55, 1.60]

def mean(L): return sum(L)/len(L)
def cov(L1, L2): return mean([L1[i]*L2[i] for i in range(len(L1))]) - mean(L1)*mean(L2)
def var(L): return cov(L, L)

mx = mean(X)
my = mean(Y)
mz = mean(Z)

cov_xy = cov(X, Y)
cov_xz = cov(X, Z)
var_x = var(X)
var_y = var(Y)
var_z = var(Z)

r1 = cov_xy / ((var_x * var_y)**0.5)
a1 = cov_xy / var_x
b1 = my - a1 * mx

r2 = cov_xz / ((var_x * var_z)**0.5)
a2 = cov_xz / var_x
b2 = mz - a2 * mx

print(f"Y on X: r1={r1:.3f}, a1={a1:.3f}, b1={b1:.3f}")
print(f"Z on X: r2={r2:.3f}, a2={a2:.3f}, b2={b2:.3f}")

# Equilibrium
# Z = 0.53*X + 1.1 (given in text!)
# Y = a1*X + b1
# a1*X + b1 = 0.53*X + 1.1
# X = (1.1 - b1) / (a1 - 0.53)
eq_x = (1.1 - b1) / (a1 - 0.53)
print(f"Equilibrium X = {eq_x:.3f}")
