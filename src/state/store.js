import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/reducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducer } from "./reducer";
import { RESOURCE } from "@/constants";
import { WEB_APP } from "@/env";
import { persistConfig } from "./persistor";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: WEB_APP !== RESOURCE.PRODUCTION,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
