import { useState } from "react";

import MemberManagePage from "./MemberManagePage";
import ScheduleManagePage from "./ScheduleManagePage";
import PostManagePage from "./PostManagePage";

interface MenuOption {
  label: string;
  value: string;
}

const menuOptions: MenuOption[] = [
  { label: "회원 관리", value: "member" },
  { label: "일정 관리", value: "schedule" },
  { label: "게시글 관리", value: "post" },
];

const MenuBar: React.FC<{
  onMenuClick: (page: string) => void;
  activePage: string;
}> = ({ onMenuClick, activePage }) => {
  return (
    <div className="flex flex-col rounded-[10px] border-[#E5E5E5] border-[1px] p-5 gap-4">
      {menuOptions.map(({ label, value }) => (
        <span
          key={value}
          onClick={() => onMenuClick(value)}
          className={`text-b2 w-full cursor-pointer text-black px-4 py-1 rounded-[10px] hover:bg-[#e5e5e5] hover:text-black ${
            activePage === value ? "bg-[#d9d9d9]" : ""
          }`}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

const AdminPage: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>("member");

  const handleMenuClick = (page: string) => {
    setSelectedPage(page);
  };

  const renderPage = (page: string) => {
    switch (page) {
      case "member":
        return <MemberManagePage />;
      case "schedule":
        return <ScheduleManagePage />;
      case "post":
        return <PostManagePage />;
      default:
        return <MemberManagePage />;
    }
  };

  return (
    <div className="flex flex-col h-full p-16 md:px-8 lg:px-16">
      <div className="text-h1 flex justify-center mb-10">Admin Page</div>
      <div className="flex flex-1">
        <aside className="w-52">
          <MenuBar onMenuClick={handleMenuClick} activePage={selectedPage} />
        </aside>
        <div className="flex-1 md:px-10 lg:px-20">
          {renderPage(selectedPage)}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
