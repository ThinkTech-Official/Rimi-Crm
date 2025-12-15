

// // ===========================================

// import { useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import type { ChartData } from "../../../hooks/admin-dashboard"; // adjust the path if needed

// type PolicyAnalysisProps = {
//   data?: ChartData; // live data from usePolicyAnalysis()
// };

// const COLORS = [
//   "#3B82F6",
//   "#EAB308",
//   "#D91656",
//   "#3D8D7A",
//   "#10B981",
//   "#F97316",
//   "#6366F1",
// ];

// const PolicyAnalysis = ({ data }: PolicyAnalysisProps) => {
//   // Transform ChartData -> [{ month, <dataset.label>: value, ... }, ...]
//   const monthlyRows = useMemo(() => {
//     if (!data?.labels?.length || !data?.datasets?.length) return [];
//     return data.labels.map((label, i) => {
//       const row: Record<string, number | string> = { month: label };
//       data.datasets.forEach((ds) => {
//         row[ds.label] = Number(ds.data[i] ?? 0);
//       });
//       return row;
//     });
//   }, [data]);

//   // Totals per product for the pie (sum across the series)
//   const pieSeries = useMemo(() => {
//     if (!data?.datasets?.length) return [];
//     return data.datasets.map((ds, idx) => ({
//       name: ds.label,
//       value: ds.data.reduce((sum, v) => sum + Number(v ?? 0), 0),
//       color: COLORS[idx % COLORS.length],
//     }));
//   }, [data]);

//   const datasetLabels = data?.datasets?.map((d) => d.label) ?? [];

//   // Fallback empty UI
//   const isEmpty = !monthlyRows.length || !datasetLabels.length;

//   return (
//     <div className="bg-white rounded-lg">
//       <div className="flex flex-col">
//         <div className="mb-8 w-full flex flex-col md:flex-row gap-4 justify-center items-stretch">
//           {/* Column: Monthly Bar Chart */}
//           <div
//             className="bg-white py-4 px-2 w-full md:w-2/3"
//             style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
//           >
//             <h3 className="font-semibold mb-5 px-2 sm:px-4 text-[#3a17c5]">
//               Policies Issued Per Month (by Product)
//             </h3>

//             <div className="w-full h-[300px]">
//               {isEmpty ? (
//                 <div className="w-full h-full flex items-center justify-center text-gray-500">
//                   No data available
//                 </div>
//               ) : (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={monthlyRows}
//                     margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//                   >
//                     <CartesianGrid
//                       strokeDasharray="0"
//                       vertical={false}
//                       stroke="#DBEAFE"
//                     />
//                     <XAxis
//                       dataKey="month"
//                       axisLine={false}
//                       tickLine={false}
//                       tickMargin={8}
//                       tick={{
//                         fill: "#94A3B8",
//                         fontSize:
//                           window.innerWidth < 640
//                             ? 14
//                             : window.innerWidth < 1600
//                             ? 16
//                             : 20,
//                       }}
//                     />
//                     <YAxis
//                       axisLine={false}
//                       tickLine={false}
//                       tickMargin={5}
//                       tick={{
//                         fill: "#94A3B8",
//                         fontSize:
//                           window.innerWidth < 640
//                             ? 14
//                             : window.innerWidth < 1600
//                             ? 16
//                             : 20,
//                       }}
//                     />
//                     <Tooltip
//                       labelClassName="text-[#1B1B1B] text-[14px]"
//                       cursor={{ fill: "#F1F5F9" }}
//                     />
//                     <Legend />
//                     {datasetLabels.map((key, idx) => (
//                       <Bar
//                         key={key}
//                         dataKey={key}
//                         fill={COLORS[idx % COLORS.length]}
//                         radius={[4, 4, 0, 0]}
//                       />
//                     ))}
//                   </BarChart>
//                 </ResponsiveContainer>
//               )}
//             </div>
//           </div>

//           {/* Column: Pie (Totals / Stats) */}
//           <div
//             className="bg-white py-4 pb-2 2xl:px-2 max-w-sm md:w-1/3 flex flex-col gap-3"
//             style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
//           >
//             <span className="font-semibold mb-2 px-2 sm:px-4 text-[#475569]">
//               Statistics
//             </span>

//             <div className="w-full h-[200px]">
//               {pieSeries.length === 0 ? (
//                 <div className="w-full h-full flex items-center justify-center text-gray-500">
//                   No data
//                 </div>
//               ) : (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={pieSeries}
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={80}
//                       innerRadius={50}
//                       dataKey="value"
//                       nameKey="name"
//                     >
//                       {pieSeries.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                   </PieChart>
//                 </ResponsiveContainer>
//               )}
//             </div>

//             {pieSeries.length > 0 && (
//               <ul>
//                 {pieSeries.map((entry, index) => (
//                   <li
//                     key={index}
//                     className="flex items-center mb-1 text-sm px-2"
//                   >
//                     <span
//                       className="inline-block relative w-4 h-4 mr-2 rounded-full"
//                       style={{
//                         backgroundColor: entry.color + "33" /* 20% tint */,
//                       }}
//                     >
//                       <span
//                         className="absolute h-2 w-2 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//                         style={{ backgroundColor: entry.color }}
//                       />
//                     </span>
//                     <div>
//                       <span className="text-[#475569] mr-1">{entry.name}</span>:
//                       <span className="ml-1" style={{ color: entry.color }}>
//                         {entry.value}
//                       </span>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PolicyAnalysis;



// ===================================================


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface TopAgent {
  rank: number;
  agentCode: string;
  name: string;
  policyCount: number;
}

interface ProductDistribution {
  product: string;
  count: number;
}

interface PolicyAnalysisData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }>;
  policiesByProduct?: ProductDistribution[];
  topAgentsByPolicies?: TopAgent[];
  summary?: {
    totalPolicies?: number;
  };
}

interface PolicyAnalysisProps {
  data?: PolicyAnalysisData;
}

const PolicyAnalysis = ({ data }: PolicyAnalysisProps) => {
  // Colors for the 4 product types
  const PRODUCT_COLORS = {
    "RIMI Canuck Voyage Travel Medical": {
      outer: "#BFDBFE",
      inner: "#3B82F6",
    },
    "RIMI Canuck Voyage Non-Medical Travel": {
      outer: "#FFEDB4",
      inner: "#EAB308",
    },
    "Secure Study RIMI International Students to Canada": {
      outer: "#ffc7d9",
      inner: "#D91656",
    },
    "Secure Travel RIMI Visitors to Canada Travel": {
      outer: "#abffc8",
      inner: "#3D8D7A",
    },
  };

  // Transform backend data for bar chart (monthly policy counts)
  const transformDataForBarChart = () => {
    if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
      return [];
    }

    return data.labels.map((label, index) => ({
      month: label,
      policies: data.datasets[0].data[index] || 0,
    }));
  };

  // Transform product distribution for pie chart
  const transformProductData = () => {
    if (!data?.policiesByProduct || data.policiesByProduct.length === 0) {
      return [];
    }

    return data.policiesByProduct.map((item) => ({
      name: item.product,
      value: item.count,
      colorOutside:
        PRODUCT_COLORS[item.product as keyof typeof PRODUCT_COLORS]?.outer ||
        "#E5E7EB",
      colorInside:
        PRODUCT_COLORS[item.product as keyof typeof PRODUCT_COLORS]?.inner ||
        "#6B7280",
    }));
  };

  // Get medal emoji based on rank
  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "";
    }
  };

  const barChartData = transformDataForBarChart();
  const pieChartData = transformProductData();
  const topAgents = data?.topAgentsByPolicies || [];

  // Check if we have any data at all
  const hasBarData = barChartData.length > 0;
  const hasPieData = pieChartData.length > 0;
  const hasTopAgents = topAgents.length > 0;

  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-col gap-6">
        {/* Charts Row */}
        <div className="w-full flex flex-col md:flex-row gap-4 justify-center items-stretch min-h-[400px]">
          {/* Bar Chart - Monthly Policy Volume */}
          <div
            className="bg-white py-4 px-2 w-full md:w-2/3 flex flex-col"
            style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
          >
            <h3 className="font-semibold mb-5 px-2 sm:px-4 text-[#3a17c5]">
              Monthly Policy Volume
            </h3>
            <div className="flex-1 min-h-0">
              {hasBarData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData}
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
                    <Legend />
                    <Bar
                      dataKey="policies"
                      fill="#3B82F6"
                      name="Total Policies"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-sm font-medium">No policy data available</p>
                    <p className="text-xs mt-1">
                      Policies will appear here once issued
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pie Chart - Policies by Product Type */}
          <div
            className="bg-white py-4 pb-2 2xl:px-2 xs:max-w-sm md:w-1/3 flex flex-col gap-3"
            style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
          >
            <span className="font-semibold px-2 sm:px-4 text-[#475569]">
              Policies by Product Type
            </span>

            {hasPieData ? (
              <>
                <ResponsiveContainer width="100%" height={210}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.colorInside} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                {/* Legend */}
                <ul className="px-2 space-y-1">
                  {pieChartData.map((entry, index) => (
                    <li
                      key={index}
                      className="flex items-start text-xs 2xl:text-sm"
                    >
                      <span
                        className="inline-block relative min-w-4 w-4 h-4 mr-2 rounded-full mt-0.5"
                        style={{ backgroundColor: entry.colorOutside }}
                      >
                        <span
                          className="absolute h-2 w-2 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          style={{ backgroundColor: entry.colorInside }}
                        ></span>
                      </span>
                      <div className="flex-1">
                        <span className="text-[#475569]">{entry.name}</span>
                        <span
                          className="ml-2 font-semibold"
                          style={{ color: entry.colorInside }}
                        >
                          {entry.value}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center py-8">
                <div className="text-center text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                  <p className="text-sm font-medium">No product data</p>
                  <p className="text-xs mt-1 px-4">
                    Product distribution will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Top 5 Agents Table */}
        <div
          className="bg-white py-4 px-2 sm:px-6"
          style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
        >
          <h3 className="font-semibold mb-4 text-[#3a17c5] flex items-center gap-2">
            <span>🏆</span>
            <span>Top 5 Agents This Month (By Policies)</span>
          </h3>

          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary text-white text-nowrap">
                <tr>
                  <th className="px-4 py-3 text-left text-sm 2xl:text-base font-medium">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-sm 2xl:text-base font-medium">
                    Agent Code
                  </th>
                  <th className="px-4 py-3 text-left text-sm 2xl:text-base font-medium">
                    Agent Name
                  </th>
                  <th className="px-4 py-3 text-right text-sm 2xl:text-base font-medium">
                    Policies Issued
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!hasTopAgents ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-12 text-center text-gray-500"
                    >
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400 mb-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <p className="text-sm font-medium">
                        No agent data available for this month
                      </p>
                      <p className="text-xs mt-1">
                        Top performing agents will appear here once policies are
                        issued
                      </p>
                    </td>
                  </tr>
                ) : (
                  topAgents.map((agent) => (
                    <tr
                      key={agent.agentCode}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-lg 2xl:text-xl">
                          {getMedalEmoji(agent.rank)}
                        </span>
                        <span className="ml-2 text-sm 2xl:text-base font-medium text-gray-700">
                          {agent.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm 2xl:text-base text-gray-600">
                        {agent.agentCode}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm 2xl:text-base font-medium text-gray-900">
                        {agent.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm 2xl:text-base font-semibold bg-green-100 text-green-800">
                          {agent.policyCount}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyAnalysis;
