import { useContext, useEffect, useState, useCallback } from "react";
import axios from "../../node_modules/axios/index";
import Swsm from "../vo/SwsmGrid/Swsm";
import SwsmOther from "../vo/SwsmGrid/SwsmOther";
import SwsmConstant from "../model/SwsmConstant";
import ContextModel from "./ContextModel";

const LaborContractModel = () => {
  const url = "http://localhost:8888";
  const { labels } = SwsmConstant();
  const [mainTablePkValue, setMainTablePkValue] = useState({ cdEmp: "A101" }); // cdEmp
  const [leftTablePkValue, setLeftTablePkValue] = useState({ cdEmp: "A101" });
  const [currMenuTab, setCurrMenuTab] = useState(); // 계약서 작성 / 조회 탭 상태 값
  const [cdEmp, setCdEmp] = useState("hong");
  const [editedEmp, setEditedEmp] = useState({});
  const [editedSwsm, setEditedSwsm] = useState({});
  const [editedSwsmOther, setEditedSwsmOther] = useState({});
  const [leftTableData, setLeftTableData] = useState([]);

  const [subTableData, setSubTableData] = useState([]);
  const [rightTabData, setRightTabData] = useState([]);
  const [mainTabData, setMainTabData] = useState({});

  const { contextState } = useContext(ContextModel);
  // const reloadSubTableData = contextState.reloadSubTableData;
  const [selectedRows, setSelectedRows] = useState([]); // 체크된 행(삭제를 위한)

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

  // main tab data
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

  // swsmOther
  //추가된 SwsmOther insert 요청
  useEffect(() => {
    console.log("SwsmOther insert start------@@");
    const pkValue = mainTabData.cdEmp;

    let updateSwsmOther = {
      ...editedSwsmOther.item,
      cdEmp: pkValue,
    };

    console.log("insert swsmOther data: ");
    console.log(updateSwsmOther);

    if (editedSwsmOther.isNew && Object.keys(editedSwsmOther).length !== 0)
      axios
        .post(url + "/swsmOther/insertSwsmOther", updateSwsmOther)
        .then((response) => {
          if (response.data === 1) console.log("SWSMOTHER 업데이트 성공");
          setEditedSwsmOther({});
        })
        .catch((error) => {
          console.error("ERROR: ", error);
        });
  }, [editedSwsmOther]);

  useEffect(() => {
    console.log("swsmOther update start -");
    console.log("update data: ");
    console.log(editedSwsmOther.item);

    const pkValue = mainTabData.cdEmp;
    console.log("pk: " + pkValue);

    let updateSwsmOther = {
      ...editedSwsmOther.item,
      cdEmp: pkValue,
    };

    console.log(updateSwsmOther);

    if (!editedSwsmOther.isNew && Object.keys(editedSwsmOther).length !== 0)
      axios
        .put(url + "/swsmOther/updateSwsmOtherByCdEmp", updateSwsmOther)
        .then((response) => {
          if (response.data === 1) console.log("SwsmOhter 업데이트 성공");
          setEditedSwsmOther({});
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
  }, [editedSwsmOther]);

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

  // swsmOther by CdEmp
  useEffect(() => {
    setSubTableData([]);
    if (mainTablePkValue)
      axios
        .post(url + "/swsmOther/getSwsmOtherByCdEmp", mainTablePkValue, {
          // "Content-Type": "application/json",
        })
        .then((response) => {
          const data = response.data.map((item) => {
            const swsmOtherData = {
              otherType: item.otherType,
              otherMoney: item.otherMoney,
              seqVal: item.seqVal,
              cdEmp: item.cdEmp,
            };
            return SwsmOther(swsmOtherData);
          });
          setSubTableData(data);
        })
        .catch((error) => {
          console.error("ERROR : ", error);
        });
  }, [mainTablePkValue, editedSwsmOther]);

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
  //선택된 행 delete 요청
  const deleteSelectedRows = useCallback(() => {
    // 각 row에 대한 delete 요청을 생성
    const deletePromises = selectedRows.map((row) => {
      switch (row.table) {
        case "empFam":
          console.log("url + '/empFam/deleteEmpFam', row.item", row.item);
          return axios.delete(url + "/empFam/deleteEmpFam", { data: row.item });
        case "swsmOther":
          console.log("url + '/swsmOther/deleteSwsmOther', row.item", row.item);
          return axios.delete(url + "/swsmOther/deleteSwsmOther", {
            data: row.item,
          });
        default:
          return Promise.resolve();
      }
    });

    Promise.all(deletePromises)
      .then((responses) => {
        console.log("선택된 모든 행의 삭제 완료");
        setSelectedRows([]); // 선택행 배열 비우기
        setEditedSwsmOther([]); // 사원가족 리로드
      })
      .catch((error) => {
        console.error("하나 이상의 요청에서 에러 발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [selectedRows]);

  return {
    // leftTableData: leftTableData,
    // subTableData: subTableData,
    // mainTablePkValue: mainTablePkValue,
    // cdEmp: cdEmp,
    // mainTabData: mainTabData,
    // rightTabData: rightTabData,
    // subTabData: subTabData,
    state: {
      leftTableData,
      mainTabData,
      leftTablePkValue,
      mainTablePkValue,
      subTableData,
      selectedRows,
    },
    actions: {
      setLeftTableData,
      setLeftTablePkValue,
      setMainTablePkValue,
      setRightTabData,
      setMainTabData,
      setSubTableData,
      setCdEmp,

      setEditedEmp,
      setEditedSwsm,
      setEditedSwsmOther,
      setCurrMenuTab,
      setSelectedRows,
      deleteSelectedRows,
    },
  };
};
export default LaborContractModel;
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
