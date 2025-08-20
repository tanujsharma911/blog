import { useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.checkAuthStatus()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        }
        else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  })


  return loading ? (
    <div className="flex justify-center">
      loading
    </div>
  ) : (
    <div className="">
      <Header />
      <div className="min-h-screen">

        {<Outlet />}
      </div>
      <Footer />
    </div>
  )
}

export default App
