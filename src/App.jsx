import { useState, useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import './index.css'
import T from './formulas.json'

// ─── Moteur KaTeX ─────────────────────────────────────────────────────────────
const tex = (s, d = false) => ({ __html: katex.renderToString(s, { throwOnError: false, displayMode: d }) })
const IM = ({ t }) => <span dangerouslySetInnerHTML={tex(t)} />
const BM = ({ t }) => <div className="block-math" dangerouslySetInnerHTML={tex(t, true)} />

// ─── Étape animée ─────────────────────────────────────────────────────────────
const COLORS = ['#1d3a6e','#e0296e','#00b4a6','#7c3aed','#ea7c1e','#16803c','#dc2626']

function Step({ children, index, title }) {
  const ref = useRef(null)
  const color = COLORS[index % COLORS.length]
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('step-visible'); obs.disconnect() }
    }, { threshold: 0.05 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="step step-hidden" style={{ '--step-color': color, '--delay': `${index * 0.1}s` }}>
      <div className="step-number" style={{ background: color }}>{index + 1}</div>
      <div className="step-inner">
        <h3 className="step-title" style={{ color }}>{title}</h3>
        <div className="step-body">{children}</div>
      </div>
    </div>
  )
}

// ─── Exercice T1-E1 ───────────────────────────────────────────────────────────
function Exo_T1_E1() {
  return (
    <>
      <Step index={0} title={<>Calcul du déterminant de <IM t={T.A} /></>}>
        <p>On a <IM t={T.matA} /></p>
        <div className="info-box"><span className="info-label">Méthode :</span> Développement par rapport à la 1ère ligne</div>
        <BM t={T.detL} />
        <BM t={T.detC1} />
        <BM t={T.detC2} />
        <div className="result-box"><IM t={T.detNeq} /> &nbsp;⟹&nbsp; <IM t={T.A} /> est <strong>inversible</strong> ✓</div>
      </Step>

      <Step index={1} title={<>Calcul de <IM t={T.A2} /></>}>
        <p>On calcule <IM t={T.A2P} /> :</p>
        <BM t={T.A2Pm} />
        <div className="info-box">
          <span className="info-label">Détail 1ère ligne :</span>
          <div className="calc-row">colonne 1 : <BM t={T.A2R1a} /></div>
          <div className="calc-row">colonne 2 : <BM t={T.A2R1b} /></div>
          <div className="calc-row">colonne 3 : <BM t={T.A2R1c} /></div>
        </div>
        <div className="result-box"><BM t={T.A2R} /></div>
      </Step>

      <Step index={2} title={<>Calcul de <IM t={T.BdefT} /></>}>
        <BM t={T.Bsub} />
        <div className="result-box"><BM t={T.Bres} /></div>
      </Step>

      <Step index={3} title={<>Montrer que <IM t={T.A3eq} /></>}>
        <p>On factorise : <IM t={T.A3f} /></p>
        <BM t={T.ABP} />
        <div className="info-box">
          <span className="info-label">Détail 1ère ligne :</span>
          <div className="calc-row">entrée (1,1) : <BM t={T.ABR1a} /></div>
          <div className="calc-row">entrée (1,2) : <BM t={T.ABR1b} /></div>
          <div className="calc-row">entrée (1,3) : <BM t={T.ABR1c} /></div>
        </div>
        <div className="result-box"><BM t={T.ABR} /></div>
      </Step>

      <Step index={4} title={<>Déduire <IM t={T.Ainv} /></>}>
        <p>On a <IM t={T.AXB} />, donc en divisant par −7 :</p>
        <BM t={T.AiFr} />
        <div className="result-box"><BM t={T.AiR} /></div>
      </Step>

      <Step index={5} title={<>Résolution du système <IM t={T.S} /></>}>
        <p>On réécrit sous la forme <IM t={T.AXY} /> avec <IM t={T.Ymat} /></p>
        <BM t={T.Xc} />
        <div className="info-box">
          <span className="info-label">Détail x (1ère ligne) :</span>
          <BM t={T.Xc1} />
        </div>
        <div className="result-box"><BM t={T.XR} /></div>
      </Step>

      <Step index={6} title={<>Résolution de <IM t={T.Sp} /> — Logarithmes</>}>
        <div className="info-box"><span className="info-label">Astuce :</span> Poser <IM t={T.lnSub} /></div>
        <BM t={T.lnSys} />
        <p>On retrouve <IM t={T.S} /> ⟹ même solution. Exponentielle :</p>
        <BM t={T.lnF} />
        <div className="result-box"><IM t={T.solSet} /></div>
      </Step>
    </>
  )
}

// ─── Base de données ──────────────────────────────────────────────────────────
const DB = {
  'T1-E1': { title: 'Matrices et Systèmes', badge: 'Algèbre · Sujet 1 · Exercice 1', component: <Exo_T1_E1 /> }
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [exoId, setExoId] = useState('')
  const [input, setInput] = useState('')
  const [correction, setCorrection] = useState(null)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('exo')
    if (id) { const u = id.toUpperCase(); setExoId(u); setInput(u); load(u) }
  }, [])

  const load = (id) => { setSearched(true); setCorrection(DB[id] || null) }

  const submit = (e) => {
    e.preventDefault()
    const id = input.trim().toUpperCase()
    const u = new URL(window.location); u.searchParams.set('exo', id); window.history.pushState({}, '', u)
    setExoId(id); load(id)
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">Soltani <span className="logo-accent">Books</span></div>
        <div className="header-sub">Corrigés Détaillés</div>
      </header>
      <main className="main-content">
        <section className="search-section">
          <h1 className="search-title">Trouvez votre corrigé</h1>
          <p className="search-subtitle">Scannez le QR code ou entrez le code de l'exercice</p>
          <form className="search-box" onSubmit={submit}>
            <input className="search-input" type="text" placeholder="Code exercice (ex: T1-E1)" value={input} onChange={e => setInput(e.target.value)} />
            <button className="search-button" type="submit">Rechercher</button>
          </form>
        </section>

        {searched && correction && (
          <article className="correction-card">
            <div className="card-header">
              <span className="exo-badge">{correction.badge}</span>
              <h2 className="card-title">{correction.title}</h2>
            </div>
            <div className="card-body">{correction.component}</div>
          </article>
        )}

        {searched && !correction && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h2>Corrigé introuvable</h2>
            <p>Le code « {exoId} » n'existe pas encore.</p>
          </div>
        )}
      </main>
      <footer className="footer"><p>© 2026 Soltani Books – Tous droits réservés.</p></footer>
    </div>
  )
}
