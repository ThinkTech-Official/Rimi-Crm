// src/hooks/useSaveQuote.ts
import { useState, useCallback } from 'react'
import { useSelector } from "react-redux";

// mirror your types from the component
export interface Applicant {
    index: string;
  firstName: string
  lastName: string
  dob: string
  relationship: string
  preMedCoverage: boolean
  gender: string
}

export type YesNo = '' | 'yes' | 'no'
export type SuperVisaOption = '' | 'yes' | 'no'
export type SuperVisaYears = '' | '1' | '2'

// export interface CoverageInfo {
//   countryOfOrigin: string
//   inCanada: YesNo
//   superVisa: SuperVisaOption
//   superVisaYears: SuperVisaYears
//   destinationProvince: string
//   effectiveDate: string
//   expiryDate: string
//   coverageLength: string
//   policyType: string
//   coverageOption: string
//   deductible: string
//   paymentOption: 'lump-sum' | 'monthly-installments'
// }

export interface QuotePayload {
  primaryFirstName: string
  primaryLastName: string
  primaryDateOfBirth: string
  primaryEmail: string
  coverageForPreMedCon: boolean
  applicantNumber: number
  applicants: Applicant[]
  countryOfOrigin: string
  inCanada: YesNo
  superVisa: SuperVisaOption
  superVisaYears: SuperVisaYears
  destinationProvince: string
  effectiveDate: string
  expiryDate: string
  coverageLength: string
  policyType: string
  coverageOption: string
  deductible: number
  paymentOption: 'lump-sum' | 'monthly-installments'
  agentCode: string,
  product: string,
  quotePremium: number,
  quoteNumber?: string,
  primaryApplicantGender: string;
  plan: number
}

const baseUrl = 'http://localhost:3000'

export function useSaveQuote() {

    const token = useSelector((state: any) => state.auth.token) as string | null;
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<number | null>(null)
 
  const saveQuote = useCallback(
    async (payload: QuotePayload) => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${baseUrl}/quotes/save`, {
          method: 'POST',
           headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const text = await res.text()
          console.log('from useSave Qoutes error on response not ok')
          throw new Error(text || 'Failed to save quote')
        }
        const data = await res.json() as { quote: number }
        setResult(data.quote)
        // console.log('from data save quote result state',result)
        console.log('from data save quote data',data)
        return data
      } catch (err: any) {
        setError(err.message)
        console.log('from useSave Qoutes error on response not ok 122', err.message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { saveQuote, loading, error, result }
}
