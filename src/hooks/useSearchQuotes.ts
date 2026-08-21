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



// ================================

// ===================================




// import { useState } from 'react';
// import { axiosInstance } from '../utils/axiosInstance';

// // Extend the search criteria to include pagination
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
//   page?: number;
//   limit?: number;
// }

// // Single quote record type
// export interface QuoteRecord {
//   id: string;
//   // add other fields you need here
// }

// // Paginated response shape
// export interface PaginatedQuotes<T> {
//   items: T[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }



// /**
//  * Hook to search quotes with pagination
//  * @param defaultLimit number of items per page if not provided
//  */
// export function useSearchQuotes(defaultLimit: number = 10) {

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [data, setData] = useState<PaginatedQuotes<QuoteRecord> | null>(null);

//   /**
//    * Perform a search with given criteria and optional page/limit
//    */
//   async function search(
//     criteria: Omit<SearchCriteria, 'page' | 'limit'>,
//     page: number = 1,
//     limit: number = defaultLimit
//   ) {
//     setLoading(true);
//     setError(null);
//     // setData(null);
//     try {
//       const payload: SearchCriteria = { ...criteria, page, limit };
      
//       const response = await axiosInstance.post('/quotes/search', payload);

//       setData(response.data);
//       console.log('From useSearch quotes', response.data);
//     } catch (err: any) {
//       console.error('Search quotes error:', err);
//       const errorMessage = err.response?.data?.message || err.message || 'Search failed';
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return { search, loading, error, data };
// }


// ===================================


// ===============================




import { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';

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

export interface QuoteRecord {
  id: string;
}

export interface PaginatedQuotes<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useSearchQuotes(defaultLimit: number = 10) {
  const [loading, setLoading]       = useState(false);
  const [exporting, setExporting]   = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [error, setError]           = useState<string | null>(null);
  const [data, setData]             = useState<PaginatedQuotes<QuoteRecord> | null>(null);

  async function search(
    criteria: Omit<SearchCriteria, 'page' | 'limit'>,
    page: number = 1,
    limit: number = defaultLimit
  ) {
    setLoading(true);
    setError(null);
    try {
      const payload: SearchCriteria = { ...criteria, page, limit };
      const response = await axiosInstance.post('/quotes/search', payload);
      setData(response.data);
      console.log('From useSearch quotes', response.data);
    } catch (err: any) {
      console.error('Search quotes error:', err);
      setError(err.response?.data?.message || err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }

  async function exportCsv(
    criteria: Omit<SearchCriteria, 'page' | 'limit'>
  ) {
    setExporting(true);
    setExportError(null);
    try {
      const res = await axiosInstance.post('/quotes/search/export', criteria, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `quotes_${new Date().toISOString().split('T')[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      // responseType: 'blob' means error body is also a blob — parse it back
      if (err.response?.data instanceof Blob) {
        const text = await err.response.data.text();
        try {
          const parsed = JSON.parse(text);
          setExportError(parsed.message || 'Export failed. Please try again.');
        } catch {
          setExportError('Export failed. Please try again.');
        }
      } else {
        setExportError(err.response?.data?.message || 'Export failed. Please try again.');
      }
    } finally {
      setExporting(false);
    }
  }

  return { search, exportCsv, exporting, exportError, loading, error, data };
}
