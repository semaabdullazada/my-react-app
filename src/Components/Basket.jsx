import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Basket.css";

const Basket = () => {
  const location = useLocation();
  const { favorites, listName } = location.state || {};

  return (
    <div className='container-list'>
      <h1 className='header-text'>Sonra izleyin listleri</h1>
      {listName && <h2>Listin adı: {listName}</h2>}
      {favorites && favorites.length > 0 ? (
        <ol className="custom-list">
          {favorites.map((fav) => (
            <li key={fav.imdbID}>
              {fav.Title} ({fav.Year})
              <div>
              <img
                src={fav.Poster}
                alt={fav.Title}
                className="film-poster"
              />
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p>Hələ heç bir sevimli əlavə edilməyib.</p>
      )}
      
    </div>
  );
};


export default Basket;
