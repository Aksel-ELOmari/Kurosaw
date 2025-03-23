import {useContext,useState} from 'react';
import {AnimeCard } from '../Base/AnimeCard';
import {api_key, base_Url} from '../../Clipboard/Clipboard';
import {PreviewContext} from '../../Pages/Preview';
import '../../Styles/Preview.css';
import '../../Styles/boot_custome.css';

export default function OverviewComp() {
  const { res,media} = useContext(PreviewContext);
  const [page, setPage] = useState(1);

  const similarUrl = `${base_Url}${media}/${res.id}/similar?language=en-US&api_key=${api_key}`;
  const toggleSimilarPages = (e) => {
    const parentClass = e.target.getAttribute('data-parentname');
    const parent = document.querySelector(`.${parentClass} .carousel-cards-holder`);
    if (!parent) return;
    const scrollAmount = e.target.classList.contains('fa-arrow-right') ? 300 : -300;
    parent.scrollBy({ top: 0, left: scrollAmount, behavior: 'smooth' });
    if (e.target.classList.contains('fa-arrow-right') && parent.scrollLeft < (parent.scrollWidth - parent.clientWidth)) {
      setPage(prev => prev + 1);
    } else if (e.target.classList.contains('fa-arrow-left') && parent.scrollLeft > 0) {
      setPage(prev => (prev > 1 ? prev - 1 : prev));
    }
  };
  return (
    <div className="OverviewSection mb-2">
      <div className="my-2">
        <h2 className="title h3 colored">Similar Content:</h2>
        <div className="carousel-container">
          <div className="arrows-holder flex-between">
            <i className="fa-solid flex-center justify-content-center arrow align-self-center fa-arrow-left" onClick={toggleSimilarPages} data-parentname="carousel-container"></i>
            <i className="fa-solid flex-center justify-content-center arrow align-self-center fa-arrow-right" onClick={toggleSimilarPages} data-parentname="carousel-container"></i>
          </div>
          <div className="carousel-cards-holder d-flex flex-center gap-3 pb-3">
            <AnimeCard path={similarUrl} page={page} />
          </div>
        </div>
      </div>
    </div>
  );
}
