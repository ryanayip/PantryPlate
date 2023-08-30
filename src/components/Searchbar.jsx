import React, { useState, useEffect } from "react";
import "./Searchbar.css";
import bgimg from "../images/bgimage.jpg";
import axios from "axios";
const apiKey = "d830444678ec4629854c2b21debbe72a";
import Button from "react-bootstrap/Button";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
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
          console.log(response.data.map((ingredient) => ingredient.name));
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const searchWithSelectedIngredients = () => {
    const ingredientsString = selectedIngredients.join(","); // Convert the array to a comma-separated string
    axios
      .get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&apiKey=${apiKey}`
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes based on ingredients:", error);
      });
  };

  const handleSuggestionClick = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setQuery(""); // Clear the search input
    setSuggestions([]); // Clear suggestions
  };

  const handleInputChange = (e) => {
    e.preventDefault(); // Prevents the page from refreshing on 'Enter' key press
    setQuery(e.target.value);
  };
  return (
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
            <span key={index} className="selected-ingredient">
              {ingredient}
            </span>
          ))}
        </div>

        {/* Button to search using the selected ingredients */}
        {selectedIngredients.length > 0 && (
          <Button onClick={searchWithSelectedIngredients}>
            Search with selected ingredients
          </Button>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
