/*
Emp 테이블의 상태를 관리하는 모델
*/
import { useCallback, useEffect, useReducer, useState } from "react";
import axios from "../../node_modules/axios/index";

//요청 주소
const url = "http://localhost:8888";

//Emp 상태 관리
const reducerEmp = (empState, action) => {
  switch (action.type) {
    case "GET_ALL_EMP":
      return { ...empState, emplist: action.empState };
    case "GET_EMP_BY_CDEMP":
      return { ...empState, emp: action.empState };
    case "INSERT_EMP":
      return { ...empState, emplist: empState.emplist.concat(action.emp) };
    default:
      return empState;
  }
};

function EmpModel() {
  const [empState, dispatch] = useReducer(reducerEmp, []);

  // 로그인, 회원가입 기능 구현 후, 현재 로그인한 사용자의 code값을 가져오도록 수정 예정
  const [cdEmp, setCdEmp] = useState("E001"); //현재 로그인한 사원의 사원코드

  useEffect(() => {
    console.log("useEffect 실행!");
    getAllEmp();
  }, []);

  //EMP의 모든 사원정보를 가져오는 GET 요청
  const getAllEmp = () => {
    axios
      .get(url + "/emp/getAllEmp")
      .then((response) => {
        console.log("EmpModel /emp/getAllEmp => ", response.data);
        const data = response.data.map((item) => ({
          code: item.cdEmp,
          사원명: item.nmKrname,
          내외국인: item.ynFor,
          주민번호: item.noSocial,
          구분: item.jobOk === "1" ? "재직" : "퇴직",
          selected: false,
          checked: false,
        }));
        dispatch({
          type: "GET_ALL_EMP",
          empState: data,
        });
      })
      .catch((error) => {
        console.log("에러발생: ", error);
        //에러 처리
      });
  };

  //EMP의 한 사원의 정보를 가져오는 POST 요청
  const getEmpByCdEmp = useCallback((cdEmp) => {
    console.log("EmpModel > /emp/getEmpByCdEmp", "cdEmp : ", cdEmp);
    axios
      .post(
        url + "/emp/getEmpByCdEmp",
        { cdEmp: cdEmp },
        { ContentType: "application/json" }
      )
      .then((response) => {
        console.log(
          "EmpRegisterationModel > /emp/getEmpByCdEmp",
          response.data
        );
        dispatch({
          type: "GET_EMP_BY_CDEMP",
          empState: response.data,
        });
      })
      .catch((error) => {
        console.error("에러발생: ", error);
      });
  });

  //EMP insert POST 요청
  const insertEmp = useCallback((value) => {
    console.log("EmpModel > /emp/insertEmp ", value);
    axios
      .post(
        url + "/emp/insertEmp",
        { emp: value },
        { ContentType: "qpplication/json" }
      )
      .then((response) => {
        dispatch({
          type: "INSERT_EMP",
          emp: value,
        });
      })
      .catch((error) => {
        console.log("EmpModel /emp/insertEmp error -> ", error);
      });
  });

  // //subTableData 가져오는 비동기 POST 요청 (사원의 가족사항 정보)
  // useEffect(() => {
  //   console.log(
  //     "EmpRegisterationModel > /empFam/getListByCdEmp",
  //     "cdEmp : ",
  //     cdEmp
  //   );
  //   axios
  //     .post(
  //       url + "/empFam/getListByCdEmp",
  //       { cdEmp: cdEmp },
  //       { ContentType: "application/json" }
  //     )
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
  //       setSubTableData(data);
  //     })
  //     .catch((error) => {
  //       console.log("에러발생: ", error);
  //       //에러처리
  //     });
  // }, [cdEmp]);

  return {
    cdEmp: cdEmp,
    setCdEmp,
    empState,
    getEmpByCdEmp,
    // leftTableData: leftTableData,
    // setLeftTableData,
    // mainTableData: mainTableData,
    // setMainTableData,
    // subTableData: subTableData,
    // setSubTableData,
  };
}

export default EmpModel;
