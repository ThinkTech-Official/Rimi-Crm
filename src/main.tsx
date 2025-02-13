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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Dashboard />} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangContextProvider>
    <RouterProvider router={router} />
    </LangContextProvider>
  </StrictMode>,
)
