import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';

const LRlevel2GridModel = () => {
  const url = 'http://localhost:8888';

  const [tableData, setTableData] = useState([]);
  const [cdEmp, setCdEmp] = useState();

  useEffect(() => {
    axios
      .get(url + '/emp/getAll')
      .then((response) => {
        console.log('LRlevel2GridModel', response.data);

        const data = response.data.map((item) => ({
          사원코드: item.cdEmp,
          사원이름: item.nmKrname,
        }));
        setTableData(data);
      })
      .catch((error) => {
        console.error('에러발생: ', error);
        // 필요에 따라 다른 오류 처리 로직 추가
      });
  }, []);

  return { tableData: tableData };
};

export default LRlevel2GridModel;
