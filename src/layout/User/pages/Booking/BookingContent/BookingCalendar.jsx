import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Booking.scss";
import { faCircleLeft, faCircleRight, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import userService from "@/services/userService";
import { useMutation } from "@/hooks/useMutation";

// Dữ liệu mẫu
const scheduleData = [
    { date: "2024-12-06", times: ["09:00 - 10:00", "10:00 - 11:00"] },
    { date: "2024-12-09", times: ["13:00 - 14:00", "14:00 - 15:00"] },
    { date: "2024-12-12", times: ["09:00 - 10:00", "15:00 - 16:00"] },
];
const BookingCalendar = (props) => {
    let data = props?.doctor?.staffScheduleData.map(item => item.date);
    let [listSchedule, setListSchedule] = useState([]);
    const {
        data: dataSchedule,
        loading: loadingSchedule,
        execute: fetchSchedule,
    } = useMutation(() => userService.getScheduleApoinment({ date: data }));
    useEffect(() => {
        if (dataSchedule) { setListSchedule(dataSchedule?.DT || []); }
    }, [dataSchedule]);
    useEffect(() => {
        fetchSchedule();
    }, []);
    console.log(listSchedule);
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleMonthChange = (direction) => {
        setCurrentMonth((prev) =>
            direction === "next" ? prev.add(1, "month") : prev.subtract(1, "month")
        );
    };

    const renderCalendar = () => {
        const startOfMonth = currentMonth.startOf("month");
        const endOfMonth = currentMonth.endOf("month");

        const daysInMonth = Array.from(
            { length: endOfMonth.date() },
            (_, i) => startOfMonth.add(i, "day")
        );

        return daysInMonth.map((day) => {
            const dateStr = day.format("YYYY-MM-DD");
            const isAvailable = scheduleData.some((item) => item.date === dateStr);

            return (
                <div
                    key={dateStr}
                    className={`day ${isAvailable ? "" : "disabled"} ${selectedDate === dateStr ? "active" : ""
                        }`}
                    onClick={() => isAvailable && handleDateClick(dateStr)}
                >
                    {day.date()}
                </div>
            );
        });
    };

    const renderTimeSlots = () => {
        if (!selectedDate) return null;

        const schedule = scheduleData.find((item) => item.date === selectedDate);

        return (
            <div className="time-slots">
                {schedule?.times.map((slot, idx) => (
                    <div key={idx} className="slot">
                        {slot}
                    </div>
                ))}
            </div>
        );
    };
    return (
        <div>
            <div className="header">
                <FontAwesomeIcon className='icon-back' icon={faLeftLong} onClick={() => { props.back() }} />
                Vui lòng chọn ngày khám
            </div>
            <div className='content'>
                <div className="month-booking">
                    <FontAwesomeIcon icon={faCircleLeft} color="grey" onClick={() => handleMonthChange("back")} />
                    <span>THÁNG {currentMonth.format("MM-YYYY")}</span>
                    <FontAwesomeIcon className="icon-next" icon={faCircleRight} onClick={() => handleMonthChange("next")} />
                </div>
                <div className="days">{renderCalendar()}</div>
                {renderTimeSlots()}
            </div>
        </div >
    );
}

export default BookingCalendar;