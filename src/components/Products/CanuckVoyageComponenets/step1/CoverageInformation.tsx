// import { InformationCircleIcon } from "@heroicons/react/24/outline";

// interface CoverageInformationProps {
//   displayInfoDestinationCountry: boolean;
//   setDisplayInfoDestinationCountry: React.Dispatch<
//     React.SetStateAction<boolean>
//   >;
//   travelingThroughUS: boolean;
//   setTravelingThroughUS: React.Dispatch<React.SetStateAction<boolean>>;
//   setDisplayInfoDeductible: React.Dispatch<React.SetStateAction<boolean>>;
//   displayInfoDeductible: boolean;
// }

// export default function CoverageInformation({
//   displayInfoDestinationCountry,
//   setDisplayInfoDestinationCountry,
//   travelingThroughUS,
//   setTravelingThroughUS,
//   setDisplayInfoDeductible,
//   displayInfoDeductible,
// }: CoverageInformationProps) {
//   return (
//     <div className="max-w-5xl mx-auto mt-6 p-6 bg-[#F9F9F9]">
//       <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
//         Coverage Information
//       </h3>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
//         <div className="flex flex-col">
//           <label className="text-sm">Policy Type</label>
//           <select className="input-primary appearance-none cursor-pointer">
//             <option>Please select</option>
//             <option>Single Trip</option>
//             <option>Multi-Trip Annual</option>
//           </select>
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm">Effective Date</label>
//           <input
//             className="input-primary appearance-none cursor-pointer"
//             type="date"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm">Expiry Date</label>
//           <input
//             className="input-primary appearance-none cursor-pointer"
//             type="date"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm">Coverage Length</label>
//           <input
//             className="input-primary appearance-none cursor-pointer"
//             type="text"
//             disabled
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="flex items-center text-sm">
//             Destination Country
//             <InformationCircleIcon
//               onClick={() =>
//                 setDisplayInfoDestinationCountry((prevState) => !prevState)
//               }
//               className="h-5 w-5 text-[#3a17c5] cursor-pointer"
//               aria-hidden="true"
//             />
//           </label>
//           <select className="input-primary appearance-none cursor-pointer">
//            <option>Please select</option>
//             <option value="AF">Afghanistan</option>
//             <option value="AX">Åland Islands</option>
//             <option value="AL">Albania</option>
//             <option value="DZ">Algeria</option>
//             <option value="AS">American Samoa</option>
//             <option value="AD">Andorra</option>
//             <option value="AO">Angola</option>
//             <option value="AI">Anguilla</option>
//             <option value="AQ">Antarctica</option>
//             <option value="AG">Antigua and Barbuda</option>
//             <option value="AR">Argentina</option>
//             <option value="AM">Armenia</option>
//             <option value="AW">Aruba</option>
//             <option value="AU">Australia</option>
//             <option value="AT">Austria</option>
//             <option value="AZ">Azerbaijan</option>
//             <option value="BS">Bahamas</option>
//             <option value="BH">Bahrain</option>
//             <option value="BD">Bangladesh</option>
//             <option value="BB">Barbados</option>
//             <option value="BY">Belarus</option>
//             <option value="BE">Belgium</option>
//             <option value="BZ">Belize</option>
//             <option value="BJ">Benin</option>
//             <option value="BM">Bermuda</option>
//             <option value="BT">Bhutan</option>
//             <option value="BO">Bolivia</option>
//             <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
//             <option value="BA">Bosnia and Herzegovina</option>
//             <option value="BW">Botswana</option>
//             <option value="BV">Bouvet Island</option>
//             <option value="BR">Brazil</option>
//             <option value="IO">British Indian Ocean Territory</option>
//             <option value="VG">British Virgin Islands</option>
//             <option value="BN">Brunei</option>
//             <option value="BG">Bulgaria</option>
//             <option value="BF">Burkina Faso</option>
//             <option value="BI">Burundi</option>
//             <option value="KH">Cambodia</option>
//             <option value="CM">Cameroon</option>
//             <option value="CA">Canada</option>
//             <option value="CV">Cape Verde</option>
//             <option value="KY">Cayman Islands</option>
//             <option value="CF">Central African Republic</option>
//             <option value="TD">Chad</option>
//             <option value="CL">Chile</option>
//             <option value="CN">China</option>
//             <option value="CX">Christmas Island</option>
//             <option value="CC">Cocos (Keeling) Islands</option>
//             <option value="CO">Colombia</option>
//             <option value="KM">Comoros</option>
//             <option value="CK">Cook Islands</option>
//             <option value="CR">Costa Rica</option>
//             <option value="HR">Croatia</option>
//             <option value="CW">Curaçao</option>
//             <option value="CY">Cyprus</option>
//             <option value="CZ">Czech Republic</option>
//             <option value="DK">Denmark</option>
//             <option value="DJ">Djibouti</option>
//             <option value="DM">Dominica</option>
//             <option value="DO">Dominican Republic</option>
//             <option value="CD">DR Congo</option>
//             <option value="EC">Ecuador</option>
//             <option value="EG">Egypt</option>
//             <option value="SV">El Salvador</option>
//             <option value="GQ">Equatorial Guinea</option>
//             <option value="ER">Eritrea</option>
//             <option value="EE">Estonia</option>
//             <option value="ET">Ethiopia</option>
//             <option value="FK">Falkland Islands</option>
//             <option value="FO">Faroe Islands</option>
//             <option value="FJ">Fiji</option>
//             <option value="FI">Finland</option>
//             <option value="FR">France</option>
//             <option value="GF">French Guiana</option>
//             <option value="PF">French Polynesia</option>
//             <option value="TF">French Southern and Antarctic Lands</option>
//             <option value="GA">Gabon</option>
//             <option value="GM">Gambia</option>
//             <option value="GE">Georgia</option>
//             <option value="DE">Germany</option>
//             <option value="GH">Ghana</option>
//             <option value="GI">Gibraltar</option>
//             <option value="GR">Greece</option>
//             <option value="GL">Greenland</option>
//             <option value="GD">Grenada</option>
//             <option value="GP">Guadeloupe</option>
//             <option value="GU">Guam</option>
//             <option value="GT">Guatemala</option>
//             <option value="GG">Guernsey</option>
//             <option value="GN">Guinea</option>
//             <option value="GW">Guinea-Bissau</option>
//             <option value="GY">Guyana</option>
//             <option value="HT">Haiti</option>
//             <option value="HM">Heard Island and McDonald Islands</option>
//             <option value="HN">Honduras</option>
//             <option value="HK">Hong Kong</option>
//             <option value="HU">Hungary</option>
//             <option value="IS">Iceland</option>
//             <option value="IN">India</option>
//             <option value="ID">Indonesia</option>
//             <option value="IQ">Iraq</option>
//             <option value="IE">Ireland</option>
//             <option value="IM">Isle of Man</option>
//             <option value="IL">Israel</option>
//             <option value="IT">Italy</option>
//             <option value="CI">Ivory Coast</option>
//             <option value="JM">Jamaica</option>
//             <option value="JP">Japan</option>
//             <option value="JE">Jersey</option>
//             <option value="JO">Jordan</option>
//             <option value="KZ">Kazakhstan</option>
//             <option value="KE">Kenya</option>
//             <option value="KI">Kiribati</option>
//             <option value="XK">Kosovo</option>
//             <option value="KW">Kuwait</option>
//             <option value="KG">Kyrgyzstan</option>
//             <option value="LA">Laos</option>
//             <option value="LV">Latvia</option>
//             <option value="LB">Lebanon</option>
//             <option value="LS">Lesotho</option>
//             <option value="LR">Liberia</option>
//             <option value="LY">Libya</option>
//             <option value="LI">Liechtenstein</option>
//             <option value="LT">Lithuania</option>
//             <option value="LU">Luxembourg</option>
//             <option value="MO">Macau</option>
//             <option value="MK">Macedonia</option>
//             <option value="MG">Madagascar</option>
//             <option value="MW">Malawi</option>
//             <option value="MY">Malaysia</option>
//             <option value="MV">Maldives</option>
//             <option value="ML">Mali</option>
//             <option value="MT">Malta</option>
//             <option value="MH">Marshall Islands</option>
//             <option value="MQ">Martinique</option>
//             <option value="MR">Mauritania</option>
//             <option value="MU">Mauritius</option>
//             <option value="YT">Mayotte</option>
//             <option value="MX">Mexico</option>
//             <option value="FM">Micronesia</option>
//             <option value="MD">Moldova</option>
//             <option value="MC">Monaco</option>
//             <option value="MN">Mongolia</option>
//             <option value="ME">Montenegro</option>
//             <option value="MS">Montserrat</option>
//             <option value="MA">Morocco</option>
//             <option value="MZ">Mozambique</option>
//             <option value="MM">Myanmar</option>
//             <option value="NA">Namibia</option>
//             <option value="NR">Nauru</option>
//             <option value="NP">Nepal</option>
//             <option value="NL">Netherlands</option>
//             <option value="NC">New Caledonia</option>
//             <option value="NZ">New Zealand</option>
//             <option value="NI">Nicaragua</option>
//             <option value="NE">Niger</option>
//             <option value="NG">Nigeria</option>
//             <option value="NU">Niue</option>
//             <option value="NF">Norfolk Island</option>
//             <option value="MP">Northern Mariana Islands</option>
//             <option value="NO">Norway</option>
//             <option value="OM">Oman</option>
//             <option value="PK">Pakistan</option>
//             <option value="PW">Palau</option>
//             <option value="PS">Palestine</option>
//             <option value="PA">Panama</option>
//             <option value="PG">Papua New Guinea</option>
//             <option value="PY">Paraguay</option>
//             <option value="PE">Peru</option>
//             <option value="PH">Philippines</option>
//             <option value="PN">Pitcairn Islands</option>
//             <option value="PL">Poland</option>
//             <option value="PT">Portugal</option>
//             <option value="PR">Puerto Rico</option>
//             <option value="QA">Qatar</option>
//             <option value="CG">Republic of the Congo</option>
//             <option value="RE">Réunion</option>
//             <option value="RO">Romania</option>
//             <option value="RW">Rwanda</option>
//             <option value="BL">Saint Barthélemy</option>
//             <option value="SH">Saint Helena</option>
//             <option value="KN">Saint Kitts and Nevis</option>
//             <option value="LC">Saint Lucia</option>
//             <option value="MF">Saint Martin</option>
//             <option value="PM">Saint Pierre and Miquelon</option>
//             <option value="VC">Saint Vincent and the Grenadines</option>
//             <option value="WS">Samoa</option>
//             <option value="SM">San Marino</option>
//             <option value="ST">São Tomé and Príncipe</option>
//             <option value="SA">Saudi Arabia</option>
//             <option value="SN">Senegal</option>
//             <option value="RS">Serbia</option>
//             <option value="SC">Seychelles</option>
//             <option value="SL">Sierra Leone</option>
//             <option value="SG">Singapore</option>
//             <option value="SX">Sint Maarten</option>
//             <option value="SK">Slovakia</option>
//             <option value="SI">Slovenia</option>
//             <option value="SB">Solomon Islands</option>
//             <option value="SO">Somalia</option>
//             <option value="ZA">South Africa</option>
//             <option value="GS">South Georgia</option>
//             <option value="KR">South Korea</option>
//             <option value="SS">South Sudan</option>
//             <option value="ES">Spain</option>
//             <option value="LK">Sri Lanka</option>
//             <option value="SR">Suriname</option>
//             <option value="SJ">Svalbard and Jan Mayen</option>
//             <option value="SZ">Swaziland</option>
//             <option value="SE">Sweden</option>
//             <option value="CH">Switzerland</option>
//             <option value="TW">Taiwan</option>
//             <option value="TJ">Tajikistan</option>
//             <option value="TZ">Tanzania</option>
//             <option value="TH">Thailand</option>
//             <option value="TL">Timor-Leste</option>
//             <option value="TG">Togo</option>
//             <option value="TK">Tokelau</option>
//             <option value="TO">Tonga</option>
//             <option value="TT">Trinidad and Tobago</option>
//             <option value="TN">Tunisia</option>
//             <option value="TR">Turkey</option>
//             <option value="TM">Turkmenistan</option>
//             <option value="TC">Turks and Caicos Islands</option>
//             <option value="TV">Tuvalu</option>
//             <option value="UG">Uganda</option>
//             <option value="AE">United Arab Emirates</option>
//             <option value="GB">United Kingdom</option>
//             <option value="US">United States</option>
//             <option value="UM">United States Minor Outlying Islands</option>
//             <option value="VI">United States Virgin Islands</option>
//             <option value="UY">Uruguay</option>
//             <option value="UZ">Uzbekistan</option>
//             <option value="VU">Vanuatu</option>
//             <option value="VA">Vatican City</option>
//             <option value="VE">Venezuela</option>
//             <option value="VN">Vietnam</option>
//             <option value="WF">Wallis and Futuna</option>
//             <option value="EH">Western Sahara</option>
//             <option value="YE">Yemen</option>
//             <option value="ZM">Zambia</option>
//             <option value="ZW">Zimbabwe</option>
//           </select>
//         </div>

//         {/* {displayInfoDeductible && (
//           <div className="border rounded-lg shadow-sm p-4 mt-4 bg-white font-[inter]">
//             <h2 className="text-lg font-semibold border-b pb-2">Deductible</h2>
//             <p className="text-sm text-gray-600 mt-2">
//               Deductible means the amount (if applicable), in Canadian dollars,
//               which the insured must pay before any remaining eligible expenses
//               are reimbursed under this policy...
//             </p>

//             <div className="mt-4">
//               <h3 className="text-md font-semibold text-gray-700 text-center">
//                 Deductible Discounts
//               </h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full border border-gray-300 mt-2 text-sm font-[inter]">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="border border-gray-300 p-2 text-left">
//                         Deductible Option
//                       </th>
//                       <th className="border border-gray-300 p-2 text-left">
//                         Discount
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[
//                       { option: "$0", discount: "No discount" },
//                       { option: "$250", discount: "9%" },
//                       { option: "$500", discount: "14%" },
//                       { option: "$1,000", discount: "18%" },
//                       { option: "$5,000", discount: "35%" },
//                       { option: "$10,000", discount: "45%" },
//                     ].map(({ option, discount }, idx) => (
//                       <tr key={idx}>
//                         <td className="border border-gray-300 p-2">{option}</td>
//                         <td className="border border-gray-300 p-2">
//                           {discount}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )} */}
//       </div>

//       {displayInfoDestinationCountry && (
//         <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white">
//           <h2 className="text-center text-primary font-semibold">
//             Destination
//           </h2>
//           <p className="text-sm text-text-secondary mt-2">
//             Select the primary destination country for your trip. Select Canada
//             only if you are travelling outside your home province, but within
//             Canada for your entire trip.
//           </p>
//         </div>
//       )}

//       <div className="mt-6 flex flex-col text-text-secondary">
//         <label>Are you travelling through the US?</label>
//         <div className="flex gap-10">
//           <label className="flex items-center space-x-1">
//             <input
//               type="radio"
//               name="travelUS"
//               value="yes"
//               className="form-radio accent-primary cursor-pointer"
//               onChange={() => setTravelingThroughUS(true)}
//             />
//             <span>Yes</span>
//           </label>
//           <label className="flex items-center space-x-1">
//             <input
//               type="radio"
//               name="travelUS"
//               value="no"
//               className="form-radio accent-primary cursor-pointer"
//               onChange={() => setTravelingThroughUS(false)}
//             />
//             <span>No</span>
//           </label>
//         </div>
//       </div>

//       {travelingThroughUS && (
//         <div className="mt-4 flex flex-col text-text-secondary">
//           <label className="text-sm">Number of Travel Days in the US</label>
//           <input
//             type="number"
//             className="input-primary"
//             placeholder="Enter number of days"
//           />
//         </div>
//       )}

//       <div className="mt-6 flex flex-col">
//         <label className="flex items-center text-sm text-text-secondary">
//           Deductible
//           <InformationCircleIcon
//             onClick={() => setDisplayInfoDeductible((prevState) => !prevState)}
//             className="h-5 w-5 text-[#3a17c5] cursor-pointer"
//             aria-hidden="true"
//           />
//         </label>
//         <select className="input-primary appearance-none cursor-pointer">
//           <option value="">Please select...</option>
//           <option value="0">$0.00 CAD</option>
//           <option value="250">$250.00 CAD</option>
//           <option value="500">$500.00 CAD</option>
//           <option value="1000">$1,000.00 CAD</option>
//           <option value="5000">$5,000.00 CAD</option>
//           <option value="10000">$10,000.00 CAD</option>
//         </select>
//       </div>

//       {displayInfoDeductible && (
//         <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
//           <h2 className="text-lg font-semibold border-b border-[#c2c2c2] pb-2">
//             Deductible
//           </h2>
//           <button
//             className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
//             onClick={() => setDisplayInfoDeductible(false)}
//           >
//             close
//           </button>
//           <p className="text-sm text-gray-600 mt-2">
//             Deductible means the amount (if applicable), in Canadian dollars,
//             which the insured must pay before any remaining eligible expenses
//             are reimbursed under this policy...
//           </p>

//           <div className="mt-4">
//             <h3 className="text-md font-semibold text-gray-700 text-center">
//               Deductible Discounts
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full border border-gray-300 mt-2 text-sm">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="border border-gray-300 p-2 text-left">
//                       Deductible Option
//                     </th>
//                     <th className="border border-gray-300 p-2 text-left">
//                       Discount
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {[
//                     { option: "$0", discount: "No discount" },
//                     { option: "$250", discount: "9%" },
//                     { option: "$500", discount: "14%" },
//                     { option: "$1,000", discount: "18%" },
//                     { option: "$5,000", discount: "35%" },
//                     { option: "$10,000", discount: "45%" },
//                   ].map(({ option, discount }, idx) => (
//                     <tr key={idx}>
//                       <td className="border border-gray-300 p-2">{option}</td>
//                       <td className="border border-gray-300 p-2">{discount}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// ===================================

import { useEffect, useMemo, useState } from "react";
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Controller, UseFormReturn } from "react-hook-form";
import { usePremiumCalculationProduct3 } from "../../../../hooks/canuck-voyage/usePremiumCalculationProduct3";
import { Step1Payload } from "../RIMICanuckVoyageTravelMedical";
import DatePicker from "../../../DatePicker";
import EmailQuoteMedical from "./EmailQuoteMedical";
import { useLanguage } from "../../../../context/LanguageContext";

const msPerDay = 1000 * 60 * 60 * 24;

interface CoverageInformationProps {
  methods: UseFormReturn<Step1Payload>;
  totalPremium: number;
  setTotalPremium: (value: number) => void;
  premiumBreakdown: any;
  setPremiumBreakdown: (value: any) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string | null;
  setError: (value: string | null) => void;
  quoteNumber: string | null;
  agentCode: string;
  handleSaveQuote: () => Promise<boolean>;
  onValidityChange?: (isValid: boolean) => void;
  saving: boolean;
}

export default function CoverageInformation({
  methods,
  setTotalPremium,
  setPremiumBreakdown,
  setLoading,
  setError,
  quoteNumber,
  handleSaveQuote,
  premiumBreakdown,
  onValidityChange,
  saving,
}: CoverageInformationProps) {
  const { t } = useLanguage();
  const {
    register,
    watch,
    setValue,
    control,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = methods;

  const [displayInfoDestinationCountry, setDisplayInfoDestinationCountry] =
    useState(false);
  const [displayInfoDeductible, setDisplayInfoDeductible] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Watch form values
  const formValues = watch();
  const {
    policyType,
    effectiveDate,
    expiryDate,
    coverageLength,
    destinationCountry,
    travelingThroughUS,
    numberOfDaysPerTrip,
    deductible,
    primaryDateOfBirth,
    applicants,
  } = formValues;

  // Auto-calculate coverage length for Single Trip
  useEffect(() => {
    if (policyType === "Single Trip" && effectiveDate && expiryDate) {
      const eff = new Date(effectiveDate);
      const exp = new Date(expiryDate);
      const days = Math.round((exp.getTime() - eff.getTime()) / msPerDay) + 1;
      if (days > 0) {
        setValue("coverageLength", days);
      }
    }
  }, [effectiveDate, expiryDate, policyType, setValue]);

  // Auto-calculate coverage length for Multi-Trip Annual (always 365 days)
  useEffect(() => {
    if (policyType === "Multi-Trip Annual" && effectiveDate) {
      const eff = new Date(effectiveDate);
      const exp = new Date(eff);
      exp.setFullYear(eff.getFullYear() + 1);
      setValue("expiryDate", exp.toISOString().slice(0, 10));
      setValue("coverageLength", 365);
    }
  }, [policyType, effectiveDate, setValue]);


  // Check if form can calculate premium
  const canCalculatePremium = (() => {
    const baseFields = [
      policyType,
      effectiveDate,
      expiryDate,
      coverageLength,
      destinationCountry,
      travelingThroughUS,
      primaryDateOfBirth,
      String(deductible),
    ].every((v) => v !== "" && v !== undefined && v !== null);

    // All additional applicants must also have their DOB filled in
    const allApplicantDobsFilled =
      applicants.length === 0 ||
      applicants.every((a: any) => a.dob !== "" && a.dob !== undefined && a.dob !== null);

    if (policyType === "Multi-Trip Annual") {
      return (
        baseFields &&
        allApplicantDobsFilled &&
        numberOfDaysPerTrip !== undefined
      );
    }

    return baseFields && allApplicantDobsFilled;
  })();

  // Check if all fields filled for validation
  const isFormFilled = canCalculatePremium;

  useEffect(() => {
    onValidityChange?.(isFormFilled);
  }, [isFormFilled, onValidityChange]);

  // Premium calculation data
  const premiumCalculationData = {
    policyType,
    destinationCountry,
    travelingThroughUS,
    effectiveDate,
    expiryDate,
    coverageLength: Number(coverageLength),
    primaryDateOfBirth,
    numberOfDaysPerTrip,
    deductible,
    applicants: applicants.map((a: any) => ({ dob: a.dob })),
  };

  const {
    totalPremium: hookTotalPremium,
    breakdown: hookBreakdown,
    loading: hookLoading,
    error: hookError,
  } = usePremiumCalculationProduct3(
    premiumCalculationData,
    canCalculatePremium,
  );

  useEffect(() => {
    setTotalPremium(hookTotalPremium);
  }, [hookTotalPremium, setTotalPremium]);

  useEffect(() => {
    setPremiumBreakdown(hookBreakdown);
  }, [hookBreakdown, setPremiumBreakdown]);

  useEffect(() => {
    setLoading(hookLoading);
  }, [hookLoading, setLoading]);

  useEffect(() => {
    setError(hookError);
  }, [hookError, setError]);

  // Save Quote functionality

  // const handleQuoteSave = async () => {
  //   const payload = {
  //     primaryFirstName: "", // Get from parent if needed
  //     primaryLastName: "",
  //     primaryDateOfBirth,
  //     primaryEmail: "",
  //     primaryApplicantGender: "",
  //     provinceOfResidence: "",
  //     applicantNumber: applicants.length,
  //     applicants: applicants.map((a) => ({
  //       firstName: a.firstName,
  //       lastName: a.lastName,
  //       dob: a.dob,
  //       relationship: a.relationship,
  //       gender: a.gender,
  //     })),
  //     policyType,
  //     effectiveDate,
  //     expiryDate,
  //     coverageLength: Number(coverageLength),
  //     destinationCountry,
  //     travelingThroughUS,
  //     usTravelDays: usTravelDays! > 0 ? usTravelDays : undefined,
  //     numberOfDaysPerTrip,
  //     deductible,
  //     agentCode,
  //     product: "RIMI Canuck Voyage Travel Medical",
  //     status: "Inactive",
  //   };

  //   try {
  //     const response = await saveQuote(payload);
  //     setQuoteNumber(response?.quote);
  //     console.log("✅ Quote saved:", response?.quote);
  //   } catch (err) {
  //     console.error("❌ Save failed:", err);
  //   }
  // };

  return (
    <div className="max-w-5xl mx-auto mt-6 p-3 sm:p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        {t("Coverage Information")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        {/* Policy Type */}
        <div className="flex flex-col">
          <label className="text-sm">{t("Policy Type")}</label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              {...register("policyType", {
                required: t("Policy Type is required"),
                onChange: (e) => {
                  const val = e.target.value;
                  if (val === "Single Trip") {
                    setValue("coverageLength", 0);
                    setValue("expiryDate", "");
                  }
                  if (val !== "Multi-Trip Annual") {
                    setValue("numberOfDaysPerTrip", undefined);
                  }
                },
              })}
            >
              <option value="">{t("Please select")}</option>
              <option value="Single Trip">{t("Single Trip")}</option>
              <option value="Multi-Trip Annual">
                {t("Multi-Trip Annual")}
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          {errors.policyType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.policyType.message}
            </p>
          )}
        </div>

        <div>
          <Controller
            name={`effectiveDate`}
            control={control}
            rules={{
              required: t("Effective Date is required"),
              validate: (value) => {
                if (!value) return true;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const selDate = new Date(value);
                selDate.setHours(0, 0, 0, 0);
                return (
                  selDate.getTime() >= today.getTime() ||
                  t("Effective date cannot be in the past")
                );
              },
            }}
            render={({ field }) => (
              <DatePicker
                label={t("Effective Date")}
                value={field.value}
                onChange={(date: Date) => {
                  field.onChange(date);
                }}
                minDate={new Date()}
              />
            )}
          />
          {errors.effectiveDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.effectiveDate.message}
            </p>
          )}
        </div>

        {/* Expiry Date */}
        <div>
          <Controller
            name={`expiryDate`}
            control={control}
            rules={{
              required: t("Expiry Date is required"),
              validate: (value) => {
                if (effectiveDate && value) {
                  const eff = new Date(effectiveDate);
                  eff.setHours(0, 0, 0, 0);
                  const exp = new Date(value);
                  exp.setHours(0, 0, 0, 0);
                  if (exp < eff) {
                    return t("Expiry date must be after effective date");
                  }
                }
                return true;
              },
            }}
            render={({ field }) => (
              <DatePicker
                label={t("Expiry Date")}
                value={field.value}
                onChange={(date: Date) => {
                  field.onChange(date);
                }}
                minDate={new Date()}
              />
            )}
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expiryDate.message}
            </p>
          )}
        </div>

        {/* Coverage Length */}
        <div className="flex flex-col">
          <label className="text-sm">{t("Coverage Length (days)")}</label>
          <input
            className="input-primary"
            type="text"
            disabled
            {...register("coverageLength")}
          />
        </div>

        {/* Number of Days per Trip (Multi-Trip only) */}
        {policyType === "Multi-Trip Annual" && (
          <div className="flex flex-col">
            <label className="text-sm">{t("Number of Days per Trip")}</label>
            <div className="relative">
              <select
                className="input-primary appearance-none cursor-pointer"
                {...register("numberOfDaysPerTrip", {
                  required:
                    policyType === "Multi-Trip Annual"
                      ? t("Number of days per trip is required")
                      : false,
                  valueAsNumber: true,
                })}
              >
                <option value={0}>{t("Please select...")}</option>
                <option value={5}>{t("5 days")}</option>
                <option value={10}>{t("10 days")}</option>
                <option value={20}>{t("20 days")}</option>
                <option value={35}>{t("35 days")}</option>
                <option value={50}>{t("50 days")}</option>
                <option value={65}>{t("65 days")}</option>
                <option value={100}>{t("100 days")}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
            {errors.numberOfDaysPerTrip && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numberOfDaysPerTrip.message}
              </p>
            )}
          </div>
        )}

        {/* Destination Country */}
        <div className="flex flex-col">
          <label className="flex items-center text-sm">
            {t("Destination Country")}
            <InformationCircleIcon
              onClick={() => setDisplayInfoDestinationCountry((prev) => !prev)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer ml-1"
              aria-hidden="true"
            />
          </label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              {...register("destinationCountry", {
                required: t("Destination Country is required"),
              })}
            >
              <option value="">Please select</option>
              <option value="Afghanistan">Afghanistan</option>
              <option value="Åland Islands">Åland Islands</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="American Samoa">American Samoa</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Anguilla">Anguilla</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Aruba">Aruba</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bermuda">Bermuda</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
              <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
              <option value="Botswana">Botswana</option>
              <option value="Bouvet Island">Bouvet Island</option>
              <option value="Brazil">Brazil</option>
              <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
              <option value="British Virgin Islands">British Virgin Islands</option>
              <option value="Brunei">Brunei</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Burundi">Burundi</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Cape Verde">Cape Verde</option>
              <option value="Cayman Islands">Cayman Islands</option>
              <option value="Central African Republic">Central African Republic</option>
              <option value="Chad">Chad</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Christmas Island">Christmas Island</option>
              <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Cook Islands">Cook Islands</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Croatia">Croatia</option>
              <option value="Curaçao">Curaçao</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="DR Congo">DR Congo</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Falkland Islands">Falkland Islands</option>
              <option value="Faroe Islands">Faroe Islands</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="French Guiana">French Guiana</option>
              <option value="French Polynesia">French Polynesia</option>
              <option value="French Southern and Antarctic Lands">French Southern and Antarctic Lands</option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Gibraltar">Gibraltar</option>
              <option value="Greece">Greece</option>
              <option value="Greenland">Greenland</option>
              <option value="Grenada">Grenada</option>
              <option value="Guadeloupe">Guadeloupe</option>
              <option value="Guam">Guam</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guernsey">Guernsey</option>
              <option value="Guinea">Guinea</option>
              <option value="Guinea-Bissau">Guinea-Bissau</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>
              <option value="Honduras">Honduras</option>
              <option value="Hong Kong">Hong Kong</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="India">India</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Isle of Man">Isle of Man</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Ivory Coast">Ivory Coast</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jersey">Jersey</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Kosovo">Kosovo</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Laos">Laos</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libya">Libya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Macau">Macau</option>
              <option value="Macedonia">Macedonia</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malawi">Malawi</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Marshall Islands">Marshall Islands</option>
              <option value="Martinique">Martinique</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mayotte">Mayotte</option>
              <option value="Mexico">Mexico</option>
              <option value="Micronesia">Micronesia</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Namibia">Namibia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherlands">Netherlands</option>
              <option value="New Caledonia">New Caledonia</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Niue">Niue</option>
              <option value="Norfolk Island">Norfolk Island</option>
              <option value="Northern Mariana Islands">Northern Mariana Islands</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau">Palau</option>
              <option value="Palestine">Palestine</option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Philippines">Philippines</option>
              <option value="Pitcairn Islands">Pitcairn Islands</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Puerto Rico">Puerto Rico</option>
              <option value="Qatar">Qatar</option>
              <option value="Republic of the Congo">Republic of the Congo</option>
              <option value="Réunion">Réunion</option>
              <option value="Romania">Romania</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Saint Barthélemy">Saint Barthélemy</option>
              <option value="Saint Helena">Saint Helena</option>
              <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
              <option value="Saint Lucia">Saint Lucia</option>
              <option value="Saint Martin">Saint Martin</option>
              <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
              <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
              <option value="Samoa">Samoa</option>
              <option value="San Marino">San Marino</option>
              <option value="São Tomé and Príncipe">São Tomé and Príncipe</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Sint Maarten">Sint Maarten</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="South Georgia">South Georgia</option>
              <option value="South Korea">South Korea</option>
              <option value="South Sudan">South Sudan</option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Suriname">Suriname</option>
              <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
              <option value="Swaziland">Swaziland</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Thailand">Thailand</option>
              <option value="Timor-Leste">Timor-Leste</option>
              <option value="Togo">Togo</option>
              <option value="Tokelau">Tokelau</option>
              <option value="Tonga">Tonga</option>
              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
              <option value="United States Virgin Islands">United States Virgin Islands</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Vatican City">Vatican City</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Wallis and Futuna">Wallis and Futuna</option>
              <option value="Western Sahara">Western Sahara</option>
              <option value="Yemen">Yemen</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          {errors.destinationCountry && (
            <p className="text-red-500 text-sm mt-1">
              {errors.destinationCountry.message}
            </p>
          )}
        </div>
      </div>

      {displayInfoDestinationCountry && (
        <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
          <button
            className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
            onClick={() => setDisplayInfoDestinationCountry(false)}
          >
            {t("close")}
          </button>
          <h2 className="text-center text-primary font-semibold">
            {t("Destination")}
          </h2>
          <p className="text-sm text-text-secondary mt-2">
            {t(
              "Select the primary destination country for your trip. Select Canada only if you are travelling outside your home province, but within Canada for your entire trip.",
            )}
          </p>
        </div>
      )}

      {/* Traveling Through US */}
      <div className="mt-6 flex flex-col text-text-secondary">
        <label>{t("Are you travelling through the US?")}</label>
        <div className="flex gap-10">
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              value="yes"
              className="form-radio accent-primary cursor-pointer"
              {...register("travelingThroughUS", {
                required: t("Please select if travelling through US"),
              })}
            />
            <span>{t("Yes")}</span>
          </label>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              value="no"
              className="form-radio accent-primary cursor-pointer"
              {...register("travelingThroughUS", {
                required: t("Please select if travelling through US"),
              })}
            />
            <span>{t("No")}</span>
          </label>
        </div>
        {errors.travelingThroughUS && (
          <p className="text-red-500 text-sm mt-1">
            {errors.travelingThroughUS.message}
          </p>
        )}
      </div>

      {travelingThroughUS === "yes" && (
        <div className="mt-4 flex flex-col text-text-secondary">
          <label className="text-sm">
            {t("Number of Travel Days in the US")}
          </label>
          <input
            type="number"
            className="input-primary"
            placeholder={t("Enter number of days")}
            {...register("usTravelDays", {
              required:
                travelingThroughUS === "yes"
                  ? t("Number of US travel days is required")
                  : false,
              valueAsNumber: true,
              min: {
                value: 1,
                message: t("Must be at least 1 day"),
              },
              validate: (value) => {
                const val = Number(value);
                if (
                  travelingThroughUS === "yes" &&
                  !isNaN(val) &&
                  val > coverageLength
                ) {
                  return t(
                    "US travel days cannot exceed the total coverage length.",
                  );
                }
                return true;
              },
            })}
          />
          {errors.usTravelDays && (
            <p className="text-red-500 text-sm mt-1">
              {errors.usTravelDays.message}
            </p>
          )}
        </div>
      )}

      {/* Deductible */}
      <div className="mt-6 flex flex-col">
        <label className="flex items-center text-sm text-text-secondary">
          {t("Deductible")}
          <InformationCircleIcon
            onClick={() => setDisplayInfoDeductible((prev) => !prev)}
            className="h-5 w-5 text-[#3a17c5] cursor-pointer ml-1"
            aria-hidden="true"
          />
        </label>
        <div className="relative">
          <select
            className="input-primary appearance-none cursor-pointer"
            {...register("deductible", {
              required: t("Deductible is required"),
              valueAsNumber: true,
            })}
          >
            <option value="">{t("Please select...")}</option>
            <option value={0}>$0.00 CAD</option>
            <option value={250}>$250.00 CAD</option>
            <option value={500}>$500.00 CAD</option>
            <option value={1000}>$1,000.00 CAD</option>
            <option value={5000}>$5,000.00 CAD</option>
            <option value={10000}>$10,000.00 CAD</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        {errors.deductible && (
          <p className="text-red-500 text-sm mt-1">
            {errors.deductible.message}
          </p>
        )}
      </div>

      {displayInfoDeductible && (
        <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
          <h2 className="text-lg font-semibold border-b border-[#c2c2c2] pb-2">
            {t("Deductible")}
          </h2>
          <button
            className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
            onClick={() => setDisplayInfoDeductible(false)}
          >
            {t("close")}
          </button>
          <p className="text-sm text-gray-600 mt-2">
            {t(
              "Deductible means the amount (if applicable), in Canadian dollars, which the insured must pay before any remaining eligible expenses are reimbursed under this policy.",
            )}
          </p>

          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-700 text-center">
              {t("Deductible Discounts")}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 mt-2 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-2 text-left">
                      {t("Deductible Option")}
                    </th>
                    <th className="border border-gray-300 p-2 text-left">
                      {t("Discount")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { option: "$0", discount: t("No discount") },
                    { option: "$250", discount: "9%" },
                    { option: "$500", discount: "14%" },
                    { option: "$1,000", discount: "18%" },
                    { option: "$5,000", discount: "35%" },
                    { option: "$10,000", discount: "45%" },
                  ].map(({ option, discount }, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 p-2">{option}</td>
                      <td className="border border-gray-300 p-2">{discount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Save Quote Button */}
      {quoteNumber && !isDirty ? (
        <div className="flex flex-col justify-center items-center mt-4 text-xl font-bold text-red-600">
          <span>{t("Quote Saved:")} </span>
          <span>{quoteNumber}</span>

          <button
            type="button"
            className="text-[#2b00b7] cursor-pointer text-base hover:underline underline-offset-2 mt-2"
            onClick={() => setIsEmailModalOpen(true)}
          >
            {t("Email Quote")}
          </button>
        </div>
      ) : (
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={async () => {
              const success = await handleSaveQuote();
              if (success) {
                // Reset form to current values to clear isDirty
                reset(getValues());
              }
            }}
            disabled={saving}
            className={`text-base hover:underline underline-offset-2 cursor-pointer text-primary mt-2 ${saving ? "opacity-50" : ""
              }`}
          >
            {saving ? t("Saving...") : t("Save Quote")}
          </button>
        </div>
      )}
      {isEmailModalOpen && (
        <EmailQuoteMedical
          quoteNumber={quoteNumber}
          premiumBreakdown={premiumBreakdown}
          setIsEmailModalOpen={setIsEmailModalOpen}
        />
      )}
    </div>
  );
}
