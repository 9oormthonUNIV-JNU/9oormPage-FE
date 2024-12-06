import React, { useRef, useState, useEffect } from "react";
import icon_down from "../../../../public/icons/icon_down.svg";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // 콘텐츠의 높이를 계산하여 state 업데이트
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]); // children이 변경될 때마다 높이를 다시 계산

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`w-full rounded-[24px] overflow-hidden transition-all duration-300 ${
        isOpen ? "bg-[#E1EBFD]" : "bg-[#F7F7F7]"
      }`}
    >
      <button
        onClick={toggleAccordion}
        className={`w-full p-5 focus:bg-transparent focus:outline-none text-left flex items-center justify-between border-none cursor-pointer transition-colors duration-300 ${
          isOpen ? "bg-[#E1EBFD]" : "bg-[#F7F7F7]"
        } hover:${isOpen ? "bg-[#E1EBFD]" : "bg-[#E2E6EA]"}`}
      >
        <span className="text-h3">{title}</span>
        <img
          style={{ paddingRight: "20px" }}
          src={icon_down}
          alt="down arrow"
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out bg-[#E1EBFD]`}
        style={{
          maxHeight: isOpen ? `${contentHeight + 50}px` : "0",
          padding: isOpen ? "10px 20px 20px" : "0 20px 0 10px",
        }}
        ref={contentRef}
      >
        <div className="text-b3 break-all text-[#5E5E5E]">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
