
import { useState } from 'react'
import axios from 'axios'

export interface Stage2Payload {
  quoteNumber: string
  address: {
    addressLine1: string
    addressLine2: string
    city: string
    postalCode: string
    country: string
    province: string
  }
  contactInfo: {
    additionalEmail: string
    phoneNumber: string
  }
  beneficiary: {
    beneficiaryName: string
    relationshipToInsured: string
  }
}

export interface CompleteApplicationResponse {
  policyNumber: string
  
}

const baseUrl = 'http://localhost:3000';

export function useQuoteUpdate() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<CompleteApplicationResponse | null>(null)

  async function completeApplication(payload: Stage2Payload) {
    setLoading(true)
    setError(null)
    console.log('from use Quote Update',payload)
    try {
      const resp = await axios.post<CompleteApplicationResponse>(
        `${baseUrl}/quotes/stage2`,
        payload
      )
      setData(resp.data)
      return resp.data
    } catch (e: any) {
      setError(e)
      throw e
    } finally {
      setLoading(false)
    }
  }

  return { completeApplication, loading, error, data }
}
