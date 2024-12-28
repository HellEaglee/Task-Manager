import { useState, FormEvent } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import PasswordInput from "../../components/PasswordInput";

const SignInForm = () => {
  const { signInAuth, loading } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInAuth({ email, password });
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
      <button
        type="submit"
        className={`w-[21.25rem] h-10 font-semibold text-graywhite text-sm bg-secondary rounded-lg ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Заргузка..." : "Продолжить"}
      </button>
    </form>
  );
};

export default SignInForm;
