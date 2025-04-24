import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function TripInformation() {
  const [showTripCost, setShowTripCost] = useState(false);
  const [showTripCancellation, setSshowTripCancellation] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-9 p-6 bg-[#F9F9F9]">
      <h3 className="text-xl font-bold text-left text-[#1B1B1B] mb-6 font-[inter]">
        Trip Information
      </h3>

      {/* Trip cost  */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="flex gap-2 font-[inter]">
          <InformationCircleIcon
            onClick={() => setShowTripCost((prevState) => !prevState)}
            className="h-5 w-5 text-[#3a17c5] cursor-pointer"
            aria-hidden="true"
          />
          Trip Cost
        </label>
        <input
          className="p-2 border border-[#DBDADE] font-[inter]"
          type="text"
          placeholder=""
        />
      </div>

      {showTripCost && (
        <div className="border rounded-lg shadow-sm p-4 mt-4 bg-white font-[inter]">
          <h2 className="text-lg font-semibold border-b pb-2">Trip Cost</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter the total cost, per person, of the non-refundable, pre-paid
            travel arrangements. The maximum available trip cost is{" "}
            <strong>$30,000 per person</strong>.
          </p>
        </div>
      )}

      {/* Trip Cancellation */}
      <div className="flex flex-col gap-2 mb-4 mt-4">
        <label className="flex gap-2 font-[inter]">
          <InformationCircleIcon
            onClick={() => setSshowTripCancellation((prevState) => !prevState)}
            className="h-5 w-5 text-[#3a17c5] cursor-pointer"
            aria-hidden="true"
          />
          Trip Cancellation - Deluxe Option
        </label>
        <select className="p-2 border border-[#DBDADE] font-[inter]">
          <option value="">Please select...</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {showTripCancellation && (
        <div className="border rounded-lg shadow-sm p-4 mt-4 bg-white font-[inter]">
          <h2 className="text-lg font-semibold border-b pb-2">
            Trip Cancellation - Deluxe Option
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            The following trip cancellation insured risks are covered if the
            Deluxe Option is selected:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-2">
            <li>Rail services cancelled due to staff shortages.</li>
            <li>
              Pregnancy of your immediate family member, provided pregnancy
              occurs after the date of initial booking.
            </li>
            <li>
              The cancellation of a trip by your insured travel companion due to
              an insured risk. This insured risk is only applicable when your
              travel companion is insured under the Association and Tour
              Operator All Inclusive Travel Insurance plan.
            </li>
            <li>
              Cancellation of commercial child care services within 7 days prior
              to the departure date.
            </li>
            <li>
              Critical illness of your cat or dog, less than 5 years old, within
              7 days prior to the departure date, validated by a licensed
              veterinarian when the illness occurs after the effective date of
              the policy.
            </li>
            <li>
              Undue financial hardship of your corporation due to unforeseen
              circumstances resulting in loss of revenue more than 30% after the
              date the trip was booked and prior to the departure date.
              Supporting financial documentation will be required at the time of
              claim.
            </li>
            <li>
              Your employer mandates that you are required to work during your
              scheduled trip. Supporting documentation from your employer will
              be required at the time of claim.
            </li>
            <li>
              Political unrest, riot, rebellion, or revolution in your home
              country or destination country.
            </li>
            <li>
              A report of adverse weather at your destination at the time of
              your scheduled arrival.
            </li>
            <li>
              Worsening of your chronic illness that was stable at the time your
              trip was booked.
            </li>
            <li>
              Your required attendance at a business or board event that was
              scheduled after this insurance was purchased and after you booked
              your trip.
            </li>
          </ul>
        </div>
      )}

      {/* Date inputs */}
      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 mt-6">
        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Date the Trip was Booked</label>
          <input className="p-2 border border-[#DBDADE] font-[inter]" type="date" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Departure Date</label>
          <input className="p-2 border border-[#DBDADE] font-[inter]" type="date" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Return Date</label>
          <input className="p-2 border border-[#DBDADE] font-[inter]" type="date" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Coverage Length</label>
          <input
            className="p-2 border border-[#DBDADE] font-[inter]"
            type="text"
            disabled
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-[inter]">Destination Country</label>
          <input
            className="p-2 border border-[#DBDADE] font-[inter]"
            type="text"
            value="Canada"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
