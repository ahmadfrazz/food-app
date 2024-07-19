import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import { useSelector } from "react-redux";
import RequireAuth from "./utils/RequireAuth";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Components/DashboardWrapper/Layout";
import Cart from "./Pages/Cart";
import Signup from "./Pages/Signup/Signup";

function App() {
  const { user } = useSelector(state => state?.auth);

  return (
    <>
      <Routes>
        {/* === Public Routes === */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* === Private Routes === */}
        <Route path="/" element={<Layout />}>
          {/* <Route element={<RequireAuth />}>
            {user.email && (
              <> */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="cart" element={<Cart />} />
              {/* </>
            )}
          </Route> */}
        </Route>

        {/* === Unknown Routes === */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
