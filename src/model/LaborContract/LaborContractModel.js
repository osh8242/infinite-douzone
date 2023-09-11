import React, { useState } from "react";
import { useContext, useEffect, useCallback } from "react";
import axios from "axios";
import LaborContractConstant from "../../LaborContract/LaborContractConstant";
import Emp from "../../vo/HrManagement/Emp";
import Swsm from "../../vo/SwsmGrid/Swsm";
import SwsmOther from "../../vo/SwsmGrid/SwsmOther";
import { url } from "../../model/LaborContract/LaborContractConstant";

const LaborContractModel = () => {
  const [jobOk, setJobOk] = useState("Y"); //재직여부
  const [refYear, setRefYear] = useState(new Date().getFullYear()); // 귀속년도
  const [orderRef, setOrderRef] = useState("cdEmp"); // 정렬기준

  const [leftTableData, setLeftTableData] = useState([]);
  const [mainTablePkValue, setMainTablePkValue] = useState({ cdEmp: "A101" }); // cdEmp
  const [leftTablePkValue, setLeftTablePkValue] = useState({ cdEmp: "A101" });
  const [editedEmp, setEditedEmp] = useState({});
  const [editedSwsm, setEditedSwsm] = useState({});
  const [editedSwsmOther, setEditedSwsmOther] = useState({});

  const [subTableData, setSubTableData] = useState([]);
  const [mainTabData, setMainTabData] = useState({});
  const [selectedRows, setSelectedRows] = useState([]); // 체크된 행(삭제를 위한)

  // leftTableData load
  useEffect(() => {
    setLeftTableData([]);
    axios
      .get(url + "/emp/getAllEmp")
      .then((response) => {
        console.log("SwsmModel > /emp/getAllEmp", response);

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

  // subTableData load
  useEffect(() => {
    console.log(editedSwsmOther);
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
        setEditedSwsmOther([]);
      })
      .catch((error) => {
        console.error("하나 이상의 요청에서 에러 발생: ", error);
      });
  }, [selectedRows]);

  return {
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
      setMainTabData,
      setSubTableData,

      setEditedEmp,
      setEditedSwsm,
      setEditedSwsmOther,
      setSelectedRows,
      deleteSelectedRows,
    },
  };
};

export default LaborContractModel;
//leftTableData 가져오는 비동기 GET 요청
//   useEffect(() => {
//     axios
//       .get(
//         `${url}/emp/getEmpListForHrManagement?jobOk=${jobOk}+
//         ${"&orderRef=" + orderRef}
//         +
//         ${refYear ? "&refYear=" + refYear : ""}`
//       )
//       .then((response) => {
//         console.log(response.data);
//         const data = response.data.map((item) => {
//           return Emp(item);
//         });
//         setLeftTableData(data);
//       })
//       .catch((error) => {
//         console.error("에러발생: ", error);
//         // 필요에 따라 다른 오류 처리 로직 추가
//       });
//   }, [jobOk, refYear, orderRef, editedEmp]);
