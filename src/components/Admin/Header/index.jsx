import { MODAL_TYPE } from "@/constant/general";
import { useAuthenContext } from "@/contexts/AuthenContext";
import { NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function AdminHeader() {
    const { handleLogout, handleLogin, handleShowModal, handleModalClose } =
        useAuthenContext();
    const isAuthenticated = false;

    return (
        <div>HEADER ADMIN</div>
    );
}

export default AdminHeader;
