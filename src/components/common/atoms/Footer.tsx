import logo_horizontal from "../../../../public/logos/logo_horizontal.svg";
import icon_github from "../../../../public/icons/icon_github.svg";
import icon_instagram from "../../../../public/icons/icon_instagram.svg";

const Footer = () => {
  return (
    <div className="bg-[#2B2D36] h-80 pt-16 px-24 flex flex-col justify-between pb-11">
      <div className="items-start justify-between flex">
        <div className="flex-col">
          <div className="flex">
            <img className="w-44" src={logo_horizontal} alt="Logo" />
            <span className="text-white text-b3">&nbsp;: CNU</span>
          </div>
          <div className="text-white pt-2 text-lg">"사계절 구름과 함께"</div>
        </div>
        <div className="flex gap-10">
          <img src={icon_github} className="w-12" />
          <img src={icon_instagram} className="w-12" />
        </div>
      </div>
      <div className="text-white font-thin flex">
        @ goorm Inc. All rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
