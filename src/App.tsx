import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"



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
