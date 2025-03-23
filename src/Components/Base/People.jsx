import { useEffect, useState } from 'react';
import { UseFetch } from '../../Hooks/Custome__hook';
import { TMDB } from '../../Clipboard/Clipboard';

export function People({ path, page }) {
  const [people, setPeople] = useState([]);
  const url = path + `&page=${page}`;
  const { data: res } = UseFetch(url);

  useEffect(() => {
    if (res?.results) {
      setPeople(res.results);
    }
  }, [res]);

  const displayCards = () => {
    return people?.map((el) => {
      const { gender, id, known_for_department, name, original_name, popularity, profile_path } = el;
      return (
        <div key={id} className="personCard d-flex flex-column gap-1">
          <div className="personCover">
            <img
              src={profile_path ? TMDB.img_url + profile_path : TMDB.DefaultBackdrop}
              alt=""
              className="profile-img rounded-circle"
            />
            <div className="icons d-flex align-center justify-content-between">
              <span className="popularity">
                {popularity.toFixed(2)} <i className="fa-solid fa-chart-simple colored"></i>
              </span>
              <span className="gender">
                {gender === 1 ? (
                  <img src={TMDB.female_icon}  alt="" className="femail-con" />
                ) : (
                  <i className="fa-solid fa-mars"></i>
                )}
              </span>
            </div>
          </div>
          <div className="personData">
            <div className="d-flex align-items-center justify-content-between w-100">
              <span className="known_for">{known_for_department}</span>
              <span className="original_name">{name || original_name}</span>
            </div>
          </div>
        </div>
      );
    });
  };

  return <div className="carousel-cards-holder d-flex gap-4 scroller-x">{displayCards()}</div>;
}