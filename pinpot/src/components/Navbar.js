import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from './Login';

function MainNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">PinPot</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Map</Nav.Link>
            <Nav.Link href="/upload.html">Upload</Nav.Link>
            <Nav.Link href="#pricing">Search</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="#memes">
                <LoginButton />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;