import GifList from "../components/GifList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home(params) {
  return (
    <main>
      <Container className="py-5 text-center">
        <Row className="py-lg-5">
          <Col lg={6} md={8} className="mx-auto">
            <h1 className="fw-light">Gif Social</h1>
            <p className="lead text-muted">The best Gif website ever built</p>
          </Col>
        </Row>
      </Container>
      <div className="py-5 bg-light">
        <GifList />
      </div>
    </main>
  );
}

export default Home;
