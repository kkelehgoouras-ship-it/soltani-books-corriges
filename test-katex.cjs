const katex = require('katex');

const stringsToTest = [
  "A = \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}",
  "\\det(A) = -1 \\begin{vmatrix} 1 & 1 \\\\ -1 & 1 \\end{vmatrix} - (-2) \\begin{vmatrix} 1 & 1 \\\\ 2 & 1 \\end{vmatrix} + 1 \\begin{vmatrix} 1 & 1 \\\\ 2 & -1 \\end{vmatrix}",
  "\\det(A) = -1(1 - (-1)) + 2(1 - 2) + 1(-1 - 2)",
  "\\det(A) = -7 \\neq 0",
  "A^3 - A^2 = -7I_3",
  "\\begin{cases} \\ln(a) + 2\\ln(b) - \\ln(c) = -1 \\\\ \\ln(a) + \\ln(b) + \\ln(c) = 2 \\\\ 2\\ln(a) - \\ln(b) + \\ln(c) = -1 \\end{cases}"
];

stringsToTest.forEach(str => {
  try {
    katex.renderToString(str, { throwOnError: true });
    console.log("SUCCESS for:", str);
  } catch (e) {
    console.error("ERROR for:", str);
    console.error(e.message);
  }
});
