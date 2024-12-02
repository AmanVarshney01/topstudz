import { useTopsStore } from "@/store/use-tops-store"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { Coins } from "lucide-react"

export function TopsDisplay() {
  const { currentSessionTops, useGetTotalTops } = useTopsStore()
  const totalStudyTime = useGetTotalTops()

  const displayTops = (totalStudyTime ?? 0) + currentSessionTops

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <div className="flex w-full cursor-help items-center gap-2 px-2 py-1">
          <Coins className="h-4 w-4 text-yellow-500" />
          <span className="font-medium text-yellow-500">
            {displayTops.toLocaleString()}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-[250px]" side="right">
        <div className="space-y-2">
          <p className="font-semibold">Tops - Study Currency</p>
          <p className="text-sm text-muted-foreground">
            Earn 1 top for every second of focused study time.
            {currentSessionTops > 0 && (
              <span className="text-yellow-500">
                {" "}
                (+{currentSessionTops} this session)
              </span>
            )}
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
