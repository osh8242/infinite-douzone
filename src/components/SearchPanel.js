import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef } from "react";
import { Accordion, Button, Col, Row } from "react-bootstrap";
import "../styles/SearchPanel.scss"; // SCSS 파일 불러오기

const SearchPanel = ({
  children,
  onSearch,
  showAccordion = false,
  hideButton = false,
}) => {
  const [isBodyOpen, setIsBodyOpen] = useState(false);
  const toggleButtonRef = useRef(null); // ref 생성

  const handleToggleBody = () => {
    setIsBodyOpen(!isBodyOpen);
  };

  // 화살표 아이콘을 클릭하여 상태 변경하는 함수
  const toggleArrowIcon = () => {
    toggleButtonRef.current.click(); // ref를 사용하여 버튼 클릭 이벤트 호출
  };

  return (
    <>
      <Row className="mt-3">
        {showAccordion ? (
          <div className="search-panel border rounded px-5">
            <div className="header d-flex flex-row px-5">
              {/* 귀속연월/조회구분/작성일자 */}
              <Col className="my-1">{children[0]}</Col>
              {/* 조회버튼 */}
              <Col
                className="d-flex align-items-center justify-content-center"
                md={{ span: 1, offset: 1 }}
              >
                {isBodyOpen ? (
                  <Button variant="secondary" onClick={toggleArrowIcon}>
                    <FontAwesomeIcon icon={faCaretUp} />
                  </Button>
                ) : (
                  <>
                    <Button variant="secondary" onClick={onSearch}>
                      조회
                    </Button>
                    <Button variant="secondary" onClick={toggleArrowIcon}>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </Button>
                  </>
                )}
                <Button
                  ref={toggleButtonRef} // ref 할당
                  variant="secondary"
                  onClick={handleToggleBody}
                  style={{ display: "none" }} // 숨겨진 버튼
                />
              </Col>
            </div>
            {isBodyOpen && (
              <div className={`px-5 ${isBodyOpen ? "visible" : "hidden"}`}>
                {/* {isBodyOpen && ( */}
                <Row>
                  {children[1]}
                  <div
                    className="d-flex justify-content-md-center"
                    style={{ marginTop: "12px" }}
                  >
                    <Button variant="secondary" onClick={onSearch}>
                      조회
                    </Button>
                  </div>
                </Row>
                {/* )} */}
              </div>
            )}
          </div>
        ) : (
          <div className="search-panel">
            <Row>
              <Col className="my-1" md="8">
                {children}
              </Col>
              <Col
                className="d-flex align-items-center justify-content-center"
                md={{ span: 2, offset: 2 }}
              >
                {!hideButton && (
                  <Button variant="secondary" onClick={onSearch}>
                    조회
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        )}
      </Row>
    </>
  );
};

export default SearchPanel;
