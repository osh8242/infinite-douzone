import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";

const SwsmModel = () => {
  const url = "http://localhost:8888";

  const [leftTableData, setLeftTableData] = useState();
  const [otherTableData, setOtherTableData] = useState();
  const [cdEmp, setCdEmp] = useState("hong"); // 사원 버노
  const [mainTabData, setMainTabData] = useState();

  useEffect(() => {
    axios
      .get(url + "/emp/getAll")
      .then((response) => {
        console.log("SwsmModel > /emp/getAllEmp", response.data);
        const data = response.data.map((item) => ({
          Code: item.cdEmp,
          성명: item.nmKrname,
          주민등록번호: item.noSocial,
        }));
        setLeftTableData(data);
      })
      .catch((error) => {
        console.error("에러 : ", error);
      });
  }, []);

  // 기타급여 데이터
  // useEffect(() => {
  //   axios
  //     .get(url + "/swsm/getSwsmOtherListByEmpCode")
  //     .then((response) => {
  //       console.log(
  //         "SwsmModel > /swsm/getSwsmOtherListByEmpCode",
  //         response.data
  //       );
  //       const data = response.data.map((item) => ({
  //         항목: item.otherType,
  //         금액: item.otherMoney,
  //       }));
  //       setOtherTableData(data);
  //     })
  //     .catch((error) => {
  //       console.error("에러 : ", error);
  //     });
  // }, []);

  useEffect(() => {
    console.log("SwsmModel > /swsm/getSwsmByEmpCode", "cdEmp : ", cdEmp);
    axios
      .post(
        url + "/swsm/getSwsmByEmpCode",
        { empCode: cdEmp },
        { "Content-Type": "application/json" }
      )
      .then((response) => {
        console.log("==============================================");
        console.log("SwsmModel > /swsm/getSwsmByEmpCode", response.data);
        setMainTabData(response.data);
      })
      .catch((error) => {
        console.error("에러발생: ", error);
      });
  }, [cdEmp]);

  return {
    leftTableData: leftTableData,
    setLeftTableData,
    otherTableData: otherTableData,
    setOtherTableData,
    cdEmp: cdEmp,
    setCdEmp,
    mainTabData: mainTabData,
    setMainTabData,
  };
};

export default SwsmModel;
