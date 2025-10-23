import { GeminiApi } from '@/lib/Gemini'
import {configureStore} from '@reduxjs/toolkit'
export const store=configureStore({
    reducer:{
    [GeminiApi.reducerPath]: GeminiApi.reducer,
    
    },
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(GeminiApi.middleware), 
})