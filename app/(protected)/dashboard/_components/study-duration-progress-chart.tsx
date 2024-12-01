"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { formatTime } from "@/lib/utils"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

const chartConfig = {
  duration: {
    label: "Study Duration",
    color: "hsl(var(--chart-1))",
  },
}

export default function StudyDurationChart() {
  const stats = useQuery(api.study.getFullStats)

  const data = stats?.recentSessions.map((session) => ({
    date: new Date(session.startTime).toLocaleDateString(),
    duration: session.duration / 60,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Duration Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
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
