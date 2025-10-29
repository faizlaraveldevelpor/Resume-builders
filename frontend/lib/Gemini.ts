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
      query: (text:string) => (
        
        {
        url:'?key=AIzaSyA2gOw0purjh3UEaGCNEprFUcjo3-r8lGo',
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
    TextSection: builder.mutation<GeminiResType,string>({
      query: (text:string) => ({
        url:'?key=AIzaSyA2gOw0purjh3UEaGCNEprFUcjo3-r8lGo',
        method:"POST",
        body:JSON.stringify({
            contents: [
          {
            parts: [
              {
                text: `Main aapko ek CV ka plain text dunga.  
Aapko is text ko analyze karke alag-alag sections mein convert karna hai aur sirf ek JSON object return karna hai.  

Rules:
1. Sirf specified keys use karo.  
2. Array aur string waise hi return karo.  
3. Output sirf valid JSON object ho.  
4. DO NOT wrap in triple backticks, quotes, or any extra text.  
5. Do NOT add any explanations.  
personalInformation (object): firstName, lastName, Profession, email, phone, address, city, country, zip  
education (object): schoolName, degree, fieldOfStudy, city, state, graduationDate  
experience (object): employer, jobTitle, jobDescription, city, state, startDate, endDate  
skills (array)  
summary (string)  
\\, \n aisaa kuch nahi chahiye nahi honay chahiye
Ab main CV ka text dunga. Sirf JSON object return karo.
`+""+text
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
export const { useSummaryCreateMutation,useTextSectionMutation } = GeminiApi;
