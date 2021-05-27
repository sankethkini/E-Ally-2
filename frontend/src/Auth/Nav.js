import React from "react";
import { Nav, Navbar} from "react-bootstrap";
const nav = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">E-Ally</Navbar.Brand>

      <Nav className="ml-auto">
        <Nav.Link href="/login">
          <strong>Login</strong>
        </Nav.Link>
        <Nav.Link href="/signup">
          <strong>Signup</strong>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default nav;
