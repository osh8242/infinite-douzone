// 작성자 : 오승환
import React, { Component } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import Menubar from "../components/Menubar.js";
import SelectForm from "../components/SelectForm.js";
import TextBoxComponent from "../components/TextBoxComponent.js";
import { border, color, display } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBell,
  faCalculator,
  faPlus,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBellSlash,
  faQuestionCircle,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

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
    const optionList = [{ key: "더존비즈온", value: "더존비즈온" }];
    const optionList2 = [
      { key: "김회계 주임연구원", value: "김회계 주임연구원" },
    ];
    return (
      <div>
        <div
          style={{
            background: "rgba(12,12,12,0.2)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <SelectForm optionList={optionList} />
            <SelectForm optionList={optionList} />
          </div>
          <div style={{ display: "flex", background: "rgba(12,12,12,0.2)" }}>
            <TextBoxComponent placeholder={"찾고싶은 메뉴를 검색하세요"} />
            <Button style={{ background: "none", border: "none" }}>
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "rgb(57,63,80)" }}
              />
            </Button>
            <Button style={{ background: "none", border: "none" }}>
              <FontAwesomeIcon
                icon={faBell}
                style={{ color: "rgb(57,63,80)" }}
              />
            </Button>
            <Button style={{ background: "none", border: "none" }}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                style={{ color: "rgb(57,63,80)" }}
              />
            </Button>
            <SelectForm optionList={optionList2} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "rgb(48,150,255)",
          }}
        >
          <div style={{ display: "flex" }}>
            <Button
              onClick={this.toggleSidebar}
              variant="outline-secondary"
              style={{ background: "rgba(0,0,127,0.3)", border: "none" }}
            >
              <i className={`fa fa-bars`} style={{ color: "white" }} />
            </Button>
            {/* 로고 */}
            <TextBoxComponent placeholder={"인사관리등록"} />
            <Button style={{ background: "none", border: "none" }}>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                style={{ color: "#ffffff" }}
              />
            </Button>
          </div>
          <div style={{ display: "flex" }}>
            <Button style={{ background: "none", border: "none" }}>
              <FontAwesomeIcon
                icon={faPrint}
                style={{ color: "rgb(57,63,80)", color: "white" }}
              />
            </Button>
            <Button style={{ background: "none", border: "none" }}>
              <FontAwesomeIcon
                icon={faTrashCan}
                style={{ color: "rgb(57,63,80)", color: "white" }}
              />
            </Button>
            <Button style={{ background: "none", border: "none" }}>
              <FontAwesomeIcon
                icon={faCalculator}
                style={{ color: "rgb(57,63,80)", color: "white" }}
              />
            </Button>
            <Button style={{ background: "none", border: "none" }}>
              <FontAwesomeIcon
                icon={faTrashCan}
                style={{ color: "rgb(57,63,80)", color: "white" }}
              />
            </Button>
          </div>
        </div>
        {/* <Navbar bg="light" expand="lg">
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
        <Menubar showSidebar={this.state.showSidebar} /> */}
      </div>
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
