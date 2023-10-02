import React, { useEffect, useState } from "react";
import cursor from "../styles/img/cursor-remov.png";
import { Container, Row, Col } from "react-bootstrap";
import eyesLogo from "../styles/img/eyelogo.png";
import "../styles/cursor.css";
function ErrorPage() {
  const [cursorPosition, setCursorPosition] = useState([0, 0]);
  const [calibratedCursorPosition, setCalibratedCursorPosition] = useState([
    0, 0,
  ]);

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }) => {
      setCursorPosition([clientX, clientY]);
      setCalibratedCursorPosition([clientX - 1, clientY - 2]);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <img
        className="cursorImage"
        style={{
          left: calibratedCursorPosition[0],
          top: calibratedCursorPosition[1],
        }}
        src={cursor}
        alt="커서 이미지"
      />
      <div className="mainContainer">
        <button className="button">Return to Page</button>
        <div className="innerContainer">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col md={6} className="text-center">
                <img src={eyesLogo} width="250" style={{ margin: "0px 0" }} />
              </Col>
              <Col
                md={6}
                className="text-center"
                style={{
                  marginLeft: "-100px",
                  marginRight: "50px",
                  marginTop: "50px",
                }}
              >
                <p
                  style={{
                    fontSize: "60px",
                    color: "rgb(127, 127, 127)",
                    margin: "0",
                    marginBottom: "-60px",
                    fontWeight: "bold",
                  }}
                >
                  Sorry...
                </p>
                <p
                  style={{
                    fontSize: "150px",
                    color: "rgb(48, 150, 255)",
                    margin: "0",
                    marginBottom: "-30px",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  404
                </p>
                <p
                  style={{
                    fontSize: "40px",
                    color: "rgb(127, 127, 127)",
                    margin: "0",
                    marginBottom: "100px",
                    fontWeight: "bold",
                  }}
                >
                  page was not Found.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
