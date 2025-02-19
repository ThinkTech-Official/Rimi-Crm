import MultiLineChart from "./charts/MultiLineChart";
import PolicyAnalysis from "./charts/PolicyAnalysis";
import QuotesAnalysis from "./charts/QuotesAnalysis";
import QuotesVsPolicyConversion from "./charts/QuotesVsPolicyConversion";

export default function Analytics() {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className=" mt-4 mb-4">
          <QuotesAnalysis />
        </div>
        <div className=" mt-4 mb-4">
          <PolicyAnalysis />
        </div>
        <div className=" mt-4 mb-4">
            <QuotesVsPolicyConversion />
        </div>
        <div className=" mt-4 mb-4">
          <MultiLineChart />
        </div>
      </div>
    </>
  );
}
