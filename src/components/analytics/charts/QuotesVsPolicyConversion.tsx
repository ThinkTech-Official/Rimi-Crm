// import React from 'react'

// export default function QuotesVsPolicyConversion() {
//   return (
//     <div>QuotesVsPolicyConversion</div>
//   )
// }

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dummyMonthlyData = [
  { month: "Jan", quotes: 120, policies: 80 },
  { month: "Feb", quotes: 150, policies: 90 },
  { month: "Mar", quotes: 180, policies: 110 },
  { month: "Apr", quotes: 200, policies: 130 },
  { month: "May", quotes: 250, policies: 170 },
  { month: "Jun", quotes: 300, policies: 200 },
  { month: "Jul", quotes: 350, policies: 230 },
  { month: "Aug", quotes: 400, policies: 260 },
  { month: "Sep", quotes: 380, policies: 250 },
  { month: "Oct", quotes: 420, policies: 280 },
  { month: "Nov", quotes: 450, policies: 300 },
  { month: "Dec", quotes: 500, policies: 350 },
];

const QuotesVsPolicyConversion = () => {
  const [data] = useState(dummyMonthlyData);
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
      <div className=" flex flex-col">
        <div className="mb-8 w-full flex gap-4">
          <div
            className="bg-white pb-4 pt-8 2xl:px-2 w-full"
            style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
          >
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart
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
                <Tooltip
                  labelClassName="text-[#1B1B1B] text-[16px]"
                  cursor={{ fill: "#F1F5F9" }}
                />
                <Legend
                  formatter={(value) => {
                    if (value === "quotes") return "Quotes Generated";
                    if (value === "policies") return "Policies Issued";
                    return value;
                  }}
                />

                <Bar dataKey="quotes" fill="#1A16F3" />
                <Bar dataKey="policies" fill="#B1CDFB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesVsPolicyConversion;
