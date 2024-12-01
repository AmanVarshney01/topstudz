import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ToolbarProps, View, Views } from "react-big-calendar"

export function CalendarToolbar<TEvent extends object>(
  props: ToolbarProps<TEvent>,
) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => props.onNavigate("PREV")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => props.onNavigate("NEXT")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={() => props.onNavigate("TODAY")}>
          Today
        </Button>
      </div>

      <h2 className="text-lg font-semibold">{props.label}</h2>

      <Select
        value={props.view}
        onValueChange={(value) => props.onView(value as View)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select view" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Views.MONTH}>Month</SelectItem>
          <SelectItem value={Views.WEEK}>Week</SelectItem>
          <SelectItem value={Views.DAY}>Day</SelectItem>
          <SelectItem value={Views.AGENDA}>Agenda</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
