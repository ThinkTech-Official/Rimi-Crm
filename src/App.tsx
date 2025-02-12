import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Footer from "./components/Footer"


function App() {
  

  return (
    <>
    {/* <Login /> */}
    {/* <Dashboard /> */}
    <Navbar />
    <main>
      <Outlet />
    </main>
    {/* <Footer /> */}

    </>
  )
}

export default App
