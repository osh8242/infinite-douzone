import axios from "axios";

const { createContext, useState, useCallback } = require("react");

const ContextModel = createContext({
  state: { selectedRows: [] },
  actions: {
    deleteSelectedRows: () => {},
  },
});

const ContextProvider = ({ children }) => {
  const url = "http://localhost:8888"; // REST API 서버 주소

  const [selectedRows, setSelectedRows] = useState([]);

  const deleteSelectedRows = useCallback(() => {
    // 각 row에 대한 delete 요청을 생성
    const deletePromises = selectedRows.map((row) => {
      switch (row.table) {
        case "empFam":
          console.log("url + '/empFam/deleteEmpFam', row.item", row.item);
          return axios.delete(url + "/empFam/deleteEmpFam", { data: row.item });
        default:
          return Promise.resolve(); // 이 부분이 중요합니다. 모든 경우에 프로미스를 반환해야 합니다.
      }
    });

    Promise.all(deletePromises)
      .then((responses) => {
        console.log("선택된 모든 행의 삭제 완료");
        setSelectedRows([]); // 상태 업데이트
      })
      .catch((error) => {
        console.error("하나 이상의 요청에서 에러 발생: ", error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [selectedRows]);

  const value = {
    contextState: { selectedRows },
    contextActions: {
      setSelectedRows,
      deleteSelectedRows,
    },
  };

  return (
    <ContextModel.Provider value={value}>{children}</ContextModel.Provider>
  );
};

const { Consumer: ContextConsumer } = ContextModel;

export { ContextConsumer, ContextProvider };

export default ContextModel;
