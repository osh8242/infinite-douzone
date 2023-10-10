import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
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
          <div style={{padding:'13px'}}>
            <div className="header d-flex flex-row px-5">
              <Col className="my-1">{children[0]}</Col>
              <Col
                className="d-flex align-items-center justify-content-center"
                md={{ span: 1, offset: 1 }}
              >
                {/* 조회버튼 */}
                {isBodyOpen ? (
                  <>
                  <Button variant="secondary" onClick={onSearch}>
                    조회
                  </Button>
                  <Button variant="secondary" onClick={toggleArrowIcon}>
                    <FontAwesomeIcon icon={faCaretUp} />
                  </Button>
                  </>
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
              <div style={{marginLeft:'30px'}}>
                <div className={`px-5 ${isBodyOpen ? "visible" : "hidden"}`}>
                  <Row>
                    <Col className="my-1">{children[1]}</Col>
                  </Row>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="my-1 col">
            <Row>
              <Col className="my-1" md="8">
                {children}
              </Col>
              <Col
                className="d-flex align-items-center justify-content-center"
                md={{ span: 2, offset: 2 }}
              >
                {!hideButton && (
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.target.blur();
                      onSearch(e);
                    }}
                  >
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
