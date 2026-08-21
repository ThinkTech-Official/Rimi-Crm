import { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';



interface QuoteData {
  quoteId: string;
  quoteNumber: string;
  product: string;
  
  // Applicant Information
  primaryFirstName: string;
  primaryLastName: string;
  primaryDateOfBirth: string;
  primaryEmail: string;
  primaryApplicantGender: string;
  applicantNumber: number;
  
  // Coverage Information
  countryOfOrigin?: string;
  destinationProvince?: string;
  provinceOfResidence?: string;
  provinceStateResidence?: string;
  effectiveDate: string;
  expiryDate: string;
  coverageLength: number;
  policyType: string;
  coverageOption?: number;
  deductible?: number;
  paymentOption?: string;
  
  // Product-specific fields
  inCanada?: boolean;
  superVisa?: string;
  superVisaYears?: string;
  coverageForPreMedCon?: boolean;
  destinationCountry?: string;
  travelingThroughUS?: string;
  usTravelDays?: number;
  numberOfDaysPerTrip?: number;
  tripCost?: number;
  dateBooked?: string;
  tripCancellationDeluxe?: boolean;
  
  // Premium
  premium: number;
  
  // Applicants
  applicants: Array<{
    index: string;
    firstName: string;
    lastName: string;
    dob: string;
    relationship: string;
    gender: string;
    preMedCoverage: boolean;
  }>;
  
  createdAt: string;
}

export const useQuoteByNumber = (quoteNumber: string | null) => {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quoteNumber) {
      setQuoteData(null);
      setLoading(false);
      return;
    }

    const fetchQuote = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching quote data:', quoteNumber);

        const response = await axiosInstance.get(
          `/quotes/by-quote-number/${quoteNumber}`
        );
        
        console.log('Quote data loaded:', response.data);
        setQuoteData(response.data);
      } catch (err: any) {
        console.error('Failed to fetch quote:', err);
        setError(err.response?.data?.message || 'Failed to load quote');
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [quoteNumber]);

  return { quoteData, loading, error };
};