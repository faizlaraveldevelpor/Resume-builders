import { GeminiResType } from '@/types/GeminiApiResponseType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ✅ API base configuration
export const GeminiApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent', // 👈 apni API base URL yahan daalo
  }),
  endpoints: (builder) => ({
    // ✅ Example: GET request
    SummaryCreate: builder.mutation<GeminiResType,string>({
      query: (text:string) => ({
        url:"?key=AIzaSyA2gOw0purjh3UEaGCNEprFUcjo3-r8lGo",
        method:"POST",
        body:JSON.stringify({
            contents: [
          {
            parts: [
              {
                text: text+""+"options nahi dainay baas aik hi likh kar kai oor ye n backslace naa lgaa baas summary kaa text dai oor kuch nahi honaa chahiye baas summary kaa text oor aik alphabet bi nahi hona chahiye or haar dafa change kar kai response dainaa hai oor bilkul topic kai mutaabik response dainaa hai"
              }
            ]
          }
        ]
        })
      }),
    }),

    
  }),
});

// Hooks auto-generate hotay hain 👇
export const { useSummaryCreateMutation } = GeminiApi;
