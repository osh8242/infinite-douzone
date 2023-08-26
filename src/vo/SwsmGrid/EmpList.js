// import Emp from "./vo/Emp";
// import { useEffect, useState } from "react";
// import axios from "../../node_modules/axios/index";

// const EmpList = () => {
//   const { cdEmp, setCdEmp } = Emp();

//   console.log(cdEmp);
//   //emp 모델로 불러왔다 치고
//   const dummyList = [
//     {
//       id: 1,
//       author: "이나당",
//       content: "첫일기",
//       emotion: 4,
//       create_date: new Date().getTime(),
//     },
//     {
//       id: 2,
//       author: "길동당",
//       content: "둘일기",
//       emotion: 3,
//       create_date: new Date().getTime(),
//     },
//     {
//       id: 3,
//       author: "곰당",
//       content: "삼일기",
//       emotion: 2,
//       create_date: new Date().getTime(),
//     },
//     {
//       id: 4,
//       author: "지당",
//       content: "넷일기",
//       emotion: 1,
//       create_date: new Date().getTime(),
//     },
//   ];

//   console.log("List" + dummyList);

//   const url = "http://localhost:8888";

//   //   useEffect(() => {
//   //     axios
//   //       .get(url + "/emp/getAllEmp")
//   //       .then((response) => {
//   //         console.log("SwsmModel > /emp/getAllEmp", response.data);
//   //         const data = response.data.map((item) => ({
//   //           cdEmp: item.cdEmp,
//   //         }));
//   //         setCdEmp(data);
//   //       })
//   //       .catch((error) => {
//   //         console.error("에러 : ", error);
//   //       });
//   //   }, []);

//   return (
//     <div>
//       {/* {dummyList.map((item) => (
//         <div key={item.id}>
//           <p>Author: {item.author}</p>
//           <p>Content: {item.content}</p>
//         </div>
//       ))} */}
//     </div>
//   );
// };
// export default EmpList;
