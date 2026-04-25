import json

formulas = {
    # T4-E3
    "T4E3_r": "r = \\frac{\\text{Cov}(X,Y)}{\\sigma_X\\sigma_Y} \\approx 0{,}982",
    "T4E3_rjust": "r \\text{ est très proche de 1, l'ajustement affine est justifié.}",
    "T4E3_Z": "z = 0{,}096x + 6{,}080",
    "T4E3_Y": "y = e^z = e^{0{,}096x + 6{,}08} = e^{6{,}08}e^{0{,}096x} \\approx 437e^{0{,}096x}",
    "T4E3_est2026": "\\text{En 2026, } x = 9 \\implies y = 437e^{0{,}096(9)} \\approx 1036 \\text{ clients.}",

    # T4-E4
    "T4E4_prim": "f \\text{ s'annule en } x \\approx 0{,}81 \\text{, et change de signe de négatif à positif.} \\\\ \\implies F \\text{ admet un minimum en } x \\approx 0{,}81 \\implies (C_3) \\text{ représente } F.",
    "T4E4_lect1": "f(1) = 1 \\quad ; \\quad f'(e) = 0",
    "T4E4_lect2": "\\lim_{x\\to 0^+} f(x) = -\\infty \\quad ; \\quad \\lim_{x\\to +\\infty} f(x) = 1",
    "T4E4_val": "f(e) = \\frac{4\\ln(e)+e}{e} = \\frac{4+e}{e} = \\frac{4}{e}+1 \\approx 2{,}47",
    "T4E4_tab": "\\text{Tableau de variation de } f : \\text{croissante sur } ]0;e], \\text{ décroissante sur } [e;+\\infty[",
    "T4E4_TVI": "f \\text{ est continue et strictement croissante sur } ]0;e]. \\\\ f(0{,}81) \\approx -0{,}06 < 0 \\text{ et } f(0{,}83) \\approx 0{,}10 > 0 \\implies \\alpha \\in ]0{,}81; 0{,}83[",
    "T4E4_F": "F'(x) = 2 \\times 2 \\times \\frac{1}{x} \\ln x + 1 = \\frac{4\\ln x}{x} + \\frac{x}{x} = \\frac{4\\ln x + x}{x} = f(x)",
    "T4E4_I": "I = \\int_1^e f(x)dx = F(e) - F(1) = (2\\ln^2(e) + e) - (2\\ln^2(1) + 1)",
    "T4E4_I2": "I = (2 + e) - 1 = e + 1 \\text{ ua}"
}

with open("src/formulas.json", "r", encoding="utf-8") as f:
    data = json.load(f)

data.update(formulas)

with open("src/formulas.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Formulas T4E3 and T4E4 added.")
