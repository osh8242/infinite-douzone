/* 작성자 : 현소현 */

import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Accordion,
  Button,
  Card,
  Col,
  Row,
  useAccordionButton,
} from 'react-bootstrap';

const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <button type="button" onClick={decoratedOnClick}>
      {' '}
      {children}{' '}
    </button>
  );
};

const SearchPanel = ({ children, onSearch, showAccordion = false }) => {
  return (
    <>
      <Row>
        {showAccordion ? (
          //더보기 +
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Row className="border my-3 mx-1">
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
                    <CustomToggle eventKey="0">
                      <Button variant="light">
                        <FontAwesomeIcon icon={faArrowDown} />
                      </Button>
                    </CustomToggle>
                  </Col>
                </Row>
              </Card.Header>

              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Row className="border my-3 mx-1">
                    {children[1]} {/* 상세 검색조건 */}
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-md-center">
                      <Button variant="secondary" onClick={onSearch}>
                        조회
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ) : (
          //더보기 없음
          <Card>
            <Card.Header>
              <Row className="border my-3 mx-1">
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
            </Card.Header>
          </Card>
        )}
      </Row>
    </>
  );
};

export default SearchPanel;
