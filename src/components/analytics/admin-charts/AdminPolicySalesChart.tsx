// import {
//   Radar,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// const AdminPolicySalesChart = () => {
//   const data = [
//     {
//       policy: "RIMI Canuck Voyage Travel Medical",
//       A: 120,
//       B: 110,
//       fullMark: 150,
//     },
//     {
//       policy: "RIMI Canuck Voyage Non-Medical Travel",
//       A: 98,
//       B: 130,
//       fullMark: 150,
//     },
//     {
//       policy: "Secure Study RIMI International Students to Canada",
//       A: 86,
//       B: 130,
//       fullMark: 150,
//     },
//     {
//       policy: "Secure Travel RIMI Visitors to Canada Travel",
//       A: 99,
//       B: 100,
//       fullMark: 150,
//     },
//   ];
//   return (
//     <div className="py-10">
//       <ResponsiveContainer width="100%" height={350}>
//         <RadarChart cx="50%" cy="50%" outerRadius="90%" data={data}>
//           <PolarGrid />
//           <PolarAngleAxis dataKey="policy" />
//           <PolarRadiusAxis />
//           <Radar
//             name="Mike"
//             dataKey="A"
//             stroke="#8884d8"
//             fill="#8884d8"
//             fillOpacity={0.4}
//           />
//           <Legend
//             content={
//               <>
//                 <div className="flex items-center gap-2 justify-center mt-10">
//                   <div className="w-4 h-4 rounded-full bg-[#8884d8]"></div>
//                   <p className="text-sm">Quotes</p>
//                 </div>
//               </>
//             }
//           />
//         </RadarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default AdminPolicySalesChart;




// ===================================




import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useMemo } from "react";
import type { ChartData } from "../../../hooks/admin-dashboard"; 
import { useLanguage } from "../../../context/LanguageContext";
type Props = {
  data?: ChartData; // from usePolicySales(period)
};

const COLORS = ["#1A16F3", "#EAB308", "#3B82F6", "#10B981", "#F97316", "#6366F1", "#EF4444"];

const AdminPolicySalesChart = ({ data }: Props) => {
  const { t } = useLanguage();
  // Transform ChartData -> [{ policy: label, <dataset.label>: value, fullMark }, ...]
  const rows = useMemo(() => {
    if (!data?.labels?.length || !data?.datasets?.length) return [];

    return data.labels.map((label, i) => {
      const row: Record<string, number | string> = { policy: label };
      let maxAtThisLabel = 0;

      data.datasets.forEach((ds) => {
        const v = Number(ds.data[i] ?? 0);
        row[ds.label] = v;
        if (v > maxAtThisLabel) maxAtThisLabel = v;
      });

      row.fullMark = Math.max(10, maxAtThisLabel); // keep some radius when values are tiny
      return row;
    });
  }, [data]);

  const series = data?.datasets ?? [];
  const isEmpty = rows.length === 0 || series.length === 0;

  return (
    <div className="py-10">
      <div className="w-full h-[350px]">
        {isEmpty ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            {t("No data available")}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="85%" data={rows}>
              <PolarGrid />
              <PolarAngleAxis
                dataKey="policy"
                tick={{ fill: "#475569", fontSize: 12 }}
              />
              <PolarRadiusAxis tick={{ fill: "#94A3B8", fontSize: 10 }} />
              {series.map((ds, idx) => (
                <Radar
                  key={ds.label}
                  name={ds.label}
                  dataKey={ds.label}
                  stroke={COLORS[idx % COLORS.length]}
                  fill={COLORS[idx % COLORS.length]}
                  fillOpacity={0.35}
                />
              ))}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminPolicySalesChart;
