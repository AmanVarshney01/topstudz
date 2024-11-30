import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatTimeTimer } from "@/lib/utils"
import { Clock, Pause, Play, RotateCcw } from "lucide-react"

export default function StudyTimer({
  studyTime,
  studyDuration,
  isStudying,
  onStartStop,
  onReset,
}: {
  studyTime: number
  studyDuration: number
  isStudying: boolean
  onStartStop: () => void
  onReset: () => void
}) {
  const progress = (studyTime / studyDuration) * 100

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-2xl">
          <Clock className="mr-3 h-8 w-8" />
          Study Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center text-7xl font-bold tracking-tighter">
          {formatTimeTimer(studyTime)}
        </div>
        <Progress value={Math.min(progress, 100)} className="h-3" />
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={onStartStop} className="w-32">
            {isStudying ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start
              </>
            )}
          </Button>
          <Button
            size="lg"
            onClick={onReset}
            variant="outline"
            className="w-32"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
