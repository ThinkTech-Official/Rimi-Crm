
// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/authSlice';
// import verificationReducer  from '../features/verificationSlice'
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth'], // only persist the auth slice
// };

// // 👇 Combine all reducers here
// const rootReducer = combineReducers({
//   auth: authReducer,
//   verification: verificationReducer,
// });

// // 👇 Wrap the combined rootReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;



// =========================
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import verificationReducer from '../features/verificationSlice';
import {
  persistStore,
  persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['loading', 'error', 'initialized'], 
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), 
  verification: verificationReducer,
});


const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;