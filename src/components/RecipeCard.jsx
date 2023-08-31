import React from "react";
import "./RecipeCard.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import star from "../images/star.png";
import Image from "react-bootstrap/Image";
import { addFavorite } from "./Favorites";

const RecipeCard = (props) => {
  console.log(props.cardData);

  const addToFavorites = () => {
    addFavorite(props.cardData);
  };

  return (
    <Card className="main-card" style={{ width: "15rem" }}>
      <Card.Img variant="top" src={props.cardData.image} />
      <Card.Body>
        <Card.Title>{props.cardData.title}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item style={{ fontSize: "0.9rem" }}>
          You're missing {props.cardData.missedIngredientCount} ingredients
        </ListGroup.Item>
      </ListGroup>
      <Card.Body
        style={{
          fontSize: "0.9rem",
        }}
      >
        <Card.Link onClick={addToFavorites}>
          <Image src={star} width="28" height="28" fluid className="star" />
        </Card.Link>
        <Card.Link
          href={props.cardData.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Full Recipe
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
