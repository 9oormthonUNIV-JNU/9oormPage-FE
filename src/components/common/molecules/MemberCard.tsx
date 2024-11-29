import CustomCard from "../atoms/CustomCard";
import CustomTag from "../atoms/CustomTag";

export type MemberCardProps = {
  name: string;
  cardinal: number;
  part: string;
  image: string;
};

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  cardinal,
  part,
  image,
}) => {
  return (
    <CustomCard className="w-80 h-[470px] flex-col">
      <div className="h-80 w-full">
        <img src={image} className="w-full h-full object-cover" />
      </div>
      <div className="px-5 py-5 flex flex-col gap-5">
        <div className="text-b2">{name}</div>
        <div className="flex gap-2">
          <CustomTag>{cardinal}기</CustomTag>
          <CustomTag>{part}</CustomTag>
        </div>
      </div>
    </CustomCard>
  );
};

export default MemberCard;
