// import React, { useEffect, useState } from "react";
// import CommonModel from "../model/CommonModel";
// import { Form } from "react-bootstrap";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "../styles/SearchForm.css";

// const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
//   <div className="custom-date-input" onClick={onClick} ref={ref}>
//     <Form.Control type="text" value={value} />
//     <FontAwesomeIcon icon={faSearch} />
//   </div>
// ));

// function SearchForm(props) {
//   const { placeholder, value, actions } = props;
//   const [inputValue, setInputValue] = useState(value);

//   const { state } = CommonModel();
//   const { searchData, setSearchData } = useState({});

//   const [searchValue, setSearchValue] = useState(placeholder);

//   console.log("SearchForm loading...");
//   console.log("ph:" + placeholder);

//   useEffect(() => {
//     setInputValue(props.value);
//   }, [value]);

//   const onChange = (e) => {
//     console.log("search Data 변경 중");
//     console.log(e.target.value);
//     setInputValue(e.target.value);
//   };

//   //   const onClick = (e) => {
//   //     console.log("click test");
//   //     // css 변경을 위한 class name 변경 - focus
//   //     document.getElementById("off").id = "on";
//   //   };

//   //   const onBlurHandle = (e) => {
//   //     console.log("onBlur");
//   //     document.getElementById("on").id = "off";
//   //     // css 복구 - className: normal
//   //   };

//   const handleKeyUp = (e) => {
//     console.log("handle keyUp");
//     console.log(e);
//     console.log(e.target);
//     console.log(e.target.value);

//     if (e.key === "Enter") {
//       console.log("검색 완료 : " + inputValue);
//       // 검색 처리
//     }
//   };

//   return (
//     <>
//       <div class="search-bar" id="off">
//         <FontAwesomeIcon icon={faSearch} size={"lg"} color={"grey"} />
//         <input
//           class="search-bar__input"
//           type="text"
//           //   id="findMenuBar"
//           placeholder={searchValue}
//           value={inputValue}
//           onChange={onChange}
//           onKeyUp={handleKeyUp}
//           //   onClick={onClick}
//           //   onBlur={onBlurHandle}
//         />
//       </div>
//     </>
//   );
// }
// export default SearchForm;
// const mockData = [
//   "사원관리",
//   "인사관리",
//   "급여관리",
//   "표준근로계약",
//   "마이페이지",
// ];

import React, { useEffect, useState, useRef } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/SearchForm.css";

function SearchForm(props) {
  const { placeholder } = props;
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [currentPlaceholder, setCurrentPlaceholder] = useState();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue) {
      const mockData = [
        "사원관리",
        "인사관리",
        "급여관리",
        "표준근로계약",
        "마이페이지",
      ];
      setSearchResults(mockData.filter((item) => item.includes(inputValue)));
    } else {
      setSearchResults([]);
    }
  }, [inputValue]);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const finalizeSearch = (selectedWord) => {
    console.log(`검색 완료: ${selectedWord}`);
    setSearchResults([]);
    setInputValue("");
    // inputRef.current.blur();
  };

  const handleResultClick = (index) => {
    finalizeSearch(searchResults[index]);
  };

  const handleResultMouseOver = (index) => {
    setSelectedResultIndex(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      const nextIndex = selectedResultIndex + 1;
      if (nextIndex < searchResults.length) {
        setSelectedResultIndex(nextIndex);
      }
    } else if (e.key === "ArrowUp") {
      const prevIndex = selectedResultIndex - 1;
      if (prevIndex >= 0) {
        setSelectedResultIndex(prevIndex);
      }
    } else if (e.key === "Enter") {
      if (selectedResultIndex !== -1) {
        finalizeSearch(searchResults[selectedResultIndex]);
      }
    }
  };

  const handleFocus = () => {
    setCurrentPlaceholder(placeholder);
  };

  const handleBlur = () => {
    setSearchResults([]);
    setInputValue("");
    setCurrentPlaceholder("");
  };

  const handleClickOutsideInput = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      e.preventDefault();
      handleBlur();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideInput);
    return () => {
      document.removeEventListener("click", handleClickOutsideInput);
    };
  }, []);

  return (
    <div
      className="search-bar"
      ref={searchRef}
      tabIndex="0"
      onClick={() => inputRef.current.focus()}
    >
      <FontAwesomeIcon icon={faSearch} size={"lg"} color={"grey"} />
      <input
        ref={inputRef}
        className="search-bar__input"
        type="text"
        placeholder={currentPlaceholder}
        value={inputValue}
        onChange={onChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((result, index) => (
            <li
              key={index}
              className={index === selectedResultIndex ? "selected" : ""}
              onClick={() => handleResultClick(index)}
              onMouseOver={() => handleResultMouseOver(index)}
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchForm;
