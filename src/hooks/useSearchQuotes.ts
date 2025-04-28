// import { useState } from 'react';

// export interface SearchCriteria {
//   quoteNumber?: string;
//   quoteDate?: string;
//   firstName?: string;
//   lastName?: string;
//   dateOfBirth?: string;
//   email?: string;
//   effectiveDate?: string;
//   expiryDate?: string;
//   agent?: string;
//   products?: string[];
// }

// export interface QuoteRecord {
//   id: string;
//   /* other fields as needed */
// }

// const baseUrl = 'http://localhost:3000'

// export function useSearchQuotes() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [data, setData] = useState<QuoteRecord[] | null>(null);

//   async function search(criteria: SearchCriteria) {
//     setLoading(true);
//     setError(null);
//     setData(null);
//     try {
//       const response = await fetch(`${baseUrl}/quotes/search`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(criteria),
//       });
//       if (!response.ok) {
//         const err = await response.text();
//         throw new Error(err || 'Search failed');
//       }
//     //   const result = (await response.json()) as QuoteRecord[];
//       const result = (await response.json());
//       console.log('from useSearch Quotes', result)
//       setData(result);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return { search, loading, error, data };
// }


import { useState } from 'react';

// Extend the search criteria to include pagination
export interface SearchCriteria {
  quoteNumber?: string;
  quoteDate?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  effectiveDate?: string;
  expiryDate?: string;
  agent?: string;
  products?: string[];
  page?: number;
  limit?: number;
}

// Single quote record type
export interface QuoteRecord {
  id: string;
  // add other fields you need here
}

// Paginated response shape
export interface PaginatedQuotes<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const baseUrl = 'http://localhost:3000';

/**
 * Hook to search quotes with pagination
 * @param defaultLimit number of items per page if not provided
 */
export function useSearchQuotes(defaultLimit: number = 10) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PaginatedQuotes<QuoteRecord> | null>(null);

  /**
   * Perform a search with given criteria and optional page/limit
   */
  async function search(
    criteria: Omit<SearchCriteria, 'page' | 'limit'>,
    page: number = 1,
    limit: number = defaultLimit
  ) {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const payload: SearchCriteria = { ...criteria, page, limit };
      const response = await fetch(`${baseUrl}/quotes/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Search failed');
      }

      const result = (await response.json()) as PaginatedQuotes<QuoteRecord>;
      setData(result);
      console.log('From useSearch quotes',result)
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { search, loading, error, data };
}
