import React, { useState, useRef, useEffect } from "react";
import icon_down from "../../../../public/icons/icon_down.svg";

type FilterButtonProps = {
  filterType: string;
  options: string[];
  onClick: (option: string) => void;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  filterType,
  options,
  onClick,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(filterType);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onClick(option);
  };

  // 버튼의 너비를 계산하여 상태로 저장
  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [selectedOption]); // selectedOption이 변경될 때마다 버튼의 너비를 업데이트

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex items-center justify-center gap-2 px-5 py-3 h-[55px] rounded-full bg-[#F7F7F7] border border-[#E5E5E5] cursor-pointer hover:border-[#e5e5e5] hover:bg-[#e5e5e5] focus:bg-transparent focus:outline-none"
        style={{ minWidth: buttonWidth ? `${buttonWidth}px` : "auto" }} // 버튼의 너비가 자동으로 결정되도록 min-width 사용
      >
        <span className="text-b3 text-center">{selectedOption}</span>
        {/* 아이콘을 오른쪽 끝에 고정 */}
        <img src={icon_down} alt="down arrow" className="ml-auto" />
      </button>
      {isOpen && (
        <div
          className="absolute bg-[#F7F7F7] rounded-[10px] z-10 p-3"
          style={{ minWidth: buttonWidth ? `${buttonWidth}px` : "auto" }} // 드롭다운 메뉴도 버튼과 동일한 너비로 유지
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className="text-center px-4 py-2 cursor-pointer rounded-[10px] hover:bg-[#D8D8D8]"
            >
              <span className="text-b3">{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
