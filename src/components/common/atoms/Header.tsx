import React from "react";
import logo_horizontal from "../../../../public/logos/logo_horizontal.svg";
import { useNavigate } from "react-router-dom";

type MenuProps = {
  menuItems: { label: string; path: string }[];
};

const menuItems = [
  { label: "Member", path: "/member" },
  { label: "Activities", path: "/activity" },
  { label: "Recruit", path: "/recruit" },
  { label: "Login", path: "/login" },
];

const Menu: React.FC<MenuProps> = ({ menuItems }) => {
  const nav = useNavigate();

  return (
    <ul className="flex space-x-12">
      {menuItems.map((item, index) => (
        <li
          key={index}
          className="text-white text-navi1 cursor-pointer hover:text-red"
          onClick={() => nav(item.path)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

const Header = () => {
  const nav = useNavigate();

  return (
    <div className="bg-main w-screen h-20 items-center flex justify-between px-16">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => nav("/")}
      >
        <img className="w-44" src={logo_horizontal} alt="Logo" />
        <span className="text-white text-b3">&nbsp;: CNU</span>
      </div>
      <div>
        <Menu menuItems={menuItems} />
      </div>
    </div>
  );
};

export default Header;
