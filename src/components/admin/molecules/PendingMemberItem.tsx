import CustomTag from "../../common/atoms/CustomTag";
import MemberItem from "../atoms/MemberItem";

type PendingMemberItemProps = {
  name: string;
  email: string;
  registrationDate: string;
};

const PendingMemberItem: React.FC<PendingMemberItemProps> = ({
  name,
  email,
  registrationDate,
}) => {
  return (
    <MemberItem name={name} email={email}>
      <span className="text-b3">신청일: {registrationDate}</span>
      <div className="flex flex-row gap-2">
        <CustomTag click>승인</CustomTag>
        <CustomTag bgColor="#F7F7F7" click>
          거절
        </CustomTag>
      </div>
    </MemberItem>
  );
};

export default PendingMemberItem;
