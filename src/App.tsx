import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import { AuthSyncListener } from "./components/protection/AuthSyncListener"
import { useEffect } from "react";
import { initializeAuth } from "./features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const noNavbarRoutes = ["/login", "/apply", "/apply-mga"];
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* <Login /> */}
      {/* <Dashboard /> */}
      {shouldShowNavbar && <Navbar />}
      <main>
        <AuthSyncListener />
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default App
