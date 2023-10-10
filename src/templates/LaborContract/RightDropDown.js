import React from "react";
import "../../styles/RightDropDown.css";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect, useRef } from "react";
import Scrollbars from "react-custom-scrollbars";

const RightDropdown = ({ toggleDropdown, showDropdown }) => {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const dropdownRef = useRef(null);
  const plusIconRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  useEffect(() => {
    if (showDropdown) {
      const savedBoards = localStorage.getItem("boards");
      if (savedBoards) {
        setBoards(JSON.parse(savedBoards));
      }
    }
  }, [showDropdown]);

  useEffect(() => {
    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) {
      setBoards(JSON.parse(savedBoards));
    }
  }, []);

  const loadBoardsFromLocalStorage = () => {
    const savedBoards = localStorage.getItem("boards");
    if (savedBoards) {
      setBoards(JSON.parse(savedBoards));
    }
  };

  const addBoard = (event) => {
    event.stopPropagation();

    setBoards((prevBoards) => [
      ...prevBoards,
      { id: prevBoards.length, text: "", isEditing: true },
    ]);
  };

  const handleFocus = (id) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === id ? { ...board, isFocused: true } : board
      )
    );
  };

  const handleBlur = (id) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === id ? { ...board, isFocused: false } : board
      )
    );
  };

  const deleteBoard = () => {
    setBoards((prevBoards) =>
      prevBoards.filter((board) => board.id !== activeBoardId)
    );
    setActiveBoardId(null);
  };

  const updateBoardText = (id, newText, isEditing = true) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === id ? { ...board, text: newText, isEditing } : board
      )
    );
  };

  // const handleSave = (id, text) => {
  //   updateBoardText(id, text, false);
  // };
  const handleSave = (id, text) => {
    if (text.trim() === "") {
      alert("Text cannot be empty!"); // 혹은 다른 UI 피드백 메커니즘 사용
    } else {
      updateBoardText(id, text, false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("Event Target: ", event.target); // 이벤트 대상 로깅
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        plusIconRef.current &&
        !plusIconRef.current.contains(event.target)
      ) {
        console.log("Closing Dropdown"); // 드롭다운 닫는 조건이 충족되면 로깅
        toggleDropdown(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDropdown]);

  return (
    <div className="Container" ref={dropdownRef}>
      <div className="inner">
        <Row className="dropHead">
          <Col>
            <Row>
              <Col>
                <p className="pheader">댓글</p>
              </Col>
            </Row>
          </Col>
          <Col className="text-end">
            <FontAwesomeIcon
              icon={faXmark}
              onClick={toggleDropdown}
              className="xbtn"
            />
          </Col>
        </Row>
        <div className="dropMain">
          <Row>
            <Col className="text-start">
              <FontAwesomeIcon
                icon={faSquarePlus}
                size="xl"
                className="btnplus"
                onClick={addBoard}
              />
            </Col>
            <Col className="text-end">
              <FontAwesomeIcon
                icon={faTrash}
                size="xl"
                className="btntrash"
                onClick={deleteBoard}
              />
            </Col>
          </Row>
          <Scrollbars style={{ height: "690px" }}>
            {boards.map((board) => (
              <div
                className={`board ${
                  board.id === activeBoardId ? "active" : ""
                }`}
                key={board.id}
                onClick={() => setActiveBoardId(board.id)}
              >
                {board.isEditing ? (
                  <>
                    <input
                      value={board.text}
                      onChange={(e) =>
                        updateBoardText(board.id, e.target.value)
                      }
                      onFocus={() => handleFocus(board.id)}
                      onBlur={() => handleBlur(board.id)}
                      placeholder="기록할 내용을 입력해 주세요."
                    />

                    <button
                      className="save"
                      onClick={() => handleSave(board.id, board.text)}
                    >
                      저장
                    </button>

                    <button
                      className="cancelBtn"
                      onClick={() => handleBlur(board.id)}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <p
                    onClick={() => updateBoardText(board.id, board.text, true)}
                  >
                    {board.text}
                  </p>
                )}
              </div>
            ))}
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

export default RightDropdown;
