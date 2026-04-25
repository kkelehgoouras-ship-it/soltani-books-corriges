import json

formulas = {
    # T2-E3
    "T2E3_stat": "\\overline{X}=11\\quad \\overline{Y}=9{,}2\\quad \\sigma_X\\approx 7{,}07\\quad \\sigma_Y\\approx 0{,}35\\quad \\text{Cov}(X,Y)=2{,}3",
    "T2E3_r": "r = \\frac{\\text{Cov}(X,Y)}{\\sigma_X\\sigma_Y} \\approx 0{,}92",
    "T2E3_rint": "r \\text{ est proche de 1, l'ajustement affine est justifi\u00e9.}",
    "T2E3_a": "a = \\frac{\\text{Cov}(X,Y)}{V(X)} = \\frac{2{,}3}{50} = 0{,}046",
    "T2E3_b": "b = \\overline{Y} - a\\overline{X} = 9{,}2 - 0{,}046 \\times 11 = 8{,}694",
    "T2E3_D": "(D) : y = 0{,}046x + 8{,}694",
    "T2E3_est2024": "x=30 \\implies y = 0{,}046(30) + 8{,}694 = 10{,}074\\text{ kg}",
    "T2E3_tot2024": "32{,}5 \\times 1{,}2 = 39\\text{ kg}",
    "T2E3_autres": "39 - 10{,}074 = 28{,}926\\text{ kg}",
    "T2E3_prix": "\\text{D\u00e9pense} = 10{,}074 \\times P_{\\text{mouton}} + 28{,}926 \\times 25 = 1175{,}5",
    "T2E3_pm": "P_{\\text{mouton}} = \\frac{1175{,}5 - 723{,}15}{10{,}074} \\approx 44{,}9\\text{ DT/kg}",

    # T2-E4
    "T2E4_f": "f(x) = e^x - e^{-x} + x",
    "T2E4_imp": "f(-x) = e^{-x} - e^x - x = -(e^x - e^{-x} + x) = -f(x)",
    "T2E4_lim": "\\lim_{x\\to+\\infty} (e^x - e^{-x} + x) = +\\infty - 0 + \\infty = +\\infty",
    "T2E4_limx": "\\lim_{x\\to+\\infty} \\frac{f(x)}{x} = \\lim_{x\\to+\\infty} \\left(\\frac{e^x}{x} - \\frac{e^{-x}}{x} + 1\\right) = +\\infty",
    "T2E4_int": "\\text{La courbe admet une branche parabolique de direction } (Oy)",
    "T2E4_fp": "f'(x) = e^x + e^{-x} + 1 > 0",
    "T2E4_fpp": "f''(x) = e^x - e^{-x}",
    "T2E4_inf": "f''(0) = 0 \\text{ et change de signe } \\implies O(0,0) \\text{ est un point d'inflexion.}",
    "T2E4_T": "(T) : y = f'(0)(x-0) + f(0) = 3x",
    "T2E4_pos": "f(x) - x = e^x - e^{-x} = e^{-x}(e^{2x} - 1)",
    "T2E4_pos2": "e^{2x} - 1 > 0 \\iff x > 0",
    "T2E4_I": "I = \\int_0^1 (e^x - e^{-x}) dx = \\left[ e^x + e^{-x} \\right]_0^1 = (e + e^{-1}) - (1 + 1)",
    "T2E4_I2": "I = e + \\frac{1}{e} - 2 = \\frac{e^2 - 2e + 1}{e}",
    "T2E4_S": "S = \\int_{-1}^1 |f(x)-x| dx = \\int_{-1}^0 (x-f(x)) dx + \\int_0^1 (f(x)-x) dx",
    "T2E4_S2": "S = 2 \\int_0^1 (e^x - e^{-x}) dx = 2I = \\frac{2(e-1)^2}{e} \\approx 2{,}17 \\text{ ua}"
}

with open("src/formulas.json", "r", encoding="utf-8") as f:
    data = json.load(f)

data.update(formulas)

with open("src/formulas.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Formulas updated.")
