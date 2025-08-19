import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CoverageInformation() {
  const [showInfoPolicyType, setShowInfoPolicyType] = useState(false);
  const [showInfoCountryOfOrigin, setShowInfoCountryOfOrigin] = useState(false);
  const [showInfoDestinationProvince, setShowDestinationProvince] =
    useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-9 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Coverage Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        {/* Policy Type */}
        <div className="flex flex-col">
          <label className="flex gap-1 items-center text-sm">
            Policy Type
            <InformationCircleIcon
              onClick={() => setShowInfoPolicyType((prevState) => !prevState)}
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
          </label>
          <div className="relative">
            <select className="input-primary appearance-none cursor-pointer">
              <option value="">Please select...</option>
              <option value="standard">Standard</option>
              <option value="enhanced">Enhanced</option>
              <option value="premium">Premium</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Country of Origin */}
        <div className="flex flex-col">
          <label className="flex gap-1 items-center text-sm">
            Country of Origin
            <InformationCircleIcon
              onClick={() =>
                setShowInfoCountryOfOrigin((prevState) => !prevState)
              }
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
          </label>
          <div className="relative">
            <select className="input-primary appearance-none cursor-pointer">
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
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Destination Province */}
        <div className="flex flex-col">
          <label className="flex gap-1 items-center text-sm">
            Destination Province
            <InformationCircleIcon
              onClick={() =>
                setShowDestinationProvince((prevState) => !prevState)
              }
              className="h-5 w-5 text-[#3a17c5] cursor-pointer"
              aria-hidden="true"
            />
          </label>
          <div className="relative">
          <select className="input-primary appearance-none cursor-pointer">
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
           <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Effective Date */}
        <div className="flex flex-col">
          <label className="text-sm">Effective Date</label>
          <input className="input-primary" type="date" />
        </div>

        {/* Expiry Date */}
        <div className="flex flex-col">
          <label className="text-sm">Expiry Date</label>
          <input className="input-primary" type="date" />
        </div>

        {/* Coverage Length */}
        <div className="flex flex-col">
          <label className="text-sm">Coverage Length</label>
          <input className="input-primary" type="text" />
        </div>
      </div>

      {/* Info Boxes */}
      {showInfoPolicyType && (
        <div className="border rounded-lg shadow-sm p-4 mt-4 bg-white font-[inter]">
          <h2 className="text-lg font-semibold border-b pb-2">Policy Type</h2>
          <div className="overflow-x-auto mt-2">
            <table className="w-full border border-gray-300 text-sm font-[inter]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2 text-left">
                    Benefits
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Standard Plan
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Enhanced Plan
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Premium Plan
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Benefit rows */}
                {[
                  ["Policy Limit:", "$2,000,000", "$2,000,000", "$2,000,000"],
                  [
                    "Hospital Accommodation:",
                    "Up to Semi Private Room",
                    "Up to Semi Private Room",
                    "Up to Semi Private Room",
                  ],
                  [
                    "Medical Services:",
                    "Included (no limit)",
                    "Included (no limit)",
                    "Included (no limit)",
                  ],
                  [
                    "Diagnostic Services:",
                    "Included (no limit)",
                    "Included (no limit)",
                    "Included (no limit)",
                  ],
                  [
                    "Prescriptions Drugs:",
                    "Up to 30 days per prescription",
                    "Up to 30 days per prescription",
                    "Up to 60 days per prescription",
                  ],
                  [
                    "Private Duty Nurse:",
                    "X X",
                    "Included (no limit)",
                    "Included (no limit)",
                  ],
                  [
                    "Emergency Dental:",
                    "$2,500 due to accident & $600 for pain",
                    "$4,000 due to accident & $600 for pain",
                    "$4,000 due to accident & $600 for pain",
                  ],
                  [
                    "Medical Appliances:",
                    "X X",
                    "Included (no limit)",
                    "Included (no limit)",
                  ],
                  [
                    "Emergency Transportation:",
                    "Included (no limit)",
                    "Included (no limit)",
                    "Included (no limit)",
                  ],
                  [
                    "Maternity:",
                    "X X",
                    "Up to $10,000 (condition apply)",
                    "Up to $15,000 (condition apply)",
                  ],
                  [
                    "Physical Examination:",
                    "$150 for one exam per year",
                    "$150 for one exam per year",
                    "$150 for one exam per year",
                  ],
                  [
                    "Eye Examination:",
                    "$100 for one exam per year",
                    "$100 for one exam per year",
                    "$100 for one exam per year",
                  ],
                  [
                    "Psychiatric/Psychological:",
                    "$500 per incident",
                    "$1,000 per incident",
                    "$1,000 per incident",
                  ],
                  [
                    "Trauma Counselling:",
                    "X X",
                    "6 counseling sessions",
                    "6 counseling sessions",
                  ],
                  ["Corrective Devices:", "", "$1,000", "$1,000"],
                  [
                    "Sexual Health Consultation:",
                    "X X",
                    "X X",
                    "$100 per year",
                  ],
                  [
                    "Tutorial Services:",
                    "X X",
                    "X X",
                    "$20 per hour, maximum $500",
                  ],
                  ["Repatriation of Remains:", "$5,000", "$10,000", "$10,000"],
                  [
                    "Accidental Death & Dismemberment:",
                    "$10,000",
                    "$25,000",
                    "$25,000",
                  ],
                  ["Common Carrier:", "$25,000", "$100,000", "$100,000"],
                ].map(([benefit, standard, enhanced, premium], index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 font-semibold">
                      {benefit}
                    </td>
                    <td className="border border-gray-300 p-2">{standard}</td>
                    <td className="border border-gray-300 p-2">{enhanced}</td>
                    <td className="border border-gray-300 p-2">{premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showInfoCountryOfOrigin && (
        <div className="border rounded-lg shadow-sm p-4 mt-4 bg-white font-[inter]">
          <h2 className="text-lg font-semibold border-b pb-2">
            Country of Origin
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Country of Origin</strong> means the country for which the
            insured person holds a passport. Where the insured person holds more
            than one passport, the country of origin will be taken to mean the
            country that the insured person has declared on the application.
          </p>
        </div>
      )}

      {showInfoDestinationProvince && (
        <div className="border rounded-lg shadow-sm p-4 mt-4 bg-white font-[inter]">
          <p className="text-sm text-gray-700">
            Select the primary destination Province for your trip.
          </p>
        </div>
      )}
    </div>
  );
}
