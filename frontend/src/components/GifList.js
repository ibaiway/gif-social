import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import GifItem from "./GifItem";

const testGifs = [
  { id: 1, title: "gif1", description: "This is a desdription for gif 1" },
  { id: 2, title: "gif2", description: "This is a desdription for gif 2" },
  { id: 3, title: "gif3", description: "This is a desdription for gif 3" },
  { id: 4, title: "gif4", description: "This is a desdription for gif 4" },
];

function GifList({ gifs }) {
  return (
    <Container>
      <Row xs={1} sm={2} md={3} className="g-3">
        {gifs.map((gif) => {
          return <GifItem gif={gif} key={gif._id}></GifItem>;
        })}
      </Row>
    </Container>
  );
}

export default GifList;
