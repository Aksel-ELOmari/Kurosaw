import {createContext, useContext, useEffect, useState} from 'react';
import {UseFetch}  from '../Hooks/Custome__hook';
import {NewCollection} from '../Components/Coll/NewCollection';
import OverviewComp from '../Components/Prev/Overview';
import {Person} from '../Components/Prev/Person';
import {AnimeCard} from '../Components/Base/AnimeCard';
import {TMDB,base_Url,api_key,getQueryParam} from '../Clipboard/Clipboard';
import Characters from '../Components/Prev/Characters';
import Player from '../Components/Prev/Player';
import Reviews from '../Components/Prev/Reviews';
import '../Styles/Preview.css'
import adult_icon from '../media/number-18.png';
import { AppContext } from '../Hooks/Custome__Contexts';
//  context
export const PreviewContext = createContext();
const icon_style = {height:'1.5rem',}

export default function Preview() {
    const { handleDisplayNewColl, newColl, setNewColl } = useContext(AppContext);
    const [player, setPlayer] = useState(false);
    const [video, setVideo] = useState(true);

    // Fetching the card
    const id = getQueryParam('id');
    const season_number = getQueryParam('season_number');
    const media = getQueryParam('media') || 'movie';
    const itemId = { item_id: id, item_media: media };
    let restUrl = season_number?`/season/${season_number}`:'';
    const url = `${base_Url + media}/${id}${restUrl}?api_key=${api_key}`;
    const { data: res, error } = UseFetch(url);

    console.log(res);
    const handleDisplayPlayer = () => {
        setNewColl(false);
        setPlayer(!player);
    };

    useEffect(() => {
        if (newColl) {
            setPlayer(false);
        }
    }, [newColl]);

    // Handle errors from the UseFetch hook
    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    return (
        <PreviewContext.Provider
            value={{ res, media, itemId, handleDisplayPlayer, video, setVideo, setPlayer }}
        >
            {newColl ? (
                <NewCollection action={handleDisplayNewColl} />
            ) : (
                <PreviewApp />
            )}
            {player && <Player action={handleDisplayPlayer} />}
        </PreviewContext.Provider>
    );
}
function PreviewApp(){
  const {media} = useContext(PreviewContext);
  return (
    <>
      {media !== 'person' ? (
        <>
          <PreviewHeader />
          <PreviewBody />
        </>
      ) : <Person />}
    </>
  );
}

// preview header Component
function PreviewHeader() {
  const { res,media, handelDisplayPlayer,video } = useContext(PreviewContext);
  const {handelDisplayNewColl} = useContext(AppContext);
  const {modifyCollectionIds } = useContext(AppContext)
  const handelSavingId = (e)=>{
    e.preventDefault();
    const id = e.currentTarget.getAttribute('data-item-id');
    const collName = e.currentTarget.getAttribute('data-coll-name');
    const action = e.currentTarget.getAttribute('data-func-action');
    const itemId = {item_id:id,item_media:media};
    modifyCollectionIds(collName, action, itemId)
  }
  const createHTML = () => {
    const {
      adult,
      id,
      backdrop_path,
      overview,
      poster_path,
      release_date,
      first_air_date,
      title,
      name,
      genres,
      homepage,
      vote_average,
      vote_count,
      seasons,
      // seasons
      episode_count,
      air_date,
      // episodes
      episodes,
      production_code,
      runtime,
      still_path,
    } = res;

    return (
      <>
        <header>
          <div className="hero-backdropCover">
              <img
                loading="lazy"
                src={backdrop_path ? TMDB.img_url + backdrop_path : TMDB.DefaultBackdrop}
                alt=""
              />
            </div>
          <div className="hero-section h-100 w-100">
            <div className="hero-body" id="MainAnimeHolder">
              <div className="hero-body_inner d-flex align-items-center gap-5">
                <div className="animeCover">
                  <img
                    src={poster_path ? TMDB.img_url + poster_path : TMDB.DefaultCover}
                    alt=""
                    className="animeCover__inner"
                  />
                </div>
                <div className="hero-content">
                  <h1 className="h1 animeTitle my-3 fw-bolder" id="mainAnimeTitle">
                    {title ? title : name}
                  </h1>
                  <div className="anime-dethails d-flex align-items-center gap-2 flex-wrap my-2">
                    {adult && <img src={adult_icon} style={icon_style} loading="lazy" alt="" />}
                    <span className="anime-data anime-rate">
                      {vote_average && vote_average.toFixed(1)}
                      <i className="fa-solid fa-star mx-1"></i>
                      {`(${vote_count})`}
                    </span>
                    <span className="anime-data anime-date">
                      {release_date ? release_date.split('-').join('/') : first_air_date?air_date:''}
                    </span>
                    {episode_count&&<span>Episode Count :{episode_count}</span>}
                    {runtime&&<span>Runtime :{runtime}</span>}
                    <span className="anime-data anime-type">{title ? 'Movie' : 'Serie'}</span>
                  </div>
                  <div className="anime-genres d-flex align-items-center gap-2 flex-wrap mb-2">
                    {genres &&
                      genres.map((el, key) => (
                        <span key={key} className="special-btn">
                          {el.name}
                        </span>
                      ))}
                  </div>
                  <p className="anime-overview  fw-400">{overview}</p>
                  <div className="hero-buttons">
                    <div className="hero-buttons_inner">
                      <div className="gap-1">
                        <button
                          type="button"
                          title="btn"
                          className="liked-btn mx-2 attitude btn btn-light my-2"
                          data-parent-id={id}
                          data-coll-name="LikedContent"
                          data-func-action="add"
                          onClick={handelSavingId}
                        >
                          Like
                        </button>
                        <button
                          type="button"
                          title="btn"
                          className="saved-btn mx-2 attitude btn btn-light my-2"
                          data-parent-id={id}
                          data-coll-name="SavedContent"
                          data-func-action="add"
                          onClick={handelSavingId}
                          >
                          Save
                        </button>
                        <button
                          title="watch trailer"
                          type="button"
                          className={`btn btn-light watchTrailer_btn ${!video&&"disabled"}`}
                          onClick={handelDisplayPlayer}
                        >
                          Watch Trailer
                        </button>
                        <a
                          href={homepage ? homepage : '#'}
                          type="button"
                          title="btn"
                          className={`mx-2 attitude btn btn-outline-light my-2 ${!homepage&&"disabled"}`}
                        >
                          Watch Now
                        </a>
                      </div>
                      <div className="addToColl-btn">
                        <button
                          type="button"
                          title="btn"
                          className="btn btn-light createNewColl-btn"
                          onClick={handelDisplayNewColl}
                        >
                          Add To Collection
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             { episodes||seasons&&<section className="Discover-section my-3">
                    <h1 className="colored">Seasons :</h1>
                    <div className="carousel-countainer relative">
                      <div className="arrows-holder flex-between">
                        <i className="fa-solid flex-center justify-content-center arrow fa-arrow-left"></i>
                        <i className="fa-solid flex-center justify-content-center arrow fa-arrow-right"></i>
                      </div>
                      <div className="carousel-cards-holder d-flex flex-center gap-3 pb-3">
                        { episodes||seasons?.map((el,key)=>{
                          const {vote_average,poster_path,title,name} = el;
                          return (
                            <>
                            <div className='card' key={key}>
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
                                  </div>
                            </>
                          )
                        })}
                      </div>
                    </div>
              </section>}
            </div>
          </div>
        </header>
      </>
    );
  };

  return createHTML();
}

// Preview Body Component;
function PreviewBody() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [specialPage, setSpecialPage] = useState(1);
  const {res, player,media } = useContext(PreviewContext);
  const recommendUrl = `https://api.themoviedb.org/3/${media}/${res.id}/recommendations?language=en-US&api_key=`;
  useEffect(() => {
    if (player) {
      setActiveTab('');
    } else {
      setActiveTab('Overview');
    }
  }, [player]);

  const toggleSpecialPages = (e) => {
    const parentClass = e.target.getAttribute('data-parentname');
    const parent = document.querySelector(`.${parentClass} .carousel-cards-holder`);
    if (!parent) return;
    const scrollAmount = e.target.classList.contains('fa-arrow-right') ? 300 : -300;
    parent.scrollBy({ top: 0, left: scrollAmount, behavior: 'smooth' });

    if (e.target.classList.contains('fa-arrow-right') && parent.scrollLeft < (parent.scrollWidth - parent.clientWidth)) {
      setSpecialPage((prev) => prev + 1);
    } else if (e.target.classList.contains('fa-arrow-left') && parent.scrollLeft > 0) {
      setSpecialPage((prev) => (prev > 1 ? prev - 1 : prev));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewComp />;
      case 'Discover':
        return (
          <section className="Discover-section">
            <h2 className="colored">Recommendations :</h2>
            <div className="carousel-countainer relative">
              <div className="arrows-holder flex-between">
                <i className="fa-solid flex-center justify-content-center arrow fa-arrow-left" onClick={toggleSpecialPages}></i>
                <i className="fa-solid flex-center justify-content-center arrow fa-arrow-right" onClick={toggleSpecialPages}></i>
              </div>
              <div className="carousel-cards-holder d-flex d-flex flex-center gap-3 pb-3">
                <AnimeCard page={specialPage} path={`${recommendUrl+api_key}`} />
              </div>
            </div>
          </section>
        );
      case 'Characters':
        return <Characters  />;
      case 'Reviews':
        return <Reviews />;
      default:
        return null;
    }
  };

  return (
    <>
      <section className="tooltaps-cards-section container bg-linear">
        <div className="countainers-holder">
          <div className="tooltaps-btns-holder d-flex flex-wrap gap-1 mb-2">
            {['Overview', 'Discover', 'Characters', 'Reviews'].map((tab) => (
              <div className="btn-lg mx-1" key={tab}>
                <button type="button" title="toggle-btn" className="btn btn-secondary" onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              </div>
            ))}
          </div>
          {renderTabContent()}
        </div>
      </section>
    </>
  );
}
