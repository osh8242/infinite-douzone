// 작성자: 김진
// 사원등록 페이지 전용 레이아웃

import { Col, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import TableForm from '../components/TableForm';
import MenuTab from '../components/MenuTab';
import TextBoxComponent from '../components/TextBoxComponent';
import DateForm from '../components/DateForm';
import AddressForm from '../components/AddressForm';
import '../styles/empRegisterationLayout.css';
import EmpRegisterationModel from '../model/EmpRegisterationModel';
import CommonConstant from '../model/CommonConstant';
import CallNumberForm from '../components/CallNumberForm';
import NoSocialFormForEmpRegister from '../components/NoSocialFormForEmpRegister';
import EmailForm from '../components/EmailForm';
import DateTest from '../components/DateTest';

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

  //고정된 값을 가지는 state들
  const {
    labels,
    mainTabMenuListForEmpRegister,
    ynForList,
    genderRadioList,
    emailList,
  } = CommonConstant();

  // 메뉴 탭 전환 기능 추후 수정 예정
  // const [selectedMenu, setSelectedMenu] = useState(0);

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
            <MenuTab menuList={mainTabMenuListForEmpRegister} />
            <div id="empDataSortedLine"></div>
          </Row>
          {/* 사원정보 편집 */}
          <Row id="baseData">
            {mainTableData ? (
              <div id="baseDataContents">
                <div id="baseDataContentsBackground"></div>
                <DateTest
                  label={labels.daEnterForEmpRegister}
                  defaultValue={mainTableData.daEnter}
                />
                <NoSocialFormForEmpRegister
                  label={labels.noSocial}
                  optionList1={ynForList}
                  optionList2={genderRadioList}
                  value={mainTableData.noSocial}
                />
                <TextBoxComponent
                  label={labels.addNation}
                  value={mainTableData.abbNation}
                />
                <TextBoxComponent
                  label={labels.cdNation}
                  value={mainTableData.cdNation}
                />
                <AddressForm
                  isZonecode={true}
                  zipHomeData={
                    mainTableData.zipHome ? mainTableData.zipHome : null
                  }
                  addHome1Data={
                    mainTableData.addHome1 ? mainTableData.addHome1 : null
                  }
                  addHome2Data={
                    mainTableData.addHome2 ? mainTableData.addHome2 : null
                  }
                />
                <CallNumberForm
                  label={labels.telHome}
                  value1={mainTableData.telHome1}
                  value2={mainTableData.telHome2}
                  value3={mainTableData.telHome3}
                />
                <CallNumberForm
                  label={labels.calEmp}
                  value1={mainTableData.celEmp1}
                  value2={mainTableData.celEmp2}
                  value3={mainTableData.celEmp3}
                />
                <EmailForm
                  label={labels.emEmp}
                  value={mainTableData.emEmp}
                  optionList={emailList}
                />
                <TextBoxComponent
                  label={labels.idMsn}
                  value={mainTableData.idMsn}
                />
                <TextBoxComponent
                  label={labels.cdDept}
                  value={mainTableData.cdDept}
                />
                <TextBoxComponent
                  label={labels.cdOccup}
                  value={mainTableData.cdOccup}
                />
                <TextBoxComponent
                  label={labels.cdOffpos}
                  value={mainTableData.rankNo}
                />
                <TextBoxComponent
                  label={labels.cdSalcls}
                  value={mainTableData.cdSalcls}
                />
                <TextBoxComponent
                  label={labels.cdField}
                  value={mainTableData.cdField}
                />
                <TextBoxComponent
                  label={labels.cdProject}
                  value={mainTableData.cdProject}
                />
                {mainTableData.daRetire ? (
                  <DateForm
                    label={labels.daRetire}
                    value={mainTableData.daRetire}
                  />
                ) : (
                  <TextBoxComponent
                    label={labels.daRetire}
                    placeholder={'----년 --월 --일'}
                    disabled={'disabled'}
                  />
                )}
                <CallNumberForm
                  label={labels.cdBank}
                  value1={mainTableData.cdBank}
                  value2={mainTableData.noBnkacct}
                  value3={mainTableData.nmKrname}
                />
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </Row>
          <div style={{ display: 'none' }}>
            <Row id="familyData">
              {subTableData ? (
                <TableForm showCheckbox={true} tableData={subTableData} />
              ) : (
                <div>Loading...</div>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default EmpRegisterationLayout;
