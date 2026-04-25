const T = require('./src/formulas.json');
const katex = require('./node_modules/katex');
const keys = Object.keys(T);
keys.forEach(k => {
  if (typeof T[k] !== 'string') { console.log('NOT STRING:', k, typeof T[k]); return; }
  try { katex.renderToString(T[k], {throwOnError: true}); console.log('OK:', k); }
  catch(e) { console.log('ERR:', k, '->', e.message.slice(0,80)); }
});
