import { BrowserRouter,Link, Routes, Route, Outlet } from 'react-router-dom';
import {useContext} from 'react';
import Home from './Home.jsx';
import News from './News.jsx';
import Catalog from './Catalog.jsx';
import Series from './Series.jsx';
import Register from './Register.jsx';
import Preview from './Preview.jsx';
import User from './User.jsx';
import About from './About.jsx';
import { AppContext } from '../Hooks/Custome__Contexts.jsx';
import {SocilaLinks} from '../Components/Base/SocilaLinks.jsx';
import {TMDB} from '../Clipboard/Clipboard';
import '../Styles/customize.css';
const hr_style = {width: '100vw', translate: '-8%'}

export default function Layout() {
  const {logedIn,userProfilePath}= useContext(AppContext);
  return (
      <BrowserRouter>
        <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link
            className="navbar-brand nav-link" to="/">Movies_Saw</Link>
            <button
              className="navbar-toggler btn"
              type="button"
              onClick={toggleNavBar}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >Home</Link>
                </li>
                <li className="nav-item">
                  <Link
                  className="nav-link" to="/Series">Series</Link>
                </li>
                <li className="nav-item">
                  <Link
                  className="nav-link" to="/News">News</Link>
                </li>
              </ul>
              <div className="corner-btns buttons d-flex align-items-center mx-4 gap-3">
                    <Link
                    to="/Catalog" className="search-icon p-3">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                    {logedIn?
                    <Link
                    to="/User"
                    className="profile-link text-decoration-none hero-user"
                  >
                    <div className="nav-bar-profile">
                      <img
                        src={userProfilePath?userProfilePath:TMDB.DefaultBackdrop}
                        alt=""
                        className="top-user-cover"
                      />
                    </div>
                  </Link>:
                  <>  <Link type="link" title="Register" to="/Register">
                      <button type="button" className="btn btn-dark Login-btn">
                        Login
                      </button>
                    </Link>
                    <Link
                     title="to Register" to='/Preview'>
                      <button type="button" className="btn btn-light">
                        Get Started
                      </button>
                    </Link></>}
                  </div>
            </div>
          </div>
        </nav>
        <hr style={hr_style} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/News" element={<News />} />
          <Route path="/Series" element={<Series />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Preview" element={<Preview />} />
          <Route path="/User" element={<User />} />
          <Route path="/About" element={<About />} />
        </Routes>
        <Outlet />
        <footer>
          <hr style={hr_style} />
          <div className="footer-body">
            <div className="footer-text">
              <Link
              to="#" className="footer-Cover">
                <h4 className="Cover">Movies_Saw.com</h4>
              </Link>
              <ul className="flex-center gap-4">
                <Link
                className="icon-link text-decoration-none" to="/About">
                  <li className="footer-link">Terms & Privacy</li>
                </Link>
              </ul>
            </div>
            <div className="col-icons gap-5">
              <SocilaLinks />   
            </div>
          </div>
        </footer>
        </div>
      </BrowserRouter>
  );
}

function toggleNavBar(){
  const navBar = document.getElementById('navbarText');
  navBar.classList.toggle('show');
}