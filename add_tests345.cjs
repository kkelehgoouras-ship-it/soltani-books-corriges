const fs = require('fs');

const code = `
// ── TEST 3 ────────────────────────────────────────────────────────────────────
function TEST3E1() { return (<>
  <Step index={0} title="Question 1 : Déterminant"><RB><BM t="\\det(A) = 8" /></RB></Step>
  <Step index={1} title="Question 2 : Écriture matricielle"><RB><BM t="A X = \\begin{pmatrix} 2 \\\\ 3 \\\\ 1 \\end{pmatrix}" /></RB></Step>
  <Step index={2} title="Question 3 : Solution"><RB><BM t="X = A^{-1} \\times \\begin{pmatrix} 2 \\\\ 3 \\\\ 1 \\end{pmatrix}" /></RB></Step>
  <Step index={3} title="Question 4 : Matrice inverse"><RB><BM t="\\frac{1}{8}(3I_3 - A)" /></RB></Step>
</>)}

function TEST3E2() { return (<>
  <Step index={0} title="Question 1 : Demi-degré extérieur"><RB><BM t="2" /></RB></Step>
  <Step index={1} title="Question 2 : Cycle eulérien"><RB>Non, car d⁺(A) ≠ d⁻(A)</RB></Step>
  <Step index={2} title="Question 3 : Coefficient de M²"><RB>1 chemin de longueur 2 relie B à C</RB></Step>
  <Step index={3} title="Question 4 : Arcs"><RB><BM t="7" /></RB></Step>
</>)}

function TEST3E3() { return (<>
  <Step index={0} title="Question 1 : Espérance"><RB><BM t="-0{,}5 \\text{ DT}" /></RB></Step>
  <Step index={1} title="Question 2 : Loi Binomiale"><RB><BM t="\\mathcal{B}(4; 0{,}3)" /></RB></Step>
  <Step index={2} title="Question 3 : Exactement 2 vertes"><RB><BM t="C_4^2(0{,}3)^2(0{,}7)^2" /></RB></Step>
  <Step index={3} title="Question 4 : Limite de (Un)"><RB><BM t="3" /></RB></Step>
</>)}

function TEST3E4() { return (<>
  <Step index={0} title="Question 1 : Valeurs F(0) et F(2)"><RB><BM t="2 \\text{ et } 0" /></RB></Step>
  <Step index={1} title="Question 2 : f(1)=0"><RB>Admet une tangente horizontale</RB></Step>
  <Step index={2} title="Question 3 : Calcul d'aire"><RB><BM t="\\int_0^1 f(x)dx" /></RB></Step>
  <Step index={3} title="Question 4 : Valeur de l'aire"><RB><BM t="e - 2 \\text{ u.a.}" /></RB></Step>
</>)}

function TEST3E5() { return (<>
  <Step index={0} title="Question 1 : Abscisse moyenne"><RB><BM t="2" /></RB></Step>
  <Step index={1} title="Question 2 : Ajustement fort"><RB><BM t="|r| \\approx 1" /></RB></Step>
  <Step index={2} title="Question 3 : Estimation"><RB><BM t="26" /></RB></Step>
  <Step index={3} title="Question 4 : Signe de r"><RB>Positif</RB></Step>
</>)}

// ── TEST 4 ────────────────────────────────────────────────────────────────────
function TEST4E1() { return (<>
  <Step index={0} title="Question 1 : Déterminant"><RB><BM t="4" /></RB></Step>
  <Step index={1} title="Question 2 : Matrice inverse"><RB><BM t="A^{-1} = \\frac{1}{4}(5I_3 - A)" /></RB></Step>
  <Step index={2} title="Question 3 : Somme première ligne"><RB><BM t="4" /></RB></Step>
  <Step index={3} title="Question 4 : Solution"><RB><BM t="(0{,}25, 0{,}25, 0{,}25)" /></RB></Step>
</>)}

function TEST4E2() { return (<>
  <Step index={0} title="Question 1 : État à l'étape 1"><RB><BM t="(0{,}55 \\quad 0{,}45)" /></RB></Step>
  <Step index={1} title="Question 2 : État stable"><RB><BM t="P = P \\times M" /></RB></Step>
  <Step index={2} title="Question 3 : Valeur de a"><RB><BM t="0{,}6" /></RB></Step>
  <Step index={3} title="Question 4 : Graphe complet d'ordre 4"><RB><BM t="6" /></RB></Step>
</>)}

function TEST4E3() { return (<>
  <Step index={0} title="Question 1 : Probabilité intersection"><RB><BM t="0{,}18" /></RB></Step>
  <Step index={1} title="Question 2 : Probabilité totale"><RB><BM t="0{,}26" /></RB></Step>
  <Step index={2} title="Question 3 : Conditionnelle inversée"><RB><BM t="\\approx 0{,}692" /></RB></Step>
  <Step index={3} title="Question 4 : Au moins un"><RB><BM t="1 - (0{,}74)^3" /></RB></Step>
</>)}

function TEST4E4() { return (<>
  <Step index={0} title="Question 1 : Limite -∞"><RB><BM t="0" /></RB></Step>
  <Step index={1} title="Question 2 : Dérivée F'(x)"><RB><BM t="xe^x" /></RB></Step>
  <Step index={2} title="Question 3 : Minimum de f"><RB><BM t="x = -1" /></RB></Step>
  <Step index={3} title="Question 4 : Calcul d'aire"><RB><BM t="e^2" /></RB></Step>
</>)}

function TEST4E5() { return (<>
  <Step index={0} title="Question 1 : Expression géométrique"><RB><BM t="3 \\times (0{,}2)^n" /></RB></Step>
  <Step index={1} title="Question 2 : Limite"><RB><BM t="0" /></RB></Step>
  <Step index={2} title="Question 3 : Limite de la somme"><RB>Les deux sont justes (15/4 et 3/0,8)</RB></Step>
  <Step index={3} title="Question 4 : Inéquation"><RB><BM t="n=4" /></RB></Step>
</>)}

// ── TEST 5 ────────────────────────────────────────────────────────────────────
function TEST5E1() { return (<>
  <Step index={0} title="Question 1 : Asymptote"><RB><BM t="y = x - 1" /></RB></Step>
  <Step index={1} title="Question 2 : Limite de la différence"><RB><BM t="0" /></RB></Step>
  <Step index={2} title="Question 3 : Position relative"><RB>Au dessus</RB></Step>
  <Step index={3} title="Question 4 : Primitive"><RB><BM t="\\frac{1}{2}x^2 - x + \\ln(x)" /></RB></Step>
</>)}

function TEST5E2() { return (<>
  <Step index={0} title="Question 1 : Écart-type"><RB><BM t="1{,}2" /></RB></Step>
  <Step index={1} title="Question 2 : Loi Binomiale"><RB><BM t="\\text{Binomiale } \\mathcal{B}(5; 0{,}3)" /></RB></Step>
  <Step index={2} title="Question 3 : Espérance E(Y)"><RB><BM t="1{,}5" /></RB></Step>
  <Step index={3} title="Question 4 : Probabilité Y=0"><RB><BM t="(0{,}7)^5" /></RB></Step>
</>)}

function TEST5E3() { return (<>
  <Step index={0} title="Question 1 : Suite Vn"><RB>Géométrique de raison 1/2</RB></Step>
  <Step index={1} title="Question 2 : Limite de Un"><RB><BM t="6" /></RB></Step>
  <Step index={2} title="Question 3 : Déterminant"><RB><BM t="3" /></RB></Step>
  <Step index={3} title="Question 4 : Première colonne A⁻¹"><RB><BM t="\\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix}" /></RB></Step>
</>)}

function TEST5E4() { return (<>
  <Step index={0} title="Question 1 : Tableau Dijkstra"><RB><BM t="X=8(B), Y=9(C)" /></RB></Step>
  <Step index={1} title="Question 2 : Plus court chemin"><RB><BM t="12" /></RB></Step>
  <Step index={2} title="Question 3 : Diamètre"><RB><BM t="4" /></RB></Step>
  <Step index={3} title="Question 4 : Chemin <= 3"><RB>Non</RB></Step>
</>)}

function TEST5E5() { return (<>
  <Step index={0} title="Question 1 : Ensemble de définition"><RB><BM t="]0, +\\infty[" /></RB></Step>
  <Step index={1} title="Question 2 : Changement de variable"><RB><BM t="1 \\text{ et } 2" /></RB></Step>
  <Step index={2} title="Question 3 : Solutions"><RB><BM t="e \\text{ et } e^2" /></RB></Step>
  <Step index={3} title="Question 4 : Inéquation"><RB><BM t="]e, +\\infty[" /></RB></Step>
</>)}
`;

let content = fs.readFileSync('src/App.jsx', 'utf-8');
content = content.replace('// ── Tests 1 à 5', code + '\n// ── Tests 1 à 5');

for(let i=3; i<=5; i++) {
  content = content.replace(new RegExp("'TEST" + i + "-E1': \\{.*?\\}"), "'TEST" + i + "-E1': { title:'Évaluation QCM - Ex.1', badge:'Test " + i + " · Ex.1', C:<TEST" + i + "E1/> }");
  content = content.replace(new RegExp("'TEST" + i + "-E2': \\{.*?\\}"), "'TEST" + i + "-E2': { title:'Évaluation QCM - Ex.2', badge:'Test " + i + " · Ex.2', C:<TEST" + i + "E2/> }");
  content = content.replace(new RegExp("'TEST" + i + "-E3': \\{.*?\\}"), "'TEST" + i + "-E3': { title:'Évaluation QCM - Ex.3', badge:'Test " + i + " · Ex.3', C:<TEST" + i + "E3/> }");
  content = content.replace(new RegExp("'TEST" + i + "-E4': \\{.*?\\}"), "'TEST" + i + "-E4': { title:'Évaluation QCM - Ex.4', badge:'Test " + i + " · Ex.4', C:<TEST" + i + "E4/> }");
  content = content.replace(new RegExp("'TEST" + i + "-E5': \\{.*?\\}"), "'TEST" + i + "-E5': { title:'Évaluation QCM - Ex.5', badge:'Test " + i + " · Ex.5', C:<TEST" + i + "E5/> }");
}

fs.writeFileSync('src/App.jsx', content, 'utf-8');
console.log('App.jsx updated with TEST 3, TEST 4 and TEST 5');
