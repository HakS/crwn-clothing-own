import { configureStore } from '@reduxjs/toolkit'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from '@redux-saga/core'

import { rootReducer } from "./root-reducer";

import logger from "redux-logger";
// import { syncLogger } from './middleware/logger';
import { rootSaga } from "./root-saga";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [
  process.env.NODE_ENV !== 'production'
    // && syncLogger,
  && logger,
  sagaMiddleware,
].filter(Boolean)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }).concat(middleWares)
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
