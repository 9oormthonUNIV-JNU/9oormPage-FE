type LabelButtonProps = {
  label?: string;
  isActive?: boolean;
  onClick?: () => void;
};

const LabelButton: React.FC<LabelButtonProps> = ({
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex focus:outline-none hover:bg-[#e5e5e5] hover:border-[#e5e5e5] justify-center items-center px-5 py-3 h-[55px] rounded-full border 
          ${
            isActive
              ? "bg-[#9FBEF7] border-[#778FB9] text-white"
              : "bg-[#F7F7F7] border-[#E5E5E5] text-black"
          }`}
    >
      <span className="text-b3">{label}</span>
    </button>
  );
};

export default LabelButton;
