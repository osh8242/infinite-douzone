// 작성자 : 오승환
import React, { Component } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import Menubar from '../components/Menubar.js';
import SelectForm from '../components/SelectForm.js';
import TextBoxComponent from '../components/TextBoxComponent.js';
import { border, color, display } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faBell,
  faCalculator,
  faPlus,
  faPrint,
  faBorderAll,
} from '@fortawesome/free-solid-svg-icons';
import {
  faQuestionCircle,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import '../styles/header.css';
import logo from '../styles/img/empRegisterLogo.png';

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
    const optionList = [{ key: '더존비즈온', value: '더존비즈온' }];
    const optionList2 = [
      { key: '김회계 주임연구원', value: '김회계 주임연구원' },
    ];
    return (
      <div>
        <div id="topNotificationHeader">
          <div id="topLeftNotificationHeader">
            <SelectForm id="companySelectForm" optionList={optionList} />
            <SelectForm id="periodSelectForm" optionList={optionList} />
          </div>
          <div id="topRightNotificationHeader">
            <TextBoxComponent placeholder={'찾고싶은 메뉴를 검색하세요'} />
            <button className="backgroundBorderNone">
              <FontAwesomeIcon icon={faPlus} className="colorDark" />
            </button>
            <button className="backgroundBorderNone">
              <FontAwesomeIcon icon={faBell} className="colorDark" />
            </button>
            <button className="backgroundBorderNone">
              <FontAwesomeIcon icon={faQuestionCircle} className="colorDark" />
            </button>
            <SelectForm optionList={optionList2} />
          </div>
        </div>
        <div id="secondTopHeader">
          <div id="secondTopHeaderContents">
            <Button
              id="toggleSidebarBtn"
              onClick={this.toggleSidebar}
              variant="outline-secondary"
            >
              <i className={`fa fa-bars colorWhite`} />
            </Button>
            {/* 로고 */}
            <img id="logo" src={logo} alt="" />
            <button className="backgroundBorderNone">
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="colorWhite backgroundBorderNone"
              />
            </button>
          </div>
          <div id="secondTopHeaderMenuList">
            <button className="backgroundBorderNone">
              <FontAwesomeIcon icon={faPrint} className="colorWhite" />
            </button>
            <button className="backgroundBorderNone">
              <FontAwesomeIcon icon={faTrashCan} className="colorWhite" />
            </button>
            <button className="backgroundBorderNone">
              <FontAwesomeIcon icon={faCalculator} className="colorWhite" />
            </button>
            <button className="backgroundBorderNone">
              <FontAwesomeIcon icon={faBorderAll} className="colorWhite" />
            </button>
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
