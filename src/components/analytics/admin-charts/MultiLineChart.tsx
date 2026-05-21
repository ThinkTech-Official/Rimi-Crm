// import { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { month: "January", Mga: 30, Agents: 80, Readonly: 45 },
//   { month: "February", Mga: 50, Agents: 140, Readonly: 35 },
//   { month: "March", Mga: 70, Agents: 60, Readonly: 55 },
//   { month: "April", Mga: 90, Agents: 80, Readonly: 75 },
//   { month: "May", Mga: 35, Agents: 100, Readonly: 95 },
//   { month: "June", Mga: 130, Agents: 10, Readonly: 55 },
//   { month: "July", Mga: 150, Agents: 140, Readonly: 35 },
//   { month: "August", Mga: 50, Agents: 160, Readonly: 55 },
//   { month: "September", Mga: 190, Agents: 80, Readonly: 175 },
//   { month: "October", Mga: 21, Agents: 200, Readonly: 95 },
//   { month: "November", Mga: 230, Agents: 22, Readonly: 25 },
//   { month: "December", Mga: 50, Agents: 40, Readonly: 35 },
// ];

// const MultiLineChart = () => {
//     const [chartHeight, setChartHeight] = useState(500);
  
//   useEffect(() => {
//     const updateHeight = () => {
//       const width = window.innerWidth;
//       if (width < 770) {
//         setChartHeight(300);
//       } else if (width < 1600) {
//         setChartHeight(400);
//       } else {
//         setChartHeight(500);
//       }
//     };
  
//     updateHeight();
//     window.addEventListener("resize", updateHeight);
//     return () => window.removeEventListener("resize", updateHeight);
//   }, []);
//   return (
//     <div className="bg-white rounded-lg">
//       <div
//         className="bg-white pb-4 2xl:px-2 w-full"
//         style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
//       >
//         <div className="flex justify-between items-center p-6 px-3 bg-[#F8FAFC] mb-5">
//           {/* mga */}
//           <div className="flex flex-col w-1/3 px-4">
//             <div className="flex  items-center gap-1">
//               <span className="text-[#1E293B] text-lg">854</span>
//               <span className="text-sm text-green">24%</span>
//             </div>
//             <div className="flex items-center">
//               <span className="inline-block relative w-3 h-3 mr-2 rounded-full bg-[#BFDBFE]">
//                 <span className="absolute h-1.5 w-1.5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2B00B7]"></span>
//               </span>
//               <span className="text-sm text-text-secondary">MGA</span>
//             </div>
//           </div>
//           {/* agents */}
//           <div className="flex flex-col border-x border-[#DBDADE] w-1/3 px-4">
//             <div className="flex  items-center gap-1">
//               <span className="text-[#1E293B] text-lg">854</span>
//               <span className="text-sm text-green">24%</span>
//             </div>
//             <div className="flex items-center">
//               <span className="inline-block relative w-3 h-3 mr-2 rounded-full bg-[#FFEDB4]">
//                 <span className="absolute h-1.5 w-1.5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EAB308]"></span>
//               </span>
//               <span className="text-sm text-text-secondary">Agents</span>
//             </div>
//           </div>
//           {/* random */}
//           <div className="flex flex-col w-1/3 px-4">
//             <div className="flex  items-center gap-1">
//               <span className="text-[#1E293B] text-lg">854</span>
//               <span className="text-sm text-green">24%</span>
//             </div>
//             <div className="flex items-center">
//               <span className="inline-block relative w-3 h-3 mr-2 rounded-full bg-[#bed9fd]">
//                 <span className="absolute h-1.5 w-1.5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1a16f3]"></span>
//               </span>
//               <span className="text-sm text-text-secondary">Random</span>
//             </div>
//           </div>
//         </div>
//         <ResponsiveContainer
//           width="100%"
//           height={chartHeight}
//           style={{ paddingRight: 10 }}
//         >
//           <LineChart
//             data={data}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//           >
//             <CartesianGrid
//               strokeDasharray="0"
//               vertical={false}
//               stroke="#DBEAFE"
//             />
//             <XAxis
//               dataKey="month"
//               axisLine={false}
//               tickLine={false}
//               tickMargin={8}
//               tick={{
//                 fill: "#94A3B8",
//                 fontSize:
//                   window.innerWidth < 640
//                     ? 14
//                     : window.innerWidth < 1600
//                     ? 16
//                     : 20,
//               }}
//             />
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tickMargin={10}
//               tick={{
//                 fill: "#94A3B8",
//                 fontSize:
//                   window.innerWidth < 640
//                     ? 14
//                     : window.innerWidth < 1600
//                     ? 16
//                     : 20,
//               }}
//             />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="linear"
//               dataKey="Mga"
//               stroke="#1A16F3"
//               strokeWidth={2}
//             />
//             <Line
//               type="linear"
//               dataKey="Agents"
//               stroke="#EAB308"
//               strokeWidth={2}
//             />
//             <Line
//               type="linear"
//               dataKey="Readonly"
//               stroke="#3B82F6"
//               strokeWidth={2}
//             />
//             {/* <Line type="monotone" dataKey="user4" stroke="#d62728" strokeWidth={2} /> */}
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default MultiLineChart;



// ==========================================





import { useEffect, useMemo, useState } from "react";
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
import type { ChartData } from "../../../hooks/admin-dashboard"; 
import { useLanguage } from "../../../context/LanguageContext";

type Props = {
  data?: ChartData; // from useAgentTypesMonthly()
};

const COLORS = ["#1A16F3", "#EAB308", "#3B82F6", "#10B981", "#F97316", "#6366F1", "#EF4444"];

const pctChange = (curr: number, prev: number) => {
  if (!isFinite(curr) || !isFinite(prev) || prev === 0) return 0;
  return ((curr - prev) / prev) * 100;
};

const MultiLineChart = ({ data }: Props) => {
  const { t } = useLanguage();
  const [chartHeight, setChartHeight] = useState(500);

  // Recharts rows: [{ labelKey, <dataset.label>: value, ... }]
  const rows = useMemo(() => {
    if (!data?.labels?.length || !data?.datasets?.length) return [];
    return data.labels.map((label, i) => {
      const r: Record<string, number | string> = { month: label };
      data.datasets.forEach((ds) => (r[ds.label] = Number(ds.data[i] ?? 0)));
      return r;
    });
  }, [data]);

  // Build summary cards for top 3 series (by label preference or first 3)
  const cards = useMemo(() => {
    const ds = data?.datasets ?? [];
    if (!ds.length) return [];

    // Prefer MGA / Agents / Readonly if present; otherwise first 3 datasets
    const pick = (needle: string) =>
      ds.find((d) => d.label.toLowerCase().includes(needle)) ?? null;

    const picks =
      [pick("mga"), pick("agent"), pick("readonly")]
        .filter(Boolean)
        .map((x) => x!) || [];

    while (picks.length < Math.min(3, ds.length)) {
      const next = ds[picks.length];
      if (!picks.includes(next)) picks.push(next);
      else break;
    }

    return picks.slice(0, 3).map((d, idx) => {
      const arr = d.data.map((v) => Number(v ?? 0));
      const last = arr.at(-1) ?? 0;
      const prev = arr.length > 1 ? arr.at(-2)! : 0;
      const change = pctChange(last, prev);
      return {
        label: d.label,
        value: last,
        change,
        // colors to match legend dot below
        outer: `${COLORS[idx % COLORS.length]}33`,
        inner: COLORS[idx % COLORS.length],
      };
    });
  }, [data]);

  const isEmpty = rows.length === 0;

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 770) setChartHeight(300);
      else if (w < 1600) setChartHeight(400);
      else setChartHeight(500);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="bg-white rounded-lg">
      <div
        className="bg-white pb-4 2xl:px-2 w-full"
        style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
      >
        {/* Summary cards (top 3 series) */}
        <div className="flex justify-between items-center p-6 px-3 bg-[#F8FAFC] mb-5">
          {cards.length === 0 ? (
            <div className="text-gray-500">{t("No data")}</div>
          ) : (
            cards.map((c, i) => (
              <div
                key={c.label}
                className={`flex flex-col w-1/3 px-4 ${
                  i === 1 ? "border-x border-[#DBDADE]" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#1E293B] text-lg">{c.value}</span>
                  <span
                    className={`text-sm ${
                      c.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {c.change >= 0 ? "▲" : "▼"} {Math.abs(c.change).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className="inline-block relative w-3 h-3 mr-2 rounded-full"
                    style={{ backgroundColor: c.outer }}
                  >
                    <span
                      className="absolute h-1.5 w-1.5 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ backgroundColor: c.inner }}
                    />
                  </span>
                  <span className="text-sm text-text-secondary truncate">{c.label}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-full" style={{ paddingRight: 10 }}>
          {isEmpty ? (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              {t("No data available")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={chartHeight}>
              <LineChart data={rows} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#DBEAFE" />
                <XAxis
                  dataKey="month" // your API can send any label; we mapped it to "month"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  tick={{
                    fill: "#94A3B8",
                    fontSize:
                      window.innerWidth < 640 ? 14 : window.innerWidth < 1600 ? 16 : 20,
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  tick={{
                    fill: "#94A3B8",
                    fontSize:
                      window.innerWidth < 640 ? 14 : window.innerWidth < 1600 ? 16 : 20,
                  }}
                />
                <Tooltip />
                <Legend />
                {(data?.datasets ?? []).map((ds, idx) => (
                  <Line
                    key={ds.label}
                    type="linear"
                    dataKey={ds.label}
                    stroke={COLORS[idx % COLORS.length]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiLineChart;
