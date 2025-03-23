import React, { useContext,useState } from 'react';
import { TMDB, api_key } from '../Clipboard/Clipboard';
import { AnimeCard } from '../Components/Base/AnimeCard';
import { AppContext } from '../Hooks/Custome__Contexts';
import '../Styles/User.css';

export default function User() {
  const { user, LogOutFunc } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('To Watch');

  const togglepage = () => {
    setPage((prev) => prev + 1); // Increment page
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Watching':
        return <AnimeCard page={page} path={TMDB.Disc_api + api_key} />;
      case 'To Watch':
        return <AnimeCard page={page} path={TMDB.Top_api + api_key} />;
      case 'Watched':
        return <AnimeCard page={page} path={TMDB.Pop_api + api_key} />;
      case 'Collections':
        return <AnimeCard page={page} path={TMDB.Lat_api + api_key} />;
      default:
        return null;
    }
  };


  return (
    <>
      <section className="user-section">
        <div className="user-Cover">
          <img src={TMDB.DefaultBackdrop} alt="User Cover" className="user_backdropCover" />
        </div>
        <div className="row d-flex align-items-center">
          <div className="col-10">
            <div className="hero-user">
              <img src={user ? user.photoURL : TMDB.Cover} alt="User Profile" className="user-profile" />
              <div className="user-info flex-column">
                <h3 className="user-name mb-1">{user ? user.user_name : 'Guest'}</h3>
                <div className="user-score d-flex gap-2">
                  <span className="user-followings">0 following</span>
                  <span className="user-followers">0 followers</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <button
              type="button"
              className="Logout_btn btn btn-outline-danger"
              onClick={LogOutFunc}
            >
              Log Out
            </button>
          </div>
        </div>
        <div style={{ clear: 'both' }}></div>
      </section>
      <section className="user-histoty-score first-section">
        <div className="row user-erea-header mb-3">
          <div className="col col-12">
            <div className="d-flex flex-center gap-3">
              {['Watching', 'To Watch', 'Watched', 'Collections'].map((tab) => (
                <button
                  key={tab}
                  className={`btn btn-dark white-space-nowrap ${
                    activeTab === tab ? 'active' : ''
                  }`}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="cards-holder d-flex flex-center gap-3 pb-3">
          {renderTabContent()}
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-light show-more-btn show-more-pop"
            data-parentname="popular-section"
            type="button"
            onClick={togglepage}
          >
            Show More
          </button>
        </div>
      </section>
    </>
  );
}

const Offcanvas = ()=>{
  return (
  <>
        <button
          className="OpenOffcnvas_btn"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
        >open offcanas</button>
        <section class="offcanvases_container">
          <div
            className="offcanvas offcanvas-start bg-dark text-white open"
            data-bs-scroll="true"
            tabindex="-1"
            id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel"
          >
            <div class="offcanvas_main-container container py-4">
              <div class="top-offcanvas mb-4">
                <div class="d-flex align-center flex-column">
                  <img
                    src="./imgs/Profile/Profile-img.jpg"
                    alt=""
                    className="offcanvas_profile top-user-cover"
                  />
                  <div class="user-name mt-2 fw-bold"></div>
                </div>
              </div>
              <div class="middel-offcanvas">
                <div class="offcanvas-documents">
                  <div class="offcanvas-docs">
                    <div
                      className="offcanvas-doc ps-2 active cursor-pointer d-flex mb-2 gap-3"
                      data-name="Latest Content"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#my-docs-offcanvas"
                      aria-controls="offcanvasWithBothOptions"
                      data-target="my-docs-offcanvas"
                    >
                      <i class="fa-solid fa-fire"></i>
                      <p class="doc-main">Latest Content</p>
                    </div>
                    <div
                      className="offcanvas-doc ps-2 cursor-pointer d-flex mb-2 gap-3"
                      data-name="Movies Listes"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#my-docs-offcanvas"
                      aria-controls="offcanvasWithBothOptions"
                      data-target="my-docs-offcanvas"
                    >
                      <i class="fa-solid fa-film"></i>
                      <p class="doc-main">Movies Listes</p>
                    </div>
                    <div
                      className="offcanvas-doc ps-2 cursor-pointer d-flex mb-2 gap-3"
                      data-name="Series Listes"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#my-docs-offcanvas"
                      aria-controls="offcanvasWithBothOptions"
                      data-target="my-docs-offcanvas"
                    >
                      <i class="fa-solid fa-tv"></i>
                      <p class="doc-main">Series Listes</p>
                    </div>
                    <div
                      className="offcanvas-doc ps-2 cursor-pointer d-flex mb-2 gap-3"
                      data-name="Most Trending"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#my-docs-offcanvas"
                      aria-controls="offcanvasWithBothOptions"
                      data-target="my-docs-offcanvas"
                    >
                      <i class="fa-solid fa-chart-simple"></i>
                      <p class="doc-main">Most Trending</p>
                    </div>
                    <div
                      className="offcanvas-doc ps-2 cursor-pointer d-flex mb-2 gap-3"
                      data-name="My Collections"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#my-docs-offcanvas"
                      aria-controls="offcanvasWithBothOptions"
                      data-target="my-docs-offcanvas"
                    >
                      <i class="fa-solid fa-bars-progress"></i>
                      <p class="doc-main">My Collections</p>
                    </div>
                    <div
                      className="offcanvas-doc ps-2 cursor-pointer d-flex mb-2 gap-3"
                      data-name="Settings"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#my-docs-offcanvas"
                      aria-controls="offcanvasWithBothOptions"
                      data-target="my-docs-offcanvas"
                    >
                      <i class="fa-solid fa-gear"></i>
                      <div class="doc-main">Settings</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="last-offcanvas mt-4">
                <div class="About_Us">
                  <div class="flex-center gap-5">
                    <div class="cursor-pointer flex mb-2 align-center gap-3">
                      <i class="fa-solid fa-rocket"></i>
                      <a
                        href="https://aksel-elomari.github.io/Portfolio/"
                        rel="noreferrer"
                        target="_blank"
                        className="text-decoration-none doc-main"
                        >Our Apps</a>
                    </div>
                    <div class="cursor-pointer flex mb-2 align-center gap-3">
                      <button
                        type="button"
                        className="Logout_btn btn btn-outline-danger d-none"
                        onclick="logoutUser(this)"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                  <div class="Social_links">
                    <h4 class="colored mb-2 fw-400">Follow Us On :</h4>
                    <div class="social_link d-flex align-items-center gap-2">
                      <span
                        className="link-inner cursor-pointer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Facebook"
                      >
                        <i class="fa-brands fa-facebook-f"></i>
                      </span>
                      <span
                        className="link-inner cursor-pointer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Instagram"
                      >
                        <i class="fa-brands fa-instagram"></i>
                      </span>
                      <span
                        className="link-inner cursor-pointer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="You Tube"
                      >
                        <i class="fa-brands fa-youtube"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  </>
  )
}

const CustomeOffcanvas = ()=>{
  return (<>
   {/* ########## My Ofcnvas ########  */}
   <div
            className="offcanvas my-docs-offcanvas offcanvas-start bg-dark text-light p-3"
            data-bs-scroll="true"
            tabindex="-1"
            id="my-docs-offcanvas"
            aria-labelledby="moffcanvasWithBothOptionsLabel"
          >
            <div class="top-offcanvas mb-4 offcanvas-nav">
              <nav class="d-flex align-items-center justify-content-between">
                <div
                  className="leavOffCanvas_btn cursor-pointer"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#my-docs-offcanvas"
                  aria-controls="offcanvasWithBothOptions"
                  data-target="my-docs-offcanvas"
                >
                  <i class="fa-solid fa-door-open"></i>
                </div>
                <div id="myoffcanvasDocName">Movies Lists</div>
                <ldiv
                  className="myoffcanvasSearch-icon cursor-pointer"
                  data-target="docs_search-field">
                  <i class="fa-solid fa-magnifying-glass"></i></ldiv>
              </nav>
            </div>
            <div class="MyOffcanvas-body offcanvasDocs-container">
              {/* Docs Placehoder */}
              <div id="offcanvasDocs-inner py-2 "></div>
            </div>
          </div>
  </>)
}