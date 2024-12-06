import React from "react";

const CustomCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`rounded-2xl flex overflow-hidden transition-all duration-300 ease-out hover:scale-[101%] hover:shadow-2xl ${className}`}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow =
          "0px 0px 30px 12px rgba(0, 0, 0, 0.15)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow =
          "0px 0px 20px 12px rgba(0, 0, 0, 0.05)")
      }
      {...props}
    />
  );
});

CustomCard.displayName = "CustomCard"; // forwardRef를 사용할 때 컴포넌트 이름을 설정하는 것이 좋습니다.

export default CustomCard;
