import Container from "react-bootstrap/Container";

function Footer(params) {
  return (
    <footer className="text-muted py-5">
      <Container>
        <p className="float-end mb-1">
          <a>Back to the top</a>
        </p>
        <p className="mb-1">Check out the github Repo</p>
      </Container>
    </footer>
  );
}

export default Footer;
