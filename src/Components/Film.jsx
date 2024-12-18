import "./Film.css";
import filmImage from './Film.png';
import deleteImage from './deleteButton.png';
import searchB from './Search.png';
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Film() {
  const [film, setFilm] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState('');
  const [listName, setListName] = useState('');
  const [savedLists, setSavedLists] = useState([]);
  const key = "d95bb59f";
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query) return;
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${key}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setFilm(data.Search);
        } else {
          setFilm([]);
        }
      })
      .catch((error) => console.error(error));
  };

  const movies = () => {
    const randomFilmNames = ['Godfather', 'Batman', 'Titanic', 'Interstellar', 'Inception', 'Avengers', 'Gladiator', 'Wars', 'Toy Story', 'Joker'];
    const fetchPromises = randomFilmNames.map((name) => {
      return fetch(`https://www.omdbapi.com/?s=${name}&apikey=${key}`)
        .then((response) => response.json())
        .then((data) => {

          if (data.Search && data.Search.length > 0) {
            console.log(data);
            return data.Search[0];
          }
        })
        .catch((error) => console.error(error));
    });

    Promise.all(fetchPromises).then((movies) => {
      setFilm(movies.filter((movie) => movie));
    });
  };

  useEffect(() => {
    movies();
  }, []);

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites((prevFavorites) => [...prevFavorites, movie]);
    }
  };

  const handleDelete = (favToDelete) => {
    setFavorites(favorites.filter((fav) => fav !== favToDelete));
  };

  const saveButton = () => {
    if (listName.trim() === '' || favorites.length === 0) return;

    const newList = { name: listName, movies: favorites };
    setSavedLists([...savedLists, newList]);
    setFavorites([]);
    setListName('');
  };
  const goToBasket = (list) => {
    if (list.movies.length > 0) {
      navigate('/basket', { state: { favorites: list.movies, listName: list.name } });
    }
  };
    

  return (
    <>
      <div className="header">
        <div className="left-side">
          <img src={filmImage} className='icon' alt="Film Icon" />
          <h1>Film website</h1>
        </div>
        <div className='right-side'>
          <input
            type='text'
            placeholder='Film axtarın...'
            className='search-input'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <img
            src={searchB}
            className='searchB'
            alt='search-button'
            onClick={handleSearch}
          />
        </div>
      </div>

      <div className='container'>
        <div className="movie-list">
          {film.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} />
              <div className='about-film'>
                <div className='film-data'>
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                </div>
                <div className='favorite'>
                  <button className='add' 
                    onClick={() => addToFavorites(movie)} 
                    disabled={favorites.some((fav) => fav.imdbID === movie.imdbID)}>Add</button>
                  <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank"  rel="noreferrer">
                    <button className='add secondB'>
                      Go to film
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='add-section'>
          <div className='input-info'>
            <div className='input-info-left'>
              <h1>Elave edilenler:</h1>
            </div>
            <input
              type='text'
              className='list-name'
              placeholder='List adi daxil edin..'
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            
            <ol className='custom-list'>
              {favorites.map((fav) => (
                <li key={fav.imdbID}>
                  {fav.Title} ({fav.Year})
                  <img
                    src={deleteImage}
                    className='deleteB'
                    onClick={() => handleDelete(fav)}
                    alt='delete-button'
                  />
                </li>
              ))}
            </ol>
          </div>
          <div className='input-info-right' onClick={saveButton}>Save</div>

          <div className="saved-lists">
  {savedLists.map((list, index) => (
    <div key={index} className="saved-list">
      <h2>
        {list.name}
        <button className="add" onClick={() => goToBasket(list)}>Go to basket</button>
      </h2>
    </div>
  ))}
</div>

        </div>
      </div>
    </>
  );
}

export default Film;
