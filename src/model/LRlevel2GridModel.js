import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';
import CommonConstant from './CommonConstant';

const LRlevel2GridModel = () => {
  const url = 'http://localhost:8888';
  const { labels } = CommonConstant();
  const [reloadTrigger, setReloadTrigger] = useState(false); //state 값들을 다시 로드하기 위한 parameter
  const [cdEmp, setCdEmp] = useState('hong'); // 초기값 : 로그인한 유저의 사원코드 cdEmp
  const [jobOk, setJobOk] = useState('Y'); //재직여부
  const [refYear, setRefYear] = useState(new Date().getFullYear()); // 귀속년도
  const [orderRef, setOrderRef] = useState('cdEmp'); //사원코드
  const [leftTableData, setLeftTableData] = useState();
  const [mainTabData, setMainTabData] = useState();
  const [subTableData, setSubTableData] = useState();

  //leftTableData 가져오는 비동기 GET 요청
  useEffect(() => {
    setLeftTableData();
    const postData = {
      jobOk: jobOk,
      ...(refYear && { daRetire: refYear }),
    };
    axios
      .post(
        `${url}/emp/getEmpListByJobOk${
          orderRef ? '?orderRef=' + orderRef : ''
        }`,
        postData,
      )
      .then((response) => {
        console.log(
          'LRlevel2GridModel > /emp/getEmpListByJobOk',
          response.data,
        );
        const data = response.data.map((item) => ({
          [labels.cdEmp]: item.cdEmp,
          [labels.nmKrname]: item.nmKrname,
        }));
        setLeftTableData(data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobOk, refYear, orderRef, reloadTrigger]);

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
  }, [cdEmp, reloadTrigger]);

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
            [labels.cdFamrel]: item.cdFamrel,
            [labels.nmKrname]: item.nmKrname,
            [labels.ynFor]: item.ynFor,
            [labels.noSocial]: item.noSocial,
            [labels.fgSchool]: item.fgSchool,
            [labels.fgGraduation]: item.fgGraduation,
            [labels.ynTogether]: item.ynTogether,
            [labels.ynLunarbir]: item.ynLunarbir,
            [labels.daBirth]: item.daBirth,
            [labels.cdJob]: item.cdJob,
            [labels.nmKrcom]: item.nmKrcom,
            [labels.cdOffpos]: item.cdOffpos,
          };
        });
        setSubTableData(data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cdEmp, reloadTrigger]);

  //모든 state 데이터를 다시 로드함
  const reloadStates = () => setReloadTrigger(!reloadTrigger);

  return {
    leftTableData: leftTableData,
    setLeftTableData,
    cdEmp: cdEmp,
    setCdEmp,
    mainTabData: mainTabData,
    setMainTabData,
    subTableData: subTableData,
    setSubTableData,
    jobOk: jobOk,
    setJobOk,
    refYear: refYear,
    setRefYear,
    orderRef: orderRef,
    setOrderRef,
    reloadStates,
  };
};

export default LRlevel2GridModel;
