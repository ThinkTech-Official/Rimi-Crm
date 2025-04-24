import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function CoverageInformation() {
  const [showInfoCountryOfOrigin, setShowInfoCountryOfOrigin] = useState(false);
  const [showInfoSuperVisa, setShowInfoSuperVisa] = useState(false);
  const [showInfoInCanada, setShowInfoInCanada] = useState(false);
  const [showInfoDestinationProvince, setShowInfoDestinationProvince] = useState(false);
  const [showInfoPolicyType, setShowInfoPolicyType] = useState(false);
  const [showInfoCoverageOption, setShowInfoCoverageOption] = useState(false);
  const [showInfoDeductible, setShowInfoDeductible] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9] font-[inter] text-[#1B1B1B]">
      <h3 className="text-xl font-bold text-left mb-6">Coverage Information</h3>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
        {/* Country of Origin */}
        <Dropdown
          label="Country of Origin"
          info={() => setShowInfoCountryOfOrigin((prev) => !prev)}
          options={[
            { value: "", label: "Please select..." },
            { value: "AF", label: "Afghanistan" },
            { value: "AX", label: "Åland Islands" },
            { value: "AL", label: "Albania" },
            { value: "DZ", label: "Algeria" },
            { value: "AS", label: "American Samoa" },
            { value: "AD", label: "Andorra" },
            { value: "AO", label: "Angola" },
            { value: "AI", label: "Anguilla" },
            { value: "AQ", label: "Antarctica" },
            { value: "AG", label: "Antigua and Barbuda" },
            { value: "AR", label: "Argentina" },
            { value: "AM", label: "Armenia" },
            { value: "AW", label: "Aruba" },
            { value: "AU", label: "Australia" },
            { value: "AT", label: "Austria" },
            { value: "AZ", label: "Azerbaijan" },
            { value: "BS", label: "Bahamas" },
            { value: "BH", label: "Bahrain" },
            { value: "BD", label: "Bangladesh" },
            { value: "BB", label: "Barbados" },
            { value: "BY", label: "Belarus" },
            { value: "BE", label: "Belgium" },
            { value: "BZ", label: "Belize" },
            { value: "BJ", label: "Benin" },
            { value: "BM", label: "Bermuda" },
            { value: "BT", label: "Bhutan" },
            { value: "BO", label: "Bolivia" },
            { value: "BQ", label: "Bonaire, Sint Eustatius and Saba" },
            { value: "BA", label: "Bosnia and Herzegovina" },
            { value: "BW", label: "Botswana" },
            { value: "BV", label: "Bouvet Island" },
            { value: "BR", label: "Brazil" },
            { value: "IO", label: "British Indian Ocean Territory" },
            { value: "VG", label: "British Virgin Islands" },
            { value: "BN", label: "Brunei" },
            { value: "BG", label: "Bulgaria" },
            { value: "BF", label: "Burkina Faso" },
            { value: "BI", label: "Burundi" },
            { value: "KH", label: "Cambodia" },
            { value: "CM", label: "Cameroon" },
            { value: "CA", label: "Canada" },
            { value: "CV", label: "Cape Verde" },
            { value: "KY", label: "Cayman Islands" },
            { value: "CF", label: "Central African Republic" },
            { value: "TD", label: "Chad" },
            { value: "CL", label: "Chile" },
            { value: "CN", label: "China" },
            { value: "CX", label: "Christmas Island" },
            { value: "CC", label: "Cocos (Keeling) Islands" },
            { value: "CO", label: "Colombia" },
            { value: "KM", label: "Comoros" },
            { value: "CK", label: "Cook Islands" },
            { value: "CR", label: "Costa Rica" },
            { value: "HR", label: "Croatia" },
            { value: "CW", label: "Curaçao" },
            { value: "CY", label: "Cyprus" },
            { value: "CZ", label: "Czech Republic" },
            { value: "DK", label: "Denmark" },
            { value: "DJ", label: "Djibouti" },
            { value: "DM", label: "Dominica" },
            { value: "DO", label: "Dominican Republic" },
            { value: "CD", label: "DR Congo" },
            { value: "EC", label: "Ecuador" },
            { value: "EG", label: "Egypt" },
            { value: "SV", label: "El Salvador" },
            { value: "GQ", label: "Equatorial Guinea" },
            { value: "ER", label: "Eritrea" },
            { value: "EE", label: "Estonia" },
            { value: "ET", label: "Ethiopia" },
            { value: "FK", label: "Falkland Islands" },
            { value: "FO", label: "Faroe Islands" },
            { value: "FJ", label: "Fiji" },
            { value: "FI", label: "Finland" },
            { value: "FR", label: "France" },
            { value: "GF", label: "French Guiana" },
            { value: "PF", label: "French Polynesia" },
            { value: "TF", label: "French Southern and Antarctic Lands" },
            { value: "GA", label: "Gabon" },
            { value: "GM", label: "Gambia" },
            { value: "GE", label: "Georgia" },
            { value: "DE", label: "Germany" },
            { value: "GH", label: "Ghana" },
            { value: "GI", label: "Gibraltar" },
            { value: "GR", label: "Greece" },
            { value: "GL", label: "Greenland" },
            { value: "GD", label: "Grenada" },
            { value: "GP", label: "Guadeloupe" },
            { value: "GU", label: "Guam" },
            { value: "GT", label: "Guatemala" },
            { value: "GG", label: "Guernsey" },
            { value: "GN", label: "Guinea" },
            { value: "GW", label: "Guinea-Bissau" },
            { value: "GY", label: "Guyana" },
            { value: "HT", label: "Haiti" },
            { value: "HM", label: "Heard Island and McDonald Islands" },
            { value: "HN", label: "Honduras" },
            { value: "HK", label: "Hong Kong" },
            { value: "HU", label: "Hungary" },
            { value: "IS", label: "Iceland" },
            { value: "IN", label: "India" },
            { value: "ID", label: "Indonesia" },
            { value: "IQ", label: "Iraq" },
            { value: "IE", label: "Ireland" },
            { value: "IM", label: "Isle of Man" },
            { value: "IL", label: "Israel" },
            { value: "IT", label: "Italy" },
            { value: "CI", label: "Ivory Coast" },
            { value: "JM", label: "Jamaica" },
            { value: "JP", label: "Japan" },
            { value: "JE", label: "Jersey" },
            { value: "JO", label: "Jordan" },
            { value: "KZ", label: "Kazakhstan" },
            { value: "KE", label: "Kenya" },
            { value: "KI", label: "Kiribati" },
            { value: "XK", label: "Kosovo" },
            { value: "KW", label: "Kuwait" },
            { value: "KG", label: "Kyrgyzstan" },
            { value: "LA", label: "Laos" },
            { value: "LV", label: "Latvia" },
            { value: "LB", label: "Lebanon" },
            { value: "LS", label: "Lesotho" },
            { value: "LR", label: "Liberia" },
            { value: "LY", label: "Libya" },
            { value: "LI", label: "Liechtenstein" },
            { value: "LT", label: "Lithuania" },
            { value: "LU", label: "Luxembourg" },
            { value: "MO", label: "Macau" },
            { value: "MK", label: "Macedonia" },
            { value: "MG", label: "Madagascar" },
            { value: "MW", label: "Malawi" },
            { value: "MY", label: "Malaysia" },
            { value: "MV", label: "Maldives" },
            { value: "ML", label: "Mali" },
            { value: "MT", label: "Malta" },
            { value: "MH", label: "Marshall Islands" },
            { value: "MQ", label: "Martinique" },
            { value: "MR", label: "Mauritania" },
            { value: "MU", label: "Mauritius" },
            { value: "YT", label: "Mayotte" },
            { value: "MX", label: "Mexico" },
            { value: "FM", label: "Micronesia" },
            { value: "MD", label: "Moldova" },
            { value: "MC", label: "Monaco" },
            { value: "MN", label: "Mongolia" },
            { value: "ME", label: "Montenegro" },
            { value: "MS", label: "Montserrat" },
            { value: "MA", label: "Morocco" },
            { value: "MZ", label: "Mozambique" },
            { value: "MM", label: "Myanmar" },
            { value: "NA", label: "Namibia" },
            { value: "NR", label: "Nauru" },
            { value: "NP", label: "Nepal" },
            { value: "NL", label: "Netherlands" },
            { value: "NC", label: "New Caledonia" },
            { value: "NZ", label: "New Zealand" },
            { value: "NI", label: "Nicaragua" },
            { value: "NE", label: "Niger" },
            { value: "NG", label: "Nigeria" },
            { value: "NU", label: "Niue" },
            { value: "NF", label: "Norfolk Island" },
            { value: "MP", label: "Northern Mariana Islands" },
            { value: "NO", label: "Norway" },
            { value: "OM", label: "Oman" },
            { value: "PK", label: "Pakistan" },
            { value: "PW", label: "Palau" },
            { value: "PS", label: "Palestine" },
            { value: "PA", label: "Panama" },
            { value: "PG", label: "Papua New Guinea" },
            { value: "PY", label: "Paraguay" },
            { value: "PE", label: "Peru" },
            { value: "PH", label: "Philippines" },
            { value: "PN", label: "Pitcairn Islands" },
            { value: "PL", label: "Poland" },
            { value: "PT", label: "Portugal" },
            { value: "PR", label: "Puerto Rico" },
            { value: "QA", label: "Qatar" },
            { value: "CG", label: "Republic of the Congo" },
            { value: "RE", label: "Réunion" },
            { value: "RO", label: "Romania" },
            { value: "RW", label: "Rwanda" },
            { value: "BL", label: "Saint Barthélemy" },
            { value: "SH", label: "Saint Helena" },
            { value: "KN", label: "Saint Kitts and Nevis" },
            { value: "LC", label: "Saint Lucia" },
            { value: "MF", label: "Saint Martin" },
            { value: "PM", label: "Saint Pierre and Miquelon" },
            { value: "VC", label: "Saint Vincent and the Grenadines" },
            { value: "WS", label: "Samoa" },
            { value: "SM", label: "San Marino" },
            { value: "ST", label: "São Tomé and Príncipe" },
            { value: "SA", label: "Saudi Arabia" },
            { value: "SN", label: "Senegal" },
            { value: "RS", label: "Serbia" },
            { value: "SC", label: "Seychelles" },
            { value: "SL", label: "Sierra Leone" },
            { value: "SG", label: "Singapore" },
            { value: "SX", label: "Sint Maarten" },
            { value: "SK", label: "Slovakia" },
            { value: "SI", label: "Slovenia" },
            { value: "SB", label: "Solomon Islands" },
            { value: "SO", label: "Somalia" },
            { value: "ZA", label: "South Africa" },
            { value: "GS", label: "South Georgia" },
            { value: "KR", label: "South Korea" },
            { value: "SS", label: "South Sudan" },
            { value: "ES", label: "Spain" },
            { value: "LK", label: "Sri Lanka" },
            { value: "SR", label: "Suriname" },
            { value: "SJ", label: "Svalbard and Jan Mayen" },
            { value: "SZ", label: "Swaziland" },
            { value: "SE", label: "Sweden" },
            { value: "CH", label: "Switzerland" },
            { value: "TW", label: "Taiwan" },
            { value: "TJ", label: "Tajikistan" },
            { value: "TZ", label: "Tanzania" },
            { value: "TH", label: "Thailand" },
            { value: "TL", label: "Timor-Leste" },
            { value: "TG", label: "Togo" },
            { value: "TK", label: "Tokelau" },
            { value: "TO", label: "Tonga" },
            { value: "TT", label: "Trinidad and Tobago" },
            { value: "TN", label: "Tunisia" },
            { value: "TR", label: "Turkey" },
            { value: "TM", label: "Turkmenistan" },
            { value: "TC", label: "Turks and Caicos Islands" },
            { value: "TV", label: "Tuvalu" },
            { value: "UG", label: "Uganda" },
            { value: "AE", label: "United Arab Emirates" },
            { value: "GB", label: "United Kingdom" },
            { value: "US", label: "United States" },
            { value: "UM", label: "United States Minor Outlying Islands" },
            { value: "VI", label: "United States Virgin Islands" },
            { value: "UY", label: "Uruguay" },
            { value: "UZ", label: "Uzbekistan" },
            { value: "VU", label: "Vanuatu" },
            { value: "VA", label: "Vatican City" },
            { value: "VE", label: "Venezuela" },
            { value: "VN", label: "Vietnam" },
            { value: "WF", label: "Wallis and Futuna" },
            { value: "EH", label: "Western Sahara" },
            { value: "YE", label: "Yemen" },
            { value: "ZM", label: "Zambia" },
            { value: "ZW", label: "Zimbabwe" }
          ]
          }
        />

        {/* Ques: Are applicants currently in Canada? */}
        <Dropdown
          label="Are applicants currently in Canada?"
          info={() => setShowInfoInCanada((prev) => !prev)}
          options={[
            { value: "", label: "Please select..." },
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />

      </div>


        {/* Textbox: Waiting Period Section */}
      <div className="mt-6 p-6 border border-[#DBDADE] bg-white rounded-lg">
        <h4 className="text-lg font-semibold mb-2">Waiting Period</h4>
        <p className="text-sm text-[#555]">
          If the applicant is already in Canada and the policy effective date is not the same as
          the arrival date, then a waiting period will apply. The standard waiting period is:
          <ul className="list-disc list-inside mt-2">
            <li>48 hours following the policy effective date, if purchased within 30 days of arrival.</li>
            <li>7 days following the policy effective date, if purchased after 30 days of arrival.</li>
          </ul>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 mt-10 text-gray-700">


      {/* Ques: Super Visa */}
      <Dropdown
          label="Are applicants travelling to Canada on a Super Visa?"
          info={() => setShowInfoSuperVisa((prev) => !prev)}
          options={[
            { value: "", label: "Please select..." },
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />

        

        {/* Destination Province */}
        <Dropdown
          label="Destination Province"
          info={() => setShowInfoDestinationProvince((prev) => !prev)}
          options={[
            { value: "", label: "Please select..." },
            { value: "ON", label: "Ontario" },
            { value: "BC", label: "British Columbia" },
            { value: "QC", label: "Quebec" },
            { value: "AB", label: "Alberta" },
            { value: "MB", label: "Manitoba" },
            { value: "NB", label: "New Brunswick" },
            { value: "NL", label: "Newfoundland and Labrador" },
            { value: "NT", label: "Northwest Territories" },
            { value: "NS", label: "Nova Scotia" },
            { value: "PE", label: "Prince Edward Island" },
            { value: "SK", label: "Saskatchewan" },
            { value: "YT", label: "Yukon Territories" },
          ]}
        />

        {/* Effective Date */}
        <TextInput label="Effective Date" type="date" />

        {/* Expiry Date */}
        <TextInput label="Expiry Date" type="date" />

        {/* Coverage Length */}
        <TextInput label="Coverage Length" disabled />

        {/* Policy Type */}
        <Dropdown
          label="Policy Type"
          info={() => setShowInfoPolicyType((prev) => !prev)}
          options={[
            { value: "", label: "Please select..." },
            { value: "standard", label: "Standard" },
            { value: "enhanced", label: "Enhanced" },
            { value: "premium", label: "Premium" },
          ]}
        />

        {/* Coverage Options */}
        <Dropdown
          label="Coverage Options"
          info={() => setShowInfoCoverageOption((prev) => !prev)}
          options={[
            { value: "", label: "Please select..." },
            { value: "25000", label: "$25,000.00 CAD" },
            { value: "50000", label: "$50,000.00 CAD" },
            { value: "100000", label: "$100,000.00 CAD" },
            { value: "150000", label: "$150,000.00 CAD" },
            { value: "500000", label: "$500,000.00 CAD" },
            { value: "1000000", label: "$1,000,000.00 CAD" },
          ]}
        />

        {/* Deductible */}
        <Dropdown
          label="Deductible"
          info={() => setShowInfoDeductible((prev) => !prev)}
          options={[
            { value: "", label: "Please select..." },
            { value: "0", label: "$0.00 CAD" },
            { value: "100", label: "$100.00 CAD" },
            { value: "250", label: "$250.00 CAD" },
            { value: "500", label: "$500.00 CAD" },
            { value: "1000", label: "$1,000.00 CAD" },
            { value: "3000", label: "$3,000.00 CAD" },
          ]}
        />
      </div>

      

      {/* Info Boxes */}
      {showInfoCountryOfOrigin && (
        <InfoBox title="Country of Origin" text="Country of Origin means the country for which the insured person holds a passport..." />
      )}
      {showInfoSuperVisa && (
        <InfoBox title="Super Visa" text="Select yes if this quote is for parents or grandparents of a Canadian citizen..." />
      )}
      {showInfoInCanada && (
        <InfoBox title="Currently in Canada?" text="If the applicant is already in Canada, select Yes." />
      )}
      {showInfoDestinationProvince && (
        <InfoBox title="Destination Province" text="Select the primary destination Province for your trip." />
      )}
      {showInfoPolicyType && (
        <InfoBox title="Policy Type" text="Description of the policy types available including their benefits..." />
      )}
      {showInfoCoverageOption && (
        <InfoBox title="Coverage Options" text="This is the maximum amount that will be covered for eligible medical expenses." />
      )}
      {showInfoDeductible && (
        <InfoBox title="Deductible" text="Deductible means the amount (if applicable) which the insured must pay before any reimbursement." />
      )}
    </div>
  );
}

// Dropdown Component
const Dropdown = ({
  label,
  info,
  options,
}: {
  label: string;
  info?: () => void;
  options: { value: string; label: string }[];
}) => (
  <div className="flex flex-col gap-2">
    <label className="flex items-center gap-2">
      {info && (
        <InformationCircleIcon onClick={info} className="h-5 w-5 text-[#3a17c5] cursor-pointer" />
      )}
      {label}
    </label>
    <select className="p-2 border border-[#DBDADE] bg-white text-[#00000080]">
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// Text Input Component
const TextInput = ({
  label,
  type = "text",
  disabled = false,
}: {
  label: string;
  type?: string;
  disabled?: boolean;
}) => (
  <div className="flex flex-col gap-2">
    <label>{label}</label>
    <input
      type={type}
      className="p-2 border border-[#DBDADE] bg-white"
      disabled={disabled}
    />
  </div>
);

// InfoBox
const InfoBox = ({ title, text }: { title: string; text: string }) => (
  <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-200 mt-5 mb-5">
    <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-t-lg">{title}</h2>
    <div className="p-4 text-gray-700">
      <p>{text}</p>
    </div>
  </div>
);
