"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

const chartConfig = {
  duration: {
    label: "Study Duration",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function StudyDurationChart({
  recentSessions,
}: {
  recentSessions: {
    startTime: string
    endTime: string | null
    duration: number
    type: string
    completed: boolean
  }[]
}) {
  const data = recentSessions.map((session) => ({
    date: new Date(session.startTime).toLocaleDateString(),
    duration: session.duration / 60,
  }))

  return (
    <Card>
      <CardHeader className="flex items-center justify-center">
        <CardTitle>Study Duration Trend</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-0">
        <ChartContainer config={chartConfig} className="min-h-0 w-full">
          <LineChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }
            />
            <YAxis tickFormatter={(value) => `${value}min`} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="duration"
              stroke="var(--color-duration)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
