import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
import Tooltip from "@mui/material/Tooltip";
import UserProfile from "./UserProfile";
import "../../styles/navbar.scss";
import authService from "../../features/auth/authService";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => {
  return (
    <Tooltip title={title} placement="bottom">
      <button
        type="button"
        onClick={customFunc}
        style={{ color }}
        className="relative text-xl  nav-button"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </Tooltip>
  );
};

const NavBar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 1200) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  const user = authService.getCurrentUser()
  return (
    <div className="flex justify-between md:ml-6 md:mr-6 relative frame-nav">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        <Tooltip title="Profile" placeholder="bottom">
          <div
            className="flex items-center gap-2 cursor-pointer user-detail"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-8 h-8"
              src={user?.userImage}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Xin chào </span>
              <span className="text-gray-400 font-bold ml-1 text-14">{user?.userFullName}</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </Tooltip>
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default NavBar;
