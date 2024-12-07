import "./Booking.scss";
import Container from "@/components/Container";
import BookingInformation from "./BookingInformation";
import BookingContent from "./BookingContent/BookingContent";
import { useState } from "react";
const Booking = () => {
    let [specialty, setSpecialty] = useState(null);
    let [doctor, setDoctor] = useState(null);
    return (
        <div className={"bg"} >
            <Container>
                <div className="appointment-home-content row d-flex jutify-content-start align-items-start ">
                    <div className="col-12 col-lg-3 py-2 pe-3">
                        <BookingInformation
                            specialty={specialty}
                            doctor={doctor} />
                    </div>
                    <div className="col-12 col-lg-9 py-2 ps-2">
                        <BookingContent
                            specialty={specialty}
                            setSpecialty={setSpecialty}
                            doctor={doctor}
                            setDoctor={setDoctor} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Booking;