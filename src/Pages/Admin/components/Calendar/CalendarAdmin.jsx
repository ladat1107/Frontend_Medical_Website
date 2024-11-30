import React, { useState } from "react";
import { Table, Button, DatePicker, } from 'antd';
import dayjs from "dayjs";
import { formatDate1 } from "@/utils/formatDate";
import { secondaryColorAdmin } from "@/style/variables";
import "./Calendar.scss";
import { ROLE } from "@/constant/role";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { getSchedule } from "@/services/adminService";
import ScheduleModal from "../Modal/ScheduleModal";
import { set } from "lodash";

const ScheduleTable = (props) => {
    const [currentWeek, setCurrentWeek] = useState(dayjs());
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [scheduleUpdate, setScheduleUpdate] = useState({});
    const [shifts, setShifts] = useState([
        props.schedules.map((schedule) => ({
            doctorId: schedule.staffId,
            roomId: schedule.roomId,
            doctor: schedule.staffScheduleData.staffUserData.lastName + " " + schedule.staffScheduleData.staffUserData.firstName,
            date: dayjs(schedule.date).format('YYYY-MM-DD'),
            roleId: schedule.staffScheduleData.staffUserData.roleId,
        })),
    ]);
    const departments = props.listDepartment;
    // Tạo các ngày trong tuần
    const daysOfWeek = Array(7).fill(0).map((_, i) => currentWeek.startOf("week").add(i + 1, "day")); // Thứ 2 → Chủ nhật

    // Cột của bảng
    const columns = [
        {
            title: "Khoa",
            dataIndex: "departmentName",
            key: "departmentName",
            width: 50,
            onCell: (record) => ({
                rowSpan: record.rowSpan, // Gộp hàng
            }),
            render: (text) => text,
        },
        {
            title: "Phòng",
            dataIndex: "roomName",
            key: "roomName",
            width: 50,
        },
        ...daysOfWeek.map((date) => ({
            title: formatDate1(date),
            dataIndex: date.format("YYYY-MM-DD"),
            key: date.format("YYYY-MM-DD"),
            onCell: (record) => ({
                onDoubleClick: () => handleGetSchedule(date, record.roomId, record.roomName, record.departmentId),
            }),
            render: (_, record) => {
                // Lọc lịch trực cho roomId và ngày tương ứng
                const shiftsForDate = shifts[0].filter(
                    (shift) =>
                        shift.roomId === record.roomId &&
                        shift.date === date.format("YYYY-MM-DD")

                );
                console.log(shiftsForDate);
                // Hiển thị danh sách bác sĩ và giờ trực
                return shiftsForDate.length > 0 ? (
                    <div style={{ cursor: "pointer" }} >
                        <ul style={{ padding: 0, listStyleType: "none" }}>
                            {shiftsForDate
                                .filter((shift) => shift.roleId === ROLE.DOCTOR)
                                .map((shift) => (
                                    <li key={`doctor-${shift.doctor}-${shift.date}-${shift.roomId}`}>
                                        <div
                                            style={{
                                                color: secondaryColorAdmin,
                                                fontWeight: "600",
                                            }}
                                        >  BS.{shift.doctor}</div>
                                    </li>
                                ))}
                            {shiftsForDate
                                .filter((shift) => shift.roleId !== ROLE.DOCTOR)
                                .map((shift) => (
                                    <li key={`other-${shift.doctor}-${shift.date}-${shift.roomId}`}>
                                        {shift.roleId === ROLE.NURSE && (
                                            <span
                                                style={{
                                                    color: secondaryColorAdmin,
                                                    textTransform: "italic",
                                                }}
                                            >
                                                {shift.doctor}
                                            </span>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    </div >
                ) : (<div >
                    <FontAwesomeIcon className="icon-plus-center" icon={faPlus} />
                </div>);
                // onDoubleClick={() => handleGetSchedule(date, record.roomId, record.roomName)}
            },
        })),
    ];
    // Hàm tạo dữ liệu cho bảng
    const prepareTableData = (data) => {
        const tableData = [];
        data.forEach((dept) => {
            dept.roomData.forEach((room, index) => {
                tableData.push({
                    key: `${dept.name}-${room.id}`,
                    departmentName: dept.name,
                    departmentId: dept.id,
                    roomId: room.id,
                    roomName: room.name,
                    rowSpan: index === 0 ? dept.roomData.length : 0, // Gộp hàng
                });
            });
        });
        return tableData;
    };
    const tableData = prepareTableData(departments);
    // Điều hướng tuần
    const handleWeekChange = (direction) => {
        setCurrentWeek(currentWeek.add(direction, "week"));
    };
    const handleGetSchedule = async (date, roomId, roomName, departmentId) => {
        date = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
        let response = await getSchedule({ date, roomId });
        if (response.data.EC === 0) {
            setScheduleUpdate({ ...response.data.DT, date, roomName, departmentId, roomId });
            setIsModalOpen(true);
        }
    }
    let refresh = () => {
        setScheduleUpdate(null);
        setIsModalOpen(false);
        props.refresh();
    }
    return (
        <div className="admin-calender">
            <div style={{ marginBottom: 16 }}>
                <Button onClick={() => handleWeekChange(-1)}>Tuần trước</Button>
                <Button onClick={() => handleWeekChange(1)} style={{ marginLeft: 8 }}>
                    Tuần sau
                </Button>
                <DatePicker
                    picker="week"
                    onChange={(value) => setCurrentWeek(value)}
                    style={{ marginLeft: 8 }}
                />
                <Button onClick={() => setIsModalOpen(true)} style={{ marginLeft: 8 }}>
                    Thêm lịch trực
                </Button>
            </div>
            <Table
                className="custom-schedule-table"
                style={{ userSelect: "none" }}
                columns={columns}
                dataSource={tableData}
                pagination={false}
            />
            <ScheduleModal
                open={isModalOpen}
                data={scheduleUpdate}
                refresh={refresh} />
        </div>
    );
};

export default ScheduleTable;
