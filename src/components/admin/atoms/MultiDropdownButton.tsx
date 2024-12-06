import React, {
  useState,
  useRef,
  useEffect,
  ButtonHTMLAttributes,
} from "react";
import icon_down from "../../../../public/icons/icon_down.svg";

type Option = {
  label: string;
  value: string;
};

type MultiDropdownButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  options: Option[];
  values?: string[];
  onSelectedChange?: (selected: string[]) => void;
};

const MultiDropdownButton: React.FC<MultiDropdownButtonProps> = ({
  label = "Select",
  options,
  values = [],
  onSelectedChange,
  className = "",
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(values);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedSelection);
    if (onSelectedChange) onSelectedChange(updatedSelection);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex w-full relative justify-between items-center">
      <button
        type="button"
        ref={buttonRef}
        onClick={toggleDropdown}
        className={` w-full flex justify-between items-center text-navi1 rounded-[10px] py-2 px-2 border ${className}`}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        {...rest}
      >
        <span
          className="text-navi1 text-gray-400"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selectedOptions.length > 0
            ? selectedOptions
                .map(
                  (value) =>
                    options.find((opt) => opt.value === value)?.label || ""
                )
                .join(", ")
            : label}
        </span>
        <img src={icon_down} alt="dropdown icon" />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            width: buttonRef.current?.offsetWidth,
            maxHeight: "200px",
            overflowY: "auto",
          }}
          className="absolute right-0 bg-[#F7F7F7] top-[calc(100%+10px)] border rounded-[10px] p-3 z-10 "
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`flex items-center mt-2 px-2 py-1 cursor-pointer bg-[#F7F7F7] rounded-[10px] z-10 p-3 hover:bg-[#D8D8D8] text-navi1 ${
                selectedOptions.includes(option.value) ? "bg-[#D8D8D8]" : ""
              }`}
            >
              <span className="text-navi1">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdownButton;
