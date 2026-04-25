import json

formulas = {
    # T3-E2 (Graphes)
    "T3E2_orient": "M \\text{ n'est pas symétrique (ex: } M_{1,5}=1 \\text{ mais } M_{5,1}=0) \\implies G \\text{ est orienté.}",
    "T3E2_aretes": "\\text{Nombre d'arêtes} = \\text{somme des coefficients de } M = 13",
    "T3E2_eul": "d^+(A) = 1 \\neq d^-(A) = 3 \\implies \\text{Pas de cycle eulérien ni de chaîne eulérienne.}",
    "T3E2_M6": "M^6_{1,1} = 8 \\implies 8 \\text{ chemins de longueur 6 reliant A à A.}",
    "T3E2_cyc": "A-B-C-D-E-F-A \\quad \\text{et} \\quad A-F-E-D-C-B-A",
    "T3E2_poids": "2 + 9 + 2 + 4 + 4 + 6 = 27 \\text{ minutes}",

    # T3-E4 (Ln)
    "T3E4_f": "f(x) = \\frac{\\ln x}{x}",
    "T3E4_lim0": "\\lim_{x\\to 0^+} f(x) = -\\infty \\implies x=0 \\text{ est asymptote verticale.}",
    "T3E4_liminf": "\\lim_{x\\to +\\infty} f(x) = 0 \\implies y=0 \\text{ est asymptote horizontale.}",
    "T3E4_fp": "f'(x) = \\frac{\\frac{1}{x} \\cdot x - \\ln(x) \\cdot 1}{x^2} = \\frac{1 - \\ln x}{x^2}",
    "T3E4_signe": "1 - \\ln x > 0 \\iff \\ln x < 1 \\iff x < e",
    "T3E4_zero": "f(x) = 0 \\iff \\ln x = 0 \\iff x = 1",
    "T3E4_g": "g'(x) = \\frac{1}{2} \\times 2 \\times \\frac{1}{x} \\times \\ln x = \\frac{\\ln x}{x} = f(x)",
    "T3E4_I": "I = \\int_1^e f(x)\\,dx = \\left[ \\frac{(\\ln x)^2}{2} \\right]_1^e = \\frac{1}{2} - 0 = \\frac{1}{2}",
    "T3E4_S": "S = I = \\frac{1}{2} \\text{ ua}"
}

with open("src/formulas.json", "r", encoding="utf-8") as f:
    data = json.load(f)

data.update(formulas)

with open("src/formulas.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Formulas T3E2 and T3E4 added.")
