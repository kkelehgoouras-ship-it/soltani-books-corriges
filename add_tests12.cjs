const fs = require('fs');

const code = `
// ── TEST 1 ────────────────────────────────────────────────────────────────────
function TEST1E1() { return (<>
  <Step index={0} title="Question 1 : Limite en -∞"><RB><BM t="\\lim_{x\\to-\\infty} (x^2-x)e^x - 1 = -1" /></RB></Step>
  <Step index={1} title="Question 2 : Dérivée"><RB><BM t="f'(x) = (x^2+x-1)e^x" /></RB></Step>
  <Step index={2} title="Question 3 : Calcul"><RB><BM t="e^{1+2\\ln 2} - e^{1-\\ln 2} = 4e - 0{,}5e = \\frac{7e}{2}" /></RB></Step>
  <Step index={3} title="Question 4 : Intégrale"><RB><BM t="\\int_0^1 2e^{-2x}dx = [-e^{-2x}]_0^1 = 1 - e^{-2}" /></RB></Step>
</>)}

function TEST1E2() { return (<>
  <Step index={0} title="Question 1 : Type de graphe"><RB>Non orienté (Matrice symétrique en corrigeant la ligne 3)</RB></Step>
  <Step index={1} title="Question 2 : Nombre d'arêtes"><RB>5 arêtes (Somme des degrés divisée par 2 = 10/2)</RB></Step>
  <Step index={2} title="Question 3 : Cycle Eulérien"><RB>Non, car 2 sommets sont de degré impair (A et C)</RB></Step>
  <Step index={3} title="Question 4 : Signification de M²"><RB>De longueur 2 (M² donne les chemins de longueur 2)</RB></Step>
</>)}

function TEST1E3() { return (<>
  <Step index={0} title="Question 1 : Intersection"><RB><BM t="p(A \\cap B) = p(A|B)p(B) = 0{,}2 \\times 0{,}4 = 0{,}08" /></RB></Step>
  <Step index={1} title="Question 2 : Union"><RB><BM t="p(A \\cup B) = 0{,}3 + 0{,}4 - 0{,}08 = 0{,}62" /></RB></Step>
  <Step index={2} title="Question 3 : Paramètre p"><RB><BM t="np = 1{,}2 \\implies 3p = 1{,}2 \\implies p = 0{,}4" /></RB></Step>
  <Step index={3} title="Question 4 : Probabilité X=1"><RB><BM t="p(X=1) = C_3^1(0{,}4)^1(0{,}6)^2 = 3 \\times 0{,}4 \\times 0{,}36 = \\frac{54}{125}" /></RB></Step>
</>)}

function TEST1E4() { return (<>
  <Step index={0} title="Question 1 : Équation"><RB><BM t="Y = 3{,}5X + 2{,}3" /></RB></Step>
  <Step index={1} title="Question 2 : Covariance"><RB><BM t="a = \\frac{Cov(X,Y)}{V(X)} = \\frac{4{,}2}{1{,}2} = 3{,}5" /></RB></Step>
  <Step index={2} title="Question 3 : Corrélation"><RB>L'ajustement affine est fort (r très proche de 1)</RB></Step>
  <Step index={3} title="Question 4 : Estimation"><RB><BM t="Y = 3{,}5(5) + 2{,}3 = 19{,}8" /></RB></Step>
</>)}

function TEST1E5() { return (<>
  <Step index={0} title="Question 1 : Premier terme V0"><RB><BM t="V_0 = 2 - 6 = -4" /></RB></Step>
  <Step index={1} title="Question 2 : Raison"><RB><BM t="q = 1/3" /></RB></Step>
  <Step index={2} title="Question 3 : Expression de Vn"><RB><BM t="V_n = -4 \\times (1/3)^n" /></RB></Step>
  <Step index={3} title="Question 4 : Limite"><RB><BM t="\\lim U_n = 6" /></RB></Step>
</>)}

// ── TEST 2 ────────────────────────────────────────────────────────────────────
function TEST2E1() { return (<>
  <Step index={0} title="Question 1 : Limite"><RB><BM t="+\\infty" /></RB></Step>
  <Step index={1} title="Question 2 : Dérivée"><RB><BM t="f'(x) = -\\frac{e^{-x}}{1+e^{-x}}" /></RB></Step>
  <Step index={2} title="Question 3 : Calcul Log"><RB><BM t="4" /></RB></Step>
  <Step index={3} title="Question 4 : Intégrale"><RB><BM t="e+1" /></RB></Step>
</>)}

function TEST2E2() { return (<>
  <Step index={0} title="Question 1 : Tangente"><RB><BM t="g'(-2) = 4" /></RB></Step>
  <Step index={1} title="Question 2 : Branche parabolique"><RB><BM t="+\\infty \\text{ ou } -\\infty" /></RB></Step>
  <Step index={2} title="Question 3 : Asymptote oblique"><RB><BM t="1" /></RB></Step>
  <Step index={3} title="Question 4 : Solutions g(x)=0"><RB>La courbe coupe (Ox) 2 fois</RB></Step>
</>)}

function TEST2E3() { return (<>
  <Step index={0} title="Question 1 : Déterminant"><RB><BM t="1" /></RB></Step>
  <Step index={1} title="Question 2 : Matrice"><RB><BM t="\\begin{pmatrix} 1 & -2 & 1 \\\\ 0 & -1 & 0 \\\\ 2 & -2 & 0 \\end{pmatrix}" /></RB></Step>
  <Step index={2} title="Question 3 : Matrice du système"><RB><BM t="\\begin{pmatrix} 1 & 0 & -1 \\\\ -3 & 4 & -3 \\\\ -1 & 1 & 0 \\end{pmatrix}" /></RB></Step>
  <Step index={3} title="Question 4 : Solutions"><RB>1 solution</RB></Step>
</>)}

function TEST2E4() { return (<>
  <Step index={0} title="Question 1 : Expression Un"><RB><BM t="U_n = \\frac{-2-n}{2}" /></RB></Step>
  <Step index={1} title="Question 2 : Monotonie"><RB>Décroissante (r = -1/2 &lt; 0)</RB></Step>
  <Step index={2} title="Question 3 : Limite Un"><RB><BM t="-\\infty" /></RB></Step>
  <Step index={3} title="Question 4 : Limite exponentielle"><RB><BM t="0" /></RB></Step>
</>)}

function TEST2E5() { return (<>
  <Step index={0} title="Question 1 : B vers A"><RB><BM t="0{,}2" /></RB></Step>
  <Step index={1} title="Question 2 : P1"><RB><BM t="(0{,}6 \\quad 0{,}4)" /></RB></Step>
  <Step index={2} title="Question 3 : État stable"><RB><BM t="a=1/3 \\text{ et } b=2/3" /></RB></Step>
  <Step index={3} title="Question 4 : Somme a+b"><RB><BM t="1" /></RB></Step>
</>)}
`;

let content = fs.readFileSync('src/App.jsx', 'utf-8');
content = content.replace('// ── Tests 1 à 5', code + '\n// ── Tests 1 à 5');

content = content.replace(/'TEST1-E1': \{.*?\}/, "'TEST1-E1': { title:'Fonctions Exponentielles', badge:'Test 1 · Ex.1', C:<TEST1E1/> }");
content = content.replace(/'TEST1-E2': \{.*?\}/, "'TEST1-E2': { title:'Théorie des Graphes et Matrices', badge:'Test 1 · Ex.2', C:<TEST1E2/> }");
content = content.replace(/'TEST1-E3': \{.*?\}/, "'TEST1-E3': { title:'Probabilités et Variables Aléatoires', badge:'Test 1 · Ex.3', C:<TEST1E3/> }");
content = content.replace(/'TEST1-E4': \{.*?\}/, "'TEST1-E4': { title:'Statistiques', badge:'Test 1 · Ex.4', C:<TEST1E4/> }");
content = content.replace(/'TEST1-E5': \{.*?\}/, "'TEST1-E5': { title:'Suites Numériques', badge:'Test 1 · Ex.5', C:<TEST1E5/> }");

content = content.replace(/'TEST2-E1': \{.*?\}/, "'TEST2-E1': { title:'Fonctions Logarithmes', badge:'Test 2 · Ex.1', C:<TEST2E1/> }");
content = content.replace(/'TEST2-E2': \{.*?\}/, "'TEST2-E2': { title:'Analyse et Lecture graphique', badge:'Test 2 · Ex.2', C:<TEST2E2/> }");
content = content.replace(/'TEST2-E3': \{.*?\}/, "'TEST2-E3': { title:'Matrices et Systèmes', badge:'Test 2 · Ex.3', C:<TEST2E3/> }");
content = content.replace(/'TEST2-E4': \{.*?\}/, "'TEST2-E4': { title:'Suites numériques', badge:'Test 2 · Ex.4', C:<TEST2E4/> }");
content = content.replace(/'TEST2-E5': \{.*?\}/, "'TEST2-E5': { title:'Graphes Probabilistes', badge:'Test 2 · Ex.5', C:<TEST2E5/> }");

fs.writeFileSync('src/App.jsx', content, 'utf-8');
console.log('App.jsx updated with TEST 1 and TEST 2');
