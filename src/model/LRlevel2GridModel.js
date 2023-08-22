import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';

const LRlevel2GridModel = () => {
  const url = 'http://localhost:8888';

  const [leftTableData, setLeftTableData] = useState();
  const [cdEmp, setCdEmp] = useState('hong');
  const [mainTabData, setMainTabData] = useState();
  const [subTableData, setSubTableData] = useState();

  console.log('mainTabData', mainTabData);

  //leftTableData 가져오는 비동기 GET 요청
  useEffect(() => {
    axios
      .get(url + '/emp/getAll')
      .then((response) => {
        console.log('LRlevel2GridModel > /emp/getAll', response.data);
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

  //mainTabData 가져오는 비동기 post 요청
  useEffect(() => {
    console.log(
      'LRlevel2GridModel > /empAdd/getEmpAddByCdEmp',
      'cdEmp : ',
      cdEmp,
    );
    setMainTabData();
    axios
      .post(
        url + '/empAdd/getEmpAddByCdEmp',
        { cdEmp: cdEmp },
        { 'Content-Type': 'application/json' },
      )
      .then((response) => {
        console.log(
          'LRlevel2GridModel > /empAdd/getEmpAddByCdEmp',
          response.data,
        );
        setMainTabData(response.data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, [cdEmp]);

  //subTableData 가져오는 비동기 post 요청
  useEffect(() => {
    setSubTableData();
    axios
      .post(url + '/empFam/getEmpFamListByCdEmp', { cdEmp: cdEmp })
      .then((response) => {
        console.log(
          'LRlevel2GridModel > /empFam/getEmpFamListByCdEmp',
          response.data,
        );
        const data = response.data.map((item) => {
          return {
            관계: item.cdFamrel,
            성명: item.nmKrname,
            내국인: item.ynFor,
            주민등록번호: item.noSocial,
            학력: item.fgSchool,
            졸업구분: item.fgGraduation,
            동거: item.ynTogether,
            양음: item.ynLunarbir,
            생년월일: item.daBirth,
            직업: item.cdJob,
            직장명: item.nmKrcom,
            직급: item.cdOffpos,
          };
        });
        setSubTableData(data);
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
    subTableData: subTableData,
    setSubTableData,
  };
};

export default LRlevel2GridModel;
