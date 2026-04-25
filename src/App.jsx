import { useState, useEffect } from 'react'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import './index.css'

// Base de données des corrigés avec JSX et react-katex (utilisation de l'évaluation JS pure)
const correctionsDB = {
  'T1-E1': {
    title: 'Matrices et Systèmes (Sujet 1)',
    badge: 'Algèbre - Baccalauréat',
    steps: [
      {
        title: <>1. Calcul du déterminant de <InlineMath math={"A"} /></>,
        content: (
          <>
            <p>On a <InlineMath math={"A = \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}"} />.</p>
            <p>Développons par rapport à la première ligne :</p>
            <BlockMath math={"\\det(A) = -1 \\begin{vmatrix} 1 & 1 \\\\ -1 & 1 \\end{vmatrix} - (-2) \\begin{vmatrix} 1 & 1 \\\\ 2 & 1 \\end{vmatrix} + 1 \\begin{vmatrix} 1 & 1 \\\\ 2 & -1 \\end{vmatrix}"} />
            <BlockMath math={"\\det(A) = -1(1 - (-1)) + 2(1 - 2) + 1(-1 - 2)"} />
            <BlockMath math={"\\det(A) = -1(2) + 2(-1) + 1(-3) = -2 - 2 - 3 = -7"} />
            <p>Comme <InlineMath math={"\\det(A) = -7 \\neq 0"} />, la matrice <InlineMath math={"A"} /> est <strong>inversible</strong>.</p>
          </>
        )
      },
      {
        title: <>2. a) Calcul de <InlineMath math={"A^2"} /></>,
        content: (
          <>
            <BlockMath math={"A^2 = A \\times A = \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix} \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}"} />
            <p>En effectuant le produit ligne par colonne, on obtient :</p>
            <BlockMath math={"A^2 = \\begin{pmatrix} 1 & -1 & -2 \\\\ 2 & -2 & 3 \\\\ -1 & -6 & 2 \\end{pmatrix}"} />
          </>
        )
      },
      {
        title: <>2. b) Calcul de la matrice <InlineMath math={"B = A^2 - A"} /></>,
        content: (
          <>
            <BlockMath math={"B = \\begin{pmatrix} 1 & -1 & -2 \\\\ 2 & -2 & 3 \\\\ -1 & -6 & 2 \\end{pmatrix} - \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}"} />
            <BlockMath math={"B = \\begin{pmatrix} 2 & 1 & -3 \\\\ 1 & -3 & 2 \\\\ -3 & -5 & 1 \\end{pmatrix}"} />
          </>
        )
      },
      {
        title: <>3. a) Montrer que <InlineMath math={"A^3 - A^2 = -7I_3"} /></>,
        content: (
          <>
            <p>On remarque que <InlineMath math={"A^3 - A^2 = A(A^2 - A) = A \\times B"} />.</p>
            <p>Calculons <InlineMath math={"A \\times B"} /> :</p>
            <BlockMath math={"A \\times B = \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix} \\begin{pmatrix} 2 & 1 & -3 \\\\ 1 & -3 & 2 \\\\ -3 & -5 & 1 \\end{pmatrix}"} />
            <BlockMath math={"A \\times B = \\begin{pmatrix} -7 & 0 & 0 \\\\ 0 & -7 & 0 \\\\ 0 & 0 & -7 \\end{pmatrix} = -7I_3"} />
            <p><em>(Note : il y a une coquille dans l'énoncé du livre, c'est bien <InlineMath math={"-7I_3"} /> et non <InlineMath math={"7I_3"} />)</em>.</p>
          </>
        )
      },
      {
        title: <>3. b) En déduire <InlineMath math={"A^{-1}"} /></>,
        content: (
          <>
            <p>On a <InlineMath math={"A \\times B = -7I_3"} />.</p>
            <p>En divisant par <InlineMath math={"-7"} />, on obtient :</p>
            <BlockMath math={"A \\times \\left(-\\frac{1}{7}B\\right) = I_3"} />
            <p>Par définition de la matrice inverse, on a donc :</p>
            <BlockMath math={"A^{-1} = -\\frac{1}{7}B = -\\frac{1}{7}\\begin{pmatrix} 2 & 1 & -3 \\\\ 1 & -3 & 2 \\\\ -3 & -5 & 1 \\end{pmatrix}"} />
          </>
        )
      },
      {
        title: <>4. Résolution du système <InlineMath math={"(S)"} /></>,
        content: (
          <>
            <p>Le système <InlineMath math={"(S)"} /> s'écrit matriciellement <InlineMath math={"M \\times X = Y"} /> avec <InlineMath math={"M = \\begin{pmatrix} 1 & 2 & -1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}"} /> et <InlineMath math={"Y = \\begin{pmatrix} -1 \\\\ 2 \\\\ -1 \\end{pmatrix}"} />.</p>
            <p>Cependant, on remarque que la première ligne du système équivaut à <InlineMath math={"-x - 2y + z = 1"} />.</p>
            <p>Ainsi le système est équivalent à <InlineMath math={"A \\times X = \\begin{pmatrix} 1 \\\\ 2 \\\\ -1 \\end{pmatrix}"} />.</p>
            <p>On résout <InlineMath math={"X = A^{-1} \\begin{pmatrix} 1 \\\\ 2 \\\\ -1 \\end{pmatrix}"} /> :</p>
            <BlockMath math={"X = -\\frac{1}{7} \\begin{pmatrix} 2 & 1 & -3 \\\\ 1 & -3 & 2 \\\\ -3 & -5 & 1 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ 2 \\\\ -1 \\end{pmatrix}"} />
            <BlockMath math={"X = -\\frac{1}{7} \\begin{pmatrix} 2(1) + 1(2) -3(-1) \\\\ 1(1) - 3(2) + 2(-1) \\\\ -3(1) - 5(2) + 1(-1) \\end{pmatrix} = -\\frac{1}{7} \\begin{pmatrix} 7 \\\\ -7 \\\\ -14 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 2 \\end{pmatrix}"} />
            <p>L'ensemble des solutions est <InlineMath math={"S_{\\mathbb{R}^3} = \\{(-1, 1, 2)\\}"} />.</p>
          </>
        )
      },
      {
        title: <>5. Déduction pour le système <InlineMath math={"(S')"} /></>,
        content: (
          <>
            <p>En appliquant les propriétés de la fonction <InlineMath math={"\\ln"} />, le système <InlineMath math={"(S')"} /> devient :</p>
            <BlockMath math={"\\begin{cases} \\ln(a) + 2\\ln(b) - \\ln(c) = -1 \\\\ \\ln(a) + \\ln(b) + \\ln(c) = 2 \\\\ 2\\ln(a) - \\ln(b) + \\ln(c) = -1 \\end{cases}"} />
            <p>En posant <InlineMath math={"x = \\ln(a)"} />, <InlineMath math={"y = \\ln(b)"} /> et <InlineMath math={"z = \\ln(c)"} />, on retrouve le système <InlineMath math={"(S)"} />.</p>
            <p>Donc <InlineMath math={"x = -1"} />, <InlineMath math={"y = 1"} /> et <InlineMath math={"z = 2"} />.</p>
            <p>Il suffit d'appliquer la fonction exponentielle :</p>
            <ul>
              <li><InlineMath math={"a = e^x = e^{-1} = \\frac{1}{e}"} /></li>
              <li><InlineMath math={"b = e^y = e^1 = e"} /></li>
              <li><InlineMath math={"c = e^z = e^2"} /></li>
            </ul>
            <p>Les solutions sont <InlineMath math={"S = \\left\\{\\left(\\frac{1}{e}, e, e^2\\right)\\right\\}"} />.</p>
          </>
        )
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
              <h2 className="card-title">Exercice {exoId} : {correction.title}</h2>
            </div>
            <div className="card-body">
              {correction.steps.map((step, index) => (
                <div key={index} className="step">
                  <h3 className="step-title">{step.title}</h3>
                  <div className="math-block">
                    {step.content}
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
