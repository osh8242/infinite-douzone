import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';

const SwsmModel = () => {
  const url = 'http://localhost:8888';

  const [leftTableData, setLeftTableData] = useState();
  const [cdEmp, setCdEmp] = useState('hong');
  const [mainTabData, setMainTabData] = useState();

  //leftTableData 가져오는 비동기 GET 요청
  useEffect(() => {
    axios
      .get(url + '/emp/getAll')
      .then((response) => {
        console.log('SwsmModel > /emp/getAll', response.data);

        const data = response.data.map((item) => ({
          Code: item.cdEmp,
          성명: item.nmKrname,
          주민등록번호: item.noSocial,
        }));

        setLeftTableData(data);
      })
      .catch((error) => {
        console.error('에러 : ', error);
      });
  }, []);

  useEffect(() => {
    console.log('SwsmModel > /swsm/getSwsmByEmpCode', 'cdEmp : ', cdEmp);
    axios
      .post(
        url + '/swsm/getSwsmByEmpCode',
        { empCode: cdEmp },
        { 'Content-Type': 'application/json' },
      )
      .then((response) => {
        console.log('==============================================');
        console.log('SwsmModel > /swsm/getSwsmByEmpCode', response.data);
        setMainTabData(response.data);
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

export default SwsmModel;
