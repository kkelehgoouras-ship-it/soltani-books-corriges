import json

formulas = {
    # T5-E2
    "T5E2_r": "r = \\frac{\\text{Cov}(X,Y)}{\\sigma_X\\sigma_Y} \\approx 0{,}98",
    "T5E2_rjust": "r \\text{ est très proche de 1, l'ajustement affine est justifié.}",
    "T5E2_D": "y = 3{,}1x + 5{,}7",
    "T5E2_est2025": "\\text{En 2025, } x=8 \\implies y = 3{,}1(8) + 5{,}7 = 30{,}5 \\text{ (soit } 30\\,500 \\text{ touristes)}",

    # T5-E3
    "T5E3_conx": "\\text{Le graphe est connexe car toute salle est accessible depuis n'importe quelle autre via les halls (8 et 9).}",
    "T5E3_deg8": "\\text{Degré}(8) = 5 \\quad \\text{(relié à } 1, 2, 3, 7 \\text{ et } 9)",
    "T5E3_ch3": "1 \\to 8 \\to 9 \\to 6",

    # T5-E4
    "T5E4_detA": "\\det(A) = 3 \\neq 0 \\implies A \\text{ est inversible.}",
    "T5E4_AB": "A \\times B = 3 I_3",
    "T5E4_Ainv": "A^{-1} = \\frac{1}{3} B",
    "T5E4_lect": "f(1) = -1 \\quad ; \\quad f'(1) = 2 \\quad ; \\quad f''(1) = 0",
    "T5E4_lims": "\\lim_{x\\to 0^+} f(x) = -\\infty \\; ; \\; \\lim_{x\\to +\\infty} f(x) = +\\infty \\; ; \\; \\lim_{x\\to +\\infty} \\frac{f(x)}{x} = +\\infty",
    "T5E4_T": "(T) : y = f'(1)(x-1) + f(1) = 2(x-1) - 1 = 2x - 3",
    "T5E4_fp": "f'(x) = 2ax + \\frac{b}{x} - \\frac{c}{x^2}",
    "T5E4_fpp": "f''(x) = 2a - \\frac{b}{x^2} + \\frac{2c}{x^3}",
    "T5E4_Smat": "A \\times \\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 2 \\\\ 0 \\end{pmatrix}",
    "T5E4_Sol": "\\begin{pmatrix} a \\\\ b \\\\ c \\end{pmatrix} = \\frac{1}{3} B \\begin{pmatrix} -1 \\\\ 2 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ -2 \\\\ -2 \\end{pmatrix}",
    "T5E4_f": "f(x) = x^2 - 2\\ln(x) - \\frac{2}{x}"
}

with open("src/formulas.json", "r", encoding="utf-8") as f:
    data = json.load(f)

data.update(formulas)

with open("src/formulas.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Formulas T5E2, T5E3 and T5E4 added.")
