"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

const chartConfig = {
  duration: {
    label: "Duration",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function StudySessionsChart({
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
  const data = recentSessions
    .filter((session) => session.completed)
    .map((session) => ({
      date: new Date(session.startTime).toLocaleDateString(),
      duration: Math.floor(session.duration / 60), // Convert to minutes
    }))
    .reverse()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Sessions</CardTitle>
        <CardDescription>Your recent study activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}m`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="duration"
              stroke="var(--color-duration)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
