import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

export default function Post({ onAddressSelected }) {
  // 주소 정보 전달
  const handleAddressSelected = (data) => {
    onAddressSelected({
      address: data.address,
      zonecode: data.zonecode,
    });
  };

  return (
    <div>
      <DaumPostcode
        autoClose={true}
        animation={true}
        onComplete={handleAddressSelected}
      ></DaumPostcode>
      {/* 닫기 버튼이나 상세정보 입력 버튼 필요시 구현 예정 */}
    </div>
  );
}
