import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginTemplate = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex flex-col min-h-screen justify-center items-center lg:px-32 md:px-16">
      <span className="text-h2">LOGIN</span>
      <div className="flex flex-col gap-2 w-full my-10">
        <CustomInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          type="email"
        />
        <CustomInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
      </div>
      <CustomButton type="submit" className="w-full">
        LOGIN
      </CustomButton>
      <span
        onClick={() => nav("/signup")}
        className="text-navi1 text-[#797979] cursor-pointer mt-3"
      >
        회원가입
      </span>
    </div>
  );
};

export default LoginTemplate;
