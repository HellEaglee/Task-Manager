import { FormEvent, useState } from "react";
import { useSignup } from "../../../../hooks/useSignup";
import { toast } from "react-toastify";
import { emailRegex, passwordRegex } from "../../../../utils/regexPatterns";
import PasswordInput from "../../components/PasswordInput";

const SignUpForm = () => {
  const { signUpAuth, loading } = useSignup();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      toast.error("Введите корректный адрес электронной почты.");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error(
        "Пароль должен содержать минимум 8 символов, одну заглавную букву, одну цифру и один специальный символ."
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Подвердите пароль!");
      return;
    }
    try {
      await signUpAuth({ email, password });
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-2">
      <input
        className="w-[21.25rem] h-10 font-normal text-sm text-graysilver placeholder:text-graysilver px-[0.625rem] bg-transparent border-graysilver border-2 rounded-lg"
        type="text"
        placeholder="Введите почту"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PasswordInput
        value={password}
        placeholder={"Введите пароль"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordInput
        value={confirmPassword}
        placeholder={"Подтвердите пароль"}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        type="submit"
        className={`w-[21.25rem] h-10 font-semibold text-graywhite text-sm bg-secondary rounded-lg ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Загрузка..." : "Продолжить"}
      </button>
    </form>
  );
};

export default SignUpForm;
