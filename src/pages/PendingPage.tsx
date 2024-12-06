import { useNavigate } from "react-router-dom";
import logo_danpoong from "../../public/logos/logo_danpoong.svg";
import CustomButton from "../components/common/atoms/CustomButton";

const PendingPage = () => {
  const nav = useNavigate();

  return (
    <div className="flex flex-col md:px-[200px] py-20 justify-center items-center text-center">
      <div className="flex flex-col gap-3 justify-center items-center">
        <div className="text-h1">해당 계정은 아직 승인 대기 중입니다!</div>
        <div className="text-b1">
          관리자가 회원 승인 시 정상 로그인이 가능합니다.
        </div>
      </div>
      <CustomButton className="w-80 my-10" onClick={() => nav("/")}>
        메인페이지로 이동하기
      </CustomButton>
      <img src={logo_danpoong} className="my-5" />
    </div>
  );
};

export default PendingPage;
