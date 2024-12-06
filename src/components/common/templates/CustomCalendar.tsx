import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
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
      className="flex flex-col gap-3 p-4 bg-gray-100 rounded-xl shadow-lg"
      style={{
        top: position.top,
        left: position.left,
        width: `${position.width}px`,
        boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      {children}
    </div>,
    document.body
  );
};

const CustomCalendar: React.FC<CustomCalendarProps> = ({ admin }) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
      date: "2024-10-15",
      title: "회의",
      member: "최지원",
      description: "팀 회의",
    },
    {
      date: "2024-10-22",
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

  const handleModalChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setModalForm({
      ...modalForm,
      [e.target.name]: e.target.value,
    });
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

  const handleDateClick: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  const toggleDropdown = (
    dateStr: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
    setOpenDropdown(openDropdown === dateStr ? null : dateStr);
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
        onChange={handleDateClick}
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
                {selectedDate &&
                  selectedDate.toDateString() === tileDate.toDateString() && (
                    <div className="absolute top-1/2 left-1/2 w-7 h-7 bg-[#8FABDE] rounded-full -translate-x-1/2 -translate-y-1/2 z-[1]"></div>
                  )}
              </div>
              {event && (
                <div
                  className={`flex items-center gap-2 p-2 mt-2 rounded-lg bg-[#E1EBFD] cursor-${
                    admin ? "pointer" : "default"
                  }`}
                  onClick={(e) => admin && toggleDropdown(dateStr, e)}
                >
                  <span className="text-navi1">{event.name}</span>
                  {isOpen && admin && (
                    <DropdownMenuPortal position={dropdownPosition}>
                      <button
                        className="p-2 text-b3 rounded-[10px] hover:bg-[#e5e5e5]"
                        onClick={() => handleEditEvent(event)}
                      >
                        일정 수정
                      </button>
                      <button
                        className="p-2 text-b3 rounded-[10px] hover:bg-[#e5e5e5]"
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
        type={isEditing ? "수정" : "추가"}
        title={modalForm.title}
        description={modalForm.description}
      />
    </div>
  );
};

export default CustomCalendar;
