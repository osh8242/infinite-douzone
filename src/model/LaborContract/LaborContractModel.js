import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { url } from "../CommonConstant";
import { swsmUrlPattern } from "./LaborContractConstant";
import { urlPattern } from "../HrManagement/HrManagementConstant";
import Swsm from "../../vo/SwsmGrid/Swsm";
import SwsmOther from "../../vo/SwsmGrid/SwsmOther";
// import Emp from "../../vo/HrManagement/Emp";

const LaborContractModel = () => {
  const [leftTablePkValue, setLeftTablePkValue] = useState({ cdEmp: "A101" });
  const [editedEmp, setEditedEmp] = useState({});
  const [editedSwsm, setEditedSwsm] = useState({});
  const [editedSwsmOther, setEditedSwsmOther] = useState({});
  const [leftTableData, setLeftTableData] = useState([]);
  const [subTableData, setSubTableData] = useState([]);
  const [mainTabData, setMainTabData] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [mainTablePkValue, setMainTablePkValue] = useState({ cdEmp: "A101" });

  const mainTabRef = useRef();
  useEffect(() => {
    axios
      .get(url + swsmUrlPattern.getAllEmp)
      .then((response) => {
        const data = response.data.map((item) => {
          return Swsm({
            cdEmp: item.cdEmp,
            nmKrname: item.nmKrname,
            noSocial: item.noSocial,
          });
        });
        setLeftTableData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (mainTablePkValue) {
      axios
        .post(url + swsmUrlPattern.getSwsm, mainTablePkValue, {
          "Content-Type": "application/json",
        })
        .then((response) => {
          setMainTabData(response.data || {});
        })
        .catch(console.error);

      // get으로 변경 예정.......................
      axios
        .post(url + swsmUrlPattern.getSwsmOther, mainTablePkValue)
        .then((response) => {
          const data = response.data.map((item) =>
            SwsmOther({
              otherType: item.otherType,
              otherMoney: item.otherMoney,
              seqVal: item.seqVal,
              cdEmp: item.cdEmp,
            })
          );
          setSubTableData(data);
        })
        .catch(console.error);
    }
  }, [mainTablePkValue, editedSwsmOther]);

  //추가된 사원 insert 요청
  const insertEmp = useCallback((emp) => {
    axios
      .post(url + urlPattern.insertEmp, emp)
      .then((response) => {
        if (response.data === 1) console.log("Emp insert 성공");
        setEditedEmp({});
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, []);

  // EDITED_EMP 처리 부분 (update & insert)
  useEffect(() => {
    if (Object.keys(editedEmp).length === 0) return;

    const action = editedEmp.isNew ? axios.post : axios.put;
    const endpoint = editedEmp.isNew ? urlPattern.insertEmp : "/emp/updateEmp";

    action(url + endpoint, editedEmp.item)
      .then((response) => {
        if (response.data === 1) console.log("Emp 처리 성공");
        setEditedEmp({});
      })
      .catch(console.error);
  }, [editedEmp]);

  const submitMainTabData = useCallback(
    (event, value) => {
      if (event.key === "Enter") {
        console.log("엔터누름");
        event.target.blur();
        let data = {
          [event.target.id]: event.target.value,
        };
        setEditedSwsm(data);
      }
      if (event.type === "change") {
        console.log("change");
        let data = {
          [event.target.id]: event.target.value,
        };
        // event.target.blur();
        let newMainTabData = { ...mainTabData.item };
        newMainTabData[event.target.id] = value;
        setEditedSwsm(data);
      }
    },
    [mainTabRef, mainTabData]
  );

  // EDITED_SWSM 처리 부분 (update)
  useEffect(() => {
    if (Object.keys(editedSwsm).length === 0 || editedSwsm.isNew) return;

    const updatedSwsm = {
      ...editedSwsm,
      cdEmp: mainTabData.cdEmp,
    };

    axios
      .put(url + swsmUrlPattern.updateSwsm, updatedSwsm)
      .then((response) => {
        if (response.data === 1) console.log("Swsm 업데이트 성공");
        setEditedSwsm({});
      })
      .catch(console.error);
  }, [editedSwsm, mainTabData]);

  const insertSwsmOther = useCallback((swsmOther) => {
    console.log("SwsmOther insert Data: ");
    console.log(swsmOther);
    const newData = {
      otherType: swsmOther.otherType,
      otherMoney: swsmOther.otherMoney,
      seqVal: swsmOther.seqVal,
      cdEmp: mainTablePkValue.cdEmp,
    };
    axios
      .post(url + swsmUrlPattern.insertSwsmOther, newData)
      .then((response) => {
        if (response.data === 1) console.log("SwsmOther insert 성공");
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, []);

  const updateSwsmOther = useCallback((swsmOther) => {
    const newData = {
      otherType: swsmOther.otherType,
      otherMoney: swsmOther.otherMoney,
      seqVal: swsmOther.seqVal,
      cdEmp: mainTablePkValue.cdEmp,
    };
    axios
      .put(url + swsmUrlPattern.updateSwsmOther, newData)
      .then((response) => {
        if (response.data === 1) console.log("swsmOther 업데이트 성공");
      })
      .catch((error) => {
        console.error("에러발생: ", error);
      });
  }, []);

  const deleteSelectedRows = useCallback(() => {
    const deletePromises = selectedRows.map((row) => {
      let endpoint;
      switch (row.table) {
        case "empFam":
          endpoint = urlPattern.deleteEmpFam;
          break;
        case "swsmOther":
          endpoint = swsmUrlPattern.deleteSwsmOther;
          break;
        default:
          return Promise.resolve();
      }
      return axios.delete(url + endpoint, { data: row.item });
    });

    Promise.all(deletePromises)
      .then(() => {
        console.log("선택된 모든 행의 삭제 완료");
        setSelectedRows([]);
      })
      .catch(console.error);
  }, [selectedRows]);

  console.log(mainTabData);

  return {
    state: {
      leftTableData,
      mainTabData,
      leftTablePkValue,
      mainTablePkValue,
      mainTabRef,
      subTableData,
      selectedRows,
    },
    actions: {
      setLeftTableData,
      setLeftTablePkValue,
      setMainTablePkValue,
      setMainTabData,
      setSubTableData,
      submitMainTabData,
      setEditedEmp,
      setEditedSwsm,
      setEditedSwsmOther,
      setSelectedRows,
      deleteSelectedRows,
      insertSwsmOther,
      updateSwsmOther,
    },
  };
};
export default LaborContractModel;
