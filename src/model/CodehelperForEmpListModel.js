import axios from "axios";
import { useState } from "react";
const CodehelperForEmpListModel = () => {
    const url = 'http://localhost:8888';

    const [empListData, setEmpListData] = useState({
        title : '사원조회',
        params : {},
        // { ynFor : 'n', daRetire : ''}
        tableHeaders: [{ field: "pk", text: "Code"}],
        // { field: "pk", text: "Code"},
        // { field: "nmKrname", text: "사원명"},
        // { field: "noSocial", text: "주민(외국인)번호"},
        // { field: "daRetire", text: "퇴사일자"}],
        tableData : [],
        searchField : [],
        // searchField : ['nmKrname', 'noSocial'],
    });  
    
    // 사원조회 
    const getEmpListForCodeHelper = () => {
        axios
        .post(
            url + "/emp/getEmpListForCodeHelper"
            , empListData.params)
        .then((response) => {
            const emplist = response.data.map((item) => ({
            pk: item.cdEmp,
            nmKrname: item.nmKrname,
            noSocial: item.noSocial,
            daRetire: item.daRetire,
            rankNo: item.rankNo,
            ynFor: item.ynFor,
        }));
        
        console.log(emplist);
        setEmpListData({ ...empListData, tableData: emplist });

    })
        .catch((error) => {
            console.log("에러발생: ", error);
            //에러 처리
        });
    }

    return {
        empListData
        ,setEmpListData
    }
};


export default CodehelperForEmpListModel;
