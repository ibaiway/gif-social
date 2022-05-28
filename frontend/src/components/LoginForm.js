import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function LoginForm(params) {
  const { setUser } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);

    try {
      /* const data = await fetch("http://127.0.0.1:4000/auth/login", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        withCredentials: true,

        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      console.log(data.headers.keys);
      const parsedData = await data.json();
      console.log(parsedData); */
      const data = await axios({
        method: "post",
        url: "http://alberdi.com:4000/auth/login",
        data: {
          email: email,
          password: password,
        },
        withCredentials: true,
      });
      console.log(data);
      const parsedData = data.data;
      setUser((user) => ({
        ...user,
        id: parsedData.user._id,
        email: parsedData.user.email,
      }));
    } catch (error) {
      console.log("PETAO: ", error);
    }
  };
  return (
    <div className="w-100 m-auto" style={{ maxWidth: "330px" }}>
      <Form onSubmit={handleLogin}>
        <h1 className="h3 mb-3 fw-normal">Log In</h1>
        <FloatingLabel controlId="email" label="Email address">
          <Form.Control
            type="email"
            name="email"
            required
            placeholder="name@example.com"
          />
        </FloatingLabel>
        <FloatingLabel controlId="password" label="Password">
          <Form.Control
            type="password"
            name="password"
            required
            placeholder="Password"
          />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
