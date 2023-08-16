// 작성자 : 오승환
import React, { Component } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import Menubar from "../components/Menubar.js";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
    };
  }

  toggleSidebar = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  };

  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Button
            className="mx-2"
            onClick={this.toggleSidebar}
            variant="outline-secondary"
          >
            <i className={`fa fa-bars`} />
          </Button>
          <Navbar.Brand className="mx-5" href="#home">
            Douzone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Menubar showSidebar={this.state.showSidebar} />
      </>
    );
  }
}

export default Header;

// import React, { useState } from 'react';
// import { Navbar, Nav, Button } from 'react-bootstrap';
// import Menubar from './Menubar';

// function Header() {
//   const [showSidebar, setShowSidebar] = useState(false);

//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   return (
//     <>
//       <Navbar bg="light" expand="lg">
//         <Button onClick={toggleSidebar} variant="outline-secondary">
//           <i className={`fa fa-bars`} />
//         </Button>
//         <Navbar.Brand href="#home">My Website</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#link">Link</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//       <Menubar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
//     </>
//   );
// }

// export default Header;
