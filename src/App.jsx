import { useState, useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import './index.css'
import T from './formulas.json'

// ─── KaTeX ────────────────────────────────────────────────────────────────────
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

// ─── Boîtes ───────────────────────────────────────────────────────────────────
const InfoBox = ({ label, children }) => (
  <div className="info-box"><span className="info-label">{label} :</span> {children}</div>
)
const ResBox = ({ children }) => <div className="result-box">{children}</div>
const CalcRow = ({ label, fkey }) => (
  <div className="calc-row">{label} : <BM t={T[fkey]} /></div>
)

// ─── T1-E1 : Matrices et Systèmes ─────────────────────────────────────────────
function Exo_T1_E1() {
  return (
    <>
      <Step index={0} title={<>Calcul du déterminant de <IM t={T.A} /></>}>
        <p>On a <IM t={T.matA} /></p>
        <InfoBox label="Méthode">Développement par rapport à la 1ère ligne</InfoBox>
        <BM t={T.detL} />
        <BM t={T.detC1} />
        <BM t={T.detC2} />
        <ResBox><IM t={T.detNeq} /> ⟹ <IM t={T.A} /> est <strong>inversible</strong> ✓</ResBox>
      </Step>

      <Step index={1} title={<>Calcul de <IM t={T.A2} /></>}>
        <p>On calcule <IM t={T.A2P} /> :</p>
        <BM t={T.A2Pm} />
        <InfoBox label="Détail 1ère ligne">
          <CalcRow label="colonne 1" fkey="A2R1a" />
          <CalcRow label="colonne 2" fkey="A2R1b" />
          <CalcRow label="colonne 3" fkey="A2R1c" />
        </InfoBox>
        <ResBox><BM t={T.A2R} /></ResBox>
      </Step>

      <Step index={2} title={<>Calcul de <IM t={T.BdefT} /></>}>
        <BM t={T.Bsub} />
        <ResBox><BM t={T.Bres} /></ResBox>
      </Step>

      <Step index={3} title={<>Montrer que <IM t={T.A3eq} /></>}>
        <p>On factorise : <IM t={T.A3f} /></p>
        <BM t={T.ABP} />
        <InfoBox label="Détail 1ère ligne">
          <CalcRow label="entrée (1,1)" fkey="ABR1a" />
          <CalcRow label="entrée (1,2)" fkey="ABR1b" />
          <CalcRow label="entrée (1,3)" fkey="ABR1c" />
        </InfoBox>
        <ResBox><BM t={T.ABR} /></ResBox>
      </Step>

      <Step index={4} title={<>Déduire <IM t={T.Ainv} /></>}>
        <p>On a <IM t={T.AXB} />, donc en divisant par −7 :</p>
        <BM t={T.AiFr} />
        <ResBox><BM t={T.AiR} /></ResBox>
      </Step>

      <Step index={5} title={<>Résolution du système <IM t={T.S} /></>}>
        <p>On réécrit sous la forme <IM t={T.AXY} /> avec <IM t={T.Ymat} /></p>
        <BM t={T.Xc} />
        <InfoBox label="Détail x (1ère ligne)"><BM t={T.Xc1} /></InfoBox>
        <ResBox><BM t={T.XR} /></ResBox>
      </Step>

      <Step index={6} title={<>Résolution de <IM t={T.Sp} /> — Logarithmes</>}>
        <InfoBox label="Astuce">Poser <IM t={T.lnSub} /></InfoBox>
        <BM t={T.lnSys} />
        <p>On retrouve <IM t={T.S} /> ⟹ même solution. Exponentielle :</p>
        <BM t={T.lnF} />
        <ResBox><IM t={T.solSet} /></ResBox>
      </Step>
    </>
  )
}

// ─── T1-E2 : Suites numériques ────────────────────────────────────────────────
function Exo_T1_E2() {
  return (
    <>
      <Step index={0} title={<>Calcul de <IM t="U_1, U_2, U_3" /></>}>
        <p>On a <IM t="U_0=2" /> et <IM t="U_{n+1}=\dfrac{1}{U_n}+\dfrac{U_n}{2}" />.</p>
        <BM t={T.T1E2_U0} />
        <BM t={T.T1E2_U2} />
        <BM t={T.T1E2_U3} />
        <InfoBox label="Conclusion">
          Si la suite était arithmétique : <IM t="U_2-U_1=U_1-U_0" />, soit <IM t="-0{,}85\neq 0{,}5" />. ✗<br/>
          Si géométrique : <IM t="U_2/U_1=U_1/U_0" />, soit <IM t="0{,}66\neq1{,}25" />. ✗
        </InfoBox>
      </Step>

      <Step index={1} title={<>Montrer que <IM t="U_{n+1}-\sqrt{2}=\frac{(U_n-\sqrt{2})^2}{2U_n}" /></>}>
        <p>On développe :</p>
        <BM t={T.T1E2_rec} />
        <ResBox>Identité vérifiée ✓</ResBox>
      </Step>

      <Step index={2} title={<>Montrer que <IM t="U_n\geq\sqrt{2}" /></>}>
        <InfoBox label="Initialisation"><IM t="U_0=2\geq\sqrt{2}" /> ✓</InfoBox>
        <InfoBox label="Hérédité"><BM t={T.T1E2_pos} /></InfoBox>
        <ResBox>Par récurrence : <IM t="U_n\geq\sqrt{2}" /> pour tout <IM t="n\in\mathbb{N}" /> ✓</ResBox>
      </Step>

      <Step index={3} title="Suite décroissante et convergente">
        <p>On calcule <IM t="U_{n+1}-U_n" /> :</p>
        <BM t={T.T1E2_dec} />
        <BM t={T.T1E2_lim} />
        <ResBox>La suite est décroissante et minorée par <IM t="\sqrt{2}" /> ⟹ <strong>convergente</strong> ✓</ResBox>
      </Step>

      <Step index={4} title={<>Déterminer la limite <IM t="L" /></>}>
        <p>Soit <IM t="f(x)=\dfrac{1}{x}+\dfrac{x}{2}" />. À la limite : <IM t="f(L)=L" /></p>
        <BM t={T.T1E2_fL} />
        <ResBox><IM t="L=\sqrt{2}" /></ResBox>
      </Step>
    </>
  )
}

// ─── T1-E3 : Statistiques (Ajustement affine) ─────────────────────────────────
function Exo_T1_E3() {
  return (
    <>
      <Step index={0} title="Méthode de Mayer — Droite de régression">
        <InfoBox label="Données">Années 2015–2024, rangs <IM t="x_i\in[0;9]" /></InfoBox>
        <InfoBox label="Résultats">
          <BM t={T.T1E3_stat} />
        </InfoBox>
        <InfoBox label="Droite de Mayer vérifiée"><BM t={T.T1E3_mayer_D} /></InfoBox>
        <ResBox>
          Estimation 2025 (rang 10) : <BM t={T.T1E3_est2025} />
        </ResBox>
      </Step>

      <Step index={1} title="Ajustement exponentiel — Changement de variable">
        <InfoBox label="Méthode">On pose <IM t="Z=\ln(Y)" /> pour linéariser</InfoBox>
        <InfoBox label="Coefficient de corrélation"><BM t={T.T1E3_r} /></InfoBox>
        <InfoBox label="Droite d'ajustement de Z en X"><BM t={T.T1E3_Zline} /></InfoBox>
        <ResBox>
          <IM t="Y=e^Z" />, estimation 2025 : <BM t={T.T1E3_Y2025} />
        </ResBox>
      </Step>

      <Step index={2} title="Quel ajustement choisir ?">
        <InfoBox label="Vérification 2023">
          Consommation réelle : <IM t="68{,}9\times0{,}028=1929{,}2" /> millions de DT (rang 8)
        </InfoBox>
        <InfoBox label="Affine (rang 8)"><IM t="150{,}76\times8+187{,}68=1393{,}76" /></InfoBox>
        <InfoBox label="Exponentiel (rang 8)"><IM t="e^{0{,}263\times8+5{,}68}=e^{7{,}784}\approx2398" /></InfoBox>
        <ResBox>L'ajustement <strong>affine</strong> donne l'estimation la plus proche de la réalité ✓</ResBox>
      </Step>
    </>
  )
}

// ─── T2-E1 : Matrices et Applications ─────────────────────────────────────────
function Exo_T2_E1() {
  return (
    <>
      <Step index={0} title={<>Déterminant de <IM t="A" /> en fonction de <IM t="\alpha" /></>}>
        <p>On a <IM t={T.T2E1_matA2} /> avec <IM t="\alpha\in\mathbb{R}" />.</p>
        <BM t={T.T2E1_detA} />
        <BM t={T.T2E1_detA2} />
        <ResBox>
          <IM t="\det(A)=2\alpha-2" />. <IM t="A" /> inversible <IM t="\iff\det(A)\neq0\iff\alpha\neq1" />
        </ResBox>
      </Step>

      <Step index={1} title={<>Trouver <IM t="\alpha" /> tel que <IM t="A\times B=2I_3" /></>}>
        <p>On calcule <IM t="A\times B" /> pour une valeur générale de <IM t="\alpha" /> :</p>
        <BM t={T.T2E1_AB2I} />
        <InfoBox label="Résolution">En identifiant avec <IM t="2I_3" />, on obtient <IM t="\alpha=2" /></InfoBox>
        <ResBox>Pour <IM t="\alpha=2" /> : <BM t={T.T2E1_Ainv2} /></ResBox>
      </Step>

      <Step index={2} title={<>Mise en équation du système <IM t="(S)" /></>}>
        <InfoBox label="Variables">
          <IM t="x" /> = nb de couples, <IM t="y" /> = nb de femmes, <IM t="z" /> = nb d'enfants
        </InfoBox>
        <p>Les 3 conditions (70 voyageurs, 1250 DT, écart de 5) donnent :</p>
        <BM t={T.T2E1_sys} />
        <InfoBox label="Écriture matricielle"><IM t="AX=V" /> avec la matrice <IM t="A" /> ci-dessus</InfoBox>
      </Step>

      <Step index={3} title={<>Résolution du système <IM t="(S)" /></>}>
        <BM t={T.T2E1_Xsol} />
        <ResBox><BM t={T.T2E1_sol} /></ResBox>
      </Step>
    </>
  )
}

// ─── T2-E2 : Suites numériques ────────────────────────────────────────────────
function Exo_T2_E2() {
  return (
    <>
      <Step index={0} title={<>Calcul de <IM t="U_1" />, <IM t="U_2" />, monotonie</>}>
        <InfoBox label="Calculs directs">
          <BM t="U_1=e^0\cdot U_0=1\cdot1=1" />
          <BM t="U_2=e^{-1}\cdot U_1=\tfrac{1}{e}" />
        </InfoBox>
        <InfoBox label="Positivité (récurrence)">
          <IM t="U_0=1>0" />. Si <IM t="U_n>0" />, alors <IM t="U_{n+1}=e^{-n}U_n>0" /> ✓
        </InfoBox>
        <InfoBox label="Décroissance">
          <IM t="e^{-n}\leq1" /> pour tout <IM t="n\in\mathbb{N}" />, donc <IM t="U_{n+1}=e^{-n}U_n\leq U_n" /> ✓
        </InfoBox>
        <ResBox>Suite positive, décroissante ⟹ <strong>convergente</strong> ✓</ResBox>
      </Step>

      <Step index={1} title={<>Étude de <IM t="V_n=\ln(U_n)" /></>}>
        <p>Relation de récurrence :</p>
        <BM t={T.T2E2_Vrec} />
        <InfoBox label="Formule explicite (récurrence)">
          <BM t="V_n=V_0+\sum_{k=0}^{n-1}(-k)=0-\frac{n(n-1)}{2}" />
          <BM t={T.T2E2_Vn} />
        </InfoBox>
      </Step>

      <Step index={2} title={<>Formule explicite de <IM t="U_n" /></>}>
        <BM t={T.T2E2_Un} />
        <ResBox>
          Limite : <BM t={T.T2E2_lim} />
        </ResBox>
      </Step>
    </>
  )
}

// ─── Base de données ──────────────────────────────────────────────────────────
const DB = {
  'T1-E1': { title: 'Matrices et Systèmes',    badge: 'Sujet 1 · Exercice 1 · Algèbre',    component: <Exo_T1_E1 /> },
  'T1-E2': { title: 'Suites Numériques',        badge: 'Sujet 1 · Exercice 2 · Analyse',    component: <Exo_T1_E2 /> },
  'T1-E3': { title: 'Statistiques',             badge: 'Sujet 1 · Exercice 3 · Statistiques', component: <Exo_T1_E3 /> },
  'T2-E1': { title: 'Matrices et Applications', badge: 'Sujet 2 · Exercice 1 · Algèbre',    component: <Exo_T2_E1 /> },
  'T2-E2': { title: 'Suites Numériques',        badge: 'Sujet 2 · Exercice 2 · Analyse',    component: <Exo_T2_E2 /> },
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
          <div className="available-codes">
            <span>Disponibles :</span>
            {Object.keys(DB).map(k => (
              <button key={k} className="code-chip" onClick={() => { setInput(k); setExoId(k); load(k); const u = new URL(window.location); u.searchParams.set('exo', k); window.history.pushState({}, '', u) }}>{k}</button>
            ))}
          </div>
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
