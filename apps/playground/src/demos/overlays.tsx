import { useState } from "react";
import * as UI from "@cortex/ui";
import {
  Bell,
  Copy,
  Download,
  ExternalLink,
  Folder,
  Info,
  Layers,
  MoreHorizontal,
  Settings,
  Trash2,
} from "lucide-react";

export function OverlaysDemo() {
  return (
    <div className="demo-stack">
      <p className="muted">Focused spaces for the next step.</p>
      <div className="demo-row">
        <UI.Dialog>
          <UI.DialogTrigger asChild>
            <UI.Button variant="outline">
              <Layers /> Dialog
            </UI.Button>
          </UI.DialogTrigger>
          <UI.DialogContent>
            <UI.DialogHeader>
              <UI.DialogTitle>Create a workspace</UI.DialogTitle>
              <UI.DialogDescription>
                Give your next experiment a place to live.
              </UI.DialogDescription>
            </UI.DialogHeader>
            <UI.Label htmlFor="workspace-name">Workspace name</UI.Label>
            <UI.Input id="workspace-name" defaultValue="Cortex Lab" />
            <UI.DialogFooter>
              <UI.DialogClose asChild>
                <UI.Button variant="outline">Cancel</UI.Button>
              </UI.DialogClose>
              <UI.DialogClose asChild>
                <UI.Button
                  onClick={() => UI.toast.success("Workspace created")}
                >
                  Create workspace
                </UI.Button>
              </UI.DialogClose>
            </UI.DialogFooter>
          </UI.DialogContent>
        </UI.Dialog>
        <UI.Sheet>
          <UI.SheetTrigger asChild>
            <UI.Button variant="outline">
              <Settings /> Sheet
            </UI.Button>
          </UI.SheetTrigger>
          <UI.SheetContent>
            <UI.SheetHeader>
              <UI.SheetTitle>Workspace settings</UI.SheetTitle>
              <UI.SheetDescription>
                Adjust how your workspace behaves.
              </UI.SheetDescription>
            </UI.SheetHeader>
            <div className="space-y-6 p-4">
              <div className="demo-row justify-between">
                <UI.Label htmlFor="sheet-sync">Automatic sync</UI.Label>
                <UI.Switch id="sheet-sync" defaultChecked />
              </div>
              <UI.Label htmlFor="sheet-description">Description</UI.Label>
              <UI.Textarea
                id="sheet-description"
                defaultValue="An open interface for new ideas."
              />
            </div>
            <UI.SheetFooter>
              <UI.SheetClose asChild>
                <UI.Button onClick={() => UI.toast.success("Settings saved")}>
                  Save settings
                </UI.Button>
              </UI.SheetClose>
            </UI.SheetFooter>
          </UI.SheetContent>
        </UI.Sheet>
      </div>
      <div className="demo-row">
        <UI.Drawer>
          <UI.DrawerTrigger asChild>
            <UI.Button variant="outline">Open drawer</UI.Button>
          </UI.DrawerTrigger>
          <UI.DrawerContent>
            <div className="mx-auto w-full max-w-md p-6">
              <UI.DrawerHeader>
                <UI.DrawerTitle>Daily focus</UI.DrawerTitle>
                <UI.DrawerDescription>
                  Set aside time for what matters.
                </UI.DrawerDescription>
              </UI.DrawerHeader>
              <p className="my-6 text-center text-5xl text-primary">
                120 <span className="text-sm text-muted-foreground">min</span>
              </p>
              <UI.Slider
                defaultValue={[120]}
                max={240}
                step={15}
                aria-label="Focus duration"
              />
              <UI.DrawerFooter>
                <UI.DrawerClose asChild>
                  <UI.Button
                    onClick={() => UI.toast.success("Focus session scheduled")}
                  >
                    Set focus time
                  </UI.Button>
                </UI.DrawerClose>
                <UI.DrawerClose asChild>
                  <UI.Button variant="ghost">Cancel</UI.Button>
                </UI.DrawerClose>
              </UI.DrawerFooter>
            </div>
          </UI.DrawerContent>
        </UI.Drawer>
        <UI.AlertDialog>
          <UI.AlertDialogTrigger asChild>
            <UI.Button variant="destructive">
              <Trash2 /> Alert dialog
            </UI.Button>
          </UI.AlertDialogTrigger>
          <UI.AlertDialogContent>
            <UI.AlertDialogHeader>
              <UI.AlertDialogTitle>
                Archive this experiment?
              </UI.AlertDialogTitle>
              <UI.AlertDialogDescription>
                This is a component demo. Your actual files will stay where they
                are.
              </UI.AlertDialogDescription>
            </UI.AlertDialogHeader>
            <UI.AlertDialogFooter>
              <UI.AlertDialogCancel>Keep experiment</UI.AlertDialogCancel>
              <UI.AlertDialogAction
                onClick={() => UI.toast("Experiment archived in this preview")}
              >
                Archive
              </UI.AlertDialogAction>
            </UI.AlertDialogFooter>
          </UI.AlertDialogContent>
        </UI.AlertDialog>
      </div>
      <UI.Separator />
      <span className="micro">ESC TO CLOSE / FOCUS RETURNS TO TRIGGER</span>
    </div>
  );
}
export function FloatingDemo() {
  return (
    <div className="demo-stack">
      <UI.Popover>
        <UI.PopoverTrigger asChild>
          <UI.Button variant="outline" className="w-full">
            <Settings /> Inspect properties
          </UI.Button>
        </UI.PopoverTrigger>
        <UI.PopoverContent aria-label="Object properties">
          <div className="demo-stack">
            <h3 className="text-sm font-medium">Object properties</h3>
            <UI.Label htmlFor="object-width">Width</UI.Label>
            <UI.Input id="object-width" defaultValue="320px" />
            <UI.Label htmlFor="object-height">Height</UI.Label>
            <UI.Input id="object-height" defaultValue="180px" />
          </div>
        </UI.PopoverContent>
      </UI.Popover>
      <div className="demo-row justify-between">
        <UI.HoverCard openDelay={150}>
          <UI.HoverCardTrigger asChild>
            <a
              href="#panel-identity"
              className="text-sm text-primary underline underline-offset-4"
            >
              @cortex
            </a>
          </UI.HoverCardTrigger>
          <UI.HoverCardContent>
            <div className="demo-row">
              <UI.Avatar>
                <UI.AvatarFallback>CX</UI.AvatarFallback>
              </UI.Avatar>
              <div>
                <h3 className="text-sm font-medium">Cortex Studio</h3>
                <p className="muted">Interfaces for curious people.</p>
              </div>
            </div>
          </UI.HoverCardContent>
        </UI.HoverCard>
        <UI.Tooltip>
          <UI.TooltipTrigger asChild>
            <UI.Button variant="ghost" size="icon" aria-label="Information">
              <Info />
            </UI.Button>
          </UI.TooltipTrigger>
          <UI.TooltipContent>Built to be explored.</UI.TooltipContent>
        </UI.Tooltip>
      </div>
      <p className="muted">
        Hover the studio name or focus the information icon.
      </p>
    </div>
  );
}
export function MenuDemo() {
  const [grid, setGrid] = useState(true);
  return (
    <div className="demo-stack">
      <UI.Menubar>
        <UI.MenubarMenu>
          <UI.MenubarTrigger>File</UI.MenubarTrigger>
          <UI.MenubarContent>
            <UI.MenubarItem onSelect={() => UI.toast("New document created")}>
              New document <UI.MenubarShortcut>⌘N</UI.MenubarShortcut>
            </UI.MenubarItem>
            <UI.MenubarItem onSelect={() => UI.toast("Export prepared")}>
              Export
            </UI.MenubarItem>
            <UI.MenubarSeparator />
            <UI.MenubarItem disabled>Print</UI.MenubarItem>
          </UI.MenubarContent>
        </UI.MenubarMenu>
        <UI.MenubarMenu>
          <UI.MenubarTrigger>View</UI.MenubarTrigger>
          <UI.MenubarContent>
            <UI.MenubarCheckboxItem checked={grid} onCheckedChange={setGrid}>
              Show grid
            </UI.MenubarCheckboxItem>
            <UI.MenubarItem onSelect={() => UI.toast("View reset")}>
              Reset view
            </UI.MenubarItem>
          </UI.MenubarContent>
        </UI.MenubarMenu>
        <UI.MenubarMenu>
          <UI.MenubarTrigger>Help</UI.MenubarTrigger>
          <UI.MenubarContent>
            <UI.MenubarItem
              onSelect={() =>
                UI.toast(
                  "Use the component index to explore all 66 components.",
                )
              }
            >
              Quick start
            </UI.MenubarItem>
          </UI.MenubarContent>
        </UI.MenubarMenu>
      </UI.Menubar>
      <UI.ContextMenu>
        <UI.ContextMenuTrigger
          className={`context-target ${grid ? "with-grid" : ""}`}
          tabIndex={0}
        >
          Right-click this area<span className="micro">CONTEXT MENU</span>
        </UI.ContextMenuTrigger>
        <UI.ContextMenuContent>
          <UI.ContextMenuItem
            onSelect={() => UI.toast("Copied to demo clipboard")}
          >
            <Copy /> Copy
          </UI.ContextMenuItem>
          <UI.ContextMenuItem
            onSelect={() => UI.toast("Asset export prepared")}
          >
            <Download /> Export
          </UI.ContextMenuItem>
          <UI.ContextMenuSeparator />
          <UI.ContextMenuSub>
            <UI.ContextMenuSubTrigger>Move to</UI.ContextMenuSubTrigger>
            <UI.ContextMenuSubContent>
              <UI.ContextMenuItem onSelect={() => UI.toast("Moved to archive")}>
                <Folder /> Archive
              </UI.ContextMenuItem>
            </UI.ContextMenuSubContent>
          </UI.ContextMenuSub>
        </UI.ContextMenuContent>
      </UI.ContextMenu>
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger asChild>
          <UI.Button variant="outline" className="w-full justify-between">
            Project actions <MoreHorizontal />
          </UI.Button>
        </UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent align="end">
          <UI.DropdownMenuLabel>Experiment 001</UI.DropdownMenuLabel>
          <UI.DropdownMenuSeparator />
          <UI.DropdownMenuItem onSelect={() => UI.toast("Share link prepared")}>
            <ExternalLink /> Share project
          </UI.DropdownMenuItem>
          <UI.DropdownMenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
            Grid enabled
          </UI.DropdownMenuCheckboxItem>
          <UI.DropdownMenuItem onSelect={() => UI.toast("Project archived")}>
            <Folder /> Archive
          </UI.DropdownMenuItem>
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
    </div>
  );
}
export function FeedbackDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="demo-stack">
      <UI.Alert>
        <Bell />
        <UI.AlertTitle>All systems operational</UI.AlertTitle>
        <UI.AlertDescription>Your workspace is up to date.</UI.AlertDescription>
      </UI.Alert>
      <div className="demo-row">
        <UI.Button
          variant="outline"
          size="sm"
          onClick={() =>
            UI.toast.success("Changes synchronized", {
              description: "All 66 components are ready.",
              action: { label: "Dismiss", onClick: () => {} },
            })
          }
        >
          Sonner toast
        </UI.Button>
        <UI.Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          Classic toast
        </UI.Button>
      </div>
      <UI.ToastProvider>
        <UI.Toast open={open} onOpenChange={setOpen}>
          <UI.ToastTitle>Connection established</UI.ToastTitle>
          <UI.ToastDescription>
            Your device is connected to the workspace.
          </UI.ToastDescription>
          <UI.ToastClose />
        </UI.Toast>
        <UI.ToastViewport />
      </UI.ToastProvider>
      <UI.Alert variant="destructive">
        <Info />
        <UI.AlertTitle>Offline preview</UI.AlertTitle>
        <UI.AlertDescription>
          Demo actions stay in this browser.
        </UI.AlertDescription>
      </UI.Alert>
    </div>
  );
}
