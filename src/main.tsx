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

import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import { LangContextProvider } from './context/LangContext.tsx';
import Profile from './pages/Profile.tsx';
import { Provider } from 'react-redux'
import { store } from './app/store.ts';
import ProtectedRoute from './components/protection/ProtectedRoute.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Login />} />
      
      <Route path='/dashboard' element={
        <ProtectedRoute>
        <Dashboard />
        </ProtectedRoute>
        } />
      
      <Route path='/profile' element={<Profile />} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <LangContextProvider>
    <RouterProvider router={router} />
    </LangContextProvider>
    </Provider>
  </StrictMode>,
)
