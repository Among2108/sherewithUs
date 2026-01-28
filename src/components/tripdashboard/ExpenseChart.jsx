
import { TrendingUp } from "lucide-react"

import { Pie, PieChart, LabelList, Cell } from "recharts"

import React from "react"


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

export const description = "A pie chart with a label list"

// ✅ รับ data จาก props แทน mock
export default function ExpenseChart({ data = [] }) {
  // รวมยอดทั้งหมดไว้แสดงด้านล่าง
  const total = data.reduce((sum, d) => sum + Number(d.visitors || 0), 0)

  // สร้าง config จาก data แบบ dynamic (ไม่ต้อง fix chrome/safari)
  const chartConfig = React.useMemo(() => {
    const cfg = {
      visitors: { label: "Amount" },
    }
    data.forEach((d, i) => {
      cfg[d.browser] = {
        label: d.browser,
        color: `var(--chart-${(i % 5) + 1})`,
      }
    })
    return cfg
  }, [data])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses by Category</CardTitle>
        <CardDescription>Distribution of expenses</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
         <Pie data={data} dataKey="visitors">
  {data.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={`var(--chart-${(index % 5) + 1})`}
    />
  ))}

  <LabelList
    dataKey="browser"
    className="fill-background"
    stroke="none"
    fontSize={12}
    formatter={(value) => value}
  />
</Pie>

          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total {total.toLocaleString()} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing category breakdown
        </div>
      </CardFooter>
    </Card>
  )
}
