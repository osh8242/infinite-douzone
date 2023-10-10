import React, { useEffect, useState, useRef } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "../styles/SearchForm.css";
import "../styles/fonts.css";
import { forwardRef, useImperativeHandle } from "react";

// function AutoCompleteSearch({ placeholder }) {
const AutoCompleteSearch = forwardRef(({ placeholder }, ref) => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  const getChosung = (char) => {
    const cho = [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];
    const uniCode = char.charCodeAt(0);
    if (uniCode >= 44032 && uniCode <= 55203) {
      return cho[Math.floor((uniCode - 44032) / 588)];
    }
    return char;
  };

  const getChosungString = (str) => {
    return Array.from(str).map(getChosung).join("");
  };

  const mockData = [
    "사원관리",
    "인사관리",
    "표준근로계약관리",
    "급여관리",
    "메인페이지",
    "마이페이지",
  ];

  useEffect(() => {
    if (inputValue) {
      setSearchResults(
        mockData.filter(
          (item) =>
            item.includes(inputValue) ||
            getChosungString(item).includes(getChosungString(inputValue))
        )
      );
    } else {
      setSearchResults([]);
    }
  }, [inputValue]);

  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    blurInput: () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    },
  }));

  const navigateTo = (selectedWord) => {
    const urlMappings = {
      사원관리: "/er",
      인사관리: "/hr",
      표준근로계약관리: "/lc/*",
      // 급여관리: "/si",
      메인페이지: "/",
    };
    navigate(urlMappings[selectedWord] || "/");
  };

  const finalizeSearch = (selectedWord) => {
    setSearchResults([]);
    setInputValue("");
    navigateTo(selectedWord);
  };

  const handleResultSelection = (index) => {
    if (index >= 0 && index < searchResults.length) {
      finalizeSearch(searchResults[index]);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        // e.preventDefault();
        setSelectedResultIndex((prev) =>
          prev + 1 < searchResults.length ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        setSelectedResultIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
        break;
      case "Enter":
        handleResultSelection(selectedResultIndex);
        break;
      default:
        break;
    }
  };

  const searchRef = useRef(null);
  const handleClickOutsideInput = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchResults([]);
      setInputValue("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideInput);
    return () => {
      document.removeEventListener("click", handleClickOutsideInput);
    };
  }, []);

  return (
    <div className="search-bar" tabIndex="0">
      <FontAwesomeIcon icon={faSearch} size={"lg"} color={"grey"} />
      <input
        className={`search-bar__input ${isFocused ? "expanded" : ""}`}
        type="text"
        placeholder={isFocused ? "" : placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={inputRef}
      />
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((result, index) => (
            <li
              key={index}
              className={index === selectedResultIndex ? "selected" : ""}
              onClick={() => handleResultSelection(index)}
              onMouseOver={() => setSelectedResultIndex(index)}
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default AutoCompleteSearch;
