import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

const AddressForm = () => {
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onChangeZoncode = (e) => {
    setZonecode(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onCompletePost = (data) => {
    setZonecode(data.zonecode);
    setAddress(data.address);
    setShowModal(false);
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* 아래의 코드를 모달에 띄움 */}
      <DaumPostcode
        onComplete={onCompletePost}
        autoClose={true}
        animation={true}
      />

      <div>
        {/* onChange Event로 set 으로 데이터 넣어주기 -> 모달창에 전달 */}
        <input
          type="text"
          name="zonecode"
          value={zonecode}
          onChange={onChangeZoncode}
          size={5}
          readOnly
        />
        <input
          type="text"
          name="address"
          value={address}
          onChange={onChangeAddress}
          size={45}
          readOnly
        />

        {/* 버튼 클릭 시 모달창 보여줌 */}
        <button type="button" onClick={handleButtonClick}>
          주소검색
        </button>
      </div>
    </>
  );
};

export default AddressForm;
