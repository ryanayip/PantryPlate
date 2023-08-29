import React from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <>
      <Navbar>
        <Container className="d-flex justify-content-center align-items-center flex-column p-4">
          <div id="logo-font">PantryPlate</div>
          <div className="slogan-text">
            Craft dishes from what's already in your kitchen
          </div>
        </Container>
        <label class="switch">
          <input type="checkbox" id="modeToggle" />
          <span class="slider round"></span>
        </label>
      </Navbar>
    </>
  );
};

export default Header;
