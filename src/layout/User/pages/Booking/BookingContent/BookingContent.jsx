import { useState } from "react";
import "../Booking.scss"
import BookingDoctor from "./BookingDoctor";
import BookingSpecialty from "./BookingSpecialty";
const content = {
    specialty: "specialty",
    doctor: "doctor"
}
const BookingContent = () => {
    let [currentContent, setCurrentContent] = useState(content.specialty);
    let [specialty, setSpecialty] = useState(null);
    let handleStepSpecialty = (specialty) => {
        setSpecialty(specialty);
        setCurrentContent(content.doctor);
    }
    return (
        <div className="booking-content">
            <div className="header">Vui lòng chọn chuyên khoa</div>
            <div className="content">
                {currentContent === content.specialty && <BookingSpecialty onClick={handleStepSpecialty} />}
                {currentContent === content.doctor && <BookingDoctor
                    specialty={specialty?.id}
                    onClick={(doctor) => console.log(doctor)}
                />}
            </div>
        </div>
    );
}

export default BookingContent;