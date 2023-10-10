import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import defaultProfile from "../../styles/img/defaultProfile.jpg";
import EmpAdd from "../../vo/HrManagement/EmpAdd";
import EmpFam from "../../vo/HrManagement/EmpFam";
import { useApi } from "../Api";
import { urlPattern } from "./HrManagementConstant";

const HrManagementModel = () => {
  const api = useApi();
  const jobOkRef = useRef("Y"); //재직여부
  const yearRef = useRef(new Date().getFullYear()); // 귀속년도
  const orderRef = useRef("cdEmp"); // 정렬기준

  const [leftTableData, setLeftTableData] = useState([]); // 좌측 그리드 데이터
  const [leftCodeHelperTableData, setLeftCodeHelperTableData] = useState([]);
  const [leftTablePkValue, setLeftTablePkValue] = useState({ cdEmp: "" }); // 좌측 그리드 PK
  const [editedEmp, setEditedEmp] = useState({}); // 좌측 그리드 수정 ROW

  const [mainTabData, setMainTabData] = useState({}); // 메인탭 데이터
  const [editedEmpAdd, setEditedEmpAdd] = useState({}); // 메인탭 수정 ROW
  const [empImageSrc, setEmpImageSrc] = useState("");

  const [subTableData, setSubTableData] = useState([]); // 서브 그리드 데이터

  const [selectedRows, setSelectedRows] = useState([]); // 체크된 행(삭제를 위한)

  const [modalState, setModalState] = useState({ show: false }); // 확인모달컨트롤
  const [codeHelperTableData, setCodeHelperTableData] = useState([]);

  //검색조건 : 재직구분, 정렬기준
  const jobOkSelectRef = useRef("yAndOnThisYear");
  const orderSelectRef = useRef("cdEmp");

  //조회버튼 클릭시 재직구분과 정렬기준을 업데이트
  const onSearch = (jobOkSelectRef, orderSelectRef) => {
    orderRef.current = orderSelectRef.current.value;
    if (jobOkSelectRef.current.value === "yAndOnThisYear") {
      yearRef.current = new Date().getFullYear();
      jobOkRef.current = "Y";
    } else {
      yearRef.current = null;
      jobOkRef.current = jobOkSelectRef.current.value;
    }
    getEmpList();
  };

  const getLeftTableData = (newLeftCodeHelperTableData) => {
    api
      .get(
        `/empAdd/getEmpAddListForHrManagement?jobOk=${jobOkRef.current}+
      ${"&orderRef=" + orderRef.current}
      +
      ${yearRef.current ? "&refYear=" + yearRef.current : ""}`
      )
      .then((response) => {
        let newLeftTableData = [];
        console.log("세팅전 emp 리스트", newLeftCodeHelperTableData);

        response.data.forEach((empAdd, index) => {
          const targetIndex = newLeftCodeHelperTableData.findIndex(
            (row) => row.item["cdEmp"] === empAdd["cdEmp"]
          );

          if (targetIndex !== -1) {
            Object.assign(empAdd, newLeftCodeHelperTableData[targetIndex].item);
            newLeftTableData.push({ item: empAdd, table: "empAdd" });
            newLeftCodeHelperTableData = newLeftCodeHelperTableData.filter(
              (row, index) => index !== targetIndex
            );
          }
        });
        console.log("세팅된 newLeftTableData", newLeftTableData);
        console.log(
          "세팅된 newLeftCodeHelperTableData",
          newLeftCodeHelperTableData
        );
        setLeftCodeHelperTableData(newLeftCodeHelperTableData);
        setLeftTableData(newLeftTableData);
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  };

  //leftTableData 가져오는 비동기 GET 요청
  const getEmpList = () => {
    api
      .get(
        `/emp/getEmpListForHrManagement?jobOk=${jobOkRef.current}+
      ${"&orderRef=" + orderRef.current}
      +
      ${yearRef.current ? "&refYear=" + yearRef.current : ""}`
      )
      .then((response) => {
        const newLeftCodeHelperTableData = response.data.map((emp) => {
          return { item: emp, table: "empAdd" };
        });

        getLeftTableData(newLeftCodeHelperTableData);
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  };

  //인사관리 insert 요청
  const insertEmpAdd = useCallback((emp) => {
    api
      .post(urlPattern.insertEmpAdd, emp)
      .then((response) => {
        if (response.data === 1) console.log("EmpAdd insert 성공");
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, []);

  //테이블에 인사관리 등록
  const registEmpAdd = useCallback(
    (event, pkValue) => {
      console.log("인사관리 등록전", leftTableData);
      const targetCdEmp = pkValue.cdEmp;
      let newLeftTableData = [...leftTableData];
      let newLeftCodeHelperTableData = leftCodeHelperTableData.filter((row) => {
        if (targetCdEmp === row.item.cdEmp) {
          const newRow = JSON.parse(JSON.stringify(row));
          newRow["insertedRow"] = true;
          newLeftTableData.push(newRow);
          insertEmpAdd(newRow.item);
          return false;
        }
        return true;
      });
      console.log("인사관리 등록후", newLeftTableData);
      setLeftTablePkValue(pkValue);
      setLeftCodeHelperTableData(newLeftCodeHelperTableData);
      setLeftTableData(newLeftTableData);
    },
    [insertEmpAdd, leftCodeHelperTableData, leftTableData]
  );

  //leftTablePkValue에 따라서 mainTabData 가져오는 비동기 post 요청
  useEffect(() => {
    if (leftTablePkValue?.cdEmp && Object.keys(leftTablePkValue).length !== 0) {
      api
        .post(urlPattern.getEmpAddByCdEmp, leftTablePkValue)
        .then((response) => {
          let data = response.data;
          console.log("mainTabData", data);
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
      api
        .get(`${urlPattern.getEmpPhoto}?cdEmp=${leftTablePkValue.cdEmp}`, {
          responseType: "arraybuffer",
        })
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
      console.log("모델 - 이미지 업로드 함수");
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

      api
        .put(urlPattern.updateEmpPhoto, formData, {
          headers: {
            Authorization: localStorage.getItem("authToken"),
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

  const deleteEmpPhoto = useCallback(() => {
    const row = { item: leftTablePkValue, table: "empPhoto" };
    console.log("row", row);
    deleteRow(row);
  }, [leftTablePkValue]);

  //mainTab에서 Enter 입력시 EmpAdd 업데이트
  const submitMainTabData = useCallback(
    (event, value) => {
      console.log("서브밋메인탭 데이터", event, value);
      if (event.key === "Enter" || event.type === "change") {
        if (event.key === "Enter") event.target.blur();
        console.log("event.target.id", event.target.id);
        console.log("value", value);
        let newEmpAdd = { ...mainTabData };
        newEmpAdd[event.target.id] = value;
        console.log("newEmpAdd", newEmpAdd);
        updateEmpAdd(newEmpAdd);
      }
      if (event.type === "click" || typeof value === "object") {
        let newEmpAdd = { ...mainTabData };
        Object.assign(newEmpAdd, value);
        console.log("newEmpAdd", newEmpAdd);
        updateEmpAdd(newEmpAdd);
      }
    },
    [leftTablePkValue, mainTabData]
  );

  //update EmpAdd
  const updateEmpAdd = useCallback(
    (EmpAdd) => {
      console.log("editedEmpAdd 업데이트 요청", EmpAdd);
      api
        .put(urlPattern.updateEmpAdd, EmpAdd)
        .then((response) => {
          if (response.data === 1) console.log("EmpAdd 업데이트 성공");
          setLeftTablePkValue({ ...leftTablePkValue });
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    },
    [leftTablePkValue]
  );

  //subTableData 가져오는 비동기 post 요청
  useEffect(() => {
    if (leftTablePkValue?.cdEmp && Object.keys(leftTablePkValue).length !== 0) {
      api
        .post(urlPattern.getEmpFamListByCdEmp, leftTablePkValue)
        .then((response) => {
          console.log("EmpFam Loaded", response.data);
          const data = response.data.map((item) => {
            return EmpFam(item);
          });
          setSubTableData(data);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    } else {
      console.log("setSubtableData[]");
      setSubTableData([]);
    }
  }, [leftTablePkValue]);

  const getSubTableData = useCallback(() => {
    api
      .post(urlPattern.getEmpFamListByCdEmp, leftTablePkValue)
      .then((response) => {
        console.log("EmpFam Loaded", response.data);
        const data = response.data.map((item) => {
          return EmpFam(item);
        });
        setSubTableData(data);
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [leftTablePkValue]);

  //추가된 사원 insert 요청
  useEffect(() => {
    if (editedEmp?.isNew && Object.keys(editedEmp).length !== 0)
      api
        .post(urlPattern.insertEmp, editedEmp.item)
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
    api
      .post(urlPattern.insertEmp, emp)
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
        api
          .put(urlPattern.updateEmp, editedEmp.item)
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
    api
      .put(urlPattern.updateEmp, emp)
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
  const insertEmpFam = useCallback(
    (empFam) => {
      console.log("insertNewRow called with data:", empFam);
      api
        .post(urlPattern.insertEmpFam, empFam)
        .then((response) => {
          if (response.data === 1) console.log("EmpFam insert 성공");
          setLeftTablePkValue({ ...leftTablePkValue });
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    },
    [leftTablePkValue]
  );

  //수정된 사원가족 update 요청
  const updateEmpFam = useCallback(
    (empFam) => {
      console.log("updateEmpFam", "newEmpFam", empFam);
      api
        .put(urlPattern.updateEmpFam, empFam)
        .then((response) => {
          if (response.data === 1) console.log("EmpFam 업데이트 성공");
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    },
    [leftTablePkValue]
  );

  //선택된 행들 delete 요청
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
        case "empAdd":
          pattern = urlPattern.deleteEmpAdd;
          break;
        default:
          return Promise.resolve();
      }
      if (!editedTableNames[row.table]) editedTableNames[row.table] = true;
      return api.delete(pattern, { data: row.item });
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
            case "empAdd":
              getEmpList();
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
  const deleteRow = useCallback(
    (row) => {
      console.log("삭제요청 해당 테이블", row["table"]);
      let pattern;
      switch (row["table"]) {
        case "empFam":
          if (row.item["cdFamrel"] === "CF0") return;
          console.log("가족 딜리트 요청", row);
          pattern = urlPattern.deleteEmpFam;
          break;
        case "empAdd":
          pattern = urlPattern.deleteEmpAdd;
          console.log("지우려는 row", row);
          const newLeftCodeHelperTableData = [...leftCodeHelperTableData];
          newLeftCodeHelperTableData.push(row);
          setLeftCodeHelperTableData(newLeftCodeHelperTableData);
          const newLeftTableData = leftTableData.filter((data) => {
            if (data.item.cdEmp === row.item.cdEmp) return false;
            else return true;
          });
          setLeftTableData(newLeftTableData);
          break;
        case "empPhoto":
          console.log("포토 딜리트 요청", row);
          pattern = urlPattern.deleteEmpPhoto;
          break;
        default:
          console.log("설정되지 않은 테이블 행을 삭제요청받음");
          return;
      }
      api
        .delete(pattern, { data: row.item })
        .then(console.log("삭제완료"))
        .catch((error) => {
          console.error("하나 이상의 요청에서 에러 발생: ", error);
        });
    },
    [leftCodeHelperTableData]
  );

  ////사원 테이블 재직 통계 계산
  const leftStaticsTableData = useMemo(() => {
    let jobOkY = 0;
    let jobOkN = 0;
    leftTableData.forEach((row) => {
      if (row.item?.["jobOk"] === "Y") jobOkY++;
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
      leftCodeHelperTableData,
      leftStaticsTableData,

      mainTabData,
      empImageSrc,
      subTableData,
      selectedRows,

      modalState,
      codeHelperTableData,
    },
    actions: {
      onSearch,

      setLeftTableData,

      registEmpAdd,
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
      deleteEmpPhoto,

      setModalState,
      setCodeHelperTableData,
    },
  };
};

export default HrManagementModel;
