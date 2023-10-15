import { useCallback, useEffect, useRef, useState } from "react";
import { currentDateStr } from "../../utils/DateUtils.js";
import Emp from "../../vo/EmpRegister/Emp";
import EmpMenuUsage from "../../vo/EmpRegister/EmpMenuUsage";
import { useApi } from "../Api";
import {
  codeHelperData_abbNation,
  codeHelperData_cdBank,
  codeHelperData_cdDept,
  codeHelperData_cdField,
  codeHelperData_cdNation,
  codeHelperData_cdOccup,
  codeHelperData_cdProject,
  codeHelperData_cdSalcls,
  codeHelperData_rankNo,
  urlPattern,
} from "./EmpConstant";
import { useMemo } from "react";

function EmpRegisterationModel() {
  const url = "http://localhost:8888";
  const api = useApi();

  // 로그인, 회원가입 기능 구현 후, 현재 로그인한 사용자의 code값을 가져오도록 수정 예정
  // const [cdEmp, setCdEmp] = useState("E001");
  const [mainTablePkValue, setMainTablePkValue] = useState({ cdEmp: "" }); // cdEmp
  const [editedEmp, setEditedEmp] = useState({});
  const [leftTableData, setLeftTableData] = useState([]);
  const [mainTabData, setMainTabData] = useState([]);
  const [subTabData, setSubTabData] = useState([]);
  const mainTabRef = useRef(); //메인탭 Ref
  const [selectedRows, setSelectedRows] = useState([]);
  const [reloadSubTableData, setReloadSubTableData] = useState(false);
  const [undeletedEmpTableData, setUndeletedEmpTableData] = useState([]); //미삭제 사원데이터를 관리하는 상태변수
  const [modalState, setModalState] = useState({ show: false }); //일반 모달 창의 상태관리
  const [codeHelperState, setCodeHelperState] = useState({ show: false }); //코드 도움 모달 창의 상태관리
  const [addRow, setAddRow] = useState(); //코드도움 addRow
  const [countEmp, setCountEmp] = useState("0");
  const [countJobOkEmp, setCountJobOkEmp] = useState("0");

  // 코드도움 테이블 data
  const [codeHelperTableData, setCodeHelperTableData] = useState([
    { data: "", code: "", setData: setAddRow },
  ]);

  // 코드도움 데이터 객체 배열
  const codeHelperDataList = [
    codeHelperData_abbNation,
    codeHelperData_cdNation,
    codeHelperData_cdDept,
    codeHelperData_cdOccup,
    codeHelperData_rankNo,
    codeHelperData_cdSalcls,
    codeHelperData_cdField,
    codeHelperData_cdProject,
    codeHelperData_cdBank,
  ];

  // 코드도움 데이터 한글변환 함수 ( value 반환 )
  const convertToName = useCallback((fieldName, value) => {
    // fieldName에 해당하는 코드도움 데이터 객체 찾기
    const codeHelperData = codeHelperDataList.find((data) =>
      data.headers.some((header) => header.field === fieldName)
    );
    // 코드도움 데이터가 존재하는 경우
    if (codeHelperData) {
      // 코드도움 데이터에서 value와 매칭되는 항목 찾기
      const matchedItem = codeHelperData.tableData.find(
        (item) => item.item[fieldName] === value
      );
      return matchedItem
        ? matchedItem.item[
            `nm${fieldName[0].toUpperCase()}${fieldName.slice(1)}`
          ]
        : value;
    } else {
      // console.error(`Code helper data not found for field: ${fieldName}`);
      return value;
    }
  });

  // 코드도움 데이터 코드변환 함수
  const convertToCode = useCallback((fieldName, value) => {
    // fieldName에 해당하는 코드도움 데이터 객체 찾기
    const codeHelperData = codeHelperDataList.find((data) =>
      data.headers.some((header) => header.field === fieldName)
    );
    if (codeHelperData) {
      // 코드 도움 데이터를 활용하여 변환
      for (const code in codeHelperData) {
        if (codeHelperData[code] === value) {
          return code;
        }
      }
    } else {
      return value;
    }
  });

  // Main Tab 에서 Enter 입력시 Emp 업데이트
  const submitMainTabData = useCallback(
    (event, value, id) => {
      if (event.key === "Enter" || event.type === "change") {
        if (event.key === "Enter") event.target.blur();
        if (typeof value === "object") {
          // 코드도움일때
          let newEmp = { ...mainTabData.item };
          const valueKeys = Object.keys(value);
          newEmp[valueKeys] = value[valueKeys];
          updateEmp(newEmp);
        } else {
          let newEmp = { ...mainTabData.item };
          //주민번호
          if (event.target.id === "noSocial") {
            let ee = newEmp["noSocial"].replace(/-(\d)(\d{6})/, "-$1******");
            console.log("11111111111111111111", ee);
            newEmp["noSocial"] = ee;
          } else {
            newEmp[event.target.id] = value;
          }

          console.log("newEmp", newEmp);
          updateEmp(newEmp);
        }
        // return;
      } else if (event.type === "click" || typeof value === "object") {
        // 넘어온 값이 JSON 객체인 경우
        let newEmp = { ...mainTabData.item };
        console.log("newEmp###########################", newEmp);
        Object.assign(newEmp, value);
        updateEmp(newEmp);
      } else {
        let newEmp = { ...mainTabData.item };
        console.log("newEmp###########################333", newEmp);
        newEmp[id] = value;
        updateEmp(newEmp);
      }
    },
    [mainTablePkValue, mainTabData]
  );

  //leftTableData 가져오는 비동기 GET 요청 (사원정보)
  useEffect(() => {
    // setLeftTableData();
    api
      .get("/emp/getAllEmp")
      .then((response) => {
        let countJobOkEmp = 0;
        let countEmp = 0;
        const data = response.data.map((row) => {
          const empData = {
            cdEmp: row.cdEmp,
            nmKrname: row.nmKrname,
            ynFor: row.ynFor,
            noSocial: row.noSocial,
            jobOk: row.jobOk,
          };
          if (row.jobOk === "Y") {
            countJobOkEmp += 1;
          }
          countEmp += 1;
          return { item: empData, table: "emp" };
        });
        setLeftTableData(data);
        const count = countJobOkEmp + "/" + countEmp;
        // setCountEmpAndJobOkEmp(count);
      })
      .catch((error) => {
        console.log("에러발생: ", error);
        //에러 처리
      });
  }, [reloadSubTableData]);

  // SELECT mainTabData 가져오는 비동기 POST 요청 (사원의 기초자료)
  useEffect(() => {
    if (mainTablePkValue?.cdEmp && Object.keys(mainTablePkValue).length !== 0) {
      api
        .post(urlPattern.getEmpByCdEmp, mainTablePkValue)
        .then((response) => {
          console.log(
            "EmpRegisterationModel > /emp/getEmpByCdEmp",
            response.data
          );

          setMainTabData(Emp(response.data));
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          setMainTabData({});
        });
    } else {
      setMainTabData({});
    }
  }, [mainTablePkValue]);

  const getEmpByCdEmp = useCallback((mainTablePkValue) => {
    if (mainTablePkValue?.cdEmp && Object.keys(mainTablePkValue).length !== 0) {
      api
        .post(urlPattern.getEmpByCdEmp, mainTablePkValue)
        .then((response) => {
          console.log("getEmpByCdEmp 함수 실행!! >>", response);
          setMainTabData(Emp(response.data));
        })
        .catch((error) => {
          console.log("에러 발생: ", error);
        });
    }
  });

  // useEffect(() => {
  //   if (mainTablePkValue?.cdEmp && Object.keys(mainTablePkValue).length !== 0) {
  //     axios
  //       .post(url + "/emp/getEmpByCdEmp", mainTablePkValue, {
  //         ContentType: "application/json",
  //       })
  //       .then((response) => {
  //         console.log(
  //           "EmpRegisterationModel > /emp/getEmpByCdEmp",
  //           response.data
  //         );

  //         // 데이터를 받은 후 필드를 한글로 변환
  //         const convertedData = { ...response.data };

  //         for (const key in response.data) {
  //           convertedData[key] = convertFieldData(key, response.data[key]);
  //           console.log("key", key, "response.data[key]", response.data[key]);
  //         }

  //         setMainTabData(Emp(convertedData));
  //       })
  //       .catch((error) => {
  //         console.error("에러발생: ", error);
  //       });
  //   } else {
  //     setMainTabData({});
  //   }
  // }, [mainTablePkValue]);

  //사원 정보 INSERT POST 요청 (사원의 기초자료)
  // useEffect(() => {
  //   if (editedEmp && Object.keys(editedEmp).length !== 0) {
  //     const newEditedEmp = { ...editedEmp };
  //     newEditedEmp.item = {
  //       ...newEditedEmp.item,
  //       //현재의 날짜를 입사일자의 기본값으로 추가
  //       // daEnter: currentDateStr(),
  //     };
  //     console.log("여기를 보십시오 => 모델 insert 데이터", newEditedEmp.item);
  //     api
  //       .post("/emp/insertEmp", newEditedEmp.item, {
  //         "Content-Type": "qpplication/json",
  //       })
  //       .then((response) => {
  //         if (response.data !== 0) console.log("Emp insert 성공");
  //         setEditedEmp({});
  //       })
  //       .catch((error) => {
  //         console.log("에러발생: ", error);
  //       });
  //   }
  // }, [editedEmp]);

  // 사원 insert 함수
  const insertEmp = useCallback((emp) => {
    // jobOk가 N이면...(퇴직자)
    if (emp.jobOk === "N" && !emp.daRetire) {
      const today = new Date();
      const year = today.getFullYear(); // 연도
      const month = today.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)
      const day = today.getDate(); // 일
      const retireDate = `${year}-${month}-${day}`;
      console.log(retireDate);
      emp.daRetire = retireDate;
    } else if (emp.jobOk === "Y") {
      emp.daRetire = "";
    }
    //주민번호
    if (emp.noSocial) {
      let ee = emp.noSocial.replace(/-(\d)(\d{6})/, "-$1******");
      emp.noSocial = ee;
    }

    api
      .post(urlPattern.insertEmp, emp, {
        "Content-Type": "qpplication/json",
      })
      .then((response) => {
        if (response.data !== 0) console.log("Emp insert 성공");
        console.log("*****", emp);

        setEditedEmp({});
      })
      .catch((error) => {
        console.log("에러발생: ", error);
      });
    // }
  }, []);

  //사원 정보 UPDATE POST 요청 (사원의 기초자료)
  // useEffect(() => {
  //   if (editedEmp && Object.keys(editedEmp).length !== 0) {
  //     console.log("emp useEffect update요청: ", editedEmp);
  //     api
  //       .put(urlPattern.updateEmp, editedEmp.item)
  //       .then((response) => {
  //         if (response.data === 1) console.log("Emp 업데이트 성공");
  //         setEditedEmp();
  //       })
  //       .catch((error) => {
  //         console.log("에러발생 -> ", error);
  //       });
  //   }
  // }, []);

  //사원 update 함수
  const updateEmp = useCallback((emp) => {
    console.log("emp 함수 update요청: ", emp);
    // jobOk가 N이면...(퇴직자)
    if (emp.jobOk === "N" && !emp.daRetire) {
      const today = new Date();
      const year = today.getFullYear(); // 연도
      const month = today.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)
      const day = today.getDate(); // 일
      const retireDate = `${year}-${month}-${day}`;
      console.log(retireDate);
      emp.daRetire = retireDate;
    } else if (emp.jobOk === "Y") {
      emp.daRetire = "";
    }

    //주민번호
    if (emp.noSocial) {
      let ee = emp.noSocial.replace(/-(\d)(\d{6})/, "-$1******");
      emp.noSocial = ee;
    }

    api
      .put(urlPattern.updateEmp, emp)
      .then((response) => {
        if (response.data !== 0) console.log("Emp 업데이트 성공");
        setMainTablePkValue({ ...mainTablePkValue });
      })
      .catch((error) => {
        console.log("에러발생 -> ", error);
      });
  });

  //사원 정보 DELETE 요청
  const deleteSelectedRows = useCallback(() => {
    // 각 row에 대한 delete 요청을 생성
    const editedTableNames = {};
    console.log("selectedRows axios 직전", selectedRows);
    const deletePromises = selectedRows.map((row) => {
      let pattern;
      switch (row.table) {
        case "emp":
          pattern = urlPattern.deleteEmp;
          break;
        default:
          return Promise.resolve(); // 이 부분이 중요합니다. 모든 경우에 프로미스를 반환해야 합니다.
      }
      if (!editedTableNames[row.table]) editedTableNames[row.table] = true;
      return api.delete(pattern, { data: row.item });
    });

    Promise.all(deletePromises)
      .then((responses) => {
        if (responses) console.log("선택된 모든 행의 삭제 완료");
        console.log("selectedRows", selectedRows);
        setSelectedRows([]); // 선택행 배열 비우기
        Object.keys(editedTableNames).forEach((tableName) => {
          switch (tableName) {
            case "emp":
              setReloadSubTableData(!reloadSubTableData); //reload
              break;
            default:
              break;
          }
        });
      })
      .catch((error) => {
        console.error("하나 이상의 요청에서 에러 발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [selectedRows]);

  //사원 delete 함수
  const deleteEmp = useCallback((row) => {
    // 각 row에 대한 delete 요청을 생성
    console.log("selectedRows axios 직전", row["table"]);
    let pattern;
    switch (row["table"]) {
      case "emp":
        pattern = urlPattern.deleteEmp;
        break;
      default:
        console.log("행이 선택되지 않았습니다");
        return Promise.resolve();
    }
    api
      .delete(pattern, { data: row.item })
      .then(console.log("삭제완료~"))
      .catch((error) => {
        console.error("하나 이상의 요청에서 에러 발생: ", error);
      });

    // Promise.all(deletePromises)
    //   .then((responses) => {
    //     if (responses) console.log("선택된 모든 행의 삭제 완료");
    //     setSelectedRows([]); // 선택행 배열 비우기
    //     setReloadSubTableData(!reloadSubTableData);
    //     setEditedEmp([]);
    //   })
    //   .catch((error) => {
    //     console.error("하나 이상의 요청에서 에러 발생: ", error);
    //     // 필요에 따라 다른 오류 처리 로직 추가
    //   });
  }, []);

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

  ////사원 테이블 재직 통계 계산
  const leftStaticsTableData = useMemo(() => {
    let jobOkY = 0;
    let jobOkA = 0;
    leftTableData.forEach((row) => {
      if (row.item?.["jobOk"] === "Y") jobOkY++;
      jobOkA++;
    });
    console.log("오잉");
    return [
      {
        item: {
          jobOkY: jobOkY,
          jobOkA: jobOkA,
        },
      },
    ];
  }, [leftTableData]);

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
      undeletedEmpTableData,
      codeHelperState,

      leftStaticsTableData,
    },
    actions: {
      insertEmp,
      updateEmp,
      deleteEmp,
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
      setUndeletedEmpTableData,
      setCodeHelperState,
      setAddRow,
      submitMainTabData, //mainTab update 함수
      getEmpByCdEmp,
    },
  };
}

export default EmpRegisterationModel;
