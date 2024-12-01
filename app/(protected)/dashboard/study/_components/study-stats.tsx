import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { formatHours, formatTimeTimer } from "@/lib/utils"
import { ChartBar } from "lucide-react"
import NumberFlow from "@number-flow/react"

export default function StudyStats({
  studyTime,
  progress,
  totalStudyTime,
}: {
  studyTime: number
  progress: number
  totalStudyTime: number
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ChartBar className="mr-2 h-5 w-5" /> Study Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Current Session</p>
            <p className="text-2xl font-bold">
              <NumberFlow value={studyTime} />
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="text-2xl font-bold">
              <NumberFlow
                value={Math.min(Math.round(progress), 100)}
                suffix="%"
              />
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Total Study Time</p>
            <p className="text-2xl font-bold">
              <NumberFlow
                value={totalStudyTime / 3600}
                format={{ maximumFractionDigits: 1 }}
                suffix="h"
              />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
