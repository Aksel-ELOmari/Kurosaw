import { useContext, useEffect, useState } from 'react';
import { UseFetch } from '../../Hooks/Custome__hook';
import { TMDB, api_key } from '../../Clipboard/Clipboard';
import { PreviewContext } from '../../Pages/Preview';

export default function Characters() {
    const {res,media,ch} = useContext(PreviewContext);
    const [cards, setCards] = useState([]);
    const [displayCrews,setDisplayCrews] = useState(false);
    const id = res.id;
    const url = !ch? `https://api.themoviedb.org/3/${media}/${id}/credits?api_key=${api_key}`:'';
    const { data: results } = UseFetch(url);
    
    useEffect(() => {
        if (results && !ch) {
            const {cast,crew} = results;
            if (cast && !displayCrews) setCards(cast);
            if (crew && displayCrews) setCards(crew);
        }else if (ch){
            const {crew,guest_stars} = res;
            if (guest_stars && !displayCrews)setCards(guest_stars);
            if (crew && displayCrews) setCards(crew);
        }
    }, [results]);
    
    const handelSetDisplayCrews = ()=>{
        setDisplayCrews(true);

    }

    const displayCards = (array) => {
        return array?.map((el, key) => {
            const {job,cast_id, character,order,department,credit_id,adult,gender,id,known_for_department,name,original_name,popularity,profile_path} = el;
            return (
                <div key={key} className="card CharacterCard" data-id={id?id:cast_id?credit_id:''}>
                     <span className="text text-center">
                       {popularity.toFixed(2)} <i className="fa-solid fa-chart-simple colored"></i>
                     </span>
                    <img
                        src={profile_path ? TMDB.img_url + profile_path : TMDB.DefaultCover}
                        alt=""
                        className="Character-Profile"
                    />
                    <div className="Character-data w-100 p-1">
                        <h5 className="Actor-CharacterName colored">{name?name:original_name}</h5>
                        <span className="Role-job light-colored">{character ? character : job?known_for_department:department}</span>
                    </div>
                </div>
            );
        });
    }
    return (
        <>
            <div className="ToggledSection CharactersSection">
                <h2 className="colored">{displayCrews ? "Crew":"Characters :"}</h2>
                <div className="cards-holder-countainer cast_carousel flex flex-wrap gap-3 relative">
                    {displayCards(cards)}
                </div>
                <div onClick={handelSetDisplayCrews} className="d-grid gap-2 seemore-btn"><button className="btn btn-light" type="button">{displayCrews ? "Show cast":"Show Crew"}</button></div>
            </div>
        </>
    );
}
