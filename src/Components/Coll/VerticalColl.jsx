import React, {useContext } from 'react';
import {TMDB} from '../../Clipboard/Clipboard';
import { PreviewContext } from '../../Pages/Preview';
import { AppContext } from '../../Hooks/Custome__Contexts';
import { UseFetch } from '../../Hooks/Custome__hook';

const collectionCard =
{
   display:'flex',
   alignItems:'center',
}
const vCollCover = {height:'3rem',width:'2rem'}
export default function VerticalColl({ collections }) {
  const {itemId} = useContext(PreviewContext);
  const {modifyCollectionIds} = useContext(AppContext);

  const handelSavingItem = (e)=>{
    const collName = e.currentTarget.getAttribute('data-coll-name');
    const action = "add";
    modifyCollectionIds(collName, action, itemId);
  }
  const fetchCollCover = (ids)=>{
    const firstItem = ids[0];
    const {item_id,item_media} = firstItem;
    const url = `https://api.themoviedb.org/3/${item_media}/${item_id}?api_key=03760268c2411e2d785ed677c960080d`;
    const { data: res } = UseFetch(url);
    let poster = res.poster_path ? TMDB.img_url + res.poster_path : TMDB.Cover;
    return poster;
  }
  const createColl = () => {
    if (!collections) return <p>No collections available.</p>;
    return collections.map((coll,key) => {
      const {name,desc, privet,ids} = coll;
      return (
        <div
          title={desc}
          style={collectionCard}
          className={`collectionCard my-2 ${privet&&"disabled"}`}
          data-coll-name={name}
          key={key}
          onClick={handelSavingItem}
        >
          <img
            loading='lazy'
            src={fetchCollCover(ids)}
            alt=""
            className="rounded-2 mx-3"
            style={vCollCover}
          />
          <div className="card-text">
            <h5 className="fw-5 collection-title light-colored">
              {name}
            </h5>
            <p className="items-count light-colored"><span>{ids.lenght}</span> Titles</p>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      {createColl()}
    </div>
  );
}

