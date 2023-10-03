// import React, { useState, useEffect, useCallback, useRef } from "react";
// import axios from "axios";
// import { url } from "../CommonConstant";
// import { swsmUrlPattern } from "./LaborContractConstant";
// import { urlPattern } from "../HrManagement/HrManagementConstant";
// import Swsm from "../../vo/SwsmGrid/Swsm";
// import SwsmOther from "../../vo/SwsmGrid/SwsmOther";
// // import Emp from "../../vo/HrManagement/Emp";
// import api from "../Api";

// const userModel = () => {
//   const [mainTabData, setMainTabData] = useState({});

//   const submitMainTabData = useCallback(
//     (event, value) => {
//       if (event.key === "Enter") {
//         console.log("엔터누름");
//         event.target.blur();
//         let data = {
//           [event.target.id]: event.target.value,
//         };
//         // setEditedSwsm(data);
//       }
//       if (event.type === "change") {
//         console.log("change");
//         let data = {
//           [event.target.id]: event.target.value,
//         };
//         // event.target.blur();
//         // let newMainTabData = { ...mainTabData.item };
//         // newMainTabData[event.target.id] = value;
//         // setEditedSwsm(data);
//       }
//     },
//     [mainTabData] // 임시
//   );
//   return { submitMainTabData };
// };

// export default userModel;
