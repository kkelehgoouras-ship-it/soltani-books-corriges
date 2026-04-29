const fs = require('fs');
const T = JSON.parse(fs.readFileSync('src/formulas.json', 'utf-8'));

const new_keys = {
    // T7-E1
    "T7E1_A": "A = \\begin{pmatrix} 5 & 4 & 6 \\\\ 4 & 2 & 1 \\\\ 1 & 4 & 3 \\end{pmatrix}",
    "T7E1_detA": "\\det(A) = 5(6-4) - 4(12-1) + 6(16-2) = 10 - 44 + 84 = 50 \\neq 0 \\implies A \\text{ inversible}",
    "T7E1_B": "B = \\begin{pmatrix} 2 & 12 & -8 \\\\ -11 & 9 & 19 \\\\ 14 & -16 & -6 \\end{pmatrix}",
    "T7E1_AB": "A \\times B = \\begin{pmatrix} 50 & 0 & 0 \\\\ 0 & 50 & 0 \\\\ 0 & 0 & 50 \\end{pmatrix} = 50 I_3",
    "T7E1_Ainv": "A \\times B = 50 I_3 \\implies A \\times \\left(\\frac{1}{50}B\\right) = I_3 \\implies A^{-1} = \\frac{1}{50} B",
    "T7E1_SysS": "(S) : \\begin{cases} 5x + 4y + 6z = 1460 \\\\ 4x + 2y + z = 720 \\\\ x + 4y + 3z = 820 \\end{cases}",
    "T7E1_MatS": "\\begin{pmatrix} 5 & 4 & 6 \\\\ 4 & 2 & 1 \\\\ 1 & 4 & 3 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1460 \\\\ 720 \\\\ 820 \\end{pmatrix} \\iff A \\times X = C",
    "T7E1_SolS": "X = A^{-1}C = \\frac{1}{50}\\begin{pmatrix} 2 & 12 & -8 \\\\ -11 & 9 & 19 \\\\ 14 & -16 & -6 \\end{pmatrix}\\begin{pmatrix} 1460 \\\\ 720 \\\\ 820 \\end{pmatrix} = \\frac{1}{50}\\begin{pmatrix} 5000 \\\\ 6000 \\\\ 4000 \\end{pmatrix} = \\begin{pmatrix} 100 \\\\ 120 \\\\ 80 \\end{pmatrix}",
    "T7E1_Prix": "\\text{Chemise: } 100\\text{ DT, Pantalon: } 120\\text{ DT, Pull: } 80\\text{ DT}",
    "T7E1_Liq1": "\\text{Nouveaux prix: } C = 100\\times 0{,}90 = 90 \\text{ DT, } P_a = 120\\times 0{,}60 = 72 \\text{ DT, } P_u = 80\\times 0{,}70 = 56 \\text{ DT}",
    "T7E1_Liq2": "\\text{Facture } F_1 = 50(90)+40(72)+60(56) = 10740\\text{ DT. Facture } F_2 = 60(90)+30(72)+15(56) = 8400\\text{ DT}",

    // T7-E2
    "T7E2_Ori": "Le graphe est orienté car sa matrice d'adjacence $M$ n'est pas symétrique ($M_{1,2} = 1 \\neq M_{2,1} = 0$).",
    "T7E2_DegP": "d^+ : A(3), B(1), C(2), D(1), E(3), F(2), G(3)",
    "T7E2_DegM": "d^- : A(3), B(1), C(2), D(2), E(2), F(2), G(3)",
    "T7E2_CircEul": "\\text{Non, car } d^+ \\neq d^- \\text{ pour certains sommets (ex: } d^+(D)=1 \\neq d^-(D)=2).",
    "T7E2_ChnEul": "\\text{Oui, car seul } E \\text{ vérifie } d^+-d^- = 1 \\text{ et seul } D \\text{ vérifie } d^--d^+ = 1. \\text{ Chaîne de } E \\text{ vers } D.",
    "T7E2_Chm2": "Nombre de chemins de longueur 2 de $E$ à $D$ = $(M^2)_{E,D} = (M^2)_{5,4} = 2$.",
    "T7E2_Chm3": "Nombre de chemins de longueur 3 de $G$ à $A$ = $(M^3)_{G,A} = (M^3)_{7,1} = 5$.",
    "T7E2_Chm2B": "$(M^2)_{B,C} = 0 \\implies \\text{Aucun chemin de longueur 2 de } B \\text{ à } C.",
    "T7E2_ChmF": "\\text{Chaînes fermées de longueur 4 = Trace}(M^4) = 9+2+2+2+4+5+8 = 32.",
    "T7E2_Diam1": "$(M+I_7)^2 \\text{ et } (M+I_7)^3 \\text{ contiennent des } 0. \\text{ Donc le diamètre est } > 3.",
    "T7E2_Diam2": "$(M+I_7)^4 \\text{ ne contient aucun } 0. \\text{ Donc le diamètre du graphe est } 4.",

    // T7-E3
    "T7E3_r1": "r_1(X,Y) \\approx -0{,}897. \\text{ Corrélation négative forte, ajustement affine justifié.}",
    "T7E3_D1": "D_1 : Y = -5{,}196 X + 6{,}791",
    "T7E3_Est": "X = 0{,}98 \\implies Y = -5{,}196(0{,}98) + 6{,}791 \\approx 1{,}699 \\text{ k-kg}",
    "T7E3_r2": "r_2(X,Z) \\approx 0{,}971",
    "T7E3_Eq1": "Z = Y \\iff 0{,}53X + 1{,}1 = -5{,}196X + 6{,}791",
    "T7E3_Eq2": "5{,}726X = 5{,}691 \\implies X \\approx 0{,}994 \\text{ DT}",

    // T7-E4
    "T7E4_Lim0": "\\lim_{x\\to 0^+} f(x) = \\lim_{x\\to 0^+} \\left(1 + \\frac{1-\\ln x}{x}\\right) = 1 + \\frac{+\\infty}{0^+} = +\\infty \\implies \\text{Asymptote verticale } x=0",
    "T7E4_LimInf": "\\lim_{x\\to +\\infty} f(x) = \\lim_{x\\to +\\infty} \\left(1 + \\frac{1}{x} - \\frac{\\ln x}{x}\\right) = 1 + 0 - 0 = 1 \\implies \\text{Asymptote horizontale } y=1",
    "T7E4_Deriv": "f'(x) = \\frac{\\left(1 - \\frac{1}{x}\\right)x - (x+1-\\ln x)}{x^2} = \\frac{x - 1 - x - 1 + \\ln x}{x^2} = \\frac{\\ln x - 2}{x^2}",
    "T7E4_Tab": "\\text{Signe de } f'(x) \\text{ est celui de } \\ln x - 2 \\iff x = e^2. \\text{ Min en } f(e^2) = \\frac{e^2-1}{e^2} \\approx 0{,}86",
    "T7E4_TVI": "f \\text{ est continue et strictement décroissante sur } ]0;e^2]. \\\\ f(1{,}36) \\approx 1{,}509 \\text{ et } f(1{,}38) \\approx 1{,}491. \\text{ Comme } 1{,}5 \\in ]1{,}491 ; 1{,}509[, \\alpha \\in ]1{,}36 ; 1{,}38[",
    "T7E4_Tang": "f(1) = 2 \\text{ et } f'(1) = -2 \\implies T : y = -2(x-1) + 2 = -2x + 4",
    "T7E4_Prim": "F'(x) = 1 + \\frac{1}{x} - \\frac{2\\ln x \\cdot \\frac{1}{x}}{2} = 1 + \\frac{1}{x} - \\frac{\\ln x}{x} = \\frac{x+1-\\ln x}{x} = f(x)",
    "T7E4_Int": "I = \\int_1^{10} f(x)dx = F(10) - F(1) = \\left(10 + \\ln 10 - \\frac{(\\ln 10)^2}{2}\\right) - (1) \\approx 8{,}65",
    "T7E4_Ben1": "C(x) = f(x) \\text{ est minimal pour } x = e^2 \\approx 7{,}389 \\text{ (soit } \\approx 739 \\text{ pièces). Coût minimal } \\approx 0{,}86 \\text{ DT}",
    "T7E4_Ben2": "C(x) \\le 1{,}5 \\iff x \\ge \\alpha \\approx 1{,}37 \\text{ (soit } 138 \\text{ pièces minimum)}",
    "T7E4_Ben3": "C_m = \\frac{1}{10-1} \\int_1^{10} f(x)dx = \\frac{I}{9} \\approx \\frac{8{,}652}{9} \\approx 0{,}96 \\text{ DT}"
};

Object.assign(T, new_keys);
fs.writeFileSync('src/formulas.json', JSON.stringify(T, null, 2), 'utf-8');
console.log('Updated formulas.json');
