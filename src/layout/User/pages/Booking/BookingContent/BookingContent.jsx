import { useState } from "react";
import "../Booking.scss"
import BookingDoctor from "./BookingDoctor";
import BookingSpecialty from "./BookingSpecialty";
import BookingCalendar from "./BookingCalendar";
const content = {
    specialty: "specialty",
    doctor: "doctor",
    schedule: "schedule",
}
const BookingContent = (props) => {
    let [currentContent, setCurrentContent] = useState(content.specialty);
    let specialty = props.specialty;
    let doctor = props.doctor;
    let handleStepSpecialty = (specialty) => {
        props.setSpecialty(specialty);
        setCurrentContent(content.doctor);
    }
    let handleStepDoctor = (value) => {
        props.setDoctor(value);
        setCurrentContent(content.schedule);
    }
    return (
        <div>
            <div className="booking-content">
                {currentContent === content.specialty && <BookingSpecialty
                    next={handleStepSpecialty} />}
                {currentContent === content.doctor && <BookingDoctor
                    specialtyId={specialty?.id}
                    next={handleStepDoctor}
                    back={() => { setCurrentContent(content.specialty), props.setSpecialty(null) }} />}
                {currentContent === content.schedule && <BookingCalendar
                    doctor={doctor}
                    back={() => { setCurrentContent(content.doctor), props.setDoctor(null) }} />}
            </div>
        </div>

    );
}

export default BookingContent;