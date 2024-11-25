import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const ResponsiveAreaChart = ({ chartData }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  
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
      color: "#b20000",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "16px",
      fontFamily: "Arial, sans-serif",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      height:"40vh",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center"
    };
  
    const iconStyles = {
      fontSize: "18px",
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
      No chart data available at the moment. (API failed due to CORS error).
    </div>
      )}
    </div>
  );
};

export default ResponsiveAreaChart;
