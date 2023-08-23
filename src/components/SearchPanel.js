/* 작성자 : 현소현 */
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Accordion,
  Button,
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
      {children}
    </button>
  );
};

const SearchPanel = ({ children, onSearch, showAccordion = false }) => {
  return (
    <>
      <Row className="border my-2">
        {showAccordion ? (
          //더보기 +
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Row>
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
              </Accordion.Header>

              <Accordion.Body>
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
