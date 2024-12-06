import CustomInput from "../components/common/atoms/CustomInput";
import CustomButton from "../components/common/atoms/CustomButton";
import DropdownButton from "../components/common/atoms/DropdownButton";
import icon_eye from "../../public/icons/icon_eye.svg";
import { useState } from "react";
import { postSignup } from "../apis/signup";
import { sendEmail } from "../apis/signup";
import { postCode } from "../apis/signup";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    usercode: "",
    password: "",
    user_cardinal: "",
    user_part: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showAuthCodeInput, setShowAuthCodeInput] = useState<boolean>(false); // State to control visibility of auth code input
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to control visibility of password

  const nav = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, usercode, password, user_cardinal, user_part } =
      formData;
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = "이름을 입력해주세요.";
    if (!email) newErrors.email = "이메일을 입력해주세요.";
    if (!usercode) newErrors.authCode = "인증코드를 입력해주세요.";
    if (!password) newErrors.password = "비밀번호를 입력해주세요.";
    else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/.test(password))
      newErrors.password = "비밀번호가 조건에 맞지 않습니다.";
    if (!user_cardinal) newErrors.cardinal = "기수를 선택해주세요.";
    if (!user_part) newErrors.part = "파트를 선택해주세요.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { email, password, name, user_cardinal, user_part } = formData;
      const result = await postSignup({
        email,
        password,
        name,
        user_cardinal,
        user_part,
      });

      if (result?.data.success) {
        nav("/pending");
      } else {
        setErrors({ general: "회원가입에 실패했습니다." });
      }
    } catch (error) {
      console.error("회원가입 실패 : ", error);
      setErrors({ general: "회원가입 중 오류가 발생했습니다." });
    }
  };

  const handleAuthButtonClick = async () => {
    const { email } = formData;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "유효한 이메일을 입력해주세요.",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, email: "" }));

    try {
      const result = await sendEmail(email);
      if (result?.data.success) {
        setShowAuthCodeInput(true);
      } else {
        setErrors({ general: "인증코드 전송에 실패했습니다." });
      }
    } catch (error) {
      console.error("인증코드 요청 오류:", error);
      setErrors({ general: "인증코드 요청 중 오류가 발생했습니다." });
    }
  };

  const handleAuthCodeSubmit = async () => {
    const { usercode, email } = formData;

    if (!usercode) {
      setErrors({ authCode: "인증코드를 입력해주세요." });
      return;
    }

    const numericUserCode = Number(usercode);

    if (isNaN(numericUserCode)) {
      setErrors({ authCode: "유효한 인증코드를 입력해주세요." });
      return;
    }

    try {
      const result = await postCode(email, numericUserCode);
      if (result?.data.success) {
        setErrors({ general: "인증 완료!" });
      } else {
        setErrors({ general: "인증코드가 일치하지 않습니다." });
      }
    } catch (error) {
      console.error("인증 실패:", error);
      setErrors({ general: "인증 실패. 다시 시도해주세요." });
    }
  };

  const { name, email, usercode, password, user_cardinal, user_part } =
    formData;

  return (
    <div className="flex flex-col justify-center items-center md:px-36 lg:px-[500px]">
      <div className="text-h1 mt-20">SIGN UP</div>
      <div className="text-b3 bg-[#E5E5E5] rounded-[20px] px-6 py-5 mt-10">
        회원가입 대상자는 구름톤 유니브 전남대 회원입니다. 그 외 사용자가
        회원가입 할 경우 회원가입 승인 처리가 되지 않습니다.
      </div>
      <form
        className="w-full flex flex-col mt-10 gap-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <CustomInput
            label="이름"
            placeholder="김구름"
            type="text"
            value={name}
            onChange={handleChange}
            required
          />
          {errors.name && (
            <div className="text-navi1 text-red pl-2.5">{errors.name}</div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full gap-3">
            <CustomInput
              label="이메일"
              placeholder="abcd123@gmail.com"
              type="email"
              value={email}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="text-b3 text-white bg-main h-[64px] rounded-[20px] w-[150px] text-center mt-10 border-[#8FABDE]"
              onClick={handleAuthButtonClick}
            >
              인증하기
            </button>
          </div>
          {errors.email && (
            <div className="text-navi1 text-red pl-2.5">{errors.email}</div>
          )}
          {showAuthCodeInput && (
            <div className="flex flex-col gap-2">
              <div className="flex w-full gap-3">
                <CustomInput
                  placeholder="인증코드 입력"
                  type="text"
                  value={usercode}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="text-b3 text-white bg-main h-[64px] rounded-[20px] w-[150px] text-center border-[#8FABDE]"
                  onClick={handleAuthCodeSubmit}
                >
                  인증 확인
                </button>
              </div>
              {errors.authCode && (
                <div className="text-navi1 text-red pl-2.5">
                  {errors.authCode}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative">
            <CustomInput
              label="비밀번호"
              placeholder="비밀번호"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent mt-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={icon_eye} width={30} />
            </button>
          </div>
          <span className="text-navi1 pl-2.5">
            영문자/숫자/특수문자가 포함된 8~15자 조합으로 입력해주세요.
          </span>
          {errors.password && (
            <div className="text-navi1 text-red pl-2.5">{errors.password}</div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <DropdownButton
            label="기수 선택"
            value={user_cardinal}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, user_cardinal: value }))
            }
            options={[
              { label: "1기", value: "1" },
              { label: "2기", value: "2" },
              { label: "3기", value: "3" },
            ]}
          />
          {errors.cardinal && (
            <div className="text-navi1 text-red pl-2.5">{errors.cardinal}</div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <DropdownButton
            label="파트 선택"
            value={user_part}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, user_part: value }))
            }
            options={[
              { label: "PM", value: "PM" },
              { label: "PD", value: "PD" },
              { label: "FE", value: "FE" },
              { label: "BE", value: "BE" },
            ]}
          />
          {errors.part && (
            <div className="text-navi1 text-red pl-2.5">{errors.part}</div>
          )}
        </div>

        <CustomButton type="submit" className="mt-10 mb-36">
          SIGN UP
        </CustomButton>
      </form>
    </div>
  );
};

export default SignupPage;
