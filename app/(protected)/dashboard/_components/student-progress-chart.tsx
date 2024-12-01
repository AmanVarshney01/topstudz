"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { formatTime } from "@/lib/utils"

const chartConfig = {
  progress: {
    label: "Study Hours",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function StudentProgressChart({
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
  const monthlyData = recentSessions.reduce((acc: any, session) => {
    const date = new Date(session.startTime)
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })

    if (!acc[monthYear]) {
      acc[monthYear] = {
        month: monthYear,
        progress: 0,
      }
    }

    if (session.completed) {
      acc[monthYear].progress += session.duration / 3600
    }

    return acc
  }, {})

  const chartData = Object.values(monthlyData)
    .sort((a: any, b: any) => {
      const dateA = new Date(a.month)
      const dateB = new Date(b.month)
      return dateA.getTime() - dateB.getTime()
    })
    .slice(-6)

  const trend =
    chartData.length >= 2
      ? (((chartData[chartData.length - 1] as any).progress -
          (chartData[chartData.length - 2] as any).progress) /
          (chartData[chartData.length - 2] as any).progress) *
        100
      : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Study Progress</CardTitle>
        <CardDescription>Study hours per month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.split(" ")[0].slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="progress" fill="var(--color-progress)" radius={4}>
              <LabelList
                dataKey="progress"
                position="top"
                formatter={(value: number) => formatTime(value * 3600)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {trend !== 0 && (
          <div className="flex items-center gap-1 font-medium">
            {trend > 0 ? "Increased" : "Decreased"} by{" "}
            {Math.abs(trend).toFixed(1)}% from last month
            <TrendingUp
              className={`h-4 w-4 ${trend < 0 ? "rotate-180" : ""}`}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
