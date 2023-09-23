// 수정 중
import React, { useEffect, useState, useRef } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "../styles/SearchForm.css";

function AutoCompleteSearch({ placeholder }) {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

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

    const urlMappings = {
      사원관리: "/er",
      인사관리: "/hr",
      표준근로계약관리: "/lc/*",
      급여관리: "/si",
      메인페이지: "/",
    };

    navigate(urlMappings[selectedWord]);
  };

  const handleResultClick = (index) => {
    finalizeSearch(searchResults[index]);
  };

  const handleResultMouseOver = (index) => {
    setSelectedResultIndex(index);
  };

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

export default AutoCompleteSearch;
