import React,{useState,useEffect} from 'react'
import styles from "../styles/header.module.css"
import vanceLogo from "../assets/vanceLogo.png"
import { FaArrowCircleDown } from "react-icons/fa";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";

export default function Header() {
    const [showSignIn, setShowSignIn] = useState(false);
    const [showLogOut, setShowLogout] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
    if (window.location.pathname === "/") {
        setShowSignIn(true);
        setShowLogout(false);
        }else if(window.location.pathname === "/dashboard"){
            setShowLogout(true);
            setShowSignIn(false)
        } else {
            setShowSignIn(false);
            setShowLogout(false);
        }
    },[window.location.pathname])
    
  return (
    <header className={styles.headerTopLayer}>
        <div className={styles.headerInnerLayer}>
            <div>
                <img src={vanceLogo} alt='vance company logo' className={styles.companyLogo} onClick={()=> navigate("/")}/>
            </div>

            <div className={styles.headerBtns}>
                <button className={styles.headerDownloadBtn}>
                    Download app
                    <FaArrowCircleDown />
                </button>
                {showSignIn ? 
                    <button className={styles.headerDownloadBtn} onClick={()=> navigate("/login")}>
                    SignIn
                    <BsArrowUpRightCircleFill />
                </button> : ""}
                {showLogOut ? 
                    <button className={styles.headerDownloadBtn} onClick={()=> {
                        navigate("/")
                        localStorage.removeItem("loggedIn")
                    }}>
                    Sign out
                    <ImExit />
                </button> : ""}
            </div>
        </div>
        
    </header>
  )
}
