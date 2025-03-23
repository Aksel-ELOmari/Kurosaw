// Import Firebase services
import { initializeApp } from 'firebase/app';
import { getAuth,onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from 'firebase/auth';
import { getFirestore, collection, updateDoc, arrayUnion,arrayRemove , addDoc, increment,getDoc, getDocs, doc, setDoc} from 'firebase/firestore';

// Media sources
import Cover from '../media/Cover.webp';
import female_icon from '../media/icons8-female-48.png';
import backdrop_path from '../media/backdrop_path.avif';
import poster_path from '../media/poster_path.avif';

// TMDB API configuration
export const api_key = "03760268c2411e2d785ed677c960080d";
export const base_Url = "https://api.themoviedb.org/3/";
export const TMDB = {
  img_url: "https://image.tmdb.org/t/p/original/",
  Cover: Cover,
  female_icon: female_icon,
  genre: 16,
  multi: `search/multi?query=`,
  get_One: `${base_Url}movie/`,
  Disc_api: `${base_Url}discover/movie?language=en-US&api_key=`,
  Pop_api: `${base_Url}movie/popular?language=en-US&api_key=`,
  Top_api: `${base_Url}movie/top_rated?language=en-US&api_key=`,
  Lat_api: `${base_Url}movie/latest?language=en-US&api_key=`,
  genre_list: `${base_Url}genre/movie/list?api_key=`,
  DefaultBackdrop: backdrop_path,
  DefaultCover: poster_path,
};
// ! functions
export const go__back =()=>{ window.history.back();}
export function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
export function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export const faceBookUrl = 'https://www.facebook.com/profile.php?id=100086765432919';
export const youtubeUrl = 'https://www.youtube.com/@MoviesMore644';
export const twitterUrl = "https://x.com/FacellesM44235";
// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAJs1mNJ8GfSVpxZP4H4Zb-tisH1ggyYtA",
  authDomain: "reactkurosaw.firebaseapp.com",
  projectId: "reactkurosaw",
  storageBucket: "reactkurosaw.appspot.com",
  messagingSenderId: "199759528343",
  appId: "1:199759528343:web:c6855db8a60beb080684d2",
  measurementId: "G-B21272BVBR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// Exports
export { auth, db,app };
export { collection, updateDoc, arrayUnion,arrayRemove, addDoc,getDoc, getDocs, doc, setDoc, increment };
export { GoogleAuthProvider, FacebookAuthProvider,onAuthStateChanged, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword };

//! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
//! ############## Tv Seasons ##########
// const season_path = https://api.themoviedb.org/3/tv/94605/season/2?api_key=03760268c2411e2d785ed677c960080d
//! ############## Manage User Auth & Firebase ##########
const user = auth.currentUser;

//? Update a user's profile
const UpdateUserName = (newName) => {
  if (user) {
    user.updateProfile({
      displayName: newName
    }).then(() => {
      alert('The name has been changed successfully!');
    }).catch((error) => {
      alert('Sorry, there was an error: ' + error.message);
    });
  } else {
    alert('No user is currently signed in.');
  }
};

//? Set a user's email address
const UpdateUserEmail = (email) => {
  if (user) {
    user.updateEmail(email).then(() => {
      auth.languageCode = "fr"; // or default: auth.useAppLanguage()
      user.sendEmailVerification().then(() => {
        alert('Check your email box for the verification email.');
      }).catch((error) => {
        alert('Sorry, we could not send the email: ' + error.message);
      });
      alert('The email has been changed successfully!');
    }).catch((error) => {
      alert('Sorry, there was an error: ' + error.message);
    });
  } else {
    alert('No user is currently signed in.');
  }
};

//? Set a user's password
const UpdateUserPassword = (password) => {
  if (user) {
    user.updatePassword(password).then(() => {
      auth.sendPasswordResetEmail(user.email).then(() => {
        alert('Password reset email sent.');
      }).catch((error) => {
        alert('Error sending password reset email: ' + error.message);
      });
      alert('The password has been changed successfully!');
    }).catch((error) => {
      alert('Sorry, there was an error: ' + error.message);
    });
  } else {
    alert('No user is currently signed in.');
  }
};

//? Delete User
const DeleteUser = () => {
  if (user) {
    user.delete().then(() => {
      alert('The account has been deleted. Sorry to lose you :(');
    }).catch((error) => {
      alert('We could not delete the account: ' + error.message);
    });
  } else {
    alert('No user is currently signed in.');
  }
};

//? Re-authenticate a user
const Re_authenticate = (credential) => {
  if (user) {
    user.reauthenticateWithCredential(credential).then(() => {
      alert('Welcome back!');
      go__back();
    }).catch((error) => {
      alert('Error with sign in: ' + error.message);
    });
  } else {
    alert('No user is currently signed in.');
  }
};

