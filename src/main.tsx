import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';

import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import { LangContextProvider } from './context/LangContext.tsx';
import Profile from './pages/Profile.tsx';
import { Provider } from 'react-redux'
import { store,persistor } from './app/store.ts';
import ProtectedRoute from './components/protection/ProtectedRoute.tsx';
import UserDetails from './pages/UserDetails.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import UserUpload from './pages/UserUpload.tsx';
import TestUi from './pages/TestUi.tsx';
import QuoteUploader from './pages/QuoteUploader.tsx';
import QuoteDetails, { QuoteDetailPage } from './pages/QuoteDetails.tsx';
import PolicyUploader from './pages/PolicyUploader.tsx';
import PolicyDetails from './pages/PolicyDetails.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Login />} />
      
      <Route path='/dashboard' element={
        <ProtectedRoute>
        <Dashboard />
        </ProtectedRoute>
        } />

<Route path='/test-dash' element={<TestUi />} />
      
      <Route path='/profile' element={<Profile />} />
      <Route path='/userdetail/:id' element={<UserDetails />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/user-upload' element={<UserUpload />} />
      <Route path='/quote-upload' element={<QuoteUploader />} />
      <Route path='/quote-detail/:id' element={<QuoteDetailPage />} />

      <Route path='/policy-upload' element={<PolicyUploader />} />
      <Route path='/policy-detail/:id' element={<PolicyDetails />} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Provider store={store}>
    
    <LangContextProvider>
    <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router} />
    </PersistGate>
    </LangContextProvider>
    
    </Provider> */}
    <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <LangContextProvider>
      <RouterProvider router={router} />
    </LangContextProvider>
  </PersistGate>
</Provider>
  </StrictMode>,
)
