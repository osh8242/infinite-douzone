import { useEffect, useMemo, useState } from "react";
import axios from "../../node_modules/axios/index";
import Emp from "../vo/LRlevel2Grid/Emp";
import CommonConstant from "./CommonConstant";
import EmpFam from "../vo/LRlevel2Grid/EmpFam";

const LRlevel2GridModel = () => {
  const [jobOk, setJobOk] = useState("Y"); //재직여부
  const [refYear, setRefYear] = useState(new Date().getFullYear()); // 귀속년도
  const [orderRef, setOrderRef] = useState("cdEmp"); // 정렬기준

  const url = "http://localhost:8888";
  const { labels } = CommonConstant();

  const [mainTablePkValue, setMainTablePkValue] = useState(); // cdEmp
  const [editedEmp, setEditedEmp] = useState({});

  const [subTablePkValue, setSubTablePkValue] = useState(); // noSocial
  const [editedEmpFam, setEditedEmpFam] = useState({});

  const [leftTableData, setLeftTableData] = useState([]);
  const [mainTabData, setMainTabData] = useState({});
  const [subTableData, setSubTableData] = useState([]);

  //leftTableData 가져오는 비동기 GET 요청
  useEffect(() => {
    setLeftTableData();
    const postData = {
      jobOk: jobOk,
      ...(refYear && { daRetire: refYear }),
    };
    axios
      .post(
        `${url}/emp/getEmpListByJobOk${
          orderRef ? "?orderRef=" + orderRef : ""
        }`,
        postData
      )
      .then((response) => {
        const data = response.data.map((item) => {
          const empData = {
            cdEmp: item.cdEmp,
            nmKrname: item.nmKrname,
          };
          return Emp(empData);
        });
        setLeftTableData(data);
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [jobOk, refYear, orderRef, editedEmp]);

  //mainTabData 가져오는 비동기 post 요청
  useEffect(() => {
    setMainTabData({});
    if (mainTablePkValue)
      axios
        .post(url + "/empAdd/getEmpAddByCdEmp", mainTablePkValue, {
          "Content-Type": "application/json",
        })
        .then((response) => {
          let data = response.data;
          if (response.data === "") data = {};
          setMainTabData(data);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
  }, [mainTablePkValue]);

  //subTableData 가져오는 비동기 post 요청
  useEffect(() => {
    setSubTableData([]);
    if (mainTablePkValue) {
      axios
        .post(url + "/empFam/getEmpFamListByCdEmp", mainTablePkValue)
        .then((response) => {
          console.log(
            "LRlevel2GridModel > /empFam/getEmpFamListByCdEmp",
            response.data
          );
          const data = response.data.map((item) => {
            const empFamData = {
              seqVal: item.seqVal,
              cdEmp: item.cdEmp,
              cdFamrel: item.cdFamrel,
              nmKrname: item.nmKrname,
              ynFor: item.ynFor,
              noSocial: item.noSocial,
              fgSchool: item.fgSchool,
              fgGraduation: item.fgGraduation,
              ynTogether: item.ynTogether,
              ynLunarbir: item.ynLunarbir,
              daBirth: item.daBirth,
              cdJob: item.cdJob,
              nmKrcom: item.nmKrcom,
              cdOffpos: item.cdOffpos,
            };
            return EmpFam(empFamData);
          });
          setSubTableData(data);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    }
  }, [mainTablePkValue, editedEmpFam]);

  //수정된 사원 update 요청
  useEffect(() => {
    if (!editedEmp.isNew && Object.keys(editedEmp).length !== 0)
      axios
        .put(url + "/emp/updateEmp", editedEmp)
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
        .post(url + "/emp/insertEmp", editedEmp)
        .then((response) => {
          if (response.data === 1) console.log("Emp 업데이트 성공");
          setEditedEmp({});
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
  }, [editedEmp]);

  //수정된 사원가족 update 요청
  useEffect(() => {
    if (Object.keys(editedEmpFam).length !== 0)
      axios
        .put(url + "/empFam/updateEmpFam", editedEmpFam)
        .then((response) => {
          if (response.data === 1) console.log("Emp 업데이트 성공");
          setEditedEmpFam({});
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
  }, [editedEmpFam]);

  return {
    leftTableData: leftTableData,
    mainTablePk: mainTablePkValue,
    mainTabData: mainTabData,
    subTableData: subTableData,
    jobOk: jobOk,
    refYear: refYear,
    orderRef: orderRef,
    actions: {
      setJobOk,
      setRefYear,
      setOrderRef,

      setLeftTableData,
      setMainTablePkValue,
      setEditedEmp,

      setMainTabData,

      setSubTableData,
      setSubTablePkValue,
      setEditedEmpFam,
    },
  };
};

export default LRlevel2GridModel;
