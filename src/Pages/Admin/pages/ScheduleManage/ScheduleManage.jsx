import "./ScheduleManage.scss";
import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomCalendar from "../../components/Calendar/CalendarAdmin";
import { getDepartmentDuty, getSchedule } from "@/services/adminService";
import useQuery from "@/hooks/useQuery";

const ScheduleManage = () => {
    const { data: listDepartment } = useQuery(() => getDepartmentDuty());
    const { data: listSchedule } = useQuery(() => getSchedule());
    let refresh = () => { };
    return (
        <div className="schedule-manage-content">
            <div className="container">
                <div className="schedule-content-header d-flex align-items-center justify-content-between py-3">
                    <div className="text">QUẢN LÝ LỊCH TRỰC</div>
                </div>
                <div className="p-3 schedule1-content mb-3">
                    {
                        listDepartment?.DT?.length > 0 && listSchedule?.DT?.schedule?.length > 0 &&
                        <CustomCalendar
                            listDepartment={listDepartment?.DT}
                            schedules={listSchedule?.DT?.schedule}
                            refresh={refresh}
                        />
                    }
                </div>
            </div>

        </div>
    )
}

export default ScheduleManage;