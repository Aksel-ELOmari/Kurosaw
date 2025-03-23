import React, { useState } from 'react';
import { AnimeCard } from '../Components/Base/AnimeCard';
import {api_key} from '../Clipboard/Clipboard';
import MainCard from '../Components/Base/MainCard';
import {People} from '../Components/Base/People'
const tv_path = 'https://api.themoviedb.org/3/tv/';
export default function Series() {
const [special_page, setSpecialPage] = useState(1);
const [trending_page, setTrendingPage] = useState(1);
const [popular_page, setPopularPage] = useState(1);
const [peoplePage,setPeoplePage] = useState(1);
const toggle_special_pages = (e) => {
  const parentClass = e.target.getAttribute('data-parentname');
  const parent = document.querySelector(`.${parentClass} .carousel-cards-holder`);

  if (!parent) return;

  const isScrollRight = e.target.classList.contains('fa-arrow-right');
  const canScrollLeft = parent.scrollLeft > 0;
  const canScrollRight = parent.scrollLeft < (parent.scrollWidth - parent.clientWidth);

  if (isScrollRight && canScrollRight) {
    setSpecialPage((prevState) => prevState + 1);
  } else if (!isScrollRight && canScrollLeft) {
    setSpecialPage((prevState) => {
      return prevState > 1 ? prevState - 1 : prevState;
    });
  }

  scrollParent(e)

};
const toggle_trending_pages = (e) => {
    const parentClass = e.target.getAttribute('data-parentname');
    const parent = document.querySelector(`.${parentClass} .carousel-cards-holder`);
  
    if (!parent) return;
  
    const isScrollRight = e.target.classList.contains('fa-arrow-right');
    const canScrollLeft = parent.scrollLeft > 0;
    const canScrollRight = parent.scrollLeft < (parent.scrollWidth - parent.clientWidth);
  
    if (isScrollRight && canScrollRight) {
      setTrendingPage((prevState) => prevState + 1);
    } else if (!isScrollRight && canScrollLeft) {
      setTrendingPage((prevState) => {
        return prevState > 1 ? prevState - 1 : prevState;
      });
    }
  
    scrollParent(e);
};
const toggle_popular_pages = () => {
  setPopularPage((prevState) => prevState + 1);
};
const toggle_people_pages = (e) => {
  const parentClass = e.target.getAttribute('data-parentname');
  const parent = document.querySelector(`.${parentClass} .carousel-cards-holder`);
  if (!parent) return;
  const isScrollRight = e.target.classList.contains('fa-arrow-right');
  if (isScrollRight) {
    setPeoplePage((prevState) => prevState + 1);
  } else if (!isScrollRight) {
    setPeoplePage((prevState) => {
      return prevState > 1 ? prevState - 1 : prevState;
    });
  }

  scrollParent(e)
};

const scrollParent = (e) => {
  const parentClass = e.target.getAttribute('data-parentname');
  const parent = document.querySelector(`.${parentClass} .carousel-cards-holder`);
  if (parent) {
    parent.scrollBy({
      top: 0,
      left: e.target.classList.contains('fa-arrow-right') ? 300 : -300,
      behavior: 'smooth'
    });
  }
};
   return (
      <>
      <header>
        <MainCard  media="tv"/>
        <section className="special-section">
          <h1 className="section-title">Special For You :</h1>
          <div className="carousel-countainer relative">
            <div className="arrows-holder flex-between">
              <i
                className="fa-solid flex-center justify-content-center arrow fa-arrow-left"
                data-parentname="special-section"
                onClick={toggle_special_pages}
              ></i>
              <i
                className="fa-solid flex-center justify-content-center arrow fa-arrow-right"
                data-parentname="special-section"
                onClick={toggle_special_pages}
              ></i>
            </div>
            <div
              className="carousel-cards-holder d-flex d-flex flex-center gap-3 pb-3"
            > 
             <AnimeCard page={special_page} path={tv_path+'top_rated?api_key='+api_key} />
            </div>
          </div>
        </section>
      </header>
      <div className='min-body'>
      <section className="people mb-2">
        <h1 className="section-title">Popular People :</h1>
        <div className="peopleCarousel relative">
               <div className="arrows-holder flex-between w-100">
                   <i
                    className="fa-solid flex-center justify-content-center arrow fa-arrow-left"
                    data-parentname="peopleCarousel"
                    onClick={toggle_people_pages}
                  ></i>
                  <i
                    className="fa-solid flex-center justify-content-center arrow fa-arrow-right"
                    data-parentname="peopleCarousel"
                    onClick={toggle_people_pages}
                  ></i>
              </div>
                    <People path={"https://api.themoviedb.org/3/trending/person/week?api_key="+api_key} page={peoplePage}/>
        </div>
      </section>
      <section className="trending-section py-3">
        <h1 className="section-title">Trending Content :</h1>
        <div className="carousel-countainer">
          <div className="arrows-holder flex-between">
            <i
              className="fa-solid flex-center justify-content-center arrow fa-arrow-left"
              data-parentname="trending-section"
              onClick={toggle_trending_pages}
            ></i>
            <i
              className="fa-solid flex-center justify-content-center arrow fa-arrow-right"
              data-parentname="trending-section"
              onClick={toggle_trending_pages}
            ></i>
          </div>
          <div
            className="carousel-cards-holder d-flex d-flex flex-center gap-3  gap-3 pb-3">
               <AnimeCard 
                      page={trending_page}
                      path={`https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=03760268c2411e2d785ed677c960080d`}
                      />
          </div>
        </div>
      </section>
      <section className="popular-section py-3">
        <h1 className="section-title">Most Popular :</h1>
        <div className="carousel-countainer">
          <div
            className="cards-holder d-flex flex-center gap-3  gap-3 pb-3"
          >
             <AnimeCard
               page={popular_page}
              path={tv_path+'popular?api_key='+api_key}
              /> 
          </div>
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-light show-more-btn show-more-pop"
            data-parentname="popular-section"
            type="button"
            onClick={toggle_popular_pages}
          >
            Show More
          </button>
        </div>
      </section>
      </div>
      </>
   )
}
