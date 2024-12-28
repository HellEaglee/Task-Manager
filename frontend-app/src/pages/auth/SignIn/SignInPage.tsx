import { useSelector } from "react-redux";
import SignInForm from "./components/SignInForm";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { RootState } from "../../../store/store";

const SignInPage = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/workplaces/");
    }
  }, [isAuth, navigate]);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col justify-between items-center p-7 bg-gray">
        <h1 className="text-primary font-semibold text-3xl mb-5">Nest</h1>
        <p className="text-graywhite font-semibold text-xl mb-6">
          Войдите чтобы продолжить
        </p>
        <SignInForm />
        <p className="text-graysilver text-sm font-normal mb-1">Войти через:</p>
        <div className="flex gap-5">
          <div className="w-[6.25rem] h-[1.875rem] bg-graysilver"></div>
          <div className="w-[6.25rem] h-[1.875rem] bg-graysilver"></div>
          <div className="w-[6.25rem] h-[1.875rem] bg-graysilver"></div>
        </div>
        <div className="flex items-center gap-2 text-primary text-sm font-bold mt-20">
          <p>Не можете войти?</p>
          <div className="size-1 rounded-full bg-graywhite" />
          <Link to={"/auth/signup"}>Создать аккаунт</Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
