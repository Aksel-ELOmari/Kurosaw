import {useContext,useEffect,useRef,useState} from 'react'
import {Link} from 'react-router-dom';
import {AppContext, RegesterContext} from '../Hooks/Custome__Contexts';
import { auth, db,go__back } from '../Clipboard/Clipboard';
import { collection, updateDoc, arrayUnion, addDoc, getDocs, doc, setDoc, increment } from '../Clipboard/Clipboard';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../Clipboard/Clipboard';
import { TwitterAuthProvider } from 'firebase/auth';

const loginStatus = {text:'Already Have An Account ? ',btn:'login'};
const SingUpStatus = {text:"Don't Have An Account ?",btn:'Register'};

export default function Regester() {
  const {user,creatNewColl} = useContext(AppContext);
  const [frontCard,setFrontCard] = useState(true);
  const [mainCard,setMainCard] = useState(false);
  const [displaylogin,setDisplaylogin] = useState(true);
  const [singUp,setSingUp] = useState(false);
  const [forgotPassword,setForgotPassword] = useState(false);
  const [status,setStatus] = useState(loginStatus);
  const userId = user.uid;
  const defaultCollection = 
  [
    {
      id: `${userId}_${Date.now()}`,
      name: 'LikedContent',
      desc: 'liked Movies / Series. you can add more liked Content',
      privet: null,
      ids: []
    },
    {
      id: `${userId}_${Date.now()}`,
      name: 'SavedContent',
      desc: 'Saved Movies / Series. you can save more ...',
      privet: null,
      ids: []
    },
    {
      id: `${userId}_${Date.now()}`,
      name: 'WatchLater',
      desc: 'this Collection is for Movies that you like to watch later',
      privet: null,
      ids: []
    },
  ]

  useEffect(()=>{
    defaultCollection?.map(el =>{
      creatNewColl(el);
    })
  })
  const go__toggle =()=>{
    setFrontCard(!frontCard);
    setMainCard(!mainCard);
    setForgotPassword(false);
    setSingUp(true);
    setDisplaylogin(false);
  };
  const handelforgotPassword = ()=>{
      setForgotPassword(true);
      setSingUp(false);
      setDisplaylogin(false);
  }
  const handelAlert = ()=>{
    setFrontCard(false);
    setMainCard(true);
    setDisplaylogin(!displaylogin);setSingUp(!singUp);
  }
  const GoogleSignin = ()=>{
     const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            return user ? go__back() : null;
          })
          .catch((error) => {
            console.error(
              "Sorry, there was an error signing in with Google:",
              error,
            );
          });
  }
  // FacebookSignin
  const FacebookSignin = function () {
          const provider = new FacebookAuthProvider();
          signInWithPopup(auth, provider)
            .then((result) => {
              const credential =
              provider.credentialFromResult(result);
              const user = result.user;
              console.log("The user successfully logged in with Facebook:", user);
            })
            .catch((error) => {
              console.error(
                "Sorry, there was an error signing in with Facebook:",
                error,
              );
            });
  };
  // Twitter Singin 
  const TwitterSingin = () => {
    const provider = new TwitterAuthProvider();
  
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        const user = result.user;
  
        console.log("User successfully logged in with Twitter (X):", user);
        console.log("Access Token:", token);
        console.log("Secret:", secret);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        console.error("Error signing in with Twitter (X):", errorCode, errorMessage);
      });
  };
  useEffect(()=>{
    if(displaylogin===true){
      setStatus(SingUpStatus)
    }else if(displaylogin===false){
      setStatus(loginStatus)
    }
  },[displaylogin,singUp])
  return (
    <>
    <RegesterContext.Provider value={{
        GoogleSignin,
        FacebookSignin,
        TwitterSingin,
        displaylogin,
        setDisplaylogin,
        singUp,
        setSingUp,
        forgotPassword,
        setForgotPassword,
        status,
        setStatus,
        go__toggle,
        handelAlert
      }}>

      <main className="container-fluid regester-main">
        <section className="flex-center justify-content-center">
          <div className="regester-hedear-btns">
            <div className="d-flex align-items-center justify-content-between w-100 position-relative">
              <div
                className="ex-btn"
                onClick={go__back}>
                <i className="fa-solid fa-x"></i>
              </div>
              <div className="back-btn" onClick={go__toggle}>
                <i className="fa-solid fa-arrow-left"></i>
              </div>
            </div>
          </div>
          <div
            className="main-card w-50 flex-center justify-content-center flex-column gap-2"
          >
             <Link
              to="/"
              className="fw-bolder text text-center h1 m-auto colored"
              >Join Movies_Saw
              </Link>

             { frontCard && <FrontComp />}
             {mainCard && <MainComp onForgotPassword={handelforgotPassword} />}
             {!forgotPassword&&<AlertComp  />}
           </div>
        </section>
      </main>
    </RegesterContext.Provider>
    </>
  )
}

function FrontComp(){
  const {FacebookSignin,TwitterSingin,GoogleSignin,go__toggle} = useContext(RegesterContext);
  const Google_style = {background: 'linear-gradient(to right,blue,red,yellow,green)'}
  const Google_icon = {color:"#fff"}
  const Facebook_style = {background: "rgb(59, 89, 152)"}

  return (<>
            <button
              type="button"
              className="login-method d-flex align-items-center gap-3 my-2 btn btn-primary btn-lg btn-block"
              style={Facebook_style}
              onClick={FacebookSignin}
            >
              <i className="fa-brands ms-5 fa-facebook"></i> Continue with Facebook.
            </button>
            <button className="login-method d-flex align-items-center gap-3 my-2 btn btn-dark btn-lg btn-block"
                onClick={TwitterSingin}
            >
               <i className="fa-brands ms-5  fa-x-twitter"></i>  Continue with X
              </button>
            <button
              type="button"
              className="login-method d-flex align-items-center gap-3 my-2 btn btn-light btn-lg btn-block"
              style={Google_style}
              onClick={GoogleSignin}
            >
              <i className="fa-brands ms-5 fa-google" style={Google_icon}></i>
              Continue with Google.
            </button>
            <button
              onClick={go__toggle}
              type="button"
              className="login-method d-flex align-items-center gap-3 my-2 btn btn-success btn-lg btn-block"
            >
              <i className="fa-regular mx-3 fa-envelope"></i> Sing up with Email.
            </button>
  </>)
}
function MainComp({onForgotPassword}){
  const { displaylogin, singUp,forgotPassword,} = useContext(RegesterContext);
  const label_style = {width:"100%"};
   const nameRef = useRef('');
   const emailRef = useRef('');
   const passwordRef = useRef('');
   const handelUserRegister = (e)=>{
      e.preventDefault();
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
       displaylogin?LoginFunc(email, password):SignUpFunc(email, password, name);
    }
    // Login Function 
    const LoginFunc = async (email, password) => {
      // const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
          console.log("User logged in successfully:", user.email);
          window.location.href = "/";
          return { success: true, user };
        }
      } catch (error) {
        console.error("Login error:", error);
        // Handle specific errors
        let errorMessage = "An error occurred during login.";
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "The email address is invalid.";
            break;
          case "auth/user-disabled":
            errorMessage = "This account has been disabled.";
            break;
          case "auth/user-not-found":
            errorMessage = "No user found with this email address.";
            break;
          case "auth/wrong-password":
            errorMessage = "The password is incorrect.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many failed login attempts. Please try again later.";
            break;
          default:
            errorMessage = error.message;
        }
    
        return { success: false, error: errorMessage };
      }
    };
    // Sing Up function
    const SignUpFunc = async (email, password, name) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name: name,
          createdAt: new Date().toISOString(),
        });
        return window.location.href === '/';
      } catch (error) {
        console.error(`there was an error with Registering !!!: ${error.message}`);
      }
    };
    
    const html_Email = ()=>{return(
       <div className="input-card email-input-card mb-2">
          <label htmlFor="user-email" style={label_style}>User Email</label>
          <input
            ref={emailRef}
            type="email"
            placeholder="12jlsd#'#''@gmail.com"
            email="user-email"
            name='user-email'
          />
        </div>
     )};
    const html_Name = ()=>{
    if(singUp===true){
      return(
      <div className="input-card name-input-card mb-2">
        <label htmlFor="user-name" style={label_style}>User name</label>
        <input
          ref={nameRef}
          type="text"
          placeholder="Ayoub Elomari"
          name="user-name"
        />
      </div>)
    }
    }

    const HTML_Password = ()=>{
      return(<>  
    <div className="input-card password-input-card mb-2">
      <div className="flex-center justify-content-between">
        <label htmlFor="user-password">Password</label>
        {displaylogin&&
         <span
          onClick={onForgotPassword}
          className="forget-password-btn ms-5 text-decoration-none cursor-pointer"
          >Forgot Password?
        </span>}
      </div>
      <div className="position-relative">
        <input
          type="password"
          ref={passwordRef}
          placeholder="enter your password"
          name="user-password"
        />
        <i className="fa-regular fa-eye position-absolute"></i>
      </div>
    </div></>)}

  return (<>
            <div>
             {html_Email()}
             {singUp&&!forgotPassword?html_Name():''}
             {!forgotPassword?HTML_Password():''}
              <button onClick={handelUserRegister}
                 type="submit"
                 className="btn btn-light btn-lg">
                 {displaylogin&&'Login'}
                 {singUp&&'Sing Up'}
                 {forgotPassword&&'Reset Password'}
             </button>
            </div>
  </>)
}
function AlertComp(){
  const Context = useContext(RegesterContext);
  const {status,handelAlert} = Context;
  return(<>
   <p className="RegisterAlert">
      {status.text}
      <span
        onClick={handelAlert}
        className="green-login-btn ms-2 colored"
        style={{cursor: "pointer"}}
        >
          {status.btn}
        </span>
    </p>
  </>)
}




