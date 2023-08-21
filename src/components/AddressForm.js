import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import Post from "./Post";

const AddressForm = ({ label, isZonecode }) => {
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");

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
      <Row className="pt-3">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div>우편번호</div>
        </Col>
        {/* 우편번호 */}
        {isZonecode && (
          <Col
            md="2"
            className="d-flex align-items-center justify-content-center"
          >
            <div>
              <Form.Control
                type="text"
                name="zonecode"
                value={zonecode}
                size={5}
                disabled
              />
            </div>
          </Col>
        )}
        <Col md="2">
          {/* 버튼 클릭 시 Post 모달 호출 */}
          <Button
            variant="secondary"
            onClick={() => setModalState({ ...modalState, show: true })}
          >
            주소검색
          </Button>
        </Col>
      </Row>
      <Row className="py-2">
        <Col
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div>주소</div>
        </Col>
        {/* 주소 */}
        <Col md="4">
          <div>
            <Form.Control type="text" name="address" value={address} disabled />
          </div>
        </Col>
        <Col md="6">
          <div>
            <Form.Control
              type="text"
              name="address-detail"
              placeholder="상세주소 입력"
            />
          </div>
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

export default AddressForm;
