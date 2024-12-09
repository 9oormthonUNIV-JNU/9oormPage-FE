import React, { useState, useRef } from "react";
import CustomModal from "../../common/atoms/CustomModal";
import CustomButton from "../../common/atoms/CustomButton";
import MultiDropdownButton from "../atoms/MultiDropdownButton";
import icon_trash from "../../../../public/icons/icon_trash.svg";
import icon_star from "../../../../public/icons/icon_star.svg";
import icon_star_fill from "../../../../public/icons/icon_star_fill.svg";

const ProjectModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [form, setForm] = useState({
    title: "",
    member: [] as string[], // member는 string[] 타입으로 명시
    category: [] as string[], // category도 string[] 타입으로 명시
    description: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [thumbnailIndex, setThumbnailIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleMemberChange = (selectedMembers: string[]) => {
    setForm((prevForm) => ({
      ...prevForm,
      member: selectedMembers, // selectedMembers는 string[] 타입
    }));
  };

  const handleCategoryChange = (selectedCategories: string[]) => {
    setForm((prevForm) => ({
      ...prevForm,
      category: selectedCategories, // selectedCategories는 string[] 타입
    }));
  };

  const members = [
    { label: "김철수", value: "kim" },
    { label: "이영희", value: "lee" },
    { label: "박민수", value: "park" },
  ];

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFilesArray = Array.from(files);
      const nonDuplicateFiles = newFilesArray.filter(
        (newFile) =>
          !selectedFiles.some(
            (existingFile) =>
              existingFile.name === newFile.name &&
              existingFile.lastModified === newFile.lastModified
          )
      );
      const updatedFiles = [...selectedFiles, ...nonDuplicateFiles];
      setSelectedFiles(updatedFiles);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFiles(updatedFiles);

    if (thumbnailIndex === indexToRemove) {
      setThumbnailIndex(null);
    } else if (thumbnailIndex !== null && thumbnailIndex > indexToRemove) {
      setThumbnailIndex(thumbnailIndex - 1);
    }
  };

  const setThumbnail = (index: number) => {
    setThumbnailIndex(index);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <form>
        <div className="text-h2 mb-8 text-center">프로젝트 게시글 작성</div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center">
            <label className="text-b3 w-28">제목</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
              className="w-full px-2 py-2 rounded-[10px] bg-[#F7F7F7]"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="text-b3 w-28">참석자</label>
            <MultiDropdownButton
              label="참석자를 선택하세요"
              options={members}
              name="member"
              values={form.member}
              onSelectedChange={handleMemberChange}
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="text-b3 w-28">카테고리</label>
            <MultiDropdownButton
              label="카테고리를 선택하세요"
              options={[
                { label: "교내 프로젝트", value: "university" },
                { label: "해커톤", value: "hackathon" },
              ]}
              name="category"
              values={form.category}
              onSelectedChange={handleCategoryChange}
            />
          </div>

          <div>
            <label className="block mb-2 text-b3">내용</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="게시글 내용을 입력하세요"
              className="w-full px-3 py-3 rounded-[10px] h-40 bg-[#F7F7F7] resize-none"
            />
          </div>

          <div className="flex flex-row ">
            <label className="block mb-2 text-b3 mr-12">사진 첨부</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFilesSelected}
              ref={fileInputRef}
            />
          </div>
          <div className="flex flex-col gap-3">
            {selectedFiles.length > 0 &&
              selectedFiles.map((file, index) => (
                <div key={index} className="flex flex-row">
                  <span className="mr-4">{file.name}</span>
                  <div className="flex gap-1">
                    <img
                      className="cursor-pointer"
                      onClick={() => setThumbnail(index)}
                      src={
                        thumbnailIndex === index ? icon_star_fill : icon_star
                      }
                      alt="썸네일"
                    />
                    <img
                      className="cursor-pointer"
                      src={icon_trash}
                      alt="삭제"
                      onClick={() => removeFile(index)}
                    />
                  </div>
                </div>
              ))}
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
            작성
          </CustomButton>
        </div>
      </form>
    </CustomModal>
  );
};

export default ProjectModal;
