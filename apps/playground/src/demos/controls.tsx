import { useState } from "react";
import * as UI from "@cortex/ui";
import {
  ArrowUpRight,
  ArrowRight,
  Bold,
  Italic,
  Underline,
  Search,
  Plus,
  Minus,
  Command,
  Check,
  SlidersHorizontal,
} from "lucide-react";

export function ActionsDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="demo-stack">
      <div className="demo-row">
        <UI.Button onClick={() => setCount(count + 1)}>
          Button <ArrowUpRight />
        </UI.Button>
        <UI.Button
          variant="secondary"
          onClick={() => UI.toast("Secondary action selected")}
        >
          Secondary
        </UI.Button>
        <UI.Button
          variant="outline"
          onClick={() => UI.toast("Outline action selected")}
        >
          Outline
        </UI.Button>
      </div>
      <UI.InputGroup>
        <UI.InputGroupAddon>
          <Search />
        </UI.InputGroupAddon>
        <UI.InputGroupInput
          aria-label="Sample search"
          placeholder="Search something…"
        />
        <UI.InputGroupAddon align="inline-end">
          <UI.Kbd>⌘ K</UI.Kbd>
        </UI.InputGroupAddon>
      </UI.InputGroup>
      <div className="demo-row">
        <UI.Button variant="ghost" size="sm" onClick={() => setCount(0)}>
          Reset
        </UI.Button>
        <UI.Button variant="link" size="sm" asChild>
          <a href="#panel-overlays">
            Open overlays <ArrowRight />
          </a>
        </UI.Button>
        <UI.Button
          variant="destructive"
          size="sm"
          onClick={() =>
            UI.toast.error("A destructive action preview. No data was deleted.")
          }
        >
          Delete
        </UI.Button>
        <UI.Button disabled size="sm">
          Disabled
        </UI.Button>
      </div>
      <div className="demo-row justify-between">
        <UI.Badge>Interactive</UI.Badge>
        <span className="micro" aria-live="polite">
          {String(count).padStart(2, "0")} ACTIVATIONS
        </span>
      </div>
    </div>
  );
}
export function GoalDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 10, 24));
  const [saved, setSaved] = useState(false);
  return (
    <form
      className="demo-stack"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
        UI.toast.success("Milestone created", {
          description: "Your prototype goal is ready.",
        });
      }}
    >
      <UI.Field>
        <UI.FieldLabel htmlFor="goal-name">Goal name</UI.FieldLabel>
        <UI.Input
          id="goal-name"
          required
          placeholder="Build something meaningful"
          onChange={() => setSaved(false)}
        />
      </UI.Field>
      <div className="grid grid-cols-2 gap-3">
        <UI.Field>
          <UI.FieldLabel htmlFor="goal-amount">Target amount</UI.FieldLabel>
          <UI.InputGroup>
            <UI.InputGroupAddon>$</UI.InputGroupAddon>
            <UI.InputGroupInput
              id="goal-amount"
              type="number"
              min="1"
              defaultValue="15000"
              required
            />
          </UI.InputGroup>
        </UI.Field>
        <UI.Field>
          <UI.FieldLabel htmlFor="goal-date">Target date</UI.FieldLabel>
          <UI.DatePicker id="goal-date" value={date} onChange={setDate} />
        </UI.Field>
      </div>
      <UI.Button type="submit" className="w-full">
        {saved ? (
          <>
            <Check /> Goal created
          </>
        ) : (
          <>
            Create milestone <ArrowUpRight />
          </>
        )}
      </UI.Button>
      <span className="micro" aria-live="polite">
        {saved
          ? "MILESTONE SAVED IN THIS PREVIEW"
          : "DEFINE A TARGET. MAKE IT HAPPEN."}
      </span>
    </form>
  );
}
export function SelectionDemo() {
  const [volume, setVolume] = useState([64]);
  return (
    <div className="demo-stack">
      <div className="demo-row justify-between">
        <UI.Label htmlFor="live-sync">Live synchronization</UI.Label>
        <UI.Switch id="live-sync" defaultChecked />
      </div>
      <div className="demo-row">
        <UI.Checkbox id="notifications" defaultChecked />
        <UI.Label htmlFor="notifications">Enable notifications</UI.Label>
      </div>
      <UI.Separator />
      <UI.RadioGroup
        defaultValue="balanced"
        aria-label="Performance mode"
        className="flex flex-wrap gap-4"
      >
        {["eco", "balanced", "boost"].map((x) => (
          <div className="demo-row" key={x}>
            <UI.RadioGroupItem value={x} id={`mode-${x}`} />
            <UI.Label htmlFor={`mode-${x}`} className="capitalize">
              {x}
            </UI.Label>
          </div>
        ))}
      </UI.RadioGroup>
      <div className="demo-row justify-between">
        <UI.Label htmlFor="signal-level">Signal strength</UI.Label>
        <span className="micro">{volume[0]}%</span>
      </div>
      <UI.Slider
        id="signal-level"
        aria-label="Signal strength"
        value={volume}
        onValueChange={setVolume}
      />
    </div>
  );
}
export function SelectDemo() {
  const items = ["React", "Next.js", "Vue", "Svelte", "Astro"];
  return (
    <div className="demo-stack">
      <UI.Field>
        <UI.FieldLabel htmlFor="framework">Framework</UI.FieldLabel>
        <UI.Combobox items={items}>
          <UI.ComboboxInput id="framework" placeholder="Search frameworks…" />
          <UI.ComboboxContent>
            <UI.ComboboxEmpty>No framework found.</UI.ComboboxEmpty>
            <UI.ComboboxList>
              {(item: string) => (
                <UI.ComboboxItem key={item} value={item}>
                  {item}
                </UI.ComboboxItem>
              )}
            </UI.ComboboxList>
          </UI.ComboboxContent>
        </UI.Combobox>
      </UI.Field>
      <UI.Select defaultValue="pro">
        <UI.SelectTrigger aria-label="Plan" className="w-full">
          <UI.SelectValue />
        </UI.SelectTrigger>
        <UI.SelectContent>
          <UI.SelectGroup>
            <UI.SelectLabel>Workspace plan</UI.SelectLabel>
            <UI.SelectItem value="free">Explorer</UI.SelectItem>
            <UI.SelectItem value="pro">Builder</UI.SelectItem>
            <UI.SelectItem value="team">Collective</UI.SelectItem>
          </UI.SelectGroup>
        </UI.SelectContent>
      </UI.Select>
      <UI.NativeSelect aria-label="Region" defaultValue="west">
        <UI.NativeSelectOption value="west">
          US West · Oregon
        </UI.NativeSelectOption>
        <UI.NativeSelectOption value="east">
          US East · Virginia
        </UI.NativeSelectOption>
        <UI.NativeSelectOption value="eu">
          Europe · Frankfurt
        </UI.NativeSelectOption>
      </UI.NativeSelect>
    </div>
  );
}
export function CalendarDemo() {
  const [day, setDay] = useState<Date | undefined>(new Date(2026, 9, 4));
  return (
    <UI.Calendar
      mode="single"
      selected={day}
      onSelect={setDay}
      defaultMonth={new Date(2026, 9, 1)}
      className="mx-auto w-fit max-w-full bg-transparent p-0 [--cell-size:--spacing(7)]"
    />
  );
}
export function EditorDemo() {
  const [zoom, setZoom] = useState(100);
  return (
    <div className="demo-stack">
      <div className="demo-row justify-between">
        <UI.ToggleGroup type="multiple" aria-label="Text formatting">
          <UI.ToggleGroupItem value="bold" aria-label="Bold">
            <Bold />
          </UI.ToggleGroupItem>
          <UI.ToggleGroupItem value="italic" aria-label="Italic">
            <Italic />
          </UI.ToggleGroupItem>
          <UI.ToggleGroupItem value="underline" aria-label="Underline">
            <Underline />
          </UI.ToggleGroupItem>
        </UI.ToggleGroup>
        <UI.Toggle aria-label="Toggle advanced editing" variant="outline">
          <SlidersHorizontal />
        </UI.Toggle>
      </div>
      <UI.Textarea
        aria-label="Editor text"
        placeholder="A space for your next idea…"
        defaultValue="Good interfaces get out of the way."
        className="min-h-20"
      />
      <div className="demo-row justify-between">
        <UI.ButtonGroup aria-label="Zoom controls">
          <UI.Button
            variant="outline"
            size="icon-sm"
            aria-label="Zoom out"
            onClick={() => setZoom(Math.max(25, zoom - 25))}
          >
            <Minus />
          </UI.Button>
          <UI.ButtonGroupText className="text-xs">{zoom}%</UI.ButtonGroupText>
          <UI.Button
            variant="outline"
            size="icon-sm"
            aria-label="Zoom in"
            onClick={() => setZoom(Math.min(200, zoom + 25))}
          >
            <Plus />
          </UI.Button>
        </UI.ButtonGroup>
        <UI.Kbd>
          <Command size={10} /> S
        </UI.Kbd>
      </div>
    </div>
  );
}
export function OtpDemo() {
  const [otp, setOtp] = useState("");
  return (
    <div className="demo-stack">
      <UI.Label htmlFor="access-code">Enter your access code</UI.Label>
      <UI.InputOTP
        id="access-code"
        maxLength={6}
        value={otp}
        onChange={setOtp}
        pattern="[0-9]*"
      >
        <UI.InputOTPGroup>
          {[0, 1, 2].map((i) => (
            <UI.InputOTPSlot key={i} index={i} />
          ))}
        </UI.InputOTPGroup>
        <UI.InputOTPSeparator />
        <UI.InputOTPGroup>
          {[3, 4, 5].map((i) => (
            <UI.InputOTPSlot key={i} index={i} />
          ))}
        </UI.InputOTPGroup>
      </UI.InputOTP>
      <p className="muted" aria-live="polite">
        {otp.length === 6
          ? "Code entered. Ready to verify."
          : "Six digits. One secure connection."}
      </p>
      <UI.Button
        variant="outline"
        disabled={otp.length !== 6}
        onClick={() => UI.toast.success("Code accepted in this demo")}
      >
        Verify connection <ArrowRight />
      </UI.Button>
    </div>
  );
}
