import { useState, useEffect } from 'react'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import './index.css'

// ─── Constantes LaTeX ─────────────────────────────────────────────────────────
// Définies comme const JS pour éviter tout problème d'échappement JSX
const matA       = "A = \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}"
const detExpand  = "\\det(A) = -1 \\begin{vmatrix} 1 & 1 \\\\ -1 & 1 \\end{vmatrix} - (-2) \\begin{vmatrix} 1 & 1 \\\\ 2 & 1 \\end{vmatrix} + 1 \\begin{vmatrix} 1 & 1 \\\\ 2 & -1 \\end{vmatrix}"
const detStep1   = "\\det(A) = -1(1-(-1)) + 2(1-2) + 1(-1-2)"
const detResult  = "\\det(A) = -1(2) + 2(-1) + 1(-3) = -2-2-3 = -7"
const detNeq     = "\\det(A) = -7 \\neq 0"

const matA2prod  = "A^2 = A \\times A = \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix} \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}"
const matA2res   = "A^2 = \\begin{pmatrix} 1 & -1 & -2 \\\\ 2 & -2 & 3 \\\\ -1 & -6 & 2 \\end{pmatrix}"

const matBsub    = "B = \\begin{pmatrix} 1 & -1 & -2 \\\\ 2 & -2 & 3 \\\\ -1 & -6 & 2 \\end{pmatrix} - \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}"
const matBres    = "B = \\begin{pmatrix} 2 & 1 & -3 \\\\ 1 & -3 & 2 \\\\ -3 & -5 & 1 \\end{pmatrix}"

const matABprod  = "A \\times B = \\begin{pmatrix} -1 & -2 & 1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix} \\begin{pmatrix} 2 & 1 & -3 \\\\ 1 & -3 & 2 \\\\ -3 & -5 & 1 \\end{pmatrix}"
const matABres   = "A \\times B = \\begin{pmatrix} -7 & 0 & 0 \\\\ 0 & -7 & 0 \\\\ 0 & 0 & -7 \\end{pmatrix} = -7I_3"
const matAxB     = "A \\times B = -7I_3"
const Ainvfrac   = "A \\times \\left(-\\frac{1}{7}B\\right) = I_3"
const Ainvres    = "A^{-1} = -\\frac{1}{7}B = -\\frac{1}{7}\\begin{pmatrix} 2 & 1 & -3 \\\\ 1 & -3 & 2 \\\\ -3 & -5 & 1 \\end{pmatrix}"

const sysMatM    = "M = \\begin{pmatrix} 1 & 2 & -1 \\\\ 1 & 1 & 1 \\\\ 2 & -1 & 1 \\end{pmatrix}"
const sysMatY    = "Y = \\begin{pmatrix} -1 \\\\ 2 \\\\ -1 \\end{pmatrix}"
const sysAX      = "A \\times X = \\begin{pmatrix} 1 \\\\ 2 \\\\ -1 \\end{pmatrix}"
const sysXinv    = "X = A^{-1} \\begin{pmatrix} 1 \\\\ 2 \\\\ -1 \\end{pmatrix}"
const sysCalc1   = "X = -\\frac{1}{7} \\begin{pmatrix} 2 & 1 & -3 \\\\ 1 & -3 & 2 \\\\ -3 & -5 & 1 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ 2 \\\\ -1 \\end{pmatrix}"
const sysCalc2   = "X = -\\frac{1}{7} \\begin{pmatrix} 2(1)+1(2)-3(-1) \\\\ 1(1)-3(2)+2(-1) \\\\ -3(1)-5(2)+1(-1) \\end{pmatrix} = -\\frac{1}{7} \\begin{pmatrix} 7 \\\\ -7 \\\\ -14 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 2 \\end{pmatrix}"
const sysSol     = "S_{\\mathbb{R}^3} = \\{(-1,\\, 1,\\, 2)\\}"

const sysPrimeSys = "\\begin{cases} \\ln(a) + 2\\ln(b) - \\ln(c) = -1 \\\\ \\ln(a) + \\ln(b) + \\ln(c) = 2 \\\\ 2\\ln(a) - \\ln(b) + \\ln(c) = -1 \\end{cases}"
const sysPrimeSol = "S = \\left\\{\\left(\\tfrac{1}{e},\\, e,\\, e^2\\right)\\right\\}"

// ─── Base de données des corrigés ─────────────────────────────────────────────
const correctionsDB = {
  'T1-E1': {
    title: 'Matrices et Systèmes (Sujet 1)',
    badge: 'Algèbre - Baccalauréat',
    steps: [
      {
        title: <>1. Calcul du déterminant de <InlineMath math={"A"} /></>,
        content: (
          <>
            <p>On a <InlineMath math={matA} />.</p>
            <p>Développons par rapport à la première ligne :</p>
            <BlockMath math={detExpand} />
            <BlockMath math={detStep1} />
            <BlockMath math={detResult} />
            <p>Comme <InlineMath math={detNeq} />, la matrice <InlineMath math={"A"} /> est <strong>inversible</strong>.</p>
          </>
        )
      },
      {
        title: <>2. a) Calcul de <InlineMath math={"A^2"} /></>,
        content: (
          <>
            <BlockMath math={matA2prod} />
            <p>En effectuant le produit ligne par colonne, on obtient :</p>
            <BlockMath math={matA2res} />
          </>
        )
      },
      {
        title: <>2. b) Calcul de la matrice <InlineMath math={"B = A^2 - A"} /></>,
        content: (
          <>
            <BlockMath math={matBsub} />
            <BlockMath math={matBres} />
          </>
        )
      },
      {
        title: <>3. a) Montrer que <InlineMath math={"A^3 - A^2 = -7I_3"} /></>,
        content: (
          <>
            <p>On remarque que <InlineMath math={"A^3 - A^2 = A(A^2-A) = A \\times B"} />.</p>
            <p>Calculons <InlineMath math={"A \\times B"} /> :</p>
            <BlockMath math={matABprod} />
            <BlockMath math={matABres} />
            <p><em>Note : l'énoncé du livre contient une coquille, c'est bien <InlineMath math={"-7I_3"} /> et non <InlineMath math={"7I_3"} />.</em></p>
          </>
        )
      },
      {
        title: <>3. b) En déduire <InlineMath math={"A^{-1}"} /></>,
        content: (
          <>
            <p>On a <InlineMath math={matAxB} />.</p>
            <p>En divisant par <InlineMath math={"-7"} /> :</p>
            <BlockMath math={Ainvfrac} />
            <p>Par définition de la matrice inverse :</p>
            <BlockMath math={Ainvres} />
          </>
        )
      },
      {
        title: <>4. Résolution du système <InlineMath math={"(S)"} /></>,
        content: (
          <>
            <p>Le système s'écrit matriciellement <InlineMath math={"M \\times X = Y"} /> avec <InlineMath math={sysMatM} /> et <InlineMath math={sysMatY} />.</p>
            <p>La première ligne équivaut à <InlineMath math={"-x - 2y + z = 1"} />, soit le système <InlineMath math={sysAX} />.</p>
            <p>On résout <InlineMath math={sysXinv} /> :</p>
            <BlockMath math={sysCalc1} />
            <BlockMath math={sysCalc2} />
            <p>Ensemble des solutions : <InlineMath math={sysSol} />.</p>
          </>
        )
      },
      {
        title: <>5. Déduction pour le système <InlineMath math={"(S')"} /></>,
        content: (
          <>
            <p>Le système <InlineMath math={"(S')"} /> avec <InlineMath math={"x=\\ln(a)"} />, <InlineMath math={"y=\\ln(b)"} />, <InlineMath math={"z=\\ln(c)"} /> :</p>
            <BlockMath math={sysPrimeSys} />
            <p>On retrouve le système <InlineMath math={"(S)"} /> avec solution <InlineMath math={"x=-1"} />, <InlineMath math={"y=1"} />, <InlineMath math={"z=2"} />.</p>
            <p>En appliquant l'exponentielle :</p>
            <ul>
              <li><InlineMath math={"a = e^{-1} = 1/e"} /></li>
              <li><InlineMath math={"b = e^1 = e"} /></li>
              <li><InlineMath math={"c = e^2"} /></li>
            </ul>
            <p>Solutions : <InlineMath math={sysPrimeSol} />.</p>
          </>
        )
      }
    ]
  }
}

// ─── Composant App ─────────────────────────────────────────────────────────────
function App() {
  const [exoId, setExoId] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [correction, setCorrection] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('exo')
    if (id) {
      const up = id.toUpperCase()
      setExoId(up)
      setSearchInput(up)
      fetchCorrection(up)
    }
  }, [])

  const fetchCorrection = (id) => {
    setHasSearched(true)
    setCorrection(correctionsDB[id] || null)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchInput.trim()) return
    const id = searchInput.trim().toUpperCase()
    const newUrl = new URL(window.location)
    newUrl.searchParams.set('exo', id)
    window.history.pushState({}, '', newUrl)
    setExoId(id)
    fetchCorrection(id)
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">Soltani <span className="logo-accent">Books</span></div>
        <div style={{fontWeight: 600}}>Corrigés Détaillés</div>
      </header>

      <main className="main-content">
        <section className="search-section">
          <h1 className="search-title">Trouvez votre corrigé</h1>
          <p className="search-subtitle">Scannez le QR code ou entrez le code de l'exercice (ex : T1-E1)</p>
          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Code exercice (T1-E1)..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
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
              {correction.steps.map((step, i) => (
                <div key={i} className="step">
                  <h3 className="step-title">{step.title}</h3>
                  <div className="math-block">{step.content}</div>
                </div>
              ))}
            </div>
          </article>
        )}

        {hasSearched && !correction && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h2>Corrigé introuvable</h2>
            <p>Le code « {exoId} » n'existe pas encore ou est incorrect.</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2026 Soltani Books – Tous droits réservés.</p>
      </footer>
    </div>
  )
}

export default App
