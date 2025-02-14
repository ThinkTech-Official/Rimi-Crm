import React, { useState } from "react";

const TripCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState("duration");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [weeks, setWeeks] = useState("");
  const [days, setDays] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<string>("");

  const calculateResult = () => {
    if (calculationType === "duration" && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setResult(`${diffDays} Days`);
    } else if (calculationType === "newDate" && startDate) {
      let newDate = new Date(startDate);
      if (years)
        newDate.setFullYear(
          newDate.getFullYear() + (operation === "add" ? +years : -years)
        );
      if (months)
        newDate.setMonth(
          newDate.getMonth() + (operation === "add" ? +months : -months)
        );
      if (weeks)
        newDate.setDate(
          newDate.getDate() + (operation === "add" ? +weeks * 7 : -weeks * 7)
        );
      if (days)
        newDate.setDate(
          newDate.getDate() + (operation === "add" ? +days : -days)
        );
      setResult(newDate.toDateString());
    } else {
      setResult("Invalid Input");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6  rounded-lg shadow-2xl text-center">
      <h2 className="text-xl font-semibold text-[#3a17c5] mb-4">
        TRIP CALCULATOR
      </h2>
      <div className="flex justify-center space-x-4 mb-4">
        <label>
          <input
            type="radio"
            value="duration"
            checked={calculationType === "duration"}
            onChange={() => setCalculationType("duration")}
          />
          <span className="ml-2">Calculate Duration</span>
        </label>
        <label>
          <input
            type="radio"
            value="newDate"
            checked={calculationType === "newDate"}
            onChange={() => setCalculationType("newDate")}
          />
          <span className="ml-2">Calculate New Date</span>
        </label>
      </div>
      <div className="flex justify-center space-x-6 mb-4">
        <div className=" space-y-2">
          <label className="block text-gray-700">START DATE</label>
          <input
            type="date"
            className="p-2 border rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        {calculationType === "duration" ? (
          <div>
            <label className="block text-gray-700">END DATE</label>
            <input
              type="date"
              className="p-2 border rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex justify-start space-x-6 mb-4">
            <div className=" space-y-2">
              <label className="block text-gray-700 text-md">Add/Subtract:</label>{" "}
              <select
                className="p-2 border rounded"
                onChange={(e) => setOperation(e.target.value)}
              >
                <option value="add">(+) Add</option>
                <option value="subtract">(-) Subtract</option>
              </select>
            </div>
            <div className=" space-y-2">
              <label className="block text-gray-700">Years</label>
              <input
                className=" w-16 p-2 border rounded"
                placeholder="Years"
                onChange={(e) => setYears(e.target.value)}
              />{" "}
            </div>
            <div className=" space-y-2">
              <label className="block text-gray-700">Months</label>
              <input
                className=" w-16 p-2 border rounded"
                placeholder="Months"
                onChange={(e) => setMonths(e.target.value)}
              />{" "}
            </div>
            <div className=" space-y-2">
              <label className="block text-gray-700">Weeks</label>
              <input
                className=" w-16 p-2 border rounded"
                placeholder="Weeks"
                onChange={(e) => setWeeks(e.target.value)}
              />{" "}
            </div>
            <div className=" space-y-2">
              <label className="block text-gray-700">Days</label>
              <input
                className=" w-16 p-2 border rounded"
                placeholder="Days"
                onChange={(e) => setDays(e.target.value)}
              />{" "}
            </div>
          </div>
        )}
      </div>
      {/* {calculationType === "newDate" && (
        <div className="flex justify-start space-x-4 mb-4">
          <select className="p-2 border rounded" onChange={(e) => setOperation(e.target.value)}>
            <option value="add">(+) Add</option>
            <option value="subtract">(-) Subtract</option>
          </select>
          <input className=" w-16 p-2 border rounded" placeholder="Years" onChange={(e) => setYears(e.target.value)} />
          <input className=" w-16 p-2 border rounded" placeholder="Months" onChange={(e) => setMonths(e.target.value)} />
          <input className=" w-16 p-2 border rounded" placeholder="Weeks" onChange={(e) => setWeeks(e.target.value)} />
          <input className=" w-16 p-2 border rounded" placeholder="Days" onChange={(e) => setDays(e.target.value)} />
        </div>
      )} */}
      <div className="">
        <button
          className="bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5] transition cursor-pointer"
          onClick={calculateResult}
        >
          CALCULATE
        </button>
      </div>
      {result && (
        <div className="mt-4 text-lg font-semibold text-[#3a17c5]">
          Result: {result}
          <p className=" text-sm text-gray-700">From Start Date: {startDate}</p>
        </div>
      )}
    </div>
  );
};

export default TripCalculator;
