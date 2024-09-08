"use client";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

export const description = "A donut chart";

const RatioChart = ({ Solved, Unsolved }) => {
  // Prepare data for the doughnut chart
  const chartData = [
    { browser: "Resolved", visitors: Solved, fill: "var(--color-chrome)" },
    { browser: "Unresolved", visitors: Unsolved, fill: "var(--color-safari)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Complaints Ratio",
    },
    chrome: {
      label: "Solved",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Unsolved",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="mt-10 flex flex-col rounded-xl border p-10">
      <CardHeader className="items-center pb-0">
        <CardTitle>Complaints ratio</CardTitle>
        <CardDescription>
          Ratio of percentage of issues resolved
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total issues solved
        </div>
      </CardFooter>
    </Card>
  );
};

export default RatioChart;
