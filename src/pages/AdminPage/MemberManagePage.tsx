import ApprovedMemberItem from "../../components/admin/molecules/ApprovedMemberItem";
import PendingMemberItem from "../../components/admin/molecules/PendingMemberItem";
import { PendingMemberItemProps } from "../../components/admin/molecules/PendingMemberItem";
import { ApprovedMemberItemProps } from "../../components/admin/molecules/ApprovedMemberItem";

const pendingMembers: PendingMemberItemProps[] = [
  {
    name: "홍길동",
    email: "hong@example.com",
    registrationDate: "2024.09.25",
  },
  {
    name: "김유진",
    email: "kim@example.com",
    registrationDate: "2024.09.26",
  },
  {
    name: "이수진",
    email: "lee@example.com",
    registrationDate: "2024.09.27",
  },
];

const approvedMembers: ApprovedMemberItemProps[] = [
  {
    name: "최지원",
    email: "choi@example.com",
    user_cardinal: 1,
    user_part: "PM",
  },
  {
    name: "박민수",
    email: "park@example.com",
    user_cardinal: 2,
    user_part: "개발자",
  },
  {
    name: "정서연",
    email: "jung@example.com",
    user_cardinal: 3,
    user_part: "디자이너",
  },
];

const MemberManagePage = () => {
  return (
    <div className="w-full h-auto ">
      <div className="text-b1 mb-5 ml-2">승인 대기 중인 회원</div>
      <div className="flex gap-4 flex-wrap mb-16">
        {pendingMembers ? (
          pendingMembers.map((member) => (
            <PendingMemberItem
              key={member.name}
              name={member.name}
              email={member.email}
              registrationDate={member.registrationDate}
            />
          ))
        ) : (
          <span>승인 대기 중인 회원이 없습니다.</span>
        )}
      </div>
      <div className="text-b1 mb-5 ml-2">회원 목록</div>
      <div className="flex gap-4 flex-wrap mb-10">
        {approvedMembers ? (
          approvedMembers.map((member) => (
            <ApprovedMemberItem
              key={member.name}
              name={member.name}
              email={member.email}
              user_cardinal={member.user_cardinal}
              user_part={member.user_part}
            />
          ))
        ) : (
          <div>승인된 회원이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MemberManagePage;
