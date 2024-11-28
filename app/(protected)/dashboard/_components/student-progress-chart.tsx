"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
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

export const description = "A bar chart showing study progress"

const chartConfig = {
  progress: {
    label: "Hours",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function StudentProgressChart() {
  const stats = useQuery(api.study.getStats)

  if (!stats) {
    return null
  }

  const monthlyData = stats.recentSessions.reduce((acc: any, session) => {
    const date = new Date(session.startTime)
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })

    if (!acc[monthYear]) {
      acc[monthYear] = {
        month: monthYear,
        totalHours: 0,
      }
    }

    if (session.completed) {
      acc[monthYear].totalHours += session.duration / 3600 // Convert seconds to hours
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
      ? (((chartData[chartData.length - 1] as any).totalHours -
          (chartData[chartData.length - 2] as any).totalHours) /
          (chartData[chartData.length - 2] as any).totalHours) *
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
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload?.[0]) return null
                const data = payload[0].payload
                return (
                  <div className="rounded-lg bg-white p-2 shadow-md dark:bg-gray-800">
                    <p className="font-semibold">{data.month}</p>
                    <p className="text-sm">
                      {formatTime(data.totalHours * 3600)}
                    </p>
                  </div>
                )
              }}
            />
            <Bar dataKey="totalHours" fill="var(--color-progress)" radius={8}>
              <LabelList
                dataKey="totalHours"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => value.toFixed(1)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {trend !== 0 && (
          <div className="flex gap-2 font-medium leading-none">
            {trend > 0 ? "Increased" : "Decreased"} by{" "}
            {Math.abs(trend).toFixed(1)}% from last month{" "}
            <TrendingUp
              className={`h-4 w-4 ${trend < 0 ? "rotate-180" : ""}`}
            />
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Showing your monthly study hours for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
