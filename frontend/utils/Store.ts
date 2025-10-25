import { DocomentApi } from "@/lib/docoment";
import { GeminiApi } from "@/lib/Gemini";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [GeminiApi.reducerPath]: GeminiApi.reducer,
    [DocomentApi.reducerPath]: DocomentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(GeminiApi.middleware)
      .concat(DocomentApi.middleware),
});


