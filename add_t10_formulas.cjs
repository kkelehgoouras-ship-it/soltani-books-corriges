const fs = require('fs');
const T = JSON.parse(fs.readFileSync('src/formulas.json', 'utf-8'));

const new_keys = {
    // T10-E1
    "T10E1_r": "r \\approx 0{,}978. \\text{ Forte corrélation, ajustement affine justifié.}",
    "T10E1_D": "D : y = 8{,}64 x + 38{,}26",
    "T10E1_EstAff": "\\text{En 2022 } (x=8) \\implies y = 8{,}64(8) + 38{,}26 \\approx 107{,}38 \\text{ Mds DT}",
    "T10E1_EstExp": "\\text{En 2022 } (x=8) \\implies y = 41{,}68 e^{0{,}13 \\times 8} \\approx 117{,}92 \\text{ Mds DT}",
    "T10E1_Comp": "\\text{Réel : } 114{,}14. \\text{ L'ajustement exponentiel est plus proche (erreur } 3{,}78 \\text{ contre } 6{,}76).",

    // T10-E2
    "T10E2_det": "\\det(M_\\alpha) = 5(6-4) - 4(3\\alpha-1) + 6(4\\alpha-2) = 10 - 12\\alpha + 4 + 24\\alpha - 12 = 12\\alpha + 2",
    "T10E2_inv": "M_\\alpha \\text{ est inversible } \\iff \\det(M_\\alpha) \\neq 0 \\iff \\alpha \\neq -\\frac{1}{6}",
    "T10E2_AB": "A \\times B = M_4 \\times B = \\begin{pmatrix} 50 & 0 & 0 \\\\ 0 & 50 & 0 \\\\ 0 & 0 & 50 \\end{pmatrix} = 50 I_3",
    "T10E2_Ainv": "A^{-1} = \\frac{1}{50} B = \\frac{1}{50} \\begin{pmatrix} 2 & 12 & -8 \\\\ -11 & 9 & 19 \\\\ 14 & -16 & -6 \\end{pmatrix}",
    "T10E2_Sys": "\\begin{pmatrix} 5 & 4 & 6 \\\\ 4 & 2 & 1 \\\\ 1 & 4 & 3 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1460 \\\\ 720 \\\\ 820 \\end{pmatrix} \\implies X = A^{-1} C",
    "T10E2_Sol": "X = \\frac{1}{50} B \\times C = \\begin{pmatrix} 100 \\\\ 120 \\\\ 80 \\end{pmatrix}",
    "T10E2_Prob": "\\text{En posant } x, y, z \\text{ le nombre de sacs (en divisant par } 10 \\text{ kg par ex.) } \\implies (S)",
    "T10E2_Rep": "\\text{Sacs : } 100 \\text{ de } G_1, 120 \\text{ de } G_2, 80 \\text{ de } G_3",

    // T10-E3
    "T10E3_gDeriv": "g'(x) = 1\\cdot e^x + x\\cdot e^x = e^x(1+x) > 0 \\text{ sur } [0, +\\infty[. \\text{ Donc } g \\text{ est strictement croissante.}",
    "T10E3_TVI": "g(0{,}5) \\approx -0{,}17 < 0 \\text{ et } g(0{,}6) \\approx 0{,}09 > 0. \\text{ TVI } \\implies \\exists! \\alpha \\in ]0{,}5\\;;\\;0{,}6[ \\text{ t.q } g(\\alpha) = 0.",
    "T10E3_gSign": "\\text{Sur } [0,\\alpha[, g(x)<0. \\text{ Sur } ]\\alpha, +\\infty[, g(x)>0.",
    "T10E3_Lim0": "\\lim_{x\\to 0^+} f(x) = \\lim_{x\\to 0^+} (e^x - \\ln x) = 1 - (-\\infty) = +\\infty",
    "T10E3_LimInf": "\\lim_{x\\to +\\infty} f(x) = \\lim_{x\\to +\\infty} e^x\\left(1 - \\frac{\\ln x}{e^x}\\right) = +\\infty(1-0) = +\\infty",
    "T10E3_fDeriv": "f'(x) = e^x - \\frac{1}{x} = \\frac{xe^x - 1}{x} = \\frac{g(x)}{x}",
    "T10E3_Var": "\\text{Signe de } f'(x) \\text{ est celui de } g(x). \\text{ Min en } x=\\alpha.",
    "T10E3_MN1": "M(\\alpha, \\ln\\alpha) \\text{ et } N(\\alpha, e^\\alpha). \\text{ Donc } MN = |e^\\alpha - \\ln\\alpha| = f(\\alpha)",
    "T10E3_MN2": "g(\\alpha)=0 \\implies \\alpha e^\\alpha = 1 \\implies e^\\alpha = \\frac{1}{\\alpha} \\implies \\alpha = -\\ln\\alpha. \\text{ Donc } MN = \\frac{1}{\\alpha} - (-\\alpha) = \\alpha + \\frac{1}{\\alpha}",

    // T10-E4
    "T10E4_Ordre": "\\text{Ordre : } 5. \\text{ Arêtes : } 8 \\text{ (somme des degrés / 2)}",
    "T10E4_Deg": "Degrés : A(4), B(3), C(3), D(4), E(2)",
    "T10E4_Piéton": "\\text{Oui, car le graphe est connexe et possède exactement deux sommets de degré impair (B et C).}",
    "T10E4_SousG": "\\text{Le sous-graphe } \\{A, B, C, D\\} \\text{ est complet } (K_4). \\text{ Donc } n \\ge 4. (\\text{L'énoncé propose la borne large } n \\ge 3)",
    "T10E4_nVal": "\\text{Le degré maximum est 4, donc } n \\le 5. \\text{ On trouve un coloriage avec 4 couleurs.}",
    "T10E4_Chm": "(M^4)_{B,D} = (M^4)_{2,4} = 4 \\text{ chaînes orientées de longueur 4 de } B \\text{ à } D."
};

Object.assign(T, new_keys);
fs.writeFileSync('src/formulas.json', JSON.stringify(T, null, 2), 'utf-8');
console.log('Updated formulas.json');
