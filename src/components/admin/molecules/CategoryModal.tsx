import { useState } from "react";
import CustomModal from "../../common/atoms/CustomModal";
import CustomButton from "../../common/atoms/CustomButton";
import DropdownButton from "../../common/atoms/DropdownButton";
import SeminarModal from "./SeminarModal";
import NetworkingModal from "./NetworkingModal";
import StudyModal from "./StudyModal";
import ProjectModal from "./ProejctModal";

type CategoryModalProps = {
  onClose: () => void;
};

const CategoryModal: React.FC<CategoryModalProps> = ({ onClose }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!selectedValue) {
      alert("카테고리를 선택해주세요.");
      return;
    }
    setActiveModal(selectedValue);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    onClose();
  };

  return (
    <>
      <CustomModal isOpen={!activeModal} onClose={onClose}>
        <div>
          <div className="text-b2 text-center mb-8">
            작성할 게시글의 카테고리를 선택하세요
          </div>
          <DropdownButton
            options={[
              { label: "네트워킹", value: "networking" },
              { label: "세미나", value: "seminar" },
              { label: "스터디", value: "study" },
              { label: "프로젝트", value: "project" },
            ]}
            value={selectedValue || ""}
            onChange={(value: string) => setSelectedValue(value)} // 선택 값 업데이트
            buttonHeight={50}
            dropdownHeight={55}
          />
          <div className="flex flex-row gap-4 justify-center w-full mt-9">
            <CustomButton
              cancel
              className="w-2/5 h-[48px] flex justify-center"
              onClick={onClose}
            >
              취소
            </CustomButton>
            <CustomButton
              className="w-2/5 h-[48px] flex justify-center"
              onClick={handleConfirm}
            >
              확인
            </CustomButton>
          </div>
        </div>
      </CustomModal>

      {activeModal === "networking" && (
        <NetworkingModal isOpen={false} onClose={handleCloseModal} />
      )}
      {activeModal === "seminar" && (
        <SeminarModal isOpen={false} onClose={handleCloseModal} />
      )}
      {activeModal === "study" && (
        <StudyModal isOpen={false} onClose={handleCloseModal} />
      )}
      {activeModal === "project" && (
        <ProjectModal isOpen={false} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default CategoryModal;
