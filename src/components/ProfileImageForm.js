import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/ProfileImageForm.scss";

function ProfileImageForm(props) {
  const { src, title, text, handleUpload, handleDelete } = props;
  const fileInput = useRef(null);
  return (
    <Card className="card-container">
      <Card.Img variant="top" src={src} alt="이미지 로드 실패" />
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
          <Button variant="secondary" onClick={(e) => fileInput.current.click(e)}>
            업로드
          </Button>
          <Button variant="secondary" onClick={(e) => handleDelete()}>
            삭제
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProfileImageForm;
