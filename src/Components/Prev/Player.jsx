import React, { useContext, useEffect, useState } from 'react';
import { UseFetch } from '../../Hooks/Custome__hook';
import { PreviewContext } from '../../Pages/Preview';
import { api_key } from '../../Clipboard/Clipboard';

const media_player = {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '200vh',
    width: '99vw',
    margin: '0 auto',
    backgroundColor: '#000',
    zIndex: '1000',
};

const mainPlayer = {
    height: '30rem',
    border: 'solid 2px #fff',
    borderRadius: '1.2rem',
};

const cardPlayer = {
    height: '15rem',
    border: 'solid 2px #fff',
    borderRadius: '1.2rem',
};

export default function Player({ action }) {
    const { media, res ,setVideo} = useContext(PreviewContext);
    const id = res.id;
    const url = `https://api.themoviedb.org/3/${media}/${id}?api_key=${api_key}&append_to_response=videos`;
    const { data: response } = UseFetch(url);
    const [cards, setCards] = useState([]);
    const [mainCard, setMainCard] = useState(null);

    useEffect(() => {
        if (response && response.videos && response.videos.results.length > 0) {
            setCards(response.videos.results);
            const filter = response.videos.results.find(video => video.name.toLowerCase().includes('official trailer')) || response.videos.results[0];
            if (filter) {
                const trailer = { name: filter.name, key: filter.key };
                setMainCard(trailer);
            }
        }else{setVideo(false)};
    }, [response]);

    const handleCardClick = (el) => {
        setMainCard(el);
        window.scrollTo({ top: 0 });
    };

    const displayCards = () => {
        return cards?.map((el, key) => (
            <div key={key} className="col col-md-3 cardPlayer" onClick={() => handleCardClick(el)}>
                <iframe title="Video" src={`https://www.youtube.com/embed/${el.key}`} frameBorder="0" style={cardPlayer}></iframe>
            </div>
        ));
    };

    return (
        <div className="media_player container-fluid" style={media_player}>
            <div className="ex-btn" onClick={action}>
                <i className="fa-solid fa-xmark"></i>
            </div>
            <div className="col main-player col-12 mb-4">
                {mainCard && (
                    <>
                        <h1 className="m-4 colored">{mainCard.name}</h1>
                        <iframe title="Trailer" className="col col-12 mainPlayer" src={`https://www.youtube.com/embed/${mainCard.key}`} frameBorder="0" style={mainPlayer}></iframe>
                    </>
                )}
            </div>
            <div className="row gap-1">
                {displayCards()}
            </div>
        </div>
    );
}