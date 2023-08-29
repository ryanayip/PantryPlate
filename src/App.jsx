import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";

function App() {
  //Light & Dark Mode Toggle
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  };
  return (
    <>
      <Container>
        <Header theme={toggleTheme} />
      </Container>
    </>
  );
}

export default App;
