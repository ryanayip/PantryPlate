import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Navbar from "react-bootstrap/Navbar";
import star from "../images/star.png";
import RecipeCard from "./RecipeCard";

export const FAVORITES_KEY = "favorites_recipes";

export const getFavorites = () => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (recipe) => {
  const favorites = getFavorites();
  favorites.push(recipe);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const removeFavorite = (recipeId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

function Favorites() {
  const [favorites, setFavorites] = useState(getFavorites());
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setFavorites(getFavorites());
  }, [show]);

  return (
    <>
      <Navbar.Brand onClick={handleShow}>
        <img
          alt=""
          src={star}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Favorites</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          onClick={() => removeFavorite(e)}
          className="d-flex flex-column align-items-center gap-3"
        >
          {favorites.length ? (
            favorites.map((favorites) => {
              return <RecipeCard key={favorites.id} cardData={favorites} />;
            })
          ) : (
            <p>No favorites added yet!</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Favorites;
