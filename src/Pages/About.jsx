export default function About(){
    return (
        <>
           <section className="About-section">
        <div
          className="About-div flex-center justify-content-center row  h-50 my-2 w-100"
        >
          <div className="col-12 col-md-12 col-lg-5">
            <h1 className="about-text">About</h1>
          </div>
          <div className="col-12 col-md-12 col-lg-5">
            <p className="about-description">
              Kurosaw is a product that provide quick and easy exploration of
              the largest online anime library. AI recommendation, creating your
              own collections, organizing anime by lists and much more.
              <br />
              <br />
              The app is perfectly adaptable to the user's needs. Exploring the
              world of anime has never been easier.
            </p>
          </div>
        </div>
        <div
          className="About-div w-100">
             <div className="about-text fw-light">
              <p className="colored">Need A Developer To Build Your Next Project ?!</p> <br />
              <form className="d-flex align-items-center">
                  <label htmlFor="user-email"
                    ><button type="button" className="btn btn-outline-warning h1 my-3">
                      Send
                    </button>
                    </label>
                  <input
                    className="About__input"
                    type="email"
                    name="user-email"
                    placeholder="enter your email here !"
                    title="Only email !!"
                  />
              </form>
            </div>
        </div>
      </section>
        </>
    )
}