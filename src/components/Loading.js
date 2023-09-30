import React from 'react';
import spanner from "../styles/img/loading-spinner.gif";

const Loading = () => {
  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: '9999',
  };

  const contentStyle = {
    position: 'absolute', // 절대 위치로 설정
    bottom: '20px', // 아래에서 20px 떨어진 위치
    right: '20px', // 오른쪽에서 20px 떨어진 위치
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', // 컨텐츠를 오른쪽으로 정렬
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.2)',
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <h3>Loading</h3>
        <img id="loading" src={spanner} alt="" />
      </div>
    </div>
  );
};

export default Loading;
