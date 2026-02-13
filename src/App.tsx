import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { AuthSyncListener } from "./components/protection/AuthSyncListener"



function App() {
  

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
