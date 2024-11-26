type CustomTagProps = {
  children: React.ReactNode;
};

const CustomTag: React.FC<CustomTagProps> = ({ children }) => {
  return (
    <div className="items-center flex justify-center py-[4px] px-[16px] h-[30px] w-[60px] rounded-[10px] bg-[#E1EBFD]">
      <span>{children}</span>
    </div>
  );
};

export default CustomTag;
