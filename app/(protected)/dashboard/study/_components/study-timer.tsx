import NumberFlow from "@number-flow/react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatTimeTimer } from "@/lib/utils"
import { Clock, Pause, Play, RotateCcw } from "lucide-react"
import { useTopsStore } from "@/store/use-tops-store"
import { useEffect } from "react"

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
  const { incrementTops, resetSessionTops } = useTopsStore()
  const progress = (studyTime / studyDuration) * 100
  const hours = Math.floor(studyTime / 3600)
  const minutes = Math.floor((studyTime % 3600) / 60)
  const seconds = studyTime % 60

  useEffect(() => {
    if (!isStudying) return

    const interval = setInterval(() => {
      incrementTops(1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isStudying, incrementTops])

  const handleReset = () => {
    resetSessionTops()
    onReset()
  }
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
          <div className="flex items-center justify-center">
            {hours > 0 && (
              <>
                <NumberFlow value={hours} />
                <span>:</span>
              </>
            )}
            <NumberFlow value={minutes} format={{ minimumIntegerDigits: 2 }} />
            <span>:</span>
            <NumberFlow value={seconds} format={{ minimumIntegerDigits: 2 }} />
          </div>
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
            onClick={handleReset}
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
