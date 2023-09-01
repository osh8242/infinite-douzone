import React, { useEffect, useState } from "react";
import CommonModel from "../model/CommonModel";
import { Form } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/SearchForm.css";

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <div className="custom-date-input" onClick={onClick} ref={ref}>
    <Form.Control type="text" value={value} />
    <FontAwesomeIcon icon={faSearch} />
  </div>
));

function SearchForm(props) {
  const { placeholder, value, actions } = props;
  const [inputValue, setInputValue] = useState(value);

  const { state } = CommonModel();
  const { searchData, setSearchData } = useState({});

  const [searchValue, setSearchValue] = useState(placeholder);

  console.log("SearchForm loading...");
  console.log("ph:" + placeholder);

  //   useEffect(() => {
  //     console.log("data 변화 감지");
  //     console.log("value: ");
  //     console.log(searchData);
  //     setSearchData(searchData);
  //   }, [searchData]);

  useEffect(() => {
    setInputValue(props.value);
  }, [value]);

  const onChange = (e) => {
    console.log("search Data 변경 중");
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  //   const onClick = (e) => {
  //     console.log("click test");
  //     // css 변경을 위한 class name 변경 - focus
  //     document.getElementById("off").id = "on";
  //   };

  //   const onBlurHandle = (e) => {
  //     console.log("onBlur");
  //     document.getElementById("on").id = "off";
  //     // css 복구 - className: normal
  //   };

  const handleKeyUp = (e) => {
    console.log("handle keyUp");
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);

    if (e.key === "Enter") {
      console.log("검색 완료 : " + inputValue);
      // 검색 처리
    }
  };

  return (
    <>
      {/* <input
        type="search"
        id="findMenuBar"
        placeholder={searchValue}
        value={inputValue}
        onChange={onChange}
        onKeyUp={handleKeyUp}
        customInput={<CustomInput />}
      /> */}

      <div class="search-bar" id="off">
        <FontAwesomeIcon icon={faSearch} size={"lg"} color={"grey"} />
        <input
          class="search-bar__input"
          type="text"
          //   id="findMenuBar"
          placeholder={searchValue}
          value={inputValue}
          onChange={onChange}
          onKeyUp={handleKeyUp}
          //   onClick={onClick}
          //   onBlur={onBlurHandle}
        />
      </div>
    </>
  );
}
export default SearchForm;
