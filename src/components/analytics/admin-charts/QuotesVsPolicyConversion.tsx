// // import React from 'react'

// // export default function QuotesVsPolicyConversion() {
// //   return (
// //     <div>QuotesVsPolicyConversion</div>
// //   )
// // }

// import { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const dummyMonthlyData = [
//   { month: "Jan", quotes: 120, policies: 80 },
//   { month: "Feb", quotes: 150, policies: 90 },
//   { month: "Mar", quotes: 180, policies: 110 },
//   { month: "Apr", quotes: 200, policies: 130 },
//   { month: "May", quotes: 250, policies: 170 },
//   { month: "Jun", quotes: 300, policies: 200 },
//   { month: "Jul", quotes: 350, policies: 230 },
//   { month: "Aug", quotes: 400, policies: 260 },
//   { month: "Sep", quotes: 380, policies: 250 },
//   { month: "Oct", quotes: 420, policies: 280 },
//   { month: "Nov", quotes: 450, policies: 300 },
//   { month: "Dec", quotes: 500, policies: 350 },
// ];

// const QuotesVsPolicyConversion = () => {
//   const [data] = useState(dummyMonthlyData);
//   const [chartHeight, setChartHeight] = useState(500);

// useEffect(() => {
//   const updateHeight = () => {
//     const width = window.innerWidth;
//     if (width < 770) {
//       setChartHeight(300);
//     } else if (width < 1600) {
//       setChartHeight(400);
//     } else {
//       setChartHeight(500);
//     }
//   };

//   updateHeight();
//   window.addEventListener("resize", updateHeight);
//   return () => window.removeEventListener("resize", updateHeight);
// }, []);


//   return (
//     <div className="bg-white rounded-lg">
//       <div className=" flex flex-col">
//         <div className="mb-8 w-full flex gap-4">
//           <div
//             className="bg-white pb-4 pt-8 2xl:px-2 w-full"
//             style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
//           >
//             <ResponsiveContainer width="100%" height={chartHeight}>
//               <BarChart
//                 data={data}
//                 margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//               >
//                 <CartesianGrid
//                   strokeDasharray="0"
//                   vertical={false}
//                   stroke="#DBEAFE"
//                 />
//                 <XAxis
//                   dataKey="month"
//                   axisLine={false}
//                   tickLine={false}
//                   tickMargin={8}
//                   tick={{
//                     fill: "#94A3B8",
//                     fontSize:
//                       window.innerWidth < 640
//                         ? 14
//                         : window.innerWidth < 1600
//                         ? 16
//                         : 20,
//                   }}
//                 />
//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   tickMargin={10}
//                   tick={{
//                     fill: "#94A3B8",
//                     fontSize:
//                       window.innerWidth < 640
//                         ? 14
//                         : window.innerWidth < 1600
//                         ? 16
//                         : 20,
//                   }}
//                 />
//                 <Tooltip
//                   labelClassName="text-[#1B1B1B] text-[16px]"
//                   cursor={{ fill: "#F1F5F9" }}
//                 />
//                 <Legend
//                   formatter={(value) => {
//                     if (value === "quotes") return "Quotes Generated";
//                     if (value === "policies") return "Policies Issued";
//                     return value;
//                   }}
//                 />

//                 <Bar dataKey="quotes" fill="#1A16F3" />
//                 <Bar dataKey="policies" fill="#B1CDFB" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuotesVsPolicyConversion;



// ===================



import { useEffect, useMemo, useState } from "react";
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
import type { ChartData } from "../../../hooks/admin-dashboard"; 

type Props = {
  data?: ChartData; // from useQuotesPolicyConversion()
};

const QuotesVsPolicyConversion = ({ data }: Props) => {
  const [chartHeight, setChartHeight] = useState(500);

  // Find which dataset is "quotes" vs "policies"
  const { quotesKey, policiesKey } = useMemo(() => {
    const ds = data?.datasets ?? [];
    const findByName = (needle: string) =>
      ds.find((d) => d.label.toLowerCase().includes(needle))?.label;

    // try semantic match first
    const q = findByName("quote") ?? ds[0]?.label;
    // prefer "policy" then "policie" (pluralization guard)
    const p =
      findByName("policy") ?? findByName("policie") ?? (ds.length > 1 ? ds[1].label : undefined);

    return { quotesKey: q, policiesKey: p };
  }, [data]);

  // Transform ChartData -> [{ month, quotes, policies, conv }, ...]
  const rows = useMemo(() => {
    if (!data?.labels?.length || !data?.datasets?.length) return [];

    const qDS = data.datasets.find((d) => d.label === quotesKey);
    const pDS = data.datasets.find((d) => d.label === policiesKey);

    return data.labels.map((label, i) => {
      const quotes = Number(qDS?.data[i] ?? 0);
      const policies = Number(pDS?.data[i] ?? 0);
      const conv = quotes > 0 ? (policies / quotes) * 100 : 0;

      return {
        month: label, // can be any period label your API returns
        quotes,
        policies,
        conv, // optional: used only in tooltip/legend if you want
      };
    });
  }, [data, quotesKey, policiesKey]);

  const isEmpty = rows.length === 0 || !quotesKey || !policiesKey;

  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width < 770) setChartHeight(300);
      else if (width < 1600) setChartHeight(400);
      else setChartHeight(500);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-col">
        <div className="mb-8 w-full flex gap-4">
          <div
            className="bg-white pb-4 pt-8 2xl:px-2 w-full"
            style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
          >
            <div className="w-full h-[300px] md:h-[400px] 2xl:h-[500px]">
              {isEmpty ? (
                <div className="w-full h-[300px] flex items-center justify-center text-gray-500">
                  No data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rows} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#DBEAFE" />
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
                      tickMargin={5}
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
                      formatter={(value: any, name) => {
                        if (name === "conv") return [`${(value as number).toFixed(1)}%`, "Conversion"];
                        if (name === "quotes") return [value as number, "Quotes"];
                        if (name === "policies") return [value as number, "Policies"];
                        return [value, name];
                      }}
                    />
                    <Legend
                      formatter={(value) => {
                        if (value === "quotes") return "Quotes Generated";
                        if (value === "policies") return "Policies Issued";
                        if (value === "conv") return "Conversion %";
                        return value;
                      }}
                    />
                    <Bar dataKey="quotes" fill="#1A16F3" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="policies" fill="#B1CDFB" radius={[4, 4, 0, 0]} />
                    {/* If you want to show conversion as bars too, keep conv; otherwise it's just in tooltip */}
                    {/* <Bar dataKey="conv" fill="#16A34A" radius={[4,4,0,0]} yAxisId="right" /> */}
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesVsPolicyConversion;
