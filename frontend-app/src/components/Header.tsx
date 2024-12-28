import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { notification_icon, user_icon } from "../assets";
import { useState, useEffect } from "react";
import UserDetails from "./UserDetails";

export const Header = () => {
  const { user, isAuth } = useSelector((state: RootState) => state.auth);
  const [showUserDetails, setShowUserDetails] = useState<boolean>(false);

  const userFirstLetter = user?.name[0].toUpperCase();

  const toggleUserDetails = () => {
    setShowUserDetails((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".dropdown-trigger") &&
        !target.closest(".dropdown-menu")
      ) {
        setShowUserDetails(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute flex justify-between items-center w-screen h-12 pl-20 pr-12 border-b-graysecondary border-[1px] bg-gray">
      <h1 className="text-primary font-semibold text-3xl">Nest</h1>
      <div className="flex gap-6">
        <img src={notification_icon} alt="" />
        {isAuth ? (
          <div className="relative">
            <div
              onClick={toggleUserDetails}
              className="dropdown-trigger flex justify-center items-center size-6 bg-primary cursor-pointer rounded-full"
            >
              <p className="text-background text-base font-bold">
                {userFirstLetter}
              </p>
            </div>
            {showUserDetails && <UserDetails />}
          </div>
        ) : (
          <div>
            <img
              src={user_icon}
              alt="User"
              onClick={toggleUserDetails}
              className="dropdown-trigger cursor-pointer"
            />
            {showUserDetails && <UserDetails />}
          </div>
        )}
      </div>
    </div>
  );
};
