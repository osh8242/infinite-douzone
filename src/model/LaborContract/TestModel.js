import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { url } from "../CommonConstant";
import Swsm from "../../vo/LaborContract/Swsm";
import Emp from "../../vo/EmpRegister/Emp";
import SwsmOther from "../../vo/LaborContract/SwsmOther";
import { swsmUrlPattern } from "./LaborContractConstant";
import { urlPattern } from "../HrManagement/HrManagementConstant";
import { useApi } from "../Api";

const TestModel = () => {
  const api = useApi();

  const [leftTableData, setLeftTableData] = useState([]); // 좌측 그리드 데이터
  const [leftCodeHelperTableData, setLeftCodeHelperTableData] = useState([]);
  const [leftTablePkValue, setLeftTablePkValue] = useState({ cdEmp: "" }); // 좌측 그리드 PK
  const [editedEmp, setEditedEmp] = useState({}); // 좌측 그리드 수정 ROW

  const [mainTabData, setMainTabData] = useState({}); // 메인탭 데이터
  const [editedSwsm, setEditedSwsm] = useState({}); // 메인탭 수정 ROW
  const [editedSwsmOther, setEditedSwsmOther] = useState({}); // 메인탭 수정 ROW

  const [subTableData, setSubTableData] = useState([]); // 서브 그리드 데이터

  const [selectedRows, setSelectedRows] = useState([]); // 체크된 행(삭제를 위한)

  const [modalState, setModalState] = useState({ show: false }); // 모달컨트롤
  const [codeHelperTableData, setCodeHelperTableData] = useState([]);

  //search
  const jobRef = useRef("empAll"); // 소득구분
  const jobSelectRef = useRef("empAll");
  const dateRef = useRef("");
  const dateEndRef = useRef("");
  const dateSelectRef = useRef(null);
  const dateEndSelectRef = useRef(null);

  // settingSearch
  const jobSetRef = useRef(""); // 소득구분
  const jobSetSelectRef = useRef("empAll");
  const dateSetRef = useRef(""); // 소득구분
  const dateSetSelectRef = useRef(""); // 소득구분

  // 코드모달 업데이트
  function onLoadCodeHelper() {
    if (jobSelectRef.current.value === "empAll") {
      jobRef.current = "empAll";
    }
    getCodeHelperList();
  }

  const getCodeHelperList = () => {
    api
      .get(`/swsm/getCodeHelperList?job=${jobRef.current}`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        const newLeftCodeHelperTableData = response.data.map((emp) => {
          return { item: emp, table: "swsm" };
        });

        setLeftCodeHelperTableData(newLeftCodeHelperTableData);
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  };

  //조회버튼 클릭시  업데이트
  const onSearch = (jobSelectRef, dateSelectRef, dateEndSelectRef) => {
    if (jobSelectRef.current.value === "empAll") {
      jobRef.current = "empAll";
    } else if (jobSelectRef.current.value === "empRegistration") {
      jobRef.current = "empRegistration";
    } else if (jobSelectRef.current.value === "tempEmpRegistration") {
      jobRef.current = "tempEmpRegistration";
    } else {
      jobRef.current = jobSelectRef.current.value;
    }
    console.log("searrdddss");
    console.log(dateSelectRef.current.value);
    console.log(dateEndSelectRef.current.value);
    dateRef.current = dateSelectRef.current.value;
    dateEndRef.current = dateEndSelectRef.current.value;
    getEmpList();
  };

  //leftTableData 가져오는 비동기 GET 요청
  const getEmpList = () => {
    api
      .get(
        `/swsm/getEmpListForSwsmDate?job=${jobRef.current}&date=${dateRef.current}&dateEnd=${dateEndRef.current}`
      )
      .then((response) => {
        console.log("===================date=================");
        console.log(response);
        console.log(response.data);
        console.log("===================date=================");
        const newLeftCodeHelperTableData = response.data.map((emp) => {
          return { item: emp, table: "swsm" };
        });
        getLeftTableData(newLeftCodeHelperTableData);
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });

    // api
    //   .get(`/swsm/getEmpListForSwsm?job=${jobRef.current}`)
    //   .then((response) => {
    //     console.log(response);
    //     console.log(response.data);
    //     const newLeftCodeHelperTableData = response.data.map((emp) => {
    //       return { item: emp, table: "swsm" };
    //     });

    //     getLeftTableData(newLeftCodeHelperTableData);
    //   })
    //   .catch((error) => {
    //     console.error("에러발생: ", error);
    //     // 필요에 따라 다른 오류 처리 로직 추가
    //   });
  };

  // const getEmpList = () => {
  //   api
  //     .get(`/swsm/getEmpListForSwsm?job=${jobRef.current}`)
  //     .then((response) => {
  //       console.log(response);
  //       console.log(response.data);
  //       const newLeftCodeHelperTableData = response.data.map((emp) => {
  //         return { item: emp, table: "swsm" };
  //       });

  //       getLeftTableData(newLeftCodeHelperTableData);
  //     })
  //     .catch((error) => {
  //       console.error("에러발생: ", error);
  //       // 필요에 따라 다른 오류 처리 로직 추가
  //     });
  // };

  const getLeftTableData = (newLeftCodeHelperTableData) => {
    api
      .get(`/swsm/getSwsmListForSwsm?job=${jobRef.current}`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        let newLeftTableData = [];
        console.log("세팅전 emp 리스트", newLeftCodeHelperTableData);

        response.data.forEach((swsm, index) => {
          const targetIndex = newLeftCodeHelperTableData.findIndex(
            (row) => row.item["cdEmp"] === swsm["cdEmp"]
          );

          if (targetIndex !== -1) {
            Object.assign(swsm, newLeftCodeHelperTableData[targetIndex].item);
            newLeftTableData.push({ item: swsm, table: "swsm" });
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

  //leftTablePkValue에 따라서 mainTabData 가져오는 비동기 post 요청
  useEffect(() => {
    if (leftTablePkValue?.cdEmp && Object.keys(leftTablePkValue).length !== 0) {
      api
        .post(swsmUrlPattern.getSwsm, leftTablePkValue)
        .then((response) => {
          let data = response.data;
          console.log("mainTabData", data);
          setMainTabData(Swsm(data));
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    } else {
      setMainTabData({});
    }
  }, [leftTablePkValue]);

  // insert 요청
  const insertSwsm = useCallback((emp) => {
    api
      .post(`/swsm/insertSwsm`, emp)
      .then((response) => {
        if (response.data === 1) console.log("insertSwsm 성공");
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, []);

  //테이블에 등록
  const registSwsm = useCallback(
    (event, pkValue) => {
      console.log("swsm 등록전", leftTableData);
      const targetCdEmp = pkValue.cdEmp;
      let newLeftTableData = [...leftTableData];
      let newLeftCodeHelperTableData = leftCodeHelperTableData.filter((row) => {
        if (targetCdEmp === row.item.cdEmp) {
          const newRow = JSON.parse(JSON.stringify(row));
          newRow["insertedRow"] = true;
          newLeftTableData.push(newRow);
          insertSwsm(newRow.item);
          updateEmp(newRow.item);
          return false;
        }
        return true;
      });
      console.log("swsm 등록후", newLeftTableData);
      setLeftCodeHelperTableData(newLeftCodeHelperTableData);
      setLeftTableData(newLeftTableData);
    },
    [insertSwsm, leftCodeHelperTableData, leftTableData]
  );

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

  //insertSwsm   요청
  const insertEmp = useCallback((emp) => {
    api
      .post(swsmUrlPattern.insertEmp, emp)
      .then((response) => {
        if (response.data === 1) console.log("emp insert 성공");
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, []);

  //update swsm
  const updateSwsm = useCallback(
    (Swsm) => {
      console.log("updateSwsm 업데이트 요청", Swsm);
      api
        .put(swsmUrlPattern.updateSwsm, Swsm)
        .then((response) => {
          if (response.data === 1) console.log("Swsm 업데이트 성공");
          setLeftTablePkValue({ ...leftTablePkValue });
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    },
    [leftTablePkValue]
  );

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
    console.log("updateEmp 업데이트 요청", emp);

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

  // const submitMi = useCallback();

  //mainTab에서 Enter 입력시 swsm 업데이트
  const submitMainTabData = useCallback(
    (event, value) => {
      console.log("서브밋메인탭 데이터", event, value);
      if (
        event.target.id === "incomeClassfication" ||
        event.target.id === "dateOfcreate"
      ) {
        console.log("tttessetste");
        let newEmp = { ...mainTabData };
        newEmp[event.target.id] = value;
        console.log("leftTablePkValue");
        console.log(leftTablePkValue.cdEmp);
        newEmp["cdEmp"] = leftTablePkValue.cdEmp;
        updateEmp(newEmp);
        // setMainTabData(Emp(newEmp));
      }
      if (event.key === "Enter" || event.type === "change") {
        event.target.blur();
        console.log("event.target.id", event.target.id);
        console.log("value", value);
        let newSwsm = { ...mainTabData };
        newSwsm[event.target.id] = value;

        newSwsm["cdEmp"] = leftTablePkValue.cdEmp;
        console.log("newSwsm", newSwsm);
        updateSwsm(newSwsm);
      }
      if (event.type === "click" || typeof value === "object") {
        let newSwsm = { ...mainTabData };
        Object.assign(newSwsm, value);
        console.log("newSwsm", newSwsm);
        updateSwsm(newSwsm);
      }
    },
    [leftTablePkValue, mainTabData, jobSetSelectRef]
  );

  //subTableData 가져오는 비동기 post 요청
  useEffect(() => {
    setSubTableData([]);
    if (leftTablePkValue?.cdEmp) {
      api
        .post(swsmUrlPattern.getSwsmOther, leftTablePkValue)
        .then((response) => {
          console.log("SwsmOther Loaded", response.data);
          const data = response.data.map((item) => {
            return SwsmOther(item);
          });
          setSubTableData(data);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    }
  }, [leftTablePkValue]);

  const getSubTableData = useCallback(() => {
    api
      .post(swsmUrlPattern.getSwsmOther, leftTablePkValue)
      .then((response) => {
        console.log("SwsmOther Loaded", response.data);
        const data = response.data.map((item) => {
          return SwsmOther(item);
        });
        setSubTableData(data);
      })
      .catch((error) => {
        console.error("에러발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [leftTablePkValue]);

  //추가된 insert 요청
  const insertSwsmOther = useCallback(
    (swsmOther) => {
      console.log(swsmOther);
      api
        .post(swsmUrlPattern.insertSwsmOther, swsmOther)
        .then((response) => {
          if (response.data === 1) console.log("swsmOther insert 성공");
          setLeftTablePkValue({ ...leftTablePkValue });
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    },
    [leftTablePkValue]
  );

  //수정된 update 요청
  const updateSwsmOther = useCallback(
    (swsmOther) => {
      console.log("updateSwsmOther", "newSwsmOther", swsmOther);
      api
        .put(swsmUrlPattern.updateSwsmOther, swsmOther)
        .then((response) => {
          if (response.data === 1) console.log("updateSwsmOther 업데이트 성공");
          setLeftTablePkValue({ ...leftTablePkValue });
        })
        .catch((error) => {
          console.error("에러발생: ", error);
          // 필요에 따라 다른 오류 처리 로직 추가
        });
    },
    [leftTablePkValue]
  );

  //현재행 삭제요청
  const deleteRow = useCallback(
    (row) => {
      console.log("삭제요청 해당 테이블", row["table"]);
      let pattern;
      switch (row["table"]) {
        case "empFam":
          console.log("가족 딜리트 요청", row);
          pattern = urlPattern.deleteEmpFam;
          break;
        case "empPhoto":
          console.log("포토 딜리트 요청", row);
          pattern = urlPattern.deleteEmpPhoto;
          break;
        case "swsmOther":
          // pattern = urlPattern.deleteEmpAdd;
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

  return {
    state: {
      dateSetSelectRef,
      jobSelectRef,
      jobSetSelectRef,
      dateSelectRef,
      dateEndSelectRef,

      leftTableData,
      leftTablePkValue,
      leftCodeHelperTableData,

      mainTabData,

      selectedRows,

      modalState,
      codeHelperTableData,
      subTableData,
    },
    actions: {
      onSearch,
      onLoadCodeHelper,
      getEmpList,

      setLeftTableData,

      registSwsm,
      setLeftTablePkValue,

      insertEmp,
      updateEmp,

      // insertSwsm,
      // updateSwsm,

      submitMainTabData,
      setMainTabData,
      setEditedSwsm,

      setSubTableData,
      insertSwsmOther,
      updateSwsmOther,

      setSelectedRows,

      deleteRow,

      setModalState,
      setCodeHelperTableData,
    },
  };
};
export default TestModel;
