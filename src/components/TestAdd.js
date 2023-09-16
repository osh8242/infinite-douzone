import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import Post from "./Post";
import "../styles/addressForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const TestAdd = (props) => {
  const { label, isZonecode, value, size, mb, md = 4, actions } = props;
  const [zonecode, setZonecode] = useState(value || "");
  const [address, setAddress] = useState(value || "");

  useEffect(() => {
    setAddress(value || "");
  }, [value]);

  // 선택된 주소를 주소 필드에 업데이트
  const handleAddressSelected = ({ address, zonecode }) => {
    actions.setEdited({ address: address });
    setZonecode(zonecode);
    setAddress(address);
    setModalState({ ...modalState, show: false });
  };

  const [modalState, setModalState] = useState({
    show: false,
    props: {},
  });

  return (
    <>
      <Row className="py-1">
        <div className="labelAndContent">
          <div className="label">{label}</div>

          <div className="widthFull ">
            <Row>
              <Col md="10">
                <Form.Control
                  id="address"
                  type="text"
                  name="address"
                  value={address}
                  size={size}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Col>

              <Col md="2">
                <Button
                  id="addressSearchBtn"
                  variant="secondary"
                  onClick={() => setModalState({ ...modalState, show: true })}
                >
                  <FontAwesomeIcon icon={faSearch} size={"lg"} color={""} />
                </Button>
              </Col>
            </Row>
          </div>
        </div>
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

export default TestAdd;
