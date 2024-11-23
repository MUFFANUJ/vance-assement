import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UAELogo from "../assets/UAEFlag.png";
import appStore from "../assets/appStoreIcon.svg";
import googlePlay from "../assets/Button.svg";
import holdingPhone from "../assets/holdingPhone.svg";
import screen1 from "../assets/Screen1.svg";
import screen2 from "../assets/Screen2.svg";
import screen3 from "../assets/Screen3.svg";
import styles from "../styles/landingPage.module.css";
import live from "../assets/Live.png";
// import TestimonialCard from "../assets/TestimonialCard.svg"
import { GoAlertFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import group1 from "../assets/Group1.png";
import group2 from "../assets/Group2.png";
import group3 from "../assets/Group3.png";

gsap.registerPlugin(ScrollTrigger);
export default function LandingPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const buttonsRef = useRef([]);
  // const textRef = useRef([]);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const landingData = [
    {
      heading: "Send money to India at Google rates.",
      body: "Say goodbye to forex fees- get the best value for your transfers",
      handImagURl: screen1,
    },
    {
      heading: "Always know when it’s a good time to transfer with",
      body: "Whether you're sending money home, paying for services in a different currency, or managing investments - Set a desired rate, and we'll notify you when it's time to make your move.",
      handImagURl: UAELogo,
    },
    {
      heading: "Always know when it’s a good time to transfer with",
      body: "Whether you're sending money home, paying for services in a different currency, or managing investments - Set a desired rate, and we'll notify you when it's time to make your move.",
      handImagURl: screen1,
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      navigate("/dashboard");
      return;
    }

    const images = imagesRef.current;
    // const texts = textRef.current;
    gsap.set(images, { opacity: 0, position: "absolute", top: "5%", left: "35%" });
    gsap.set(images[0], { opacity: 1 });
    // gsap.set(texts, { opacity: 0 });
    // gsap.set(texts[0], { opacity: 1 });

    images.forEach((image, index) => {
      const scrollStart = 400 * index;
      const scrollEnd = 400 * (index + 1);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `${scrollStart}vh top`,
        end: `${scrollEnd}vh top`,
        onEnter: () => gsap.to(image, { opacity: 1, duration: 0.5 }),
        onEnterBack: () => gsap.to(image, { opacity: 1, duration: 0.5 }),
        onLeave: () => {
          if (index < images.length - 1) {
            gsap.to(image, { opacity: 0, duration: 0.5 });
          }
        },
        onLeaveBack: () => {
          if (index > 0) {
            gsap.to(image, { opacity: 0, duration: 0.5 });
          }
        },
      });
    });

    const backgroundColors = [
      "#ffffff",
      "radial-gradient(50% 50% at 50% 50%, #4602D9 0%, #111111 100%)",
      "radial-gradient(50% 50% at 50% 50%, #FF3A44BF 0%, #111111 100%)",
    ];
    const container = containerRef.current;
    backgroundColors.forEach((color, index) => {
      const scrollStart = 400 * index;
      const scrollEnd = 400 * (index + 1);

      ScrollTrigger.create({
        trigger: container,
        start: `${scrollStart}vh top`,
        end: `${scrollEnd}vh top`,
        onEnter: () => {
          gsap.to(container, { background: color, duration: 0.5 });
        },
        onEnterBack: () => {
          gsap.to(container, { background: color, duration: 0.5 });
        },
      });
    });

    // backgroundColors.forEach((color, index) => {
    //   const scrollStart = 800 * index;
    //   const scrollEnd = 800 * (index + 1);

    //   ScrollTrigger.create({
    //     trigger: container,
    //     start: `${scrollStart}vh top`,
    //     end: `${scrollEnd}vh top`,
    //     onEnter: () =>{
    //       setActiveButtonIndex(prev => prev+1)},
    //     onEnterBack: () =>{
    //       setActiveButtonIndex(prev => prev-1)},
    //   });
    // });

    // const sections = imagesRef.current;
    // texts.forEach((image, index) => {
    //   const scrollStart = 15* index; // Start the trigger at 150vh increments
    //   const scrollEnd = 15 * (index + 1); // End the trigger at the next 150vh increment

    //   ScrollTrigger.create({
    //     trigger: containerRef.current,
    //     start: `${scrollStart}vh top`, // Start at 150vh increments for each image
    //     end: `${scrollEnd}vh top`, // End at the next 150vh
    //     onEnter: () => gsap.to(image, { opacity: 1, duration: 0.5 }),
    //     onLeave: () => gsap.to(image, { opacity: 0, duration: 0.5 }),
    //     onEnterBack: () => gsap.to(image, { opacity: 1, duration: 0.5 }),
    //     onLeaveBack: () => gsap.to(image, { opacity: 0, duration: 0.5 }),
    //   });
    // });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
    scrollToImage(index);
  };

  const scrollToImage = (index) => {
    const scrollPosition = 400 * index;
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.landingBody} style={{ height: "350vh" }}>
      <div>
        <div className={styles.header}>
          <div className={styles.heading}>{landingData[0].heading}</div>

          <div className={styles.body}>{landingData[0].body}</div>

          {/* <div 
          ref={(el) => (textRef.current[1] = el)}
          className={styles.header} 
          >
            <div className={styles.heading}>{landingData[1].heading}</div>

            <div className={styles.body}>{landingData[1].body}</div>
        </div> */}

          <div className={styles.downloadBtns}>
            <img src={appStore} alt="app store logo" />
            <img src={googlePlay} alt="google playstore logo" />
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        style={{
          position: "sticky",
          backgroundColor: "white",
          color: "black",
          top: "0px",
          height: "100vh",
        }}
      >
        <div className={styles.holdingPhone}>
          <div >
            <div className={styles.screenImage}>
              <div>
                <img
                  className={styles.mainBackgroundImage}
                  src={group1}
                  alt="a hand holding a phone"
                  ref={(el) => (imagesRef.current[0] = el)}
                />
                <img
                  className={styles.mainBackgroundImage}
                  src={group2}
                  alt="a hand holding a phone"
                  ref={(el) => (imagesRef.current[1] = el)}
                />
                <img
                  className={styles.mainBackgroundImage}
                  src={group3}
                  alt="a hand holding a phone"
                  ref={(el) => (imagesRef.current[2] = el)}
                />
              </div>
              
              <div className={styles.navigationBtns}>
                <button
                  ref={(el) => (buttonsRef.current[0] = el)}
                  onClick={() => handleButtonClick(1.5)}
                  className={`${styles.navigationBtnsButton} ${
                    activeButtonIndex === 1.5 ? styles.activeButton : ""
                  }`}
                >
                  Currency Converter
                  <span>&#8377;</span>
                </button>
                <button
                  ref={(el) => (buttonsRef.current[1] = el)}
                  onClick={() => handleButtonClick(2.5)}
                  className={`${styles.navigationBtnsButton} ${
                    activeButtonIndex === 2.5 ? styles.activeButton : ""
                  }`}
                >
                  Live rates
                  <span>
                    <img style={{ width: "15px" }} src={live} alt="live logo" />
                  </span>
                </button>
                <button
                  ref={(el) => (buttonsRef.current[2] = el)}
                  onClick={() => handleButtonClick(3.5)}
                  className={`${styles.navigationBtnsButton} ${
                    activeButtonIndex === 3.5 ? styles.activeButton : ""
                  }`}
                >
                  Set rate alert
                  <span>
                    <GoAlertFill />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
