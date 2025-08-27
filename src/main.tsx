import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { LangContextProvider } from "./context/LangContext.tsx";
import Profile from "./pages/Profile.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store.ts";
import ProtectedRoute from "./components/protection/ProtectedRoute.tsx";
import UserDetails from "./pages/UserDetails.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import UserUpload from "./pages/UserUpload.tsx";
import TestUi from "./pages/TestUi.tsx";
import QuoteUploader from "./pages/QuoteUploader.tsx";
import QuoteDetails, { QuoteDetailPage } from "./pages/QuoteDetails.tsx";
import PolicyUploader from "./pages/PolicyUploader.tsx";
import PolicyDetails from "./pages/PolicyDetails.tsx";
import ImportSalesUpload from "./pages/ImportSalesUpload.tsx";
import AgentDashboard from "./pages/AgentDashboard.tsx";
import i18n from "./i18n/i18.ts";
import AgentDetails from "./components/AgentDetails.tsx";
import Home from "./components/home/Home.tsx";
import QuotesSearch from "./components/QuotesSearch.tsx";
import PoliciesSearch from "./components/PoliciesSearch.tsx";
import Reporting from "./components/Reporting.tsx";
import Users from "./components/Users.tsx";
import CreateUser from "./components/CreateUser.tsx";
import TripCalculator from "./components/TripCalculator.tsx";
import Products from "./components/Products.tsx";
import Documents from "./components/Documents.tsx";
import ProductWrapper from "./components/Products/ProductWrapper.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Dashboard as parent route with nested children */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        {/* All dashboard routes as children */}
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:slug" element={<ProductWrapper />} />
        <Route path="search-quotes" element={<QuotesSearch />} />
        <Route path="search-policies" element={<PoliciesSearch />} />
        <Route path="reporting" element={<Reporting />} />
        <Route path="search-users" element={<Users />} />
        <Route path="create-user" element={<CreateUser />} />
        <Route path="documents" element={<Documents />} />
        <Route path="trip-calculator" element={<TripCalculator />} />
        <Route path="profile" element={<Profile />} />
        <Route path="userdetail/:id" element={<UserDetails />} />
        <Route path="user-upload" element={<UserUpload />} />
        <Route path="quote-upload" element={<QuoteUploader />} />
        <Route path="quote-detail/:id" element={<QuoteDetailPage />} />
        <Route path="agent-details/:agentCode" element={<AgentDetails />} />
        <Route path="policy-upload" element={<PolicyUploader />} />
        <Route path="policy-detail/:id" element={<PolicyDetails />} />
        <Route path="sales-data-upload" element={<ImportSalesUpload />} />
      </Route>

      {/* Routes outside of dashboard layout */}
      <Route path="/test-dash" element={<TestUi />} />
      <Route path="/agent-dashboard" element={<AgentDashboard />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LangContextProvider>
          <RouterProvider router={router} />
        </LangContextProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);