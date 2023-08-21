import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';

const LRlevel2GridModel = () => {
  const url = 'http://localhost:8888';

  const [leftTableData, setLeftTableData] = useState();
  const [cdEmp, setCdEmp] = useState('hong');
  const [mainTabData, setMainTabData] = useState();

  console.log('mainTabData', mainTabData);

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
    console.log('cdEmp', cdEmp);
    axios
      .post(
        url + '/empAdd/getEmpAddByCdEmp',
        { cdEmp: cdEmp },
        { 'Content-Type': 'application/json' },
      )
      .then((response) => {
        console.log('LRlevel2GridModel', response.data);
        const data = response.data.map((item) => ({
          nmEnname: item.nmEnname,
          nmChname: item.nmChname,
          noSocial: item.noSocial,
          fgSex: item.fgSex,
          daBirth: item.daBirth,
          fgWedding: item.fgWedding,
          cdDept: item.cdDept,
          rankNo: item.rankNo,
          cdOffduty: item.cdOffduty,
          ynDrawcontracts: item.ynDrawcontracts,
          daEnter: item.daEnter,
          daRetire: item.daRetire,
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
