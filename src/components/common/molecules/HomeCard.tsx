import CustomCard from "../atoms/CustomCard";

export type HomeCardProps = {
  icon: string;
  title: string;
  discription: string;
  img: string;
};

const HomeCard: React.FC<HomeCardProps> = ({
  icon,
  title,
  discription,
  img,
}) => {
  return (
    <CustomCard
      className="w-96 h-[440px] flex flex-col overflow-hidden transition-all duration-300 ease-out hover:scale-[101%] hover:shadow-2xl"
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
          <img src={icon} className="w-8" />
          <span className="text-h3 truncate">{title}</span>
        </div>
        <div className="text-b3 mt-3 h-44">{discription}</div>
      </div>
      <div className="w-full h-[190px]">
        <img className="w-full h-full object-cover" src={img} />
      </div>
    </CustomCard>
  );
};

export default HomeCard;
