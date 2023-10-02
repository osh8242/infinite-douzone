import React, { useEffect, useState } from "react";
import Button from "../styles/PointerCursor";
import wehago_backImg from "../styles/img/wehago_backImg.jpg";
import cursor from "../styles/img/cursor-remov.png";
// import cursor from "../styles/img/cursor.jpg";
import "../styles/cursor.css";

const cursors = ["cursor1", "cursor2", "cursor3", "cursor4"];

function MainTestPage() {
  const [selectedCursor, setSelectedCursor] = useState("cursor1");
  const [cursorPosition, setCursorPosition] = useState([0, 0]);
  const [calibratedCursorPosition, setCalibratedCursorPosition] = useState([
    0, 0,
  ]);

  useEffect(() => {
    const event = ({ clientX, clientY }) => {
      setCursorPosition([clientX, clientY]);
      const pos = [clientX, clientY];
      switch (selectedCursor) {
        case "cursor1":
          pos[0] -= 1;
          pos[1] -= 2;
          break;
        case "cursor2":
          pos[0] -= 28;
          break;
        case "cursor3":
          pos[0] -= 16;
          pos[1] -= 17;
          break;
        case "cursor4":
          pos[0] -= 5;
          pos[1] -= 4;
          break;
      }
      setCalibratedCursorPosition(pos);
      console.log(clientX, clientY);
    };
    window.addEventListener("mousemove", event);

    return () => window.removeEventListener("mousemove", event);
  }, [selectedCursor]);

  return (
    <>
      <img
        style={{
          pointerEvents: "none",
          position: "fixed",
          left: calibratedCursorPosition[0],
          top: calibratedCursorPosition[1],
          width: "200px",
          zIndex: "999999",
        }}
        src={cursor}
        alt="커서 이미지"
      />
      <div style={{ fontSize: "24px" }}>
        <div
          style={{
            height: "64vh",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            background: "rgb(57, 63, 80)",
            position: "relative",
          }}
        >
          <img
            src={wehago_backImg}
            alt="Wehago Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
            }}
          >
            <h2
              style={{
                color: "white",
                fontSize: "30px",
              }}
            >
              기업에 필요한 다양한 업무환경을 제공하는 비즈니스 플랫폼
            </h2>
            <h1
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: "70px",
                marginBottom: "20px",
              }}
            >
              WEHAGO
            </h1>
            <h3
              style={{
                color: "white",
                fontSize: "17px",
              }}
            >
              업무에 필요한 모든 서비스를 한 공간에서! <br></br>Smart A 10으로
              전문적인 경영관리와 쉽고 편리한 협업을 경험해보세요.
            </h3>
          </div>
        </div>
        <div
          style={{
            marginTop: "80px",
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          <a
            href="/er"
            style={{
              width: "16vw",
              minWidth: "100px",
              height: "10vh",
              display: "flex",
              textDecoration: "none",
              justifyContent: "center",
              alignItems: "center",
              border: "solid 1px lightgray",
              borderRadius: "2px",
              background: "rgba(240,240,240,0.5)",
              color: "gray",
              fontSize: "1.2em",
            }}
          >
            사원등록
          </a>
          <a
            href="/hr"
            style={{
              width: "16vw",
              minWidth: "100px",
              height: "10vh",
              display: "flex",
              textDecoration: "none",
              justifyContent: "center",
              alignItems: "center",
              border: "solid 1px lightgray",
              borderRadius: "2px",
              background: "rgba(240,240,240,0.5)",
              color: "gray",
              fontSize: "1.2em",
            }}
          >
            인사관리등록
          </a>
          <a
            href="/lc"
            style={{
              width: "16vw",
              minWidth: "100px",
              height: "10vh",
              display: "flex",
              textDecoration: "none",
              justifyContent: "center",
              alignItems: "center",
              border: "solid 1px lightgray",
              borderRadius: "2px",
              background: "rgba(240,240,240,0.5)",
              color: "gray",
              fontSize: "1.2em",
            }}
          >
            표준근로계약서
          </a>
          <a
            href="/si"
            style={{
              width: "16vw",
              minWidth: "100px",
              height: "10vh",
              display: "flex",
              textDecoration: "none",
              justifyContent: "center",
              alignItems: "center",
              border: "solid 1px lightgray",
              borderRadius: "2px",
              background: "rgba(240,240,240,0.5)",
              color: "gray",
              fontSize: "1.2em",
            }}
          >
            급여관리
          </a>
        </div>
      </div>
      <div
        style={{
          marginTop: "26px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/*버튼 목록*/}
        {cursors.map((cursor) => (
          <Button
            onClick={() => {
              const pos = cursorPosition;
              switch (selectedCursor) {
                case "cursor1":
                  pos[0] -= 1;
                  pos[1] -= 2;
                  break;
                case "cursor2":
                  pos[0] -= 28;
                  break;
                case "cursor3":
                  pos[0] -= 16;
                  pos[1] -= 17;
                  break;
                case "cursor4":
                  pos[0] -= 5;
                  pos[1] -= 4;
                  break;
              }
              setCalibratedCursorPosition(pos);
              setSelectedCursor(cursor);
            }}
            selected={selectedCursor === cursor}
            name={cursor}
            key={cursor}
          />
        ))}
      </div>
    </>
  );
}
export default MainTestPage;
