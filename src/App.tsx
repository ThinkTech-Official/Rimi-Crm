import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { AuthSyncListener } from "./components/protection/AuthSyncListener"
import { useEffect } from "react";
import { initializeAuth } from "./features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";



function App() {

  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  

  return (
    <>
    {/* <Login /> */}
    {/* <Dashboard /> */}
    <Navbar />
    <main>
       <AuthSyncListener />
      <Outlet />
    </main>
    {/* <Footer /> */}

    </>
  )
}

export default App
