import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "January", Mga: 30, Agents: 80, Readonly: 45 },
  { month: "February", Mga: 50, Agents: 140, Readonly: 35 },
  { month: "March", Mga: 70, Agents: 60, Readonly: 55 },
  { month: "April", Mga: 90, Agents: 80, Readonly: 75 },
  { month: "May", Mga: 35, Agents: 100, Readonly: 95 },
  { month: "June", Mga: 130, Agents: 10, Readonly: 55 },
  { month: "July", Mga: 150, Agents: 140, Readonly: 35 },
  { month: "August", Mga: 50, Agents: 160, Readonly: 55 },
  { month: "September", Mga: 190, Agents: 80, Readonly: 175 },
  { month: "October", Mga: 21, Agents: 200, Readonly: 95 },
  { month: "November", Mga: 230, Agents: 22, Readonly: 25 },
  { month: "December", Mga: 50, Agents: 40, Readonly: 35 },
];

const MultiLineChart = () => {
    const [chartHeight, setChartHeight] = useState(500);
  
  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width < 770) {
        setChartHeight(300);
      } else if (width < 1600) {
        setChartHeight(400);
      } else {
        setChartHeight(500);
      }
    };
  
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return (
    <div className="bg-white rounded-lg">
      <div
        className="bg-white pb-4 2xl:px-2 w-full"
        style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
      >
        <div className="flex justify-between items-center p-6 px-3 bg-[#F8FAFC] mb-5">
          {/* mga */}
          <div className="flex flex-col w-1/3 px-4">
            <div className="flex  items-center gap-1">
              <span className="text-[#1E293B] text-lg">854</span>
              <span className="text-sm text-green">24%</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block relative w-3 h-3 mr-2 rounded-full bg-[#BFDBFE]">
                <span className="absolute h-1.5 w-1.5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2B00B7]"></span>
              </span>
              <span className="text-sm text-text-secondary">MGA</span>
            </div>
          </div>
          {/* agents */}
          <div className="flex flex-col border-x border-[#DBDADE] w-1/3 px-4">
            <div className="flex  items-center gap-1">
              <span className="text-[#1E293B] text-lg">854</span>
              <span className="text-sm text-green">24%</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block relative w-3 h-3 mr-2 rounded-full bg-[#FFEDB4]">
                <span className="absolute h-1.5 w-1.5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EAB308]"></span>
              </span>
              <span className="text-sm text-text-secondary">Agents</span>
            </div>
          </div>
          {/* random */}
          <div className="flex flex-col w-1/3 px-4">
            <div className="flex  items-center gap-1">
              <span className="text-[#1E293B] text-lg">854</span>
              <span className="text-sm text-green">24%</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block relative w-3 h-3 mr-2 rounded-full bg-[#bed9fd]">
                <span className="absolute h-1.5 w-1.5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1a16f3]"></span>
              </span>
              <span className="text-sm text-text-secondary">Random</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer
          width="100%"
          height={chartHeight}
          style={{ paddingRight: 10 }}
        >
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="#DBEAFE"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tick={{
                fill: "#94A3B8",
                fontSize:
                  window.innerWidth < 640
                    ? 14
                    : window.innerWidth < 1600
                    ? 16
                    : 20,
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{
                fill: "#94A3B8",
                fontSize:
                  window.innerWidth < 640
                    ? 14
                    : window.innerWidth < 1600
                    ? 16
                    : 20,
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="linear"
              dataKey="Mga"
              stroke="#1A16F3"
              strokeWidth={2}
            />
            <Line
              type="linear"
              dataKey="Agents"
              stroke="#EAB308"
              strokeWidth={2}
            />
            <Line
              type="linear"
              dataKey="Readonly"
              stroke="#3B82F6"
              strokeWidth={2}
            />
            {/* <Line type="monotone" dataKey="user4" stroke="#d62728" strokeWidth={2} /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MultiLineChart;
