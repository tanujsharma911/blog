import { useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer } from "./components";
import Header from "./components/Header";
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
  }, [dispatch])


  return loading ? (
    <div className="flex justify-center">
      loading
    </div>
  ) : (
    <div className="">
      <Header />

      <div className="my-30 px-5 md:px-10 lg:max-w-4xl mx-auto">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default App
