import { useEffect, useState } from "react";
import Layout from "./Pages/Layout";
import { AppContext } from "./Hooks/Custome__Contexts.jsx";
import { initializeApp } from "firebase/app"; // Use npm Firebase import
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Use npm Firebase import
import { firebaseConfig,doc,getDoc,getDocs,db,setDoc,updateDoc, arrayUnion, arrayRemove} from "./Clipboard/Clipboard.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/index.css";
import "./Styles/boot_custome.css";
import "./Styles/customize.css";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const defaultColl = {id:1,name:'testing',desc:'nothing yet !',privet:false};
function App() {
  const [collections, setCollections] = useState(defaultColl);
  const [logedIn, setLogedIn] = useState(false);
  const [newColl, setNewColl] = useState(false);
  const [user, setUser] = useState({});
  const [userProfilePath, setUserProfilePath] = useState("");
  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLogedIn(true);
        const userData = {
          uid: user.uid,
          user_name: user.displayName,
          user_email: user.email,
          photoURL: user.photoURL,
        };
        setUser(userData);
        if (user.providerData && user.providerData[0].providerId === "google.com") {
          setUserProfilePath(user.photoURL);
        }
      } else {
        setLogedIn(false);
        setUser({});
        setUserProfilePath("");
      }
    });
    return () => unsubscribe();
  }, []);

  // Log Out Function
  const LogOutFunc = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/"; // Redirect after logout
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };
    // Toggle NewCollection component
   const handelDisplayNewColl = () => {
        setNewColl(!newColl);
    };
  // ! ############### Collections ##############
  // Get All the colections
  const getAllColls = async (userId, collectionName) => {
    try {
      const collectionPath = `users/${user.uid}/collections`;
      const collsDocs = await getDocs(doc(db, collectionPath));
      if (collsDocs.exists()) {
        alert('we find the collections array !!!')
        const colls = collsDocs.data();
        console.log(colls);
        return setCollections((prevState) => [...prevState, colls]);
      } else {
        console.log(`Collection ${collectionName} does not exist for user ${userId}`);
        return [];
      }
    } catch (error) {
      console.error('Error fetching collection IDs:', error);
      return [];
    }
  };
  // Ceate New Collection
  const creatNewColl = async (newColl) => {
    if(user){
      try {
        const userCollectionPath = `users/${user.uid}/collections`;
        await setDoc(doc(db, userCollectionPath, newColl.name), {
          ...newColl,
          ids: newColl.ids || [],
        });
    
        alert('The collection is Created successfully!');
      } catch (error) {
        console.error('We could not create the collection:', error);
      }
    }
    else if(!user){
      alert('Please Sing Up First !!!');
      window.location.href = '/Register';
    }
  };
 // Modefy Collection
  const modifyCollectionIds = async (collectionName, action, itemId) => {
    if(user){
      try {
        const collectionPath = `users/${user.uid}/collections/${collectionName}`;
        if (action === 'add') {
          await setDoc(
            doc(db, collectionPath), { ids: arrayUnion(itemId) }
          );
        alert(`Item ${itemId} added to the collection ${collectionName}`);
        } else if (action === 'remove') {
          await updateDoc(doc(db, collectionPath), {
            ids: arrayRemove(itemId), 
          });
        alert(`Item ${itemId} removed from the collection ${collectionName}`);
        } else {
          throw new Error('Invalid action. Use "add" or "remove".');
        }
      } catch (error) {
        console.error('Error modifying the collection:', error);
      }
    }
    else if (!user){
      alert('Pleas Sing Up First !!!');
    }
  };
  // Get the Ids from Collections
  const getCollectionIds = async (userId, collectionName) => {
    if(user){
      try {
        const collectionPath = `users/${user.uid}/collections/${collectionName}`;
        const collectionDoc = await getDoc(doc(db, collectionPath));
        if (collectionDoc.exists()) {
          const collectionData = collectionDoc.data();
          return collectionData.ids || []; 
        } else {
          console.log(`Collection ${collectionName} does not exist for user ${userId}`);
          return [];
        }
      } catch (error) {
        console.error('Error fetching collection IDs:', error);
        return [];
      }
    }else if(!user){
      alert('Please Sing Up First !!!');
      window.location.href = '/Register';
    }
  };


  return (
      <AppContext.Provider
          value={{
            user,
            setUser,
            logedIn,
            userProfilePath,
            LogOutFunc,
            handelDisplayNewColl,
            newColl,
            setNewColl,
            collections,
            creatNewColl,
            modifyCollectionIds
          }}
        >
        <Layout />
      </AppContext.Provider>
  );
}

export default App;