import { useState } from "react";
import * as UI from "@cortex/ui";
import { Bar, BarChart, CartesianGrid, XAxis, Area, AreaChart } from "recharts";
import {
  ArrowUpRight,
  Check,
  Circle,
  File,
  FolderOpen,
  Loader,
  Plus,
  Radio,
  Users,
} from "lucide-react";
const chartData = [
  { month: "May", value: 42 },
  { month: "Jun", value: 68 },
  { month: "Jul", value: 53 },
  { month: "Aug", value: 84 },
  { month: "Sep", value: 112 },
  { month: "Oct", value: 73 },
];
export function ChartDemo() {
  const [mode, setMode] = useState("bar");
  return (
    <div className="demo-stack">
      <div className="demo-row justify-between">
        <div>
          <span className="stat-value">432</span>
          <span className="micro ml-2 text-primary">+18.6% ↗</span>
        </div>
        <UI.Tabs value={mode} onValueChange={setMode}>
          <UI.TabsList className="h-7">
            <UI.TabsTrigger className="text-[10px]" value="bar">
              Bar
            </UI.TabsTrigger>
            <UI.TabsTrigger className="text-[10px]" value="area">
              Area
            </UI.TabsTrigger>
          </UI.TabsList>
        </UI.Tabs>
      </div>
      <UI.ChartContainer
        config={{ value: { label: "Contributions", color: "var(--primary)" } }}
        className="h-[130px] w-full"
      >
        {mode === "bar" ? (
          <BarChart data={chartData} accessibilityLayer>
            <defs>
              <linearGradient id="bar-glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--primary)" />
                <stop offset="1" stopColor="#215356" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="2 4" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
            />
            <UI.ChartTooltip content={<UI.ChartTooltipContent />} />
            <Bar dataKey="value" fill="url(#bar-glow)" radius={[2, 2, 0, 0]} />
          </BarChart>
        ) : (
          <AreaChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} strokeDasharray="2 4" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              fontSize={10}
            />
            <UI.ChartTooltip content={<UI.ChartTooltipContent />} />
            <Area
              dataKey="value"
              stroke="var(--primary)"
              fill="var(--primary)"
              fillOpacity={0.14}
            />
          </AreaChart>
        )}
      </UI.ChartContainer>
      <div className="grid grid-cols-2 gap-3">
        <div className="mini-stat">
          <span className="micro">UPCOMING</span>
          <strong>October 2026</strong>
          <span>Scheduled</span>
        </div>
        <div className="mini-stat">
          <span className="micro">RELEASE PLAN</span>
          <strong>Accelerated</strong>
          <span>Recurring</span>
        </div>
      </div>
    </div>
  );
}
export function IdentityDemo() {
  return (
    <div className="demo-stack">
      <div className="demo-row justify-between">
        <div className="demo-row -space-x-2">
          {["AK", "JL", "MN", "+3"].map((name, i) => (
            <UI.Avatar
              key={name}
              className="size-10 border-2 border-background"
            >
              <UI.AvatarFallback
                className={
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-primary"
                }
              >
                {name}
              </UI.AvatarFallback>
            </UI.Avatar>
          ))}
        </div>
        <UI.Badge variant="outline">
          <span className="status-dot" /> Connected
        </UI.Badge>
      </div>
      <UI.Item variant="outline" size="sm">
        <UI.ItemMedia variant="icon">
          <Users />
        </UI.ItemMedia>
        <UI.ItemContent>
          <UI.ItemTitle>Design collective</UI.ItemTitle>
          <UI.ItemDescription>6 members · 3 online</UI.ItemDescription>
        </UI.ItemContent>
        <UI.ItemActions>
          <UI.Button
            variant="ghost"
            size="icon-sm"
            aria-label="Invite member"
            onClick={() => UI.toast("Invitation link created")}
          >
            <Plus />
          </UI.Button>
        </UI.ItemActions>
      </UI.Item>
      <div className="demo-row">
        <UI.Badge>Stable</UI.Badge>
        <UI.Badge variant="secondary">In progress</UI.Badge>
        <UI.Badge variant="destructive">Needs review</UI.Badge>
      </div>
      <UI.Marker variant="separator">
        <UI.MarkerIcon>
          <Radio />
        </UI.MarkerIcon>
        <UI.MarkerContent>LIVE CONNECTION</UI.MarkerContent>
      </UI.Marker>
    </div>
  );
}
const records = [
  { name: "Atlas", status: "Active", amount: 250 },
  { name: "Orbit", status: "Review", amount: 180 },
  { name: "Signal", status: "Active", amount: 320 },
  { name: "Pulse", status: "Draft", amount: 95 },
  { name: "Vector", status: "Active", amount: 410 },
  { name: "Echo", status: "Draft", amount: 125 },
];
export function TableDemo() {
  return (
    <UI.DataTable
      data={records}
      pageSize={3}
      aria-label="Projects"
      columns={[
        { accessorKey: "name", header: "Project" },
        {
          accessorKey: "status",
          header: "Status",
          cell: ({ getValue }) => (
            <UI.Badge variant="outline">{String(getValue())}</UI.Badge>
          ),
        },
        {
          accessorKey: "amount",
          header: "Budget",
          cell: ({ getValue }) => `$${getValue()}`,
        },
      ]}
    />
  );
}
export function LoadingDemo() {
  const [progress, setProgress] = useState(72);
  return (
    <div className="demo-stack">
      <div className="demo-row">
        <UI.Skeleton className="size-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <UI.Skeleton className="h-3 w-3/4" />
          <UI.Skeleton className="h-2 w-1/2" />
        </div>
      </div>
      <div className="demo-row justify-between">
        <span className="muted">Component synchronization</span>
        <span className="micro">{progress}%</span>
      </div>
      <UI.Progress value={progress} aria-label="Synchronization progress" />
      <div className="demo-row justify-between">
        <span className="demo-row text-xs text-muted-foreground">
          {progress === 100 ? <Check size={14} /> : <UI.Spinner />}{" "}
          {progress === 100 ? "Up to date" : "Syncing components"}
        </span>
        <UI.Button
          size="xs"
          variant="outline"
          onClick={() =>
            setProgress(progress === 100 ? 0 : Math.min(100, progress + 14))
          }
        >
          {progress === 100 ? "Restart" : "Advance"}
        </UI.Button>
      </div>
      <div className="demo-row">
        <UI.Badge variant="outline">
          <Circle className="fill-primary text-primary" /> Online
        </UI.Badge>
        <UI.Badge variant="secondary">
          <Loader /> Working
        </UI.Badge>
      </div>
    </div>
  );
}
export function EmptyDemo() {
  const [created, setCreated] = useState(false);
  return created ? (
    <div className="demo-stack">
      <UI.Item variant="outline">
        <UI.ItemMedia variant="icon">
          <File />
        </UI.ItemMedia>
        <UI.ItemContent>
          <UI.ItemTitle>Untitled experiment</UI.ItemTitle>
          <UI.ItemDescription>Created just now</UI.ItemDescription>
        </UI.ItemContent>
      </UI.Item>
      <UI.Button variant="ghost" onClick={() => setCreated(false)}>
        Reset empty state
      </UI.Button>
    </div>
  ) : (
    <UI.Empty className="p-3 md:p-4">
      <UI.EmptyHeader>
        <UI.EmptyMedia variant="icon">
          <FolderOpen />
        </UI.EmptyMedia>
        <UI.EmptyTitle className="text-base">Room for an idea</UI.EmptyTitle>
        <UI.EmptyDescription className="text-xs">
          Your next experiment starts here.
        </UI.EmptyDescription>
      </UI.EmptyHeader>
      <UI.EmptyContent>
        <UI.Button size="sm" onClick={() => setCreated(true)}>
          Create experiment <ArrowUpRight />
        </UI.Button>
      </UI.EmptyContent>
    </UI.Empty>
  );
}
