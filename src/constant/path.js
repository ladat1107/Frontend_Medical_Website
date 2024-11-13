
export const PATHS = {
    ADMIN: {
        DASHBOARD: "/admin",
        PATIENT_MANAGE: "/adminPatientManage",
        STAFF_MANAGE: "/adminStaffManage",
        DEPARTMENT_MANAGE: "/adminDepartmentManage",
        ROOM_MANAGE: "/adminRoomManage",
        SERVICE_MANAGE: "/adminServiceManage",
        PROFILE: "/staffProfile",
    },
    STAFF: {
        DASHBOARD: "/doctor",
        APPOINTMENT: "/doctorAppointment",
        EXAMINATION: "/doctorExamination/:examId",
        HANDBOOK: "/doctorHandbook",
        INFO_HANDBOOK: "/doctorHandbook/:handbookId",
        SCHEDULE: "/doctorSchedule",
    },
    HOME: {
        HOMEPAGE: "/",
        LOGIN: "/login",
        LOGOUT: "/logout",
    }
}
{/* <Route path={PATHS.STAFF.DASHBOARD} element={<DoctorHomePage />} />
<Route path='/doctorAppointment' element={<Appointment />} />
<Route path='/doctorExamination/:examId' element={<Examination />} />
<Route path='/doctorHandbook' element={<Handbook />} />
<Route path='/doctorHandbook/:handbookId' element={<InfoHandbook />} />
<Route path='/doctorSchedule' element={<Schedule />} /> */}