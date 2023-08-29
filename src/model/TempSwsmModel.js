import { useContext, useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import Swsm from "../vo/SwsmGrid/Swsm";
import SwsmOther from "../vo/SwsmGrid/SwsmOther";
import SwsmConstant from "../model/SwsmConstant";
import ContextModel from "./ContextModel";

const TempSwsmModel = () => {
  const url = "http://localhost:8888";
  const { labels } = SwsmConstant();
  const [mainTablePkValue, setMainTablePkValue] = useState(); // cdEmp
  const [currMenuTab, setCurrMenuTab] = useState(); // 계약서 작성 / 조회 탭 상태 값
  const [cdEmp, setCdEmp] = useState("hong");
  const [editedEmp, setEditedEmp] = useState({});
  const [editedSwsm, setEditedSwsm] = useState({});
  const [editedSwsmOther, setEditedSwsmOther] = useState({});
  const [leftTableData, setLeftTableData] = useState([]);
  const [leftTablePkValue, setLeftTablePkValue] = useState({ cdEmp: "A101" });
  const [subTableData, setSubTableData] = useState([]);
  const [rightTabData, setRightTabData] = useState([]);
  const [mainTabData, setMainTabData] = useState({});

  const { contextState } = useContext(ContextModel);
  const reloadSubTableData = contextState.reloadSubTableData;

  // const [subTabData, setSubTabData] = useState({});

  // leftTableData load
  useEffect(() => {
    setLeftTableData([]);
    axios
      .get(url + "/emp/getAll")
      .then((response) => {
        console.log("SwsmModel > /emp/getAll", response);
        const data = response.data.map((item) => {
          const swsmData = {
            cdEmp: item.cdEmp,
            nmKrname: item.nmKrname,
            noSocial: item.noSocial,
          };
          return Swsm(swsmData);
        });
        console.log(data);
        setLeftTableData(data);
      })
      .catch((error) => {
        console.log("ERROR : " + error);
      });
  }, []);

  useEffect(() => {
    setMainTabData({});

    if (mainTablePkValue)
      axios
        .post(url + "/swsm/getSwsmByCdEmp", mainTablePkValue, {
          "Content-Type": "application/json",
        })
        .then((response) => {
          let data = response.data;
          if (response.data === "") {
            // setMainTabData({});
            data = {};
          } else setMainTabData(data);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
        });
  }, [mainTablePkValue]);

  //수정된 사원 update 요청
  useEffect(() => {
    if (!editedEmp.isNew && Object.keys(editedEmp).length !== 0)
      axios
        .put(url + "/emp/updateEmp", editedEmp.item)
        .then((response) => {
          if (response.data === 1) console.log("Emp 업데이트 성공");
          setEditedEmp({});
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
  }, [editedEmp]);

  //추가된 사원 insert 요청
  useEffect(() => {
    if (editedEmp.isNew && Object.keys(editedEmp).length !== 0)
      axios
        .post(url + "/emp/insertEmp", editedEmp.item)
        .then((response) => {
          if (response.data === 1) console.log("Emp 업데이트 성공");
          setEditedEmp({});
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
  }, [editedEmp]);

  //swsm-date update 요청
  useEffect(() => {
    const pkValue = mainTabData.cdEmp;
    let updateSwsm = {
      ...editedSwsm,
      cdEmp: pkValue,
    };
    // if (!editedSwsm.isNew && Object.keys(editedSwsm).length !== 0)
    axios
      .put(url + "/swsm/updateSwsm", updateSwsm)
      .then((response) => {
        if (response.data === 1) console.log("Swsm 업데이트 성공");
        // setEditedSwsm({});
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [editedSwsm]);

  // 메인 데이터 // PK; cdEmp 에 따라
  useEffect(() => {
    setMainTabData({});
    if (mainTablePkValue)
      axios
        .post(url + "/swsm/getSwsmByCdEmp", mainTablePkValue, {
          "Content-Type": "application/json",
        })
        .then((response) => {
          let data = response.data;
          if (response.data === "") data = {};
          setMainTabData(data);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
        });
  }, [mainTablePkValue]);

  // // left 클릭시마다 데이터 로드됨
  // swsmOther All
  // useEffect(() => {
  //   setSubTableData([]);
  //   // if (mainTablePkValue)
  //   axios
  //     .get(url + "/swsmOther/getAllSwsmOther")
  //     .then((response) => {
  //       console.log("swsmOther Data All ing");
  //       const data = response.data.map((item) => {
  //         const swsmOtherData = {
  //           otherType: item.otherType,
  //           otherMoney: item.otherMoney,
  //           cdEmp: item.cdEmp,
  //         };
  //         return SwsmOther(swsmOtherData);
  //       });
  //       console.log(data);
  //       setSubTableData(data);
  //     })
  //     .catch((error) => {
  //       console.error("ERROR : ", error);
  //     });
  // }, []);

  // swsmOther by CdEmp
  useEffect(() => {
    setSubTableData([]);
    if (leftTablePkValue)
      axios
        .post(url + "/swsmOther/getSwsmOtherByCdEmp", leftTablePkValue, {
          "Content-Type": "application/json",
        })
        .then((response) => {
          const data = response.data.map((item) => {
            const swsmOtherData = {
              otherType: item.otherType,
              otherMoney: item.otherMoney,
              cdEmp: item.cdEmp,
            };
            return SwsmOther(swsmOtherData);
          });
          setSubTableData(data);
        })
        .catch((error) => {
          console.error("ERROR : ", error);
        });
  }, [leftTablePkValue, editedSwsmOther, reloadSubTableData]);

  // useEffect(() => {
  //   setSubTableData([]);
  //   if (mainTablePkValue)
  //     axios
  //       .get(url + "/swsmOther/getAllSwsmOther ")
  //       .then((response) => {
  //         console.log("swsmOther Data All ing");
  //         console.log(response);
  //         const data = response.data.map((item) => {
  //           return {
  //             item: {
  //               otherType: item.othertype,
  //               otherMoney: item.otherMoney,
  //               cd_emp: item.cdEmp,
  //             },
  //             checked: false,
  //             selected: false,
  //             isEditable: false,
  //           };
  //         });
  //         setSubTableData(data);
  //       })
  //       .catch((error) => {
  //         console.error("에러발생: ", error);
  //       });
  // }, []);

  return {
    leftTableData: leftTableData,
    // subTableData: subTableData,
    mainTablePk: mainTablePkValue,
    cdEmp: cdEmp,
    mainTabData: mainTabData,
    rightTabData: rightTabData,
    // subTabData: subTabData,
    state: { leftTablePkValue, subTableData },
    actions: {
      setMainTablePkValue,
      setLeftTableData,
      setLeftTablePkValue,
      setRightTabData,
      setMainTabData,
      setSubTableData,
      setCdEmp,
      setEditedEmp,
      setEditedSwsm,
      setEditedSwsmOther,
      setCurrMenuTab,
    },
  };
};
export default TempSwsmModel;
//수정된 SWSM update 요청
// useEffect(() => {
//   console.log("editedSwsm", dateData);
//   if (!dateData.isNew && Object.keys(dateData).length !== 0)
//     axios
//       .put(url + "/swsm/updateSwsm", dateData)
//       .then((response) => {
//         if (response.data === 1) console.log("Swsm 업데이트 성공");
//         setDateData({});
//       })
//       .catch((error) => {
//         console.error("에러발생: ", error);
//         // 필요에 따라 다른 오류 처리 로직 추가
//       });
// }, [setDateData]);

// //수정된 SWSM update 요청
// useEffect(() => {
//   console.log("editedSwsm", editedSwsm);
//   if (!editedSwsm.isNew && Object.keys(editedSwsm).length !== 0)
//     axios
//       .put(url + "/swsm/updateSwsm", editedSwsm.item)
//       .then((response) => {
//         if (response.data === 1) console.log("Swsm 업데이트 성공");
//         setEditedSwsm({});
//       })
//       .catch((error) => {
//         console.error("에러발생: ", error);
//         // 필요에 따라 다른 오류 처리 로직 추가
//       });
// }, [editedSwsm]);
