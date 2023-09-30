import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Emp from "../../vo/HrManagement/Emp";
import Swsm from "../../vo/SwsmGrid/Swsm";
import SwsmOther from "../../vo/SwsmGrid/SwsmOther";

const TestModel = () => {
  const url = "http://localhost:8888";

  const [mainTablePkValue, setMainTablePkValue] = useState({ cdEmp: "A101" });
  const [leftTablePkValue, setLeftTablePkValue] = useState({ cdEmp: "A101" });
  const [editedEmp, setEditedEmp] = useState({});
  const [editedSwsm, setEditedSwsm] = useState({});
  const [editedSwsmOther, setEditedSwsmOther] = useState({});
  const [leftTableData, setLeftTableData] = useState([]);
  const [subTableData, setSubTableData] = useState([]);
  const [mainTabData, setMainTabData] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios
      .get(url + "/emp/getAllEmp")
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
        .post(url + "/swsm/getSwsmByCdEmp", mainTablePkValue, {
          "Content-Type": "application/json",
        })
        .then((response) => {
          setMainTabData(response.data || {});
        })
        .catch(console.error);

      axios
        .post(url + "/swsmOther/getSwsmOtherByCdEmp", mainTablePkValue)
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

  // EDITED_EMP 처리 부분 (update & insert)
  useEffect(() => {
    if (Object.keys(editedEmp).length === 0) return;

    const action = editedEmp.isNew ? axios.post : axios.put;
    const endpoint = editedEmp.isNew ? "/emp/insertEmp" : "/emp/updateEmp";

    action(url + endpoint, editedEmp.item)
      .then((response) => {
        if (response.data === 1) console.log("Emp 처리 성공");
        setEditedEmp({});
      })
      .catch(console.error);
  }, [editedEmp]);

  // EDITED_SWSM 처리 부분 (update)
  useEffect(() => {
    if (Object.keys(editedSwsm).length === 0 || editedSwsm.isNew) return;

    const updatedSwsm = {
      ...editedSwsm,
      cdEmp: mainTabData.cdEmp,
    };

    axios
      .put(url + "/swsm/updateSwsm", updatedSwsm)
      .then((response) => {
        if (response.data === 1) console.log("Swsm 업데이트 성공");
      })
      .catch(console.error);
  }, [editedSwsm, mainTabData]);

  // EDITED_SWSM_OTHER 처리 부분 (insert & update)
  useEffect(() => {
    if (Object.keys(editedSwsmOther).length === 0) return;

    const updatedSwsmOther = {
      ...editedSwsmOther.item,
      cdEmp: mainTabData.cdEmp,
    };
    const action = editedSwsmOther.isNew ? axios.post : axios.put;
    const endpoint = editedSwsmOther.isNew
      ? "/swsmOther/insertSwsmOther"
      : "/swsmOther/updateSwsmOtherByCdEmp";

    action(url + endpoint, updatedSwsmOther)
      .then((response) => {
        if (response.data === 1) console.log("SwsmOther 처리 성공");
        setEditedSwsmOther({});
      })
      .catch(console.error);
  }, [editedSwsmOther, mainTabData]);

  const deleteSelectedRows = useCallback(() => {
    const deletePromises = selectedRows.map((row) => {
      let endpoint;
      switch (row.table) {
        case "empFam":
          endpoint = "/empFam/deleteEmpFam";
          break;
        case "swsmOther":
          endpoint = "/swsmOther/deleteSwsmOther";
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
      // setRightTabData,
      setMainTabData,
      setSubTableData,
      // setCdEmp,

      setEditedEmp,
      setEditedSwsm,
      setEditedSwsmOther,
      // setCurrMenuTab,
      setSelectedRows,
      deleteSelectedRows,
    },
  };
};
export default TestModel;
