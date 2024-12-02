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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
} satisfies ChartConfig

export default function StudySessionDistribution({
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
          <CardTitle>Daily Study Sessions</CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col items-center gap-4 py-10">
          <p className="text-balance text-center text-muted-foreground">
            No study sessions recorded yet. Complete your first session to see
            your daily progress!
          </p>
          <Button asChild>
            <Link href="/dashboard/study">Start Studying</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const processedData = recentSessions.reduce<ProcessedData>((acc, session) => {
    const date = new Date(session.startTime).toLocaleDateString()
    if (!acc[date]) {
      acc[date] = { completed: 0, incomplete: 0 }
    }
    session.completed ? acc[date].completed++ : acc[date].incomplete++
    return acc
  }, {})

  const data: ChartDataPoint[] = Object.entries(processedData).map(
    ([date, counts]) => ({
      date,
      completed: counts.completed,
      incomplete: counts.incomplete,
    }),
  )

  return (
    <Card className="">
      <CardHeader className="flex items-center justify-center">
        <CardTitle>Daily Study Sessions</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-0">
        <ChartContainer config={chartConfig} className="min-h-0 w-full p-2">
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
