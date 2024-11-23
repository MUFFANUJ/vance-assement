import React, { useEffect } from 'react'
import siren from "../assets/siren.png"
import styles from "../styles/loginPageStyling.module.css"
import { GoogleAuthProvider } from "firebase/auth";
import {app} from "../firebase/firebase.js"
import { getAuth, signInWithPopup } from "firebase/auth";
import googleIcon from "../assets/google_icon.svg"
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const singInWithGoogle = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    localStorage.setItem("loggedIn",true)
    navigate("/dashboard");
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  })};

  
  useEffect(()=> {
    if (localStorage.getItem('loggedIn') === "true"){
      navigate("/dashboard")
      return
    }
  },[])
  return (
    <div className={styles.loginPage}>
      <div className={styles.superDiv}>
        <div className={styles.sirenParentDiv}>
          <div className={styles.sirenRoundedDiv}>
          </div>
        </div>

        <div className={styles.loginInfoBox}>
            <div>
              <img src={siren} alt='image of a siren' className={styles.sirenLogo}/>
            </div>

            <div className={styles.accessText}>
                <div className={styles.accessHeading}>
                    Access <br/> rate alert dashboard
                </div>

                <div className={styles.accessBody}>
                Stay updated with real-time currency rates and manage your alerts.
                </div>
            </div>

            <div className={styles.footerSignIn}>
              <button className={styles.singInBtn} onClick={singInWithGoogle}>
                <img src={googleIcon} />
                Sign in with Google
              </button>
              <div className={styles.termsAndConditions}>
                  By creating an account or signing you agree to our <span className={styles.spantermAndCondition}>Terms and Conditions</span>
              </div>

            </div>
        </div>
      </div>
    </div>
  )
}
