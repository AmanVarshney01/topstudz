"use client"
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

interface SessionCounts {
  completed: number
  incomplete: number
}

interface ProcessedData {
  [key: string]: SessionCounts
}

interface ChartDataPoint extends SessionCounts {
  date: string
}

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  incomplete: {
    label: "Incomplete",
    color: "hsl(var(--chart-2))",
  },
}

export default function StudySessionDistribution() {
  const stats = useQuery(api.study.getFullStats)

  if (!stats?.recentSessions) {
    return null
  }

  const processedData = stats.recentSessions.reduce<ProcessedData>(
    (acc, session) => {
      const date = new Date(session.startTime).toLocaleDateString()
      if (!acc[date]) {
        acc[date] = { completed: 0, incomplete: 0 }
      }
      session.completed ? acc[date].completed++ : acc[date].incomplete++
      return acc
    },
    {},
  )

  const data: ChartDataPoint[] = Object.entries(processedData).map(
    ([date, counts]) => ({
      date,
      completed: counts.completed,
      incomplete: counts.incomplete,
    }),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Study Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="completed"
              stackId="a"
              fill="var(--color-completed)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="incomplete"
              stackId="a"
              fill="var(--color-incomplete)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}