
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ProgressChartProps {
  data: {
    name: string;
    progress: number;
  }[];
}

const ProgressChart = ({ data }: ProgressChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Course Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
              />
              <YAxis
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 100]}
                unit="%"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  borderRadius: "8px", 
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" 
                }}
                formatter={(value: number) => [`${value}%`, "Progress"]}
              />
              <Bar
                dataKey="progress"
                fill="#4F46E5"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
