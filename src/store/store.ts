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
  PersistConfig,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from '@redux-saga/core'

import { rootReducer } from "./root-reducer";

// import logger from "redux-logger";
// import { syncLogger } from './middleware/logger';
import { rootSaga } from "./root-saga";
import { useDispatch } from 'react-redux';

export type RootState = ReturnType<typeof rootReducer>

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const middleWares = [
//   process.env.NODE_ENV !== 'production'
//     // && syncLogger,
//   && logger,
//   sagaMiddleware,
// ].filter((mw): mw is Middleware => Boolean(mw))

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }).concat([sagaMiddleware])
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
