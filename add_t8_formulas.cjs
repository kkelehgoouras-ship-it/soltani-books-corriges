const fs = require('fs');
const T = JSON.parse(fs.readFileSync('src/formulas.json', 'utf-8'));

const new_keys = {
    // T8-E1
    "T8E1_detA": "\\det(A) = 100(3200-2400) - 140(3200-2400) + 60(3200-3200) = 80000 - 112000 = -32000 \\neq 0",
    "T8E1_AB": "A \\times B = \\begin{pmatrix} 80 & 0 & 0 \\\\ 0 & 80 & 0 \\\\ 0 & 0 & 80 \\end{pmatrix} = 80 I_3",
    "T8E1_Ainv": "A \\times B = 80 I_3 \\implies A \\times \\left(\\frac{1}{80}B\\right) = I_3 \\implies A^{-1} = \\frac{1}{80}B",
    "T8E1_SysV": "\\begin{cases} 100x+140y+60z = a \\\\ 80x+80y+60z = b \\\\ 40x+40y+40z = c \\end{cases} \\iff \\begin{pmatrix} 100 & 140 & 60 \\\\ 80 & 80 & 60 \\\\ 40 & 40 & 40 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix} \\iff A \\times U = V",
    "T8E1_U2": "U = \\begin{pmatrix} 4 \\\\ 4 \\\\ 6 \\end{pmatrix} \\implies V = A \\times U = \\begin{pmatrix} 100(4)+140(4)+60(6) \\\\ 80(4)+80(4)+60(6) \\\\ 40(4)+40(4)+40(6) \\end{pmatrix} = \\begin{pmatrix} 1320 \\\\ 1000 \\\\ 560 \\end{pmatrix}",
    "T8E1_Coût": "\\text{Haute: 1320 DT, Moyenne: 1000 DT, Basse: 560 DT}",
    "T8E1_Uinv": "A \\times U = V \\implies U = A^{-1}V = \\frac{1}{80} B \\times V",
    "T8E1_USol": "U = \\frac{1}{80}\\begin{pmatrix} -2 & 8 & -9 \\\\ 2 & -4 & 3 \\\\ 0 & -4 & 8 \\end{pmatrix}\\begin{pmatrix} 1080 \\\\ 920 \\\\ 560 \\end{pmatrix} = \\frac{1}{80}\\begin{pmatrix} 160 \\\\ 160 \\\\ 800 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 2 \\\\ 10 \\end{pmatrix}",
    "T8E1_Jours": "\\text{2 jours à Tabarka, 2 jours à Sousse, 10 jours à Djerba}",

    // T8-E2
    "T8E2_P": "P(C) = 0{,}04 \\quad;\\quad P(B) = 0{,}03 \\quad;\\quad P(B\\cap C) = 0{,}02",
    "T8E2_D": "D = B \\cup C \\implies P(D) = P(B) + P(C) - P(B\\cap C) = 0{,}03 + 0{,}04 - 0{,}02 = 0{,}05",
    "T8E2_E": "P(E) = P(B \\cap \\bar{C}) + P(\\bar{B} \\cap C) = (0{,}03 - 0{,}02) + (0{,}04 - 0{,}02) = 0{,}03",
    "T8E2_F": "F = \\bar{D} \\implies P(F) = 1 - P(D) = 1 - 0{,}05 = 0{,}95",
    "T8E2_Cond": "P(B|C) = \\frac{P(B\\cap C)}{P(C)} = \\frac{0{,}02}{0{,}04} = 0{,}5",
    "T8E2_Bin": "\\text{Épreuve de Bernoulli répétée 2 fois : } n=2, p=P(B)=0{,}03.",
    "T8E2_PUnS": "P(\\text{1 seul}) = C_2^1 p (1-p) = 2 \\times 0{,}03 \\times 0{,}97 = 0{,}0582",
    "T8E2_Loi": "X \\in \\{40\\;;\\; 32\\;;\\; 20\\} \\implies P(X=40)=0{,}95 \\;;\\; P(X=32)=0{,}03 \\;;\\; P(X=20)=0{,}02",
    "T8E2_Esp": "E(X) = 40(0{,}95) + 32(0{,}03) + 20(0{,}02) = 38 + 0{,}96 + 0{,}4 = 39{,}36 \\text{ DT}",
    "T8E2_CA": "\\text{Pour 100 chemisiers : } 100 \\times E(X) = 3936 \\text{ DT}",

    // T8-E3
    "T8E3_Vrec": "V_{n+1} = U_{n+1} - 8 = (0{,}4U_n + 4{,}8) - 8 = 0{,}4U_n - 3{,}2 = 0{,}4(U_n - 8) = 0{,}4 V_n",
    "T8E3_Vgeom": "V_0 = 2 - 8 = -6. \\text{ Suite géométrique de raison } q=0{,}4.",
    "T8E3_VnUn": "V_n = V_0 \\times q^n = -6 \\times 0{,}4^n \\implies U_n = V_n + 8 = 8 - 6(0{,}4)^n",
    "T8E3_Lim": "-1 < 0{,}4 < 1 \\implies \\lim_{n\\to+\\infty} 0{,}4^n = 0 \\implies \\lim_{n\\to+\\infty} U_n = 8",
    "T8E3_InEq": "U_n > 7{,}9 \\iff 8 - 6(0{,}4)^n > 7{,}9 \\iff 6(0{,}4)^n < 0{,}1 \\iff 0{,}4^n < \\frac{1}{60}",
    "T8E3_Ln": "n \\ln(0{,}4) < \\ln\\left(\\frac{1}{60}\\right) \\implies n > \\frac{\\ln(1/60)}{\\ln(0{,}4)} \\approx 4{,}46 \\implies n \\ge 5",
    "T8E3_Annee": "\\text{Année : } 2022 + 5 = 2027",
    "T8E3_Imp": "U_n = 8 - 6(0{,}4)^n. \\text{ Comme } 6(0{,}4)^n > 0 \\text{ pour tout } n, \\text{ on a } U_n < 8. \\text{ Impossible.}",

    // T8-E4
    "T8E4_LimM1": "\\lim_{x\\to-\\infty} x = -\\infty, \\lim_{x\\to-\\infty} e^{-x} = +\\infty \\text{ (F.I.). } x+e^{-x} = e^{-x}(xe^x + 1).",
    "T8E4_LimM2": "\\lim_{x\\to-\\infty} xe^x = 0 \\implies \\lim_{x\\to-\\infty} e^{-x}(xe^x+1) = +\\infty(0+1) = +\\infty",
    "T8E4_LimM3": "\\frac{f(x)}{x} = \\frac{x+e^{-x}}{x} = 1 + \\frac{e^{-x}}{x} = 1 + \\frac{1}{xe^x}. \\text{ Or } \\lim_{x\\to-\\infty} xe^x = 0^- \\implies \\lim_{x\\to-\\infty} \\frac{1}{xe^x} = -\\infty. \\text{ B.P. }(Oy)",
    "T8E4_LimP": "\\lim_{x\\to+\\infty} [f(x) - x] = \\lim_{x\\to+\\infty} e^{-x} = 0 \\implies \\Delta: y=x \\text{ asymptote oblique en } +\\infty.",
    "T8E4_Deriv": "f'(x) = 1 - e^{-x} = 1 - \\frac{1}{e^x} = \\frac{e^x - 1}{e^x}",
    "T8E4_Signe": "e^x > 0 \\implies \\text{Signe de } f'(x) \\text{ est celui de } e^x - 1 \\iff x = 0. \\text{ Min en } f(0)=1.",
    "T8E4_Int": "A = \\int_0^1 f(x)dx = \\left[ \\frac{x^2}{2} - e^{-x} \\right]_0^1 = \\left(\\frac{1}{2} - e^{-1}\\right) - (0 - 1) = \\frac{3}{2} - e^{-1} \\text{ ua}"
};

Object.assign(T, new_keys);
fs.writeFileSync('src/formulas.json', JSON.stringify(T, null, 2), 'utf-8');
console.log('Updated formulas.json');
