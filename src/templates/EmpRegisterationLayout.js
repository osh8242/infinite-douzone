//작성자 김진
import { Col, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import TableForm from '../components/TableForm';
import MenuTab from '../components/MenuTab';
import TextBoxComponent from '../components/TextBoxComponent';
import DateForm from '../components/DateForm';
import SelectForm from '../components/SelectForm';
import AddressForm from '../components/AddressForm';
import '../styles/empRegisterationLayout.css';
import EmpRegisterationModel from '../model/EmpRegisterationModel';

function EmpRegisterationLayout() {
  //Model로 관리되는 state들
  const {
    cdEmp,
    setCdEmp,
    leftTableData,
    setLeftTableData,
    mainTableData,
    setMainTableData,
    subTableData,
    setSubTableData,
  } = EmpRegisterationModel();

  const [selectedMenu, setSelectedMenu] = useState(0);

  const menuList = ['기초자료', '가족사항'];

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
        <Col md="3" id="empRegisterLayoutLeft">
          {/* 좌측 사원목록 테이블 */}
          {leftTableData ? ( //tableData가 준비되었을 경우에만 TableForm 컴포넌트 렌더링
            <TableForm
              showCheckbox={true}
              tableData={leftTableData}
              rowClickHandler={setCdEmp}
            />
          ) : (
            <div>Loading...</div> //로딩중 화면 표시 내용
          )}
        </Col>
        <Col md="6" id="empRegisterLayoutRight">
          <Row id="empDataSortedMenuArea">
            <MenuTab menuList={menuList} />
            <div id="empDataSortedLine"></div>
          </Row>
          {/* 사원정보 편집 */}
          <Row id="baseData">
            {mainTableData ? (
              <div>
                <DateForm label={'입사일자'} value={mainTableData.daEnter} />
                <TextBoxComponent
                  label={'주민번호'}
                  value={mainTableData.noSocial}
                />
                <TextBoxComponent
                  label={'거주지국'}
                  value={mainTableData.addNation}
                />
                <TextBoxComponent
                  label={'국적'}
                  value={mainTableData.cdNation}
                />
                <AddressForm
                  label={'주소'}
                  isZonecode={true}
                  value={(mainTableData.addHome, mainTableData.addHome2)}
                />
                <TextBoxComponent
                  label={'전화번호'}
                  value={
                    mainTableData.telHome1 +
                    '-' +
                    mainTableData.telHome2 +
                    '-' +
                    mainTableData.telHome3
                  }
                />
                <TextBoxComponent
                  label={'모바일번호'}
                  value={
                    mainTableData.celEmp1 +
                    '-' +
                    mainTableData.celEmp2 +
                    '-' +
                    mainTableData.celEmp3
                  }
                />
                <TextBoxComponent
                  label={'이메일'}
                  value={mainTableData.emEmp}
                />
                <TextBoxComponent
                  label={'메신저ID'}
                  value={mainTableData.idMsn}
                />
                <TextBoxComponent label={'부서'} value={mainTableData.cdDept} />
                <TextBoxComponent
                  label={'직종'}
                  value={mainTableData.cdOccup}
                />
                <TextBoxComponent label={'직급'} value={mainTableData.rankNo} />
                <TextBoxComponent
                  label={'호봉'}
                  value={mainTableData.cdSalcls}
                />
                <TextBoxComponent
                  label={'현장'}
                  value={mainTableData.cdField}
                />
                <TextBoxComponent
                  label={'프로젝트'}
                  value={mainTableData.cdProject}
                />
                <DateForm label={'퇴사일자'} value={mainTableData.daRetire} />
                <TextBoxComponent
                  label={'급여이체은행'}
                  value={mainTableData.cdBank}
                />
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </Row>
          <Row id="familyData">
            {subTableData ? (
              <TableForm showCheckbox={true} tableData={subTableData} />
            ) : (
              <div>Loading...</div>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default EmpRegisterationLayout;
