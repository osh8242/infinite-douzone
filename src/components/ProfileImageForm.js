import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/ProfileImageForm.scss";
import { useRef } from "react";

function ProfileImageForm(props) {
  const { src, title, text, handleUpload, handleDownload } = props;
  const fileInput = useRef(null);
  return (
    <Card>
      <Card.Img variant="top" src={src} />
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
            onClick={(e) => fileInput.current.click(e)}
          >
            업로드
          </Button>
          <Button variant="secondary" onClick={(e) => handleDownload(e)}>
            다운로드
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProfileImageForm;
