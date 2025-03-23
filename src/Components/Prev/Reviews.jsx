import { useRef, useState, useContext, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import { ReviewContext } from '../../Hooks/Custome__Contexts';
import { PreviewContext } from '../../Pages/Preview';
import { TMDB, api_key } from '../../Clipboard/Clipboard';
import { UseFetch } from '../../Hooks/Custome__hook';

const addingReviewsection = {
  border: 'solid 2px #fff',
  position: 'relative',
  top: '0',
  left: '0',
  padding: '0 2rem',
  width: '100%',
  background: '#000'
};

const comment_input = { minWidth: '100%' };
export const miniPoster = {maxHeight: '15vh', maxWidth: '15vw'};

function AddingReviewCard({ scrollToRef }) {
  const Context = useContext(ReviewContext);
  const { fetchreviews, setDisplayReviewCard, lastid, setLastid } = Context;
  const comment = useRef(null);
  const media = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
      // Validate inputs
      if (  comment.current.value == '' &&   media.current.value == '' ) {
        return  setDisplayReviewCard(false);
    }
    const review = {
      id: lastid,
      author: '',
      author_details: {
        name: "",
        username: "elshaarawy",
        avatar_path: null,
        rating: 9.0
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      content: comment.current.value,
      media: media.current.files[0] ? URL.createObjectURL(media.current.files[0]) : null,
      url: ''
    };
    setLastid(lastid + 1);
    fetchreviews(review);
    setDisplayReviewCard(false);
    comment.current.value = '';
    media.current.value = '';
  };

  useEffect(() => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollToRef]);

  return (
    <div ref={scrollToRef} className="user-adding-review-section rounded-5" style={addingReviewsection}>
      <div className="d-flex align-items-center justify-content-center">
        <div className="review-main-card d-flex align-center flex-column p-4 bordered-2">
          <h2 className="title h3 mb-2 text text-center">Add Review</h2>
          <div className="starts-count user-ratesymbole my-2">
            <i className="fa-solid fa-star me-2"></i>
            <i className="fa-solid fa-star me-2"></i>
            <i className="fa-solid fa-star me-2"></i>
            <i className="fa-solid fa-star-half me-2"></i>
          </div>
          <form onSubmit={handleSubmit} className="user-review-form mb-2">
            <div className="userCommentInner py-1 d-flex align-items-center gap-lg-1">
              <input
                ref={comment}
                type="text"
                name="user-review"
                placeholder="enter your review"
                className="p-2 user_review_holder"
                style={comment_input}
                required
              />
              <span className="media-btn cursor-pointer">
                <label htmlFor="review_media"><i className="fa-solid fa-image"></i></label>
                <input
                  ref={media}
                  title="upload media"
                  type="file"
                  className="d-none"
                  name="review_media"
                  id="review_media"
                  accept="image/*"
                />
              </span>
              <span onClick={handleSubmit} className="sendReview-btn cursor-pointer">
                <i className="fa-solid fa-paper-plane"></i>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const getTimeElapsed = (dateString) => {
  const commentDate = new Date(dateString);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - commentDate.getFullYear();
  let months = currentDate.getMonth() - commentDate.getMonth();
  let days = currentDate.getDate() - commentDate.getDate();

  // Adjust for negative months or days
  if (days < 0) {
    months--;
    days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};
const displayTimeElapsed = (dateString) => {
  const { years, months, days } = getTimeElapsed(dateString);
  let result = '';
  if (years > 0) result += `${years} year${years > 1 ? 's' : ''} `;
  if (months > 0) result += `${months} month${months > 1 ? 's' : ''} `;
  if (days > 0) result += `${days} day${days > 1 ? 's' : ''}`;
  return result.trim();
};
export default function Reviews() {
  const { res, media } = useContext(PreviewContext);
  const [displayReviewCard, setDisplayReviewCard] = useState(false);
  const [reviewsArr, setReviewsArr] = useState([]);
  const [lastid, setLastid] = useState(0);
  const [lineClamp,setLineClamp] = useState(true);
  const scrollToRef = useRef(null);
  const url = `https://api.themoviedb.org/3/${media}/${res.id}/reviews?language=en-US&api_key=${api_key}`;
  const { data: response, error } = UseFetch(url);

  const toggleAddReview = () => {
    setDisplayReviewCard(true);
  };
  const toggleLineClamp = ()=>{
    setLineClamp(!lineClamp);
  }
  useEffect(() => {
    if (response?.results) {
      setReviewsArr((prevState) => [...prevState, ...response.results]);
    }
  }, [response]);

  const fetchreviews = useCallback((data) => {
    if (data) {
      setReviewsArr((prevState) => [...prevState, data]);
    }
  }, []);

  const displayComments = useCallback(() => {
    return reviewsArr?.map((el, key) => {
      if (el) {
        const { author, author_details, id, content, created_at, updated_at, url, media } = el;
        const formattedDate = formatDate(created_at);
        const timeElapsed = displayTimeElapsed(created_at);
  
        return (
          <div key={key} id={id} className="user-review flex align-items-start gap-3 mb-2">
            <Link to={url || '#'}>
              <img
                alt='img'
                src={author_details?.avatar_path ? TMDB.img_url + author_details.avatar_path : TMDB.DefaultBackdrop}
                loading="lazy"
                className="user-cover"
              />
            </Link>
            <div className="review-body">
              <div className="review-header flex">
                <h6 className="user-name h5 mx-2">{author || 'ايوب العماري'}</h6>
                <span className="released-date">{formattedDate}</span>
                {timeElapsed&&<span className="time-elapsed mx-2"><i class="fa-solid fa-clock-rotate-left colored"></i> {timeElapsed}</span>}
              </div>
              <div className="user-review-text mx-2 ">
                <p className={lineClamp?"line-clamp":""}>{content}</p>
                {/* <span className="cursor-pointer" onClick={toggleLineClamp}>
                 <i class={lineClamp?"fa-solid fa-angle-down":"fa-solid fa-angle-up"}></i>
                </span> */}
              </div>
              {media && <div className="media-content">
                <img
                  alt='img'
                  className="user-media rounded-1"
                  style={miniPoster}
                  src={media}
                  loading="lazy"
                />
              </div>}
            </div>
          </div>
        );
      }
      return null;
    });
  }, [reviewsArr]);

  return (
    <ReviewContext.Provider value={{ displayReviewCard, setDisplayReviewCard, lastid, setLastid, fetchreviews }}>
      <div>
        <h2 className="title h3 colored">Reviews</h2>
        <div className="d-grid gap-2 button-add-review">
          <button
            className="btn btn-light write-review-btn"
            type="button"
            title="create review button"
            onClick={toggleAddReview}
          >
            <i className="fa-solid fa-plus" style={{ scale: "0.8", color: "#000" }}></i>
            Add a Review
          </button>
        </div>
        <div className="Reviews-holder mt-4">
          {displayComments()}
        </div>
        {displayReviewCard && <AddingReviewCard scrollToRef={scrollToRef} />}
      </div>
    </ReviewContext.Provider>
  );
}