import {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  FC,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { CanadaStates } from "./Constants";

type SuperVisaOption = "" | "yes" | "no";
type SuperVisaYears = "" | "1";
type YesNo = "" | "yes" | "no";

const msPerDay = 1000 * 60 * 60 * 24;

const today = new Date().toISOString().slice(0, 10);

const allCoverageOptions = [
  { value: "", label: "Please select" },
  { value: "25000", label: "$25,000.00 CAD" },
  { value: "50000", label: "$50,000.00 CAD" },
  { value: "100000", label: "$100,000.00 CAD" },
  { value: "150000", label: "$150,000.00 CAD" },
  { value: "500000", label: "$500,000.00 CAD" },
  { value: "1000000", label: "$1,000,000.00 CAD" },
];

export default function CoverageInformation() {
  const { t } = useLanguage();
  const [showInfoCountryOfOrigin, setShowInfoCountryOfOrigin] = useState(false);
  const [showInfoSuperVisa, setShowInfoSuperVisa] = useState(false);
  const [showInfoInCanada, setShowInfoInCanada] = useState(false);
  const [showInfoDestinationProvince, setShowInfoDestinationProvince] =
    useState(false);
  const [showInfoPolicyType, setShowInfoPolicyType] = useState(false);
  const [showInfoCoverageOption, setShowInfoCoverageOption] = useState(false);
  const [showInfoDeductible, setShowInfoDeductible] = useState(false);
  const [showInfoPaymentOption, setShowInfoPaymentOption] = useState(false);

  // --- State ---
  const [superVisa, setSuperVisa] = useState<SuperVisaOption>("");
  const [superVisaYears, setSuperVisaYears] = useState<SuperVisaYears>("");
  const [destinationProvince, setDestinationProvince] = useState<string>("");
  const [effectiveDate, setEffectiveDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [coverageLength, setCoverageLength] = useState<string>("");

  const [inCanada, setInCanada] = useState<YesNo>("");

  const [paymentOption, setPaymentOption]     = useState<'lump-sum' | 'monthly-installments'>('lump-sum')
  // const [showPaymentOption, setShowPaymentOption] = useState(false)

  const svOptions = allCoverageOptions.filter((o) =>
    ["100000", "150000", "500000", "1000000"].includes(o.value)
  );

  const coverageOptions = superVisa === "yes" ? svOptions : allCoverageOptions;

  //
  const [coverageOption, setCoverageOption] = useState<string>("");

  // --- auto-calculate for Super Visa yes ---
  useEffect(() => {
    if (superVisa === "yes" && superVisaYears && effectiveDate) {
      const eff = new Date(effectiveDate);
      const exp = new Date(eff);
      exp.setFullYear(eff.getFullYear() + Number(superVisaYears));
      const days = Math.round((exp.getTime() - eff.getTime()) / msPerDay) ;

      setExpiryDate(exp.toISOString().slice(0, 10));
      setCoverageLength(String(days));
    }
  }, [superVisa, superVisaYears, effectiveDate]);

  const showPaymentOption =
  superVisa === 'yes' ||
  (
    superVisa === 'no' &&
    Number(coverageLength) >= 365 &&
    Number(coverageOption) >= 100000
  )

   // when it hides, reset back to lump-sum
   useEffect(() => {
    if (!showPaymentOption) setPaymentOption('lump-sum')
  }, [showPaymentOption])

  const paymentOptions = [
    { value: 'lump-sum',            label: t('Lump Sum') },
    // only include monthly‐installments if coverageOption > 100k
    ...(Number(coverageOption) >= 100000
      ? [{ value: 'monthly-installments', label: t('Monthly Installments') }]
      : []),
  ]

  // --- Handlers ---
  const handleSuperVisaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSuperVisa(e.target.value as SuperVisaOption);
    setSuperVisaYears("");
    setExpiryDate("");
    setCoverageLength("");
    // setShowPaymentOption(false)
  };
  const handleYearsChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSuperVisaYears(e.target.value as SuperVisaYears);
  const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setDestinationProvince(e.target.value);
  const handleEffectiveDateChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEffectiveDate(e.target.value);
  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setExpiryDate(val);
    if (effectiveDate) {
      const diff = Math.round(
        (new Date(val).getTime() - new Date(effectiveDate).getTime()) / msPerDay
      ) + 1;
      setCoverageLength(String(diff));
    }
  };
  const handleCoverageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCoverageLength(val);
    if (effectiveDate) {
      const exp = new Date(
        new Date(effectiveDate).getTime() + (Number(val) - 1) * msPerDay
      );
      setExpiryDate(exp.toISOString().slice(0, 10));
    }
  };

  const handleInCanadaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInCanada(e.target.value as YesNo);
  };

  const handleCoverageOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCoverageOption(e.target.value);
  };

  const handlePaymentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPaymentOption(e.target.value as any)
  }

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9] font-[inter] text-[#1B1B1B]">
      <h3 className="text-xl font-bold text-left mb-6">{t("Coverage Information")}</h3>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
        {/* Country of Origin */}
        <Dropdown
          label={t("Country of Origin")}
          info={() => setShowInfoCountryOfOrigin((prev) => !prev)}
          options={[
            { value: "", label: t("Please select") },
            { value: "Afghanistan", label: "Afghanistan" },
            { value: "Åland Islands", label: "Åland Islands" },
            { value: "Albania", label: "Albania" },
            { value: "Algeria", label: "Algeria" },
            { value: "American Samoa", label: "American Samoa" },
            { value: "Andorra", label: "Andorra" },
            { value: "Angola", label: "Angola" },
            { value: "Anguilla", label: "Anguilla" },
            { value: "Antarctica", label: "Antarctica" },
            { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
            { value: "Argentina", label: "Argentina" },
            { value: "Armenia", label: "Armenia" },
            { value: "Aruba", label: "Aruba" },
            { value: "Australia", label: "Australia" },
            { value: "Austria", label: "Austria" },
            { value: "Azerbaijan", label: "Azerbaijan" },
            { value: "Bahamas", label: "Bahamas" },
            { value: "Bahrain", label: "Bahrain" },
            { value: "Bangladesh", label: "Bangladesh" },
            { value: "Barbados", label: "Barbados" },
            { value: "Belarus", label: "Belarus" },
            { value: "Belgium", label: "Belgium" },
            { value: "Belize", label: "Belize" },
            { value: "Benin", label: "Benin" },
            { value: "Bermuda", label: "Bermuda" },
            { value: "Bhutan", label: "Bhutan" },
            { value: "Bolivia", label: "Bolivia" },
            { value: "Bonaire, Sint Eustatius and Saba", label: "Bonaire, Sint Eustatius and Saba" },
            { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
            { value: "Botswana", label: "Botswana" },
            { value: "Bouvet Island", label: "Bouvet Island" },
            { value: "Brazil", label: "Brazil" },
            { value: "British Indian Ocean Territory", label: "British Indian Ocean Territory" },
            { value: "British Virgin Islands", label: "British Virgin Islands" },
            { value: "Brunei", label: "Brunei" },
            { value: "Bulgaria", label: "Bulgaria" },
            { value: "Burkina Faso", label: "Burkina Faso" },
            { value: "Burundi", label: "Burundi" },
            { value: "Cambodia", label: "Cambodia" },
            { value: "Cameroon", label: "Cameroon" },
            { value: "Canada", label: "Canada" },
            { value: "Cape Verde", label: "Cape Verde" },
            { value: "Cayman Islands", label: "Cayman Islands" },
            { value: "Central African Republic", label: "Central African Republic" },
            { value: "Chad", label: "Chad" },
            { value: "Chile", label: "Chile" },
            { value: "China", label: "China" },
            { value: "Christmas Island", label: "Christmas Island" },
            { value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands" },
            { value: "Colombia", label: "Colombia" },
            { value: "Comoros", label: "Comoros" },
            { value: "Cook Islands", label: "Cook Islands" },
            { value: "Costa Rica", label: "Costa Rica" },
            { value: "Croatia", label: "Croatia" },
            { value: "Curaçao", label: "Curaçao" },
            { value: "Cyprus", label: "Cyprus" },
            { value: "Czech Republic", label: "Czech Republic" },
            { value: "Denmark", label: "Denmark" },
            { value: "Djibouti", label: "Djibouti" },
            { value: "Dominica", label: "Dominica" },
            { value: "Dominican Republic", label: "Dominican Republic" },
            { value: "DR Congo", label: "DR Congo" },
            { value: "Ecuador", label: "Ecuador" },
            { value: "Egypt", label: "Egypt" },
            { value: "El Salvador", label: "El Salvador" },
            { value: "Equatorial Guinea", label: "Equatorial Guinea" },
            { value: "Eritrea", label: "Eritrea" },
            { value: "Estonia", label: "Estonia" },
            { value: "Ethiopia", label: "Ethiopia" },
            { value: "Falkland Islands", label: "Falkland Islands" },
            { value: "Faroe Islands", label: "Faroe Islands" },
            { value: "Fiji", label: "Fiji" },
            { value: "Finland", label: "Finland" },
            { value: "France", label: "France" },
            { value: "French Guiana", label: "French Guiana" },
            { value: "French Polynesia", label: "French Polynesia" },
            { value: "French Southern and Antarctic Lands", label: "French Southern and Antarctic Lands" },
            { value: "Gabon", label: "Gabon" },
            { value: "Gambia", label: "Gambia" },
            { value: "Georgia", label: "Georgia" },
            { value: "Germany", label: "Germany" },
            { value: "Ghana", label: "Ghana" },
            { value: "Gibraltar", label: "Gibraltar" },
            { value: "Greece", label: "Greece" },
            { value: "Greenland", label: "Greenland" },
            { value: "Grenada", label: "Grenada" },
            { value: "Guadeloupe", label: "Guadeloupe" },
            { value: "Guam", label: "Guam" },
            { value: "Guatemala", label: "Guatemala" },
            { value: "Guernsey", label: "Guernsey" },
            { value: "Guinea", label: "Guinea" },
            { value: "Guinea-Bissau", label: "Guinea-Bissau" },
            { value: "Guyana", label: "Guyana" },
            { value: "Haiti", label: "Haiti" },
            { value: "Heard Island and McDonald Islands", label: "Heard Island and McDonald Islands" },
            { value: "Honduras", label: "Honduras" },
            { value: "Hong Kong", label: "Hong Kong" },
            { value: "Hungary", label: "Hungary" },
            { value: "Iceland", label: "Iceland" },
            { value: "India", label: "India" },
            { value: "Indonesia", label: "Indonesia" },
            { value: "Iraq", label: "Iraq" },
            { value: "Ireland", label: "Ireland" },
            { value: "Isle of Man", label: "Isle of Man" },
            { value: "Israel", label: "Israel" },
            { value: "Italy", label: "Italy" },
            { value: "Ivory Coast", label: "Ivory Coast" },
            { value: "Jamaica", label: "Jamaica" },
            { value: "Japan", label: "Japan" },
            { value: "Jersey", label: "Jersey" },
            { value: "Jordan", label: "Jordan" },
            { value: "Kazakhstan", label: "Kazakhstan" },
            { value: "Kenya", label: "Kenya" },
            { value: "Kiribati", label: "Kiribati" },
            { value: "Kosovo", label: "Kosovo" },
            { value: "Kuwait", label: "Kuwait" },
            { value: "Kyrgyzstan", label: "Kyrgyzstan" },
            { value: "Laos", label: "Laos" },
            { value: "Latvia", label: "Latvia" },
            { value: "Lebanon", label: "Lebanon" },
            { value: "Lesotho", label: "Lesotho" },
            { value: "Liberia", label: "Liberia" },
            { value: "Libya", label: "Libya" },
            { value: "Liechtenstein", label: "Liechtenstein" },
            { value: "Lithuania", label: "Lithuania" },
            { value: "Luxembourg", label: "Luxembourg" },
            { value: "Macau", label: "Macau" },
            { value: "Macedonia", label: "Macedonia" },
            { value: "Madagascar", label: "Madagascar" },
            { value: "Malawi", label: "Malawi" },
            { value: "Malaysia", label: "Malaysia" },
            { value: "Maldives", label: "Maldives" },
            { value: "Mali", label: "Mali" },
            { value: "Malta", label: "Malta" },
            { value: "Marshall Islands", label: "Marshall Islands" },
            { value: "Martinique", label: "Martinique" },
            { value: "Mauritania", label: "Mauritania" },
            { value: "Mauritius", label: "Mauritius" },
            { value: "Mayotte", label: "Mayotte" },
            { value: "Mexico", label: "Mexico" },
            { value: "Micronesia", label: "Micronesia" },
            { value: "Moldova", label: "Moldova" },
            { value: "Monaco", label: "Monaco" },
            { value: "Mongolia", label: "Mongolia" },
            { value: "Montenegro", label: "Montenegro" },
            { value: "Montserrat", label: "Montserrat" },
            { value: "Morocco", label: "Morocco" },
            { value: "Mozambique", label: "Mozambique" },
            { value: "Myanmar", label: "Myanmar" },
            { value: "Namibia", label: "Namibia" },
            { value: "Nauru", label: "Nauru" },
            { value: "Nepal", label: "Nepal" },
            { value: "Netherlands", label: "Netherlands" },
            { value: "New Caledonia", label: "New Caledonia" },
            { value: "New Zealand", label: "New Zealand" },
            { value: "Nicaragua", label: "Nicaragua" },
            { value: "Niger", label: "Niger" },
            { value: "Nigeria", label: "Nigeria" },
            { value: "Niue", label: "Niue" },
            { value: "Norfolk Island", label: "Norfolk Island" },
            { value: "Northern Mariana Islands", label: "Northern Mariana Islands" },
            { value: "Norway", label: "Norway" },
            { value: "Oman", label: "Oman" },
            { value: "Pakistan", label: "Pakistan" },
            { value: "Palau", label: "Palau" },
            { value: "Palestine", label: "Palestine" },
            { value: "Panama", label: "Panama" },
            { value: "Papua New Guinea", label: "Papua New Guinea" },
            { value: "Paraguay", label: "Paraguay" },
            { value: "Peru", label: "Peru" },
            { value: "Philippines", label: "Philippines" },
            { value: "Pitcairn Islands", label: "Pitcairn Islands" },
            { value: "Poland", label: "Poland" },
            { value: "Portugal", label: "Portugal" },
            { value: "Puerto Rico", label: "Puerto Rico" },
            { value: "Qatar", label: "Qatar" },
            { value: "Republic of the Congo", label: "Republic of the Congo" },
            { value: "Réunion", label: "Réunion" },
            { value: "Romania", label: "Romania" },
            { value: "Rwanda", label: "Rwanda" },
            { value: "Saint Barthélemy", label: "Saint Barthélemy" },
            { value: "Saint Helena", label: "Saint Helena" },
            { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
            { value: "Saint Lucia", label: "Saint Lucia" },
            { value: "Saint Martin", label: "Saint Martin" },
            { value: "Saint Pierre and Miquelon", label: "Saint Pierre and Miquelon" },
            { value: "Saint Vincent and the Grenadines", label: "Saint Vincent and the Grenadines" },
            { value: "Samoa", label: "Samoa" },
            { value: "San Marino", label: "San Marino" },
            { value: "São Tomé and Príncipe", label: "São Tomé and Príncipe" },
            { value: "Saudi Arabia", label: "Saudi Arabia" },
            { value: "Senegal", label: "Senegal" },
            { value: "Serbia", label: "Serbia" },
            { value: "Seychelles", label: "Seychelles" },
            { value: "Sierra Leone", label: "Sierra Leone" },
            { value: "Singapore", label: "Singapore" },
            { value: "Sint Maarten", label: "Sint Maarten" },
            { value: "Slovakia", label: "Slovakia" },
            { value: "Slovenia", label: "Slovenia" },
            { value: "Solomon Islands", label: "Solomon Islands" },
            { value: "Somalia", label: "Somalia" },
            { value: "South Africa", label: "South Africa" },
            { value: "South Georgia", label: "South Georgia" },
            { value: "South Korea", label: "South Korea" },
            { value: "South Sudan", label: "South Sudan" },
            { value: "Spain", label: "Spain" },
            { value: "Sri Lanka", label: "Sri Lanka" },
            { value: "Suriname", label: "Suriname" },
            { value: "Svalbard and Jan Mayen", label: "Svalbard and Jan Mayen" },
            { value: "Swaziland", label: "Swaziland" },
            { value: "Sweden", label: "Sweden" },
            { value: "Switzerland", label: "Switzerland" },
            { value: "Taiwan", label: "Taiwan" },
            { value: "Tajikistan", label: "Tajikistan" },
            { value: "Tanzania", label: "Tanzania" },
            { value: "Thailand", label: "Thailand" },
            { value: "Timor-Leste", label: "Timor-Leste" },
            { value: "Togo", label: "Togo" },
            { value: "Tokelau", label: "Tokelau" },
            { value: "Tonga", label: "Tonga" },
            { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
            { value: "Tunisia", label: "Tunisia" },
            { value: "Turkey", label: "Turkey" },
            { value: "Turkmenistan", label: "Turkmenistan" },
            { value: "Turks and Caicos Islands", label: "Turks and Caicos Islands" },
            { value: "Tuvalu", label: "Tuvalu" },
            { value: "Uganda", label: "Uganda" },
            { value: "United Arab Emirates", label: "United Arab Emirates" },
            { value: "United Kingdom", label: "United Kingdom" },
            { value: "United States", label: "United States" },
            { value: "United States Minor Outlying Islands", label: "United States Minor Outlying Islands" },
            { value: "United States Virgin Islands", label: "United States Virgin Islands" },
            { value: "Uruguay", label: "Uruguay" },
            { value: "Uzbekistan", label: "Uzbekistan" },
            { value: "Vanuatu", label: "Vanuatu" },
            { value: "Vatican City", label: "Vatican City" },
            { value: "Venezuela", label: "Venezuela" },
            { value: "Vietnam", label: "Vietnam" },
            { value: "Wallis and Futuna", label: "Wallis and Futuna" },
            { value: "Western Sahara", label: "Western Sahara" },
            { value: "Yemen", label: "Yemen" },
            { value: "Zambia", label: "Zambia" },
            { value: "Zimbabwe", label: "Zimbabwe" },
          ]}
        />

        {/* Ques: Are applicants currently in Canada? */}
        
        <Dropdown
          label={t("Are applicants currently in Canada?")}
          info={() => setShowInfoInCanada((prev) => !prev)}
          options={[
            { value: "", label: t("Please select") },
            { value: "yes", label: t("Yes") },
            { value: "no", label: t("No") },
          ]}
          value={inCanada}
          onChange={handleInCanadaChange}
        />
      </div>
      {showInfoCountryOfOrigin && (
        <InfoBox
          title={t("Country of Origin")}
          text={t("Country of Origin means the country for which the insured person holds a passport...")}
        />
      )}
      {showInfoInCanada && (
        <InfoBox
          title={t("Currently in Canada?")}
          text={t("If the applicant is already in Canada, select Yes.")}
        />
      )}

      {/* Waiting Period Section */}
      {inCanada === "yes" && (
        <div className="mt-6 p-6 border border-[#DBDADE] bg-white rounded-lg">
          <h4 className="text-lg font-semibold mb-2">{t("Waiting Period")}</h4>
          <p className="text-sm text-[#555]">
            {t("If the applicant is already in Canada and the policy effective date is not the same as the arrival date, then a waiting period will apply. The standard waiting period is:")}
            <ul className="list-disc list-inside mt-2">
              <li>
                {t("48 hours following the policy effective date, if purchased within 30 days of arrival.")}
              </li>
              <li>
                {t("7 days following the policy effective date, if purchased after 30 days of arrival.")}
              </li>
            </ul>
          </p>
        </div>
      )}

      

      {/* ////////////////////////////////////////////////////////// */}

      <>
        {/* SuperVisa + DestinationProvince */}
        <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 mt-10">
          <Dropdown
            label={t("Are applicants travelling to Canada on a Super Visa?")}
            info={() => setShowInfoSuperVisa((prev) => !prev)}
            options={[
              { value: "", label: t("Please select") },
              { value: "yes", label: t("Yes") },
              { value: "no", label: t("No") },
            ]}
            value={superVisa}
            onChange={handleSuperVisaChange}
          />

          <Dropdown
            label={t("Destination Province")}
            info={() => setShowInfoDestinationProvince((prev) => !prev)}
            options={CanadaStates.map(opt => ({ ...opt, label: t(opt.label) }))}
            value={destinationProvince}
            onChange={handleProvinceChange}
          />
        </div>

        {showInfoSuperVisa && (
          <InfoBox
            title={t("Super Visa")}
            text={t("Select yes if this quote is for parents or grandparents of a Canadian citizen...")}
          />
        )}
        {showInfoDestinationProvince && (
          <InfoBox
            title={t("Destination Province")}
            text={t("Select the primary destination Province for your trip.")}
          />
        )}

        {/*  Optional Duration if Super Visa = yes  */}
        {superVisa === "yes" && (
          <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 mt-6">
            <Dropdown
              label={t("Super Visa Duration")}
              options={[
                { value: "", label: t("Please select") },
                { value: "1", label: t("1 year") },
              ]}
              value={superVisaYears}
              onChange={handleYearsChange}
            />
          </div>
        )}

        {/*  Next Rows: Dates & Coverage  */}
        <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 mt-10">
          <TextInput
            label={t("Effective Date")}
            type="date"
            min={today}
            value={effectiveDate}
            onChange={handleEffectiveDateChange}
          />
          <TextInput
            label={t("Expiry Date")}
            type="date"
            value={expiryDate}
            disabled={superVisa === "yes"}
            min={effectiveDate || today}
            onChange={handleExpiryChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 mt-10">
          <TextInput
            label={t("Coverage Length (days)")}
            type="number"
            value={coverageLength}
            disabled={superVisa === "yes"}
            min="1"
            onChange={handleCoverageChange}
          />
          <Dropdown
            label={t("Policy Type")}
            info={() => setShowInfoPolicyType((prev) => !prev)}
            options={[
              { value: "", label: t("Please select") },
              { value: "standard", label: t("Standard") },
              { value: "enhanced", label: t("Enhanced") },
              // { value: 'premium',  label: 'Premium' },
            ]}
            
          />
        </div>
      </>

      {/* //////////////////////////////////////////////////////////// */}

      {showInfoPolicyType && (
        <InfoBox
          title={t("Policy Type")}
          text={t("Description of the policy types available including their benefits...")}
        />
      )}

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 mt-10">
        {/* Coverage Options */}
        <Dropdown
          label={t("Coverage Options")}
          info={() => setShowInfoCoverageOption((prev) => !prev)}
          options={coverageOptions.map(opt => ({ ...opt, label: t(opt.label) }))}
          value={coverageOption}
          onChange={handleCoverageOptionChange}
        />

        {/* Deductible */}
        <Dropdown
          label={t("Deductible")}
          info={() => setShowInfoDeductible((prev) => !prev)}
          options={[
            { value: "", label: t("Please select") },
            { value: "0", label: t("$0.00 CAD") },
            { value: "100", label: t("$100.00 CAD") },
            { value: "250", label: t("$250.00 CAD") },
            { value: "500", label: t("$500.00 CAD") },
            { value: "1000", label: t("$1,000.00 CAD") },
            { value: "3000", label: t("$3,000.00 CAD") },
          ]}
        />
        {/* </div> */}
      </div>

      {/* Info Boxes */}

      {showInfoCoverageOption && (
        <InfoBox
          title={t("Coverage Options")}
          text={t("This is the maximum amount that will be covered for eligible medical expenses.")}
        />
      )}
      {showInfoDeductible && (
        <InfoBox
          title={t("Deductible")}
          text={t("Deductible means the amount (if applicable) which the insured must pay before any reimbursement.")}
        />
      )}
      {/*  */}

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700 mt-10">

      
          {showPaymentOption && (
        
          <Dropdown
            label={t("Payment Option")}
            info={() => setShowInfoPaymentOption(prev => !prev)}
            options={paymentOptions}
            value={paymentOption}
            onChange={handlePaymentChange}
          />
        
      )}

      </div>
      {showInfoPaymentOption && (
        <InfoBox
          title={t("Payment Option")}
          text={t("Monthly payment installments are available when applying for one year of coverage, with a minimum Coverage Option of $100,000.")}
        />
      )}


      {/*  */}
    </div>
  );
}

interface Option {
  value: string;
  label: string;
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  info?: () => void;
  options: Option[];
}



const Dropdown: FC<DropdownProps> = ({
  label,
  info,
  options,
  className = "",
  ...selectProps
}) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-gray-700">
        {info && (
          <InformationCircleIcon
            onClick={info}
            className="h-5 w-5 text-[#3a17c5] cursor-pointer"
          />
        )}
        {label}
      </label>
      <select
        {...selectProps}
        className={`p-2 border border-[#DBDADE] bg-white text-[#00000080] ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {t(opt.label)}
          </option>
        ))}
      </select>
    </div>
  );
};


interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  info?: () => void;
}
const TextInput: FC<TextInputProps> = ({
  label,
  info,
  className = "",
  ...inputProps
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-gray-700">{label}</label>
    {info && (
      <button
        type="button"
        onClick={info}
        className="self-start text-sm text-blue-500"
      >
        ℹ️
      </button>
    )}
    <input
      {...inputProps}
      className={`p-2 border border-[#DBDADE] bg-white ${className}`}
    />
  </div>
);

// InfoBox
const InfoBox = ({ title, text }: { title: string; text: string }) => (
  <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-200 mt-5 mb-5">
    <h2 className="text-lg font-semibold bg-gray-100 px-4 py-2 rounded-t-lg">
      {title}
    </h2>
    <div className="p-4 text-gray-700">
      <p>{text}</p>
    </div>
  </div>
);
