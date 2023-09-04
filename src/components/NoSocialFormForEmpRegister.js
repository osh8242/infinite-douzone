// 작성자: 김진
/*
필수 parameter: ynForList(내외국민 목록 리스트), ynFor(내외국민 값),
                genderList(성별 목록 리스트), fgSex(성별 값),
                noSocial(주민등록번호 값),
                pkValue(기본키 값),
                actions(model 요청관련 set함수)
선택 parameter: label(라벨명)
*/

import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";

function NoSocialFormForEmpRegister(props) {
  //props 속성들
  const {
    label,
    noSocial,
    ynForList,
    ynFor,
    genderList,
    fgSex,
    pkValue,
    actions,
  } = props;

  const noSocialRef = useRef();
  const ynForListRef = useRef();
  const genderListRef = useRef();

  useEffect(() => {
    noSocialRef.current.value = noSocial || "";
    ynForListRef.current.value = ynFor || "";
    genderListRef.current.value = fgSex || "";
  }, [noSocial, ynFor, fgSex]);

  // 주민번호 유효성검사 함수
  const makeProcessedNoSocial = (inputValue) => {
    let processedNoSocial = inputValue;

    // 숫자 6자리 입력 이후 '-' 추가
    if (/^\d{6}$/.test(inputValue)) {
      processedNoSocial = inputValue.replace(/(\d{6})(\d{0,1})/, "$1-$2");
      console.log("processedNoSocial => ", processedNoSocial);
      //input view update
      noSocialRef.current.value = processedNoSocial;
    }

    //주민등록번호 뒤의 7자리 중 첫 숫자가 짝수면 여자, 홀수면 남자
    else if (/^\d{6}-\d{1,7}$/.test(inputValue)) {
      const firstBackDigit = processedNoSocial[7] ? processedNoSocial[7] : "";

      if (firstBackDigit) {
        genderListRef.current.value =
          firstBackDigit % 2 === 0 ? "여자" : "남자";
        console.log("성별! ====> ", genderListRef.current.value);
      }

      //올바른 형식의 주민등록번호인 경우 성별 값과 주민등록번호 값 자동 update
      if (/^\d{6}-\d{7}$/.test(inputValue)) {
        const newEmpData = {
          noSocial: noSocialRef.current.value,
          fgSex: genderListRef.current.value,
          cdEmp: pkValue.cdEmp,
        };
        actions.setNoSocialForm(newEmpData);
      }
    }

    // 모든 조건에 부합하지 않는 경우
    else {
      console.log("주민등록번호가 조건에 부합하지 않습니다");
    }

    return processedNoSocial;
  };

  const handleNoSocialChange = (event) => {
    makeProcessedNoSocial(event.target.value); //가공된 값으로 수정
  };

  //주민등록번호 마스킹 함수
  // const handleInputValueChange = () => {
  //   noSocialRef.current.value.replace(
  //     /^(\d{6})(\d{7})/,
  //     (match, group1, group2) => {
  //       const maskedGroup2 = group2.replace(/./g, "*");
  //       console.log("group1내용 : " + group1);
  //       noSocialRef.current.value = `${group1}-${maskedGroup2}`;
  //     }
  //   );
  //   console.log(noSocialRef.current.value); => 123456-*******
  // };

  // 내외국민 update
  const handleYnFor = () => {
    const newYnFor = {
      ynFor: ynForListRef.current.value,
      cdEmp: pkValue.cdEmp,
    };
    actions.setNoSocialForm(newYnFor);
  };

  // 주민번호 update
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const newNoSocial = {
        noSocial: noSocialRef.current.value,
        cdEmp: pkValue.cdEmp,
      };
      actions.setNoSocialForm(newNoSocial);
    }
  };

  //성별 update
  const handleFgSex = () => {
    const newFgSex = {
      fgSex: genderListRef.current.value,
      cdEmp: pkValue.cdEmp,
    };
    actions.setNoSocialForm(newFgSex);
  };

  return (
    <>
      <Row className="py-1">
        <Col
          md="4"
          className="d-flex align-items-center justify-content-center"
        >
          {label}
        </Col>
        {/* 내외국민 구분 */}
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Select
            ref={ynForListRef}
            onChange={handleYnFor}
            defaultValue={ynFor}
          >
            {ynForList?.map((option, index) => (
              <option value={option.value} key={option.key}>
                {option.value}
              </option>
            ))}
          </Form.Select>
        </Col>
        {/* 주민등록번호 */}
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Control
            ref={noSocialRef}
            onKeyDown={handleKeyDown}
            onChange={handleNoSocialChange}
          ></Form.Control>
        </Col>
        {/* 성별 구분 */}
        <Col className="d-flex align-items-center justify-content-center">
          <Form.Select
            ref={genderListRef}
            onChange={handleFgSex}
            defaultValue={fgSex}
          >
            {genderList?.map((option, index) => (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </>
  );
}
export default NoSocialFormForEmpRegister;
