import React, { useState, useEffect } from "react";
import CustomModal from "../../common/atoms/CustomModal";
import CustomButton from "../../common/atoms/CustomButton";
import MultiDropdownButton from "../atoms/MultiDropdownButton";

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "추가" | "수정";
  date?: string;
  title?: string;
  member?: string;
  description?: string;
  onSave: (data: {
    date: string;
    title: string;
    member: string;
    description: string;
  }) => void;
};

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
  { label: "Option 4", value: "option5" },
  { label: "Option 4", value: "option6" },
  { label: "Option 4", value: "option7" },
];

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  type,
  date = "",
  title = "",
  member = "",
  description = "",
  onSave,
}) => {
  const [form, setForm] = useState({
    date,
    title,
    member: member ? member.split(",") : [],
    description,
  });

  useEffect(() => {
    if (isOpen) {
      setForm({
        date,
        title,
        member: member ? member.split(",") : [],
        description,
      });
    }
  }, [isOpen, date, title, member, description]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.date || !form.title) {
      alert("날짜와 일정명은 필수 입력 사항입니다.");
      return;
    }

    onSave({
      ...form,
      member: form.member.join(","),
    });

    onClose();
  };

  const handleMemberChange = (selectedMembers: string[]) => {
    setForm((prevForm) => ({
      ...prevForm,
      member: selectedMembers,
    }));
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSave}>
        <div className="text-h2 mb-8 text-center">일정 {type}</div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center">
            <label className="text-b3 w-20">날짜</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-2 py-2 rounded-[10px] bg-[#F7F7F7]"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="text-b3 w-20">일정명</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="일정명을 입력하세요"
              className="w-full px-2 py-2 rounded-[10px] bg-[#F7F7F7]"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="text-b3 w-20">참석자</label>
            <MultiDropdownButton
              label="참석자를 선택하세요"
              options={options}
              name="member"
              values={form.member}
              onSelectedChange={handleMemberChange}
            />
          </div>

          <div>
            <label className="block mb-2 text-b3">설명</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="일정에 대한 설명을 입력하세요"
              className="w-full px-3 py-3 rounded-[10px] h-40 bg-[#F7F7F7] resize-none"
            />
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-7">
          <CustomButton
            cancel
            onClick={onClose}
            type="button"
            className="w-2/5 h-[45px] flex justify-center"
          >
            취소
          </CustomButton>
          <CustomButton
            type="submit"
            className="w-2/5 h-[45px] flex justify-center"
          >
            {type}
          </CustomButton>
        </div>
      </form>
    </CustomModal>
  );
};

export default ScheduleModal;
