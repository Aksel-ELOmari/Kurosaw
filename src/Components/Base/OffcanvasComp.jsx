import { useContext } from "react";
import AppContext from '.../../App';

export function OffcanvasComp(){
    const {LogOutFunc} = useContext(AppContext);

    return (
        <>
          <section className="offcanvases_container">
        <div
          className="offcanvas offcanvas-start bg-dark text-white open"
          data-bs-scroll="true"
          tabIndex="-1"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <div className="offcanvas_main-container container py-4">
            <div className="top-offcanvas mb-4">
              <div className="d-flex align-center flex-column">
                <img
                  src="./imgs/Profile/Profile-img.jpg"
                  alt=""
                  className="offcanvas_profile top-user-cover"
                />
                <div className="user-name mt-2 fw-bold"></div>
              </div>
            </div>
            <div className="middel-offcanvas">
              <div className="offcanvas-documents">
                <div className="offcanvas-docs">
                  <div
                    className="offcanvas-doc ps-2 active cursor-pointer d-flex mb-2 gap-3"
                    data-name="Latest Content"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#my-docs-offcanvas"
                    aria-controls="offcanvasWithBothOptions"
                    data-target="my-docs-offcanvas"
                  >
                    <i className="fa-solid fa-fire"></i>
                    <p className="doc-main">Latest Content</p>
                  </div>
                  <div
                    className="offcanvas-doc ps-2 cursor-pointer d-flex mb-2 gap-3"
                    data-name="Movies Listes"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#my-docs-offcanvas"
                    aria-controls="offcanvasWithBothOptions"
                    data-target="my-docs-offcanvas"
                  >
                    <i className="fa-solid fa-film"></i>
                    <p className="doc-main">Movies Listes</p>
                  </div>
                  <div
                    className="offcanvas-doc ps-2 cursor-pointer d-flex mb-2 gap-3"
                    data-name="Series Listes"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#my-docs-offcanvas"
                    aria-controls="offcanvasWithBothOptions"
                    data-target="my-docs-offcanvas"
                  >
                    <i className="fa-solid fa-tv"></i>
                    <p className="doc-main">Series Listes</p>
                  </div>
                  <div
                    className="offcanvas-doc ps-2 cursor-pointer d-flex mb-2 gap-3"
                    data-name="Most Trending"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#my-docs-offcanvas"
                    aria-controls="offcanvasWithBothOptions"
                    data-target="my-docs-offcanvas"
                  >
                    <i className="fa-solid fa-chart-simple"></i>
                    <p className="doc-main">Most Trending</p>
                  </div>
                  <div
                    className="offcanvas-doc ps-2 cursor-pointer d-flex mb-2 gap-3"
                    data-name="My Collections"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#my-docs-offcanvas"
                    aria-controls="offcanvasWithBothOptions"
                    data-target="my-docs-offcanvas"
                  >
                    <i className="fa-solid fa-bars-progress"></i>
                    <p className="doc-main">My Collections</p>
                  </div>
                  <div
                    className="offcanvas-doc ps-2 cursor-pointer d-flex mb-2 gap-3"
                    data-name="Settings"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#my-docs-offcanvas"
                    aria-controls="offcanvasWithBothOptions"
                    data-target="my-docs-offcanvas"
                  >
                    <i className="fa-solid fa-gear"></i>
                    <div className="doc-main">Settings</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="last-offcanvas mt-4">
              <div className="About_Us">
                <div className="flex-center gap-5">
                  <div className="cursor-pointer flex mb-2 align-center gap-3">
                    <i className="fa-solid fa-rocket"></i>
                    <a href="https://aksel-elomari.github.io/Portfolio/"
                      rel="noreferrer"
                      target="_blank"
                      className="text-decoration-none doc-main"
                    >
                      Our Apps
                    </a>
                  </div>
                  <div className="cursor-pointer flex mb-2 align-center gap-3">
                    <button
                      type="button"
                      className="Logout_btn btn btn-outline-danger d-none"
                      onClick={LogOutFunc()}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
                <div className="Social_links">
                  <h4 className="colored mb-2 fw-400">Follow Us On :</h4>
                  <div className="social_link d-flex align-items-center gap-2">
                    <span
                      className="link-inner cursor-pointer"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Facebook"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </span>
                    <span
                      className="link-inner cursor-pointer"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Instagram"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </span>
                    <span
                      className="link-inner cursor-pointer"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="You Tube"
                    >
                      <i className="fa-brands fa-youtube"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="offcanvas my-docs-offcanvas offcanvas-start bg-dark text-light p-3"
          data-bs-scroll="true"
          tabIndex="-1"
          id="my-docs-offcanvas"
          aria-labelledby="moffcanvasWithBothOptionsLabel"
        >
          <div className="top-offcanvas mb-4 offcanvas-nav">
            <nav className="d-flex align-items-center justify-content-between">
              <div
                className="leavOffCanvas_btn cursor-pointer"
                data-bs-toggle="offcanvas"
                data-bs-target="#my-docs-offcanvas"
                aria-controls="offcanvasWithBothOptions"
                data-target="my-docs-offcanvas"
              >
                <i className="fa-solid fa-door-open"></i>
              </div>
              <div id="myoffcanvasDocName">Movies Lists</div>
              <div
                className="myoffcanvasSearch-icon cursor-pointer"
                data-target="docs_search-field"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </nav>
            <div className="docs_search-field d-none" id="docs_search-field">
              <form id="searchOffcanvas">
                <input
                  type="search"
                  name="searchDocVal"
                  id="searchDocVal"
                  placeholder="tape to search ."
                />
                <label htmlFor="searchDocVal" title="search" className="searchDoc_btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </label>
              </form>
            </div>
          </div>
          <div className="MyOffcanvas-body offcanvasDocs-container">
            <div id="offcanvasDocs-inner py-2 "></div>
          </div>
        </div>
      </section>
        </>
    )
}