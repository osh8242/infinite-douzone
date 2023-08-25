import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';

function EmpRegisterationModel() {
  const url = 'http://localhost:8888';

  const [cdEmp, setCdEmp] = useState();
  const [leftTableData, setLeftTableData] = useState();
  const [mainTableData, setMainTableData] = useState();
  const [subTableData, setSubTableData] = useState();

  //leftTableData 가져오는 비동기 GET 요청 (사원정보)
  useEffect(() => {
    axios
      .get(url + '/emp/getAll')
      .then((response) => {
        console.log(
          'EmpRegisterationModel > /emp/getAllEmpAdd => ',
          response.data,
        );
        const data = response.data.map((item) => ({
          code: item.cdEmp,
          사원명: item.nmKrname,
          내외국인: item.ynFor,
          주민번호: item.noSocial,
          구분: item.jobOk,
        }));
        setLeftTableData(data);
      })
      .catch((error) => {
        console.log('에러발생: ', error);
        //에러 처리
      });
  }, []);

  //mainTabData 가져오는 비동기 POST 요청 (사원의 기초자료 정보)
  useEffect(() => {
    console.log(
      'EmpREgisterationModel > /emp/getEmpByCdEmp',
      'cdEmp : ',
      cdEmp,
    );
    axios
      .post(
        url + '/emp/getEmpByCdEmp',
        { cdEmp: cdEmp },
        { ContentType: 'application/json' },
      )
      .then((response) => {
        console.log(
          'EmpRegisterationModel > /emp/getEmpByCdEmp',
          response.data,
        );
        setMainTableData(response.data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
      });
  }, [cdEmp]);

  //subTableData 가져오는 비동기 POST 요청 (사원의 가족사항 정보)
  useEffect(() => {
    console.log(
      'EmpRegisterationModel > /empFam/getListEmpFamByCdEmp',
      'cdEmp : ',
      cdEmp,
    );
    axios
      .post(
        url + '/empFam/getListEmpFamByCdEmp',
        { cdEmp: cdEmp },
        { ContentType: 'application/json' },
      )
      .then((response) => {
        console.log(
          'EmpRegisterationModel > /empFam/getListEmpFamByCdEmp => ',
          response.data,
        );
        const data = response.data.map((item) => ({
          연말정산관계: item.cdCalrel,
          성명: item.nmKrname,
          내외국민: item.ynFor,
          주민번호: item.noSocial,
          위탁자관계: item.cdFamrel,
        }));
        setSubTableData(data);
      })
      .catch((error) => {
        console.log('에러발생: ', error);
        //에러처리
      });
  }, [cdEmp]);

  return {
    cdEmp: cdEmp,
    setCdEmp,
    leftTableData: leftTableData,
    setLeftTableData,
    mainTableData: mainTableData,
    setMainTableData,
    subTableData: subTableData,
    setSubTableData,
  };
}

export default EmpRegisterationModel;
