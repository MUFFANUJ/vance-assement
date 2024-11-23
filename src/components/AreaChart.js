import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const ResponsiveAreaChart = ({ fetchChartData }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch data with retry logic
  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchChartData(); // Call the fetch function passed as a prop
      setChartData(data);
    } catch (err) {
      console.error("Error fetching chart data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Track window size dynamically
  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {`${payload[0].value.toFixed(2)}L`}
          </p>
        </div>
      );
    }
    return null;
  };

  const errorStyles = {
    // backgroundColor: "#ffe5e5",
    color: "#b20000",
    padding: "10px",
    // border: "1px solid #ffcccc",
    borderRadius: "5px",
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    height: "40vh",
  };

  const iconStyles = {
    fontSize: "18px",
  };

  const retryButtonStyles = {
    padding: "10px 15px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "14px",
  };

  const loaderStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const loaderIconStyles = {
    fontSize: "30px",
    animation: "spin 1s linear infinite",
  };

  // Simple CSS for spinner animation
  const spinnerCSS = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  if (loading) {
    return (
      <div style={loaderStyles}>
        <style>{spinnerCSS}</style>
        <div style={loaderIconStyles}>⏳</div> {/* You can replace it with a spinner image or icon */}
      </div>
    );
  }

  if (error) {
    return (
      <div style={errorStyles}>
        <span style={iconStyles}>⚠️</span>
        Failed to load chart data. Please try again.
        <button style={retryButtonStyles} onClick={loadData}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {chartData.length ? (
        windowSize > 450 ? (
          <AreaChart width={450} height={300} data={chartData}>
            <XAxis dataKey="monthStart" tickFormatter={(tick) => tick} />
            <YAxis />
            <CartesianGrid strokeDasharray="2 2" opacity="0.25" />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: "4 4", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              stackId="1"
              dataKey="close"
              stroke="#79E7A5"
              fill="#79E7A5"
              strokeWidth="2.5px"
              strokeLinecap="round"
              fillOpacity="0.37"
              activeDot={{ r: 8, stroke: "#79E7A5" }}
            />
          </AreaChart>
        ) : (
          <AreaChart width={windowSize - 50} height={windowSize - 50} data={chartData}>
            <XAxis dataKey="monthStart" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" opacity="0.25" />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: "3 3", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              stackId="1"
              dataKey="close"
              stroke="#79E7A5"
              fill="#79E7A5"
              strokeWidth="2.5px"
              strokeLinecap="round"
              fillOpacity="0.37"
              activeDot={{ r: 8, stroke: "#79E7A5" }}
            />
          </AreaChart>
        )
      ) : (
        <div style={errorStyles}>
          <span style={iconStyles}>⚠️</span>
          No chart data available at the moment. Please check back later.
        </div>
      )}
    </div>
  );
};

export default ResponsiveAreaChart;
