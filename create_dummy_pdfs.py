import os

exercises = [
    'T1-E1', 'T1-E2', 'T1-E3', 'T1-E4',
    'T2-E1', 'T2-E2', 'T2-E3', 'T2-E4',
    'T3-E1', 'T3-E2', 'T3-E3', 'T3-E4',
    'T4-E1', 'T4-E2', 'T4-E3', 'T4-E4',
    'T5-E1', 'T5-E2', 'T5-E3', 'T5-E4'
]

os.makedirs('public/assets', exist_ok=True)

for exo in exercises:
    path = f'public/assets/{exo}.pdf'
    if not os.path.exists(path):
        # Create a tiny valid PDF file
        # A minimal PDF is just enough so the browser downloads it without error
        minimal_pdf = b"%PDF-1.1\n%\xc2\xa5\xc2\xb1\xc3\xab\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595 842] /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length 48 >>\nstream\nBT /F1 24 Tf 100 700 Td (Correction en cours...) Tj ET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000017 00000 n \n0000000067 00000 n \n0000000125 00000 n \n0000000234 00000 n \n0000000322 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n421\n%%EOF"
        with open(path, 'wb') as f:
            f.write(minimal_pdf)
        print(f"Created {path}")
