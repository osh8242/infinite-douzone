import React from "react";
import "../../styles/RightDropDown.css";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect, useRef } from "react";
import Scrollbars from "react-custom-scrollbars";

const RightDropdown = ({ toggleDropdown }) => {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const addBoard = () => {
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

  const handleSave = (id, text) => {
    updateBoardText(id, text, false);
  };

  return (
    <div className="Container">
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
