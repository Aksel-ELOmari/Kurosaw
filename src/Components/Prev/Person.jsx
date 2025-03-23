import { useEffect, useState } from 'react';
import { TMDB, api_key, getQueryParam,calculateAge } from '../../Clipboard/Clipboard';
import { UseFetch } from '../../Hooks/Custome__hook';

export function Person() {
  const [person, setPerson] = useState({});
  const id = getQueryParam('id');
  const media = getQueryParam('media');
  const url = `https://api.themoviedb.org/3/${media}/${id}?api_key=${api_key}&page=1`;
  const { data: res } = UseFetch(url);

  const fetchPerson = () => {
    if (res) {
      setPerson(res);
    }
  };

  useEffect(() => {
    fetchPerson();
  }, [res]);

  const createHTML = () => {
    const {
      also_known_as = [],
      biography,
      birthday,
      gender,
      homepage,
      id,
      deathday,
      known_for_department,
      name,
      place_of_birth,
      popularity,
      profile_path,
    } = person;
   const age = calculateAge(birthday);
    return (
      <>
        <header>
          <div className="hero-backdropCover">
            <img
              loading="lazy"
              src={TMDB.DefaultBackdrop}
              alt=""
            />
          </div>
          <div className="hero-section h-100 w-100 bg-linear">
            <div className="hero-body" id="MainAnimeHolder">
              <div className="hero-body_inner flex align-items-center gap-5">
                <div className="animeCover">
                  <a href={homepage} alt="Portfolio" className='cursor-pointer text-decoration-none'>
                    <img
                      src={profile_path ? TMDB.img_url + profile_path : TMDB.DefaultCover}
                      alt=""
                      className="animeCover__inner"
                    />
                  </a>
                </div>
                <div className="hero-content">
                  <h1 className="h1 animeTitle my-3 fw-bolder" id="mainAnimeTitle">
                    {name}
                  </h1>
                  <div className="nikNames mb-2">
                    {also_known_as.map((el, key) => (
                      <p key={key} className="m-1 special-btn">
                        {el}
                      </p>
                    ))}
                  </div>
                  <div className="personDethails">
                    <span className=" mx-2 gender">
                      {gender === 1 ? (
                        <img src={TMDB.female_icon} alt="" className="femail-con" />
                      ) : (
                        <i className="fa-solid fa-mars"></i>
                      )}
                    </span>
                    <span className=" mx-2 job">{known_for_department}</span>
                    <span className=" mx-2 popularity">
                      {popularity} <i className="fa-solid fa-chart-simple colored"></i>
                    </span>
                    {place_of_birth&&<span className="mx-2  place_of_birth">from {place_of_birth}</span>}
                    <span className="mx-2  birthday">{birthday} ( {age} years )</span>
                    {deathday && <span className="mx-2 deathday">Died at {deathday} ( {age} years )</span>}
                  </div>
                  <p className="Biography line-clamp" title={biography}>{biography}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  };

  return createHTML();
}