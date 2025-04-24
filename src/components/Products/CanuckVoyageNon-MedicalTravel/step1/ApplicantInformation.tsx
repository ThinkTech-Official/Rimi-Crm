import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface ApplicantInformationProps {
  displayInfoApplicantConfirm: boolean;
  setDisplayInfoApplicantConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ApplicantInformation({
  displayInfoApplicantConfirm,
  setDisplayInfoApplicantConfirm,
}: ApplicantInformationProps) {
  const [displayInfoCountryOfOrigin, setDisplayInfoCountryOfOrigin] =
    useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
  <h3 className="text-xl font-bold text-left text-[#1B1B1B] mb-6 font-[inter]">
    Applicant Information
  </h3>
  <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
    <div className="flex flex-col gap-2">
      <label className="font-[inter]">First Name</label>
      <input
        className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
        type="text"
        placeholder="Enter First Name"
      />
    </div>
    <div className="flex flex-col gap-2">
      <label className="font-[inter]">Last Name</label>
      <input
        className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
        type="text"
        placeholder="Enter Last Name"
      />
    </div>
    <div className="flex flex-col gap-2">
      <label className="font-[inter]">Date of Birth</label>
      <input
        className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
        type="date"
      />
    </div>
    <div className="flex flex-col gap-2">
      <label className="font-[inter]">Email</label>
      <input
        className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
        type="email"
        placeholder="Enter Email"
      />
    </div>
    <div className="flex flex-col gap-2">
      <label className="flex gap-2 font-[inter]">
        <InformationCircleIcon
          onClick={() => setDisplayInfoCountryOfOrigin((prevState) => !prevState)}
          className="h-5 w-5 text-[#3a17c5] cursor-pointer"
          aria-hidden="true"
        />
        Country of Origin
      </label>
      <select className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]">
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
    {displayInfoCountryOfOrigin && (
      <div className="border rounded-lg shadow-sm p-4 bg-white w-full mt-2 mb-2 font-[inter]">
        <div className="border-b pb-2 text-lg font-semibold">Country of Origin</div>
        <div className="pt-2 text-gray-700">
          <strong className="font-bold">Country of Origin</strong> means the country for which the insured person holds a passport. Where the insured person holds more than one passport, the country of origin will be taken to mean the country that the insured person has declared on the application.
        </div>
      </div>
    )}
    <div className="flex flex-col gap-2">
      <label className="font-[inter]">Province/State of Residence</label>
      <input
        className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
        type="text"
        placeholder="Province/State of Residence"
      />
    </div>
    <div className="flex flex-col gap-2">
      <label className="font-[inter]">Number of Additional Applicants</label>
      <select className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
  </div>

  <div className="mt-6 flex justify-start items-center gap-2">
    <InformationCircleIcon
      onClick={() => setDisplayInfoApplicantConfirm((prevState) => !prevState)}
      className="h-5 w-5 text-[#3a17c5] cursor-pointer"
      aria-hidden="true"
    />
    <input type="checkbox" className="mr-2" />
    <span className="font-semibold font-[inter] text-[#2B00B7]">
      Confirm that all applicants are eligible for this insurance
    </span>
  </div>

  {displayInfoApplicantConfirm && (
    <div className="border rounded-lg shadow-sm p-4 mt-4 bg-white font-[inter]">
      <div className="border-b pb-2 text-lg font-semibold">Eligibility</div>
      <p className="text-[#3a17c5] font-semibold text-center mt-2">
        To be eligible for coverage, on the effective date, you must:
      </p>
      <ol className="list-decimal pl-5 mt-2 text-gray-700 space-y-2">
        <li>Be at least 15 days of age and less than 86 years of age traveling for no more than 90 days; and</li>
        <li>
          Be a member in good standing of an association or organization, or a client of a tour operator, that has agreed to participate in this insurance plan, or be the spouse or dependent child of a member insured under the same policy; and
        </li>
        <li>Purchase coverage within 10 days of the initial deposit for your trip or prior to any cancellation penalties being applicable; and</li>
        <li>Purchase coverage for the full value of the non-refundable, pre-paid travel arrangements; and</li>
        <li>Purchase coverage for the entire duration of your trip; and</li>
        <li>
          For traveling Canadians, purchase coverage prior to the date of departure from your province or territory of residence or Canada or; for visitors to Canada, purchase coverage prior to the date of departure from your home country; and
        </li>
        <li>
          Know of no reason that you, an immediate family member, a travel companion, a travel companion’s immediate family member, or business partner would be unable to start or complete the trip as booked.
        </li>
      </ol>
    </div>
  )}
</div>

  );
}
