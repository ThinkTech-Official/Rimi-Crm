import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ApplicantInformation from "./step1/ApplicantInformation";
import CoverageInformation from "./step1/CoverageInformation";
import YourQuoteSummary from "./step2/YourQuoteSummary";
import ApplicantInformationFinished from "./step2/ApplicantInformationFinished";
import ContactInformation from "./step2/ContactInformation";
import Address from "./step2/Address";
import BeneficiaryInCaseOfDeath from "./step2/BeneficiaryInCaseOfDeath";
import PaymentInformation from "./step2/PaymentInformation";
import Step1STRVCT from "./step1/Step1STRVCT";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useSaveQuoteNext } from "../../../hooks/useSaveQuoteNext";
import { useQuoteUpdate, Stage2Payload } from "../../../hooks/useQuoteUpdate";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from "../../../utils/stripe";
import Summary from "./step3/Summary";

type SuperVisaOption = "" | "yes" | "no";
type SuperVisaYears = "" | "1" | "2";
type YesNo = "" | "yes" | "no";

interface Applicant {
  index: string;
  firstName: string;
  lastName: string;
  dob: string;
  relationship: string;
  preMedCoverage: boolean;
  gender: string;
}

interface QuoteStage1Response {
  quoteId: string;
  quoteNumber: string;
  effectiveDate: string; // ISO string
  expiryDate: string; // ISO string
  coverageLength: number;
  numberOfTravellers: number;
  policyType: string;
  coverageLimit: string; // matches Prisma model
  deductible: number;
  destinationProvince: string;
  quoteAmount: number;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;
  preExMedCov: string;
  email: string;
  applicants: Applicant[];
}

interface ContactInfo {
  additionalEmail: string;
  phoneNumber: string;
}

interface BeneficiaryInfo {
  beneficiaryName: string;
  relationshipToInsured: string;
}

const productName = 'Secure Travel RIMI Visitors to Canada Travel'

export default function SecureTravelRIMIVisitorstoCanadaTravel() {
  const agentCode = useSelector((state: RootState) => state.auth.agentCode);

  const [primaryFirstName, setPrimaryFirstName] = useState("");
  const [primaryLastName, setPrimaryLastName] = useState("");
  const [primaryDateOfBirth, setPrimaryDateOfBirth] = useState("");
  const [primaryEmail, setprimaryEmail] = useState("");
  const [applicantNumber, setApplicantNumber] = useState(0);

  const [coverageForPreMedCon, setCoverageForPreMedCon] = useState(false);

  const [isConfirmed, setIsConfirmed] = useState(false);

  const [primaryApplicantGender, setPrimaryApplicantGender] = useState("");

  ////////////////////////

  const [superVisa, setSuperVisa] = useState<SuperVisaOption>("");
  const [superVisaYears, setSuperVisaYears] = useState<SuperVisaYears>("");
  const [destinationProvince, setDestinationProvince] = useState<string>("");
  const [effectiveDate, setEffectiveDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [coverageLength, setCoverageLength] = useState<string>("");

  const [inCanada, setInCanada] = useState<YesNo>("");

  const [paymentOption, setPaymentOption] = useState<
    "lump-sum" | "monthly-installments"
  >("lump-sum");
  // const [showPaymentOption, setShowPaymentOption] = useState(false)

  const [policyType, setPolicyType] = useState<string>("");

  const [deductible, setDeductible] = useState<number>(0);

  const [countryOfOrigin, setCountryOfOrigin] = useState<string>("");

  const [coverageOption, setCoverageOption] = useState<string>("");
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  //////////////////////////

  /////////////////////////////

  const [quoteNumber, setQuoteNumber] = useState<string | null>(null);

  // const [step1ResponseData, setStep1ResponseData] = useState<QuoteStage1Response | null>(null);

  const [step1ResponseData, setStep1ResponseData] =
    useState<QuoteStage1Response | null>(null);

  /////////////////////////////////

   const [totalPremium, setTotalPremium] = useState<number>(0);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let monthlyAmount: number | undefined = undefined;
let remainingInstallments: number | undefined = undefined;


const stripeProductId = "prod_SRGSLGPsB7SQxy";


// If the user picked monthly‐installments and the backend schedule array is in the
// form [ {…Policy Issue Fee…}, {…Total Initial Payment…}, { label: "Monthly Installment of", amount: ###, count: N}, … ]
if (paymentOption === "monthly-installments" && schedule.length >= 3) {
  // schedule[2] is guaranteed (by your backend) to be
  // { label: "Monthly Installment of", amount: X, count: Y }
  monthlyAmount = schedule[2].amount;            // e.g. 96.69
  remainingInstallments = schedule[2].count;     // e.g. 10
}

  ///--------------------------------------- Stage 2 -------------------------------------

  // const [addressLine1,setAddressLine1] = useState<string>('')
  // const [addressLine2, setAddressLine2] = useState<string>('')

  // const [city,setCity] = useState<string>('')
  // const [postalCode, setPostalCode] = useState<string>('')
  // const [country,setCountry] = useState<string>('')

  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    province: "",
  });

  {/* const shipping = {
  name: 'Jane Doe',
  address: {
    line1: '123 Main St',
    line2: 'Apt. 4B',    // optional
    city: 'Mumbai',
    state: 'MH',
    postal_code: '400001',
    country: 'IN',
  },
}; */}

  const [beneficiary, setBeneficiary] = useState<BeneficiaryInfo>({
    beneficiaryName: "",
    relationshipToInsured: "",
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    additionalEmail: "",
    phoneNumber: "",
  });

  // const [benifitiaryName, setBenifitaryName] = useState<string>('')
  // const [relationshipToInsured, setRelationshipToInsured] = useState<string>('')

  //-----------------------------------------------------------------------------------------

  const [steps, setSteps] = useState([
    { id: "01", name: "Get Quote", href: "#", status: "current" },
    { id: "02", name: "Complete Application", href: "#", status: "upcoming" },
    { id: "03", name: "Confirmation", href: "#", status: "upcoming" },
  ]);

  const [formStep, setFormStep] = useState(1);

  const [isStepOneFilled, setIsStepOneFilled] = useState(false);

  // const {
  //   saveQuoteNext,
  //   loading: saving,
  //   error: saveError,
  //   data: quoteResponse,
  // } = useSaveQuoteNext();

  // const { completeApplication, loading: submittingStage2, error: submitError } = useQuoteUpdate()

  const { saveQuoteNext, loading: savingStage1 } = useSaveQuoteNext();

  const {
    completeApplication,
    loading: submittingStage2,
    error: submitError,
    data: policyResponse,
  } = useQuoteUpdate();

  //----------------------------

  const handleFormStepChange = (stepCommand: string) => {
    setFormStep((prevStep) => {
      let newStep = prevStep;

      if (stepCommand === "back" && prevStep > 1) {
        newStep = prevStep - 1;
      } else if (stepCommand === "forward" && prevStep < 3) {
        newStep = prevStep + 1;
      }

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

  const handleSubmitStage3 = () => {
    console.log("Form Submitted");
  };

  // const handleNext = async () => {
  //   if (!isStepOneFilled) return;

  //   try {
  //     const response = await saveQuoteNext(payload);
  //     // store the returned quoteNumber and any other back‐filled data
  //     setQuoteNumber(response.quoteNumber);

  //     setFormStep(2);
  //   } catch {
  //     // error is in saveError — show a message if you like
  //   }
  // };

  // your new handler which first saves, then advances the wizard
  const handleNext = async () => {
    if (!isStepOneFilled || savingStage1) return;

    try {
      const response = await saveQuoteNext(stage1Payload);
      setQuoteNumber(response.quoteNumber);
      setStep1ResponseData({
        quoteId: response.quoteId,
        quoteNumber: response.quoteNumber,
        effectiveDate: response.effectiveDate,
        expiryDate: response.expiryDate,
        coverageLength: Number(response.coverageLength),
        numberOfTravellers: response.numberOfTravellers,
        policyType: response.policyType,
        coverageLimit: response.coverageLimit,
        deductible: response.deductible,
        destinationProvince: response.destinationProvince,
        quoteAmount: response.quoteAmount,
        dateOfBirth: response.dateOfBirth,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        preExMedCov: response.preExMedCov,
        email: response.email,
        applicants: response.applicants,
      });
      console.log("from quote  getting response of stage 1", response);
      handleFormStepChange("forward");
    } catch (err) {
      console.error("saveQuoteNext failed", err);
      // show saveNextError to the user here
    }
  };

  // Step‐2 “Buy Now”
  const handleBuyNow = async () => {
    if (!quoteNumber || submittingStage2) return;
    const payload: Stage2Payload = {
      quoteNumber,
      address,
      contactInfo,
      beneficiary,
    };
    try {
      const resp = await completeApplication(payload);
      console.log('from handle buy', resp)
      // handleFormStepChange("forward");
    } catch {
      // show submitError…
    }
  };

  const stage1Payload = {
    primaryFirstName,
    primaryLastName,
    primaryDateOfBirth,
    primaryEmail,
    primaryApplicantGender,
    coverageForPreMedCon,
    applicantNumber,
    applicants,
    countryOfOrigin,
    inCanada,
    superVisa,
    superVisaYears,
    destinationProvince,
    effectiveDate,
    expiryDate,
    coverageLength,
    policyType,
    coverageOption,
    deductible,
    paymentOption,
    agentCode: agentCode!,
    product: "Secure Travel RIMI Visitors to Canada Travel",
    quoteNumber: quoteNumber,
    status: "Inactive",
  };


  const handlePaymentSuccess = () => {
    alert('payment successfull')
    handleFormStepChange('forward')
  }


  // const handlePaymentSuccess = () => {
  //   alert('payment successfull')
  //   handleFormStepChange('forward')
  // }

  return (
    <div className="max-w-5xl mx-auto px-2 py-4 sm:p-6">
      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-inputBorder border border-inputBorder md:flex md:divide-y-0"
        >
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {step.status === "complete" ? (
                <a href={step.href} className="group flex w-full items-center">
                  <span className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium">
                    <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2B00B7] group-hover:bg-[#2B00B7]">
                      <CheckIcon
                        className="h-4 sm:h-6 w-4 sm:w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-base font-medium text-[#2B00B7] font-[inter]">
                      {step.name}
                    </span>
                  </span>
                </a>
              ) : step.status === "current" ? (
                <a
                  href={step.href}
                  className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium font-[inter]"
                  aria-current="step"
                >
                  <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#2B00B7]">
                    <span className="text-[#2B00B7] font-[inter] text-xs sm:text-sm">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-base font-medium text-[#2B00B7] font-[inter]">
                    {step.name}
                  </span>
                </a>
              ) : (
                <a href={step.href} className="group flex items-center">
                  <span className="flex items-center px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium">
                    <span className="flex w-6 h-6 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-inputBorder group-hover:border-gray-400 transition-all duration-200">
                      <span className="text-gray-500 group-hover:text-gray-900 text-xs sm:text-sm">
                        {step.id}
                      </span>
                    </span>
                    <span className="ml-4 text-base font-medium font-[inter] text-gray-500 group-hover:text-gray-900">
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
                      className="h-full w-full text-inputBorder"
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
          {/* <ApplicantInformation />
          <CoverageInformation />
          <div className="w-full h-2 mt-5 flex items-center justify-center">
            <h3 className="text-lg">Your Quote: $0.00</h3>
          </div> */}
          <Step1STRVCT
            onValidityChange={setIsStepOneFilled}
            primaryFirstName={primaryFirstName}
            setPrimaryFirstName={setPrimaryFirstName}
            primaryLastName={primaryLastName}
            setPrimaryLastName={setPrimaryLastName}
            primaryDateOfBirth={primaryDateOfBirth}
            setPrimaryDateOfBirth={setPrimaryDateOfBirth}
            primaryEmail={primaryEmail}
            setprimaryEmail={setprimaryEmail}
            applicantNumber={applicantNumber}
            setApplicantNumber={setApplicantNumber}
            superVisa={superVisa}
            setSuperVisa={setSuperVisa}
            superVisaYears={superVisaYears}
            setSuperVisaYears={setSuperVisaYears}
            destinationProvince={destinationProvince}
            setDestinationProvince={setDestinationProvince}
            effectiveDate={effectiveDate}
            setEffectiveDate={setEffectiveDate}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            coverageLength={coverageLength}
            setCoverageLength={setCoverageLength}
            inCanada={inCanada}
            setInCanada={setInCanada}
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
            policyType={policyType}
            setPolicyType={setPolicyType}
            deductible={deductible}
            setDeductible={setDeductible}
            countryOfOrigin={countryOfOrigin}
            setCountryOfOrigin={setCountryOfOrigin}
            coverageOption={coverageOption}
            setCoverageOption={setCoverageOption}
            applicants={applicants}
            setApplicants={setApplicants}
            coverageForPreMedCon={coverageForPreMedCon}
            setCoverageForPreMedCon={setCoverageForPreMedCon}
            isConfirmed={isConfirmed}
            setIsConfirmed={setIsConfirmed}
            quoteNumber={quoteNumber}
            setQuoteNumber={setQuoteNumber}
            primaryApplicantGender={primaryApplicantGender}
            setPrimaryApplicantGender={setPrimaryApplicantGender}
            //
            totalPremium={totalPremium}
        schedule={schedule}
        loading={loading}
        error={error}
        setTotalPremium={setTotalPremium}
        setSchedule={setSchedule}
        setLoading={setLoading}
        setError={setError}
        // 

        formStep={formStep}
        handleFormStepChange={handleFormStepChange}
        handleNext={handleNext}
        isStepOneFilled={isStepOneFilled}
        savingStage1={savingStage1}
        
        // 
          />
        </div>
      )}

      {steps[1].status === "current" && quoteNumber && (
        <div>
          <div className="w-full h-2 mt-8 flex items-center justify-center">
            <h3 className="text-lg">
              Your Quote: ${step1ResponseData?.quoteAmount}
            </h3>
          </div>
          <YourQuoteSummary step1ResponseData={step1ResponseData}  />
          <ApplicantInformationFinished
            dateOfBirth={step1ResponseData?.dateOfBirth ?? ""}
            firstName={step1ResponseData?.firstName ?? ""}
            lastName={step1ResponseData?.lastName ?? ""}
            gender={step1ResponseData?.gender ?? ""}
            preExMedCov={step1ResponseData?.preExMedCov ?? ""}
            applicants={step1ResponseData?.applicants ?? []}
          />
          {/* contactInfo,setContactInfo */}
          <ContactInformation
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
            email={step1ResponseData?.email}
          />
          <Address address={address} setAddress={setAddress} />
          {/* beneficiary, setBeneficiary */}
          <BeneficiaryInCaseOfDeath beneficiaryInfo={beneficiary} setBeneficiaryInfo={setBeneficiary} />
          
          {/* Payment Stripe   */}
          {/* <PaymentInformation /> */}

          

          <Elements stripe={stripePromise}>
  <PaymentInformation
  quoteNumber={quoteNumber}
  description={productName}
  name={primaryFirstName}
  shipping={address}
  paymentOption={paymentOption}

    amount={totalPremium}
    // onPaymentSuccess={() => handleFormStepChange('forward')}
    // handlePaymentSuccess
    onPaymentSuccess={() => handlePaymentSuccess()}
    onBuyNow={handleBuyNow}
    
      // { ...(paymentOption === "monthly-installments" && {
      //       monthlyAmount,
      //       remainingInstallments,
      //       stripeProductId,
      //     })
      //   }

       monthlyAmount={ paymentOption === "monthly-installments" ? monthlyAmount : undefined }
  remainingInstallments={ paymentOption === "monthly-installments" ? remainingInstallments : undefined }
  stripeProductId={ paymentOption === "monthly-installments" ? stripeProductId : undefined }

  // 
  formStep={formStep}
  handleFormStepChange={handleFormStepChange}
  // handleNext={handleNext}
  // isStepOneFilled={isStepOneFilled}
  // savingStage1={savingStage1}
  handleBuyNow={handleBuyNow}
  submittingStage2={submittingStage2}

  />
</Elements>

          {/*  */}
        </div>
      )}

      {steps[2].status === "current" && (
        // <div>
        //   <h3 className="text-xl font-bold text-left text-[#1B1B1B] mt-5 mb-6">
        //     Step 3: Confirmation
        //   </h3>
        //   <p className="text-md text-left text-[#1B1B1B] mb-6">
        //     Review your application details and submit.
        //   </p>
        // </div>
        <Summary quoteId={step1ResponseData?.quoteId ?? ''} />
      )}

      {/* <div className="flex justify-center gap-10 mt-4"> */}
        {/* {formStep > 1 && (
          <button
            className="w-[250px] mt-6 bg-white border border-[#2B00B7] text-[#2B00B7] p-3 hover:bg-[#2209a1] hover:text-white transition flex justify-center items-center"
            onClick={() => handleFormStepChange("back")}
          >
            Previous
          </button>
        )} */}
        {/* {formStep < 3 ? (
          <button
            className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center"
            onClick={() => handleFormStepChange("forward")}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center"
          >
            Submit
          </button>
        )} */}
      {/* </div> */}


{/*  */}

      <div className="flex justify-center gap-10 mt-4">
        {formStep === 2 && (
          <button onClick={() => handleFormStepChange("back")} className=" btn-outline">Previous</button>
        )}

        {formStep === 1 && (
          <button
            onClick={handleNext}
            disabled={!isStepOneFilled || savingStage1}
            className={`w-[200px] mt-6 bg-[#2B00B7] text-white p-3  hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200 ${
              savingStage1 ? "opacity-50 cursor-wait" : ""
            }`}
          >
            {savingStage1 ? "Saving…" : "Next"}
          </button>
        )}

        {/* {formStep === 2 && (
          <button
            onClick={handleBuyNow}
            disabled={submittingStage2}
            className={`w-[200px] mt-6 bg-[#2B00B7] text-white p-3  hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer duration-200 ${
              submittingStage2 ? "opacity-50 cursor-wait" : ""
            }`}
          >
            {submittingStage2 ? "Processing…" : "Buy Now"}
          </button>
        )} */}

        {/* {formStep === 3 && (
          <button onClick={handleSubmitStage3} className="btn-primary">
            Submit
          </button>
        )} */}

       
      </div>

      {/*  */}
    </div>
  );
}


 {/* {formStep < 3 ? (
          <button
            onClick={handleNext}
            disabled={!isStepOneFilled || saving}
            className={`px-6 py-2 ${
              saving
                ? "bg-gray-300 text-gray-600 cursor-wait"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {saving ? "Saving…" : "Next"}
          </button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )} */}