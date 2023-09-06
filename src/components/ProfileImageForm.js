import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProfileImageForm(props) {
  const { src, title, text, handleUpdload, handleDownload } = props;
  return (
    <Card>
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant="secondary" onClick={(e) => handleUpdload(e)}>
          업로드
        </Button>
        <Button variant="secondary" onClick={(e) => handleDownload(e)}>
          다운로드
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProfileImageForm;
