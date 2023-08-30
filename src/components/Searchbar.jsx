import React, { useState, useEffect } from "react";
import "./Searchbar.css";
import bgimg from "../images/bgimage.jpg";
import axios from "axios";
const apiKey = "d830444678ec4629854c2b21debbe72a";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import RecipeCard from "./RecipeCard";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(
          `https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&apiKey=${apiKey}`
        )
        .then((response) => {
          const ingredients = response.data.map(
            (ingredient) => ingredient.name
          );
          setSuggestions(ingredients);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const searchWithSelectedIngredients = () => {
    const ingredientsString = selectedIngredients.join(",");
    axios
      .get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&apiKey=${apiKey}`
      )
      .then((response) => {
        console.log(response.data);
        setCardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes based on ingredients:", error);
      });
  };

  const handleSuggestionClick = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setQuery("");
    setSuggestions([]);
  };

  const handleDeleteIngredient = (ingredientToRemove) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

  return (
    <>
      <div className="image-cont" style={{ backgroundImage: `url(${bgimg})` }}>
        <div className="search-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for an ingredient..."
            className="search-input"
          />
          {suggestions.length > 0 && (
            <div className="suggestions-list">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          <div className="selected-ingredients-list">
            {selectedIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="selected-ingredient"
                onClick={() => handleDeleteIngredient(ingredient)}
              >
                {ingredient}
              </span>
            ))}
          </div>

          {selectedIngredients.length > 0 && (
            <Button
              className="search-btn"
              onClick={searchWithSelectedIngredients}
            >
              Find Recipes
            </Button>
          )}
        </div>
      </div>
      {/* Recipe Cards */}
      <Container className="mt-5">
        <RecipeCard cardData={cardData} />
      </Container>
    </>
  );
};

export default Searchbar;
