import { ReactNode } from "react";

export type MemberItemProps = {
  children: ReactNode;
  className?: string;
  name: string;
  email: string;
};

const MemberItem = ({ name, email, children, className }: MemberItemProps) => {
  return (
    <div
      className={`border-[#D8D8D8] border-[1px] px-5 py-4 rounded-[20px] w-[512px] flex flex-col ${className}`}
    >
      <div className="flex flex-row gap-1 mb-2.5">
        <span className="text-b2">{name}</span>
        <span className="text-b2 text-[#ababab]">({email})</span>
      </div>
      <div className="flex flex-row justify-between items-center">
        {children}
      </div>
    </div>
  );
};

export default MemberItem;
