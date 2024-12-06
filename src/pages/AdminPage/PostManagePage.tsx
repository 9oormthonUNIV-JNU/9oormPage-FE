import React, { useState } from "react";
import CustomTag from "../../components/common/atoms/CustomTag";
import LabelButton from "../../components/common/atoms/LabelButton";

export type Post = {
  title: string;
  category: "seminar" | "networking" | "project" | "study";
  date: string;
};

const PostManagePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // 한 페이지에 표시할 게시글 수

  const mockData = [];

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const translateCategory = (category: string): string => {
    switch (category) {
      case "project":
        return "프로젝트";
      case "study":
        return "스터디";
      case "seminar":
        return "세미나";
      case "networking":
        return "네트워킹";
      default:
        return category;
    }
  };

  // 페이지네이션 관련 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = mockData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(mockData.length / postsPerPage);

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 이전 페이지로 이동
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // 다음 페이지로 이동
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div>
      <div className="flex flex-row justify-between mb-8">
        <div className="text-b1">게시글 관리</div>
        <LabelButton label=" + 게시글 추가" />
      </div>
      <table className="w-full mb-5">
        <thead>
          <tr className="bg-[#E1EBFD] text-black text-b3">
            <th className="py-3 px-4 text-left">게시글 이름</th>
            <th className="py-3 px-4 text-left">카테고리</th>
            <th className="py-3 px-4 text-left">등록/수정일</th>
            <th className="py-3 px-4 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {mockData.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-b3 py-10 px-4">
                <span>작성된 게시글이 없습니다.</span>
              </td>
            </tr>
          ) : (
            currentPosts.map((post, index) => (
              <tr key={index} className="border-t-2 text-b3">
                <td className="py-3 px-4">{post.title}</td>
                <td className="py-3 px-4">
                  {translateCategory(post.category)}
                </td>
                <td className="py-3 px-4">{formatDate(post.date)}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-row gap-2">
                    <CustomTag bgColor="#F7F7F7" click>
                      <span className="text-black w-full flex text-center">
                        수정
                      </span>
                    </CustomTag>
                    <CustomTag bgColor="#F7F7F7" click>
                      <span className="text-red w-full flex text-center">
                        삭제
                      </span>
                    </CustomTag>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center gap-3 my-16 text-b3">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="py-1 px-3 bg-[#e5e5e5] text-black disabled:opacity-50"
        >
          &lt;
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`py-1 px-3 ${
              currentPage === index + 1
                ? "bg-main text-white"
                : "bg-white text-black"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="py-1 px-3 bg-[#e5e5e5] text-black disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PostManagePage;
