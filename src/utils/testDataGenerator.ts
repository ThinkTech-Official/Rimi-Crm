import { addDays, subYears } from "date-fns";

const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "George", "Hannah"];
const lastNames = ["Smith", "Doe", "Johnson", "Brown", "Taylor", "Miller", "Wilson", "Moore", "Anderson", "Thomas"];
const provinces = ["Ontario", "British Columbia", "Quebec", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick", "Prince Edward Island", "Newfoundland and Labrador"];
const genders = ["Male", "Female"];
const commonCountries = ["IN", "CA", "US", "GB", "AU", "CN", "FR", "DE", "BR", "MX"];

// Mirrors toLocalIsoDate from dateUtils — this is the actual value format DatePicker emits via onChange
const toLocalIsoDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const generateTestData = (productName?: string) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

  const additionalFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const additionalEmail = `${additionalFirstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

  const isVisitors = productName === "SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL" || productName === "Secure Travel RIMI Visitors to Canada Travel";
  const isSuperVisa = isVisitors; // Defaulting visitors to super visa as requested for testing

  const coverageDays = isSuperVisa ? 365 : 21; // Super visa is typically 1 year
  const daysFromToday = 2; // Custom variable for start date offset (e.g., today + 2 days)
  const addressCountry = commonCountries[Math.floor(Math.random() * commonCountries.length)];

  // DOB: between 18 and 60 years old
  const dob = toLocalIsoDate(subYears(new Date(), 18 + Math.floor(Math.random() * 42)));

  // Effective date logic
  let effectiveDate = addDays(new Date(), 1 + Math.floor(Math.random() * 10));

  // Specific override for Visitors product as requested
  if (isVisitors) {
    effectiveDate = addDays(new Date(), daysFromToday);
  }

  const effectiveDateStr = toLocalIsoDate(effectiveDate);

  // Expiry date: effective + coverageDays (or random 30-365 days for other products)
  let expiryDate: Date;
  if (isVisitors) {
    expiryDate = addDays(effectiveDate, coverageDays - 1);
  } else {
    expiryDate = addDays(effectiveDate, 30 + Math.floor(Math.random() * 335));
  }

  const expiryDateStr = toLocalIsoDate(expiryDate);

  const coverageLength = String(Math.floor((expiryDate.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  let policyType = "Single";
  if (isVisitors) {
    policyType = Math.random() > 0.5 ? "standard" : "enhanced";
  } else if (productName?.includes("Canuck Voyage")) {
    policyType = "Single Trip";
  }

  const data: any = {
    primaryFirstName: firstName,
    primaryLastName: lastName,
    primaryDateOfBirth: dob,
    primaryEmail: email,
    primaryApplicantGender: genders[Math.floor(Math.random() * genders.length)],
    countryOfOrigin: commonCountries[Math.floor(Math.random() * commonCountries.length)],
    destinationProvince: provinces[Math.floor(Math.random() * provinces.length)],
    provinceOfResidence: provinces[Math.floor(Math.random() * provinces.length)],
    effectiveDate: effectiveDateStr,
    expiryDate: expiryDateStr,
    coverageLength: coverageLength,
    policyType: policyType,
    applicantNumber: 1,
    applicants: [
      {
        index: "1",
        firstName: additionalFirstName,
        lastName: lastName,
        dob: toLocalIsoDate(subYears(new Date(), 5 + Math.floor(Math.random() * 15))),
        relationship: "Dependent Child",
        gender: genders[Math.floor(Math.random() * genders.length)],
        email: additionalEmail,
        preMedCoverage: false,
        healthQuestionnaire: {
          questions: [],
        },
      }
    ],
    isConfirmed: true,
    address: {
      addressLine1: `${Math.floor(Math.random() * 9000) + 100} Main St`,
      addressLine2: "Apt 4B",
      city: "Toronto",
      postalCode: "M5V 2L7",
      country: addressCountry,
      province: provinces[Math.floor(Math.random() * provinces.length)],
    },
    contactInfo: {
      email: email,
      additionalEmail: `backup.${email}`,
      phoneNumber: "4165550199",
    },
    beneficiary: {
      beneficiaryName: `${firstName}'s Family`,
      relationshipToInsured: "Family",
    },
  };

  if (productName === "SECURE_TRAVEL_RIMI_VISITORS_TO_CANADA_TRAVEL") {
    data.coverageOption = "100000";
    data.deductible = "0";
    data.inCanada = "no";
    data.superVisa = "yes";
    data.superVisaYears = "1";
    data.paymentOption = "monthly-installments";
  }

  if (productName === "RIMI_CANUCK_VOYAGE_NON_MEDICAL_TRAVEL") {
    data.tripCost = 1000;
    data.dateBooked = toLocalIsoDate(new Date());
    data.destinationCountry = "Canada";
  }

  if (productName === "RIMI_CANUCK_VOYAGE_TRAVEL_MEDICAL") {
    data.destinationCountry = "Cuba";
    data.travelingThroughUS = "no";
    data.deductible = 0;
  }

  return data;
};