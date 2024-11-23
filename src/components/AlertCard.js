import React from 'react'
import style from "../styles/alertCard.module.css"
import UAEFlag from '../assets/UAEFlag.png'
import UKFlag from "../assets/ukIcon-removebg-preview.png"

export default function AlertCard({item}) {
  return (
    <div className={style.cardBody}>
        <div className={style.titleAndDate}>
            <div>
                <div className={style.title}>{item.title}</div>
                <div className={style.rateAlert}>₹{Math.round(item.rateAlertValue * 100)/100}</div>
            </div>
             {/* <div>{item.createdAt.month.toString()}</div> */}
            <div className={style.date}> 
            <span className={style.dateSet}>12</span>
             <span className={style.divider}>/</span>
             <span className={style.dateSet}>24</span>
             <span className={style.divider}>/</span>
              <span className={style.dateSet}>2024</span></div>
        </div>
        
        
        <div className={style.country}>
            {
                item.country === "GBP" ? (<><img src={UKFlag} /> <span style={{fontWeight:"bold"}}>UK</span></>) : (<><img style={{width:"20px"}} src={UAEFlag} /> <span>UAE</span></>)
            }
            
            <div className={style.modalCountryPrice}>
            {/* {
              item.country === "GBP" ? (<span>
                UK
              </span>) : (<span>
              UAE
            </span>)
            } */}
          <span >
            { item.country === "GBP" ? (<span className={style.modalCountryPricespan}>£ ({item.country})</span>) : (<span className={style.modalCountryPricespan}>&#x62F;&#x2E;&#x625; ({item.country})</span>)}
            
            </span>
            </div>
       </div>
    </div>
  )
}

