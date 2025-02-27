import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function CoverageInformation() {
  const [showInfoCountryOfOrigin, setShowInfoCountryOfOrigin] = useState(false);
  const [showInfoSuperVisa, setShowInfoSuperVisa] = useState(false);

  const [showInfoDestinationProvince, setShowInfoDestinationProvince] =
    useState(false);

  const [showInfoPolicyType, setShowInfoPolicyType] = useState(false);

  const [showInfoCoverageOption, setShowInfoCoverageOption] = useState(false);

  const [showInfoDeductible, setShowInfoDeductible] = useState(false);

  return (
    <div className="border-b pb-4 mb-4 mt-4">
      <h3 className="text-lg font-semibold text-gray-700 flex justify-center tracking-wider leading-4 mb-10 underline">
        COVERAGE INFORMATION
      </h3>

      {/* Country Of Origin */}

      <div className="mt-4">
        <div className=" flex justify-between mt-2">
          <label className=" w-full mt-2 flex items-center gap-2">
            <InformationCircleIcon
              onClick={() =>
                setShowInfoCountryOfOrigin((prevState) => !prevState)
              }
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Country of Origin{" "}
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
            <option value="CU">Cuba</option>
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
            <option value="IR">Iran</option>
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
            <option value="KP">North Korea</option>
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
            <option value="RU">Russia</option>
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
            <option value="SD">Sudan</option>
            <option value="SR">Suriname</option>
            <option value="SJ">Svalbard and Jan Mayen</option>
            <option value="SZ">Swaziland</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="SY">Syria</option>
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
            <option value="UA">Ukraine</option>
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
      </div>

      {showInfoCountryOfOrigin && (
        <div className="max-w-4xl mx-auto p-4 bg-white  rounded-lg border border-gray-200 mt-5 mb-5">
          <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-t-lg">
            Country of Origin
          </h2>
          <div className="p-4 text-gray-700">
            <p>
              <strong>Country of Origin </strong> means the country for which
              the insured person holds a passport. Where the insured person
              holds more than one passport, the country of origin will be taken
              to mean the country that the insured person has declared on the
              application.
            </p>
          </div>
        </div>
      )}

      {/* // */}

      {/* Are applicants currently in Canada? */}
      <div className="flex items-center justify-between mt-4">
        <label className="w-full mt-2 flex gap-2">
          Are applicants currently in Canada?
        </label>
        <div className="w-full flex justify-start items-center gap-10 ">
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="travelUS"
              value="yes"
              className="form-radio "
              //   onChange={() => setCoverageForPreMedCon(true)}
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="travelUS"
              value="no"
              className="form-radio "
              //   onChange={() => setCoverageForPreMedCon(false)}
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {true && (
        <div className="max-w-4xl mx-auto p-6 bg-white  rounded-lg border border-gray-200 mt-5 mb-5">
          <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-t-lg">
            Waiting Period
          </h2>
          <div className="p-4 text-gray-700">
            <p>
              If you purchase this coverage after your arrival in Canada there
              is no coverage for any sickness that began, or for which you
              experienced symptoms, during:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>
                <strong>a.</strong> The 48-hour period following the effective
                date of the policy if insurance is purchased within 30 days of
                your arrival to Canada; or
              </li>
              <li>
                <strong>b.</strong> The 8-day period following the effective
                date of the policy if insurance is purchased more than 30 days
                after your arrival to Canada even if related expenses are
                incurred after the Waiting Period.
              </li>
            </ul>
            <p className="mt-4">
              <strong>Exception:</strong> The Waiting Period will be waived if
              this policy is purchased on or prior to the expiry date of an
              existing Secure Travel RIMI Visitors to Canada Travel Insurance
              policy already issued by the insurer, to take effect on the day
              following such expiry date provided no increase in the sum insured
              option is applied for. The existing policy must be in effect on
              the date of purchase and there must be no gap in coverage.
            </p>
          </div>
        </div>
      )}

      {/* Are applicants traveling on a Super Visa? */}
      <div className="flex items-center justify-between mt-4">
        <label className="w-full mt-2 flex gap-2">
          <InformationCircleIcon
            onClick={() => setShowInfoSuperVisa((prevState) => !prevState)}
            className="h-5 w-5 text-[#3a17c5] cursor-pointer"
            aria-hidden="true"
          />{" "}
          Are applicants travelling to Canada on a Super Visa?
        </label>
        <div className="w-full flex justify-start items-center gap-10 ">
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="travelUS"
              value="yes"
              className="form-radio "
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="travelUS"
              value="no"
              className="form-radio "
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {showInfoSuperVisa && (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border border-gray-200 mt-5 mb-5">
          <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-t-lg">
            Super Visa
          </h2>
          <div className="p-4 text-gray-700">
            <p>
              Select yes if this quote is for parents or grandparents of a
              Canadian citizen who are travelling to Canada on a Super Visa. The
              Super Visa requires that at least $100,000 of insurance be
              purchased for at least 365 days.
            </p>
          </div>
        </div>
      )}

      {/* Destination Province */}

      <div className="mt-4">
        <div className=" flex justify-between mt-2">
          <label className=" w-full mt-2 flex items-center gap-2">
            <InformationCircleIcon
              onClick={() =>
                setShowInfoDestinationProvince((prevState) => !prevState)
              }
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Destination Province{" "}
          </label>
          <select className="w-full p-2 border rounded">
            <option value="">Please select...</option>
            <option value="AB">Alberta</option>
            <option value="BC">British Columbia</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="NT">Northwest Territories</option>
            <option value="NU">Nunavut</option>
            <option value="NS">Nova Scotia</option>
            <option value="ON">Ontario</option>
            <option value="PE">Prince Edward Island</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="YT">Yukon Territories</option>
          </select>
        </div>
      </div>

      {showInfoDestinationProvince && (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg border border-gray-200 mt-5 mb-5">
          <p className="text-gray-700">
            Select the primary destination Province for your trip.
          </p>
        </div>
      )}

      {/* Effective Date  */}
      <div className=" flex justify-between mt-4">
        <label className="w-full block mt-2">Effective Date</label>
        <input className="w-full p-2 border rounded" type="date" />
      </div>
      {/* // */}

      {/* Expiry Date  */}
      <div className=" flex justify-between mt-4">
        <label className="w-full block mt-2">Expiry Date</label>
        <input className="w-full p-2 border rounded" type="date" />
      </div>

      {/* // */}

      {/* Coverage Length */}

      <div className=" flex justify-between mt-4">
        <label className="w-full block mt-2">Coverage Length</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder=""
          disabled
        />
      </div>

      {/* // */}

      {/* Policy Type  */}

      <div className="mt-4">
        <div className=" flex justify-between mt-2">
          <label className=" w-full mt-2 flex items-center gap-2">
            <InformationCircleIcon
              onClick={() => setShowInfoPolicyType((prevState) => !prevState)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Policy Type{" "}
          </label>
          <select className="w-full p-2 border rounded">
            <option value="">Please select...</option>
            <option value="standard">Standard</option>
            <option value="enhanced">Enhanced</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </div>

      {showInfoPolicyType && (
        <div className="max-w-4xl mx-auto p-6 bg-white  rounded-lg border border-gray-200 mt-5 mb-5">
          <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-t-lg">
            Policy Type
          </h2>
          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border border-gray-300 px-4 py-2">Benefits</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Standard Plan
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Enhanced Plan
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Hospital Accommodation",
                    "Ward Rate",
                    "Up to Semi Private Room",
                  ],
                  ["Medical Services", "Included", "Included"],
                  ["Diagnostic Services", "Included", "Included"],
                  [
                    "Prescriptions Drugs",
                    "30 days, up to $500 per prescription",
                    "30 days, up to $1,000 per prescription",
                  ],
                  ["Private Duty Nurse", "Up to $5,000", "Included"],
                  [
                    "Paramedical Services",
                    "$300 per incident per service",
                    "$500 per incident per service",
                  ],
                  [
                    "Emergency Dental",
                    "$1,000 due to accident & $300 for pain",
                    "$3,000 due to accident & $500 for pain",
                  ],
                  ["Medical Appliances", "$5,000", "$5,000"],
                  ["Emergency Transportation", "Included", "Included"],
                  [
                    "Transportation to Bedside",
                    "X X",
                    "$3,000 for roundtrip airfare",
                  ],
                  ["Repatriation of Remains", "$5,000", "$10,000"],
                  ["Meal & Accommodation", "XX", "Maximum up to $3,000"],
                  ["Hospital Allowance", "XX", "$50 per day, maximum $500"],
                  [
                    "Followup Visits",
                    "Up to 3 follow up visits",
                    "Up to 3 follow up visits",
                  ],
                  [
                    "Return and Escort of Children",
                    "XX",
                    "Included via economy airfare",
                  ],
                  ["Excess Baggage Return", "XX", "XX"],
                  ["Accidental Death & Dismemberment", "$50,000", "$50,000"],
                  ["Flight Accident", "$50,000", "$50,000"],
                ].map(([benefit, standard, enhanced], index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      {benefit}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {standard}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {enhanced}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* // */}

      {/* Coverage Options  */}
      <div className="mt-4">
        <div className=" flex justify-between mt-2">
          <label className=" w-full mt-2 flex items-center gap-2">
            <InformationCircleIcon
              onClick={() =>
                setShowInfoCoverageOption((prevState) => !prevState)
              }
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Coverage Options{" "}
          </label>

          <select className="w-full p-2 border rounded">
            <option value="">Please select...</option>
            <option value="25000">$25,000.00 CAD</option>
            <option value="50000">$50,000.00 CAD</option>
            <option value="100000">$100,000.00 CAD</option>
            <option value="150000">$150,000.00 CAD</option>
            <option value="500000">$500,000.00 CAD</option>
            <option value="1000000">$1,000,000.00 CAD</option>
          </select>
        </div>
      </div>

      {showInfoCoverageOption && (
        <div className="max-w-4xl mx-auto p-4 bg-white  rounded-lg border border-gray-200 mt-5 mb-5">
          <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-t-lg">
            Coverage Options
          </h2>
          <div className="p-4 text-gray-700">
            <p>
              This is the maximum amount that will be covered for eligible
              medical expenses.
            </p>
          </div>
        </div>
      )}

      {/*  */}

      {/* Deductible  */}

      <div className="mt-4">
        <div className=" flex justify-between mt-2">
          <label className=" w-full mt-2 flex items-center gap-2">
            <InformationCircleIcon
              onClick={() => setShowInfoDeductible((prevState) => !prevState)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
            Deductible{" "}
          </label>
          {/* className="w-full p-2 border rounded" */}

          <select className="w-full p-2 border rounded">
            <option value="">Please select...</option>
            <option value="0">$0.00 CAD</option>
            <option value="100">$100.00 CAD</option>
            <option value="250">$250.00 CAD</option>
            <option value="500">$500.00 CAD</option>
            <option value="1000">$1,000.00 CAD</option>
            <option value="3000">$3,000.00 CAD</option>
          </select>
        </div>
      </div>

      {showInfoDeductible && (
        <div className="max-w-4xl mx-auto p-6 bg-white  rounded-lg border border-gray-200 mt-5 mb-5">
          <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-t-lg">
            Deductible
          </h2>
          <div className="p-4 text-gray-700">
            <p>
              Deductible means the amount (if applicable), in Canadian dollars,
              which the insured must pay before any remaining eligible expenses
              are reimbursed under this policy. The deductible applies once per
              insured person, per covered emergency.
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border border-gray-300 px-4 py-2">
                      Deductible Option
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Age 0 - 79
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Age 80 - 89
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["$0", "No discount", "N/A"],
                    ["$100", "5% discount", "N/A"],
                    ["$250", "10% discount", "N/A"],
                    ["$500", "15% discount", "No Discount"],
                    ["$1000", "20% discount", "15% discount"],
                    ["$3000", "30% discount", "25% discount"],
                  ].map(([option, age79, age89], index) => (
                    <tr key={index} className="border border-gray-300">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">
                        {option}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {age79}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {age89}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/*  */}
    </div>
  );
}
