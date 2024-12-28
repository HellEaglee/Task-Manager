import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { RootState } from "../../../store/store";
import SignUpForm from "./components/SignUpForm";

const SignUpPage = () => {
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
        <SignUpForm />
        <p className="text-graysilver text-sm font-normal mb-1">Войти через:</p>
        <div className="flex gap-5">
          <div className="w-[6.25rem] h-[1.875rem] bg-graysilver"></div>
          <div className="w-[6.25rem] h-[1.875rem] bg-graysilver"></div>
          <div className="w-[6.25rem] h-[1.875rem] bg-graysilver"></div>
        </div>
        <div className="flex items-center text-primary text-sm font-bold mt-7">
          <Link to={"/auth/login"}>Уже есть аккаунт?</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
