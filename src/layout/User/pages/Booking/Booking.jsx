import "./Booking.scss";
import Container from "@/components/Container";
import BookingInformation from "./BookingInformation";
import BookingContent from "./BookingContent/BookingContent";
const Booking = () => {

    return (
        <div className={"bg"} >
            <Container>
                <div className="appointment-home-content row d-flex jutify-content-start align-items-start ">
                    <div className="col-12 col-lg-3 py-2 pe-3">
                        <BookingInformation />
                    </div>
                    <div className="col-12 col-lg-9 py-2 ps-2">
                        <BookingContent />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Booking;