type CustomTagProps = {
  children: React.ReactNode;
  bgColor?: string;
  click?: boolean;
};

const CustomTag: React.FC<CustomTagProps> = ({ children, bgColor, click }) => {
  return (
    <div
      className={`items-center flex justify-center box-border px-5 py-1 w-auto rounded-[10px] 
        ${click ? "cursor-pointer" : ""}`}
      style={{
        backgroundColor: bgColor || "#E1EBFD",
      }}
    >
      <span className="text-b3">{children}</span>
    </div>
  );
};

export default CustomTag;
