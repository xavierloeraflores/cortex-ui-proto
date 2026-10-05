import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCheck,
  Clock,
  FolderKanban,
  Inbox,
  Plus,
  Send,
  Settings2,
  Video,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import * as UI from "@cortex/ui";

const examples = [
  {
    id: "analytics",
    name: "Analytics dashboard",
    product: "PULSE",
    description:
      "Track revenue, compare reporting periods, and explore your top acquisition channels.",
    category: "REPORTING",
    icon: Activity,
    components: ["chart", "card", "table", "select"],
    action: "Change the reporting period or export the data.",
  },
  {
    id: "projects",
    name: "Project workspace",
    product: "ORBIT",
    description:
      "Give a team a shared view of its work. Create tasks, filter the board, and move work forward.",
    category: "PRODUCTIVITY",
    icon: FolderKanban,
    components: ["dialog", "input", "badge", "progress"],
    action: "Create a task or move one to the next stage.",
  },
  {
    id: "inbox",
    name: "Customer inbox",
    product: "RELAY",
    description:
      "Read customer conversations, write a reply, and resolve a support request.",
    category: "COMMUNICATION",
    icon: Inbox,
    components: ["message", "bubble", "avatar", "textarea"],
    action: "Select a conversation, reply, or mark it resolved.",
  },
  {
    id: "settings",
    name: "Account settings",
    product: "ORBIT",
    description:
      "Edit a profile, set notification preferences, and review a workspace plan.",
    category: "ACCOUNT",
    icon: Settings2,
    components: ["tabs", "field", "switch", "radio-group"],
    action: "Change preferences and save your updates.",
  },
  {
    id: "booking",
    name: "Session booking",
    product: "STUDIO HOURS",
    description:
      "Choose a consultation, find a time, and book a session with a designer.",
    category: "SCHEDULING",
    icon: CalendarDays,
    components: ["calendar", "radio-group", "input", "alert"],
    action: "Choose a date and time, then confirm a mock booking.",
  },
];
function MiniPreview({ kind }: { kind: string }) {
  return (
    <div className={`example-mini mini-${kind}`} aria-hidden="true">
      <div className="mini-chrome">
        <i />
        <i />
        <i />
      </div>
      <div className="mini-layout">
        <div className="mini-rail">
          {[1, 2, 3, 4].map((n) => (
            <i key={n} />
          ))}
        </div>
        <div className="mini-content">
          <div className="mini-title" />
          <div className="mini-blocks">
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <i />
                <b />
              </div>
            ))}
          </div>
          <div className="mini-detail">
            {Array.from({ length: kind === "booking" ? 21 : 9 }, (_, n) => (
              <i
                key={n}
                style={{ "--bar": `${25 + ((n * 17) % 65)}%` } as CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export function Examples({ slug }: { slug?: string }) {
  const example = examples.find((e) => e.id === slug);
  if (!slug)
    return (
      <>
        <div className="page-heading">
          <p className="eyebrow">BUILT WITH CORTEX UI</p>
          <h1>Components become products.</h1>
          <p>
            Five realistic pages to explore. Each combines the library's
            components with sample data and working interactions.
          </p>
        </div>
        <div className="page-container examples-gallery">
          {examples.map((e) => (
            <a href={`#/examples/${e.id}`} className="example-card" key={e.id}>
              <MiniPreview kind={e.id} />
              <div className="example-card-copy">
                <p className="micro">
                  {e.category} / {e.product}
                </p>
                <h2>
                  {e.name}
                  <ArrowUpRight size={20} />
                </h2>
                <p>{e.description}</p>
                <div className="demo-row">
                  {e.components.map((c) => (
                    <UI.Badge key={c} variant="outline">
                      {c}
                    </UI.Badge>
                  ))}
                </div>
                <span>
                  Explore example <ArrowRight size={15} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </>
    );
  if (!example)
    return (
      <div className="page-heading">
        <h1>Example not found</h1>
        <a className="back-link" href="#/examples">
          Browse all five examples →
        </a>
      </div>
    );
  const Page = {
    analytics: Analytics,
    projects: Projects,
    inbox: CustomerInbox,
    settings: Settings,
    booking: Booking,
  }[example.id]!;
  return (
    <div className="example-page">
      <div className="example-toolbar">
        <a className="back-link" href="#/examples">
          ← All examples
        </a>
        <span>{example.name}</span>
        <UI.Badge variant="outline">Interactive mock</UI.Badge>
      </div>
      <div className="mock-shell">
        <aside className="mock-sidebar">
          <a className="mock-brand" href="#/examples">
            <example.icon size={21} />
            {example.product}
          </a>
          <span className="micro">WORKSPACE</span>
          <nav aria-label="Example navigation">
            {examples.map((e) => (
              <a
                key={e.id}
                href={`#/examples/${e.id}`}
                className={e.id === slug ? "selected" : ""}
                aria-current={e.id === slug ? "page" : undefined}
              >
                <e.icon size={17} />
                {e.name
                  .replace(" dashboard", "")
                  .replace(" workspace", "")
                  .replace("Customer ", "")
                  .replace("Account ", "")
                  .replace("Session ", "")}
              </a>
            ))}
          </nav>
          <div className="mock-user">
            <UI.Avatar>
              <UI.AvatarFallback>AL</UI.AvatarFallback>
            </UI.Avatar>
            <div>
              Alex Lee<span>Acme Studio</span>
            </div>
          </div>
        </aside>
        <div className="mock-main">
          <div className="mock-top">
            <UI.Breadcrumb>
              <UI.BreadcrumbList>
                <UI.BreadcrumbItem>Workspace</UI.BreadcrumbItem>
                <UI.BreadcrumbSeparator />
                <UI.BreadcrumbItem>
                  <UI.BreadcrumbPage>{example.name}</UI.BreadcrumbPage>
                </UI.BreadcrumbItem>
              </UI.BreadcrumbList>
            </UI.Breadcrumb>
            <span className="micro">DEMO WORKSPACE</span>
          </div>
          <Page />
        </div>
      </div>
      <div className="example-note">
        <p>
          {example.action} Sample data and changes stay in this preview and
          reset when you leave or reload.
        </p>
        <div className="demo-row">
          <span>Built with</span>
          {example.components.map((c) => (
            <a key={c} href={`#/components?component=${c}`}>
              {c} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
function PageTitle({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="mock-title">
      <div>
        <p className="micro">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
const week = [1800, 2400, 2100, 3400, 2900, 4200, 3800];
function Analytics() {
  const [period, setPeriod] = useState("week");
  const monthly = period === "month";
  const values = week.map((revenue, i) => ({
    day: monthly
      ? `Week ${i + 1}`
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    revenue: monthly ? revenue * 4 : revenue,
    previous: Math.round(revenue * (i % 2 ? 0.7 : 0.85)) * (monthly ? 4 : 1),
  }));
  const revenue = values.reduce((total, item) => total + item.revenue, 0);
  const exportReport = () => {
    const csv = `Period,Revenue,Previous\n${values.map((v) => `${v.day},${v.revenue},${v.previous}`).join("\n")}`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `pulse-${period}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    UI.toast.success("Sample report exported");
  };
  return (
    <div className="mock-content">
      <PageTitle
        eyebrow="BUSINESS OVERVIEW"
        title="Your business, at a glance."
        description="A closer look at how things are growing."
      >
        <UI.Button variant="outline" onClick={exportReport}>
          <ArrowDownToLine />
          Export report
        </UI.Button>
      </PageTitle>
      <div className="report-controls">
        <div className="demo-row">
          <span className="status-dot" />
          <span>All channels</span>
        </div>
        <UI.Select value={period} onValueChange={setPeriod}>
          <UI.SelectTrigger aria-label="Reporting period">
            <UI.SelectValue />
          </UI.SelectTrigger>
          <UI.SelectContent>
            <UI.SelectItem value="week">Last 7 days</UI.SelectItem>
            <UI.SelectItem value="month">Last 7 weeks</UI.SelectItem>
          </UI.SelectContent>
        </UI.Select>
      </div>
      <div className="metric-grid">
        {[
          {
            label: "Total revenue",
            value: `$${revenue.toLocaleString()}`,
            change: "+18.6%",
            detail: "vs. previous period",
          },
          {
            label: "Active customers",
            value: monthly ? "4,832" : "1,208",
            change: "+12.8%",
            detail: "vs. previous period",
          },
          {
            label: "Conversion rate",
            value: monthly ? "4.2%" : "3.8%",
            change: "+0.6 pts",
            detail: "vs. previous period",
          },
        ].map((m) => (
          <UI.Card key={m.label}>
            <UI.CardContent>
              <span className="muted">{m.label}</span>
              <strong>{m.value}</strong>
              <p>
                <span>{m.change}</span> {m.detail}
              </p>
            </UI.CardContent>
          </UI.Card>
        ))}
      </div>
      <UI.Card className="revenue-card">
        <UI.CardHeader>
          <div className="demo-row justify-between">
            <div>
              <UI.CardTitle>Revenue over time</UI.CardTitle>
              <UI.CardDescription>
                Current and previous reporting periods
              </UI.CardDescription>
            </div>
            <UI.Badge variant="outline">USD</UI.Badge>
          </div>
        </UI.CardHeader>
        <UI.CardContent>
          <UI.ChartContainer
            className="h-64 w-full"
            config={{
              revenue: { label: "Revenue", color: "var(--primary)" },
              previous: { label: "Previous", color: "var(--muted-foreground)" },
            }}
          >
            <AreaChart data={values} margin={{ left: 8, right: 8, top: 15 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--primary)"
                    stopOpacity={0.28}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
              />
              <UI.ChartTooltip content={<UI.ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="previous"
                stroke="var(--muted-foreground)"
                strokeDasharray="4 4"
                fill="transparent"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#revenueFill)"
              />
            </AreaChart>
          </UI.ChartContainer>
        </UI.CardContent>
      </UI.Card>
      <div className="mock-columns">
        <UI.Card>
          <UI.CardHeader>
            <UI.CardTitle>Acquisition channels</UI.CardTitle>
            <UI.CardDescription>
              Where your customers find you
            </UI.CardDescription>
          </UI.CardHeader>
          <UI.CardContent>
            <UI.Table>
              <UI.TableHeader>
                <UI.TableRow>
                  <UI.TableHead>Channel</UI.TableHead>
                  <UI.TableHead>Visitors</UI.TableHead>
                  <UI.TableHead>Share</UI.TableHead>
                </UI.TableRow>
              </UI.TableHeader>
              <UI.TableBody>
                {[
                  ["Organic search", 2480, "48%"],
                  ["Direct", 1540, "30%"],
                  ["Referrals", 720, "14%"],
                  ["Social", 410, "8%"],
                ].map(([name, visitors, share]) => (
                  <UI.TableRow key={name}>
                    <UI.TableCell>{name}</UI.TableCell>
                    <UI.TableCell>
                      {(Number(visitors) * (monthly ? 4 : 1)).toLocaleString()}
                    </UI.TableCell>
                    <UI.TableCell>{share}</UI.TableCell>
                  </UI.TableRow>
                ))}
              </UI.TableBody>
            </UI.Table>
          </UI.CardContent>
        </UI.Card>
        <UI.Card>
          <UI.CardHeader>
            <UI.CardTitle>Monthly target</UI.CardTitle>
            <UI.CardDescription>October revenue goal</UI.CardDescription>
          </UI.CardHeader>
          <UI.CardContent>
            <div className="target-value">
              $20,600 <span>/ $30,000</span>
            </div>
            <UI.Progress value={69} aria-label="Monthly revenue target" />
            <p className="muted mt-5">
              69% of the way there. Another $9,400 reaches this month's target.
            </p>
            <UI.Badge variant="secondary" className="mt-5">
              On track
            </UI.Badge>
          </UI.CardContent>
        </UI.Card>
      </div>
    </div>
  );
}
type Task = {
  id: number;
  title: string;
  category: string;
  owner: string;
  status: number;
};
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Map the onboarding flow",
    category: "Design",
    owner: "AL",
    status: 0,
  },
  {
    id: 2,
    title: "Write the release notes",
    category: "Content",
    owner: "JM",
    status: 0,
  },
  {
    id: 3,
    title: "Build the account settings",
    category: "Engineering",
    owner: "SK",
    status: 1,
  },
  {
    id: 4,
    title: "Review the component library",
    category: "Design",
    owner: "AL",
    status: 1,
  },
  {
    id: 5,
    title: "Audit keyboard navigation",
    category: "Engineering",
    owner: "SK",
    status: 2,
  },
  {
    id: 6,
    title: "Define the theme tokens",
    category: "Design",
    owner: "JM",
    status: 2,
  },
];
function Projects() {
  const [tasks, setTasks] = useState(initialTasks);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All work");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Design");
  const done = tasks.filter((t) => t.status === 2).length;
  const visible = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) &&
      (filter === "All work" || t.category === filter),
  );
  return (
    <div className="mock-content">
      <PageTitle
        eyebrow="PROJECT / WEBSITE LAUNCH"
        title="Good work happens together."
        description="A shared space for the next release."
      >
        <UI.Dialog open={open} onOpenChange={setOpen}>
          <UI.DialogTrigger asChild>
            <UI.Button>
              <Plus />
              New task
            </UI.Button>
          </UI.DialogTrigger>
          <UI.DialogContent>
            <UI.DialogHeader>
              <UI.DialogTitle>Create a task</UI.DialogTitle>
              <UI.DialogDescription>
                Add a task to the Website launch board.
              </UI.DialogDescription>
            </UI.DialogHeader>
            <form
              className="demo-stack"
              onSubmit={(e) => {
                e.preventDefault();
                if (!title.trim()) return;
                setTasks([
                  ...tasks,
                  {
                    id: Date.now(),
                    title: title.trim(),
                    category,
                    owner: "AL",
                    status: 0,
                  },
                ]);
                setOpen(false);
                setTitle("");
                UI.toast.success("Task added to Backlog");
              }}
            >
              <UI.Field>
                <UI.FieldLabel htmlFor="task-title">Task title</UI.FieldLabel>
                <UI.Input
                  id="task-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={100}
                  placeholder="What needs to happen?"
                />
              </UI.Field>
              <UI.Field>
                <UI.FieldLabel htmlFor="task-category">Category</UI.FieldLabel>
                <UI.NativeSelect
                  id="task-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {["Design", "Engineering", "Content"].map((x) => (
                    <UI.NativeSelectOption key={x}>{x}</UI.NativeSelectOption>
                  ))}
                </UI.NativeSelect>
              </UI.Field>
              <UI.Button type="submit" disabled={!title.trim()}>
                Create task
              </UI.Button>
            </form>
          </UI.DialogContent>
        </UI.Dialog>
      </PageTitle>
      <div className="project-summary">
        <div>
          <span className="micro">RELEASE PROGRESS</span>
          <strong>
            {done} of {tasks.length} tasks complete
          </strong>
          <UI.Progress
            value={(done / tasks.length) * 100}
            aria-label="Release progress"
          />
        </div>
        <div className="demo-row">
          <UI.Avatar>
            <UI.AvatarFallback>AL</UI.AvatarFallback>
          </UI.Avatar>
          <UI.Avatar>
            <UI.AvatarFallback>JM</UI.AvatarFallback>
          </UI.Avatar>
          <UI.Avatar>
            <UI.AvatarFallback>SK</UI.AvatarFallback>
          </UI.Avatar>
          <span className="muted">3 teammates</span>
        </div>
      </div>
      <div className="board-controls">
        <UI.Input
          aria-label="Search tasks"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks…"
        />
        <UI.NativeSelect
          aria-label="Filter task category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {["All work", "Design", "Engineering", "Content"].map((x) => (
            <UI.NativeSelectOption key={x}>{x}</UI.NativeSelectOption>
          ))}
        </UI.NativeSelect>
      </div>
      <div className="kanban">
        {["Backlog", "In progress", "Done"].map((name, status) => (
          <section key={name}>
            <h2>
              <span className={`board-dot dot-${status}`} />
              {name}
              <span>{visible.filter((t) => t.status === status).length}</span>
            </h2>
            {visible
              .filter((t) => t.status === status)
              .map((t) => (
                <UI.Card key={t.id} className="task-card">
                  <UI.CardContent>
                    <div className="demo-row justify-between">
                      <UI.Badge variant="outline">{t.category}</UI.Badge>
                      <span className="micro">
                        ORB-{String(t.id).slice(-3)}
                      </span>
                    </div>
                    <h3>{t.title}</h3>
                    <div className="demo-row justify-between">
                      <UI.Avatar className="size-7">
                        <UI.AvatarFallback>{t.owner}</UI.AvatarFallback>
                      </UI.Avatar>
                      <UI.Button
                        size="xs"
                        variant="ghost"
                        onClick={() =>
                          setTasks(
                            tasks.map((task) =>
                              task.id === t.id
                                ? { ...task, status: (status + 1) % 3 }
                                : task,
                            ),
                          )
                        }
                      >
                        {status === 2
                          ? "Reopen"
                          : status === 0
                            ? "Start task"
                            : "Complete"}
                        {status === 1 ? <Check /> : <ArrowRight />}
                      </UI.Button>
                    </div>
                  </UI.CardContent>
                </UI.Card>
              ))}
            {!visible.some((t) => t.status === status) && (
              <p className="board-empty">No tasks here.</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
const contacts = [
  {
    name: "Maya Chen",
    initials: "MC",
    subject: "Inviting the rest of our team",
    text: "Hi! We're ready to bring the whole team into Orbit. Can we invite everyone at once?",
    time: "12 min",
    tag: "Onboarding",
  },
  {
    name: "Theo Martin",
    initials: "TM",
    subject: "A question about exports",
    text: "Can I download a CSV of our monthly activity? I need it for our team report.",
    time: "38 min",
    tag: "Product",
  },
  {
    name: "Sam Rivera",
    initials: "SR",
    subject: "Love the new workspace",
    text: "The new board is so much easier to use. Just wanted to say thanks to the team!",
    time: "1 hr",
    tag: "Feedback",
  },
];
function CustomerInbox() {
  const [active, setActive] = useState(0);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [replies, setReplies] = useState<Record<number, string[]>>({});
  const [resolved, setResolved] = useState<number[]>([]);
  const contact = contacts[active];
  return (
    <div className="mock-content">
      <PageTitle
        eyebrow="TEAM INBOX"
        title="Every conversation matters."
        description={`${contacts.length - resolved.length} open conversations. You're all caught up on urgent requests.`}
      />
      <div className="inbox-layout">
        <aside className="conversation-list">
          <UI.Input
            aria-label="Search conversations"
            placeholder="Search conversations…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {contacts
            .filter((c) =>
              `${c.name} ${c.subject}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((c) => {
              const index = contacts.indexOf(c);
              return (
                <button
                  key={c.name}
                  className={active === index ? "selected" : ""}
                  onClick={() => {
                    setActive(index);
                    setDraft("");
                  }}
                >
                  <div className="demo-row">
                    <UI.Avatar>
                      <UI.AvatarFallback>{c.initials}</UI.AvatarFallback>
                    </UI.Avatar>
                    <strong>{c.name}</strong>
                    <span className="micro">{c.time}</span>
                  </div>
                  <h2>{c.subject}</h2>
                  <p>{c.text}</p>
                  <UI.Badge
                    variant={resolved.includes(index) ? "secondary" : "outline"}
                  >
                    {resolved.includes(index) ? "Resolved" : c.tag}
                  </UI.Badge>
                </button>
              );
            })}
          {!contacts.some((c) =>
            `${c.name} ${c.subject}`
              .toLowerCase()
              .includes(query.toLowerCase()),
          ) && <p className="muted p-4">No conversations match your search.</p>}
        </aside>
        <section className="conversation-detail">
          <header>
            <div>
              <h2>{contact.subject}</h2>
              <p className="muted">{contact.name} · Customer since Sep 2026</p>
            </div>
            <UI.Button
              size="sm"
              variant="outline"
              onClick={() =>
                setResolved(
                  resolved.includes(active)
                    ? resolved.filter((x) => x !== active)
                    : [...resolved, active],
                )
              }
            >
              <CheckCheck />
              {resolved.includes(active) ? "Reopen" : "Resolve"}
            </UI.Button>
          </header>
          <div
            className="conversation-messages"
            role="log"
            aria-label="Conversation messages"
            aria-live="polite"
          >
            <UI.Marker variant="separator">
              <UI.MarkerContent>Today</UI.MarkerContent>
            </UI.Marker>
            <UI.Message>
              <UI.MessageContent>
                <UI.MessageHeader>{contact.name}</UI.MessageHeader>
                <UI.Bubble variant="secondary">
                  <UI.BubbleContent>{contact.text}</UI.BubbleContent>
                </UI.Bubble>
                <UI.MessageFooter>10:42 AM</UI.MessageFooter>
              </UI.MessageContent>
            </UI.Message>
            {(replies[active] ?? []).map((reply, i) => (
              <UI.Message align="end" key={i}>
                <UI.MessageContent>
                  <UI.MessageHeader>You</UI.MessageHeader>
                  <UI.Bubble>
                    <UI.BubbleContent>{reply}</UI.BubbleContent>
                  </UI.Bubble>
                  <UI.MessageFooter>Sent in preview</UI.MessageFooter>
                </UI.MessageContent>
              </UI.Message>
            ))}
            {resolved.includes(active) && (
              <UI.Marker variant="separator">
                <UI.MarkerContent>Conversation resolved</UI.MarkerContent>
              </UI.Marker>
            )}
          </div>
          <form
            className="reply-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              setReplies({
                ...replies,
                [active]: [...(replies[active] ?? []), draft.trim()],
              });
              setDraft("");
            }}
          >
            <UI.Label htmlFor="reply">
              Reply to {contact.name.split(" ")[0]}
            </UI.Label>
            <UI.Textarea
              id="reply"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a helpful reply…"
              rows={3}
              disabled={resolved.includes(active)}
            />
            <div className="demo-row justify-between">
              <span className="micro">
                {resolved.includes(active)
                  ? "REOPEN TO REPLY"
                  : "VISIBLE IN THIS PREVIEW ONLY"}
              </span>
              <UI.Button
                type="submit"
                size="sm"
                disabled={!draft.trim() || resolved.includes(active)}
              >
                Send reply <Send />
              </UI.Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
const defaultProfile = {
  name: "Alex Lee",
  email: "alex@example.com",
  bio: "Product designer building thoughtful tools for small teams.",
  role: "Designer",
  updates: true,
  digest: false,
  plan: "team",
};
function Settings() {
  const [saved, setSaved] = useState(defaultProfile);
  const [profile, setProfile] = useState(defaultProfile);
  const [tab, setTab] = useState("profile");
  const dirty = JSON.stringify(saved) !== JSON.stringify(profile);
  return (
    <div className="mock-content">
      <PageTitle
        eyebrow="YOUR WORKSPACE"
        title="Make yourself at home."
        description="Your profile, preferences, and workspace plan."
      />
      <UI.Tabs value={tab} onValueChange={setTab}>
        <UI.TabsList className="mb-7">
          <UI.TabsTrigger value="profile">Profile</UI.TabsTrigger>
          <UI.TabsTrigger value="notifications">Notifications</UI.TabsTrigger>
          <UI.TabsTrigger value="plan">Plan</UI.TabsTrigger>
        </UI.TabsList>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(profile);
            UI.toast.success("Preferences saved in this preview");
          }}
        >
          <UI.TabsContent value="profile">
            <div className="settings-section">
              <div>
                <h2>Personal information</h2>
                <p>This is how you'll appear to your team.</p>
              </div>
              <UI.Card>
                <UI.CardContent className="demo-stack">
                  <div className="demo-row">
                    <UI.Avatar className="size-14">
                      <UI.AvatarFallback>
                        {profile.name
                          .split(" ")
                          .map((x) => x[0])
                          .join("")
                          .slice(0, 2)}
                      </UI.AvatarFallback>
                    </UI.Avatar>
                    <div>
                      <strong>{saved.name}</strong>
                      <p className="muted">Acme Studio · Team member</p>
                    </div>
                  </div>
                  <UI.Separator />
                  <UI.Field>
                    <UI.FieldLabel htmlFor="profile-name">
                      Full name
                    </UI.FieldLabel>
                    <UI.Input
                      id="profile-name"
                      value={profile.name}
                      required
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                  </UI.Field>
                  <UI.Field>
                    <UI.FieldLabel htmlFor="profile-email">
                      Email address
                    </UI.FieldLabel>
                    <UI.Input
                      id="profile-email"
                      type="email"
                      required
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                  </UI.Field>
                  <UI.Field>
                    <UI.FieldLabel htmlFor="profile-role">Role</UI.FieldLabel>
                    <UI.NativeSelect
                      id="profile-role"
                      value={profile.role}
                      onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })
                      }
                    >
                      {[
                        "Designer",
                        "Engineer",
                        "Product manager",
                        "Founder",
                      ].map((x) => (
                        <UI.NativeSelectOption key={x}>
                          {x}
                        </UI.NativeSelectOption>
                      ))}
                    </UI.NativeSelect>
                  </UI.Field>
                  <UI.Field>
                    <UI.FieldLabel htmlFor="profile-bio">Bio</UI.FieldLabel>
                    <UI.Textarea
                      id="profile-bio"
                      maxLength={240}
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                    />
                    <UI.FieldDescription>
                      {profile.bio.length}/240 characters
                    </UI.FieldDescription>
                  </UI.Field>
                </UI.CardContent>
              </UI.Card>
            </div>
          </UI.TabsContent>
          <UI.TabsContent value="notifications">
            <div className="settings-section">
              <div>
                <h2>Keep up with your team</h2>
                <p>Choose the updates that are useful to you.</p>
              </div>
              <UI.Card>
                <UI.CardContent>
                  {[
                    {
                      key: "updates" as const,
                      title: "Project updates",
                      description:
                        "New assignments, mentions, and status changes.",
                    },
                    {
                      key: "digest" as const,
                      title: "Weekly digest",
                      description: "A Monday recap of your team's progress.",
                    },
                  ].map((item) => (
                    <div className="preference-row" key={item.key}>
                      <div>
                        <UI.Label htmlFor={item.key}>{item.title}</UI.Label>
                        <p>{item.description}</p>
                      </div>
                      <UI.Switch
                        id={item.key}
                        checked={profile[item.key]}
                        onCheckedChange={(value) =>
                          setProfile({ ...profile, [item.key]: value })
                        }
                      />
                    </div>
                  ))}
                </UI.CardContent>
              </UI.Card>
            </div>
          </UI.TabsContent>
          <UI.TabsContent value="plan">
            <div className="settings-section">
              <div>
                <h2>Room for your next idea</h2>
                <p>
                  Compare plans for this example workspace. No purchases are
                  made.
                </p>
              </div>
              <UI.Card>
                <UI.CardContent>
                  <UI.RadioGroup
                    aria-label="Workspace plan"
                    value={profile.plan}
                    onValueChange={(plan) => setProfile({ ...profile, plan })}
                  >
                    {[
                      {
                        id: "starter",
                        name: "Starter",
                        price: "Free",
                        detail: "3 projects · 1 member",
                      },
                      {
                        id: "team",
                        name: "Team",
                        price: "$12 / member",
                        detail: "Unlimited projects · Shared workspaces",
                      },
                      {
                        id: "business",
                        name: "Business",
                        price: "$24 / member",
                        detail: "Advanced permissions · Priority support",
                      },
                    ].map((p) => (
                      <label className="plan-option" key={p.id}>
                        <UI.RadioGroupItem value={p.id} />
                        <div>
                          <strong>{p.name}</strong>
                          <p>{p.detail}</p>
                        </div>
                        <span>{p.price}</span>
                      </label>
                    ))}
                  </UI.RadioGroup>
                </UI.CardContent>
              </UI.Card>
            </div>
          </UI.TabsContent>
          <div className="settings-actions">
            <span className="muted" aria-live="polite">
              {dirty
                ? "You have unsaved changes."
                : "All changes saved in this preview."}
            </span>
            <UI.Button
              type="button"
              variant="outline"
              disabled={!dirty}
              onClick={() => setProfile(saved)}
            >
              Discard
            </UI.Button>
            <UI.Button
              type="submit"
              disabled={
                !dirty ||
                !profile.name.trim() ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)
              }
            >
              Save changes
            </UI.Button>
          </div>
        </form>
      </UI.Tabs>
    </div>
  );
}
function Booking() {
  const [service, setService] = useState("review");
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 14));
  const [time, setTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (confirmed) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document
        .getElementById("booking-confirmation")
        ?.focus({ preventScroll: true });
    }
  }, [confirmed]);
  const serviceName =
    service === "review" ? "Portfolio review" : "Product consultation";
  const dateLabel = date?.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  if (confirmed)
    return (
      <div
        className="booking-confirmed"
        id="booking-confirmation"
        tabIndex={-1}
      >
        <div className="confirmation-icon">
          <Check size={30} />
        </div>
        <p className="eyebrow">YOU'RE ON THE CALENDAR</p>
        <h1>See you soon, {name.split(" ")[0]}.</h1>
        <p>Your mock {serviceName.toLowerCase()} is booked.</p>
        <UI.Card>
          <UI.CardContent>
            <strong>{dateLabel}</strong>
            <p>{time} · America/Los_Angeles</p>
            <UI.Separator className="my-4" />
            <p>{email}</p>
            <p className="muted mt-3">
              This is a preview. No email was sent and no real appointment was
              created.
            </p>
          </UI.CardContent>
        </UI.Card>
        <UI.Button
          variant="outline"
          onClick={() => {
            setConfirmed(false);
            setTime("");
          }}
        >
          Book another session
        </UI.Button>
      </div>
    );
  return (
    <div className="mock-content">
      <PageTitle
        eyebrow="STUDIO HOURS / WITH JORDAN PARK"
        title="A fresh pair of eyes."
        description="Bring your work. Leave with a clear next step."
      />
      <div className="booking-layout">
        <aside>
          <UI.Card>
            <UI.CardContent>
              <UI.Avatar className="size-16 mb-5">
                <UI.AvatarFallback>JP</UI.AvatarFallback>
              </UI.Avatar>
              <h2>Jordan Park</h2>
              <p className="muted">Independent product designer</p>
              <p className="booking-bio">
                I help small teams untangle product decisions. Let's work
                through the details together.
              </p>
              <div className="booking-meta">
                <Clock size={16} />
                {service === "review" ? "30" : "60"} minutes
              </div>
              <div className="booking-meta">
                <Video size={16} />
                Video call
              </div>
              <UI.Separator className="my-5" />
              <p className="micro">SAMPLE AVAILABILITY</p>
              <p className="muted mt-2">October 2026 · Los Angeles time</p>
            </UI.CardContent>
          </UI.Card>
          <UI.Alert className="mt-5">
            <UI.AlertTitle>Try the booking flow</UI.AlertTitle>
            <UI.AlertDescription>
              All sessions and availability on this page are sample data.
            </UI.AlertDescription>
          </UI.Alert>
        </aside>
        <form
          className="booking-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (date && time && name.trim()) setConfirmed(true);
          }}
        >
          <section>
            <h2>
              <span>01</span>Choose a session
            </h2>
            <UI.RadioGroup
              value={service}
              onValueChange={(value) => {
                setService(value);
                setTime("");
              }}
              aria-label="Session type"
              className="service-options"
            >
              {[
                {
                  id: "review",
                  name: "Portfolio review",
                  detail: "30 min · $45",
                },
                {
                  id: "consult",
                  name: "Product consultation",
                  detail: "60 min · $90",
                },
              ].map((s) => (
                <label className="service-option" key={s.id}>
                  <UI.RadioGroupItem value={s.id} />
                  <div>
                    <strong>{s.name}</strong>
                    <p>{s.detail}</p>
                  </div>
                </label>
              ))}
            </UI.RadioGroup>
          </section>
          <section>
            <h2>
              <span>02</span>Find a time
            </h2>
            <div className="booking-date">
              <UI.Calendar
                mode="single"
                selected={date}
                onSelect={(value) => {
                  setDate(value);
                  setTime("");
                }}
                defaultMonth={new Date(2026, 9, 1)}
                startMonth={new Date(2026, 9, 1)}
                endMonth={new Date(2026, 9, 1)}
                disabled={[
                  { dayOfWeek: [0, 6] },
                  { before: new Date(2026, 9, 6) },
                  { after: new Date(2026, 9, 30) },
                ]}
                className="bg-transparent p-0"
              />
              <div className="time-slots">
                <p className="muted">
                  {date
                    ? date.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })
                    : "Select a date"}
                </p>
                <UI.RadioGroup
                  aria-label="Available time"
                  value={time}
                  onValueChange={setTime}
                  disabled={!date}
                >
                  {(service === "review"
                    ? ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM"]
                    : ["9:00 AM", "1:00 PM"]
                  ).map((t) => (
                    <label
                      key={t}
                      className={`time-slot ${time === t ? "selected" : ""}`}
                    >
                      <UI.RadioGroupItem value={t} />
                      {t}
                    </label>
                  ))}
                </UI.RadioGroup>
                <span className="micro">AMERICA/LOS_ANGELES</span>
              </div>
            </div>
          </section>
          <section>
            <h2>
              <span>03</span>Your details
            </h2>
            <div className="form-columns">
              <UI.Field>
                <UI.FieldLabel htmlFor="booking-name">Name</UI.FieldLabel>
                <UI.Input
                  id="booking-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </UI.Field>
              <UI.Field>
                <UI.FieldLabel htmlFor="booking-email">Email</UI.FieldLabel>
                <UI.Input
                  id="booking-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </UI.Field>
            </div>
          </section>
          <div className="booking-submit">
            <p className="muted">
              {date && time
                ? `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} at ${time} · ${service === "review" ? "$45" : "$90"}`
                : "Select a date and time to continue."}
            </p>
            <UI.Button
              type="submit"
              disabled={!date || !time || !name.trim() || !email}
            >
              Confirm mock booking <ArrowRight />
            </UI.Button>
          </div>
        </form>
      </div>
    </div>
  );
}
