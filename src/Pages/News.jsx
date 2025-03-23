import React, { useEffect } from 'react'
export default function News() {
  return (
    <>
      <header>
          <section className="hero-section">
                <div className="hero-content">
                  <div className="hero-Cover">
                    <img src="./imgs/News/Bch.jpeg" alt="" id="HeaderCover" />
                  </div>
                  <div className="hero-card mt-5">
                    <div className="hero-content">
                      <span className="timezone">15 minutes ago !</span>
                      <h1 className="hero-anime-title h1">
                        A New Season of "Bleach:Sennen Kessen-Hen" Has Been Annonced.
                      </h1>
                      <button type="button" title="btn" className="btn btn-light">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </section>
      </header>
      <div className="main-body">
      <section className="news-section">
        <div className="row my-3 gap-3">
          <div className="col col-lg-5 news-card relative">
            <img
              src="./imgs/News/Sword Art Online.jpeg"
              alt=""
              className="AnimeNew-cover"
            />
            <span className="new-time">2 hours ago</span>
            <h2 className="Anime-title">
              "Sword Art Online:Progressive Movie - Kuraki Yuuyami No Scherzo"
              Anime Premiere Date.
            </h2>
          </div>
          <div className="col col-lg-5 news-card relative">
            <img
              src="./imgs/News/Uzaki-Chan Wa Asobita! Double.jpeg"
              alt=""
              className="AnimeNew-cover"
            />
            <span className="new-time">8 hours ago</span>
            <h2 className="Anime-title">
              Poster And Lots of Dethails On The Anime "Uzaki-Chan Wa Asobita!
              Double".
            </h2>
          </div>
        </div>
        <div className="row my-3 gap-3">
          <div className="col col-lg-3 news-card relative">
            <img
              src="./imgs/News/Golden-Kamuy-4th-Season.jpg"
              alt=""
              className="AnimeNew-cover"
            />
            <span className="new-time">1 Day ago</span>
            <h2 className="Anime-title">
              Trailer And Lot Of Dethails For The Anime "Golden Kumuy 4th Season
              Director's Mini-Interview"
            </h2>
          </div>
          <div className="col col-lg-3 news-card relative">
            <img src="./imgs/News/R.png" alt="" className="AnimeNew-cover" />
            <span className="new-time">1 Day ago</span>
            <h2 className="Anime-title">
              The Season Season Of The Anime "Tsurune:Kazemai Koukou Kyuudoubu"
              Has Been Annonced.
            </h2>
          </div>
          <div className="col col-lg-3 news-card relative">
            <img
              src="./imgs/News/Natsu e no Tunnel,Sayonara no Deguchi.jpg"
              alt=""
              className="AnimeNew-cover"
            />
            <span className="new-time">2 days ago</span>
            <h2 className="Anime-title">
              New Trailer For The Anime Movie "Natsu e no Tunnel,Sayonara no
              Deguchi".
            </h2>
          </div>
        </div>
        <div className="row my-3 gap-3">
          <div className="col col-lg-5 news-card relative">
            <img
              src="./imgs/News/Vollyball!!!.jpg"
              alt=""
              className="AnimeNew-cover"
            />
            <span className="new-time">2 Days ago</span>
            <h2 className="Anime-title">
              A Sequel To The Anime "Vollyball!!!" Has Been Annonced, In The
              Form Of A Two-Part Film.
            </h2>
          </div>
          <div className="col col-lg-5 news-card relative">
            <img
              src="./imgs/News/Image01_21-1-650x300.jpg"
              alt=""
              className="AnimeNew-cover"
            />
            <span className="new-time">3 Days ago</span>
            <h2 className="Anime-title">
              First Trailer And Dethails Of The Anime "Yowamushi Pedal:Limit
              Breack".
            </h2>
          </div>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-light" type="button">Show More</button>
        </div>
      </section>
      </div>
    </>
  )
}
