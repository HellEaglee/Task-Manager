import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage, logout } from "../store/slices/authSlice";
import { RootState } from "../store/store";
import { Link } from "react-router";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuth) {
    return (
      <div className="dropdown-menu text-sm text-graysilver font-normal absolute right-0 top-12 p-4 bg-gray text-center border-[0.0625rem] border-graysecondary rounded shadow-lg z-50">
        Пожалуйста{" "}
        <Link to={"/auth/login"} className="text-primary cursor-pointer">
          войдите
        </Link>{" "}
        чтобы увидеть свои данные.
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dropdown-menu text-sm text-graysilver font-normal absolute right-0 top-12 p-4 bg-gray text-center border-[0.0625rem] border-graysecondary rounded shadow-lg z-50">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="dropdown-menu flex flex-col text-sm text-graysilver font-normal absolute right-0 top-12 py-2 gap-1 bg-gray border-[0.0625rem] border-graysecondary rounded shadow-lg z-50">
      <div className="flex flex-col hover:bg-graysecondary py-2 px-4">
        <p className="font-bold">Почта пользователя</p>
        <p className="text-xs">{user.email}</p>
      </div>
      <div className="flex flex-col hover:bg-graysecondary py-2 px-4">
        <p className="font-bold">Имя пользователя</p>
        <p className="text-xs">{user.name}</p>
      </div>
      <div className="border-t-[0.0625rem] border-graysecondary pt-2">
        <button
          onClick={handleLogout}
          className="w-full text-left hover:bg-graysecondary py-2 px-4"
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
