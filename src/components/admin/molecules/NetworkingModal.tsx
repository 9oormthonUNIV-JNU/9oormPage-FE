import React, { useState, useRef } from "react";
import CustomModal from "../../common/atoms/CustomModal";
import CustomButton from "../../common/atoms/CustomButton";
import icon_trash from "../../../../public/icons/icon_trash.svg";
import icon_star from "../../../../public/icons/icon_star.svg";
import icon_star_fill from "../../../../public/icons/icon_star_fill.svg";

const NetworkingModal = ({
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [form, setForm] = useState({
    title: "",
    date: "",
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
    <CustomModal isOpen={true} onClose={onClose}>
      <form>
        <div className="text-h2 mb-8 text-center">네트워킹 게시글 작성</div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center">
            <label className="text-b3 w-16">제목</label>
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
            <label className="text-b3 w-16">날짜</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full cursor-pointer px-2 py-2 rounded-[10px] bg-[#F7F7F7]"
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

export default NetworkingModal;
