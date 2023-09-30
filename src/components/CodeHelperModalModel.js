import axios from "axios";	
import { useEffect, useState } from "react";	
import { objectToQueryString } from "../utils/StringUtils";	

function CodeHelperModalModel(){	
const url = 'http://localhost:8888';	

const [codeHelperCode, setCodeHelperCode] = useState('');	
// const [params, setParams] = useState('');//  emplist 전용옵션 ex) { ynFor : 'n', daRetire : ''}	
// const [headers, setHeaders] = useState([]);	
// const [apiUrl, setApiUrl] = useState('');	

const [modalData, setTModalData] = useState({	
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

    return codeHelperCode !== '' && axios.get(	
      url + codeHelperCode.url	
       + objectToQueryString(codeHelperCode.params),	
      //{data : codeHelperCode.params},	
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

        setTModalData({	
          ...modalData,	
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
            modalData : modalData	
        },	
        actions : {	
          setTModalData	
            , setCodeHelperCode	
        }	
    }	
}	

export default CodeHelperModalModel;