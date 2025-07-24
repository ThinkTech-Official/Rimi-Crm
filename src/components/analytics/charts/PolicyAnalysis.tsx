// export default function PolicyAnalysis() {
//   return (
//     <div>PolicyAnalysis</div>
//   )
// }

import { useState } from "react";
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
  Cell,
  Pie,
} from "recharts";

const dummyPolicyMonthlyData = [
  {
    month: "Jan",
    RIMICanuckVoyageTravelMedical: 45,
    RIMICanuckVoyageNonMedicalTravel: 25,
    SecureStudyRIMIInternationalStudentstoCanada: 35,
    SecureTravelRIMIVisitorstoCanadaTravel: 20,
  },
  {
    month: "Feb",
    RIMICanuckVoyageTravelMedical: 60,
    RIMICanuckVoyageNonMedicalTravel: 55,
    SecureStudyRIMIInternationalStudentstoCanada: 50,
    SecureTravelRIMIVisitorstoCanadaTravel: 30,
  },
  {
    month: "Mar",
    RIMICanuckVoyageTravelMedical: 75,
    SecureStudyRIMIInternationalStudentstoCanada: 65,
    SecureTravelRIMIVisitorstoCanadaTravel: 45,
  },
  {
    month: "Apr",
    RIMICanuckVoyageTravelMedical: 90,
    RIMICanuckVoyageNonMedicalTravel: 15,
    SecureStudyRIMIInternationalStudentstoCanada: 80,
    SecureTravelRIMIVisitorstoCanadaTravel: 55,
  },
  {
    month: "May",
    RIMICanuckVoyageTravelMedical: 110,
    RIMICanuckVoyageNonMedicalTravel: 65,
    SecureStudyRIMIInternationalStudentstoCanada: 95,
    SecureTravelRIMIVisitorstoCanadaTravel: 70,
  },
];

const dummyPolicyDailyData = [
  {
    day: "2024-02-01",
    RIMICanuckVoyageTravelMedical: 5,
    RIMICanuckVoyageNonMedicalTravel: 45,
    SecureStudyRIMIInternationalStudentstoCanada: 3,
    SecureTravelRIMIVisitorstoCanadaTravel: 2,
  },
  {
    day: "2024-02-02",
    RIMICanuckVoyageTravelMedical: 10,
    RIMICanuckVoyageNonMedicalTravel: 25,
    SecureStudyRIMIInternationalStudentstoCanada: 8,
    SecureTravelRIMIVisitorstoCanadaTravel: 6,
  },
  {
    day: "2024-02-03",
    RIMICanuckVoyageTravelMedical: 15,
    RIMICanuckVoyageNonMedicalTravel: 35,
    SecureStudyRIMIInternationalStudentstoCanada: 12,
    SecureTravelRIMIVisitorstoCanadaTravel: 9,
  },
  {
    day: "2024-02-04",
    RIMICanuckVoyageTravelMedical: 12,
    RIMICanuckVoyageNonMedicalTravel: 85,
    SecureStudyRIMIInternationalStudentstoCanada: 10,
    SecureTravelRIMIVisitorstoCanadaTravel: 7,
  },
  {
    day: "2024-02-05",
    RIMICanuckVoyageTravelMedical: 18,
    RIMICanuckVoyageNonMedicalTravel: 15,
    SecureStudyRIMIInternationalStudentstoCanada: 15,
    SecureTravelRIMIVisitorstoCanadaTravel: 10,
  },
];
const pieDataDaiy = [
  {
    name: "Canuck Voyage Travel Medical",
    value: 400,
    colorOutside: "#BFDBFE",
    colorInside: "#2B00B7",
  },
  {
    name: "Canuck Voyage Non Medical Travel",
    value: 300,
    colorOutside: "#FFEDB4",
    colorInside: "#EAB308",
  },
  {
    name: "Secure Study International Students to Canada",
    value: 300,
    colorOutside: "#ffc7d9",
    colorInside: "#D91656",
  },
  {
    name: "Secure Travel Visitors to Canada Travel",
    value: 200,
    colorOutside: "#abffc8",
    colorInside: "#3D8D7A",
  },
];

const PolicyAnalysis = () => {
  const [policiesPerMonth] = useState(dummyPolicyMonthlyData);
  const [policiesPerDay] = useState(dummyPolicyDailyData);

  const COLORS = ["#3B82F6", "#EAB308", "#D91656", "#3D8D7A"];

  return (
    <div className="bg-white rounded-lg">
      <div className=" flex flex-col">
        <div className="mb-8 w-full flex flex-col md:flex-row gap-4 justify-center items-center ">
          <div
            className="bg-white py-4 px-2 w-full md:w-2/3"
            style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
          >
            <h3 className="font-semibold mb-5 px-2 sm:px-4 text-[#3a17c5]">
              Policies Issued Per Month (by Product)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={policiesPerMonth}
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
                <Bar dataKey="RIMICanuckVoyageTravelMedical" fill="#578FCA" />
                <Bar
                  dataKey="RIMICanuckVoyageNonMedicalTravel"
                  fill="#3D8D7A"
                />
                <Bar
                  dataKey="SecureStudyRIMIInternationalStudentstoCanada"
                  fill="#FF9D23"
                />
                <Bar
                  dataKey="SecureTravelRIMIVisitorstoCanadaTravel"
                  fill="#D91656"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div
            className="bg-white py-4 pb-2 2xl:px-2 max-w-sm md:w-1/3 flex flex-col gap-3"
            style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
          >
            <span className="font-semibold mb-2 px-2 sm:px-4 text-[#475569]">
              Statistics
            </span>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieDataDaiy}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  // label={dummyDailyData}
                  outerRadius={80}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {policiesPerDay.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <ul>
              {pieDataDaiy.map((entry, index) => (
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

      {/* Policies Per Day Chart */}
      {/* <div className="w-full">
        <h3 className="text-lg font-semibold mb-2 text-center text-[#3a17c5]">
          Policies Issued Per Day (by Product)
        </h3>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={policiesPerDay}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="RIMICanuckVoyageTravelMedical" fill="#578FCA" />
            <Bar dataKey="RIMICanuckVoyageNonMedicalTravel" fill="#3D8D7A" />
            <Bar
              dataKey="SecureStudyRIMIInternationalStudentstoCanada"
              fill="#FF9D23"
            />
            <Bar
              dataKey="SecureTravelRIMIVisitorstoCanadaTravel"
              fill="#D91656"
            />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default PolicyAnalysis;
