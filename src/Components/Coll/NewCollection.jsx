import React, {useRef, useContext, useState } from 'react';
import { AppContext, CollectionsContext } from '../../Hooks/Custome__Contexts';
import {PreviewContext} from '../../Pages/Preview';
import VerticalColl from './VerticalColl';

export function NewCollection({ action}) {
  const {creatNewColl, collections,user,handelDisplayNewColl } = useContext(AppContext);
  const {itemId} = useContext(PreviewContext);
  const [chooseColl, setShooseColl] = useState(true);
  const title = useRef();
  const description = useRef();
  const privet = useRef();
  const userId = user.uid;
  const handelSubmit = async (event) => {
    event.preventDefault();
    if (!title.current?.value || !description.current?.value) {
      alert('Please fill in all fields.');
      return;
    }
    if (!user) {
      alert('Sing Up First!!! ');
      return;
    }
    const collectionId = `${userId}_${Date.now()}`; 
    // Create a new collection object
    const collection = {
      id: collectionId,
      name: title.current.value,
      desc: description.current.value,
      privet: privet.current.checked,
      ids: [itemId]
    };
   // save the collection to firestore
    creatNewColl(collection)
    // Reset the form
    title.current.value = '';
    description.current.value = '';
    privet.current.checked = false;
    handelDisplayNewColl();
  };

  const handelShooseColl =()=>{setShooseColl(!chooseColl)}
  return (
    <>
      <section className="collectionsLabotratoire-section">
        <div className="Collections_lab">
          <div className="d-flex align-items-center justify-content-between w-100 position-relative">
            <div
              className="ex-btn"
              onClick={action}
            >
              <i className="fa-solid fa-x"></i>
            </div>
            <div
              className="back-btn"
              onClick={handelShooseColl}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </div>
          </div>
          <div>
            {chooseColl ? (
              <div className="main-card SaveCollections_lab flex-center justify-content-center flex-column gap-2">
                <h2 className="fw-bolder text-center Sing-title">
                  Choose Collection
                </h2>
                <div className="my-2">
                  <button
                    type="button"
                    className="btn btn-light OpenNewCollLab btn-lg fw-4"
                    onClick={handelShooseColl}
                  >
                    <i
                      className="fa-solid fa-plus"
                      style={{ scale: '0.8', color: '#000' }}
                    ></i>
                    Create new Collection
                  </button>
                </div>
                <div className="collections-cards flex-center justify-content-center flex-column px-2">
                  <VerticalColl collections={collections} />
                </div>
              </div>
            ) : (
              <div className="main-card NewCollections_lab flex-center justify-content-center flex-column gap-2">
                <form onSubmit={handelSubmit}  id="newCollection-form" className="py-2">
                  <div className="input-card collection-name mb-2">
                    <label htmlFor="Collection-name" style={{ width: '100%' }}>
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Collection Name"
                      name="Collection-name"
                      id="Collection-name"
                      ref={title}
                    />
                  </div>
                  <div className="input-card collection-desc mb-2">
                    <div className="flex-center justify-content-between">
                      <label htmlFor="collection-desc">Description </label>
                    </div>
                    <div className="position-relative">
                      <input
                        type="input"
                        placeholder="enter your Collection's description"
                        name="collection-desc"
                        id="collection-desc"
                        ref={description}
                      />
                    </div>
                  </div>
                  <div className="checkbox-field mb-2 flex-center justify-content-between">
                    <input
                      title="collection check-box"
                      defaultChecked
                      type="checkbox"
                      name="Personal"
                      id="collecton-check"
                      ref={privet}
                    />
                    <label htmlFor="collecton-check">
                      Keep This Collection Personal?
                    </label>
                  </div>
                  <input
                    type="submit"
                    value="Create"
                    className="btn btn-light btn-lg btn-block create-lg-btn"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}