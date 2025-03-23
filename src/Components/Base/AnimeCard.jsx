import { useEffect, useState } from 'react';
import { UseFetch } from '../../Hooks/Custome__hook';
import { TMDB } from '../../Clipboard/Clipboard';

export function AnimeCard({ path, page }) {
  const url = path + `&page=${page}`;
  const { data: res } = UseFetch(url);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (res && res.results) {
      setCards(res.results);
    }
  }, [res]);

  return displayCards(cards);
}
export const displayCards = (cards) => {
  return cards?.map((card, key) => {
    const { title, name, poster_path, id, vote_average, season_number, episode_number } = card;
    const url = `/Preview?id=${id}&media=${title ? 'movie' : 'tv'}`;
    return (
      <a
        key={key}
        className="card"
        href={url}
        id={id}
      >
        <span className="rate-score">
          {vote_average.toFixed(1)} <i className="fa-solid fa-star"></i>
        </span>
        <img
          loading="lazy"
          src={poster_path ? TMDB.img_url + poster_path : TMDB.DefaultCover}
          alt=""
          className="AnimeCover"
        />
        <h5 className="AnimeTitle">{title ? title : name}</h5>
        <div className="after-card">
          <div className="attitudes d-flex align-center justify-content-between"></div>
        </div>
      </a>
    );
  });
};