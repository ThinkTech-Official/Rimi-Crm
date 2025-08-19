import MultiLineChart from "./charts/MultiLineChart";
import PolicyAnalysis from "./charts/PolicyAnalysis";
import QuotesAnalysis from "./charts/QuotesAnalysis";
import QuotesVsPolicyConversion from "./charts/QuotesVsPolicyConversion";

export default function Analytics() {
  return (
    <>
      <div className="w-full flex flex-col">
        <h2 className="text-lg font-bold mb-4 text-text-primary">
          Quotes Statistics
        </h2>
        <div className=" mt-4 mb-4">
          <QuotesAnalysis />
        </div>
         <h2 className="text-lg font-bold mt-6 mb-4 text-text-primary">
          Policy Statistics
        </h2>
        <div className=" mt-4 mb-4">
          <PolicyAnalysis />
        </div>
        <h2 className="text-lg font-bold mt-6 mb-4 text-text-primary">
          Quotes vs Policies
        </h2>
        <div className=" mt-4 mb-4">
          <QuotesVsPolicyConversion />
        </div>
        <h2 className="text-lg font-bold mt-6 mb-4 text-text-primary">Agents Types Joined Per Month</h2>
        <div className=" mt-4 mb-4">
          <MultiLineChart />
        </div>
      </div>
    </>
  );
}
