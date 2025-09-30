// import { useState } from "react";
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

// const dummyMonthlyData = [
//   {
//     month: "Jan",
//     RIMICanuckVoyageTravelMedical: 30,
//     RIMICanuckVoyageNonMedicalTravel: 40,
//     SecureStudyRIMIInternationalStudentstoCanada: 25,
//     SecureTravelRIMIVisitorstoCanadaTravel: 25,
//   },
//   {
//     month: "Feb",
//     RIMICanuckVoyageTravelMedical: 50,
//     RIMICanuckVoyageNonMedicalTravel: 60,
//     SecureStudyRIMIInternationalStudentstoCanada: 40,
//     SecureTravelRIMIVisitorstoCanadaTravel: 35,
//   },
//   {
//     month: "Mar",
//     RIMICanuckVoyageTravelMedical: 70,
//     RIMICanuckVoyageNonMedicalTravel: 80,
//     SecureStudyRIMIInternationalStudentstoCanada: 60,
//     SecureTravelRIMIVisitorstoCanadaTravel: 50,
//   },
// ];

// const dummyDailyData = [
//   {
//     day: "2024-02-01",
//     RIMICanuckVoyageTravelMedical: 5,
//     RIMICanuckVoyageNonMedicalTravel: 7,
//     SecureStudyRIMIInternationalStudentstoCanada: 3,
//     SecureTravelRIMIVisitorstoCanadaTravel: 6,
//   },
//   {
//     day: "2024-02-02",
//     RIMICanuckVoyageTravelMedical: 10,
//     RIMICanuckVoyageNonMedicalTravel: 12,
//     SecureStudyRIMIInternationalStudentstoCanada: 8,
//     SecureTravelRIMIVisitorstoCanadaTravel: 9,
//   },
//   {
//     day: "2024-02-03",
//     RIMICanuckVoyageTravelMedical: 15,
//     RIMICanuckVoyageNonMedicalTravel: 18,
//     SecureStudyRIMIInternationalStudentstoCanada: 12,
//     SecureTravelRIMIVisitorstoCanadaTravel: 14,
//   },
//   {
//     day: "2024-02-04",
//     RIMICanuckVoyageTravelMedical: 12,
//     RIMICanuckVoyageNonMedicalTravel: 15,
//     SecureStudyRIMIInternationalStudentstoCanada: 10,
//     SecureTravelRIMIVisitorstoCanadaTravel: 11,
//   },
//   {
//     day: "2024-02-05",
//     RIMICanuckVoyageTravelMedical: 18,
//     RIMICanuckVoyageNonMedicalTravel: 22,
//     SecureStudyRIMIInternationalStudentstoCanada: 15,
//     SecureTravelRIMIVisitorstoCanadaTravel: 20,
//   },
// ];

// const pieDataDaiy = [
//   {
//     name: "Canuck Voyage Travel Medical",
//     value: 400,
//     colorOutside: "#BFDBFE",
//     colorInside: "#2B00B7",
//   },
//   {
//     name: "Canuck Voyage Non Medical Travel",
//     value: 300,
//     colorOutside: "#FFEDB4",
//     colorInside: "#EAB308",
//   },
//   {
//     name: "Secure Study International Students to Canada",
//     value: 300,
//     colorOutside: "#ffc7d9",
//     colorInside: "#D91656",
//   },
//   {
//     name: "Secure Travel Visitors to Canada Travel",
//     value: 200,
//     colorOutside: "#abffc8",
//     colorInside: "#3D8D7A",
//   },
// ];

// const QuotesAnalysis = () => {
//   const [quotesPerMonth] = useState(dummyMonthlyData);
//   const [quotesPerDay] = useState(dummyDailyData);
//   const COLORS = ["#3B82F6", "#EAB308", "#D91656", "#3D8D7A"];

//   return (
//     <div className="bg-white rounded-lg">
//       <div className=" flex flex-col">
//         <div className="mb-8 w-full flex flex-col md:flex-row gap-4 justify-center items-center">
//           <div
//             className="bg-white py-4 px-2 w-full md:w-2/3"
//             style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
//           >
//             <h3 className="font-semibold mb-5 px-2 sm:px-4 text-[#3a17c5]">
//               Quotes Generated Per Month (by Product)
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart
//                 data={quotesPerMonth}
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
//                 <Legend />
//                 <Bar dataKey="RIMICanuckVoyageTravelMedical" fill="#3B82F6" />
//                 <Bar
//                   dataKey="RIMICanuckVoyageNonMedicalTravel"
//                   fill="#EAB308"
//                 />
//                 <Bar
//                   dataKey="SecureStudyRIMIInternationalStudentstoCanada"
//                   fill="#D91656"
//                 />
//                 <Bar
//                   dataKey="SecureTravelRIMIVisitorstoCanadaTravel"
//                   fill="#3D8D7A"
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//           <div
//             className="bg-white py-4 pb-2 2xl:px-2 max-w-sm md:w-1/3 flex flex-col gap-3"
//             style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
//           >
//             <span className="font-semibold px-2 sm:px-4 text-[#475569]">
//               Statistics
//             </span>
//             <ResponsiveContainer width="100%" height={210}>
//               <PieChart>
//                 <Pie
//                   data={pieDataDaiy}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   // label={dummyDailyData}
//                   outerRadius={80}
//                   innerRadius={50}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {quotesPerDay.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//             <ul>
//               {pieDataDaiy.map((entry, index) => (
//                 <li key={index} className="flex items-center mb-1 text-sm px-2">
//                   <span
//                     className="inline-block relative w-4 h-4 mr-2 rounded-full"
//                     style={{ backgroundColor: entry.colorOutside }}
//                   >
//                     <span
//                       className="absolute h-2 w-2 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//                       style={{ backgroundColor: entry.colorInside }}
//                     ></span>
//                   </span>
//                   <div>
//                     <span className="text-[#475569] mr-1">{entry.name}</span>:
//                     <span className="ml-1" style={{ color: entry.colorInside }}>
//                       {entry.value}
//                     </span>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Quotes Per Day Chart */}
//         {/* <div className="w-full">
//           <h3 className="text-lg font-semibold mb-2 text-center text-[#3a17c5]">
//             Quotes Generated Per Day (by Product)
//           </h3>
//           <ResponsiveContainer width="70%" height={300}>
//             <BarChart
//               data={quotesPerDay}
//               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="RIMICanuckVoyageTravelMedical" fill="#578FCA" />
//               <Bar dataKey="RIMICanuckVoyageNonMedicalTravel" fill="#3D8D7A" />
//               <Bar
//                 dataKey="SecureStudyRIMIInternationalStudentstoCanada"
//                 fill="#FF9D23"
//               />
//               <Bar
//                 dataKey="SecureTravelRIMIVisitorstoCanadaTravel"
//                 fill="#D91656"
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default QuotesAnalysis;




// ================================





import { useState, useEffect } from "react";
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
import { ChartData } from "../../../hooks/admin-dashboard"

interface QuotesAnalysisProps {
  data?: ChartData;
}

const QuotesAnalysis = ({ data }: QuotesAnalysisProps) => {
  const COLORS = ["#3B82F6", "#EAB308", "#D91656", "#3D8D7A"];

  // Transform backend data to match the component's expected format
  const transformDataForBarChart = () => {
    if (!data || !data.labels || !data.datasets) {
      return [];
    }

    // Create chart data from backend response
    return data.labels.map((label, index) => {
      const monthData: any = { month: label };
      
      data.datasets.forEach(dataset => {
        // Use dataset label as key, with simplified names for the chart
        const key = dataset.label.replace(/\s+/g, '');
        monthData[key] = dataset.data[index] || 0;
      });
      
      return monthData;
    });
  };

  // Create pie chart data from summary statistics
  const createPieChartData = () => {
    if (!data?.summary) {
      return [];
    }

    // You can customize this based on your actual data structure
    return [
      {
        name: "Total Quotes",
        value: data.summary.totalQuotes || 0,
        colorOutside: "#BFDBFE",
        colorInside: "#2B00B7",
      },
      {
        name: "Average Premium",
        value: Math.round(data.summary.averagePremium || 0),
        colorOutside: "#FFEDB4",
        colorInside: "#EAB308",
      },
      {
        name: "Total Premium",
        value: Math.round((data.summary.totalPremium || 0) / 1000), // Show in thousands
        colorOutside: "#ffc7d9",
        colorInside: "#D91656",
      },
    ];
  };

  const barChartData = transformDataForBarChart();
  const pieChartData = createPieChartData();

  // Fallback to dummy data if no data provided
  const dummyMonthlyData = [
    {
      month: "Jan",
      TotalQuotes: 30,
      TotalPremium: 40000,
    },
    {
      month: "Feb",
      TotalQuotes: 50,
      TotalPremium: 60000,
    },
    {
      month: "Mar",
      TotalQuotes: 70,
      TotalPremium: 80000,
    },
  ];

  const dummyPieData = [
    {
      name: "Total Quotes",
      value: 150,
      colorOutside: "#BFDBFE",
      colorInside: "#2B00B7",
    },
    {
      name: "Average Premium",
      value: 1200,
      colorOutside: "#FFEDB4",
      colorInside: "#EAB308",
    },
    {
      name: "Total Premium (K)",
      value: 180,
      colorOutside: "#ffc7d9",
      colorInside: "#D91656",
    },
  ];

  const chartData = barChartData.length > 0 ? barChartData : dummyMonthlyData;
  const pieData = pieChartData.length > 0 && pieChartData[0].value > 0 ? pieChartData : dummyPieData;

  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-col">
        <div className="mb-8 w-full flex flex-col md:flex-row gap-4 justify-center items-stretch min-h-[400px]">
          {/* Bar Chart */}
          <div
            className="bg-white py-4 px-2 w-full md:w-2/3 flex flex-col"
            style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
          >
            <h3 className="font-semibold mb-5 px-2 sm:px-4 text-[#3a17c5]">
              Quotes Analysis Over Time
            </h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
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
                  />
                  <Legend />
                  
                  {/* Dynamically render bars based on datasets */}
                  {data?.datasets ? (
                    data.datasets.map((dataset, index) => (
                      <Bar
                        key={dataset.label}
                        dataKey={dataset.label.replace(/\s+/g, '')}
                        fill={dataset.borderColor || COLORS[index % COLORS.length]}
                        name={dataset.label}
                      />
                    ))
                  ) : (
                    <>
                      <Bar dataKey="TotalQuotes" fill="#3B82F6" name="Total Quotes" />
                      <Bar dataKey="TotalPremium" fill="#EAB308" name="Total Premium" />
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart / Statistics */}
          <div
            className="bg-white py-4 pb-2 2xl:px-2 max-w-sm md:w-1/3 flex flex-col gap-3"
            style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
          >
            <span className="font-semibold px-2 sm:px-4 text-[#475569]">
              Statistics
            </span>
            
            {/* Display summary statistics */}
            {data?.summary ? (
              <div className="px-4 py-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Quotes:</span>
                  <span className="font-semibold">{data.summary.totalQuotes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Premium:</span>
                  <span className="font-semibold">
                    ${(data.summary.totalPremium || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Premium:</span>
                  <span className="font-semibold">
                    ${(data.summary.averagePremium || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            ) : null}

            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.colorInside || COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <ul>
              {pieData.map((entry, index) => (
                <li key={index} className="flex items-center mb-1 text-sm px-2">
                  <span
                    className="inline-block relative w-4 h-4 mr-2 rounded-full"
                    style={{ backgroundColor: entry.colorOutside }}
                  >
                    <span
                      className="absolute h-2 w-2 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ backgroundColor: entry.colorInside }}
                    ></span>
                  </span>
                  <div>
                    <span className="text-[#475569] mr-1">{entry.name}</span>:
                    <span className="ml-1" style={{ color: entry.colorInside }}>
                      {entry.value}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesAnalysis;