import conf from "./conf/conf";
import "./App.css";
import { Header, Footer } from "./components/index";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Home from "./pages/Home";
import UserInfo from "./components/UserInfo";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // console.log(conf)

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <div className=" flex flex-wrap  content-between bg-body min-h-screen relative">
        <div className="w-full flex flex-col min-h-screen">
          <Header />
          <Outlet >
          
          </Outlet>
          {/* <Home /> */}
          <Footer />
        </div>
      </div>
    </>
  ) : (
    <Box sx={{  display: "flex",
                "justify-content": "center",
                "align-items": "center", 
                height: '100vh' }}>
      <CircularProgress size="15rem" />
    </Box>
  );
}

export default App;
