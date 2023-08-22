import React, { useCallback, useEffect, useReducer } from 'react';
import axios from '../../node_modules/axios/index';

const reducerEmp = (emp, action) => {
  switch (action.type) {
    case 'ALL_LIST_EMP':
      return action.emp;
    default:
      return emp;
  }
};
function EmpRegisterationModel() {
  const [emp, dispatch] = useReducer(reducerEmp, []);

  useEffect(() => {
    console.log('useEffect !!');
    getAllEmp();
  }, []);

  const getAllEmp = useCallback(() => {
    axios.get('http://localhost:8888/emp/getAll').then((response) => {
      console.log('response.data => ', response.data);
      dispatch({
        type: 'ALL_LIST_EMP',
        emp: response.data,
      });
    });
  });

  return { emp };
}

export default EmpRegisterationModel;
