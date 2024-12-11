import React, { useState, useEffect, useRef } from "react";
import logo_horizontal from "../../../../public/logos/logo_horizontal.svg";
import { useNavigate } from "react-router-dom";
import icon_circle from "../../../../public/icons/icon_circledimage.svg";

const DropdownMenu = ({
  role,
  onLogout,
}: {
  role: string;
  onLogout: () => void;
}) => {
  const options =
    role === "admin"
      ? [
          { label: "마이페이지", path: "/mypage" },
          { label: "관리자페이지", path: "/admin" },
          { label: "일정", path: "/schedule" },
          { label: "로그아웃", path: "logout" },
        ]
      : [
          { label: "마이페이지", path: "/mypage" },
          { label: "일정", path: "/schedule" },
          { label: "로그아웃", path: "logout" },
        ];

  const nav = useNavigate();

  const handleOptionClick = (path: string) => {
    if (path === "logout") {
      onLogout();
    } else {
      nav(path);
    }
  };

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#F7F7F7] top-[calc(100%+10px)] border rounded-[10px] p-2 w-32 z-10 text-center">
      {options.map((option) => (
        <div
          key={option.path}
          onClick={() => handleOptionClick(option.path)}
          className="px-4 py-2 cursor-pointer hover:bg-[#D8D8D8] rounded"
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

const Header = () => {
  const nav = useNavigate();
  const [role, setRole] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedImage = localStorage.getItem("image");
    const token = localStorage.getItem("token");

    if (storedRole) {
      setRole(storedRole);
    }

    if (storedImage) {
      setImage(storedImage);
    }

    if (token) {
      setHasToken(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("image");
    setHasToken(false);
    setRole("");
    setImage("");
    nav("/login");
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="bg-main w-screen h-20 items-center flex justify-between px-16 relative">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => nav("/")}
      >
        <img className="w-44" src={logo_horizontal} alt="Logo" />
        <span className="text-white text-b3">&nbsp;: CNU</span>
      </div>
      <div className="relative flex items-center space-x-8">
        <ul className="flex space-x-12">
          <li
            className="text-white text-navi1 cursor-pointer hover:text-red"
            onClick={() => nav("/member")}
          >
            Member
          </li>
          <li
            className="text-white text-navi1 cursor-pointer hover:text-red"
            onClick={() => nav("/activity")}
          >
            Activities
          </li>
          <li
            className="text-white text-navi1 cursor-pointer hover:text-red"
            onClick={() => nav("/recruit")}
          >
            Recruit
          </li>
        </ul>
        {hasToken ? (
          <div
            className="cursor-pointer relative"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <img
              src={image || icon_circle}
              alt="User Icon"
              className="w-11 rounded-full"
            />
            {isDropdownOpen && hasToken && (
              <div ref={dropdownRef}>
                <DropdownMenu role={role} onLogout={handleLogout} />
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => nav("/login")}
            className="text-white text-b3 hover:text-red"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
