const T = require('./src/formulas.json');
const katex = require('./node_modules/katex');
const keys = ['matA','detL','detC','A2P','A2R1','A2R','ABP','ABR1','ABR','Xc1','AiFr','AiR','Xc','XR','lnSys','lnF'];
keys.forEach(k => {
  try { katex.renderToString(T[k], {throwOnError: true}); console.log('OK:', k); }
  catch(e) { console.log('ERR:', k, '->', e.message.slice(0,80)); }
});
