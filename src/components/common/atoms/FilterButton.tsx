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
  const [dropdownWidth, setDropdownWidth] = useState("200px");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    console.log(`Selected option: ${option}`);
    onClick(option);
  };

  useEffect(() => {
    if (buttonRef.current) {
      const buttonWidth = buttonRef.current.offsetWidth;
      setDropdownWidth(`${buttonWidth}px`);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex justify-center items-center h-14 px-5 rounded-full bg-gray-100 border border-gray-300 cursor-pointer gap-2"
      >
        <span className="text-b3">{selectedOption}</span>
        <img src={icon_down} alt="down arrow" />
      </button>
      {isOpen && (
        <div
          className="absolute top-full mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-md z-10"
          style={{ width: dropdownWidth }}
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-300"
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
