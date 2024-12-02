"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Link from "next/link"
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
  if (!recentSessions.length) {
    return (
      <Card className="h-[300px]">
        <CardHeader className="flex items-center justify-center">
          <CardTitle>Study Duration Trend</CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col items-center gap-4 py-10">
          <p className="text-balance text-center text-muted-foreground">
            Start studying to see your duration trends over time!
          </p>
          <Button asChild>
            <Link href="/dashboard/study">Start Studying</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }
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
        <ChartContainer config={chartConfig} className="min-h-0 w-full p-2">
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
