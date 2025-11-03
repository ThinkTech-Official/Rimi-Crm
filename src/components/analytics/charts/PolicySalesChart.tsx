// import {
//   Radar,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// const PolicySalesChart = ({ data, loading, error }: { data: any, loading: boolean, error: string }) => {
//   const dist = [
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
//   if(loading) return <p className="text-primary">Loading...</p>;
//   if(error) return <p className="text-red-500">{error}</p>;
//   return (
//     <div className="py-10">
//       <ResponsiveContainer width="100%" height={350}>
//         <RadarChart cx="50%" cy="50%" outerRadius="90%" data={dist}>
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

// export default PolicySalesChart;

// ========================================================



import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = [
  "#8884d8", // Blue
  "#82ca9d", // Green
  "#ffc658", // Yellow
  "#ff8042", // Orange
  "#a4de6c", // Light Green
  "#d0ed57", // Lime
  "#8dd1e1", // Cyan
  "#d084d0", // Purple
];

interface PolicySalesChartProps {
  data: Array<{ policyType: string; count: number }> | null;
  loading: boolean;
  error: string | null;
  filter?: string;
}

const PolicySalesChart = ({ data, loading, error, filter = "policies" }: PolicySalesChartProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-primary">Loading chart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500">Error loading chart: {error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">No {filter.toLowerCase()} data available</p>
      </div>
    );
  }

  // Transform data for Recharts Pie
  const chartData = data.map((item) => ({
    name: item.policyType,
    value: item.count,
  }));

  // Calculate total for percentage display
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // Custom label to show percentage
  const renderCustomLabel = (entry: any) => {
    const percent = ((entry.value / total) * 100).toFixed(1);
    return `${percent}%`;
  };

  return (
    <div className="bg-white p-6 rounded-lg" style={{
      boxShadow: "0px 4px 6.7px 0px rgba(0, 0, 0, 0.04)",
      border: "1px solid rgba(235, 235, 235, 1)",
    }}>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} ${filter.toLowerCase()}`, 'Count']}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => {
              const item = chartData.find(d => d.name === value);
              return `${value} (${item?.value || 0})`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PolicySalesChart;
