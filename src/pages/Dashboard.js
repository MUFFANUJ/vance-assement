import React, { useEffect, useState } from "react";
import Modal from "../components/Modal.js";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import modalStyles from "../styles/modal.module.css";
import dashboardStyles from "../styles/dashboard.module.css";
import { FaSquarePlus } from "react-icons/fa6";
import UKFlag from "../assets/ukIcon-removebg-preview.png";
import AreaChartContainer from "../components/AreaChart.js";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import AlertCard from "../components/AlertCard.js";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataArr, setFormDataArr] = useState([]);
  const [chartData, setChartData] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("GBP");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('loggedIn') !== "true"){
      navigate("/")
    }
    getDataFromFirebase();
    getChartData(selectedCountry);
  }, []);

  const selectedTimeLine = "1Y";

  const ITEMS_PER_PAGE = 2;

  const totalPages = Math.ceil(formDataArr.length / ITEMS_PER_PAGE);

  // Navigate to a specific page
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // const renderPagination = () => {
  //   const buttons = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     buttons.push(
  //       <button
  //         key={i}
  //         className={`${dashboardStyles.paginationbtn} ${currentPage === i ? dashboardStyles.active : ""}`}
  //         onClick={() => goToPage(i)}
  //       >
  //         {i}
  //       </button>
  //     );
  //   }

  //   return (
  //     <>
  //       <button
  //         className={dashboardStyles.paginationbtn}
  //         onClick={() => goToPage(currentPage - 1)}
  //         disabled={currentPage === 1}
  //       >
  //         <IoIosArrowBack />
  //       </button>

  //       {buttons}
  //       <button
  //         className={dashboardStyles.paginationbtn}
  //         onClick={() => goToPage(currentPage + 1)}
  //         disabled={currentPage === totalPages}
  //       >
  //         <IoIosArrowForward />
  //       </button>
  //     </>
  //   );
  // };

  const renderPagination = () => {
    const buttons = [];

    if (totalPages <= 3) {
      // Show all buttons if total pages are less than or equal to 3
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`${dashboardStyles.paginationbtn} ${
              currentPage === i ? dashboardStyles.active : ""
            }`}
            onClick={() => goToPage(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Always show the first page
      buttons.push(
        <button
          key={1}
          className={`${dashboardStyles.paginationbtn} ${
            currentPage === 1 ? dashboardStyles.active : ""
          }`}
          onClick={() => goToPage(1)}
        >
          1
        </button>
      );

      // Show the second page if currentPage <= 3
      if (currentPage <= 3) {
        buttons.push(
          <button
            key={2}
            className={`${dashboardStyles.paginationbtn} ${
              currentPage === 2 ? dashboardStyles.active : ""
            }`}
            onClick={() => goToPage(2)}
          >
            2
          </button>
        );
      }

      // Add ellipsis if currentPage > 3
      if (currentPage > 3) {
        buttons.push(<span key="dots-before">...</span>);
      }

      // Add currentPage button if it's not the first or last page
      if (currentPage > 2 && currentPage < totalPages - 1) {
        buttons.push(
          <button
            key={currentPage}
            className={`${dashboardStyles.paginationbtn} ${dashboardStyles.active}`}
            onClick={() => goToPage(currentPage)}
          >
            {currentPage}
          </button>
        );
      }

      // Add ellipsis before the last page if the current page isn't near it
      if (currentPage < totalPages - 2) {
        buttons.push(<span key="dots-after">...</span>);
      }

      // Always show the last page
      buttons.push(
        <button
          key={totalPages}
          className={`${dashboardStyles.paginationbtn} ${
            currentPage === totalPages ? dashboardStyles.active : ""
          }`}
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <>
        <button
          className={dashboardStyles.paginationbtn}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack />
        </button>
        {buttons}
        <button
          className={dashboardStyles.paginationbtn}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <IoIosArrowForward />
        </button>
      </>
    );
  };

  const handleCountryChange = async (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    getChartData(country);
  };

  const getChartData = async (country) => {
    try {
      const response = await axios.get(
        `https://web-api.vance.club/public/api/currency-converter/forex?code=${country}INR%3DX&timeline=${selectedTimeLine}`
      );
      const weekly = getMonthlyAverages(response.data);
      setChartData(weekly);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // function getWeeklyAverages(data) {
  //   const weeklyData = [];
  //   const groupedByWeek = {};

  //   data.forEach((item) => {
  //     const date = new Date(item.resDate);
  //     const weekStart = getStartOfWeek(date); // Get the start of the week for the date

  //     if (!groupedByWeek[weekStart]) {
  //       groupedByWeek[weekStart] = [];
  //     }

  //     groupedByWeek[weekStart].push(item);
  //   });

  //   // Now calculate the average for each week
  //   for (let weekStart in groupedByWeek) {
  //     const weekItems = groupedByWeek[weekStart];
  //     const weekAvg = calculateAverage(weekItems);
  //     weeklyData.push({
  //       weekStart,
  //       ...weekAvg,
  //     });
  //   }

  //   return weeklyData;
  // }

  function getStartOfWeek(date) {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day; // Adjust to the previous Sunday
    startOfWeek.setDate(diff);
    return startOfWeek.toISOString().split("T")[0]; // Return as YYYY-MM-DD format
  }

  function calculateAverage(items) {
    const avg = {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      adjClose: 0,
    };

    items.forEach((item) => {
      avg.open += parseFloat(item.open);
      avg.high += parseFloat(item.high);
      avg.low += parseFloat(item.low);
      avg.close += parseFloat(item.close);
      avg.adjClose += parseFloat(item.adjClose);
    });

    const count = items.length;
    avg.open /= count;
    avg.high /= count;
    avg.low /= count;
    avg.close /= count;
    avg.adjClose /= count;

    return avg;
  }

  function getMonthlyAverages(data) {
    const monthlyData = [];
    const groupedByMonth = {};

    data.forEach((item) => {
      const date = new Date(item.resDate);
      const monthStart = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`; // YYYY-MM format

      if (!groupedByMonth[monthStart]) {
        groupedByMonth[monthStart] = [];
      }

      groupedByMonth[monthStart].push(item);
    });

    // Now calculate the average for each month
    for (let monthStart in groupedByMonth) {
      const monthItems = groupedByMonth[monthStart];
      const monthAvg = calculateAverage(monthItems);
      monthlyData.push({
        monthStart,
        ...monthAvg,
      });
    }

    return monthlyData;
  }

  const getDataFromFirebase = async () => {
    try {
      const q = query(
        collection(db, "responses"),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFormDataArr(fetchedData);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedCountry={selectedCountry}
      >
        <button className={modalStyles.closeModalBtn} onClick={closeModal}>
          Close Modal
        </button>
      </Modal>

      <div className={dashboardStyles.dashBoardBody}>
        <div className={dashboardStyles.upperBody}>
          <div className={dashboardStyles.rateAlerHeading}>
            Rate alert dashboard
          </div>
          <div className={dashboardStyles.areaChartContent}>
            <div className={dashboardStyles.areaLineChart}>
              <div className={dashboardStyles.selectContainer}>
                <select
                  className={dashboardStyles.countrySelector}
                  onChange={handleCountryChange}
                  value={selectedCountry}
                >
                  <option value="GBP">
                    <img src={UKFlag} alt="UK flag" /> UK <span>£(GBP)</span>
                  </option>
                  <option value="AED">
                    <img alt="UAE flag" /> UAE{" "}
                    <span>&#x62F;&#x2E;&#x625;(AED)</span>
                  </option>
                  &#8662;
                </select>
              </div>
              <AreaChartContainer chartData={chartData} />

              <div className={dashboardStyles.footerUpper}>
                <div className={dashboardStyles.currentRate}>₹{Math.round(chartData[0]?.close * 100) / 100}</div>
                <div>
                  <button
                    onClick={openModal}
                    className={dashboardStyles.setAlertbtn}
                  >
                    Set alert <FaSquarePlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* lower card content */}
        <div className={dashboardStyles.lowerBody}>
          <div className={dashboardStyles.lowerTop}>
            <div className={dashboardStyles.previousAlert}>Previous alerts</div>
            <div>
              <div>
                {renderPagination()}
              </div>
            </div>
          </div>

          {formDataArr.length ? (
            formDataArr.map((item, index) => {
              if (
                index >= ITEMS_PER_PAGE * (currentPage ? currentPage - 1 : 0) &&
                index < ITEMS_PER_PAGE * currentPage
              ) {
                return <AlertCard item={item} key={index} />;
              }
              return null;
            })
          ) : (
            <div className={dashboardStyles.noAlertsAdded}>
              No Alerts Added yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
