//작성자 김진
import { Col, Row } from 'react-bootstrap';
import React from 'react';
import TableForm from '../components/TableForm';
import MenuTab from '../components/MenuTab';
import TextBoxComponent from '../components/TextBoxComponent';
import DateForm from '../components/DateForm';
import SelectForm from '../components/SelectForm';
import AddressForm from '../components/AddressForm';
import '../styles/empRegisterationLayout.css';
import EmpRegisterationModel from '../model/EmpRegisterationModel';

function EmpRegisterationLayout() {
  const allListEmp = EmpRegisterationModel();
  const menuList = ['기초자료', '가족사항'];

  console.log('allListEmp => ', allListEmp);
  console.log('allListEmp[0] => ', allListEmp[0]);
  console.log('allListEmp[1] => ', allListEmp[1]);

  const tableData = [
    { column: 'data1', column2: 'data12', column3: 'data123' },
    { column: 'data2', column2: 'data22', column3: 'data223' },
    { column: 'data3', column2: 'data32', column3: 'data323' },
    { column: 'data3', column2: 'data32', column3: 'data323' },
    { column: 'data3', column2: 'data32', column3: 'data323' },
    { column: 'data3', column2: 'data32', column3: 'data323' },
    { column: 'data3', column2: 'data32', column3: 'data323' },
    { column: 'data3', column2: 'data32', column3: 'data323' },
    { column: 'data3', column2: 'data32', column3: 'data323' },
    { column: 'data3', column2: 'data32', column3: 'data323' },
    { column: 'data3', column2: 'data32', column3: 'data323' },
    { column: 'data3', column2: 'data32', column3: 'data323' },
    { column: 'data3', column2: 'data32', column3: 'data323' },
  ];

  const genderList = [
    { key: '0', value: '0.남성' },
    { key: '1', value: '1.여성' },
  ];

  const residentList = [
    { key: '0', value: '0.거주' },
    { key: '1', value: '1.미거주' },
  ];

  return (
    <>
      <Row id="empRegisterLayout">
        <Col>
          {/* 좌측 사원목록 테이블 */}
          <TableForm showCheckbox={true} tableData={tableData} />
        </Col>
        <Col>
          <Row id="empDataSortedMenuArea">
            <MenuTab menuList={menuList} />
            <div id="empDataSortedLine"></div>
          </Row>
          {/* 사원정보 편집 */}
          <Row id="baseData">
            <DateForm label={'입사일자'} />
            <TextBoxComponent label={'주민번호'} type={'text'} />
            <SelectForm label={'거주지국'} optionList={residentList} />
            <SelectForm label={'국적'} optionList={residentList} />
            <AddressForm label={'주소'} isZonecode={true} />
            <TextBoxComponent label={'전화번호'} type={'text'} />
            <TextBoxComponent label={'모바일번호'} type={'text'} />
            <TextBoxComponent label={'이메일'} type={'text'} />
            <TextBoxComponent label={'메신저ID'} type={'text'} />
            <SelectForm label={'부서'} optionList={genderList} />
            <SelectForm label={'직종'} optionList={genderList} />
            <SelectForm label={'직급'} optionList={genderList} />
            <SelectForm label={'호봉'} optionList={genderList} />
            <TextBoxComponent label={'현장'} type={'text'} />
            <TextBoxComponent label={'프로젝트'} type={'text'} />
            <DateForm label={'퇴사일자'} />
            <TextBoxComponent label={'급여이체은행'} type={'text'} />
          </Row>
          <Row id="familyData">
            <TableForm showCheckbox={true} tableData={tableData} />
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default EmpRegisterationLayout;
