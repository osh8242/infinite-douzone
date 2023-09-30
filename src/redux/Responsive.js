import React from "react";
import styled from "styled-components";

const ResponsiveBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1024px;
  margin: 0 auto;

  /*  desktop  */
  @media (max-width: 1024px) {
    width: 768px;
  }
  /* tablet,mobile */
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Responsive = ({ children, ...rest }) => {
  // style, className,onClick,onMouseMove 등의 props 를 사용할 수 있도록 ...rest 사용하여 ResponsiveBlock 전달
  // 이렇게 해주고 받을 때 rest 를 받으면 해당 객체 안에 있는 애들을 모두 props 로 인식함.
  // props 가 많아서 일일이 추가해주기 귀찮을 때나, 해당 컴포넌트 마다 뭘 받는지 불투명하면 유용한 기능
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
