import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import Post from "./Post";
import "../styles/addressForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const TempAdd = (props) => {
  const { label, isZonecode, value, value2, size, mb, md = 4 } = props;
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setAddress(props.value);
  }, [value]);

  // 선택된 주소를 주소 필드에 업데이트
  const handleAddressSelected = ({ address, zonecode }) => {
    setAddress(address);
    setZonecode(zonecode);
    setModalState({ ...modalState, show: false });
  };

  const [modalState, setModalState] = useState({
    show: false,
    props: {},
  });

  return (
    <>
      <Row className="py-1">
        <Col
          md={md}
          className="d-flex align-items-center justify-content-center"
        >
          <div>{label}</div>
        </Col>
        <Col md="8" id="fullAddressArea">
          {/* 우편번호 */}
          {isZonecode && (
            <Form.Control
              id="zoneCodeArea"
              type="text"
              name="zonecode"
              value={zonecode}
              size={size}
            />
          )}

          <Row className={mb ? "mb-4" : ""}>
            {/* 주소 */}
            <Col md="10">
              <Form.Control
                id="addressArea"
                type="text"
                name="address"
                value={value}
                size={size}
              />
            </Col>

            {/* 버튼 클릭 시 Post 모달 호출 */}
            <Col md="1">
              <Button
                id="addressSearchBtn"
                variant="secondary"
                onClick={() => setModalState({ ...modalState, show: true })}
              >
                <FontAwesomeIcon icon={faSearch} size={"lg"} color={""} />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 상세주소 */}
      <Row className="py-1">
        <Col
          md={md}
          className="d-flex align-items-center justify-content-center"
        >
          <div>상세주소</div>
        </Col>
        <Col md="8">
          <Form.Control
            type="text"
            name="address-detail"
            size={size}
            value={value2}
          />
        </Col>
      </Row>

      <ModalComponent
        size="lg"
        show={modalState.show}
        onHide={() => setModalState({ ...modalState, show: false })}
        {...modalState.props}
      >
        <Post onAddressSelected={handleAddressSelected} />
      </ModalComponent>
    </>
  );
};

export default TempAdd;
