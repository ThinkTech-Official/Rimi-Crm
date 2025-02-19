// import React from 'react'

// export default function QuotesVsPolicyConversion() {
//   return (
//     <div>QuotesVsPolicyConversion</div>
//   )
// }

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const dummyMonthlyData = [
  { month: "Jan", quotes: 120, policies: 80 },
  { month: "Feb", quotes: 150, policies: 90 },
  { month: "Mar", quotes: 180, policies: 110 },
  { month: "Apr", quotes: 200, policies: 130 },
  { month: "May", quotes: 250, policies: 170 },
  { month: "Jun", quotes: 300, policies: 200 },
  { month: "Jul", quotes: 350, policies: 230 },
  { month: "Aug", quotes: 400, policies: 260 },
  { month: "Sep", quotes: 380, policies: 250 },
  { month: "Oct", quotes: 420, policies: 280 },
  { month: "Nov", quotes: 450, policies: 300 },
  { month: "Dec", quotes: 500, policies: 350 },
];

const QuotesVsPolicyConversion = () => {
  const [data] = useState(dummyMonthlyData);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-[#3a17c5]">Quotes vs Policies (Monthly)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quotes" stackId="a" fill="#578FCA" name="Quotes Generated" />
          <Bar dataKey="policies" stackId="a" fill="#FF9D23" name="Policies Issued" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuotesVsPolicyConversion;