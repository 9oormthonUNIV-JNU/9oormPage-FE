import CustomModal from "../../common/atoms/CustomModal";
import CustomButton from "../../common/atoms/CustomButton";
import DropdownButton from "../../common/atoms/DropdownButton";

const CategoryModal = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <CustomModal isOpen={true} onClose={onClose}>
      <div className="">
        <div className="text-b2 text-center mb-8">
          작성할 게시글의 카테고리를 선택하세요
        </div>
        <DropdownButton
          buttonHeight={50}
          dropdownHeight={55}
          options={[
            { label: "네트워킹", value: "networking" },
            { label: "세미나", value: "seminar" },
            { label: "스터디", value: "study" },
            { label: "프로젝트", value: "project" },
          ]}
        />
        <div className="flex flex-row gap-4 justify-center w-full mt-9">
          <CustomButton cancel className="w-40 h-[50px]" onClick={onClose}>
            취소
          </CustomButton>
          <CustomButton
            className="w-40 h-[50px]"
            onClick={() => {
              onConfirm(); // 확인 버튼 클릭 시 PostModal을 열기 위한 함수 호출
              onClose(); // SelectModal 닫기
            }}
          >
            확인
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default CategoryModal;
