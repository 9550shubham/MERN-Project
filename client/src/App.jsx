import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/home";
import { Contact } from "./Pages/Contact";
import { About } from "./Pages/about";
import { Navbar } from "./components/Navbar";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { Error } from "./Pages/Error";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;