import React,{useState , useEffect} from "react";
import styles from "../styles/modal.module.css";
import UKFlag from "../assets/ukIcon-removebg-preview.png"
import UAEFlag from "../assets/UAEFlag.png"
import { FaSquarePlus } from "react-icons/fa6";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js"


const Modal = ({ isOpen, onClose, children,selectedCountry }) => {
  const [isActive, setIsActive] = useState(false);
  const [title,setTitle] = useState("");
  const [rateAlertValue,setRateAlertValue] = useState("");
  
  useEffect(() => {
    console.log(typeof new Date().toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short', 
      year: 'numeric',
    }));
    if (isOpen) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isOpen]);

  if (!isOpen && !isActive) return null;

  const handleSubmit = async() => {
  //   try{
  //   const response = await setDoc(doc(db, "responses", "rateValue"), {
  //     title: title,
  //     rateAlertValue: rateAlertValue,
  //   });
  //   console.log(response)
  // }catch(err){
  //   console.log(err)
  // }

  try {
    await addDoc(collection(db, "responses"), {
        title: title,
        rateAlertValue: parseFloat(rateAlertValue),
        createdAt: new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short', 
          year: 'numeric',
        }),
        country:selectedCountry,
    });
    console.log("Document successfully added!");
} catch (e) {
    console.error("Error adding document: ", e);
}
  setTitle("");
  setRateAlertValue("");
  onClose()
  }

  // const handleCancel=()=>{
  //   setTitle("");
  //   setRateAlertValue("");
  //   onClose()
  // }


  return (
    <div className={`${styles.modalOverlay} ${isActive ? styles.open : ""}`}>
    <div className={`${styles.modalContainer} ${isActive ? styles.open : ""}`}>
      {/* <button className={styles.modalClosebtn} onClick={onClose}>×</button> */}

      <div className={styles.modalUpperHead}>
          <div className={styles.modalTitle}>Set Rate alert!</div>
          {
            selectedCountry === "GBP" ? (<><img src={UKFlag} alt="UK flag" /></>) : (<img src={UAEFlag} alt="UAE flag" style={{width:"60px"}}/>)
          }
        
          <div className={styles.modalCountryPrice}>
            {
              selectedCountry === "GBP" ? (<span>
                UK
              </span>) : (<span>
              UAE
            </span>)
            }
          <span>
            { selectedCountry === "GBP" ? (<>£</>) : (<>&#x62F;&#x2E;&#x625;</>)}
            ({selectedCountry})
            </span>
          </div>
      </div>
        

        <div className={styles.modalForm}>
          <div className={styles.inputBoxModal}>
            <label htmlFor="title">Title</label>
            <div>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
            />
            </div>
          </div>

          <div className={styles.inputBoxModal}>
            <label htmlFor="rateAlertValue">Rate alert Value</label>
            <div>
            <input
              type="number"
              id="rateAlertValue"
              step="any"
              name="rateAlertValue"
              value={rateAlertValue}
              onChange={(e)=> setRateAlertValue(e.target.value)}
            />
            </div>
          </div>

          <div className={styles.modalBtns}>
            <button onClick={handleSubmit}>
              Set alert 
              <FaSquarePlus />
              </button>
              {children}
          </div>
        </div>

      </div>
    </div>
  
  );
};

export default Modal;

