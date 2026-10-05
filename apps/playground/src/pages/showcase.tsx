import { ArrowUpRight } from "lucide-react";
import { panels, type PanelDefinition } from "../panels";
function Panel({ panel, index }: { panel: PanelDefinition; index: number }) {
  const Demo = panel.demo;
  return (
    <section
      id={`panel-${panel.id}`}
      className={`system-panel ${panel.wide ? "panel-wide" : ""}`}
      data-components={panel.components.join(",")}
      aria-labelledby={`title-${panel.id}`}
    >
      <header className="panel-header">
        <span className="panel-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 id={`title-${panel.id}`}>{panel.title}</h2>
        <span className="panel-tag">{panel.tag}</span>
      </header>
      <p className="panel-description">{panel.subtitle}</p>
      <div className="panel-body">
        <Demo />
      </div>
      <footer className="panel-footer">
        <span>
          {panel.components.map((x) => x.replaceAll("-", " ")).join(" / ")}
        </span>
        <ArrowUpRight size={13} />
      </footer>
    </section>
  );
}
export function Showcase() {
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">THE LIVE WORKBENCH</p>
        <h1>Every component. In action.</h1>
        <p>
          Explore the original wall of interactive demos. Click, type, and try
          things out.
        </p>
      </div>
      <div className="panel-grid">
        {panels.map((panel, index) => (
          <Panel key={panel.id} panel={panel} index={index} />
        ))}
      </div>
    </>
  );
}
