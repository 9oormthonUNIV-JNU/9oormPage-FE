type CustomTagProps = {
  children: React.ReactNode;
  bgColor?: string;
};

const CustomTag: React.FC<CustomTagProps> = ({ children, bgColor }) => {
  return (
    <div
      className={`items-center flex justify-center box-border px-5 py-1 w-auto rounded-[10px]`}
      style={{
        backgroundColor: bgColor || "#E1EBFD",
      }}
    >
      <span className="text-b3">{children}</span>
    </div>
  );
};

export default CustomTag;
