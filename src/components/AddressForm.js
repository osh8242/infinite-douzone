import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
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
      <Row>
        <Col>
          <div>{label}</div>
        </Col>
        {/* 우편번호 */}
        {isZonecode && (
          <Col>
            <div>
              <input
                type="text"
                name="zonecode"
                value={zonecode}
                size={5}
                readOnly
              />
            </div>
          </Col>
        )}
        {/* 주소 */}
        <Col>
          <div>
            <input
              type="text"
              name="address"
              value={address}
              size={45}
              readOnly
            />
          </div>
        </Col>
        <Col>
          {/* 버튼 클릭 시 Post 모달 호출 */}
          <button
            type="button"
            onClick={() => setModalState({ ...modalState, show: true })}
          >
            주소검색
          </button>
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
