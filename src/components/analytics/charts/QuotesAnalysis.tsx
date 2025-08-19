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
  Pie,
  Cell,
} from "recharts";

const dummyMonthlyData = [
  {
    month: "Jan",
    RIMICanuckVoyageTravelMedical: 30,
    RIMICanuckVoyageNonMedicalTravel: 40,
    SecureStudyRIMIInternationalStudentstoCanada: 25,
    SecureTravelRIMIVisitorstoCanadaTravel: 25,
  },
  {
    month: "Feb",
    RIMICanuckVoyageTravelMedical: 50,
    RIMICanuckVoyageNonMedicalTravel: 60,
    SecureStudyRIMIInternationalStudentstoCanada: 40,
    SecureTravelRIMIVisitorstoCanadaTravel: 35,
  },
  {
    month: "Mar",
    RIMICanuckVoyageTravelMedical: 70,
    RIMICanuckVoyageNonMedicalTravel: 80,
    SecureStudyRIMIInternationalStudentstoCanada: 60,
    SecureTravelRIMIVisitorstoCanadaTravel: 50,
  },
];

const dummyDailyData = [
  {
    day: "2024-02-01",
    RIMICanuckVoyageTravelMedical: 5,
    RIMICanuckVoyageNonMedicalTravel: 7,
    SecureStudyRIMIInternationalStudentstoCanada: 3,
    SecureTravelRIMIVisitorstoCanadaTravel: 6,
  },
  {
    day: "2024-02-02",
    RIMICanuckVoyageTravelMedical: 10,
    RIMICanuckVoyageNonMedicalTravel: 12,
    SecureStudyRIMIInternationalStudentstoCanada: 8,
    SecureTravelRIMIVisitorstoCanadaTravel: 9,
  },
  {
    day: "2024-02-03",
    RIMICanuckVoyageTravelMedical: 15,
    RIMICanuckVoyageNonMedicalTravel: 18,
    SecureStudyRIMIInternationalStudentstoCanada: 12,
    SecureTravelRIMIVisitorstoCanadaTravel: 14,
  },
  {
    day: "2024-02-04",
    RIMICanuckVoyageTravelMedical: 12,
    RIMICanuckVoyageNonMedicalTravel: 15,
    SecureStudyRIMIInternationalStudentstoCanada: 10,
    SecureTravelRIMIVisitorstoCanadaTravel: 11,
  },
  {
    day: "2024-02-05",
    RIMICanuckVoyageTravelMedical: 18,
    RIMICanuckVoyageNonMedicalTravel: 22,
    SecureStudyRIMIInternationalStudentstoCanada: 15,
    SecureTravelRIMIVisitorstoCanadaTravel: 20,
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

const QuotesAnalysis = () => {
  const [quotesPerMonth] = useState(dummyMonthlyData);
  const [quotesPerDay] = useState(dummyDailyData);
  const COLORS = ["#3B82F6", "#EAB308", "#D91656", "#3D8D7A"];

  return (
    <div className="bg-white rounded-lg">
      <div className=" flex flex-col">
        <div className="mb-8 w-full flex flex-col md:flex-row gap-4 justify-center items-center">
          <div
            className="bg-white py-4 px-2 w-full md:w-2/3"
            style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
          >
            <h3 className="font-semibold mb-5 px-2 sm:px-4 text-[#3a17c5]">
              Quotes Generated Per Month (by Product)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={quotesPerMonth}
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
                <Bar dataKey="RIMICanuckVoyageTravelMedical" fill="#3B82F6" />
                <Bar
                  dataKey="RIMICanuckVoyageNonMedicalTravel"
                  fill="#EAB308"
                />
                <Bar
                  dataKey="SecureStudyRIMIInternationalStudentstoCanada"
                  fill="#D91656"
                />
                <Bar
                  dataKey="SecureTravelRIMIVisitorstoCanadaTravel"
                  fill="#3D8D7A"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div
            className="bg-white py-4 pb-2 2xl:px-2 max-w-sm md:w-1/3 flex flex-col gap-3"
            style={{ boxShadow: "0px 0px 6.6px 0px #0000001C" }}
          >
            <span className="font-semibold px-2 sm:px-4 text-[#475569]">
              Statistics
            </span>
            <ResponsiveContainer width="100%" height={210}>
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
                  {quotesPerDay.map((entry, index) => (
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

        {/* Quotes Per Day Chart */}
        {/* <div className="w-full">
          <h3 className="text-lg font-semibold mb-2 text-center text-[#3a17c5]">
            Quotes Generated Per Day (by Product)
          </h3>
          <ResponsiveContainer width="70%" height={300}>
            <BarChart
              data={quotesPerDay}
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
    </div>
  );
};

export default QuotesAnalysis;
