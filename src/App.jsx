import { useState, useEffect } from 'react'
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
import './index.css'

// Mock database for corrections (with LaTeX)
const correctionsDB = {
  'T1-E1': {
    title: 'Étude de fonction et Limites',
    badge: 'Analyse - Chapitre 1',
    steps: [
      {
        title: '1. Calcul de la limite en $+\\infty$',
        content: "On factorise par le terme de plus haut degré :\n$$f(x) = x^2\\left(1 - \\frac{2}{x} + \\frac{1}{x^2}\\right)$$\n\nComme $\\lim_{x \\to +\\infty} x^2 = +\\infty$ et $\\lim_{x \\to +\\infty} \\left(1 - \\frac{2}{x} + \\frac{1}{x^2}\\right) = 1$, la limite finale est $+\\infty$."
      },
      {
        title: '2. Calcul de la dérivée',
        content: "On utilise la formule de dérivation d'un polynôme :\n$$f'(x) = 2x - 2 = 2(x - 1)$$\nLa dérivée s'annule en $x = 1$."
      },
      {
        title: '3. Tableau de variation',
        content: "Pour $x < 1$, $f'(x) < 0$ donc $f$ est strictement décroissante.\nPour $x > 1$, $f'(x) > 0$ donc $f$ est strictement croissante.\nLe minimum est atteint en $x = 1$ et vaut $f(1) = -1$."
      }
    ]
  },
  'T2-E3': {
    title: 'Probabilités Conditionnelles',
    badge: 'Probabilités - Chapitre 5',
    steps: [
      {
        title: '1. Arbre de probabilité',
        content: "On construit l'arbre avec $P(A) = 0.6$ et $P(B|A) = 0.8$.\n\nOn a donc $P(\\overline{A}) = 1 - 0.6 = 0.4$."
      },
      {
        title: '2. Calcul de $P(A \\cap B)$',
        content: "D'après la formule des probabilités conditionnelles :\n$$P(A \\cap B) = P(A) \\times P(B|A) = 0.6 \\times 0.8 = 0.48$$"
      },
      {
        title: '3. Formule des probabilités totales',
        content: "Les événements $A$ et $\\overline{A}$ forment une partition de l'univers, donc :\n$$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B) = 0.48 + 0.4 \\times 0.3 = 0.60$$"
      }
    ]
  }
};

function App() {
  const [exoId, setExoId] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [correction, setCorrection] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Check URL params on load (for QR code scans)
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
    
    // Update URL without reloading
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
