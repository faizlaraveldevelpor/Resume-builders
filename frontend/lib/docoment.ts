import { GeminiResType } from '@/types/GeminiApiResponseType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ✅ API base configuration
export const DocomentApi = createApi({
  reducerPath: 'docomentapi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/v1/', // 👈 apni API base URL yahan daalo
  }),
  endpoints: (builder) => ({
    // ✅ Example: GET request
    GetDocomentApi: builder.query({
      query: (text:string) => ({
        url:"/docoments",
        method:"GET",
        
      }),
    }),

    
  }),
});

// Hooks auto-generate hotay hain 👇
export const { useGetDocomentApiQuery } = DocomentApi;
