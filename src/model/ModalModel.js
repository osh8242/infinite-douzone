import axios from "axios";
import { useEffect, useState } from "react";

function ModalModel(){
const url = 'http://localhost:8888';

const [params, setParams] = useState('');//  emplist 전용옵션 ex) { ynFor : 'n', daRetire : ''}
const [headers, setHeaders] = useState([]);
const [tableData, setTableData] = useState({
    title : '',
    tableHeaders: [{ field: "pk", text: "Code"}],
    // { field: "pk", text: "Code"},
    // { field: "nmKrname", text: "사원명"},
    // { field: "noSocial", text: "주민(외국인)번호"},
    // { field: "daRetire", text: "퇴사일자"}],
    tableData : [],
    searchField : [],
    // searchField : ['nmKrname', 'noSocial'],
  });

  useEffect(() => {
    getEmpListForCodeHelper(params);
  }, [params]);

// 메뉴별 조건에 맞는 emplist 
const getEmpListForCodeHelper = (params) => {
    return axios.post(
      url + "/emp/getEmpListForCodeHelper",
      params,
      {'Content-Type': 'application/json',},
    )
      .then((response) => {
        const emplistdata = response.data.map((item) => ({
          pk: item.cdEmp,
          nmKrname: item.nmKrname,
          noSocial: item.noSocial,
          daRetire: item.daRetire,
          rankNo: item.rankNo,
          ynFor: item.ynFor,
        }));
  
        setTableData({
          ...tableData,
          tableData: emplistdata, title : '사원조회', tableHeaders: headers,
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
            , setParams
            , setHeaders
        }
    }
}

export default ModalModel;