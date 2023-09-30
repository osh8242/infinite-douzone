import React, { useEffect, useState, useRef } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "../styles/SearchForm.css";
import "../styles/fonts.css";

function SearchForm({ placeholder }) {
  // 상태 변수 및 리액트 훅 초기화
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // 입력값이 변경될 때 검색 결과 업데이트
  useEffect(() => {
    if (inputValue) {
      const mockData = [
        "사원관리",
        "인사관리",
        "급여관리",
        "표준근로계약관리",
        "메인페이지",
        "마이페이지",
      ];
      // 입력값과 일치하는 검색 결과 필터링
      setSearchResults(mockData.filter((item) => item.includes(inputValue)));
    } else {
      setSearchResults([]);
    }
  }, [inputValue]);

  // 입력값 변경 핸들러
  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  // 검색 결과 선택 시 처리
  const finalizeSearch = (selectedWord) => {
    console.log(`검색 완료: ${selectedWord}`);
    setSearchResults([]);
    setInputValue("");

    // 선택된 검색어에 따라 동적으로 URL 변경
    const urlMappings = {
      사원관리: "/er",
      인사관리: "/hr",
      표준근로계약관리: "/lc/*",
      급여관리: "/si",
      메인페이지: "/",
    };

    navigate(urlMappings[selectedWord]);
  };

  // 검색 결과 클릭 핸들러
  const handleResultClick = (index) => {
    finalizeSearch(searchResults[index]);
  };

  // 검색 결과 마우스 오버 핸들러
  const handleResultMouseOver = (index) => {
    setSelectedResultIndex(index);
  };

  // 키보드 입력 핸들러 (화살표 및 엔터 키 처리)
  const handleKeyDown = (e) => {
    e.preventDefault();
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

  // 입력란 포커스 핸들러
  const handleFocus = () => {
    setCurrentPlaceholder(placeholder);
  };

  // 입력란 블러 핸들러
  const handleBlur = () => {
    setSearchResults([]);
    setInputValue("");
    setCurrentPlaceholder("");
  };

  // 입력란 외부 클릭 처리 핸들러
  const handleClickOutsideInput = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      handleBlur();
    }
  };

  useEffect(() => {
    // 외부 클릭 이벤트를 위한 이벤트 리스너 등록
    document.addEventListener("click", handleClickOutsideInput);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
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
      <FontAwesomeIcon
        icon={faSearch}
        className="searchFormIcon p-12"
        color={"grey"}
      />
      <input
        ref={inputRef}
        className="search-bar__input p-10"
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
