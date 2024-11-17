
export const PATHS = {
    ADMIN: {
        DASHBOARD: "/admin",
        PATIENT_MANAGE: "/adminPatientManage",
        STAFF_MANAGE: "/adminStaffManage",
        DEPARTMENT_MANAGE: "/adminDepartmentManage",
        ROOM_MANAGE: "/adminRoomManage",
        SERVICE_MANAGE: "/adminServiceManage",
        PROFILE: "/staffProfile",
        SPECIALTY_MANAGE: "/adminSpecialty",
    },
    STAFF: {
        DASHBOARD: "/doctor",
        APPOINTMENT: "/doctorAppointment",
        EXAMINATION: "/doctorExamination/:examId",
        HANDBOOK: "/doctorHandbook",
        INFO_HANDBOOK: "/doctorHandbook/:handbookId",
        SCHEDULE: "/doctorSchedule",
    },
    RECEPTIONIST:{
        DASHBOARD: "/receptionist",
    },
    HOME: {
        HOMEPAGE: "/",
        LOGIN: "/login",
        LOGOUT: "/logout",
    }
}