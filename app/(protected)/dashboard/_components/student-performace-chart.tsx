"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
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

export const description =
  "A line chart showing student performance over a semester"

const chartData = [
  { month: "January", avgScore: 72 },
  { month: "February", avgScore: 78 },
  { month: "March", avgScore: 75 },
  { month: "April", avgScore: 82 },
  { month: "May", avgScore: 85 },
  { month: "June", avgScore: 88 },
]

const chartConfig = {
  avgScore: {
    label: "Average Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function StudentPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Performance Chart</CardTitle>
        <CardDescription>January - June 2024 Semester</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[60, 100]}
              ticks={[60, 70, 80, 90, 100]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="avgScore"
              type="monotone"
              stroke="var(--color-avgScore)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 3.5% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing average student scores for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
