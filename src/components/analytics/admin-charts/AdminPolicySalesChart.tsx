import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
const AdminPolicySalesChart = () => {
  const data = [
    {
      policy: "RIMI Canuck Voyage Travel Medical",
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      policy: "RIMI Canuck Voyage Non-Medical Travel",
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      policy: "Secure Study RIMI International Students to Canada",
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      policy: "Secure Travel RIMI Visitors to Canada Travel",
      A: 99,
      B: 100,
      fullMark: 150,
    },
  ];
  return (
    <div className="py-10">
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart cx="50%" cy="50%" outerRadius="90%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="policy" />
          <PolarRadiusAxis />
          <Radar
            name="Mike"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.4}
          />
          <Legend
            content={
              <>
                <div className="flex items-center gap-2 justify-center mt-10">
                  <div className="w-4 h-4 rounded-full bg-[#8884d8]"></div>
                  <p className="text-sm">Quotes</p>
                </div>
              </>
            }
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminPolicySalesChart;
