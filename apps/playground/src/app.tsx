import { useState } from "react";
import { Button, type ButtonProps } from "@cortex/ui";

const variants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const satisfies readonly ButtonProps["variant"][];

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="playground">
      <header className="site-header">
        <a className="brand" href="#"><span className="brand-mark" aria-hidden="true">c</span>Cortex <span className="brand-suffix">UI</span></a>
        <span className="header-note">Component playground <span className="version">0.0.0</span></span>
      </header>
      <main>
        <div className="intro">
          <p className="eyebrow">COMPONENTS / 001</p>
          <h1>Button</h1>
          <p className="description">A small starting point. Explore the variants, sizes, and states of our first component.</p>
        </div>

        <section className="hero-preview" aria-label="Interactive button preview">
          <span className="preview-label">LIVE PREVIEW</span>
          <Button size="lg" onClick={() => setCount((value) => value + 1)}>Make a move <Arrow /></Button>
          <p className="interaction-status" aria-live="polite">{count === 0 ? "Give it a click. This one works." : `Clicked ${count} ${count === 1 ? "time" : "times"}. Keep going.`}</p>
        </section>

        <section className="example-section" aria-labelledby="variants-title">
          <div className="section-heading"><h2 id="variants-title">Variants</h2><p>A different emphasis for each action.</p></div>
          <div className="variant-grid">
            {variants.map((variant) => <div className="variant-cell" key={variant}><Button variant={variant}>{variant === "default" ? "Primary" : variant.charAt(0).toUpperCase() + variant.slice(1)}</Button><code>{variant}</code></div>)}
          </div>
        </section>

        <div className="details-grid">
          <section className="example-section" aria-labelledby="sizes-title">
            <div className="section-heading"><h2 id="sizes-title">Sizes</h2><p>Room for every context.</p></div>
            <div className="sample-row"><Button size="sm">Small</Button><Button>Default</Button><Button size="lg">Large</Button><Button size="icon" aria-label="Arrow example"><Arrow /></Button></div>
          </section>
          <section className="example-section" aria-labelledby="states-title">
            <div className="section-heading"><h2 id="states-title">States & composition</h2><p>Native behavior, with room to compose.</p></div>
            <div className="sample-row"><Button disabled>Disabled</Button><Button variant="outline" disabled>Disabled</Button><Button asChild variant="link"><a href="#usage">View usage <Arrow /></a></Button></div>
          </section>
        </div>

        <section className="usage" id="usage" aria-labelledby="usage-title">
          <div className="section-heading"><h2 id="usage-title">Start with a button</h2><p>One import from the shared UI package.</p></div>
          <pre><code>{'import { Button } from "@cortex/ui";\n\n<Button variant="default">Make a move</Button>'}</code></pre>
        </section>
      </main>
      <footer><span>Cortex UI</span><span>A work in progress. One component at a time.</span></footer>
    </div>
  );
}
