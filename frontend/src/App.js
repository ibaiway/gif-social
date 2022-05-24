import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
