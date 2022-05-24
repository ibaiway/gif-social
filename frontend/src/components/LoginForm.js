import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginForm(params) {
  return (
    <div className="w-100 m-auto" style={{ maxWidth: "330px" }}>
      <Form>
        <h1 className="h3 mb-3 fw-normal">Log In</h1>
        <FloatingLabel controlId="email" label="Email address">
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="password" label="Password">
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
