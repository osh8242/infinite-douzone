// 작성자 : 오승환

import {
  faQuestionCircle,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowUpRightFromSquare,
  faBell,
  faBorderAll,
  faCalculator,
  faPlus,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import ContextModel from "../model/ContextModel";
import "../styles/header.css";
import empAdd from "../styles/img/empAddLogo.png";

// 각 페이지별 로고 이미지 링크 (배포시 서버에 저장 후 절대경로로 수정)
const logoUrl = {
  emp: "../styles/img/empRegisterLogo.png",
  empAdd: "../styles/img/empAddLogo.png",
};

const Header = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const { contextActions } = useContext(ContextModel);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const optionList2 = [
    { key: "김회계 주임연구원", value: "김회계 주임연구원" },
  ];

  return (
    <div>
      <div id="topNotificationHeader">
        <div id="topLeftNotificationHeader">
          <select id="companySelectForm" defaultValue={"douzone"}>
            <option id="douzone">더존비즈온</option>
          </select>
          <select id="periodSelectForm" defaultValue={"5"}>
            <option id="5">5기 2023.03.13~2023.10.17 (2023년도)</option>
            <option id="4">4기 2023.03.13~2023.10.17 (2023년도)</option>
            <option id="3">3기 2023.03.13~2023.10.17 (2023년도)</option>
            <option id="2">2기 2023.03.13~2023.10.17 (2023년도)</option>
            <option id="1">1기 2023.03.13~2023.10.17 (2023년도)</option>
          </select>
        </div>
        <div id="topRightNotificationHeader">
          <input
            type="text"
            id="findMenuBar"
            placeholder={"찾고싶은 메뉴를 검색하세요"}
          />
          <button className="backgroundBorderNone">
            <FontAwesomeIcon icon={faPlus} className="colorDark" />
          </button>
          <button className="backgroundBorderNone">
            <FontAwesomeIcon icon={faBell} className="colorDark" />
          </button>
          <button className="backgroundBorderNone">
            <FontAwesomeIcon icon={faQuestionCircle} className="colorDark" />
          </button>
          <select id="personalMenu">
            {/* 이름과 직종은 추후 변수로 변경 */}
            <option>김회계 주임연구원</option>
            {/* 하단에 추가할 메뉴를 넣습니다 */}
          </select>
        </div>
      </div>
      {/* <div id="secondTopHeader">
        <div id="secondTopHeaderContents">
          <Button
            id="toggleSidebarBtn"
            onClick={toggleSidebar}
            variant="outline-secondary"
          >
            <i className={`fa fa-bars colorWhite`} />
          </Button>
          {/* 로고 */}
      {/* <img id="logo" src={empAdd} alt="" />
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
          <button
            className="backgroundBorderNone"
            onClick={(e) => contextActions.deleteSelectedRows()}
          >
            <FontAwesomeIcon icon={faTrashCan} className="colorWhite" />
          </button>
          <button className="backgroundBorderNone">
            <FontAwesomeIcon icon={faCalculator} className="colorWhite" />
          </button>
          <button className="backgroundBorderNone">
            <FontAwesomeIcon icon={faBorderAll} className="colorWhite" />
          </button>
        </div> 
      </div> */}
    </div>
  );
};

export default Header;

// import React, { Component } from 'react';
// import { Button, Nav, Navbar } from 'react-bootstrap';
// import Menubar from '../components/Menubar.js';
// import SelectForm from '../components/SelectForm.js';
// import TextBoxComponent from '../components/TextBoxComponent.js';
// import { border, color, display } from '@mui/system';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faArrowUpRightFromSquare,
//   faBell,
//   faCalculator,
//   faPlus,
//   faPrint,
//   faBorderAll,
// } from '@fortawesome/free-solid-svg-icons';
// import {
//   faQuestionCircle,
//   faTrashCan,
// } from '@fortawesome/free-regular-svg-icons';
// import '../styles/header.css';
// import emp from '../styles/img/empRegisterLogo.png';
// import empAdd from '../styles/img/empAddLogo.png';

// // 각 페이지별 로고 이미지 링크 (배포시 서버에 저장 후 절대경로로 수정)
// const logoUrl = {
//   emp: '../styles/img/empRegisterLogo.png',
//   empAdd: '../styles/img/empAddLogo.png',
// };

// class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showSidebar: false,
//     };
//   }

//   toggleSidebar = () => {
//     this.setState({ showSidebar: !this.state.showSidebar });
//   };

//   render() {
//     const optionList2 = [
//       { key: '김회계 주임연구원', value: '김회계 주임연구원' },
//     ];

//     return (
//       <div>
//         {/* white color header (고정) */}
//         <div id="topNotificationHeader">
//           <div id="topLeftNotificationHeader">
//             <select id="companySelectForm" defaultValue={'douzone'}>
//               <option id="douzone">더존비즈온</option>
//             </select>
//             <select id="periodSelectForm" defaultValue={'5'}>
//               <option id="5">5기 2023.03.13~2023.10.17 (2023년도)</option>
//               <option id="4">4기 2023.03.13~2023.10.17 (2023년도)</option>
//               <option id="3">3기 2023.03.13~2023.10.17 (2023년도)</option>
//               <option id="2">2기 2023.03.13~2023.10.17 (2023년도)</option>
//               <option id="1">1기 2023.03.13~2023.10.17 (2023년도)</option>
//             </select>
//           </div>
//           <div id="topRightNotificationHeader">
//             <input
//               type="text"
//               id="findMenuBar"
//               placeholder={'찾고싶은 메뉴를 검색하세요'}
//             />
//             <button className="backgroundBorderNone">
//               <FontAwesomeIcon icon={faPlus} className="colorDark" />
//             </button>
//             <button className="backgroundBorderNone">
//               <FontAwesomeIcon icon={faBell} className="colorDark" />
//             </button>
//             <button className="backgroundBorderNone">
//               <FontAwesomeIcon icon={faQuestionCircle} className="colorDark" />
//             </button>
//             <select id="personalMenu">
//               {/* 이름과 직종은 추후 변수로 변경 */}
//               <option>김회계 주임연구원</option>
//               {/* 하단에 추가할 메뉴를 넣습니다 */}
//             </select>
//           </div>
//         </div>
//         {/* blue color header (변동) */}
//         <div id="secondTopHeader">
//           <div id="secondTopHeaderContents">
//             <Button
//               id="toggleSidebarBtn"
//               onClick={this.toggleSidebar}
//               variant="outline-secondary"
//             >
//               <i className={`fa fa-bars colorWhite`} />
//             </Button>
//             {/* 로고 */}
//             <img id="logo" src={empAdd} alt="" />
//             <button className="backgroundBorderNone">
//               <FontAwesomeIcon
//                 icon={faArrowUpRightFromSquare}
//                 className="colorWhite backgroundBorderNone"
//               />
//             </button>
//           </div>
//           <div id="secondTopHeaderMenuList">
//             <button className="backgroundBorderNone">
//               <FontAwesomeIcon icon={faPrint} className="colorWhite" />
//             </button>
//             <button className="backgroundBorderNone">
//               <FontAwesomeIcon icon={faTrashCan} className="colorWhite" />
//             </button>
//             <button className="backgroundBorderNone">
//               <FontAwesomeIcon icon={faCalculator} className="colorWhite" />
//             </button>
//             <button className="backgroundBorderNone">
//               <FontAwesomeIcon icon={faBorderAll} className="colorWhite" />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Header;
