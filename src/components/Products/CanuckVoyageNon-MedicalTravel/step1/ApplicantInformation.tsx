// import {
//   ChevronDownIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";
// import { useState } from "react";

// interface ApplicantInformationProps {
//   displayInfoApplicantConfirm: boolean;
//   setDisplayInfoApplicantConfirm: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function ApplicantInformation({
//   displayInfoApplicantConfirm,
//   setDisplayInfoApplicantConfirm,
// }: ApplicantInformationProps) {
//   const [displayInfoCountryOfOrigin, setDisplayInfoCountryOfOrigin] =
//     useState(false);

//   return (
//     <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
//       <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
//         Applicant Information
//       </h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
//         <div className="flex flex-col">
//           <label className="text-sm">First Name</label>
//           <input
//             className="input-primary"
//             type="text"
//             placeholder="Enter First Name"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Last Name</label>
//           <input
//             className="input-primary"
//             type="text"
//             placeholder="Enter Last Name"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Date of Birth</label>
//           <input className="input-primary" type="date" />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Email</label>
//           <input
//             className="input-primary"
//             type="email"
//             placeholder="Enter Email"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="flex items-center text-sm">
//             <InformationCircleIcon
//               onClick={() =>
//                 setDisplayInfoCountryOfOrigin((prevState) => !prevState)
//               }
//               className="h-5 w-5 text-[#3a17c5] cursor-pointer"
//               aria-hidden="true"
//             />
//             Country of Origin
//           </label>
//           <div className="relative">
//             <select className="input-primary appearance-none cursor-pointer">
//               <option value="">Please select...</option>
//               <option value="AF">Afghanistan</option>
//               <option value="AX">Åland Islands</option>
//               <option value="AL">Albania</option>
//               <option value="DZ">Algeria</option>
//               <option value="AS">American Samoa</option>
//               <option value="AD">Andorra</option>
//               <option value="AO">Angola</option>
//               <option value="AI">Anguilla</option>
//               <option value="AQ">Antarctica</option>
//               <option value="AG">Antigua and Barbuda</option>
//               <option value="AR">Argentina</option>
//               <option value="AM">Armenia</option>
//               <option value="AW">Aruba</option>
//               <option value="AU">Australia</option>
//               <option value="AT">Austria</option>
//               <option value="AZ">Azerbaijan</option>
//               <option value="BS">Bahamas</option>
//               <option value="BH">Bahrain</option>
//               <option value="BD">Bangladesh</option>
//               <option value="BB">Barbados</option>
//               <option value="BY">Belarus</option>
//               <option value="BE">Belgium</option>
//               <option value="BZ">Belize</option>
//               <option value="BJ">Benin</option>
//               <option value="BM">Bermuda</option>
//               <option value="BT">Bhutan</option>
//               <option value="BO">Bolivia</option>
//               <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
//               <option value="BA">Bosnia and Herzegovina</option>
//               <option value="BW">Botswana</option>
//               <option value="BV">Bouvet Island</option>
//               <option value="BR">Brazil</option>
//               <option value="IO">British Indian Ocean Territory</option>
//               <option value="VG">British Virgin Islands</option>
//               <option value="BN">Brunei</option>
//               <option value="BG">Bulgaria</option>
//               <option value="BF">Burkina Faso</option>
//               <option value="BI">Burundi</option>
//               <option value="KH">Cambodia</option>
//               <option value="CM">Cameroon</option>
//               <option value="CA">Canada</option>
//               <option value="CV">Cape Verde</option>
//               <option value="KY">Cayman Islands</option>
//               <option value="CF">Central African Republic</option>
//               <option value="TD">Chad</option>
//               <option value="CL">Chile</option>
//               <option value="CN">China</option>
//               <option value="CX">Christmas Island</option>
//               <option value="CC">Cocos (Keeling) Islands</option>
//               <option value="CO">Colombia</option>
//               <option value="KM">Comoros</option>
//               <option value="CK">Cook Islands</option>
//               <option value="CR">Costa Rica</option>
//               <option value="HR">Croatia</option>
//               <option value="CW">Curaçao</option>
//               <option value="CY">Cyprus</option>
//               <option value="CZ">Czech Republic</option>
//               <option value="DK">Denmark</option>
//               <option value="DJ">Djibouti</option>
//               <option value="DM">Dominica</option>
//               <option value="DO">Dominican Republic</option>
//               <option value="CD">DR Congo</option>
//               <option value="EC">Ecuador</option>
//               <option value="EG">Egypt</option>
//               <option value="SV">El Salvador</option>
//               <option value="GQ">Equatorial Guinea</option>
//               <option value="ER">Eritrea</option>
//               <option value="EE">Estonia</option>
//               <option value="ET">Ethiopia</option>
//               <option value="FK">Falkland Islands</option>
//               <option value="FO">Faroe Islands</option>
//               <option value="FJ">Fiji</option>
//               <option value="FI">Finland</option>
//               <option value="FR">France</option>
//               <option value="GF">French Guiana</option>
//               <option value="PF">French Polynesia</option>
//               <option value="TF">French Southern and Antarctic Lands</option>
//               <option value="GA">Gabon</option>
//               <option value="GM">Gambia</option>
//               <option value="GE">Georgia</option>
//               <option value="DE">Germany</option>
//               <option value="GH">Ghana</option>
//               <option value="GI">Gibraltar</option>
//               <option value="GR">Greece</option>
//               <option value="GL">Greenland</option>
//               <option value="GD">Grenada</option>
//               <option value="GP">Guadeloupe</option>
//               <option value="GU">Guam</option>
//               <option value="GT">Guatemala</option>
//               <option value="GG">Guernsey</option>
//               <option value="GN">Guinea</option>
//               <option value="GW">Guinea-Bissau</option>
//               <option value="GY">Guyana</option>
//               <option value="HT">Haiti</option>
//               <option value="HM">Heard Island and McDonald Islands</option>
//               <option value="HN">Honduras</option>
//               <option value="HK">Hong Kong</option>
//               <option value="HU">Hungary</option>
//               <option value="IS">Iceland</option>
//               <option value="IN">India</option>
//               <option value="ID">Indonesia</option>
//               <option value="IQ">Iraq</option>
//               <option value="IE">Ireland</option>
//               <option value="IM">Isle of Man</option>
//               <option value="IL">Israel</option>
//               <option value="IT">Italy</option>
//               <option value="CI">Ivory Coast</option>
//               <option value="JM">Jamaica</option>
//               <option value="JP">Japan</option>
//               <option value="JE">Jersey</option>
//               <option value="JO">Jordan</option>
//               <option value="KZ">Kazakhstan</option>
//               <option value="KE">Kenya</option>
//               <option value="KI">Kiribati</option>
//               <option value="XK">Kosovo</option>
//               <option value="KW">Kuwait</option>
//               <option value="KG">Kyrgyzstan</option>
//               <option value="LA">Laos</option>
//               <option value="LV">Latvia</option>
//               <option value="LB">Lebanon</option>
//               <option value="LS">Lesotho</option>
//               <option value="LR">Liberia</option>
//               <option value="LY">Libya</option>
//               <option value="LI">Liechtenstein</option>
//               <option value="LT">Lithuania</option>
//               <option value="LU">Luxembourg</option>
//               <option value="MO">Macau</option>
//               <option value="MK">Macedonia</option>
//               <option value="MG">Madagascar</option>
//               <option value="MW">Malawi</option>
//               <option value="MY">Malaysia</option>
//               <option value="MV">Maldives</option>
//               <option value="ML">Mali</option>
//               <option value="MT">Malta</option>
//               <option value="MH">Marshall Islands</option>
//               <option value="MQ">Martinique</option>
//               <option value="MR">Mauritania</option>
//               <option value="MU">Mauritius</option>
//               <option value="YT">Mayotte</option>
//               <option value="MX">Mexico</option>
//               <option value="FM">Micronesia</option>
//               <option value="MD">Moldova</option>
//               <option value="MC">Monaco</option>
//               <option value="MN">Mongolia</option>
//               <option value="ME">Montenegro</option>
//               <option value="MS">Montserrat</option>
//               <option value="MA">Morocco</option>
//               <option value="MZ">Mozambique</option>
//               <option value="MM">Myanmar</option>
//               <option value="NA">Namibia</option>
//               <option value="NR">Nauru</option>
//               <option value="NP">Nepal</option>
//               <option value="NL">Netherlands</option>
//               <option value="NC">New Caledonia</option>
//               <option value="NZ">New Zealand</option>
//               <option value="NI">Nicaragua</option>
//               <option value="NE">Niger</option>
//               <option value="NG">Nigeria</option>
//               <option value="NU">Niue</option>
//               <option value="NF">Norfolk Island</option>
//               <option value="MP">Northern Mariana Islands</option>
//               <option value="NO">Norway</option>
//               <option value="OM">Oman</option>
//               <option value="PK">Pakistan</option>
//               <option value="PW">Palau</option>
//               <option value="PS">Palestine</option>
//               <option value="PA">Panama</option>
//               <option value="PG">Papua New Guinea</option>
//               <option value="PY">Paraguay</option>
//               <option value="PE">Peru</option>
//               <option value="PH">Philippines</option>
//               <option value="PN">Pitcairn Islands</option>
//               <option value="PL">Poland</option>
//               <option value="PT">Portugal</option>
//               <option value="PR">Puerto Rico</option>
//               <option value="QA">Qatar</option>
//               <option value="CG">Republic of the Congo</option>
//               <option value="RE">Réunion</option>
//               <option value="RO">Romania</option>
//               <option value="RW">Rwanda</option>
//               <option value="BL">Saint Barthélemy</option>
//               <option value="SH">Saint Helena</option>
//               <option value="KN">Saint Kitts and Nevis</option>
//               <option value="LC">Saint Lucia</option>
//               <option value="MF">Saint Martin</option>
//               <option value="PM">Saint Pierre and Miquelon</option>
//               <option value="VC">Saint Vincent and the Grenadines</option>
//               <option value="WS">Samoa</option>
//               <option value="SM">San Marino</option>
//               <option value="ST">São Tomé and Príncipe</option>
//               <option value="SA">Saudi Arabia</option>
//               <option value="SN">Senegal</option>
//               <option value="RS">Serbia</option>
//               <option value="SC">Seychelles</option>
//               <option value="SL">Sierra Leone</option>
//               <option value="SG">Singapore</option>
//               <option value="SX">Sint Maarten</option>
//               <option value="SK">Slovakia</option>
//               <option value="SI">Slovenia</option>
//               <option value="SB">Solomon Islands</option>
//               <option value="SO">Somalia</option>
//               <option value="ZA">South Africa</option>
//               <option value="GS">South Georgia</option>
//               <option value="KR">South Korea</option>
//               <option value="SS">South Sudan</option>
//               <option value="ES">Spain</option>
//               <option value="LK">Sri Lanka</option>
//               <option value="SR">Suriname</option>
//               <option value="SJ">Svalbard and Jan Mayen</option>
//               <option value="SZ">Swaziland</option>
//               <option value="SE">Sweden</option>
//               <option value="CH">Switzerland</option>
//               <option value="TW">Taiwan</option>
//               <option value="TJ">Tajikistan</option>
//               <option value="TZ">Tanzania</option>
//               <option value="TH">Thailand</option>
//               <option value="TL">Timor-Leste</option>
//               <option value="TG">Togo</option>
//               <option value="TK">Tokelau</option>
//               <option value="TO">Tonga</option>
//               <option value="TT">Trinidad and Tobago</option>
//               <option value="TN">Tunisia</option>
//               <option value="TR">Turkey</option>
//               <option value="TM">Turkmenistan</option>
//               <option value="TC">Turks and Caicos Islands</option>
//               <option value="TV">Tuvalu</option>
//               <option value="UG">Uganda</option>
//               <option value="AE">United Arab Emirates</option>
//               <option value="GB">United Kingdom</option>
//               <option value="US">United States</option>
//               <option value="UM">United States Minor Outlying Islands</option>
//               <option value="VI">United States Virgin Islands</option>
//               <option value="UY">Uruguay</option>
//               <option value="UZ">Uzbekistan</option>
//               <option value="VU">Vanuatu</option>
//               <option value="VA">Vatican City</option>
//               <option value="VE">Venezuela</option>
//               <option value="VN">Vietnam</option>
//               <option value="WF">Wallis and Futuna</option>
//               <option value="EH">Western Sahara</option>
//               <option value="YE">Yemen</option>
//               <option value="ZM">Zambia</option>
//               <option value="ZW">Zimbabwe</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
//               <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
//             </div>
//           </div>
//         </div>
//         {displayInfoCountryOfOrigin && (
//           <div className="border border-inputBorder shadow-sm p-4 bg-white col-span-2 relative">
//             <button
//             className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
//             onClick={() => setDisplayInfoCountryOfOrigin(false)}
//           >
//             close
//           </button>
//             <div className="border-b border-inputBorder pb-2 text-lg font-semibold">
//               Country of Origin
//             </div>
//             <div className="pt-2 text-text-secondary">
//               <strong className="font-bold">Country of Origin</strong> means the
//               country for which the insured person holds a passport. Where the
//               insured person holds more than one passport, the country of origin
//               will be taken to mean the country that the insured person has
//               declared on the application.
//             </div>
//           </div>
//         )}
//         <div className="flex flex-col">
//           <label className="text-sm">Province/State of Residence</label>
//           <input
//             className="input-primary"
//             type="text"
//             placeholder="Province/State of Residence"
//           />
//         </div>
//         <div className="flex flex-col">
//           <label className="text-sm">Number of Additional Applicants</label>
//           <div className="relative">
//           <select className="input-primary appearance-none cursor-pointer">
//             <option>0</option>
//             <option>1</option>
//             <option>2</option>
//             <option>3</option>
//             <option>4</option>
//             <option>5</option>
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
//             <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
//           </div>
//         </div>
//         </div>
//       </div>

//       <div className="mt-6 flex justify-start items-center gap-1">
//         <InformationCircleIcon
//           onClick={() =>
//             setDisplayInfoApplicantConfirm((prevState) => !prevState)
//           }
//           className="h-5 w-5 text-[#3a17c5] cursor-pointer"
//           aria-hidden="true"
//         />
//         <input type="checkbox" className="accent-primary cursor-pointer" />
//         <span className="font-semibold font-[inter] text-[#2B00B7]">
//           Confirm that all applicants are eligible for this insurance
//         </span>
//       </div>

//       {displayInfoApplicantConfirm && (
//         <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
//           <button
//             className="text-primary underline absolute top-2 right-2 cursor-pointer"
//             onClick={() => setDisplayInfoApplicantConfirm(false)}
//           >
//             close
//           </button>
//           <div className="border-b border-[#c2c2c2] pb-2 text-lg font-semibold">Eligibility</div>
//           <p className="text-[#3a17c5] font-semibold text-center mt-2">
//             To be eligible for coverage, on the effective date, you must:
//           </p>
//           <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-2">
//             <li>
//               Be at least 15 days of age and less than 86 years of age traveling
//               for no more than 90 days; and
//             </li>
//             <li>
//               Be a member in good standing of an association or organization, or
//               a client of a tour operator, that has agreed to participate in
//               this insurance plan, or be the spouse or dependent child of a
//               member insured under the same policy; and
//             </li>
//             <li>
//               Purchase coverage within 10 days of the initial deposit for your
//               trip or prior to any cancellation penalties being applicable; and
//             </li>
//             <li>
//               Purchase coverage for the full value of the non-refundable,
//               pre-paid travel arrangements; and
//             </li>
//             <li>Purchase coverage for the entire duration of your trip; and</li>
//             <li>
//               For traveling Canadians, purchase coverage prior to the date of
//               departure from your province or territory of residence or Canada
//               or; for visitors to Canada, purchase coverage prior to the date of
//               departure from your home country; and
//             </li>
//             <li>
//               Know of no reason that you, an immediate family member, a travel
//               companion, a travel companion’s immediate family member, or
//               business partner would be unable to start or complete the trip as
//               booked.
//             </li>
//           </ol>
//         </div>
//       )}
//     </div>
//   );
// }

// ==============================================================

import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Controller, UseFormReturn } from "react-hook-form";
import { useLanguage } from "../../../../context/LanguageContext";
import { Step1Payload } from "../RIMICanuckVoyageNon-MedicalTravel";
import DatePicker from "../../../DatePicker";
import ConfirmEligibilityNonMedical from "./ConfirmEligibilityNonMedical";
import { NonMedTravelCountries } from "../../SecureTravelRIMIVisitorstoCanadaTravel/step1/Constants";
import { latestAllowedDob, validateDob } from "../../../../utils/dobRules";

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  gender: string;
}

interface ApplicantInformationProps {
  methods: UseFormReturn<Step1Payload>;
}

export default function ApplicantInformation({
  methods,
}: ApplicantInformationProps) {
  const { t } = useLanguage();
  const {
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  // Watch form values
  const formValues = watch();
  // const { applicantNumber, applicants, isConfirmed } = formValues;
  const { applicantNumber, applicants, primaryDateOfBirth, primaryFirstName, primaryLastName, primaryEmail, primaryApplicantGender, isConfirmed } = formValues;


  

  const [displayInfoCountryOfOrigin, setDisplayInfoCountryOfOrigin] =
    useState(false);
  const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] =
    useState(false);
  const [showConfirmEligibility, setShowConfirmEligibility] = useState(false);
  const setIsConfirmed = (value: boolean) => {
    setValue("isConfirmed", value, { shouldValidate: true, shouldDirty: true });
  };

   const allApplicantDataFilled = useMemo(() => {
    const primaryFilled = !!(primaryFirstName && primaryLastName && primaryDateOfBirth && primaryEmail && primaryApplicantGender );

    const additionalFilled = (applicants || [])
      .slice(0, applicantNumber || 0)
      .every((a) => !!(a.firstName && a.lastName && a.dob && a.gender && a.relationship));

    return primaryFilled && additionalFilled;
  }, [primaryFirstName, primaryLastName, primaryDateOfBirth, primaryEmail, primaryApplicantGender, isConfirmed, applicants, applicantNumber]);



  // Resize applicants array when number changes
  useEffect(() => {
    const currentApplicants = applicants || [];
    const newApplicants: Applicant[] = Array.from(
      { length: applicantNumber || 0 },
      (_, i) =>
        currentApplicants[i] ?? {
          index: String(i),
          firstName: "",
          lastName: "",
          dob: "",
          relationship: "",
          gender: "",
        }
    );
    setValue("applicants", newApplicants);
  }, [applicantNumber, setValue]);

  const handleCheckboxChange = () => {
    if (isConfirmed) {
      return setValue("isConfirmed", false, { shouldValidate: true, shouldDirty: true });
    }
    if (!isConfirmed) {
      setShowConfirmEligibility(true);
      // setValue("isConfirmed", true);
    }
    // if they try to check before even opening, auto-open for them
    if (!displayInfoApplicantConfirm) {
      setDisplayInfoApplicantConfirm(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-4 p-3 sm:p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        {t("Applicant Information")}
      </h3>

      {/* Primary Applicant */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        {/* First Name */}
        <div className="flex flex-col">
          <label className="text-sm">{t("First Name")}</label>
          <input
            className="input-primary"
            type="text"
            placeholder={t("Enter First Name")}
            {...register("primaryFirstName", {
              setValueAs: (value: any) => value?.trim() || "",
              required: t("First Name is required"),
              maxLength: {
                value: 60,
                message: t("First Name cannot exceed 60 characters"),
              },
            })}
          />
          {errors.primaryFirstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.primaryFirstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-sm">{t("Last Name")}</label>
          <input
            className="input-primary"
            type="text"
            placeholder={t("Enter Last Name")}
            {...register("primaryLastName", {
              setValueAs: (value: any) => value?.trim() || "",
              required: t("Last Name is required"),
              maxLength: {
                value: 60,
                message: t("Last Name cannot exceed 60 characters"),
              },
            })}
          />
          {errors.primaryLastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.primaryLastName.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col">
          <Controller
            name="primaryDateOfBirth"
            control={control}
            rules={{ 
              required: t("Date of Birth is required"),
              validate: (value) => {
                if (!value) return true;
                const dobDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const dobCheck = validateDob(value, t);
                if (dobCheck !== true) return dobCheck;

                const effectiveDate = methods.getValues("effectiveDate");
                if (!effectiveDate) return true;
                
                const effDate = new Date(effectiveDate);
                
                const ageDiffMs = effDate.getTime() - dobDate.getTime();
                const ageDate = new Date(ageDiffMs);
                const years = Math.abs(ageDate.getUTCFullYear() - 1970);
                const days = Math.floor(ageDiffMs / (1000 * 60 * 60 * 24));
                
                if (days < 15 || years >= 86) {
                  return t("Age must be at least 15 days and less than 86 years according to the effective date.");
                }
                return true;
              }
            }}
            render={({ field }) => (
              <div className="flex flex-col">
                <DatePicker
                  label={t("Date of Birth")}
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  maxDate={latestAllowedDob(watch("effectiveDate"))}
                />
                {errors.primaryDateOfBirth && (
                  <p className="text-red-500 text-sm">
                    {errors.primaryDateOfBirth.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm">{t("Email")}</label>
          <input
            className="input-primary"
            type="email"
            placeholder={t("Enter Email Address")}
            {...register("primaryEmail", {
              setValueAs: (value: any) => value?.trim()?.toLowerCase() || "",
              required: t("Email is required"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("Invalid email address"),
              },
            })}
          />
          {errors.primaryEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.primaryEmail.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-sm">{t("Gender")}</label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              {...register("primaryApplicantGender", {
                required: t("Gender is required"),
              })}
            >
              <option value="">{t("Please select")}</option>
              <option value="Female">{t("Female")}</option>
              <option value="Male">{t("Male")}</option>
              <option value="Non-Binary">{t("Non-Binary")}</option>
              <option value="Undeclared">{t("Undeclared")}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          {errors.primaryApplicantGender && (
            <p className="text-red-500 text-sm mt-1">
              {errors.primaryApplicantGender.message}
            </p>
          )}
        </div>

        {/* Country of Origin */}
        <div className="flex flex-col">
          <label className="flex items-center text-sm">
            <InformationCircleIcon
              onClick={() => setDisplayInfoCountryOfOrigin((prev) => !prev)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer mr-1"
              aria-hidden="true"
            />
            {t("Country of Origin")}
          </label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              {...register("countryOfOrigin", {
                required: t("Country of Origin is required"),
              })}
            >
             {NonMedTravelCountries.map((country) => (
              <option key={country.value} value={country.value}>
                {t(country.label)}
              </option>
            ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          {errors.countryOfOrigin && (
            <p className="text-red-500 text-sm mt-1">
              {errors.countryOfOrigin.message}
            </p>
          )}
        </div>

        {displayInfoCountryOfOrigin && (
          <div className="col-span-2 border border-inputBorder shadow-sm p-4 bg-white relative">
            <button
              className="text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
              onClick={() => setDisplayInfoCountryOfOrigin(false)}
            >
              {t("close")}
            </button>
            <div className="border-b border-inputBorder pb-2 text-lg font-semibold">
              {t("Country of Origin")}
            </div>
            <div className="pt-2 text-text-secondary">
              <strong className="font-bold">{t("Country of Origin")}</strong> {t("means the country for which the insured person holds a passport. Where the insured person holds more than one passport, the country of origin will be taken to mean the country that the insured person has declared on the application.")}
            </div>
          </div>
        )}

        {/* Province/State of Residence */}
        <div className="flex flex-col">
          <label className="text-sm">{t("Province/State of Residence")}</label>
          <input
            className="input-primary"
            type="text"
            placeholder={t("Province/State of Residence")}
            {...register("provinceStateResidence", {
              setValueAs: (value: any) => value?.trim() || "",
              required: t("Province/State is required"),
              maxLength: {
                value: 60,
                message: t("Province/State cannot exceed 60 characters"),
              },
            })}
          />
          {errors.provinceStateResidence && (
            <p className="text-red-500 text-sm mt-1">
              {errors.provinceStateResidence.message}
            </p>
          )}
        </div>

        {/* Number of Additional Applicants */}
        <div className="flex flex-col">
          <label className="text-sm">{t("Number of Additional Applicants")}</label>
          <div className="relative">
            <select
              className="input-primary appearance-none cursor-pointer"
              {...register("applicantNumber", {
                valueAsNumber: true,
              })}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Applicants */}
      {Array.from({ length: applicantNumber || 0 }).map((_, idx) => (
        <React.Fragment key={idx}>
          <h1 className="text-md font-semibold text-left text-[#1B1B1B] mt-5 mb-3 text-nowrap">
            {t("APPLICANT")} {idx + 1}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
            <div className="flex flex-col">
              <label className="text-sm">{t("First Name")}</label>
              <input
                className="input-primary"
                type="text"
                placeholder={t("Enter First Name")}
                {...register(`applicants.${idx}.firstName`, {
                  setValueAs: (value: any) => value?.trim() || "",
                  required: t("First Name is required"),
                  maxLength: {
                    value: 60,
                    message: t("First Name cannot exceed 60 characters"),
                  },
                })}
              />
              {errors.applicants?.[idx]?.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicants[idx].firstName!.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm">{t("Last Name")}</label>
              <input
                className="input-primary"
                type="text"
                placeholder={t("Enter Last Name")}
                {...register(`applicants.${idx}.lastName`, {
                  setValueAs: (value: any) => value?.trim() || "",
                  required: t("Last Name is required"),
                  maxLength: {
                    value: 60,
                    message: t("Last Name cannot exceed 60 characters"),
                  },
                })}
              />
              {errors.applicants?.[idx]?.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicants[idx].lastName!.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Controller
                name={`applicants.${idx}.dob`}
                control={control}
                rules={{ 
                  required: t("Date of Birth is required"),
                  validate: (value) => {
                    if (!value) return true;
                    const dobDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const dobCheck = validateDob(value, t);
                    if (dobCheck !== true) return dobCheck;

                    const effectiveDate = methods.getValues("effectiveDate");
                    if (!effectiveDate) return true;
                    
                    const effDate = new Date(effectiveDate);
                    
                    const ageDiffMs = effDate.getTime() - dobDate.getTime();
                    const ageDate = new Date(ageDiffMs);
                    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
                    const days = Math.floor(ageDiffMs / (1000 * 60 * 60 * 24));
                    
                    if (days < 15 || years >= 86) {
                      return t("Age must be at least 15 days and less than 86 years according to the effective date.");
                    }
                    return true;
                  }
                }}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <DatePicker
                      label={t("Date of Birth")}
                      value={field.value}
                      onChange={(date: Date) => {
                        field.onChange(date);
                      }}
                      maxDate={latestAllowedDob(watch("effectiveDate"))}
                    />
                    {errors.applicants?.[idx]?.dob && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.applicants[idx].dob!.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">{t("Gender")}</label>
              <div className="relative">
                <select
                  className="input-primary appearance-none cursor-pointer"
                  {...register(`applicants.${idx}.gender`, {
                    required: t("Gender is required"),
                  })}
                >
                  <option value="">{t("Please select")}</option>
                  <option value="Female">{t("Female")}</option>
                  <option value="Male">{t("Male")}</option>
                  <option value="Non-Binary">{t("Non-Binary")}</option>
                  <option value="Undeclared">{t("Undeclared")}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              {errors.applicants?.[idx]?.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicants[idx].gender!.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm">
                {t("Relationship to Primary Applicant")}
              </label>
              <div className="relative">
                <select
                  className="input-primary appearance-none cursor-pointer"
                  {...register(`applicants.${idx}.relationship`, {
                    required: t("Relationship is required"),
                  })}
                >
                  <option value="">{t("Please select")}</option>
                  <option value="Spouse">{t("Spouse")}</option>
                  <option value="Dependent Child">{t("Dependent Child")}</option>
                  <option value="Travelling Companion">
                    {t("Travelling Companion")}
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
              {errors.applicants?.[idx]?.relationship && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicants[idx].relationship!.message}
                </p>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}

      {/* Eligibility Confirmation */}
      <div className="w-full">
        <div className="mt-6 flex items-center justify-center gap-1">
          <InformationCircleIcon
            onClick={() => setDisplayInfoApplicantConfirm((prev) => !prev)}
            className="h-5 w-5 text-[#3a17c5] cursor-pointer"
            aria-hidden="true"
          />
          <input
            type="checkbox"
            className="accent-primary cursor-pointer"
            {...register("isConfirmed", {
              required: t("You must confirm that all applicants are eligible"),
            })}
            checked={isConfirmed || false}
            onChange={handleCheckboxChange}
          />
          <span className="font-semibold font-[inter] text-[#2B00B7] text-sm">
            {t("Confirm that all applicants are eligible for this insurance")}
          </span>
        </div>
        {errors.isConfirmed && (
          <p className="text-red-500 text-sm mt-1 text-center font-[inter]">
            {errors.isConfirmed!.message}
          </p>
        )}

        {displayInfoApplicantConfirm && (
          <div className="border border-inputBorder shadow-sm p-4 mt-4 bg-white relative">
            <button
              className="text-primary underline absolute top-2 right-2 cursor-pointer"
              onClick={() => setDisplayInfoApplicantConfirm(false)}
            >
              {t("close")}
            </button>
            <div className="border-b border-[#c2c2c2] pb-2 text-lg font-semibold">
              {t("Eligibility")}
            </div>
            <p className="text-[#3a17c5] font-semibold text-center mt-2">
              {t("To be eligible for coverage, on the effective date, you must:")}
            </p>
            <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-2">
              <li>
                {t("Be at least 15 days of age and less than 86 years of age traveling for no more than 90 days; and")}
              </li>
              <li>
                {t("Be a member in good standing of an association or organization, or a client of a tour operator, that has agreed to participate in this insurance plan, or be the spouse or dependent child of a member insured under the same policy; and")}
              </li>
              <li>
                {t("Purchase coverage within 10 days of the initial deposit for your trip or prior to any cancellation penalties being applicable; and")}
              </li>
              <li>
                {t("Purchase coverage for the full value of the non-refundable, pre-paid travel arrangements; and")}
              </li>
              <li>
                {t("Purchase coverage for the entire duration of your trip; and")}
              </li>
              <li>
                {t("For traveling Canadians, purchase coverage prior to the date of departure from your province or territory of residence or Canada or; for visitors to Canada, purchase coverage prior to the date of departure from your home country; and")}
              </li>
              <li>
                {t("Know of no reason that you, an immediate family member, a travel companion, a travel companion’s immediate family member, or business partner would be unable to start or complete the trip as booked.")}
              </li>
            </ol>
          </div>
        )}
      </div>
      {showConfirmEligibility && (
        <ConfirmEligibilityNonMedical
          confirmEligibility={showConfirmEligibility}
          setShowConfirmEligibility={setShowConfirmEligibility}
          setIsConfirmed={setIsConfirmed}
        />
      )}
    </div>
  );
}
