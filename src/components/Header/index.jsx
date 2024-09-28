import { MODAL_TYPE } from "@/constant/general";
import { useAuthenContext } from "@/contexts/AuthenContext";
import { NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const { handleLogout, handleLogin, handleShowModal, handleModalClose } =
    useAuthenContext();
  const isAuthenticated = false;

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{ padding: "20px 30px" }}
    >
      <Container fluid>
        <Navbar.Brand href="#">Hospital Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>

          <Form className="d-flex me-4">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <div>
            {isAuthenticated ? (
              <NavDropdown title="Account" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button
                  variant="outline-primary"
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn hành vi mặc định
                    handleShowModal(MODAL_TYPE.login); // Xử lý logic sau khi ngăn hành vi mặc định
                  }}
                  className="me-2"
                >
                  Login
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn hành vi mặc định
                    handleShowModal(MODAL_TYPE.register); // Xử lý logic sau khi ngăn hành vi mặc định
                   
                  }}
                  className="me-2"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
