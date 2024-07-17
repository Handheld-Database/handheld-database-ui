import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Menu: React.FC = () => {
  return (
    <Navbar bg="transparent" variant="dark" expand="lg" className='py-4'>
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/images/logo.png"
            width="auto"
            height="25"
            className="d-inline-block align-center"
            alt="Handheld Database Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="https://github.com/Handheld-Database">GitHub</Nav.Link>
            <Nav.Link href="/#/collaborators">Collaborators</Nav.Link>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;