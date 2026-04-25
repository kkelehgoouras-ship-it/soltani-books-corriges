import { useState, useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import './index.css'
import T from './formulas.json'
import { ScatterPlot, FunctionCurve, VariationTable } from './charts.jsx'

const tex = (s, d = false) => ({ __html: katex.renderToString(s, { throwOnError: false, displayMode: d }) })
const IM = ({ t }) => <span dangerouslySetInnerHTML={tex(t)} />
const BM = ({ t }) => <div className="block-math" dangerouslySetInnerHTML={tex(t, true)} />

const COLORS = ['#1d3a6e','#e0296e','#00b4a6','#7c3aed','#ea7c1e','#16803c','#dc2626']
function Step({ children, index, title }) {
  const ref = useRef(null)
  const color = COLORS[index % COLORS.length]
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('step-visible'); obs.disconnect() } }, { threshold: 0.05 })
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
const IB = ({ label, children }) => <div className="info-box"><span className="info-label">{label} :</span> {children}</div>
const RB = ({ children }) => <div className="result-box">{children}</div>
const CR = ({ label, fkey }) => <div className="calc-row">{label} : <BM t={T[fkey]} /></div>

// ── Raisonnement par récurrence ───────────────────────────────────────────────
function Rec({ prop, verif, suppo, demo }) {
  return (
    <div className="rec-box">
      <div className="rec-prop"><span className="rec-label">Propriété à démontrer</span>{prop}</div>
      <div className="rec-steps">
        <div className="rec-step rec-init">
          <div className="rec-step-badge">① Vérification</div>
          <div className="rec-step-body">{verif}</div>
        </div>
        <div className="rec-step rec-hyp">
          <div className="rec-step-badge">② Supposition (H.R.)</div>
          <div className="rec-step-body">{suppo}</div>
        </div>
        <div className="rec-step rec-demo">
          <div className="rec-step-badge">③ Démonstration</div>
          <div className="rec-step-body">{demo}</div>
        </div>
      </div>
    </div>
  )
}

// ── T1-E1 ─────────────────────────────────────────────────────────────────────
function T1E1() { return (<>
  <Step index={0} title={<>Déterminant de <IM t={T.A} /></>}>
    <p>On a <IM t={T.matA} /></p>
    <IB label="Méthode">Développement 1ère ligne</IB>
    <BM t={T.detL} /><BM t={T.detC1} /><BM t={T.detC2} />
    <RB><IM t={T.detNeq} /> ⟹ <IM t={T.A} /> <strong>inversible</strong> ✓</RB>
  </Step>
  <Step index={1} title={<>Calcul de <IM t={T.A2} /></>}>
    <p>On calcule <IM t={T.A2P} /> :</p><BM t={T.A2Pm} />
    <IB label="Détail 1ère ligne"><CR label="col 1" fkey="A2R1a" /><CR label="col 2" fkey="A2R1b" /><CR label="col 3" fkey="A2R1c" /></IB>
    <RB><BM t={T.A2R} /></RB>
  </Step>
  <Step index={2} title={<>Calcul de <IM t={T.BdefT} /></>}>
    <BM t={T.Bsub} /><RB><BM t={T.Bres} /></RB>
  </Step>
  <Step index={3} title={<>Montrer que <IM t={T.A3eq} /></>}>
    <p>On a <IM t={T.A3f} /></p><BM t={T.ABP} />
    <IB label="Détail 1ère ligne"><CR label="(1,1)" fkey="ABR1a" /><CR label="(1,2)" fkey="ABR1b" /><CR label="(1,3)" fkey="ABR1c" /></IB>
    <RB><BM t={T.ABR} /></RB>
  </Step>
  <Step index={4} title={<>Déduire <IM t={T.Ainv} /></>}>
    <p>On a <IM t={T.AXB} /> :</p><BM t={T.AiFr} /><RB><BM t={T.AiR} /></RB>
  </Step>
  <Step index={5} title={<>Résolution de <IM t={T.S} /></>}>
    <p>Forme <IM t={T.AXY} /> avec <IM t={T.Ymat} /></p><BM t={T.Xc} />
    <IB label="Détail x"><BM t={T.Xc1} /></IB>
    <RB><BM t={T.XR} /></RB>
  </Step>
  <Step index={6} title={<>Déduction pour <IM t={T.Sp} /></>}>
    <IB label="Astuce">Poser <IM t={T.lnSub} /></IB>
    <BM t={T.lnSys} />
    <p>Même solution. Exponentielle :</p><BM t={T.lnF} />
    <RB><IM t={T.solSet} /></RB>
  </Step>
</>)}

// ── T1-E2 ─────────────────────────────────────────────────────────────────────
function T1E2() { return (<>
  <Step index={0} title={<>Calcul de <IM t="U_1, U_2, U_3" /></>}>
    <IB label="Formule"><IM t="U_{n+1}=\dfrac{1}{U_n}+\dfrac{U_n}{2}" /></IB>
    <BM t={T.T1E2_U0} /><BM t={T.T1E2_U2} /><BM t={T.T1E2_U3} />
    <IB label="Test arithmétique — condition a+c=2b">
      <BM t={T.T1E2_arith} />
    </IB>
    <IB label="Test géométrique — condition a×c=b²">
      <BM t={T.T1E2_geom} />
    </IB>
    <RB>La suite n'est <strong>ni arithmétique ni géométrique</strong> ✓</RB>
  </Step>
  <Step index={1} title={<>Identité <IM t="U_{n+1}-\sqrt{2}=\frac{(U_n-\sqrt{2})^2}{2U_n}" /></>}>
    <BM t={T.T1E2_rec} /><RB>Identité vérifiée ✓</RB>
  </Step>
  <Step index={2} title={<>Montrer que <IM t="U_n\geq\sqrt{2}" /> pour tout <IM t="n\in\mathbb{N}" /></>}>
    <Rec
      prop={<><IM t="P(n)" /> : <IM t="U_n\geq\sqrt{2}" /></>}
      verif={<><p><strong>n = 0 :</strong></p><BM t="U_0=2\geq\sqrt{2}\approx1{,}41" /><p>✓ vrai au rang 0</p></>}
      suppo={<><p>Supposons <IM t="U_n\geq\sqrt{2}" /> pour un <IM t="n" /> fixé.</p><p>On veut montrer <IM t="U_{n+1}\geq\sqrt{2}" />.</p></>}
      demo={<><p>D'après l'identité démontrée à l'étape précédente :</p><BM t={T.T1E2_pos} /><p>Donc <IM t="U_{n+1}\geq\sqrt{2}" /> ✓</p></>}
    />
    <RB>Par récurrence : <IM t="U_n\geq\sqrt{2}" /> pour tout <IM t="n\in\mathbb{N}" /> ✓</RB>
  </Step>
  <Step index={3} title="Suite décroissante et convergente">
    <p>On calcule <IM t="U_{n+1}-U_n" /> :</p>
    <BM t={T.T1E2_dec} /><BM t={T.T1E2_dec2} /><BM t={T.T1E2_lim} />
    <RB>Décroissante + minorée par <IM t="\sqrt{2}" /> ⟹ <strong>convergente</strong> ✓</RB>
  </Step>
  <Step index={4} title={<>Limite <IM t="\ell" /></>}>
    <p>À la limite <IM t="f(\ell)=\ell" /> :</p>
    <BM t={T.T1E2_fL} /><RB><IM t="\ell=\sqrt{2}" /></RB>
  </Step>
</>)}

// ── T1-E3 ─────────────────────────────────────────────────────────────────────
const STATS_PTS = [[0,398],[1,451],[2,423],[3,501],[4,673],[5,956],[6,1077],[7,1255],[8,1427],[9,1500]]
function T1E3() { return (<>
  <Step index={0} title="Calcul de U̅ et V̅">
    <IB label="Données">Rangs xi ∈ [0;9], dépenses yi (millions DT)</IB>
    <IB label="Moyennes"><BM t={T.T1E3_stat} /></IB>
    <div className="section-label">Nuage de points</div>
    <ScatterPlot
      points={STATS_PTS}
      xLabel="Rang xi" yLabel="yi (M DT)"
      xmin={-0.5} xmax={9.5} ymin={200} ymax={1600}
      xticks={[0,1,2,3,4,5,6,7,8,9]}
      yticks={[400,600,800,1000,1200,1400,1600]}
      lines={[{ a: 150.76, b: 187.68, color: '#e0296e' }]}
      title="Nuage de points + Droite de Mayer (en rose)"
    />
    <IB label="Droite de Mayer vérifiée"><BM t={T.T1E3_mayer_D} /></IB>
    <RB>Estimation 2025 (rang 10) : <BM t={T.T1E3_est2025} /></RB>
  </Step>
  <Step index={1} title="Ajustement exponentiel — Z = ln(Y)">
    <IB label="Corrélation"><BM t={T.T1E3_r} /></IB>
    <IB label="Droite de Z en X"><BM t={T.T1E3_Zline} /></IB>
    <RB>Estimation 2025 : <BM t={T.T1E3_Y2025} /></RB>
  </Step>
  <Step index={2} title="Quel ajustement choisir ?">
    <IB label="Réalité 2023">68,9 × 0,028 ≈ 1929 M DT (rang 8)</IB>
    <IB label="Affine (rang 8)"><IM t="150{,}76\times8+187{,}68=1393{,}76" /></IB>
    <IB label="Exponentiel (rang 8)"><IM t="e^{0{,}263\times8+5{,}68}\approx2398" /></IB>
    <RB>L'ajustement <strong>affine</strong> est le plus proche ✓</RB>
  </Step>
</>)}

// ── T1-E4 ─────────────────────────────────────────────────────────────────────
function T1E4() {
  const f14 = x => x - Math.E * Math.log(x)
  const delta = x => x
  return (<>
    <Step index={0} title="Limites et comportement">
      <BM t={T.T1E4_f} />
      <IB label="En 0⁺"><BM t={T.T1E4_lim0} /> → asymptote verticale en x=0</IB>
      <IB label="En +∞"><BM t={T.T1E4_liminf} /> → pas d'asymptote horizontale</IB>
      <IB label="Pente à l'infini"><IM t="\lim_{x\to+\infty}\frac{f(x)}{x}=1" /> → la droite Δ: y=x est asymptote oblique</IB>
    </Step>
    <Step index={1} title="Dérivée et tableau de variation">
      <BM t={T.T1E4_fp} />
      <IB label="Signe de f'(x)"><BM t={T.T1E4_tab} /></IB>
      <div className="section-label">Tableau de variation</div>
      <VariationTable
        xVals={[{ tex: '0^+' }, { tex: 'e' }, { tex: '+\\infty' }]}
        signs={['-', '+']}
        arrows={['down', 'up']}
        fVals={[{ tex: '+\\infty', pos: 'top' }, { tex: '0', pos: 'bot' }, { tex: '+\\infty', pos: 'top' }]}
      />
      <RB>Minimum en <IM t="x=e" /> : <BM t={T.T1E4_min} /></RB>
    </Step>
    <Step index={2} title="Courbe (C) et droite Δ: y=x">
      <div className="section-label">Tracé de la courbe</div>
      <FunctionCurve
        fn={f14}
        xmin={0.15} xmax={6} ymin={-0.5} ymax={6}
        xticks={[1,2,3,4,5]} yticks={[0,1,2,3,4,5]}
        title="(C): f(x) = x − e·ln(x)  et  Δ: y = x (en pointillé)"
        extra={[{ type:'fn', fn: delta, color:'#e0296e', dash: true }]}
      />
      <IB label="Position de (C) et Δ">Pour <IM t="x>0" /> : <IM t="f(x)-x=-e\ln x" />. Signe = signe de <IM t="-\ln x" /></IB>
      <IB label="Conclusion"><IM t="(C)" /> au-dessus de Δ pour <IM t="x\in]0;1[" />, en dessous pour <IM t="x>1" /></IB>
    </Step>
    <Step index={3} title="Primitive F et intégrale">
      <p>On vérifie <IM t="g'(x)=e\ln x" /> :</p>
      <BM t={T.T1E4_gp} />
      <IB label="Primitive de f s'annulant en 1"><BM t={T.T1E4_F} /></IB>
      <div className="section-label">Calcul de l'intégrale</div>
      <BM t={T.T1E4_I} />
      <BM t={T.T1E4_I2} />
      <RB><BM t={T.T1E4_Ires} /></RB>
    </Step>
  </>)
}

// ── T2-E1 ─────────────────────────────────────────────────────────────────────
function T2E1() { return (<>
  <Step index={0} title={<>Déterminant de <IM t="A" /> en fonction de <IM t="\alpha" /></>}>
    <p>On a <IM t={T.T2E1_matA2} /></p>
    <BM t={T.T2E1_detA} /><BM t={T.T2E1_detA2} />
    <RB><IM t="A" /> inversible <IM t="\iff\alpha\neq1" /></RB>
  </Step>
  <Step index={1} title={<>Trouver <IM t="\alpha" /> tel que <IM t="A\times B=2I_3" /></>}>
    <BM t={T.T2E1_AB2I} />
    <RB><BM t={T.T2E1_Ainv2} /></RB>
  </Step>
  <Step index={2} title="Mise en équation du problème du bus">
    <IB label="Variables"><IM t="x" /> = couples, <IM t="y" /> = femmes seules, <IM t="z" /> = enfants</IB>
    <BM t={T.T2E1_sys} />
  </Step>
  <Step index={3} title="Résolution matricielle">
    <BM t={T.T2E1_Xsol} />
    <IB label="Détail 1ère ligne"><CR label="x" fkey="T2E1_XR1a" /><CR label="y" fkey="T2E1_XR1b" /><CR label="z" fkey="T2E1_XR1c" /></IB>
    <RB><BM t={T.T2E1_sol} /></RB>
  </Step>
</>)}

// ── T2-E2 ─────────────────────────────────────────────────────────────────────
function T2E2() { return (<>
  <Step index={0} title={<>Calcul de <IM t="U_1, U_2" />, monotonie et convergence</>}>
    <IB label="Calculs"><BM t="U_1=e^0\cdot1=1" /><BM t="U_2=e^{-1}\cdot1=\tfrac{1}{e}" /></IB>
    <IB label="Positivité">Si <IM t="U_n>0" />, alors <IM t="U_{n+1}=e^{-n}U_n>0" /> ✓</IB>
    <IB label="Décroissance"><IM t="e^{-n}\leq1\implies U_{n+1}=e^{-n}U_n\leq U_n" /> ✓</IB>
    <RB>Suite positive, décroissante ⟹ <strong>convergente</strong> ✓</RB>
  </Step>
  <Step index={1} title={<>Suite <IM t="V_n=\ln(U_n)" /></>}>
    <p>Relation de récurrence :</p><BM t={T.T2E2_Vrec} />
    <IB label="Somme téléscopique"><BM t={T.T2E2_Vn_r} /></IB>
  </Step>
  <Step index={2} title={<>Formule de <IM t="U_n" /> et limite</>}>
    <BM t={T.T2E2_Un} />
    <RB><BM t={T.T2E2_lim} /></RB>
  </Step>
</>)}

// ── T3-E1 ─────────────────────────────────────────────────────────────────────
function T3E1() { return (<>
  <Step index={0} title={<>Déterminant de <IM t="A" /></>}>
    <p><IM t={T.T3E1_matA3} /></p>
    <BM t={T.T3E1_detA3} /><RB><BM t={T.T3E1_detA3b} /></RB>
  </Step>
  <Step index={1} title={<>Calcul de <IM t="A\times B" /> et <IM t="A^{-1}" /></>}>
    <BM t={T.T3E1_AB3} /><BM t={T.T3E1_AB3r} />
    <RB><BM t={T.T3E1_Ainv3} /></RB>
  </Step>
  <Step index={2} title="Résolution du système (S)">
    <BM t={T.T3E1_sysSol} /><BM t={T.T3E1_XR3} />
    <RB><IM t="x=4,\quad y=12,\quad z=-1" /></RB>
  </Step>
  <Step index={3} title={<>Suite <IM t="U_{n+1}=4U_n+12n-1" /></>}>
    <IB label="Système">On utilise <IM t="U_1=3,\;U_2=13,\;U_3=115" /> et on résout <IM t="(S)" /></IB>
    <RB><IM t="a=4,\quad b=12,\quad c=-1\implies U_{n+1}=4U_n+12n-1" /></RB>
  </Step>
</>)}

// ── T3-E3 Probabilités ────────────────────────────────────────────────────────
function T3E3() { return (<>
  <Step index={0} title="Arbre de probabilités">
    <IB label="Données"><IM t="P(S)=0{,}25,\;P(D|S)=0{,}10,\;P(D|\bar{S})=0{,}05" /></IB>
    <IB label="Structure">Arbre à 2 niveaux : S/S̄ puis D/D̄</IB>
  </Step>
  <Step index={1} title="Probabilité totale P(D)">
    <BM t={T.T3E3_PD} /><BM t={T.T3E3_PDval} />
    <RB><IM t="P(D)=0{,}0625" /> ✓</RB>
  </Step>
  <Step index={2} title="Probabilité conditionnelle P(S|D)">
    <BM t={T.T3E3_PSD} /><RB><IM t="P(S|D)=0{,}4=40\%" /></RB>
  </Step>
  <Step index={3} title="Au moins 1 habitant avec problème de dos (n=3)">
    <BM t={T.T3E3_Pau3} /><BM t={T.T3E3_Pau3r} />
    <RB><IM t="P(\text{au moins 1})\approx0{,}176" /></RB>
  </Step>
</>)}

// ── T4-E1 ─────────────────────────────────────────────────────────────────────
function T4E1() { return (<>
  <Step index={0} title={<>Calcul de <IM t="A^2" /> et identité remarquable</>}>
    <p><IM t={T.T4E1_matA4} /></p><BM t={T.T4E1_A4sq} />
    <BM t={T.T4E1_eq} />
    <RB><IM t="A^2-5A+4I_3=O" /> ✓</RB>
  </Step>
  <Step index={1} title={<>En déduire <IM t="A^{-1}" /></>}>
    <BM t={T.T4E1_inv} /><RB><BM t={T.T4E1_Ainv4} /></RB>
  </Step>
  <Step index={2} title="Résolution du système (S)">
    <BM t={T.T4E1_sys4} /><BM t={T.T4E1_Xsol4} />
    <RB><BM t={T.T4E1_sol4} /></RB>
  </Step>
</>)}

// ── T4-E2 Suites ──────────────────────────────────────────────────────────────
function T4E2() { return (<>
  <Step index={0} title={<>Calcul de <IM t="U_1" /> et <IM t="U_2" /></>}>
    <BM t={T.T4E2_U1} /><BM t={T.T4E2_U2} />
    <IB label="Récurrence">Si <IM t="U_n>e" />, alors <IM t="U_{n+1}=\sqrt{eU_n}>\sqrt{e\cdot e}=e" /> ✓</IB>
  </Step>
  <Step index={1} title={<>Suite géométrique <IM t="V_n=\ln(U_n)-1" /></>}>
    <BM t={T.T4E2_Vrec4} />
    <IB label="Raison"><IM t="q=\frac{1}{2},\;V_0=\ln(e^2)-1=1" /></IB>
    <RB><BM t={T.T4E2_Vn4} /></RB>
  </Step>
  <Step index={2} title={<>Formule de <IM t="U_n" /> et limite</>}>
    <BM t={T.T4E2_Un4} /><RB><BM t={T.T4E2_lim4} /></RB>
  </Step>
</>)}

// ── T5-E1 ─────────────────────────────────────────────────────────────────────
function T5E1() { return (<>
  <Step index={0} title={<>Déterminant de <IM t="A" /></>}>
    <p><IM t={T.T5E1_matA5} /></p><BM t={T.T5E1_detA5} />
    <RB><IM t="\det(A)=-2\neq0" /> ⟹ <strong>inversible</strong> ✓</RB>
  </Step>
  <Step index={1} title={<>Calcul de <IM t="A\times B" /> et <IM t="A^{-1}" /></>}>
    <BM t={T.T5E1_AB5} /><RB><BM t={T.T5E1_Ainv5} /></RB>
  </Step>
  <Step index={2} title={<>Déterminer <IM t="a,b,c" /> de <IM t="f(x)=ax^2+bx+c" /></>}>
    <IB label="Système">Conditions <IM t="f(1)=-1,\;f(2)=2,\;f(3)=0" /></IB>
    <BM t={T.T5E1_sys5} /><BM t={T.T5E1_Xsol5} /><BM t={T.T5E1_XR5} />
    <RB><BM t={T.T5E1_abc5} /></RB>
  </Step>
  <Step index={3} title="Expression de f(x)">
    <RB><BM t={T.T5E1_f5} /></RB>
  </Step>
</>)}

// ── BD ────────────────────────────────────────────────────────────────────────
const DB = {
  'T1-E1': { title:'Matrices et Systèmes',    badge:'Sujet 1 · Ex.1 · Algèbre',       C:<T1E1/> },
  'T1-E2': { title:'Suites Numériques',        badge:'Sujet 1 · Ex.2 · Analyse',       C:<T1E2/> },
  'T1-E3': { title:'Statistiques',             badge:'Sujet 1 · Ex.3 · Stats',         C:<T1E3/> },
  'T1-E4': { title:'Étude de Fonction — Ln',   badge:'Sujet 1 · Ex.4 · Analyse',       C:<T1E4/> },
  'T2-E1': { title:'Matrices et Applications', badge:'Sujet 2 · Ex.1 · Algèbre',       C:<T2E1/> },
  'T2-E2': { title:'Suites Numériques',        badge:'Sujet 2 · Ex.2 · Analyse',       C:<T2E2/> },
  'T3-E1': { title:'Matrices et Suites',       badge:'Sujet 3 · Ex.1 · Algèbre',       C:<T3E1/> },
  'T3-E3': { title:'Probabilités',             badge:'Sujet 3 · Ex.3 · Proba',         C:<T3E3/> },
  'T4-E1': { title:'Matrices',                 badge:'Sujet 4 · Ex.1 · Algèbre',       C:<T4E1/> },
  'T4-E2': { title:'Suites Numériques',        badge:'Sujet 4 · Ex.2 · Analyse',       C:<T4E2/> },
  'T5-E1': { title:'Matrices et Fonctions',    badge:'Sujet 5 · Ex.1 · Algèbre',       C:<T5E1/> },
}

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
  const nav = (k) => { setInput(k); setExoId(k); load(k); const u = new URL(window.location); u.searchParams.set('exo', k); window.history.pushState({}, '', u) }
  const submit = (e) => { e.preventDefault(); const id = input.trim().toUpperCase(); nav(id) }

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
            {Object.keys(DB).map(k => <button key={k} className="code-chip" onClick={() => nav(k)}>{k}</button>)}
          </div>
        </section>

        {searched && correction && (
          <article className="correction-card">
            <div className="card-header">
              <span className="exo-badge">{correction.badge}</span>
              <h2 className="card-title">{correction.title}</h2>
            </div>
            <div className="card-body">{correction.C}</div>
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
