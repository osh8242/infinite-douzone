import React from 'react';
import SwsmModel from '../model/SwsmModel';
import TableForm from '../components/TableForm';
import DateTest from '../components/DateTest';
import SearchPanel from '../components/SearchPanel';
import MenuTab from '../components/MenuTab';
import { Col, Row } from 'react-bootstrap';
import SelectForm from '../components/SelectForm';
import { Scrollbars } from 'react-custom-scrollbars';
import TextBoxComponent from '../components/TextBoxComponent';

const searchChild = [
  { key: 'opt1', value: '1. 사원등록' },
  { key: 'opt2', value: '2. 일용직 사원등록' },
];

const menuList = ['계약서 작성', '계약서 조회'];
const menuList1 = ['근로정보'];
const menuList2 = ['기타급여'];

const tableDummyData2 = [
  {
    항목: '',
    금액: '',
  },
];

// 임금유형
const optionList = [
  { key: 'ename', value: '1.월급' },
  { key: 'ecode', value: '2.주급' },
];
// 기타급여
const optionList2 = [
  { key: 'otherBenefits', value: '0.여' },
  { key: 'otherBenefits', value: '1.부' },
];
// 상여금
const optionList3 = [
  { key: 'otherBenefits', value: '0.여' },
  { key: 'otherBenefits', value: '1.부' },
];
// 임금지급일
const optionList4 = [
  { key: 'otherBenefits', value: '1.매월' },
  { key: 'otherBenefits', value: '2.매주' },
  { key: 'otherBenefits', value: '3.매일' },
];
// 지급방법
const optionList5 = [
  { key: 'otherBenefits', value: '1.예금통장에 입금' },
  { key: 'otherBenefits', value: '2.직접지급' },
];
// 고용보험// 산재보험// 국민연금// 건강보험
const optionList6 = [
  { key: 'otherBenefits', value: '0.여' },
  { key: 'otherBenefits', value: '1.부' },
];

// const optionList7 = [
//   { key: 'otherBenefits', value: '0.여' },
//   { key: 'otherBenefits', value: '1.부' },
// ];

// const optionList8 = [
//   { key: 'otherBenefits', value: '0.여' },
//   { key: 'otherBenefits', value: '1.부' },
// ];

// const optionList9 = [
//   { key: 'otherBenefits', value: '0.여' },
//   { key: 'otherBenefits', value: '1.부' },
// ];

const SwsmGrid = () => {
  const {
    leftTableData,
    setLeftTableData,
    cdEmp,
    setCdEmp,
    mainTabData,
    setMainTabData,
  } = SwsmModel();

  console.log('test' + leftTableData);
  return (
    <>
      <Row>
        <MenuTab menuList={menuList} />
        <SearchPanel>
          <Row>
            <Col md="4">
              <DateTest label={'작성년월'} />
            </Col>
            <Col md="4">
              <SelectForm label={'소득구분'} optionList={searchChild} />
            </Col>
          </Row>
        </SearchPanel>
        <Row>
          <Col md="3">
            {leftTableData ? (
              <TableForm
                showCheckbox={true}
                showHeaderArrow={false}
                tableData={leftTableData}
                rowClickHandler={setCdEmp}
              />
            ) : (
              <div>Loading...</div> // 로딩 중일 때 표시할 내용
            )}
          </Col>
          <Col md="9">
            <MenuTab menuList={menuList1} />
            <Scrollbars style={{ height: 400, overflow: 'hidden' }}>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <DateTest label="근로계약기간" />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TextBoxComponent label={'업무의내용'} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TextBoxComponent label={'소정근로시간'} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TextBoxComponent label={'휴게시간'} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TextBoxComponent label={'근무일'} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <TextBoxComponent label={'주휴일'} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="임금유형" optionList={optionList} />
                  {/* 한 라인 안에 들어가게 변경 필요 */}
                  {/* <TextBoxComponent />원 */}
                </Col>
              </Row>{' '}
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="기타급여" optionList={optionList2} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="상여금" optionList={optionList3} />
                  {/* 한 라인 안에 들어가게 변경 필요 */}
                  {/* <TextBoxComponent />원 */}
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="임금지급일" optionList={optionList4} />
                  {/* 한 라인 안에 들어가게 변경 필요 */}
                  {/* <TextBoxComponent />원 */}
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="지급방법" optionList={optionList5} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="고용보험" optionList={optionList6} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="산재보험" optionList={optionList6} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <SelectForm label="건강보험" optionList={optionList6} />
                </Col>
              </Row>
              <Row>
                <Col xs md={{ span: 5, offset: 1 }}>
                  <DateTest label="작성일자" />
                </Col>
              </Row>
            </Scrollbars>
            <MenuTab menuList={menuList2} />
            <TableForm
              showCheckbox={true}
              showHeaderArrow={false}
              tableData={tableDummyData2}
            />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default SwsmGrid;
