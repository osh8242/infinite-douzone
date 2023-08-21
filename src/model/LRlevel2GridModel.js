import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';

const LRlevel2GridModel = () => {
  const url = 'http://localhost:8888';

  const [leftTableData, setLeftTableData] = useState();
  const [cdEmp, setCdEmp] = useState();
  const [mainTabData, setMainTabData] = useState();

  //leftTableData 가져오는 비동기 GET 요청
  useEffect(() => {
    axios
      .get(url + '/emp/getAll')
      .then((response) => {
        console.log('LRlevel2GridModel', response.data);

        const data = response.data.map((item) => ({
          사원코드: item.cdEmp,
          사원이름: item.nmKrname,
        }));
        setLeftTableData(data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, []);

  //
  useEffect(() => {
    axios
      .get(url + '/empAdd/getEmpAddByCdEmp', { cdEmp: cdEmp })
      .then((response) => {
        console.log('LRlevel2GridModel', response.data);
        const data = response.data.map((item) => ({
          영문성명: item.nmEnname,
          한자성명: item.nmChname,
          주민등록번호: item.noSocial,
          성별: item.fgSex,
          생년월일: item.daBirth,
          결혼여부: item.fgWedding,
          부서: item.cdDept,
          직급: item.rankNo,
          직무: item.cdOffduty,
          근로계약서: item.ynDrawcontracts,
          입사년월: item.daEnter,
          퇴사년월일: item.daRetire,
        }));
        setMainTabData(data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [cdEmp]);

  return {
    leftTableData: leftTableData,
    setLeftTableData,
    cdEmp: cdEmp,
    setCdEmp,
    mainTabData: mainTabData,
    setMainTabData,
  };
};

export default LRlevel2GridModel;
