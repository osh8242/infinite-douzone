import React, { useState, useCallback } from "react";
import Post from "./Post";
import { Col, Row } from "react-bootstrap";

const AddressForm = ({ label, isZonecode }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  // 선택된 주소를 주소 필드에 업데이트
  const handleAddressSelected = ({ address, zonecode }) => {
    setAddress(address);
    setZonecode(zonecode);
    closeModal();
  };

  return (
    <>
      {/* Post 컴포넌트를 모달에 띄움, 우편번호, 상세주소, 주소 등을 가져옴. */}
      {modalVisible && <Post onAddressSelected={handleAddressSelected} />}
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
          <button type="button" onClick={openModal}>
            주소검색
          </button>
        </Col>
      </Row>
    </>
  );
};

export default AddressForm;
