import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../../apis/login";

const LoginTemplate = () => {
  const nav = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("이메일을 입력해주세요.");
      emailRef.current?.focus();
      return;
    }
    if (!password) {
      setError("비밀번호를 입력해주세요.");
      passwordRef.current?.focus();
      return;
    }

    const result = await postLogin(email, password);

    if (result.success) {
      const { approved } = result;

      if (approved) {
        nav("/");
      } else {
        nav("/pending");
      }
    } else {
      setError(result.error || "오류가 발생했습니다.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col justify-center items-center py-36 md:px-16 lg:px-36"
    >
      <span className="text-h2">LOGIN</span>
      <div className="flex flex-col gap-3 mt-10 mb-5 w-full">
        <CustomInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          type="email"
          ref={emailRef}
        />
        <CustomInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          ref={passwordRef}
        />
      </div>
      {error && <div className="text-navi1 text-red">{error}</div>}
      <CustomButton type="submit" className="w-full mt-5">
        LOGIN
      </CustomButton>
      <span
        onClick={() => nav("/signup")}
        className="text-navi1 text-[#797979] cursor-pointer mt-3"
      >
        회원가입
      </span>
    </form>
  );
};

export default LoginTemplate;
