import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import defaultProfile from "../../styles/img/defaultProfile.jpg";
import Emp from "../../vo/HrManagement/Emp";
import EmpAdd from "../../vo/HrManagement/EmpAdd";
import EmpFam from "../../vo/HrManagement/EmpFam";
import { url } from "../CommonConstant";
import { urlPattern } from "./HrManagementConstant";

const HrManagementModel = () => {
  const [jobOk, setJobOk] = useState("Y"); //재직여부
  const [refYear, setRefYear] = useState(new Date().getFullYear()); // 귀속년도
  const [orderRef, setOrderRef] = useState("cdEmp"); // 정렬기준

  const [leftTableData, setLeftTableData] = useState([]); // 좌측 그리드 데이터
  const [leftTablePkValue, setLeftTablePkValue] = useState({ cdEmp: "A101" }); // 좌측 그리드 PK
  const [editedEmp, setEditedEmp] = useState({}); // 좌측 그리드 수정 ROW

  const [mainTabData, setMainTabData] = useState({}); // 메인탭 데이터
  const [editedEmpAdd, setEditedEmpAdd] = useState({}); // 메인탭 수정 ROW
  const [empImageSrc, setEmpImageSrc] = useState("");

  const [subTableData, setSubTableData] = useState([]); // 서브 그리드 데이터

  const [selectedRows, setSelectedRows] = useState([]); // 체크된 행(삭제를 위한)

  //검색조건 : 재직구분, 정렬기준
  const jobOkSelectRef = useRef();
  const orderSelectRef = useRef();
  //메인탭 Ref
  const mainTabRef = useRef();

  //조회버튼 클릭시 재직구분과 정렬기준을 업데이트
  const onSearch = useCallback((jobOkRef, orderRef) => {
    setOrderRef(orderRef.current.value);
    if (jobOkRef.current.value === "yAndOnThisYear") {
      setRefYear(new Date().getFullYear());
      setJobOk("Y");
    } else {
      setRefYear();
      setJobOk(jobOkRef.current.value);
    }
  }, []);

  //mainTab에서 Enter 입력시 EmpAdd 업데이트
  const submitMainTabData = useCallback(
    (event, value) => {
      if (event.key === "Enter") {
        console.log("엔터누름");
        event.target.blur();
        if (mainTabRef.current) {
          let newMainTabData = { ...mainTabData.item };
          const inputElements = mainTabRef.current.querySelectorAll("input");
          Array.from(inputElements).forEach((input) => {
            newMainTabData[input.id] =
              input.type !== "radio"
                ? input.value
                : input.checked
                ? input.value
                : null;
          });
          setEditedEmpAdd(newMainTabData);
        }
      }
      if (event.type === "change") {
        if (mainTabRef.current) {
          event.target.blur();
          let newMainTabData = { ...mainTabData.item };
          newMainTabData[event.target.id] = value;
          setEditedEmpAdd(newMainTabData);
        }
      }
    },
    [mainTabRef, mainTabData]
  );

  //leftTableData 가져오는 비동기 GET 요청
  useEffect(() => {
    axios
      .get(
        `${url}/emp/getEmpListForHrManagement?jobOk=${jobOk}+
        ${"&orderRef=" + orderRef}
        +
        ${refYear ? "&refYear=" + refYear : ""}`
      )
      .then((response) => {
        const data = response.data.map((item) => {
          return Emp(item);
        });
        setLeftTableData(data);
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [jobOk, refYear, orderRef]);

  //leftTablePkValue에 따라서 mainTabData 가져오는 비동기 post 요청
  useEffect(() => {
    console.log("leftTablePkValue", leftTablePkValue);
    if (leftTablePkValue?.cdEmp && Object.keys(leftTablePkValue).length !== 0) {
      axios
        .post(url + "/empAdd/getEmpAddByCdEmp", leftTablePkValue)
        .then((response) => {
          let data = response.data;
          console.log("불러온 mainTabData", data);
          setMainTabData(EmpAdd(data));
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    } else {
      setMainTabData({});
    }
  }, [leftTablePkValue]);

  //초기 랜더링시 이미지 불러오기
  useEffect(() => {
    if (leftTablePkValue.cdEmp) {
      axios
        .get(
          `${url + urlPattern.getEmpPhoto}?cdEmp=${leftTablePkValue.cdEmp}`,
          {
            responseType: "arraybuffer",
          }
        )
        .then((response) => {
          // ArrayBuffer를 Blob으로 변환하고 URL을 생성
          const blob = new Blob([response.data], { type: "image/jpeg" });
          const imageUrl = URL.createObjectURL(blob);
          setEmpImageSrc(imageUrl);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          setEmpImageSrc(defaultProfile);
        });
    } else setEmpImageSrc(defaultProfile);
  }, [leftTablePkValue]);

  //uploadEmpPhoto
  const updateEmpPhoto = useCallback(
    (event) => {
      const file = event.target.files[0];

      if (!file) {
        console.error("파일이 없습니다.");
        return;
      }

      // 파일 유형을 검사하여 이미지 파일만 허용
      if (!file.type.startsWith("image/")) {
        console.error("이미지 파일만 업로드가 가능합니다.");
        return;
      }

      const fileExtension = file.name.split(".").pop();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileExtension", fileExtension);
      formData.append("pkValue", JSON.stringify(leftTablePkValue));

      axios
        .put(url + urlPattern.updateEmpPhoto, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("파일업로드 성공!", response.data);
          setLeftTablePkValue({ ...leftTablePkValue });
        })
        .catch((error) => {
          console.error("File upload error:", error);
        });
    },
    [leftTablePkValue]
  );

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
    if (leftTablePkValue?.cdEmp) {
      axios
        .post(url + "/empFam/getEmpFamListByCdEmp", leftTablePkValue)
        .then((response) => {
          console.log(
            "LRlevel2GridModel > /empFam/getEmpFamListByCdEmp",
            response.data
          );
          const data = response.data.map((item) => {
            return EmpFam(item);
          });
          setSubTableData(data);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    }
  }, [leftTablePkValue]);

  //추가된 사원 insert 요청
  useEffect(() => {
    if (editedEmp?.isNew && Object.keys(editedEmp).length !== 0)
      axios
        .post(url + urlPattern.insertEmp, editedEmp.item)
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
  const insertEmp = useCallback((emp) => {
    axios
      .post(url + "/emp/insertEmp", emp)
      .then((response) => {
        if (response.data === 1) console.log("Emp insert 성공");
        setEditedEmp({});
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, []);

  //수정된 사원 update 요청
  useEffect(() => {
    if (editedEmp)
      if (!editedEmp.isNew && Object.keys(editedEmp).length !== 0)
        axios
          .put(url + "/emp/updateEmp", editedEmp.item)
          .then((response) => {
            if (response.data === 1) console.log("Emp update 성공");
            setEditedEmp();
          })
          .catch((error) => {
            console.error("에러발생: ", error);
            // 필요에 따라 다른 오류 처리 로직 추가
          });
  }, [editedEmp]);

  const updateEmp = useCallback((emp) => {
    axios
      .put(url + "/emp/updateEmp", emp)
      .then((response) => {
        if (response.data === 1) console.log("Emp update 성공");
        setEditedEmp();
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, []);

  //추가된 사원가족 insert 요청
  const insertEmpFam = useCallback((empFam) => {
    axios
      .post(url + urlPattern.insertEmpFam, empFam)
      .then((response) => {
        if (response.data === 1) console.log("EmpFam insert 성공");
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, []);

  //수정된 사원가족 update 요청
  const updateEmpFam = useCallback((empFam) => {
    axios
      .put(url + urlPattern.updateEmpFam, empFam)
      .then((response) => {
        if (response.data === 1) console.log("EmpFam 업데이트 성공");
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, []);

  //선택된 행 delete 요청
  const deleteSelectedRows = useCallback(() => {
    const editedTableNames = {};
    console.log("삭제요청된 행들", selectedRows);

    // 각 row에 대한 delete 요청을 생성
    const deletePromises = selectedRows.map((row) => {
      let pattern;
      switch (row.table) {
        case "empFam":
          pattern = urlPattern.deleteEmpFam;
          break;
        case "emp":
          pattern = urlPattern.deleteEmp;
          break;
        default:
          return Promise.resolve();
      }
      if (!editedTableNames[row.table]) editedTableNames[row.table] = true;
      return axios.delete(url + pattern, { data: row.item });
    });

    Promise.all(deletePromises)
      .then((responses) => {
        console.log("선택된 모든 행의 삭제 완료");
        console.log("selectedRows", selectedRows);
        setSelectedRows([]); // 선택행 배열 비우기
        Object.keys(editedTableNames).forEach((tableName) => {
          switch (tableName) {
            case "empFam":
              //setEditedEmpFam({}); // 사원가족 리로드
              break;
            case "emp":
              setEditedEmp({}); // 사원가족 리로드
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

  //현재행 삭제요청
  const deleteRow = useCallback((row) => {
    let pattern;
    switch (row.table) {
      case "empFam":
        pattern = urlPattern.deleteEmpFam;
        break;
      case "emp":
        pattern = urlPattern.deleteEmp;
        break;
      default:
        console.log("설정되지 않은 테이블 행을 삭제요청받음");
        return;
    }
    axios
      .delete(url + pattern, { data: row.item })
      .then(console.log("삭제완료"))
      .catch((error) => {
        console.error("하나 이상의 요청에서 에러 발생: ", error);
      });
  }, []);

  ////사원 테이블 재직 통계 계산
  const leftStaticsTableData = useMemo(() => {
    let jobOkY = 0;
    let jobOkN = 0;
    leftTableData.forEach((row) => {
      if (row.item["jobOk"] === "Y") jobOkY++;
      else jobOkN++;
    });
    return [
      {
        item: {
          jobOkY: jobOkY,
          jobOkN: jobOkN,
          jobOkSum: jobOkY + jobOkN,
        },
      },
    ];
  }, [leftTableData]);

  return {
    state: {
      jobOkSelectRef,
      orderSelectRef,

      leftTableData,
      leftTablePkValue,
      leftStaticsTableData,

      mainTabRef,
      mainTabData,
      empImageSrc,
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
      onSearch,

      setLeftTableData,
      setLeftTablePkValue,
      insertEmp,
      updateEmp,

      submitMainTabData,
      setMainTabData,
      setEditedEmpAdd,
      updateEmpPhoto,

      setSubTableData,
      insertEmpFam,
      updateEmpFam,

      setSelectedRows,
      deleteSelectedRows,

      deleteRow,
    },
  };
};

export default HrManagementModel;
