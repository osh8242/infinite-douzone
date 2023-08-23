import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ModalComponent from './ModalComponent';
import Post from './Post';
import '../styles/addressForm.css';

const AddressForm = ({ isZonecode }) => {
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');

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
          md="4"
          className="d-flex align-items-center justify-content-center"
        >
          <div>주소</div>
        </Col>
        <Col md="8" id="fullAddressArea">
          {/* 우편번호 */}
          {isZonecode && (
            <Form.Control
              id="zoneCodeArea"
              type="text"
              name="zonecode"
              value={zonecode}
              // size={5}
              disabled
            />
          )}

          {/* 주소 */}
          <Form.Control
            id="addressArea"
            type="text"
            name="address"
            value={address}
            disabled
          />

          {/* 버튼 클릭 시 Post 모달 호출 */}
          <Button
            id="addressSearchBtn"
            variant="secondary"
            onClick={() => setModalState({ ...modalState, show: true })}
          >
            검색
          </Button>
        </Col>
      </Row>
      {/* 상세주소 */}
      <Row className="py-1">
        <Col
          md="4"
          className="d-flex align-items-center justify-content-center"
        >
          <div>상세주소</div>
        </Col>
        <Col md="8">
          <Form.Control type="text" name="address-detail" />
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
