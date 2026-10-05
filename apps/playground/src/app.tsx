import { useEffect, useState } from "react";
import { ArrowUpRight, Box, Crosshair, Search } from "lucide-react";
import * as UI from "@cortex/ui";
import { Home } from "./pages/home";
import { Showcase } from "./pages/showcase";

function readRoute() {
  const hash = window.location.hash.slice(1);
  // Keep links to the original wall working.
  return hash.startsWith("panel-") ? `/showcase?panel=${hash}` : hash || "/";
}
export function App() {
  const [route, setRoute] = useState(readRoute);
  const [searchOpen, setSearchOpen] = useState(false);
  const path = route.split("?")[0];
  useEffect(() => {
    const change = () => setRoute(readRoute());
    const keyboard = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setSearchOpen(value => !value);
      }
    };
    window.addEventListener("hashchange", change);
    window.addEventListener("keydown", keyboard);
    return () => { window.removeEventListener("hashchange", change); window.removeEventListener("keydown", keyboard); };
  }, []);
  useEffect(() => {
    document.title = `${path === "/" ? "React components for product interfaces" : path.slice(1).replaceAll("/", " · ")} | Cortex UI`;
    const target = new URLSearchParams(route.split("?")[1]).get("panel");
    requestAnimationFrame(() => {
      if (target) document.getElementById(target)?.scrollIntoView({ block: "center" });
      else { window.scrollTo(0, 0); document.getElementById("main-content")?.focus({ preventScroll: true }); }
    });
  }, [route, path]);
  return <UI.TooltipProvider delayDuration={200}><div className="system-shell">
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById("main-content")?.focus(); }}>Skip to content</a>
    <header className="topbar site-topbar">
      <a href="#/" className="wordmark"><Crosshair size={23} /><span>CORTEX UI</span><small>v0.1</small></a>
      <nav aria-label="Main navigation">{[["/", "Overview"], ["/components", "Components"], ["/showcase", "Showcase"], ["/examples", "Examples"]].map(([href, label]) => <a key={href} href={`#${href}`} className={(href === "/" ? path === href : path.startsWith(href)) ? "active" : ""} aria-current={path === href ? "page" : undefined}>{label}</a>)}</nav>
      <div className="topbar-actions"><button aria-label="Find a component" className="search-trigger" onClick={() => setSearchOpen(true)}><Search size={15} /><span>Search components</span><UI.Kbd>⌘ K</UI.Kbd></button></div>
    </header>
    <main id="main-content" tabIndex={-1}>
      {path === "/" ? <Home /> : path === "/showcase" ? <Showcase /> : <div className="page-heading"><h1>{path === "/components" ? "Component guide" : path === "/examples" ? "Real-world examples" : "Page not found"}</h1><p>This page is being assembled. Explore the live components in the meantime.</p><UI.Button asChild><a href="#/showcase">Open showcase <ArrowUpRight /></a></UI.Button></div>}
    </main>
    <footer className="site-footer"><a href="#/" className="wordmark"><Crosshair size={16} />CORTEX UI</a><span className="muted">React components. Ready to explore.</span><div className="footer-rule" /><a className="muted" href="https://github.com/xavierloeraflores/cortex-ui-proto">View source ↗</a></footer>
    <UI.CommandDialog open={searchOpen} onOpenChange={setSearchOpen} title="Find a component" description="Search the component guide."><UI.CommandInput placeholder="Search 66 components…" /><UI.CommandList><UI.CommandEmpty>No matching component.</UI.CommandEmpty>{Array.from(new Set(UI.componentCatalog.map(c => c.category))).map(category => <UI.CommandGroup heading={category} key={category}>{UI.componentCatalog.filter(c => c.category === category).map(c => <UI.CommandItem key={c.name} value={`${c.label} ${c.category}`} onSelect={() => { setSearchOpen(false); window.location.hash = `/components?component=${c.name}`; }}><Box />{c.label}</UI.CommandItem>)}</UI.CommandGroup>)}</UI.CommandList></UI.CommandDialog>
    <UI.Toaster position="bottom-right" closeButton />
  </div></UI.TooltipProvider>;
}
