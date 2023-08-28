import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import Emp from "../vo/LRlevel2Grid/Emp";
import EmpAdd from "../vo/LRlevel2Grid/EmpAdd";
import EmpFam from "../vo/LRlevel2Grid/EmpFam";

const LRlevel2GridModel = () => {
  const [jobOk, setJobOk] = useState("Y"); //재직여부
  const [refYear, setRefYear] = useState(new Date().getFullYear()); // 귀속년도
  const [orderRef, setOrderRef] = useState("cdEmp"); // 정렬기준

  const url = "http://localhost:8888";

  const [leftTableData, setLeftTableData] = useState([]);
  const [leftTablePkValue, setLeftTablePkValue] = useState({ cdEmp: "A101" }); // cdEmp
  const [editedEmp, setEditedEmp] = useState({});

  const [mainTabData, setMainTabData] = useState({});
  const [editedEmpAdd, setEditedEmpAdd] = useState();

  const [subTableData, setSubTableData] = useState([]);
  const [subTablePkValue, setSubTablePkValue] = useState();
  const [editedEmpFam, setEditedEmpFam] = useState({});

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

  //leftTablePkValue에 따라서 mainTabData 가져오는 비동기 post 요청
  useEffect(() => {
    console.log("leftTablePkValue", leftTablePkValue);
    if (leftTablePkValue && Object.keys(leftTablePkValue).length !== 0) {
      console.log("mainTabData 불러오기");
      axios
        .post(url + "/empAdd/getEmpAddByCdEmp", leftTablePkValue, {
          "Content-Type": "application/json",
        })
        .then((response) => {
          let data = response.data;
          if (response.data === "") data = {};
          console.log("불러온 mainTabData", data);
          setMainTabData(EmpAdd(data));
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    }
  }, [leftTablePkValue, editedEmpAdd]);

  //editedEmpAdd에 따라 업데이트 요청을 하는 비동기 put 요청
  useEffect(() => {
    console.log("editedEmpAdd", editedEmpAdd);
    if (editedEmpAdd && Object.keys(editedEmpAdd).length !== 0)
      axios
        .put(url + "/empAdd/updateEmpAdd", editedEmpAdd)
        .then((response) => {
          if (response.data === 1) console.log("EmpAdd 업데이트 성공");
          setEditedEmpAdd({});
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
  }, [editedEmpAdd]);

  //subTableData 가져오는 비동기 post 요청
  useEffect(() => {
    setSubTableData([]);
    if (leftTablePkValue) {
      axios
        .post(url + "/empFam/getEmpFamListByCdEmp", leftTablePkValue)
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
  }, [leftTablePkValue, editedEmpFam]);

  //추가된 사원 insert 요청
  useEffect(() => {
    if (editedEmp?.isNew && Object.keys(editedEmp).length !== 0)
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

  //수정된 사원 update 요청
  useEffect(() => {
    if (editedEmp)
      if (!editedEmp.isNew && Object.keys(editedEmp).length !== 0)
        axios
          .put(url + "/emp/updateEmp", editedEmp.item)
          .then((response) => {
            if (response.data === 1) console.log("Emp 업데이트 성공");
            setEditedEmp();
          })
          .catch((error) => {
            console.error("에러발생: ", error);
            // 필요에 따라 다른 오류 처리 로직 추가
          });
  }, [editedEmp]);

  //추가된 사원가족 insert 요청
  useEffect(() => {
    if (editedEmpFam.isNew && Object.keys(editedEmpFam).length !== 0)
      axios
        .post(url + "/empFam/insertEmpFam", editedEmpFam.item)
        .then((response) => {
          if (response.data === 1) console.log("Emp 업데이트 성공");
          setEditedEmpFam({});
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
  }, [editedEmpFam]);

  //수정된 사원가족 update 요청
  useEffect(() => {
    console.log("editedEmpFam", editedEmpFam.item);
    if (!editedEmpFam.isNew && Object.keys(editedEmpFam).length !== 0)
      axios
        .put(url + "/empFam/updateEmpFamBySeqValAndCdEmp", editedEmpFam.item)
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
    leftTablePkValue: leftTablePkValue,
    mainTabData: mainTabData,
    setMainTabData,
    subTableData: subTableData,
    setSubTableData,
    jobOk: jobOk,
    setJobOk,
    refYear: refYear,
    setRefYear,
    orderRef: orderRef,
    actions: {
      setJobOk,
      setRefYear,
      setOrderRef,

      setLeftTableData,
      setLeftTablePkValue,
      setEditedEmp,

      setMainTabData,
      setEditedEmpAdd,

      setSubTableData,
      setSubTablePkValue,
      setEditedEmpFam,
    },
  };
};

export default LRlevel2GridModel;
