import { useState } from "react";

interface CardProps {
  name: string;
  number: number;
  imageUrl: string;
  favorite: boolean;
}

export default function Card({ name, number, imageUrl, favorite }: CardProps) {
  const [isFavorite, setFavorite] = useState(favorite);

  const toogleFavorite = (id: number) => {
    const favoriteList = localStorage.getItem("pokemon_favorites");
    console.log(favoriteList);
    setFavorite(!isFavorite);
    
    if (isFavorite) {
      console.log("add to favorites");
      localStorage.setItem("pokemon_favorites", favoriteList ? `${favoriteList},${id}` : `${id}`);

    } else {
      console.log("remove to favorites");
    }
  }



  return (
    <>
        <div className="card">
            <button 
            onClick={() => toogleFavorite(number)}
            className={`card__favorite ${isFavorite ? "active" : ""}`}>
                <img className={isFavorite ? "active" : ""} src="/assets/images/heart.svg" alt="heart" title="remove to favorites" />
                <img className={!isFavorite ? "active" : ""} src="/assets/images/heart_line.svg" alt="heart line" title="add to favorites" />
            </button>
            <a href={`/pokemon/${number}`}></a>
            <span className="card__number">#{ number > 9 ? `0${number}` : `00${number}` }</span>
            <img className="card__image" src={imageUrl} alt={name} />
            <div className="card__info">
                <h3>{name}</h3>
            </div>
        </div>
    </>
  )
}
