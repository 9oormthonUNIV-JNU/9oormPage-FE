import icon_pencil from "../../../../public/icons/icon_pencil.svg";
import img_flower from "../../../../public/images/img_flower.svg";
import CustomCard from "../atoms/CustomCard";

const HomeCard = () => {
  return (
    <CustomCard
      className="lg:w-96 md:w-72 h-[440px] flex flex-col overflow-hidden transition-all duration-300 ease-out hover:scale-[101%] hover:shadow-2xl"
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow =
          "0px 0px 30px 12px rgba(0, 0, 0, 0.15)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow =
          "0px 0px 20px 12px rgba(0, 0, 0, 0.05)")
      }
    >
      <div className="px-5 pt-5 flex flex-col flex-grow">
        <div className="flex gap-3">
          <img src={icon_pencil} className="w-8" />
          <span className="text-h3 truncate">네트워킹 Networking</span>
        </div>
        <div className="text-b3 mt-3 h-44">
          9UAP은 ‘9oormthonUNIV After Party’의 약자로, 해커톤 대상 및 최우수
          수상자들 그리고 현직 전문가들의 세미나와 마무리 회고를 진행하는
          행사입니다.
        </div>
      </div>
      {/* 이미지 아래로 밀어내기 */}
      <div className="bg-black w-full h-[190px]">
        <img className="w-full h-full object-cover" src={img_flower} />
      </div>
    </CustomCard>
  );
};

export default HomeCard;
