
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
        HANDBOOK_MANAGE: "/adminHandbook",
        HANDBOOK_DETAIL: "/adminHandbookDetail",
        SCHEDULE_MANAGE: "/adminSchedule",
        //EXAMINATION_MANAGE: "/adminExamination",
    },
    STAFF: {
        DASHBOARD: "/doctor",
        APPOINTMENT: "/doctorAppointment",
        EXAMINATION: "/doctorExamination/:examId",
        HANDBOOK: "/doctorHandbook",
        SCHEDULE: "/doctorSchedule",
        PROFILE: "/doctorProfile",
    },
    RECEPTIONIST: {
        DASHBOARD: "/receptionist",
    },
    HOME: {
        HOMEPAGE: "/",
        DOCTOR_DETAIL: "/doctor-detail",
        DOCTOR_LIST: "/doctor-list",
        HANDBOOK_LIST: "/handbookList",
        LOGIN: "/login",
    }
}