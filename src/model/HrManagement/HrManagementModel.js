import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import Emp from "../../vo/HrManagement/Emp";
import EmpAdd from "../../vo/HrManagement/EmpAdd";
import EmpFam from "../../vo/HrManagement/EmpFam";
import CommonConstant from "../CommonConstant";
import { urlPattern } from "./HrManagementConstant";

const HrManagementModel = () => {
  const { url } = CommonConstant(); // REST API 서버 주소

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
  const [editedEmpFam, setEditedEmpFam] = useState({}); // 서브 그리드 수정 ROW

  const [selectedRows, setSelectedRows] = useState([]); // 체크된 행(삭제를 위한)

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
  }, [jobOk, refYear, orderRef, editedEmp]);

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
  }, [leftTablePkValue, editedEmpAdd]);

  //초기 랜더링시 이미지 불러오기
  useEffect(() => {
    axios
      .get(url + "/empPhoto/getEmpPhotoByCdEmp", {
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
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [leftTablePkValue]);

  //insertEmpPhoto
  const insertEmpPhoto = useCallback(
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

      const formData = new FormData();
      formData.append("file", file);
      formData.append("pkValue", JSON.stringify(leftTablePkValue));

      axios
        .post(url + urlPattern.insertEmpPhoto, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("파일업로드 성공!", response.data);
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

  //추가된 사원가족 insert 요청
  const insertEmpFam = useCallback((row) => {
    axios
      .post(url + urlPattern.insertEmpFam, row.item)
      .then((response) => {
        if (response.data === 1) console.log("EmpFam insert 성공");
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, []);

  //수정된 사원가족 update 요청
  useEffect(() => {
    if (!editedEmpFam.isNew && Object.keys(editedEmpFam).length !== 0) {
      console.log("editedEmpFam 수정요청", editedEmpFam.item);
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
    }
  }, [editedEmpFam]);

  //수정된 사원가족 update 요청
  const updateEmpFam = useCallback((row) => {
    axios
      .put(url + urlPattern.updateEmpFam, row.item)
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
              setEditedEmpFam({}); // 사원가족 리로드
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
      leftTableData,
      leftTablePkValue,
      leftStaticsTableData,

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

      setLeftTableData,
      setLeftTablePkValue,
      setEditedEmp,

      setMainTabData,
      setEditedEmpAdd,
      insertEmpPhoto,

      setSubTableData,
      setEditedEmpFam,
      insertEmpFam,
      updateEmpFam,

      setSelectedRows,
      deleteSelectedRows,

      deleteRow,
    },
  };
};

export default HrManagementModel;
