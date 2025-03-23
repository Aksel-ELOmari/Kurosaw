import React, { useState, useEffect } from 'react';
import { TMDB } from '../../Clipboard/Clipboard';
import { UseFetch } from '../../Hooks/Custome__hook';
function generateId() {
  return Math.floor(Math.random() * 1000000);
}

export default function MainCard({ media }) {
  const [ismovie, setIsmovie] = useState(null);
  const [id, setId] = useState(generateId());
  const url = `https://api.themoviedb.org/3/${media}/${id}?api_key=03760268c2411e2d785ed677c960080d`;
  const { data: res } = UseFetch(url);
  const movie = res;

  const isValidMovie = (movie) => {
    return movie && !movie.adult && (movie.title || movie.name);
  };

  useEffect(() => {
    if (res) {
      if (!isValidMovie(res)) {
        setId(generateId());
      } else {
        setIsmovie(true);
     
      }
    }
  }, [res]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setId(generateId());
    }, 300000); // 5 mn

    return () => clearInterval(intervalId);
  }, []);

  const displayMainCard = () => {
    if (!movie || !isValidMovie(movie)) {
      return <>
       <div className='hero-section d-flex align-items-center justify-content-center'>
       <div className="hero-Cover">
            <img
              src={TMDB.DefaultBackdrop}
              alt=""
              id="HeaderCover"
            />
          </div>
       </div>
      
      </>;
    }

    const {
      homepage,
      id,
      original_title,
      original_name,
      overview,
      poster_path,
      title,
      name,
    } = movie;

    return (
      <section className="hero-section">
        <div className="hero-content" id="main_card_holder">
          <div className="hero-Cover">
            <img
              src={poster_path ? TMDB.img_url + poster_path : TMDB.DefaultBackdrop}
              alt=""
              id="HeaderCover"
            />
          </div>
          <div className="hero-card mt-5">
            <h1 className="hero-title">{title || name}</h1>
            <h5 className="hero-title">{original_title || original_name}</h5>
            <p className="hero-preview line-clamp">{overview}</p>
            <div className="her-btns">
              <a href="/Preview" type="button" className="btn mx-2 btn-outline-light">
                <i className="fa-regular fa-bookmark mx-1"></i>
                Learn more
              </a>
              <a
                href={homepage ? homepage : `/Preview?id=${id}&media=${title ? 'movie' : 'tv'}`}
                type="button"
                className="btn mx-2 btn-dark"
              >
                <i className="fa-regular fa-eye mx-1"></i>Watch
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return displayMainCard();
}