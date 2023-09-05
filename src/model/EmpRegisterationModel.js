import { useCallback, useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import Emp from "../vo/EmpRegister/Emp";
import { currentDateStr } from "../utils/DateUtils.js";

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

  // 코드도움 모달들의 상태관리
  const [modalState, setModalState] = useState({ show: false });
  const modals = [
    { id: 1, isOpen: false },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
    { id: 4, isOpen: false },
    { id: 5, isOpen: false },
    { id: 6, isOpen: false },
    { id: 7, isOpen: false },
    { id: 8, isOpen: false },
  ];
  const [codeHelperTableData, setCodeHelperTableData] = useState([
    {
      // 코드도움 테이블 data
      data: "대한민국",
      code: "KOR",
    },
    { data: "미국", code: "USA" },
    { data: "중국", code: "CH" },
    { data: "일본", code: "JP" },
    { data: "프랑스", code: "FR" },
  ]);

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
      const newEditedEmp = { ...editedEmp };
      newEditedEmp.item = {
        ...newEditedEmp.item,
        //현재의 날짜를 입사일자의 기본값으로 추가
        daEnter: currentDateStr(),
      };
      axios
        .post(url + "/emp/insertEmp", newEditedEmp.item, {
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
        .put(url + "/emp/updateEmp", editedEmp.item)
        .then((response) => {
          if (response.data === 1) console.log("Emp 업데이트 성공");
          setEditedEmp({});
        })
        .catch((error) => {
          console.log("에러발생 -> ", error);
        });
    }
  }, [editedEmp]);

  useEffect(
    () => console.log("셀렉티드로우즈 바뀐것", selectedRows),
    [selectedRows]
  );

  //사원 정보 delete 요청
  const deleteSelectedRows = useCallback(() => {
    // 각 row에 대한 delete 요청을 생성
    // console.log("selectedRows axios 직전", selectedRows);
    const deletePromises = selectedRows.map((row) => {
      let pattern;
      switch (row.table) {
        case "emp":
          // emp의 경우 퇴직처리 update
          // console.log("url + '/emp/updateEmp', row.item", row.item);
          pattern = "/emp/deleteEmp";
          break;
        // console.log("daRetire ==>", deleteData.daRetire);
        // return axios.delete(url + "/emp/deleteEmp", {
        //   data: deleteData,
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        default:
          return Promise.resolve(); // 이 부분이 중요합니다. 모든 경우에 프로미스를 반환해야 합니다.
      }
      return axios.delete(url + pattern, { data: row.item });
    });

    Promise.all(deletePromises)
      .then((responses) => {
        if (responses) console.log("선택된 모든 행의 삭제 완료");
        setSelectedRows([]); // 선택행 배열 비우기
        setReloadSubTableData(!reloadSubTableData);
        setEditedEmp([]);
        // console.log("선택한 모든 행 =>", responses);
        //삭제된 데이터 필터링
        const undeletedEmpData = responses.filter((response) => {
          return response.data != "";
        });
        //삭제되지 않은 사원들의 데이터(사원코드, 이름, 사용중인 메뉴)
        console.log("undeletedEmpData !!!!!", undeletedEmpData);
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
    state: {
      leftTableData,
      mainTablePkValue,
      mainTabData,
      subTabData,
      selectedRows,
      reloadSubTableData,
      modalState,
      codeHelperTableData,
    },
    actions: {
      setLeftTableData,
      setEditedEmp,
      setMainTabData,
      setMainTablePkValue,
      setSubTabData,
      setSelectedRows,
      setReloadSubTableData,
      deleteSelectedRows,
      setModalState,
      setCodeHelperTableData,
    },
  };
}

export default EmpRegisterationModel;
