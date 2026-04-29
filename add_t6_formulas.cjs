const fs = require('fs');
const T = JSON.parse(fs.readFileSync('src/formulas.json', 'utf-8'));

const new_keys = {
    "T6E1_detA": "\\det(A) = 1\\times4 - 2\\times a = 4 - 2a",
    "T6E1_invCond": "A \\text{ est inversible } \\iff \\det(A) \\neq 0 \\iff 4 - 2a \\neq 0 \\iff a \\neq 2",
    "T6E1_A3": "A = \\begin{pmatrix} 1 & 3 \\\\ 2 & 4 \\end{pmatrix} \\implies \\det(A) = 4 - 6 = -2",
    "T6E1_Ainv": "A^{-1} = -\\frac{1}{2}\\begin{pmatrix} 4 & -3 \\\\ -2 & 1 \\end{pmatrix} = \\begin{pmatrix} -2 & 1{,}5 \\\\ 1 & -0{,}5 \\end{pmatrix}",
    "T6E1_SysS": "\\begin{pmatrix} 1 & 3 \\\\ 2 & 4 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} \\iff X = A^{-1}B",
    "T6E1_SolS": "X = \\begin{pmatrix} -2 & 1{,}5 \\\\ 1 & -0{,}5 \\end{pmatrix}\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix} \\implies S_{\\mathbb{R}^2} = \\{(-2\\;;\\; 1)\\}",
    "T6E1_Sp_z": "L_1 \\implies z = 2 - x - y",
    "T6E1_Sp_L2": "L_2 : 2x+4y+(2-x-y)-3 = 0 \\implies x+3y-1 = 0",
    "T6E1_Sp_L3": "L_3 : 3x+5y+(2-x-y)-2 = 0 \\implies 2x+4y = 0",
    "T6E1_SolSp": "\\begin{cases} x = -2 \\\\ y = 1 \\end{cases} \\implies z = 2 - (-2) - 1 = 3 \\implies S_{\\mathbb{R}^3} = \\{(-2\\;;\\; 1\\;;\\; 3)\\}",

    "T6E2_U1": "U_{n+1}+2 = \\left(\\frac{1}{2}U_n - 1\\right) + 2 = \\frac{1}{2}U_n + 1 = \\frac{1}{2}(U_n+2)",
    "T6E2_Init": "n=0 : U_0 = 0 > -2 \\text{ (Vrai)}",
    "T6E2_Hered": "U_n > -2 \\implies U_n+2 > 0 \\implies \\frac{1}{2}(U_n+2) > 0 \\implies U_{n+1}+2 > 0 \\implies U_{n+1} > -2",
    "T6E2_Decr": "U_{n+1} - U_n = -\\frac{1}{2}U_n - 1 = -\\frac{1}{2}(U_n+2) < 0 \\text{ car } U_n > -2",
    "T6E2_Lim1": "\\text{Suite minorée et décroissante } \\implies \\text{convergente vers } L. \\\\ L = \\frac{1}{2}L - 1 \\implies L = -2",
    "T6E2_Vrec": "V_{n+1} = \\ln(U_{n+1}+2) = \\ln\\left(\\frac{1}{2}(U_n+2)\\right) = \\ln\\left(\\frac{1}{2}\\right) + \\ln(U_n+2) = -\\ln(2) + V_n",
    "T6E2_Vn": "V_0 = \\ln(2). \\quad V_n = V_0 + nr = \\ln(2) - n\\ln(2) = (1-n)\\ln(2)",
    "T6E2_Un2": "V_n = \\ln(U_n+2) \\implies U_n+2 = e^{V_n} = e^{(1-n)\\ln(2)} = (e^{\\ln(2)})^{1-n} = 2^{1-n} = \\frac{1}{2^{n-1}}",
    "T6E2_Lim2": "\\lim_{n\\to+\\infty} 2^{n-1} = +\\infty \\implies \\lim_{n\\to+\\infty} U_n = 0 - 2 = -2",

    "T6E3_PAB": "P(B) = \\frac{180}{240} = 0{,}75 \\quad;\\quad P(A|B) = \\frac{126}{180} = 0{,}7 \\quad;\\quad P(A|\\bar{B}) = \\frac{18}{60} = 0{,}3",
    "T6E3_PA": "P(A) = \\frac{144}{240} = 0{,}6 \\quad;\\quad P(A\\cap B) = \\frac{126}{240} = 0{,}525",
    "T6E3_Indep": "P(A)\\times P(B) = 0{,}6 \\times 0{,}75 = 0{,}45 \\neq P(A\\cap B) \\implies \\text{Dépendants}",
    "T6E3_PBA": "P(B|A) = \\frac{P(A\\cap B)}{P(A)} = \\frac{126}{144} = \\frac{7}{8} = 0{,}875",
    "T6E3_UnSeul": "P((A\\cap\\bar{B}) \\cup (\\bar{A}\\cap B)) = \\frac{18+54}{240} = \\frac{72}{240} = 0{,}3",
    "T6E3_Binom": "X \\sim \\mathcal{B}\\left(n=4\\;;\\; p=\\frac{21}{40}=0{,}525\\right)",
    "T6E3_PX2": "P(X=2) = C_4^2 (0{,}525)^2 (0{,}475)^2 \\approx 6 \\times 0{,}2756 \\times 0{,}2256 \\approx 0{,}373",
    "T6E3_EX": "E(X) = n\\times p = 4 \\times 0{,}525 = 2{,}1 \\text{ (En moy, } \\approx 2 \\text{ employés sur 4 ont les 2 stages)}",

    "T6E4_LimInf": "\\lim_{x\\to+\\infty} f(x) = +\\infty \\quad;\\quad \\lim_{x\\to+\\infty} \\frac{f(x)}{x} = \\lim_{x\\to+\\infty} \\left(\\frac{x-2}{x}e^x + \\frac{1}{x}\\right) = +\\infty \\text{ (Branche parabolique direction } (Oy))",
    "T6E4_LimMoins": "\\lim_{x\\to-\\infty} f(x) = \\lim_{x\\to-\\infty} (xe^x - 2e^x + 1) = 0 - 0 + 1 = 1 \\text{ (Asymptote horizontale } y=1)",
    "T6E4_Deriv": "f'(x) = 1\\cdot e^x + (x-2)e^x = (x-1)e^x",
    "T6E4_Signe": "e^x > 0 \\implies \\text{Signe de } f'(x) \\text{ est celui de } x-1",
    "T6E4_Inflex": "f''(x) = 1\\cdot e^x + (x-1)e^x = xe^x \\implies \\text{S'annule et change de signe en } x=0. \\text{ Inflexion en } A(0,-1)",
    "T6E4_TVI": "f(1{,}8) \\approx -0{,}21 < 0 \\text{ et } f(1{,}9) \\approx 0{,}33 > 0. \\text{ D'après le TVI, } \\alpha \\in ]1{,}8\\;;\\; 1{,}9[",
    "T6E4_Prim": "F'(x) = 1\\cdot e^x + (x-3)e^x + 1 = (x-2)e^x + 1 = f(x)",
    "T6E4_Int": "I = \\int_1^3 f(x)dx = F(3) - F(1) = (0\\cdot e^3 + 3) - (-2e^1 + 1) = 2 + 2e \\approx 7{,}44",
    "T6E4_Ben1": "B(2) = f(2) = (2-2)e^2 + 1 = 1 \\text{ unité}",
    "T6E4_Ben2": "\\text{Ne pas travailler à perte } \\iff B(x) \\ge 0 \\iff x \\ge \\alpha \\implies \\text{Minimum } 186 \\text{ objets}",
    "T6E4_Ben3": "\\text{Moyenne } = \\frac{1}{3-1}\\int_1^3 f(x)dx = \\frac{I}{2} = \\frac{2+2e}{2} = 1+e \\approx 3{,}72 \\text{ unités}"
};

Object.assign(T, new_keys);
fs.writeFileSync('src/formulas.json', JSON.stringify(T, null, 2), 'utf-8');
console.log('Updated formulas.json');
