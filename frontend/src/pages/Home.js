import GifList from "../components/GifList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { getAll } from "../utils/fetchMedia";

function Home(params) {
  const [gifs, setGifs] = useState([]);
  useEffect(() => {
    console.log("HomePage Reloaded");
    const fetchMedia = async () => {
      const response = await getAll();
      console.log(response);
      setGifs(response);
      console.log(gifs);
    };
    fetchMedia();
  }, []);

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
        <GifList gifs={gifs} />
      </div>
    </main>
  );
}

export default Home;
