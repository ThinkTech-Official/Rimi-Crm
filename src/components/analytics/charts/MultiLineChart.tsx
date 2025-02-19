
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "January", Mga: 30, Agents: 80, Readonly: 45},
  { month: "February", Mga: 50, Agents: 140, Readonly: 35 },
  { month: "March", Mga: 70, Agents: 60, Readonly: 55 },
  { month: "April", Mga: 90, Agents: 80, Readonly: 75 },
  { month: "May", Mga: 35, Agents: 100, Readonly: 95 },
  { month: "June", Mga: 130, Agents: 10, Readonly: 55 },
  { month: "July", Mga: 150, Agents: 140, Readonly: 35 },
  { month: "August", Mga: 50, Agents: 160, Readonly: 55 },
  { month: "September", Mga: 190, Agents: 80, Readonly: 175 },
  { month: "October", Mga: 21, Agents: 200, Readonly: 95 },
  { month: "November", Mga: 230, Agents: 22, Readonly: 25 },
  { month: "December", Mga: 50, Agents: 40, Readonly: 35 },
];

const MultiLineChart = () => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-[#3a17c5]">User Types Joined Per Month</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Mga" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="Agents" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="Readonly" stroke="#ff7300" strokeWidth={2} />
          {/* <Line type="monotone" dataKey="user4" stroke="#d62728" strokeWidth={2} /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MultiLineChart;