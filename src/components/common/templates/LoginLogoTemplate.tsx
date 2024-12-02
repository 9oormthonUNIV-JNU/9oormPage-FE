import logo_danpoong from "../../../../public/logos/logo_danpoong.svg";
import logo_horizontal from "../../../../public/logos/logo_horizontal.svg";

const LoginLogoTemplate = () => {
  return (
    <div className="bg-main flex flex-shrink-0 flex-col items-center py-36">
      <div className="lg:text-h1 md:text-h3 text-white flex flex-column text-center">
        BEING ALL SEASON <br />
        WITH GOORM
      </div>
      <div className="flex flex-row my-5">
        <img src={logo_horizontal} />
        <span className="lg:text-[24px] md:text-[20px] text-white">
          &nbsp;: CNU
        </span>
      </div>
      <div className="lg:w-[550px] md:w-80 my-5">
        <img src={logo_danpoong} className="w-full" />
      </div>
    </div>
  );
};

export default LoginLogoTemplate;
