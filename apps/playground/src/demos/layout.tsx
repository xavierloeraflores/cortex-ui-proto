import { useState } from "react";
import * as UI from "@cortex/ui";
import {
  ArrowRight,
  Box,
  ChevronDown,
  Code,
  FileText,
  Globe,
  Layers,
  LayoutDashboard,
  Settings,
  Terminal,
} from "lucide-react";

export function NavigationDemo() {
  const [active, setActive] = useState("Components");
  return (
    <div className="demo-stack">
      <UI.Breadcrumb>
        <UI.BreadcrumbList>
          <UI.BreadcrumbItem>
            <UI.BreadcrumbLink href="#">Cortex</UI.BreadcrumbLink>
          </UI.BreadcrumbItem>
          <UI.BreadcrumbSeparator />
          <UI.BreadcrumbItem>
            <UI.BreadcrumbPage>{active}</UI.BreadcrumbPage>
          </UI.BreadcrumbItem>
        </UI.BreadcrumbList>
      </UI.Breadcrumb>
      <UI.SidebarProvider className="min-h-0">
        <UI.Sidebar collapsible="none" className="w-full bg-transparent">
          <UI.SidebarContent>
            <UI.SidebarGroup className="p-0">
              <UI.SidebarMenu className="grid grid-cols-2 gap-x-3 gap-y-1">
                {[
                  { name: "Overview", icon: LayoutDashboard },
                  { name: "Components", icon: Box },
                  { name: "Documents", icon: FileText },
                  { name: "Settings", icon: Settings },
                ].map((item) => (
                  <UI.SidebarMenuItem key={item.name}>
                    <UI.SidebarMenuButton
                      isActive={active === item.name}
                      onClick={() => setActive(item.name)}
                    >
                      <item.icon />
                      <span>{item.name}</span>
                    </UI.SidebarMenuButton>
                  </UI.SidebarMenuItem>
                ))}
              </UI.SidebarMenu>
            </UI.SidebarGroup>
          </UI.SidebarContent>
        </UI.Sidebar>
      </UI.SidebarProvider>
      <UI.Separator />
      <UI.NavigationMenu>
        <UI.NavigationMenuList>
          <UI.NavigationMenuItem>
            <UI.NavigationMenuTrigger className="h-8 bg-transparent text-xs">
              Explore
            </UI.NavigationMenuTrigger>
            <UI.NavigationMenuContent>
              <ul className="w-48 space-y-1 p-2">
                <li>
                  <UI.NavigationMenuLink href="#panel-controls">
                    Controls
                  </UI.NavigationMenuLink>
                </li>
                <li>
                  <UI.NavigationMenuLink href="#panel-overlays">
                    Overlays
                  </UI.NavigationMenuLink>
                </li>
                <li>
                  <UI.NavigationMenuLink href="#panel-conversation">
                    Conversation
                  </UI.NavigationMenuLink>
                </li>
              </ul>
            </UI.NavigationMenuContent>
          </UI.NavigationMenuItem>
          <UI.NavigationMenuItem>
            <UI.NavigationMenuLink href="#component-index" className="text-xs">
              Full index <ArrowRight size={12} />
            </UI.NavigationMenuLink>
          </UI.NavigationMenuItem>
        </UI.NavigationMenuList>
      </UI.NavigationMenu>
    </div>
  );
}
export function DisclosureDemo() {
  return (
    <div className="demo-stack">
      <UI.Accordion type="single" collapsible defaultValue="one">
        <UI.AccordionItem value="one">
          <UI.AccordionTrigger className="py-3">
            What is Cortex UI?
          </UI.AccordionTrigger>
          <UI.AccordionContent>
            A component study in light, structure, and interaction.
          </UI.AccordionContent>
        </UI.AccordionItem>
        <UI.AccordionItem value="two">
          <UI.AccordionTrigger className="py-3">
            Can I customize it?
          </UI.AccordionTrigger>
          <UI.AccordionContent>
            Every component lives in the shared UI package. Change the tokens to
            change the system.
          </UI.AccordionContent>
        </UI.AccordionItem>
      </UI.Accordion>
      <UI.Collapsible>
        <UI.CollapsibleTrigger asChild>
          <UI.Button
            variant="outline"
            className="w-full justify-between"
            size="sm"
          >
            Implementation notes <ChevronDown />
          </UI.Button>
        </UI.CollapsibleTrigger>
        <UI.CollapsibleContent className="pt-3">
          <p className="muted">
            Keyboard interactions and focus handling come from the underlying
            accessible primitives.
          </p>
        </UI.CollapsibleContent>
      </UI.Collapsible>
    </div>
  );
}
export function TabsDemo() {
  const [rtl, setRtl] = useState(false);
  return (
    <div className="demo-stack">
      <UI.Tabs defaultValue="design">
        <UI.TabsList className="w-full">
          <UI.TabsTrigger value="design">Design</UI.TabsTrigger>
          <UI.TabsTrigger value="code">Code</UI.TabsTrigger>
          <UI.TabsTrigger value="tokens">Tokens</UI.TabsTrigger>
        </UI.TabsList>
        <UI.TabsContent value="design" className="tab-content">
          <Layers />
          <h3>Form follows intention.</h3>
          <p className="muted">Fine lines. Quiet surfaces. Clear actions.</p>
        </UI.TabsContent>
        <UI.TabsContent value="code" className="tab-content">
          <Code />
          <UI.Typography variant="code">
            {"<Button>Build something</Button>"}
          </UI.Typography>
        </UI.TabsContent>
        <UI.TabsContent value="tokens" className="tab-content">
          <div className="demo-row">
            {["#89f7ef", "#4baca7", "#284347", "#101d20"].map((c) => (
              <span
                key={c}
                className="size-8 rounded border"
                style={{ background: c }}
              />
            ))}
          </div>
          <span className="micro">ONE PALETTE. EVERY COMPONENT.</span>
        </UI.TabsContent>
      </UI.Tabs>
      <div className="demo-row justify-between">
        <UI.Label htmlFor="rtl-toggle">Right-to-left layout</UI.Label>
        <UI.Switch id="rtl-toggle" checked={rtl} onCheckedChange={setRtl} />
      </div>
      <UI.DirectionProvider dir={rtl ? "rtl" : "ltr"}>
        <div
          dir={rtl ? "rtl" : "ltr"}
          className="flex items-center gap-2 rounded border p-2 text-xs text-muted-foreground"
        >
          <Globe size={13} />
          <span>
            {rtl ? "واجهة لكل اتجاه" : "An interface in every direction"}
          </span>
        </div>
      </UI.DirectionProvider>
    </div>
  );
}
export function LayoutDemo() {
  return (
    <div className="demo-stack">
      <UI.ResizablePanelGroup
        orientation="horizontal"
        className="min-h-28 rounded border"
      >
        <UI.ResizablePanel defaultSize="40%" minSize="20%">
          <div className="flex h-full items-center justify-center text-xs text-primary">
            01 / Panel
          </div>
        </UI.ResizablePanel>
        <UI.ResizableHandle withHandle />
        <UI.ResizablePanel defaultSize="60%" minSize="20%">
          <UI.ScrollArea className="h-28">
            <div className="space-y-3 p-3">
              {Array.from({ length: 8 }, (_, i) => (
                <div className="demo-row text-xs text-muted-foreground" key={i}>
                  <Terminal size={12} />
                  <span>system.event_{String(i + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </UI.ScrollArea>
        </UI.ResizablePanel>
      </UI.ResizablePanelGroup>
      <p className="muted">Drag the divider. Scroll the event stream.</p>
      <UI.Separator />
      <UI.Typography variant="blockquote">
        Space is part of the interface.
      </UI.Typography>
    </div>
  );
}
export function MediaDemo() {
  return (
    <UI.Carousel className="mx-8" aria-label="Design studies">
      <UI.CarouselContent>
        {["ORBIT", "SIGNAL", "PULSE"].map((name, i) => (
          <UI.CarouselItem key={name}>
            <UI.AspectRatio ratio={4 / 3}>
              <div className={`media-study media-study-${i}`}>
                <div className="orbit-rings">
                  <i />
                  <i />
                  <i />
                </div>
                <span className="micro">
                  {String(i + 1).padStart(2, "0")} / {name}
                </span>
              </div>
            </UI.AspectRatio>
          </UI.CarouselItem>
        ))}
      </UI.CarouselContent>
      <UI.CarouselPrevious className="-left-9 size-7" />
      <UI.CarouselNext className="-right-9 size-7" />
    </UI.Carousel>
  );
}
export function TypeDemo() {
  return (
    <div className="demo-stack">
      <UI.Typography variant="h2">Clear by design.</UI.Typography>
      <UI.Typography variant="p">
        A readable interface begins with a deliberate hierarchy.
      </UI.Typography>
      <UI.Typography variant="code">const future = build(ideas)</UI.Typography>
      <UI.Separator />
      <UI.Typography variant="muted">
        Space Grotesk / IBM Plex Mono
      </UI.Typography>
      <div className="demo-row">
        <span className="type-sample">Aa</span>
        <span className="micro">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br />
          0123456789 / @#$%&
        </span>
      </div>
    </div>
  );
}
export function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <div className="demo-stack">
      <UI.Card className="gap-3 py-4">
        <UI.CardHeader className="px-4">
          <UI.CardTitle className="text-sm">
            Field notes / 00{page}
          </UI.CardTitle>
          <UI.CardDescription className="text-xs">
            {
              [
                "Start with the essential.",
                "Make every state intentional.",
                "Leave room for discovery.",
              ][page - 1]
            }
          </UI.CardDescription>
        </UI.CardHeader>
        <UI.CardContent className="px-4">
          <p className="micro">DESIGN SYSTEM JOURNAL</p>
        </UI.CardContent>
      </UI.Card>
      <UI.Pagination>
        <UI.PaginationContent>
          <UI.PaginationItem>
            <UI.PaginationPrevious
              href="#panel-pagination"
              aria-disabled={page === 1}
              className={page === 1 ? "pointer-events-none opacity-40" : ""}
              onClick={(e) => {
                e.preventDefault();
                setPage(Math.max(1, page - 1));
              }}
            />
          </UI.PaginationItem>
          {[1, 2, 3].map((n) => (
            <UI.PaginationItem key={n}>
              <UI.PaginationLink
                href="#panel-pagination"
                isActive={page === n}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(n);
                }}
              >
                {n}
              </UI.PaginationLink>
            </UI.PaginationItem>
          ))}
          <UI.PaginationItem>
            <UI.PaginationNext
              href="#panel-pagination"
              aria-disabled={page === 3}
              className={page === 3 ? "pointer-events-none opacity-40" : ""}
              onClick={(e) => {
                e.preventDefault();
                setPage(Math.min(3, page + 1));
              }}
            />
          </UI.PaginationItem>
        </UI.PaginationContent>
      </UI.Pagination>
      <span className="sr-only" aria-live="polite">
        Page {page}
      </span>
    </div>
  );
}
