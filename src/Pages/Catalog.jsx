import {useState,useRef,useEffect,useContext} from 'react'
import {UseFetch} from '../Hooks/Custome__hook';
import {CatalogContext} from '../Hooks/Custome__Contexts';
import {TMDB,api_key,base_Url} from '../Clipboard/Clipboard';
import {AnimeCard} from '../Components/Base/AnimeCard';
import '../Styles/Catalog.css';

export const isObject = item => typeof item === 'object' && item !== null && !Array.isArray
export default function Catalog() {
  const inputVal = useRef('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [discover, setDiscover] = useState(false);
  const [filter, setFilter] = useState(false);
  const [mainURL, setMainUrl] = useState(TMDB.Disc_api + api_key);
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);
 useEffect(()=>{console.log(results)})
  const PayLoadfunc = (data) => {
    const url = data.payload;
    setMainUrl(url);
    fetchSearchResults(url);
    console.log(url);
  };

  const handelMultiSearch = (e) => {
    e.preventDefault();
    setDiscover(false);
    setFilter(true);
    const query = inputVal.current.value;
    setQuery(query);
    const url = `https://api.themoviedb.org/3/search/multi?query=${query}&page=${page}&api_key=${api_key}`;
    setMainUrl(url);
    fetchSearchResults(url);
  };

  const fetchSearchResults = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      setResults(res.results);
    } catch (error) {
      setErrors((prev) => [...prev, error.message]);
    }
  };

  const displaysearchResults = () => {
    return results.map((card, key) => {
      const { id, name, poster_path, title, vote_average, profile_path,known_for_department } = card;
      const url = !known_for_department?`/Preview?id=${id}&media=${title?'movie':'tv'}`:`/Preview?id=${id}&media=person`;
      return (
        <a key={key} className="card CronolgyCard" href={url} id={id}>
          {!known_for_department &&<span className="rate-score">{vote_average&& vote_average.toFixed(1)} <i className="fa-solid fa-star"></i></span>}
          <img loading="lazy" src={poster_path||profile_path?`https://image.tmdb.org/t/p/original/${poster_path?poster_path:profile_path}`:TMDB.DefaultCover} alt="" className="AnimeCover" />
          <h5 className="AnimeTitle">{title|| name}</h5>
          <div className="after-card">
            <div className="attitudes d-flex align-center justify-content-between">
              {/* <span className="like-btn item-status"><i className="fa-solid fa-heart"></i></span>
              <span className="save-btn item-status"><i className="fa-solid fa-bookmark"></i></span> */}
            </div>
          </div>
        </a>
      );
    });
  };

  useEffect(() => {
    fetchSearchResults(mainURL);
  }, [mainURL, page]);

  return (
    <CatalogContext.Provider value={{ PayLoadfunc }}>
      {errors.length > 0 && (
        <div className="error-container">
          Ops Some thing Went Wrong !!! <em>check you conecxion</em>
        </div>
      )}
      {errors.length === 0 && (
        <section className="catalog-countainer mb-4">
          <div className="catalog-hedaer flex-between">
            <h1 className="catalog-title h1">Catalog</h1>
          </div>
          <div className="row">
            <div className="col-lg-2 catalog-column">
              <div className="row gap-1 accordion accordion-flush">
                <div className="accordion-filter col-6 col-sm-6 col-md-6 col-lg-12">
                  <div className="mb-3">
                    <label htmlFor="multi-search-value" className="form-label text text-align-center cursor-pointer">Search For Any</label>
                    <form onSubmit={handelMultiSearch} className="search4person w-100">
                      <input onChange={handelMultiSearch} ref={inputVal} alt='search for any thing (People | Tv Series | Movies...)' type="text" name="multi-search-value" id="multi-search-value" className="multi-search-value py-2 px-3" />
                    </form>
                  </div>
                </div>
                <MoviesList />
                <SeriesList />
                <GenresList />
                <PeopleList />
                <Trending />
              </div>
            </div>
            <div className="col-lg-10 catalog-column position-relative">
              <div className="cards-holder flex-center gap-3 pb-3">
                {results? displaysearchResults() : filter && <h1 className="colored text text-center">No Results Found !!!</h1>}
               {discover&&<AnimeCard path={mainURL} page={page} />}
              </div>
              <div className="d-grid gap-2 seemore-btn">
                <button className="btn btn-light" type="button" onClick={() => setPage((prev) => prev + 1)}>Show More</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </CatalogContext.Provider>
  );
}

function MoviesList() {
  const { PayLoadfunc } = useContext(CatalogContext);
  const handelSelect = (e) => {
    const value = e.target.value;
    const url = `${base_Url}movie${value}?api_key=${api_key}`;
    PayLoadfunc({ payload: url });
  };
  return (
    <div className="accordion-filter col-6 col-sm-6 col-md-6 col-lg-12">
      <div className="mb-3">
        <label htmlFor="" className="form-label text text-align-center">Movies Ordered by</label>
        <select className="form-select form-select-lg" name="MoviesList" onChange={handelSelect}>
          <option value="/now_playing">Now Playing</option>
          <option value="/popular">Popular</option>
          <option value="/top_rated">Top Rated</option>
          <option value="/upcoming">Up Coming</option>
        </select>
      </div>
    </div>
  );
}

function SeriesList() {
  const { PayLoadfunc } = useContext(CatalogContext);
  const handelSelect = (e) => {
    const value = e.target.value;
    const url = `${base_Url}tv${value}?api_key=${api_key}`;
    PayLoadfunc({ payload: url });
  };
  return (
    <div className='accordion-filter col-6 col-sm-6 col-md-6 col-lg-12'>
      <div className="mb-3">
        <label htmlFor="" className="form-label">Tv Serie Lists</label>
        <select className="form-select form-select-lg" name="tvLists" onChange={handelSelect}>
          <option value="/top_rated">Top Rated</option>
          <option value="/popular">Popular</option>
          <option value="/airing_today">Airing Today</option>
          <option value="/on_the_air">On The Air</option>
        </select>
      </div>
    </div>
  );
}


function GenresList(){
  const [genres,setGenres] = useState([]);
  const genres_url = TMDB.genre_list+api_key;
  const {data:gs} = UseFetch(genres_url);

  const { PayLoadfunc } = useContext(CatalogContext);
  const handelSelect = (e) => {
    const value = e.target.value;
    const url = TMDB.Disc_api+api_key+`&with_genres=${value}`;
    PayLoadfunc({ payload: url });
  };
  const DisplayGenresOptions =()=>{
    return (
                <select
                  className="form-select form-select-lg"
                  name="Genre"
                  onChange={handelSelect}
                >
                  <option value={null}>All</option>
                  { genres?.map((el,key) =>{
                      return <option key={key} id={el.d} value={el.id}>{el.name}</option>
                  })}
           </select>
    )
  }
  useEffect(()=>{
    setGenres(gs.genres);
  },[gs]);
  return (
    <div className="accordion-filter col-6 col-sm-6 col-md-6 col-lg-12">
        <div className="mb-3">
          <label htmlFor="" className="form-label text text-align-center">Genres</label>
          {DisplayGenresOptions()}
        </div>
    </div>
  )
}


function PeopleList(){
  const {PayLoadfunc} = useContext(CatalogContext);
  const handelSelect = (e) => {
    const value = e.target.value;
    const url = base_Url+value+'?api_key='+api_key;
    PayLoadfunc({ payload: url });
  };
  return (
    <div className="accordion-filter col-6 col-sm-6 col-md-6 col-lg-12">
      <div className="mb-3">
          <label htmlFor="" className="form-label text text-align-center">People </label>
          <select
            className="form-select form-select-lg"
            name="people"
            onChange={handelSelect}
          >
             <option value={null}>Select</option>
            <option value="person/popular" >Popular People</option>
            {/* <option value="person/latest" className='disabled'>Latest People</option> */}
          </select>
      </div>
    </div>
  )
}
function Trending(){
  const {PayLoadfunc} = useContext(CatalogContext);
  const trend_type = useRef('all');
  const trend_window = useRef('week');
  const handelSelect = (e)=>{
    e.preventDefault();
    const ends = { 
      type:trend_type.current.value,
      window: trend_window.current.value,
     };
    const {type,window} = ends;
    const url = `https://api.themoviedb.org/3/trending/${type}/${window}?language=en-US&api_key=03760268c2411e2d785ed677c960080d`;
    PayLoadfunc({ payload: url });
  }
  return (
         <div className="accordion-filter mb-3 col-4 col-sm-6 col-md-6 col-lg-12">
                <label htmlFor="" className="form-label">Trending</label>
               <div className="row gap-1">
                    <select
                        onChange={handelSelect}
                        className="form-select form-select-lg col-6 col-sm-6 col-md-6 col-lg-6"
                        name="trend_window"
                        ref={trend_window}
                      >
                          <option value="week" defaultValue>Week</option>
                          <option value="day" >Day</option>
                      </select>
                      <select
                          onChange={handelSelect}
                          className="form-select form-select-lg col-6 col-sm-6 col-md-6 col-lg-6"
                          name="trend_type"
                          ref={trend_type}
                    >
                            <option value="all" defaultValue>All</option>
                            <option value="movie">Movies</option>
                            <option value="tv">TV Series</option>
                            <option value="person">People</option>
                    </select>
               </div>
                
        </div>
  )
}