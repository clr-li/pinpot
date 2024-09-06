import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginButton from './Login';
import { grey } from '@material-ui/core/colors';

function MainNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">PinPot</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Map</Nav.Link>
            <Nav.Link href="/upload.html">Upload</Nav.Link>
            <Nav.Link href="#pricing">Search</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login.html">Login</Nav.Link>
            <Nav.Link href="/signup.html" style={{ "background-color": "grey", "border-radius": "5px", color: "white" }}>Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;