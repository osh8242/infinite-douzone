// 작성자 : 오승환
import { Col, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import DateTest from '../components/DateTest';
import MenuTab from '../components/MenuTab';
import RadioForm from '../components/RadioForm';
import SearchPanel from '../components/SearchPanel';
import SelectForm from '../components/SelectForm';
import TableForm from '../components/TableForm';
import TextBoxComponent from '../components/TextBoxComponent';
import CommonConstant from '../model/CommonConstant';
import LRlevel2GridModel from '../model/LRlevel2GridModel';

//grid : 좌측 그리드의 테이블 데이터 grid.data
//mainTab : 메인탭의 입력폼 데이터 mainTab.menuList mainTab.data
//subTab : 서브탭의 입력폼 데이터 subTab.menuList subTab.data

const LRlevel2Grid = ({ grid, mainTab, subTab }) => {
  //Model로 관리되는 state들
  const {
    leftTableData,
    setLeftTableData,
    cdEmp,
    setCdEmp,
    mainTabData,
    setMainTabData,
    subTableData,
    setSubTableData,
  } = LRlevel2GridModel();

  //실행중에는 값이 고정인 Constant들
  const {
    searchOption, // 검색옵션 리스트
    orderList, // 정렬기준 리스트
    mainTabMenuList, //메인탭 메뉴리스트
    subTabMenuList, //서브탭 메뉴리스트
    genderRadioList, //성별
    marryRadioList, //결혼여부
    contractRadioList, //근로계약서 작성여부
    labels, // 속성명
  } = CommonConstant();

  const onSearch = () => {
    alert("검색버튼 눌러쪄용");
  }
  return (
    <>ㅇ
      {/* 조회영역 */}
      <SearchPanel onSearch={onSearch}>
        <Row>
          <Col>
            <SelectForm label={"구분"} optionList={optionList} />
          </Col>
          <Col>
            <SelectForm label={"정렬"} optionList={optionList} />
          </Col>
        </Row>
      </SearchPanel>

      <Row>
        <Col md="3">
          {
            leftTableData ? ( // tableData가 준비되었을 때만 TableForm 컴포넌트 렌더링
              <TableForm
                showCheckbox={true}
                showHeaderArrow={true}
                tableData={leftTableData}
                rowClickHandler={setCdEmp}
              />
            ) : (
              <Spinner animation="border" variant="primary" />
            )
            // 로딩 중일 때 표시할 내용
          }
        </Col>
        {mainTabData ? (
          <Col md="9">
            <MenuTab menuList={mainTabMenuList} />
            <Row className="mb-5">
              <Col xs md="6">
                <TextBoxComponent
                  label={labels.nmEnName}
                  value={mainTabData.nmEnName}
                />
              </Col>
              <Col xs md="6">
                <TextBoxComponent
                  label={labels.nmChName}
                  value={mainTabData.nmChName}
                />
              </Col>
              <Col xs md="6">
                <TextBoxComponent
                  type="regNum"
                  label={labels.noSocial}
                  disabled={true}
                  value={mainTabData.noSocial}
                />
              </Col>
              <Col xs md="6">
                <RadioForm
                  label={labels.fgSex}
                  optionList={genderRadioList}
                  checked={mainTabData.fgSex}
                />
              </Col>
              <Col xs md="6">
                <DateTest
                  label={labels.daBirth}
                  defaultValue={mainTabData.daBirth}
                />
              </Col>
              <Col xs md="6">
                <RadioForm
                  label={labels.fgWedding}
                  optionList={marryRadioList}
                  checked={mainTabData.fgWedding}
                />
              </Col>
              <Col xs md="6">
                <TextBoxComponent
                  label={labels.cdDept}
                  disabled={true}
                  value={mainTabData.cdDept}
                />
              </Col>
              <Col xs md="6">
                <TextBoxComponent
                  label={labels.rankNo}
                  disabled={true}
                  value={mainTabData.rankNo}
                />
              </Col>
              <Col xs md="6">
                <TextBoxComponent
                  label={labels.cdOffduty}
                  value={mainTabData.cdOffduty}
                />
              </Col>
              <Col xs md="6">
                <RadioForm
                  label={labels.ynDrawContracts}
                  optionList={contractRadioList}
                  checked={mainTabData.ynDrawContracts}
                />
              </Col>
              <Col xs md="6">
                <TextBoxComponent
                  label={labels.daEnter}
                  disabled={true}
                  value={mainTabData.daEnter}
                />
              </Col>
              <Col xs md="6">
                <TextBoxComponent
                  label={labels.daRetire}
                  disabled={true}
                  value={mainTabData.daRetire}
                />
              </Col>
            </Row>
            <MenuTab menuList={subTabMenuList} />
            <TableForm
              showCheckbox={true}
              showHeaderArrow={true}
              tableData={subTableData}
            />
          </Col>
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Row>
    </>
  );
};

export default LRlevel2Grid;
