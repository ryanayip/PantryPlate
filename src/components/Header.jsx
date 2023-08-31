import React from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Favorites from "./Favorites";

const Header = (props) => {
  return (
    <>
      <Navbar>
        <Favorites />
        <Container className="d-flex justify-content-center align-items-center flex-column p-4">
          <div id="logo-font">PantryPlate</div>
          <div className="slogan-text">
            Craft dishes from what's already in your kitchen
          </div>
        </Container>
        <label className="switch">
          <input type="checkbox" id="modeToggle" onClick={props.theme} />
          <span className="slider round"></span>
        </label>
      </Navbar>
    </>
  );
};

export default Header;
