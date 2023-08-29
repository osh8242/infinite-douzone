import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import Swsm from "../vo/SwsmGrid/Swsm";
import SwsmOther from "../vo/SwsmGrid/SwsmOther";
import SwsmConstant from "../model/SwsmConstant";

const TempSwsmModel = () => {
  const url = "http://localhost:8888";
  const { labels } = SwsmConstant();
  const [mainTablePkValue, setMainTablePkValue] = useState(); // cdEmp
  const [currMenuTab, setCurrMenuTab] = useState(); // 계약서 작성 / 조회 탭 상태 값
  const [cdEmp, setCdEmp] = useState("hong");
  // const [dateData, setDateData] = useState();
  const [editedEmp, setEditedEmp] = useState({});
  const [editedSwsm, setEditedSwsm] = useState({});
  const [leftTableData, setLeftTableData] = useState([]);
  const [subTableData, setSubTableData] = useState([]);
  const [rightTabData, setRightTabData] = useState([]);
  const [mainTabData, setMainTabData] = useState({});
  const [subTabData, setSubTabData] = useState({});

  // useEffect(() => {
  //   console.log("testing");
  // }, [excolum]);

  // leftTableData load
  useEffect(() => {
    setLeftTableData([]);
    axios
      .get(url + "/emp/getAll")
      .then((response) => {
        console.log("SwsmModel > /emp/getAll", response);
        const data = response.data.map((item) => {
          // console.log(item);
          const swsmData = {
            cdEmp: item.cdEmp,
            nmKrname: item.nmKrname,
            noSocial: item.noSocial,
          };
          // console.log("swsmData" + swsmData.cdEmp);
          return Swsm(swsmData);
        });
        setLeftTableData(data);
      })
      .catch((error) => {
        console.log("ERROR : " + error);
      });
  }, []);

  useEffect(() => {
    setMainTabData({});
    // console.log("=================================");
    // console.log(mainTablePkValue);

    if (mainTablePkValue)
      axios
        .post(url + "/swsm/getSwsmByCdEmp", mainTablePkValue, {
          "Content-Type": "application/json",
        })
        .then((response) => {
          // console.log("pk");
          // console.log(mainTablePkValue);
          console.log("response : ");
          console.log(response.data);
          let data = response.data;
          if (response.data === "") data = {};
          setMainTabData(data);

          // console.log(data);
          // setEditedSwsm.cdEmp(mainTablePkValue);
          // console.log("mainTabData: ");
          // console.log(mainTabData[0].item);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
        });
  }, [mainTablePkValue]);

  //수정된 사원 update 요청
  useEffect(() => {
    // console.log("editedEmp", editedEmp);

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
    console.log("==============================");
    console.log("editedSwsm :");
    console.log(editedSwsm);
    console.log("mainTablePkValue: ");
    console.log(mainTablePkValue);
    // console.log(Object.keys(mainTablePkValue)[0]);
    console.log("pk 추출중...");
    const pkValue = mainTabData.cdEmp;
    console.log(pkValue);
    // setEditedSwsm({ cdEmp: pkValue });

    console.log("editSwsm: ");
    console.log(editedSwsm);

    let updateSwsm = {
      ...editedSwsm,
      cdEmp: pkValue,
    };

    console.log("updateSws: ");
    console.log(updateSwsm);

    // var first_value = obj[Object.keys(obj)[0]];

    // console.log(mainTablePkValue["cdEmp"]);

    // const newDate = {
    //   cdEmp: "value",
    //   startEmpContractPeriod: editedSwsm["startEmpContractPeriod"],
    // };

    // console.log(editedSwsm.cdEmp);
    // setEditedSwsm({
    //   cdEmp: mainTablePkValue,
    // });
    // console.log("editedSwsm :");
    // console.log(editedSwsm);

    // setEditedSwsm(updateSwsm);

    // if (!editedSwsm.isNew && Object.keys(editedSwsm).length !== 0)
    axios
      .put(url + "/swsm/updateSwsm", updateSwsm)
      .then((response) => {
        console.log("update Start");
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
          // console.log("pk");
          // console.log(mainTablePkValue);
          // console.log("response : ");
          // console.log(response);
          let data = response.data;
          if (response.data === "") data = {};
          setMainTabData(data);
          // console.log("mainTabData: ");
          // console.log(mainTabData[0].item);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
        });
  }, [mainTablePkValue]);

  // // left 클릭시마다 데이터 로드됨
  // swsmOther
  useEffect(() => {
    setSubTableData([]);
    if (mainTablePkValue)
      axios
        .get(url + "/swsmOther/getAllSwsmOther ")
        .then((response) => {
          console.log("pk");
          console.log(mainTablePkValue);
          console.log("SwsmOther > /swsmOther/getAllSwsmOther", response.data);
          console.log(typeof response.data);
          const data = response.data.map((item) => {
            return {
              item: {
                otherType: item.othertype,
                otherMoney: item.otherMoney,
                cd_emp: item.cdEmp,
              },
              checked: false,
              selected: false,
              isEditable: false,
            };
          });
          setSubTableData(data);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
        });
  }, []);

  return {
    leftTableData: leftTableData,
    subTableData: subTableData,
    mainTablePk: mainTablePkValue,
    cdEmp: cdEmp,
    mainTabData: mainTabData,
    rightTabData: rightTabData,
    subTabData: subTabData,
    actions: {
      setMainTablePkValue,
      setLeftTableData,
      setRightTabData,
      setMainTabData,
      setSubTabData,
      setCdEmp,
      setEditedEmp,
      setEditedSwsm,
      setCurrMenuTab,
      // setExcolum,
      // setDateData,
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
