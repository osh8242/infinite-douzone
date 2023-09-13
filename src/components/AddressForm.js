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
    addHome2: 상세주소
    pkValue: pk값(사원코드, cdEmp)
  */
  const {
    isZonecode,
    zipHome,
    addHome1,
    addHome2,
    pkValue,
    actions,
    md = 4,
    mdValue = 8,
    size,
    iconBtn,
  } = props;

  const zipHomeRef = useRef();
  const addHome1Ref = useRef();
  const addHome2Ref = useRef();

  //비동기 데이터 load
  // useEffect(() => {
  //   zipHomeRef.current.value = zipHome;
  //   addHome1Ref.current.value = addHome1;
  //   addHome2Ref.current.value = addHome2;
  // });

  useEffect(() => {
    if (zipHomeRef.current) zipHomeRef.current.value = zipHome;
    if (addHome1Ref.current) addHome1Ref.current.value = addHome1;
    if (addHome2Ref.current) addHome2Ref.current.value = addHome2;
  }, [zipHome, addHome1, addHome2]);

  // 선택된 주소를 주소 필드에 업데이트 및 update 요청(우편번호와 주소)
  const handleAddressSelected = ({ zonecode, address }) => {
    //입력 필드 update
    zipHomeRef.current.value = zonecode;
    addHome1Ref.current.value = address;
    //각 입력 필드의 값을 editedData에 저장 (update 요청)
    const newAddress = {
      zipHome: zipHomeRef.current.value,
      addHome1: addHome1Ref.current.value,
      cdEmp: pkValue.cdEmp,
    };
    setModalState({ ...modalState, show: false });

    //update api를 통일하기 위해 item으로 포장
    let item = {
      item: newAddress,
    };
    actions.setAddress(item);
  };

  const [modalState, setModalState] = useState({
    show: false,
    props: {},
  });

  //상세주소 업데이트 요청(update)
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      //update POST 요청
      const newDetailAddress = {
        addHome2: addHome2Ref.current.value,
        cdEmp: pkValue.cdEmp,
      };
      //update api를 통일하기 위해 item으로 포장
      let item = {
        item: newDetailAddress,
      };
      actions.setAddress(item);
    }
  };

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
                  className="zoneCodeArea"
                  type="text"
                  name="zonecode"
                  ref={zipHomeRef}
                  disabled
                  size={size}
                />
              )}

              {/* 주소 */}
              <Form.Control
                className="addressArea"
                type="text"
                name="address"
                ref={addHome1Ref}
                disabled
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
        {/* 상세주소 */}
        <Row>
          <div className="widthFull py-1 labelAndContent">
            <div className="label">상세주소</div>
            <div className="widthFull">
              <Form.Control
                ref={addHome2Ref}
                type="text"
                name="address-detail"
                onKeyDown={handleKeyDown}
                size={size}
              />
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
