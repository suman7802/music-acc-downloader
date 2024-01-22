import {Container, Row, Col, Card} from 'react-bootstrap';

export default function AboutMe() {
  return (
    <Container
      className="d-flex justify-content-center"
      style={{height: '100vh'}}>
      <Row>
        <Col md="auto">
          <Card style={{width: '18rem'}} className="mt-5 ">
            <Card.Body className="text-center">
              <Card.Title>Hi, I&apos;m Suman 👋</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                A Software Engineer from Nepal 🇳🇵
              </Card.Subtitle>
              <Card.Text>
                <a
                  href="https://sumansharma7802.com.np"
                  className="custom-link">
                  Website
                </a>
                <br />
                <a href="https://github.com/suman7802" className="custom-link">
                  GitHub
                </a>
                <br />
                <a
                  href="https://www.linkedin.com/in/suman-sharma-502785228"
                  className="custom-link">
                  LinkedIn
                </a>
                <br />
                <a
                  href="https://app.sajilocv.com/cv/a078246a-bfa4-4f1f-9f92-573ee713d701"
                  className="custom-link">
                  Resume
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
