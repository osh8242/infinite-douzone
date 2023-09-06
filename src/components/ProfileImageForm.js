import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/ProfileImageForm.scss";

function ProfileImageForm(props) {
  const { src, title, text, handleUpdload, handleDownload } = props;
  return (
    <Card>
      <Card.Img variant="top" src={src} />
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {text && <Card.Text>{text}</Card.Text>}
        <div className="profile-button-container">
          <Button variant="secondary" onClick={(e) => handleUpdload(e)}>
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
