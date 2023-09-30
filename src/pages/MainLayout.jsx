import NavBar from "../components/navbar-sidebar/Navbar";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Sidebar from "../components/navbar-sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Notification from "../components/Notification";
import authService from "../features/auth/authService";

const MainLayout = () => {
  const { activeMenu, screenSize } = useStateContext();
  const user = authService.getCurrentUser();
  const role = user?.roleName

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
    useEffect(()=>{
      role === "Admin" ? 
      setNotify({
        isOpen: true,
        message: "xin chào quản trị viên",
        type: "success",
        
      })
      :  setNotify({
        isOpen: true,
        message: "Xin chào quản lý garage",
        type: "success",
        
      });
     
    },[role]);
  return (
    <>
      <div>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebarr dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <>
              {screenSize <= 1200 ? (
                <div>
                  <div className="w-0 h-screen">
                    <Sidebar />
                  </div>
                </div>
              ) : (
                <div className="bg-white small-sidebar ">
                  <Sidebar />
                </div>
              )}
            </>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div
              className={
                activeMenu
                  ? "fixed md:fixed sm:fixed  dark:bg-main-dark-bg navbarr size"
                  : screenSize <= 1200
                  ? "fixed md:fixed sm:fixed dark:bg-main-dark-bg navbarr w-full"
                  : "fixed md:fixed sm:fixed dark:bg-main-dark-bg navbarr size1"
              }
            >
              <NavBar />
            </div>
            <div>
            
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    
    </>
  );
};

export default MainLayout;
