import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const ResponsiveAreaChart = ({ chartData }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  // Track window size dynamically
  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {windowSize > 450 ? (
        <AreaChart
          width={450}
          height={300}
          data={chartData}
        >
          <XAxis dataKey="monthStart" />
          <YAxis />
          <CartesianGrid strokeDasharray="2 2" opacity="0.25" />
          <Tooltip cursor={{ strokeDasharray: "4 4", strokeWidth: 2, width: "20px" }} labelStyle={{ width: "4px" }} />
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
        <AreaChart
          width={windowSize-50} // Adjusted for smaller size
          height={windowSize-50} // Adjusted for smaller size
          data={chartData}
        >
          <XAxis dataKey="monthStart" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" opacity="0.25" />
          <Tooltip cursor={{ strokeDasharray: "4 4", strokeWidth: 2, width: "20px" }} labelStyle={{ width: "4px" }} />
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
      )}
    </div>
  );
};

export default ResponsiveAreaChart;
