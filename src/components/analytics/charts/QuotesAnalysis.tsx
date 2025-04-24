import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const dummyMonthlyData = [
  { month: "Jan", RIMICanuckVoyageTravelMedical: 30, RIMICanuckVoyageNonMedicalTravel: 40, SecureStudyRIMIInternationalStudentstoCanada: 25, SecureTravelRIMIVisitorstoCanadaTravel: 25 },
  { month: "Feb", RIMICanuckVoyageTravelMedical: 50, RIMICanuckVoyageNonMedicalTravel: 60, SecureStudyRIMIInternationalStudentstoCanada: 40, SecureTravelRIMIVisitorstoCanadaTravel: 35 },
  { month: "Mar", RIMICanuckVoyageTravelMedical: 70, RIMICanuckVoyageNonMedicalTravel: 80, SecureStudyRIMIInternationalStudentstoCanada: 60, SecureTravelRIMIVisitorstoCanadaTravel: 50 },
  { month: "Apr", RIMICanuckVoyageTravelMedical: 90, RIMICanuckVoyageNonMedicalTravel: 100, SecureStudyRIMIInternationalStudentstoCanada: 80, SecureTravelRIMIVisitorstoCanadaTravel: 70 },
  { month: "May", RIMICanuckVoyageTravelMedical: 110, RIMICanuckVoyageNonMedicalTravel: 120, SecureStudyRIMIInternationalStudentstoCanada: 100, SecureTravelRIMIVisitorstoCanadaTravel: 90 },
  { month: "Jun", RIMICanuckVoyageTravelMedical: 130, RIMICanuckVoyageNonMedicalTravel: 140, SecureStudyRIMIInternationalStudentstoCanada: 120, SecureTravelRIMIVisitorstoCanadaTravel: 110 },
  { month: "Jul", RIMICanuckVoyageTravelMedical: 150, RIMICanuckVoyageNonMedicalTravel: 160, SecureStudyRIMIInternationalStudentstoCanada: 140, SecureTravelRIMIVisitorstoCanadaTravel: 130 },
];

const dummyDailyData = [
  { day: "2024-02-01", RIMICanuckVoyageTravelMedical: 5, RIMICanuckVoyageNonMedicalTravel: 7, SecureStudyRIMIInternationalStudentstoCanada: 3, SecureTravelRIMIVisitorstoCanadaTravel: 6 },
  { day: "2024-02-02", RIMICanuckVoyageTravelMedical: 10, RIMICanuckVoyageNonMedicalTravel: 12, SecureStudyRIMIInternationalStudentstoCanada: 8, SecureTravelRIMIVisitorstoCanadaTravel: 9 },
  { day: "2024-02-03", RIMICanuckVoyageTravelMedical: 15, RIMICanuckVoyageNonMedicalTravel: 18, SecureStudyRIMIInternationalStudentstoCanada: 12, SecureTravelRIMIVisitorstoCanadaTravel: 14 },
  { day: "2024-02-04", RIMICanuckVoyageTravelMedical: 12, RIMICanuckVoyageNonMedicalTravel: 15, SecureStudyRIMIInternationalStudentstoCanada: 10, SecureTravelRIMIVisitorstoCanadaTravel: 11 },
  { day: "2024-02-05", RIMICanuckVoyageTravelMedical: 18, RIMICanuckVoyageNonMedicalTravel: 22, SecureStudyRIMIInternationalStudentstoCanada: 15, SecureTravelRIMIVisitorstoCanadaTravel: 20 },
];

const pieDataDaiy =  [
  { name: 'RIMICanuckVoyageTravelMedical', value: 400 },
  { name: 'RIMICanuckVoyageNonMedicalTravel', value: 300 },
  { name: 'SecureStudyRIMIInternationalStudentstoCanada', value: 300 },
  { name: 'SecureTravelRIMIVisitorstoCanadaTravel', value: 200 },
];

const QuotesAnalysis = () => {
  const [quotesPerMonth] = useState(dummyMonthlyData);
  const [quotesPerDay] = useState(dummyDailyData);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-[#3a17c5]">Quotes Statistics</h2>

      <div className=" flex flex-col  ">

        {/* Quotes Per Month Chart */}
      <div className="mb-8 w-full">
        <h3 className="text-lg font-semibold mb-2 text-center text-[#3a17c5]">Quotes Generated Per Month (by Product)</h3>
        <ResponsiveContainer width="70%" height={300}>
          <BarChart data={quotesPerMonth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="RIMICanuckVoyageTravelMedical" fill="#578FCA" />
            <Bar dataKey="RIMICanuckVoyageNonMedicalTravel" fill="#3D8D7A" />
            <Bar dataKey="SecureStudyRIMIInternationalStudentstoCanada" fill="#FF9D23" />
            <Bar dataKey="SecureTravelRIMIVisitorstoCanadaTravel" fill="#D91656" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="30%" height={300} className="border-2 border-red-400">
        <PieChart width={400} height={400}>
          <Pie
            data={pieDataDaiy}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={dummyDailyData}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {quotesPerDay.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      </div>

      {/* Quotes Per Day Chart */}
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-2 text-center text-[#3a17c5]">Quotes Generated Per Day (by Product)</h3>
        <ResponsiveContainer width="70%" height={300}>
          <BarChart data={quotesPerDay} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="RIMICanuckVoyageTravelMedical" fill="#578FCA" />
            <Bar dataKey="RIMICanuckVoyageNonMedicalTravel" fill="#3D8D7A" />
            <Bar dataKey="SecureStudyRIMIInternationalStudentstoCanada" fill="#FF9D23" />
            <Bar dataKey="SecureTravelRIMIVisitorstoCanadaTravel" fill="#D91656" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      </div>
    </div>
  );
};

export default QuotesAnalysis;