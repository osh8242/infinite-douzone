import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/ProfileImageForm.scss";
import defaultImg from "../styles/img/defaultProfile.jpg";

function ProfileImageForm(props) {
  const { src, title, text, handleUpload, handleDelete } = props;
  const fileInput = useRef(null);
  const [imgSrc, setImgSrc] = useState(defaultImg);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Card className="card-container">
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {text && <Card.Text>{text}</Card.Text>}

        <div className="profile-button-container">
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(event) => handleUpload(event)}
            ref={fileInput}
          />
          <Button
            variant="secondary"
            onClick={(e) => {
              fileInput.current.value = null; // 파일 입력 요소의 값을 초기화
              fileInput.current.click();
            }}
          >
            업로드
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => {
              handleDelete();
              setImgSrc(defaultImg);
            }}
          >
            삭제
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProfileImageForm;
