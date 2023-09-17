import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import Post from "./Post";
import "../styles/addressForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const AddressForm = (props) => {
  /*
    props data
    isZonecode: 우편번호 여부(boolean)
    zipHome: 우편번호
    addHome1: 주소
    pkValue: pk값(사원코드, cdEmp)
    actions: update 함수
  */
  const {
    isZonecode,
    id,
    name,
    label,
    value,
    // zipHome,
    // addHome1,
    // pkValue,
    // actions,
    // md = 4,
    // mdValue = 8,
    size,
    iconBtn,
    onChange,
  } = props;

  //입력값
  const [inputValue, setInputValue] = useState(value || ""); // 보여줄 값
  const [sendValue, setSendValue] = useState(value || ""); // 보낼 값

  //비동기 데이터 load
  useEffect(() => {
    setInputValue(value || "");
    console.log("useEffect! ,", value);
  }, [value]);

  // 선택된 주소를 주소 필드에 업데이트 (우편번호와 주소)
  // parameter로 받는 address와 zonecode는 Post 컴포넌트로부터 받는다
  const handleAddressSelected = ({ zonecode, address }) => {
    const newValue = `${zonecode}-${address}`;
    setInputValue(newValue);

    onChange("", zonecode, "zipHome");
    onChange("", address, "addHome1");

    setModalState({ ...modalState, show: false });
  };

  const [modalState, setModalState] = useState({
    show: false,
    props: {},
  });

  return (
    props && (
      <>
        <Row>
          <div className="widthFull py-1 labelAndContent">
            <div className="label">주소</div>
            <div className="fullAddressArea labelAndContent widthFull">
              {/* 우편번호 */}
              {isZonecode && (
                <Form.Control
                  id="zipHome"
                  key="zipHome"
                  type="text"
                  value={inputValue?.split("-")[0] || ""}
                  name="zonecode"
                  className="zoneCodeArea"
                  disabled
                  size={size}
                  onChange={handleAddressSelected}
                />
              )}

              {/* 주소 */}
              <Form.Control
                id="addHome1"
                key="addHome1"
                type="text"
                value={inputValue?.split("-")[1] || ""}
                name="address"
                className="addressArea"
                disabled
                onChange={handleAddressSelected}
              />
              {/* 버튼 클릭 시 Post 모달 호출 */}

              <Button
                className="addressSearchBtn"
                variant="secondary"
                onClick={() => setModalState({ ...modalState, show: true })}
              >
                {iconBtn ? (
                  <FontAwesomeIcon icon={faSearch} size={"lg"} color={""} />
                ) : (
                  "검색"
                )}
              </Button>
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
    )
  );
};

export default AddressForm;
