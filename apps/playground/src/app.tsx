import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Box,
  Check,
  Command as CommandIcon,
  Crosshair,
  Search,
  X,
} from "lucide-react";
import * as UI from "@cortex/ui";
import { panels, type PanelDefinition } from "./panels";
import { Radar, SystemArt } from "./system-art";

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
export function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const findPanel = (name: string) =>
    panels.find((panel) =>
      panel.components.some((component) => component === name),
    );
  const jumpTo = (name: string) => {
    setSearchOpen(false);
    setIndexOpen(false);
    const target =
      name === "command" ? "component-search" : `panel-${findPanel(name)?.id}`;
    requestAnimationFrame(() => {
      document
        .getElementById(target)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };
  return (
    <UI.TooltipProvider delayDuration={200}>
      <div className="system-shell">
        <a className="skip-link" href="#workbench">
          Skip to components
        </a>
        <header className="topbar">
          <a href="#" className="wordmark">
            <Crosshair size={23} />
            <span>CORTEX UI</span>
            <small>// v0.1.0</small>
          </a>
          <nav aria-label="Main navigation">
            <a href="#workbench" className="active">
              Overview
            </a>
            <button onClick={() => setIndexOpen(true)}>
              Components <span>66</span>
            </button>
            <a href="#panel-type">Design system</a>
          </nav>
          <div className="topbar-actions">
            <button
              id="component-search"
              aria-label="Find a component"
              className="search-trigger"
              onClick={() => setSearchOpen(true)}
              data-components="command"
            >
              <Search size={14} />
              <span>Find a component…</span>
              <UI.Kbd>⌘ K</UI.Kbd>
            </button>
            <span className="online-label">
              <span className="status-dot" /> SYSTEM ONLINE
            </span>
            <UI.Button
              variant="outline"
              size="sm"
              onClick={() => setIndexOpen(true)}
            >
              <Box /> Explore
            </UI.Button>
          </div>
        </header>
        <main>
          <section className="hero" aria-labelledby="hero-title">
            <aside className="hero-telemetry" aria-label="Library details">
              <div className="telemetry-label">
                COMPONENTS
                <br />
                FOR A MORE
                <br />
                OPEN INTERFACE
              </div>
              <Radar />
              <div className="telemetry-bottom">
                <span className="signal-bars" />
                <span>
                  66 COMPONENTS
                  <br />
                  ONE DESIGN LANGUAGE
                </span>
              </div>
            </aside>
            <div className="hero-copy">
              <p className="eyebrow">
                <span>[ OPEN SOURCE ]</span>
                <span>[ BUILT TO EXPLORE ]</span>
              </p>
              <h1 id="hero-title">
                The anatomy of a<br />
                <em>design system.</em>
              </h1>
              <p>
                Thoughtful components. A shared visual language.
                <br />
                An entire interface, ready to make your own.
              </p>
              <div className="hero-actions">
                <UI.Button asChild>
                  <a href="#workbench">
                    Explore the components <ArrowDown />
                  </a>
                </UI.Button>
                <UI.Button variant="outline" onClick={() => setIndexOpen(true)}>
                  View component index <ArrowUpRight />
                </UI.Button>
              </div>
            </div>
            <div className="hero-art">
              <span className="art-caption">
                NATURE INSPIRES.
                <br />
                STRUCTURE DEFINES.
              </span>
              <SystemArt />
              <span className="art-coordinate">CX—001 / FORM STUDY</span>
            </div>
          </section>
          <div className="workbench-toolbar" id="workbench">
            <div className="demo-row">
              <span className="section-marker">01</span>
              <h2>The component workbench</h2>
              <span className="muted">All systems, at a glance.</span>
            </div>
            <button
              onClick={() => setIndexOpen(true)}
              className="micro index-link"
            >
              <Check size={12} /> {UI.componentCatalog.length} COMPONENTS{" "}
              <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="panel-grid">
            {panels.map((panel, index) => (
              <Panel key={panel.id} panel={panel} index={index} />
            ))}
          </div>
          <section className="catalog-section" id="component-index">
            <div className="workbench-toolbar">
              <div className="demo-row">
                <span className="section-marker">02</span>
                <h2>Component index</h2>
              </div>
              <span className="micro">66 / 66 IN THE SYSTEM</span>
            </div>
            <div className="catalog-grid">
              {Array.from(
                new Set(UI.componentCatalog.map((c) => c.category)),
              ).map((category) => (
                <div key={category}>
                  <h3>{category}</h3>
                  {UI.componentCatalog
                    .filter((c) => c.category === category)
                    .map((c) => (
                      <button
                        key={c.name}
                        onClick={() =>
                          c.name === "command"
                            ? setSearchOpen(true)
                            : jumpTo(c.name)
                        }
                      >
                        {c.label}
                        <ArrowUpRight size={11} />
                      </button>
                    ))}
                </div>
              ))}
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <a href="#" className="wordmark">
            <Crosshair size={16} />
            <span>CORTEX UI</span>
          </a>
          <span className="micro">REALITY, BY DESIGN.</span>
          <div className="footer-rule" />
          <span className="micro">REACT / TYPESCRIPT / TAILWIND</span>
          <span className="signal-bars" />
        </footer>
        <UI.CommandDialog
          open={searchOpen}
          onOpenChange={setSearchOpen}
          title="Find a component"
          description="Search the library and jump to a live example."
        >
          <UI.CommandInput placeholder="Search 66 components…" />
          <UI.CommandList>
            <UI.CommandEmpty>No matching component.</UI.CommandEmpty>
            {Array.from(
              new Set(UI.componentCatalog.map((c) => c.category)),
            ).map((category) => (
              <UI.CommandGroup heading={category} key={category}>
                {UI.componentCatalog
                  .filter((c) => c.category === category)
                  .map((c) => (
                    <UI.CommandItem
                      key={c.name}
                      value={`${c.label} ${c.category}`}
                      onSelect={() => jumpTo(c.name)}
                    >
                      <Box />
                      {c.label}
                      <UI.CommandShortcut>↵</UI.CommandShortcut>
                    </UI.CommandItem>
                  ))}
              </UI.CommandGroup>
            ))}
          </UI.CommandList>
        </UI.CommandDialog>
        <UI.Sheet open={indexOpen} onOpenChange={setIndexOpen}>
          <UI.SheetContent className="w-full sm:max-w-md">
            <UI.SheetHeader>
              <UI.SheetTitle>Component index</UI.SheetTitle>
              <UI.SheetDescription>
                66 components. Jump to any live example.
              </UI.SheetDescription>
            </UI.SheetHeader>
            <div className="px-4">
              <UI.InputGroup>
                <UI.InputGroupAddon>
                  <Search />
                </UI.InputGroupAddon>
                <UI.InputGroupInput
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter components…"
                  aria-label="Filter component index"
                />
                {query && (
                  <UI.InputGroupAddon align="inline-end">
                    <UI.InputGroupButton
                      aria-label="Clear filter"
                      onClick={() => setQuery("")}
                    >
                      <X />
                    </UI.InputGroupButton>
                  </UI.InputGroupAddon>
                )}
              </UI.InputGroup>
            </div>
            <UI.ScrollArea className="min-h-0 flex-1 px-4">
              <div className="index-sheet-list">
                {UI.componentCatalog
                  .filter((c) =>
                    c.label.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        if (c.name === "command") {
                          setIndexOpen(false);
                          setSearchOpen(true);
                        } else jumpTo(c.name);
                      }}
                    >
                      <span>{c.label}</span>
                      <span className="micro">{c.category}</span>
                      <ArrowUpRight size={13} />
                    </button>
                  ))}
                {!UI.componentCatalog.some((c) =>
                  c.label.toLowerCase().includes(query.toLowerCase()),
                ) && (
                  <p className="muted py-6">No components match “{query}”.</p>
                )}
              </div>
            </UI.ScrollArea>
            <UI.SheetFooter>
              <span className="micro demo-row">
                <CommandIcon size={12} /> K TO SEARCH FROM ANYWHERE
              </span>
            </UI.SheetFooter>
          </UI.SheetContent>
        </UI.Sheet>
        <UI.Toaster position="bottom-right" closeButton />
      </div>
    </UI.TooltipProvider>
  );
}
