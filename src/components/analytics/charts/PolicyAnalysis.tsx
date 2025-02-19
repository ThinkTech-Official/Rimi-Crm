

// export default function PolicyAnalysis() {
//   return (
//     <div>PolicyAnalysis</div>
//   )
// }

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const dummyPolicyMonthlyData = [
  { month: "Jan", RIMICanuckVoyageTravelMedical: 45, RIMICanuckVoyageNonMedicalTravel: 25 , SecureStudyRIMIInternationalStudentstoCanada: 35, SecureTravelRIMIVisitorstoCanadaTravel: 20 },
  { month: "Feb", RIMICanuckVoyageTravelMedical: 60, RIMICanuckVoyageNonMedicalTravel: 55 ,SecureStudyRIMIInternationalStudentstoCanada: 50, SecureTravelRIMIVisitorstoCanadaTravel: 30 },
  { month: "Mar", RIMICanuckVoyageTravelMedical: 75, SecureStudyRIMIInternationalStudentstoCanada: 65, SecureTravelRIMIVisitorstoCanadaTravel: 45 },
  { month: "Apr", RIMICanuckVoyageTravelMedical: 90, RIMICanuckVoyageNonMedicalTravel: 15 ,SecureStudyRIMIInternationalStudentstoCanada: 80, SecureTravelRIMIVisitorstoCanadaTravel: 55 },
  { month: "May", RIMICanuckVoyageTravelMedical: 110, RIMICanuckVoyageNonMedicalTravel: 65 ,SecureStudyRIMIInternationalStudentstoCanada: 95, SecureTravelRIMIVisitorstoCanadaTravel: 70 },
];

const dummyPolicyDailyData = [
  { day: "2024-02-01", RIMICanuckVoyageTravelMedical: 5,RIMICanuckVoyageNonMedicalTravel: 45 , SecureStudyRIMIInternationalStudentstoCanada: 3, SecureTravelRIMIVisitorstoCanadaTravel: 2 },
  { day: "2024-02-02", RIMICanuckVoyageTravelMedical: 10, RIMICanuckVoyageNonMedicalTravel: 25 , SecureStudyRIMIInternationalStudentstoCanada: 8, SecureTravelRIMIVisitorstoCanadaTravel: 6 },
  { day: "2024-02-03", RIMICanuckVoyageTravelMedical: 15, RIMICanuckVoyageNonMedicalTravel: 35 , SecureStudyRIMIInternationalStudentstoCanada: 12, SecureTravelRIMIVisitorstoCanadaTravel: 9 },
  { day: "2024-02-04", RIMICanuckVoyageTravelMedical: 12, RIMICanuckVoyageNonMedicalTravel: 85 , SecureStudyRIMIInternationalStudentstoCanada: 10, SecureTravelRIMIVisitorstoCanadaTravel: 7 },
  { day: "2024-02-05", RIMICanuckVoyageTravelMedical: 18, RIMICanuckVoyageNonMedicalTravel: 15 , SecureStudyRIMIInternationalStudentstoCanada: 15, SecureTravelRIMIVisitorstoCanadaTravel: 10 },
];

const PolicyAnalysis = () => {
  const [policiesPerMonth] = useState(dummyPolicyMonthlyData);
  const [policiesPerDay] = useState(dummyPolicyDailyData);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-[#3a17c5]">Policy Statistics</h2>

      <div className=" flex flex-col md:flex-row ">
        {/* Policies Per Month Chart */}
        <div className="mb-8 w-full">
          <h3 className="text-lg font-semibold mb-2 text-center text-[#3a17c5]">Policies Issued Per Month (by Product)</h3>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={policiesPerMonth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
        </div>

        {/* Policies Per Day Chart */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2 text-center text-[#3a17c5]">Policies Issued Per Day (by Product)</h3>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={policiesPerDay} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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

export default PolicyAnalysis;
