const T = JSON.parse(`{"m": "A=\\\\begin{pmatrix}1\\\\\\\\2\\\\end{pmatrix}"}`);
console.log(T.m); // Should be: A=\begin{pmatrix}1\\2\end{pmatrix}

// Simulate what Vite produces for the JSON.parse string in bundle
const raw = '{"matA":"A=\\\\begin{pmatrix}-1&-2&1\\\\\\\\1&1&1\\\\\\\\2&-1&1\\\\end{pmatrix}"}';
console.log("Raw JSON string:", raw);
const parsed = JSON.parse(raw);
console.log("After JSON.parse:", parsed.matA);

// Test with katex
const katex = require('./node_modules/katex/katex.min.cjs');
try {
  katex.renderToString(parsed.matA, { throwOnError: true });
  console.log("KaTeX SUCCESS");
} catch(e) {
  console.log("KaTeX ERROR:", e.message);
}
