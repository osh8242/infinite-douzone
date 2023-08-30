import { useCallback, useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import Emp from "../vo/EmpRegister/Emp";

function EmpRegisterationModel() {
  const url = "http://localhost:8888";

  // 로그인, 회원가입 기능 구현 후, 현재 로그인한 사용자의 code값을 가져오도록 수정 예정
  // const [cdEmp, setCdEmp] = useState("E001");
  const [mainTablePkValue, setMainTablePkValue] = useState({ cdEmp: "E001" }); // cdEmp
  const [editedEmp, setEditedEmp] = useState({});
  const [leftTableData, setLeftTableData] = useState([]);
  const [mainTabData, setMainTabData] = useState([]);
  const [subTabData, setSubTabData] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [reloadSubTableData, setReloadSubTableData] = useState(false);

  //leftTableData 가져오는 비동기 GET 요청 (사원정보)
  useEffect(() => {
    setLeftTableData();
    axios
      .get(url + "/emp/getAllEmp")
      .then((response) => {
        const data = response.data.map((item) => {
          const empData = {
            cdEmp: item.cdEmp,
            nmKrname: item.nmKrname,
            ynFor: item.ynFor,
            noSocial: item.noSocial,
            jobOk: item.jobOk,
          };
          return Emp(empData);
        });
        setLeftTableData(data);
      })
      .catch((error) => {
        console.log("에러발생: ", error);
        //에러 처리
      });
  }, [editedEmp, reloadSubTableData]);

  //mainTabData 가져오는 비동기 POST 요청 (사원의 기초자료)
  useEffect(() => {
    // console.log(
    //   "EmpREgisterationModel > /emp/getEmpByCdEmp",
    //   "cdEmp : ",
    //   mainTablePkValue
    // );
    axios
      .post(url + "/emp/getEmpByCdEmp", mainTablePkValue, {
        ContentType: "application/json",
      })
      .then((response) => {
        console.log(
          "EmpRegisterationModel > /emp/getEmpByCdEmp",
          response.data
        );
        setMainTabData(response.data);
      })
      .catch((error) => {
        console.error("에러발생: ", error);
      });
  }, [mainTablePkValue, editedEmp]);

  //사원 정보 insert POST 요청 (사원의 기초자료)
  useEffect(() => {
    if (editedEmp.isNew && Object.keys(editedEmp).length !== 0) {
      axios
        .post(url + "/emp/insertEmp", editedEmp.item, {
          "Content-Type": "qpplication/json",
        })
        .then((response) => {
          if (response.data === 1) console.log("Emp 업데이트 성공");
          setEditedEmp({});
        })
        .catch((error) => {
          console.log("에러발생: ", error);
        });
    }
  }, [editedEmp]);

  //사원 정보 update POST 요청 (사원의 기초자료)
  useEffect(() => {
    if (Object.keys(editedEmp).length !== 0) {
      console.log("update요청: ", editedEmp);
      axios
        .post(url + "/emp/updateEmp", editedEmp, {
          "Content-Type": "qpplication/json",
        })
        .then((response) => {
          if (response.data === 1) console.log("Emp 업데이트 성공");
          setEditedEmp({});
        })
        .catch((error) => {
          console.log("에러발생 -> ", error);
        });
    }
  }, [editedEmp]);

  //사원 정보 delete 요청
  const deleteSelectedRows = useCallback(() => {
    // 각 row에 대한 delete 요청을 생성
    const deletePromises = selectedRows.map((row) => {
      switch (row.table) {
        case "emp":
          // console.log("url + '/emp/deleteEmp', row.item", row.item);
          const deleteData = { cdEmp: row.item.cdEmp };
          return axios.delete(url + "/emp/deleteEmp", {
            data: deleteData,
            "Content-Type": "qpplication/json",
          });
        default:
          return Promise.resolve(); // 이 부분이 중요합니다. 모든 경우에 프로미스를 반환해야 합니다.
      }
    });

    Promise.all(deletePromises)
      .then((responses) => {
        if (responses) console.log("선택된 모든 행의 삭제 완료");
        setSelectedRows([]); // 선택행 배열 비우기
        setReloadSubTableData(!reloadSubTableData);
      })
      .catch((error) => {
        console.error("하나 이상의 요청에서 에러 발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [selectedRows]);

  // ================================================================================
  //subTableData 가져오는 비동기 POST 요청 (사원의 가족사항)
  // useEffect(() => {
  //   console.log(
  //     "EmpRegisterationModel > /empFam/getListByCdEmp",
  //     "cdEmp : ",
  //     mainTablePkValue
  //   );
  //   axios
  //     .post(url + "/empFam/getListByCdEmp", mainTablePkValue, {
  //       ContentType: "application/json",
  //     })
  //     .then((response) => {
  //       console.log(
  //         "EmpRegisterationModel > /empFam/getListByCdEmp => ",
  //         response.data
  //       );
  //       const data = response.data.map((item) => ({
  //         연말정산관계: item.cdCalrel,
  //         성명: item.nmKrname,
  //         내외국민: item.ynFor,
  //         주민번호: item.noSocial,
  //         위탁자관계: item.cdFamrel,
  //       }));
  //       setSubTabData(data);
  //     })
  //     .catch((error) => {
  //       console.log("에러발생: ", error);
  //       //에러처리
  //     });
  // }, [mainTablePkValue, subTabData]);

  return {
    leftTableData: leftTableData,
    mainTablePk: mainTablePkValue,
    mainTabData: mainTabData,
    subTabData: subTabData,
    selectedRows: selectedRows,
    reloadSubTableData: reloadSubTableData,
    actions: {
      setLeftTableData,
      setEditedEmp,
      setMainTabData,
      setMainTablePkValue,
      setSubTabData,
      setSelectedRows,
      setReloadSubTableData,
      deleteSelectedRows,
    },
  };
}

export default EmpRegisterationModel;
