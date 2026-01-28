import React from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

/**
 * props:
 * - data: [{ name: string, amount: number }]
 */
const chartConfig = {
  amount: {
    label: "Expense",
    color: "var(--chart-1)",
  },
}

export default function MemberExpenseChart({ data = [] }) {
  const total = data.reduce((sum, d) => sum + d.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Member</CardTitle>
        <CardDescription>
          Total expense split by each member
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{ left: 10, right: 10 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    `${Number(value).toLocaleString()}`
                  }
                />
              }
            />
            <Bar
              dataKey="amount"
              fill="var(--color-amount)"
              radius={6}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total {total.toLocaleString()} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Each bar represents how much each member paid
        </div>
      </CardFooter>
    </Card>
  )
}
