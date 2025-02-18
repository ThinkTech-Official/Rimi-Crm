// export default function RIMICanuckVoyageTravelMedical() {
//   return (
//     <div>RIMICanuckVoyageTravelMedical</div>
//   )
// }

import { CheckIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

// const steps = [
//   { id: '01', name: 'Job details', href: '#', status: 'complete' },
//   { id: '02', name: 'Application form', href: '#', status: 'current' },
//   { id: '03', name: 'Preview', href: '#', status: 'upcoming' },
// ]

const RIMICanuckVoyageTravelMedical: React.FC = () => {
  const [displayInfoDeductible, setDisplayInfoDeductible] = useState(false);
  const [displayInfoDestinationCountry, setDisplayInfoDestinationCountry] =
    useState(false);
  const [displayInfoApplicantConfirm, setDisplayInfoApplicantConfirm] =
    useState(false);
  const [travelingThroughUS, setTravelingThroughUS] = useState(false);

  // complete  current  upcoming

  const [steps, setSteps] = useState([
    { id: "01", name: "Get Quote", href: "#", status: "current" },
    { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
    { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
  ]);

  const [formStep, setFormStep] = useState(1);

  const handleFormStepChange = (stepCommand: string) => {
    setFormStep((prevStep) => {
      let newStep = prevStep;

      if (stepCommand === "back" && prevStep > 1) {
        newStep = prevStep - 1;
      } else if (stepCommand === "forward" && prevStep < 3) {
        newStep = prevStep + 1;
      }

      // Update step statuses dynamically
      const updatedSteps = steps.map((step) => ({
        ...step,
        status:
          step.id === newStep.toString().padStart(2, "0")
            ? "current"
            : step.id < newStep.toString().padStart(2, "0")
            ? "complete"
            : "upcoming",
      }));

      setSteps(updatedSteps);

      return newStep;
    });
  };

  const handleSubmit = () => {
    console.log("Form Submitted");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-[#3a17c5]">RIMI</h1>
        <h2 className="text-lg text-[#3a17c5]">
          RIMI CANUCK VOYAGE TRAVEL MEDICAL INSURANCE
        </h2>
        <p className="text-sm text-blue-500">Coverage Summary</p>
      </div>
      {/* <div className="flex justify-around mb-6 text-gray-600">
        <div className={step === 1 ? "text-[#3a17c5] font-semibold" : ""}>Step 1: Get Quote</div>
        <div className={step === 2 ? "text-[#3a17c5] font-semibold" : ""}>Step 2: Complete Application</div>
        <div className={step === 3 ? "text-[#3a17c5] font-semibold" : ""}>Step 3: Confirmation</div>
      </div> */}
      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
        >
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {step.status === "complete" ? (
                <a href={step.href} className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                      <CheckIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </a>
              ) : step.status === "current" ? (
                <a
                  href={step.href}
                  className="flex items-center px-6 py-4 text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                    <span className="text-indigo-600">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600">
                    {step.name}
                  </span>
                </a>
              ) : (
                <a href={step.href} className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">
                        {step.id}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </a>
              )}

              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="absolute right-0 top-0 hidden h-full w-5 md:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
      {steps[0].status === "current" && (
        <div>
          <div className="border-b pb-4 mb-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-700 flex justify-center tracking-wider leading-4 mb-10 underline">
              APPLICANT INFORMATION
            </h3>
            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">First Name</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Enter First Name"
              />
            </div>
            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">Last Name</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Enter Last Name"
              />
            </div>
            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">Date of Birth</label>
              <input className="w-full p-2 border rounded" type="date" />
            </div>
            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">Email</label>
              <input
                className="w-full p-2 border rounded"
                type="email"
                placeholder="Enter Email"
              />
            </div>
            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">Province of Residence</label>
              <select className="w-full p-2 border rounded">
                <option>Please select...</option>
                <option>Alberta</option>
                <option>British Columbia</option>
                <option>Manitoba</option>
                <option>New Brunswick</option>
                <option>Newfoundland and Labrador</option>
                <option>Nova Scotia</option>
                <option>Northwest Territories</option>
                <option>Nunavut</option>
                <option>Ontario</option>
                <option>Prince Edward Island</option>
                <option>Quebec</option>
                <option>Saskatchewan</option>
                <option>Yunkon</option>
              </select>
            </div>
            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">
                Number of Additional Applicants
              </label>
              <select className="w-full p-2 border rounded">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="mt-4 flex justify-center items-center gap-2">
              <InformationCircleIcon
                onClick={() =>
                  setDisplayInfoApplicantConfirm((prevState) => !prevState)
                }
                className="h-5 w-5 text-[#3a17c5] cursor-pointer"
                aria-hidden="true"
              />
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">
                Confirm that all applicants are eligible for this insurance
              </span>
            </div>

            {/* Eligibility Block  */}
            {displayInfoApplicantConfirm && (
              <div className="border rounded-lg shadow-sm p-4 bg-white">
                <h2 className="text-lg font-semibold border-b pb-2">
                  Eligibility
                </h2>
                <p className="text-sm text-gray-700 mt-2">
                  To be eligible for coverage, on the effective date, you must:
                </p>
                <ul className="list-decimal list-inside text-sm text-gray-700 mt-2 space-y-1">
                  <li>
                    Be a Canadian resident covered by your government health
                    insurance plan for the entire duration of your trip; and
                  </li>
                  <li>
                    Purchase coverage for the entire duration of your trip; and
                  </li>
                  <li>
                    Be at least 15 days of age and less than 80 years of age;
                    and
                  </li>
                  <li>
                    Not be travelling against the advice of a physician; and
                  </li>
                  <li>Have not been diagnosed with a terminal illness; and</li>
                  <li>
                    Not be experiencing new or undiagnosed symptoms or know of
                    any reason to seek medical attention; and
                  </li>
                  <li>
                    Not be travelling to obtain medical treatment outside your
                    province or territory of residence whether or not
                    recommended by your attending physician; and
                  </li>
                  <li>
                    Not have used, or been prescribed, home oxygen during the 12
                    months prior to the effective date; and
                  </li>
                </ul>

                <p className="text-sm font-semibold text-gray-900 mt-4">
                  If you are between 60 and 80 years of age you must also:
                </p>
                <ul className="list-decimal list-inside text-sm text-gray-700 mt-2 space-y-1">
                  <li>Be travelling for no more than 60 days; and</li>
                  <li>
                    Not have been diagnosed with congestive heart failure; and
                  </li>
                  <li>
                    Not have a diagnosed unrepaired aneurysm of 4.5 centimeters
                    or more; and
                  </li>
                  <li>
                    Not require assistance with the activities of daily living
                    (dressing, bathing, eating, using the toilet or getting in
                    or out of a bed or chair); and
                  </li>
                </ul>

                <p className="text-sm font-semibold text-gray-900 mt-4">
                  Applicable to Benefit #21 (COVID-19 Coverage): If you are
                  between 66 and 80 years of age, you must also:
                </p>
                <ul className="list-decimal list-inside text-sm text-gray-700 mt-2 space-y-1">
                  <li>
                    Not have any sickness, injury, or medical condition (other
                    than a minor ailment) that was not stable in the 365 days
                    prior to the effective date; and
                  </li>
                  <li>
                    Not have been diagnosed with, treated for, or be awaiting
                    testing or test results for COPD or emphysema.
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className=" pb-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-700 flex justify-center tracking-wider leading-4 mb-10 underline">
              COVERAGE INFORMATION
            </h3>

            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">Policy Type</label>
              <select className="w-full p-2 border rounded">
                <option>Please select...</option>
                <option>Single Trip</option>
                <option>Multi-Trip Annual</option>
              </select>
            </div>

            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">Effective Date</label>
              <input className="w-full p-2 border rounded" type="date" />
            </div>

            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">Expiry Date</label>
              <input className="w-full p-2 border rounded" type="date" />
            </div>

            <div className=" flex justify-between mt-2">
              <label className="w-full block mt-2">Coverage Length</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                disabled
              />
            </div>

            <div className=" flex justify-between mt-2">
              <label className=" w-full mt-2 flex gap-2">
                Destination Country{" "}
                <InformationCircleIcon
                  onClick={() =>
                    setDisplayInfoDestinationCountry((prevState) => !prevState)
                  }
                  className="h-5 w-5 text-[#3a17c5] cursor-pointer"
                  aria-hidden="true"
                />
              </label>
              <select className="w-full p-2 border rounded">
                <option value="">Please select...</option>
                <option value="AF">Afghanistan</option>
                <option value="AX">Åland Islands</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">American Samoa</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AI">Anguilla</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BM">Bermuda</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia</option>
                <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BV">Bouvet Island</option>
                <option value="BR">Brazil</option>
                <option value="IO">British Indian Ocean Territory</option>
                <option value="VG">British Virgin Islands</option>
                <option value="BN">Brunei</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon</option>
                <option value="CA">Canada</option>
                <option value="CV">Cape Verde</option>
                <option value="KY">Cayman Islands</option>
                <option value="CF">Central African Republic</option>
                <option value="TD">Chad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Christmas Island</option>
                <option value="CC">Cocos (Keeling) Islands</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CK">Cook Islands</option>
                <option value="CR">Costa Rica</option>
                <option value="HR">Croatia</option>
                <option value="CW">Curaçao</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="CD">DR Congo</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="ET">Ethiopia</option>
                <option value="FK">Falkland Islands</option>
                <option value="FO">Faroe Islands</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="GF">French Guiana</option>
                <option value="PF">French Polynesia</option>
                <option value="TF">French Southern and Antarctic Lands</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GR">Greece</option>
                <option value="GL">Greenland</option>
                <option value="GD">Grenada</option>
                <option value="GP">Guadeloupe</option>
                <option value="GU">Guam</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HM">Heard Island and McDonald Islands</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IM">Isle of Man</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="CI">Ivory Coast</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JE">Jersey</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="XK">Kosovo</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Laos</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MO">Macau</option>
                <option value="MK">Macedonia</option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MQ">Martinique</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia</option>
                <option value="MD">Moldova</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="NC">New Caledonia</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NU">Niue</option>
                <option value="NF">Norfolk Island</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Palestine</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PN">Pitcairn Islands</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="CG">Republic of the Congo</option>
                <option value="RE">Réunion</option>
                <option value="RO">Romania</option>
                <option value="RW">Rwanda</option>
                <option value="BL">Saint Barthélemy</option>
                <option value="SH">Saint Helena</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="MF">Saint Martin</option>
                <option value="PM">Saint Pierre and Miquelon</option>
                <option value="VC">Saint Vincent and the Grenadines</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">São Tomé and Príncipe</option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SX">Sint Maarten</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="GS">South Georgia</option>
                <option value="KR">South Korea</option>
                <option value="SS">South Sudan</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="SR">Suriname</option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SZ">Swaziland</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="TW">Taiwan</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania</option>
                <option value="TH">Thailand</option>
                <option value="TL">Timor-Leste</option>
                <option value="TG">Togo</option>
                <option value="TK">Tokelau</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="UG">Uganda</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UM">United States Minor Outlying Islands</option>
                <option value="VI">United States Virgin Islands</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VA">Vatican City</option>
                <option value="VE">Venezuela</option>
                <option value="VN">Vietnam</option>
                <option value="WF">Wallis and Futuna</option>
                <option value="EH">Western Sahara</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
              </select>
            </div>

            {/* country info  */}

            {displayInfoDestinationCountry && (
              <div className="border rounded-lg shadow-sm p-4 bg-white mt-4 mb-4">
                <div className=" p-4">
                  <h2 className="text-center text-blue-600 font-semibold">
                    Destination
                  </h2>
                  <p className="text-sm text-gray-700 mt-2">
                    Select the primary destination country for your trip. Select
                    Canada only if you are travelling outside your home
                    province, but within Canada for your entire trip.
                  </p>
                </div>
              </div>
            )}

            <div className="w-full mt-2 mb-2 ">
              {/* Question and radio buttons */}
              <div className="flex items-center justify-between">
                <label className=" w-full">
                  Are you travelling through the US?
                </label>
                <div className="w-full flex justify-start items-center gap-10 ">
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="travelUS"
                      value="yes"
                      className="form-radio "
                      onChange={() => setTravelingThroughUS(true)}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="travelUS"
                      value="no"
                      className="form-radio "
                      onChange={() => setTravelingThroughUS(false)}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Show input field when "Yes" is selected */}
              {travelingThroughUS && (
                <div className="mt-3">
                  <div className=" flex justify-between mt-2">
                    <label className="w-full block  font-medium">
                      Number of Travel Days in the US
                    </label>
                    <input
                      type="number"
                      className="border  rounded p-2 w-full"
                      placeholder="Enter number of days"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className=" flex justify-between mt-2">
              <label className=" w-full mt-2 flex gap-2">
                Deductible{" "}
                <InformationCircleIcon
                  onClick={() =>
                    setDisplayInfoDeductible((prevState) => !prevState)
                  }
                  className="h-5 w-5 text-[#3a17c5] cursor-pointer"
                  aria-hidden="true"
                />
              </label>
              <select className="w-full p-2 border rounded">
                <option value="">Please select...</option>
                <option value="0">$0.00 CAD</option>
                <option value="250">$250.00 CAD</option>
                <option value="500">$500.00 CAD</option>
                <option value="1000">$1,000.00 CAD</option>
                <option value="5000">$5,000.00 CAD</option>
                <option value="10000">$10,000.00 CAD</option>
              </select>
            </div>
          </div>
          {displayInfoDeductible && (
            <div>
              <div className="border rounded-lg shadow-sm p-4 bg-white">
                <h2 className="text-lg font-semibold border-b pb-2">
                  Deductible
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Deductible means the amount (if applicable), in Canadian
                  dollars, which the insured must pay before any remaining
                  eligible expenses are reimbursed under this policy. The
                  deductible applies once per insured person, per covered
                  emergency.
                </p>

                <div className="mt-4">
                  <h3 className="text-md font-semibold text-gray-700 text-center">
                    Deductible Discounts
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 mt-2">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 p-2 text-left">
                            Deductible Option
                          </th>
                          <th className="border border-gray-300 p-2 text-left">
                            Discount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { option: "$0", discount: "No discount" },
                          { option: "$250", discount: "9%" },
                          { option: "$500", discount: "14%" },
                          { option: "$1,000", discount: "18%" },
                          { option: "$5,000", discount: "35%" },
                          { option: "$10,000", discount: "45%" },
                        ].map((item, index) => (
                          <tr key={index} className="even:bg-gray-50">
                            <td className="border border-gray-300 p-2">
                              {item.option}
                            </td>
                            <td className="border border-gray-300 p-2">
                              {item.discount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className=" w-full h-28 flex items-center justify-start bg-slate-200">
            <h3 className=" text-2xl ml-7">Your Quote: $0.00</h3>
          </div>
        </div>
      )}
      {steps[1].status === "current" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Step 2: Additional Information
          </h3>
          <label className="block mt-2">Dummy Field 1</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            placeholder="Enter Dummy Data"
          />
          <label className="block mt-2">Dummy Field 2</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            placeholder="Enter Dummy Data"
          />
        </div>
      )}
      {steps[2].status === "current" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Step 3: Confirmation
          </h3>
          <p className="text-gray-600">
            Review your application details and submit.
          </p>
        </div>
      )}
      <div className="flex justify-center gap-10 mt-4">
        {formStep > 1 && (
          <button
            className="w-[150px] bg-[#6141e0] text-white p-2 rounded cursor-pointer"
            onClick={() => handleFormStepChange("back")}
          >
            Back
          </button>
        )}
        {formStep < 3 ? (
          <button
            className="w-[150px] bg-[#3a17c5] text-white p-2 rounded cursor-pointer"
            onClick={() => handleFormStepChange("forward")}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-[150px] bg-[#3a17c5] text-white p-2 rounded cursor-pointer"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default RIMICanuckVoyageTravelMedical;
