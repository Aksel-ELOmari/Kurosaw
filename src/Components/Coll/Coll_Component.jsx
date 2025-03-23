import {CollectionsContext} from '../../Hooks/Custome__Contexts';
export default function Collection(){
    const displayCollection = ()=>{
        return (
          <CollectionsContext.Provider value={{}}>
            <div className="CollectionCountainer row">
                <div className="collection-card p-3 col-lg-3">
                <h5 className="collection-title text-center">
                    the best Mystical Anime
                </h5>
                <div className="Cards">
                    <div className="Card" data-id="Anime-02">
                    <img
                        src="./imgs/Catalog/appare_ranman.jpeg"
                        height="10rem"
                        width="2rem"
                        alt=""
                        className="card-cover"
                    />
                    </div>
                    <div className="Card" data-id="Anime-02">
                    <img
                        src="./imgs/Catalog/appare_ranman.jpeg"
                        height="10rem"
                        width="2rem"
                        alt=""
                        className="card-cover"
                    />
                    </div>
                    <div className="Card" data-id="Anime-02">
                    <img
                        src="./imgs/Catalog/appare_ranman.jpeg"
                        height="10rem"
                        width="2rem"
                        alt=""
                        className="card-cover"
                    />
                    </div>
                </div>
                </div>
           </div>
          </CollectionsContext.Provider>
        )
    }
    

    return  displayCollection();
}
