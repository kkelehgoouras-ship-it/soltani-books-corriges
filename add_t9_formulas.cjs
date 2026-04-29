const fs = require('fs');
const T = JSON.parse(fs.readFileSync('src/formulas.json', 'utf-8'));

const new_keys = {
    // T9-E1
    "T9E1_PA": "p(A) = 0{,}4 \\quad;\\quad p(B) = 0{,}5",
    "T9E1_PAB": "p(A \\cap B) = p(A|B) \\times p(B) = 0{,}2 \\times 0{,}5 = 0{,}1",
    "T9E1_PBA": "p(B|A) = \\frac{p(A \\cap B)}{p(A)} = \\frac{0{,}1}{0{,}4} = 0{,}25",
    "T9E1_Cond": "p(A|\\overline{B}) = \\frac{p(A \\cap \\overline{B})}{p(\\overline{B})} = \\frac{p(A) - p(A \\cap B)}{1 - p(B)} = \\frac{0{,}4 - 0{,}1}{0{,}5} = 0{,}6",
    "T9E1_Bin": "X \\sim \\mathcal{B}(n=5\\;;\\; p = p(\\overline{A} \\cap \\overline{B}))",
    "T9E1_P_Succ": "p(\\overline{A} \\cap \\overline{B}) = p(\\overline{B}) \\times p(\\overline{A}|\\overline{B}) = 0{,}5 \\times (1 - 0{,}6) = 0{,}5 \\times 0{,}4 = 0{,}2",
    "T9E1_PX2": "p(X=2) = C_5^2 (0{,}2)^2 (0{,}8)^3 = 10 \\times 0{,}04 \\times 0{,}512 = 0{,}2048",
    "T9E1_EX": "E(X) = n \\times p = 5 \\times 0{,}2 = 1 \\text{ (En moyenne, 1 visiteur sur 5 n'achète rien)}",

    // T9-E2
    "T9E2_detA": "\\det(A) = 1(2 - (-2)) - 1(-4 - 1) + 0 = 4 + 5 = 9 \\neq 0 \\implies A \\text{ est inversible}",
    "T9E2_AB": "A \\times B = \\begin{pmatrix} 9 & 0 & 0 \\\\ 0 & 9 & 0 \\\\ 0 & 0 & 9 \\end{pmatrix} = 9 I_3 \\implies A^{-1} = \\frac{1}{9} B",
    "T9E2_Frac1": "\\frac{a(x-1)^2 + b(x-1)(x+2) + c(x+2)}{(x+2)(x-1)^2} = \\frac{(a+b)x^2 + (-2a+b+c)x + (a-2b+2c)}{(x+2)(x-1)^2}",
    "T9E2_Frac2": "\\text{Par identification : } \\begin{cases} a+b=2 \\\\ -2a+b+c=-6 \\\\ a-2b+2c=-11 \\end{cases}",
    "T9E2_Mat": "\\begin{pmatrix} 1 & 1 & 0 \\\\ -2 & 1 & 1 \\\\ 1 & -2 & 2 \\end{pmatrix} \\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ -6 \\\\ -11 \\end{pmatrix} \\iff A \\times X = C",
    "T9E2_Sol": "X = A^{-1}C = \\frac{1}{9} \\begin{pmatrix} 4 & -2 & 1 \\\\ 5 & 2 & -1 \\\\ 3 & 3 & 3 \\end{pmatrix} \\begin{pmatrix} 2 \\\\ -6 \\\\ -11 \\end{pmatrix} = \\frac{1}{9} \\begin{pmatrix} 9 \\\\ 9 \\\\ -45 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 1 \\\\ -5 \\end{pmatrix}",
    "T9E2_Int": "\\int_3^6 \\left( \\frac{1}{x+2} + \\frac{1}{x-1} - \\frac{5}{(x-1)^2} \\right) dx = \\left[ \\ln|x+2| + \\ln|x-1| + \\frac{5}{x-1} \\right]_3^6",
    "T9E2_IntCalc": "= \\left(\\ln 8 + \\ln 5 + 1\\right) - \\left(\\ln 5 + \\ln 2 + \\frac{5}{2}\\right) = \\ln\\left(\\frac{8}{2}\\right) + 1 - 2{,}5 = 2\\ln 2 - \\frac{3}{2}",

    // T9-E3
    "T9E3_g1": "Par lecture graphique sur $(\\xi)$, $g(1) = 0$. $g(x) < 0$ sur $]0, 1[$ et $g(x) > 0$ sur $]1, 4]$.",
    "T9E3_Inflex": "Comme $F''(x) = f'(x) = g(x)$, et que $g$ s'annule en changeant de signe en $x=1$, $I(1,2)$ est un point d'inflexion.",
    "T9E3_f1": "\\text{La tangente à } (\\Gamma) \\text{ en } x=1 \\text{ est horizontale } \\implies F'(1) = 0 \\implies f(1) = 0.",
    "T9E3_Int": "\\int_1^e f(x)g(x)dx = \\int_1^e f(x)f'(x)dx = \\left[ \\frac{1}{2} (f(x))^2 \\right]_1^e = \\frac{f(e)^2 - f(1)^2}{2}",
    "T9E3_ValMoy": "\\frac{1}{e - 1/e} \\int_{1/e}^e f(x)dx = \\frac{1}{e - 1/e} \\left[ F(x) \\right]_{1/e}^e = \\frac{e}{e^2-1} \\left( F(e) - F\\left(\\frac{1}{e}\\right) \\right)",

    // T9-E4
    "T9E4_Ordre": "\\text{Ordre : } 5 \\text{ sommets. Arêtes : } \\frac{4+3+3+4+2}{2} = 8 \\text{ arêtes.}",
    "T9E4_Deg": "Degrés : A(4), B(3), C(3), D(4), E(2)",
    "T9E4_Eul": "Il y a exactement deux sommets de degré impair (B et C). Un piéton peut donc visiter toutes les rues une seule fois (Chaîne eulérienne).",
    "T9E4_SousG": "\\text{Sous-graphe complet d'ordre 3 : } \\{A, B, C\\} \\text{ ou } \\{A, B, D\\} \\dots \\implies n \\ge 3.",
    "T9E4_Max": "Le degré maximum est 4, donc $n \\le 4+1 = 5$. D'où $3 \\le n \\le 5$.",
    "T9E4_n4": "En coloriant sommet par sommet, $n=4$ couleurs suffisent.",
    "T9E4_Chm": "\\text{Chaînes orientées de longueur 4 de } B \\text{ à } D : (M^4)_{2,4} = 7."
};

Object.assign(T, new_keys);
fs.writeFileSync('src/formulas.json', JSON.stringify(T, null, 2), 'utf-8');
console.log('Updated formulas.json');
