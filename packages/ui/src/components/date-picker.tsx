import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
};
export function DatePicker({ value, onChange, placeholder = "Pick a date", disabled, id, "aria-label": label = "Choose date" }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  return <Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button id={id} variant="outline" disabled={disabled} aria-label={label} data-slot="date-picker" className="w-full justify-between font-normal"><span>{value ? value.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : placeholder}</span><CalendarIcon /></Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={value} defaultMonth={value} onSelect={(date) => { onChange?.(date); setOpen(false); }} autoFocus /></PopoverContent></Popover>;
}
