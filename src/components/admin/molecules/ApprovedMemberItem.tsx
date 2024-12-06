import CustomTag from "../../common/atoms/CustomTag";
import MemberItem from "../atoms/MemberItem";

type ApprovedMemberItemProps = {
  name: string;
  email: string;
  user_cardinal: number;
  user_part: string;
};

const ApprovedMemberItem: React.FC<ApprovedMemberItemProps> = ({
  name,
  email,
  user_cardinal,
  user_part,
}) => {
  return (
    <MemberItem name={name} email={email}>
      <div className="flex flex-row gap-2">
        <CustomTag>{user_cardinal}기</CustomTag>
        <CustomTag bgColor="#F7F7F7">{user_part}</CustomTag>
      </div>
      <CustomTag bgColor="#F7F7F7" click>
        <span className="text-red">회원 삭제</span>
      </CustomTag>
    </MemberItem>
  );
};

export default ApprovedMemberItem;
