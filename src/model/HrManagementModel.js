import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import Emp from "../vo/LRlevel2Grid/Emp";
import EmpAdd from "../vo/LRlevel2Grid/EmpAdd";
import EmpFam from "../vo/LRlevel2Grid/EmpFam";
import ContextModel from "./ContextModel";

const HrManagementModel = () => {
  const url = "http://localhost:8888"; // REST API 서버 주소

  const [jobOk, setJobOk] = useState("Y"); //재직여부
  const [refYear, setRefYear] = useState(new Date().getFullYear()); // 귀속년도
  const [orderRef, setOrderRef] = useState("cdEmp"); // 정렬기준

  const [leftTableData, setLeftTableData] = useState([]); // 좌측 그리드 데이터
  const [leftTablePkValue, setLeftTablePkValue] = useState({ cdEmp: "A101" }); // 좌측 그리드 PK
  const [editedEmp, setEditedEmp] = useState({}); // 좌측 그리드 수정 ROW

  const [mainTabData, setMainTabData] = useState({}); // 메인탭 데이터
  const [editedEmpAdd, setEditedEmpAdd] = useState({}); // 메인탭 수정 ROW

  const [subTableData, setSubTableData] = useState([]); // 서브 그리드 데이터
  const [editedEmpFam, setEditedEmpFam] = useState({}); // 서브 그리드 수정 ROW

  const [selectedRows, setSelectedRows] = useState([]); // 체크된 행(삭제를 위한)

  const { contextState } = useContext(ContextModel);
  const reloadSubTableData = contextState.reloadSubTableData;

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
    if (leftTablePkValue && Object.keys(leftTablePkValue).length !== 0) {
      console.log("mainTabData 불러오기");
      console.log("leftTablePkValue", leftTablePkValue);
      axios
        .post(url + "/empAdd/getEmpAddByCdEmp", leftTablePkValue, {
          "Content-Type": "application/json",
        })
        .then((response) => {
          let data = response.data;
          console.log("불러온 mainTabData", data);
          setMainTabData(EmpAdd({}));
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
    if (editedEmpAdd && Object.keys(editedEmpAdd).length !== 0) {
      console.log("editedEmpAdd 업데이트 요청", editedEmpAdd);
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
    }
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
  }, [leftTablePkValue, editedEmpFam, reloadSubTableData]);

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

  //선택된 행 delete 요청
  const deleteSelectedRows = useCallback(() => {
    // 각 row에 대한 delete 요청을 생성
    const deletePromises = selectedRows.map((row) => {
      switch (row.table) {
        case "empFam":
          console.log("url + '/empFam/deleteEmpFam', row.item", row.item);
          return axios.delete(url + "/empFam/deleteEmpFam", { data: row.item });
        default:
          return Promise.resolve();
      }
    });

    Promise.all(deletePromises)
      .then((responses) => {
        console.log("선택된 모든 행의 삭제 완료");
        setSelectedRows([]); // 선택행 배열 비우기
        setEditedEmpFam([]); // 사원가족 리로드
      })
      .catch((error) => {
        console.error("하나 이상의 요청에서 에러 발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [selectedRows]);

  return {
    state: {
      leftTableData,
      leftTablePkValue,
      mainTabData,
      subTableData,
      selectedRows,
      jobOk,
      refYear,
      orderRef,
    },
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
      setEditedEmpFam,

      setSelectedRows,
      deleteSelectedRows,
    },
  };
};

export default HrManagementModel;