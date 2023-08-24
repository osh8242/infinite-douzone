/* 작성자 : 현소현 */
import {  Accordion, Button, Col, Row,} from 'react-bootstrap';

const SearchPanel = ({ children, onSearch, showAccordion = false }) => {
  
  return (
    <>
      <Row>
        {showAccordion ? (
          //더보기 +
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
            
                  <Col className="my-1" md="8">
                    {children[0]} {/* 기본 검색조건 */}
                  </Col>
                  <Col
                    className="d-flex align-items-center justify-content-center"
                    md={{ span: 2, offset: 2 }}
                  >
                    <Button variant="secondary" onClick={onSearch}>
                      조회
                    </Button>
                  </Col>
              
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  {children[1]} {/* 상세 검색조건 */}
                </Row>
                {/* <Row>
                  <Col className="d-flex justify-content-md-center">
                    <Button variant="secondary" onClick={onSearch}>
                      조회
                    </Button>
                  </Col>
                </Row> */}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ) : (
          //더보기 없음
          <Row>
            <Col className="my-1" md="8">
              {children} {/* 기본 검색조건 */}
            </Col>
            <Col
              className="d-flex align-items-center justify-content-center"
              md={{ span: 2, offset: 2 }}
            >
              <Button variant="secondary" onClick={onSearch}>
                조회
              </Button>
            </Col>
          </Row>
        )}
      </Row>
    </>
  );
};

export default SearchPanel;

