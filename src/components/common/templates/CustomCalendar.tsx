import { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import ScheduleModal from "../../admin/molecules/ScheduleModal";
import LabelButton from "../../common/atoms/LabelButton";
import "./CustomCalendar.css";
import ReactDOM from "react-dom";

type Schedule = {
  date: string;
  title: string;
  member: string;
  description: string;
};

type CustomCalendarProps = {
  admin?: boolean;
};

const DropdownMenuPortal = ({
  children,
  position,
}: {
  children: React.ReactNode;
  position: { top: number; left: number; width: number };
}) => {
  return ReactDOM.createPortal(
    <div
      className="flex flex-col gap-2 p-3 rounded-[10px] bg-white"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        width: `${position.width}px`,
        boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.25)",
        zIndex: 100,
        minWidth: "120px",
      }}
    >
      {children}
    </div>,
    document.body
  );
};

const CustomCalendar: React.FC<CustomCalendarProps> = ({ admin }) => {
  const [date, setDate] = useState(new Date());
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalForm, setModalForm] = useState<Schedule>({
    date: "",
    title: "",
    member: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [events, setEvents] = useState<Schedule[]>([
    {
      date: "2024-12-15",
      title: "회의",
      member: "최지원",
      description: "팀 회의",
    },
    {
      date: "2024-12-22",
      title: "프로젝트 마감",
      member: "최지원",
      description: "최종 마감",
    },
  ]);

  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  }>({
    top: 0,
    left: 0,
    width: 0,
  });

  const handleEditEvent = (eventToEdit: Schedule) => {
    setModalForm(eventToEdit);
    setIsEditing(true);
    setModalIsOpen(true);
    setOpenDropdown(null);
  };

  const handleDeleteEvent = (eventToDelete: Schedule) => {
    if (window.confirm(`"${eventToDelete.title}" 일정을 삭제하시겠습니까?`)) {
      setEvents(events.filter((event) => event.date !== eventToDelete.date));
      setOpenDropdown(null);
    }
  };

  const handleOpenModal = () => {
    setIsEditing(false);
    setModalForm({
      date: "",
      title: "",
      member: "",
      description: "",
    });
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSave = () => {
    if (isEditing) {
      setEvents(
        events.map((event) =>
          event.date === modalForm.date ? modalForm : event
        )
      );
    } else {
      setEvents([...events, modalForm]);
    }
    handleCloseModal();
  };

  const findEvent = (tileDate: Date) => {
    const dateStr = tileDate.toISOString().split("T")[0];
    return events.find((event) => event.date === dateStr);
  };

  const handlePrevMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  };

  // Ref to track event positions
  const eventRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    // resize 이벤트 핸들러
    const handleResize = () => {
      if (openDropdown) {
        const eventElement = eventRefs.current[openDropdown];
        if (eventElement) {
          const rect = eventElement.getBoundingClientRect();
          setDropdownPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
          });
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [openDropdown]); // openDropdown이 변경될 때마다 위치를 재계산

  const toggleDropdown = (
    dateStr: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect(); // 클릭된 div 위치 계산
    setDropdownPosition({
      top: rect.bottom + window.scrollY, // 일정 div 바로 아래에 드롭다운 위치
      left: rect.left + window.scrollX, // 일정 div 왼쪽과 일치하도록
      width: rect.width, // 일정 div의 넓이와 동일하게 설정
    });
    setOpenDropdown(openDropdown === dateStr ? null : dateStr); // 드롭다운 토글
  };

  return (
    <div className="relative flex flex-col w-full bg-white z-10">
      <div className="flex justify-center items-center gap-8 mb-20">
        <button className="text-3xl cursor-pointer" onClick={handlePrevMonth}>
          {"<"}
        </button>
        <div className="text-b1">
          {date.toLocaleDateString("ko-KR", { year: "numeric", month: "long" })}
        </div>
        <button className="text-3xl cursor-pointer" onClick={handleNextMonth}>
          {">"}
        </button>
      </div>

      {admin && (
        <div className="absolute top-0 right-0 z-10 flex justify-end items-center mb-5 mt-3">
          <LabelButton label="+ 일정 추가" onClick={handleOpenModal} />
        </div>
      )}

      <Calendar
        value={date}
        locale="ko-KR"
        showNavigation={false}
        calendarType="hebrew"
        tileClassName={({ date, view }) =>
          view === "month" && date.toDateString() === new Date().toDateString()
            ? "today-tile"
            : ""
        }
        tileContent={({ date: tileDate, view }) => {
          if (view !== "month") return null;
          if (tileDate.getMonth() !== date.getMonth()) return null;

          const event = findEvent(tileDate);
          const dateStr = tileDate.toISOString().split("T")[0];
          const isOpen = openDropdown === dateStr;

          return (
            <>
              <div
                className={`text-b3 relative ${
                  tileDate.getDay() === 0 ? "text-red" : "text-black"
                }`}
              >
                {tileDate.getDate()}
              </div>
              {event && (
                <div
                  ref={(el) => (eventRefs.current[dateStr] = el)} // Reference to the event element
                  className={`flex items-center gap-2 p-2 mt-2 w-full rounded-lg bg-[#E1EBFD]`}
                  onClick={(e) => admin && toggleDropdown(dateStr, e)}
                >
                  <span
                    className="text-navi1"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {event.title}
                  </span>
                  {isOpen && admin && (
                    <DropdownMenuPortal position={dropdownPosition}>
                      <button
                        className="p-1 text-navi1 rounded-[10px] bg-white hover:bg-[#e5e5e5]"
                        onClick={() => handleEditEvent(event)}
                      >
                        일정 수정
                      </button>
                      <button
                        className="p-1 text-navi1 rounded-[10px] bg-white hover:bg-[#e5e5e5]"
                        onClick={() => handleDeleteEvent(event)}
                      >
                        일정 삭제
                      </button>
                    </DropdownMenuPortal>
                  )}
                </div>
              )}
            </>
          );
        }}
      />

      {/* CustomModal for adding/editing events */}
      <ScheduleModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        date={modalForm.date}
        member={modalForm.member}
        type={isEditing ? "수정" : "추가"}
        title={modalForm.title}
        description={modalForm.description}
      />
    </div>
  );
};

export default CustomCalendar;
