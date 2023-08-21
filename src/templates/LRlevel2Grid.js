// 작성자 : 오승환
import { Col, Row } from 'react-bootstrap';
import DateTest from '../components/DateTest';
import MenuTab from '../components/MenuTab';
import RadioForm from '../components/RadioForm';
import SearchPanel from '../components/SearchPanel';
import TableForm from '../components/TableForm';
import TextBoxComponent from '../components/TextBoxComponent';
import LRlevel2GridModel from '../model/LRlevel2GridModel';

//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data

const url = 'http://localhost:8888';

const searchOption = [
  { key: 'incumbentAndRetiringOnThisYear', value: '재직자 + 당해년도 퇴사자' },
  { key: 'incumbent', value: '재직자' },
  { key: 'retiree', value: '퇴직자' },
];

const orderList = [
  { key: 'cdEmp', value: '코드순' },
  { key: 'nM', value: '이름순' },
];

const dummyData = [
  {
    code: 'A1234567',
    사원명: '오승환',
    '내/외': '내국인',
    주민번호: '910101-1234567',
    구분: '재직',
  },
  {
    code: 'B2345678',
    사원명: '이서연',
    '내/외': '외국인',
    주민번호: '920202-2345678',
    구분: '재직',
  },
  {
    code: 'C3456789',
    사원명: '현소현',
    '내/외': '내국인',
    주민번호: '930303-3456789',
    구분: '퇴직',
  },
  {
    code: 'D4567890',
    사원명: '김진',
    '내/외': '외국인',
    주민번호: '940404-4567890',
    구분: '재직',
  },
  {
    code: 'E5678901',
    사원명: '김이긴',
    '내/외': '내국인',
    주민번호: '950505-5678901',
    구분: '퇴직',
  },
];

const LRlevel2Grid = ({ grid, mainTab, subTab }) => {
  const { tableData } = LRlevel2GridModel();

  console.log('axios tableData : ', tableData);

  const menuList1 = ['기초정보', '인적정보'];
  const menuList2 = ['가족', '학력', '경력', '신체', '병역'];

  const genderRadioList = [
    { key: 'M', value: '남자' },
    { key: 'F', value: '여자' },
  ];

  const marryRadioList = [
    { key: 'true', value: '남자' },
    { key: 'false', value: '여자' },
  ];

  const contractRadioList = [
    { key: 'true', value: '작성' },
    { key: 'false', value: '미작성' },
  ];

  return (
    <>
      <SearchPanel searchOption={searchOption} orderList={orderList} />
      <Row>
        <Col md="3">
          {tableData ? ( // tableData가 준비되었을 때만 TableForm 컴포넌트 렌더링
            <TableForm
              showCheckbox={true}
              showHeaderArrow={true}
              tableData={tableData}
            />
          ) : (
            <div>Loading...</div> // 로딩 중일 때 표시할 내용
          )}
        </Col>
        <Col md="9">
          <MenuTab menuList={menuList1} />
          <Row className="mb-5">
            <Col xs md="6">
              <TextBoxComponent
                label="영문성명"
                placeholder="영문성명을 입력"
              />
            </Col>
            <Col xs md="6">
              <TextBoxComponent
                label="한자성명"
                placeholder="한자성명을 입력"
              />
            </Col>
            <Col xs md="6">
              <TextBoxComponent
                type="regNum"
                label="주민등록번호"
                disabled={true}
              />
            </Col>
            <Col xs md="6">
              <RadioForm label="성별" optionList={genderRadioList} />
            </Col>
            <Col xs md="6">
              <DateTest label="생년월일" />
            </Col>
            <Col xs md="6">
              <RadioForm label="결혼여부" optionList={marryRadioList} />
            </Col>
            <Col xs md="6">
              <TextBoxComponent label="부서" disabled={true} />
            </Col>
            <Col xs md="6">
              <TextBoxComponent label="직급" disabled={true} />
            </Col>
            <Col xs md="6">
              <TextBoxComponent label="직무" />
            </Col>
            <Col xs md="6">
              <RadioForm label={'근로계약서'} optionList={contractRadioList} />
            </Col>
            <Col xs md="6">
              <TextBoxComponent label="입사년월일" disabled={true} />
            </Col>
            <Col xs md="6">
              <TextBoxComponent label="퇴사년월일" disabled={true} />
            </Col>
          </Row>
          <MenuTab menuList={menuList2} />
          <TableForm
            showCheckbox={true}
            showHeaderArrow={true}
            tableData={dummyData}
          />
        </Col>
      </Row>
    </>
  );
};

export default LRlevel2Grid;
