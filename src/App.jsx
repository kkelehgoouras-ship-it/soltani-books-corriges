import { useState, useEffect } from 'react'
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
import './index.css'

// Base de données des corrigés
const correctionsDB = {
  'T1-E1': {
    title: 'Matrices et Systèmes (Sujet 1)',
    badge: 'Algèbre - Baccalauréat',
    steps: [
      {
        title: '1. Calcul du déterminant de $A$',
        content: "On a $A = \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}$.\n\nDéveloppons par rapport à la première ligne :\n\n$$\\det(A) = -1 \\begin{vmatrix} 1 & 1 \\\\ -1 & 1 \\end{vmatrix} - (-2) \\begin{vmatrix} 1 & 1 \\\\ 2 & 1 \\end{vmatrix} + 1 \\begin{vmatrix} 1 & 1 \\\\ 2 & -1 \\end{vmatrix}$$\n\n$$\\det(A) = -1(1 - (-1)) + 2(1 - 2) + 1(-1 - 2)$$\n$$\\det(A) = -1(2) + 2(-1) + 1(-3) = -2 - 2 - 3 = -7$$\n\nComme $\\det(A) = -7 \\neq 0$, la matrice $A$ est **inversible**."
      },
      {
        title: '2. a) Calcul de $A^2$',
        content: "$$A^2 = A \\times A = \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix} \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}$$\n\nEn effectuant le produit ligne par colonne, on obtient :\n$$A^2 = \\begin{pmatrix} 1 & -1 & -2 \\\\ 2 & -2 & 3 \\\\ -1 & -6 & 2 \\end{pmatrix}$$"
      },
      {
        title: '2. b) Calcul de la matrice $B = A^2 - A$',
        content: "$$B = \\begin{pmatrix} 1 & -1 & -2 \\\\ 2 & -2 & 3 \\\\ -1 & -6 & 2 \\end{pmatrix} - \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}$$\n\n$$B = \\begin{pmatrix} 2 & 1 & -3 \\\\ 1 & -3 & 2 \\\\ -3 & -5 & 1 \\end{pmatrix}$$"
      },
      {
        title: '3. a) Montrer que $A^3 - A^2 = -7I_3$',
        content: "On remarque que $A^3 - A^2 = A(A^2 - A) = A \\times B$.\nCalculons $A \\times B$ :\n$$A \\times B = \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix} \\begin{pmatrix} 2 & 1 & -3 \\\\ 1 & -3 & 2 \\\\ -3 & -5 & 1 \\end{pmatrix}$$\n$$A \\times B = \\begin{pmatrix} -7 & 0 & 0 \\\\ 0 & -7 & 0 \\\\ 0 & 0 & -7 \\end{pmatrix} = -7I_3$$\n*(Note : il y a une coquille dans l'énoncé, c'est bien $-7I_3$ et non $7I_3$)*."
      },
      {
        title: '3. b) En déduire $A^{-1}$',
        content: "On a $A \\times B = -7I_3$.\nEn divisant par $-7$, on obtient :\n$$A \\times \\left(-\\frac{1}{7}B\\right) = I_3$$\nPar définition de la matrice inverse, on a donc :\n$$A^{-1} = -\\frac{1}{7}B = -\\frac{1}{7}\\begin{pmatrix} 2 & 1 & -3 \\\\ 1 & -3 & 2 \\\\ -3 & -5 & 1 \\end{pmatrix}$$"
      },
      {
        title: '4. Résolution du système $(S)$',
        content: "Le système $(S)$ s'écrit matriciellement $M \\times X = Y$ avec $M = \\begin{pmatrix} 1 & 2 & -1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}$ et $Y = \\begin{pmatrix} -1 \\\\ 2 \\\\ -1 \\end{pmatrix}$.\nCependant, on remarque que la première ligne du système équivaut à $-x - 2y + z = 1$. \nAinsi le système est équivalent à $A \\times X = \\begin{pmatrix} 1 \\\\ 2 \\\\ -1 \\end{pmatrix}$.\n\nOn résout $X = A^{-1} \\begin{pmatrix} 1 \\\\ 2 \\\\ -1 \\end{pmatrix}$ :\n$$X = -\\frac{1}{7} \\begin{pmatrix} 2 & 1 & -3 \\\\ 1 & -3 & 2 \\\\ -3 & -5 & 1 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ 2 \\\\ -1 \\end{pmatrix}$$\n$$X = -\\frac{1}{7} \\begin{pmatrix} 2(1) + 1(2) -3(-1) \\\\ 1(1) - 3(2) + 2(-1) \\\\ -3(1) - 5(2) + 1(-1) \\end{pmatrix} = -\\frac{1}{7} \\begin{pmatrix} 7 \\\\ -7 \\\\ -14 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 2 \\end{pmatrix}$$\n\nL'ensemble des solutions est $S_{\\mathbb{R}^3} = \\{(-1, 1, 2)\\}$."
      },
      {
        title: '5. Déduction pour le système $(S\')$',
        content: "En appliquant les propriétés de la fonction $\\ln$, le système $(S')$ devient :\n$$\\begin{cases} \\ln(a) + 2\\ln(b) - \\ln(c) = -1 \\\\ \\ln(a) + \\ln(b) + \\ln(c) = 2 \\\\ 2\\ln(a) - \\ln(b) + \\ln(c) = -1 \\end{cases}$$\n\nEn posant $x = \\ln(a)$, $y = \\ln(b)$ et $z = \\ln(c)$, on retrouve le système $(S)$.\nDonc $x = -1$, $y = 1$ et $z = 2$.\n\nIl suffit d'appliquer la fonction exponentielle :\n- $a = e^x = e^{-1} = \\frac{1}{e}$\n- $b = e^y = e^1 = e$\n- $c = e^z = e^2$\n\nLes solutions sont $S = \\{(\\frac{1}{e}, e, e^2)\\}$."
      }
    ]
  }
};

function App() {
  const [exoId, setExoId] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [correction, setCorrection] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('exo');
    if (id) {
      setExoId(id.toUpperCase());
      setSearchInput(id.toUpperCase());
      fetchCorrection(id.toUpperCase());
    }
  }, []);

  const fetchCorrection = (id) => {
    setHasSearched(true);
    if (correctionsDB[id]) {
      setCorrection(correctionsDB[id]);
    } else {
      setCorrection(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    
    const id = searchInput.trim().toUpperCase();
    
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('exo', id);
    window.history.pushState({}, '', newUrl);
    
    setExoId(id);
    fetchCorrection(id);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          Soltani <span className="logo-accent">Books</span>
        </div>
        <div style={{fontWeight: 600}}>
          Corrigés Détaillés
        </div>
      </header>

      <main className="main-content">
        <section className="search-section">
          <h1 className="search-title">Trouvez votre corrigé</h1>
          <p className="search-subtitle">Scannez le QR code dans le livre ou entrez le code de l'exercice (ex: T1-E1)</p>
          
          <form className="search-box" onSubmit={handleSearch}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Code exercice (T1-E1)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-button">Rechercher</button>
          </form>
        </section>

        {hasSearched && correction && (
          <article className="correction-card">
            <div className="card-header">
              <span className="exo-badge">{correction.badge}</span>
              <h2 className="card-title">Exercice {exoId} : <Latex>{correction.title}</Latex></h2>
            </div>
            <div className="card-body">
              {correction.steps.map((step, index) => (
                <div key={index} className="step">
                  <h3 className="step-title"><Latex>{step.title}</Latex></h3>
                  <div className="math-block">
                    <Latex>{step.content}</Latex>
                  </div>
                </div>
              ))}
            </div>
          </article>
        )}

        {hasSearched && !correction && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h2>Corrigé introuvable</h2>
            <p>Le corrigé pour le code "{exoId}" n'est pas encore disponible ou le code est incorrect.</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2026 Soltani Books - Tous droits réservés.</p>
      </footer>
    </div>
  )
}

export default App
