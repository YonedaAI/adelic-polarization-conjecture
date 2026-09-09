import type { Metadata } from 'next';
import papers from '../papers.json';
import { github, project, description } from '../lib/site';

export const metadata: Metadata = {
  openGraph: { title: project, description, url: '/', images: [{ url: '/og/home.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', images: ['/og/home.png'] },
};

function PrimeSquare() {
  return <figure className="prime-square" aria-labelledby="square-caption">
    <svg viewBox="0 0 440 300" role="img" aria-label="A square of prime-adjoining maps: S to S union p, S to S union q, and both to S union p and q.">
      <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/></marker></defs>
      <g className="square-lines" fill="none" stroke="currentColor" strokeWidth="1.4" markerEnd="url(#arrow)"><path d="M120 72H275"/><path d="M95 103V200"/><path d="M335 103V200"/><path d="M155 232H263"/></g>
      <g className="square-nodes" textAnchor="middle"><text x="95" y="81">S</text><text x="335" y="81">S ∪ {'{p}'}</text><text x="95" y="241">S ∪ {'{q}'}</text><text x="335" y="241">S ∪ {'{p,q}'}</text></g>
      <g className="square-labels" textAnchor="middle"><text x="220" y="54">adjoin p</text><text x="220" y="269">adjoin p</text><text x="49" y="159">q</text><text x="380" y="159">q</text><text x="218" y="156">duality</text><text x="218" y="180">&amp; pairing</text></g>
    </svg><figcaption id="square-caption">Prime-by-prime compatibility is a condition on the maps and their pairings.</figcaption>
  </figure>;
}

export default function Home() {
  return <main id="main">
    <section className="hero"><div><h1>Adelic Polarization Conjecture</h1><p className="lead">Can the arithmetic structures at each prime fit together into a polarized geometry of the zeta function?</p><p>These papers study the maps that adjoin a prime, the local terms in Weil&apos;s formula, and concrete obstructions that a compatible polarization must overcome.</p><a className="button" href="#papers">Read the papers</a></div><PrimeSquare/></section>
    <section id="papers" className="collection"><div className="section-heading"><h2>The papers</h2><p>Local constructions, obstructions, and a common formulation.</p></div>
      <div className="paper-grid">{papers.map(paper => <article className="paper-card" key={paper.slug}>
        <a href={`/papers/${paper.slug}/`} className="paper-image" tabIndex={-1} aria-hidden="true"><img src={`/og/${paper.slug}.png`} alt="" width="1200" height="630"/></a>
        <div className="paper-card-body"><p className="part">{paper.part}</p><h3><a href={`/papers/${paper.slug}/`}>{paper.title}</a></h3><p>{paper.description}</p><div className="paper-links"><a href={`/papers/${paper.slug}/`}>Read paper</a><a href={`/papers/${paper.slug}.pdf`}>PDF</a></div></div>
      </article>)}</div>
    </section>
    <section id="conjecture" className="conjecture-section"><h2>The construction problem</h2><div><p className="large-prose">Construct a primitive arithmetic pairing whose sign follows from its geometry, and prove that its comparison with the complete Weil form survives adjoining primes.</p><p>The comparison must include the archimedean and pole terms, all relevant prime powers, and the maps between successive spaces. A complete construction with the required sign would imply the Riemann Hypothesis through Weil&apos;s criterion.</p><p>The papers establish local constructions and obstructions to specified normalization and extension procedures. The global polarization remains a conjecture.</p><a className="text-link" href="/papers/synthesis/">Read the formulation</a></div></section>
    <section className="formal-section"><div><h2>Formal mathematics</h2><p>The companion Lean project contains arithmetic definitions and proofs. Its documentation states the scope of each formal result and the analytic arguments developed in the papers.</p></div><a className="button secondary" href={`${github}/tree/main/lean`}>Browse the Lean code</a></section>
    <section className="references-section"><h2>Starting points</h2><p>The mathematical setting comes from the semilocal adelic and Sonin-space constructions of Connes, Consani, and Moscovici. The papers give precise references and distinguish these constructions from the proposed polarization.</p><div className="source-links"><a href="https://arxiv.org/abs/2310.18423">Semilocal adelic operators</a><a href="https://arxiv.org/abs/math/0703392">The Weil proof and adeles</a><a href="https://arxiv.org/abs/2602.04022">Geometric perspectives on RH</a></div></section>
  </main>;
}
