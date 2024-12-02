import logo_danpoong from "../../../../public/logos/logo_danpoong.svg";
import logo_horizontal from "../../../../public/logos/logo_horizontal.svg";

const LoginLogoTemplate = () => {
  return (
    <div className="bg-main min-h-screen flex flex-col items-center justify-center py-28">
      <div className="text-h1 text-white flex flex-column text-center ">
        BEING ALL SEASON <br />
        WITH GOORM
      </div>
      <div className="flex my-5">
        <img src={logo_horizontal} />
        <span className="text-[24px] text-white">&nbsp;: CNU</span>
      </div>
      <div className="w-96 my-5">
        <img src={logo_danpoong} className="w-full" />
      </div>
    </div>
  );
};

export default LoginLogoTemplate;
