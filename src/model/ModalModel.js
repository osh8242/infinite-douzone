import axios from "axios";
import { useEffect, useState } from "react";

function ModalModel(){
const url = 'http://localhost:8888';

const [codeHelperCode, setCodeHelperCode] = useState('');
// const [params, setParams] = useState('');//  emplist 전용옵션 ex) { ynFor : 'n', daRetire : ''}
// const [headers, setHeaders] = useState([]);
// const [apiUrl, setApiUrl] = useState('');

const [tableData, setTableData] = useState({
    title : '',
    tableHeaders: [{ field: "codeId", text: "코드"}],
    // { field: "code", text: "Code"},
    // { field: "nmKrname", text: "사원명"},
    // { field: "noSocial", text: "주민(외국인)번호"},
    // { field: "daRetire", text: "퇴사일자"}],
    tableData : [],
    //searchField : ['pk'],
    searchField : ['codeId', 'codeName'],
  });

  useEffect(() => {
    getCodeListForCodeHelper(codeHelperCode);
  }, [codeHelperCode]);

// 메뉴별 조건에 맞는 codelist 
const getCodeListForCodeHelper = (codeHelperCode) => {
    return codeHelperCode !== '' && axios.post(
      url + codeHelperCode.url,
      codeHelperCode.params,
      {'Content-Type': 'application/json',},
    )
      .then((response) => {
        const codeDataList = response.data.map((item) => {
          const dynamicProperties = {};
          for (const key in item) {
            dynamicProperties[key] = item[key];
          }
          return dynamicProperties;
        });
        
        setTableData({
          ...tableData,
          tableData: codeDataList,
          title: codeHelperCode.title,
          tableHeaders: codeHelperCode.headers,
          searchField : codeHelperCode.searchField,
        });
      })
      .catch((error) => {
        console.log("에러발생: ", error);
        // 에러 처리
      });
  }

    return {
        state : {
            tableData : tableData
        },
        actions : {
            setTableData
            , setCodeHelperCode
        }
    }
}

export default ModalModel;