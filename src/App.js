import { useState } from "react";
import "./App.css";

const airports = [
  {
    start: "ISB",
    end: "LHR",
    cost: 1000,
  },
  {
    start: "LHR",
    end: "NYC",
    cost: 750,
  },
  {
    start: "CBS",
    end: "NYC",
    cost: 775,
  },
  {
    start: "ISB",
    end: "CBS",
    cost: 575,
  },
  {
    start: "CBS",
    end: "GRC",
    cost: 731,
  },
  {
    start: "NYC",
    end: "GRC",
    cost: 459,
  },
];
const Dropdown = ({ label, options, onChange }) => (
  <div>
    <label>{label}</label>
    <select onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

function shortestPathFunc(airports, startAirport, endAirport) {
  console.log(startAirport, endAirport);
  // Making a map from airports
  const airportMap = {};
  airports.forEach(({ start, end, cost }) => {
    if (!airportMap[start]) {
      airportMap[start] = [];
    }
    airportMap[start].push({ end, cost });
  });

  // console.log(airportMap)
  let minCost = Infinity;
  let minPath = [];
  const possibleRoutes = [
    { airport: startAirport, path: [startAirport], cost: 0 },
  ];

  while (possibleRoutes.length > 0) {
    // console.log("reached");
    // Looping through because there might be multiple routes and we need to check each of them individually
    const { airport, path, cost } = possibleRoutes.pop();

    if (airport === endAirport) {
      // console.log("inside same")
      if (cost < minCost) {
        minCost = cost;
        minPath = [...path];
      }
    } else if (airportMap[airport]) {
      for (const route of airportMap[airport]) {
        console.log("inside here", route);
        // This is where we are adding multiple routes to our possibleRoutes collection
        const { end: nextAirport, cost: routeCost } = route;
        possibleRoutes.push({
          airport: nextAirport,
          path: [...path, nextAirport],
          cost: cost + routeCost,
        });
        console.log("possibleRoute", possibleRoutes);
      }
    }
  }
  // We simply return the minCost and path
  console.log(minPath, minCost);
  return { path: minPath, cost: minCost };
}
function App() {
  const [startAirport, setStartAirport] = useState("");
  const [endAirport, setEndAirport] = useState("");

  const uniqueAirports = Array.from(
    new Set(airports.flatMap((airport) => [airport.start, airport.end]))
  );

  const handleStartChange = (e) => {
    setStartAirport(e.target.value);
  };

  const handleEndChange = (e) => {
    setEndAirport(e.target.value);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        height: "200px",
        alignItems: "end",
      }}
    >
      <Dropdown
        label="Select Starting Airport"
        options={uniqueAirports}
        onChange={handleStartChange}
      />
      <Dropdown
        label="Select Ending Airport"
        options={uniqueAirports}
        onChange={handleEndChange}
      />
      <div
        style={{
          fontSize: "20px",
          color: "black",
          fontWeight: "bold",
        }}
      >
        {/* {console.log(shortestPathFunc(airports, startAirport, endAirport))} */}
        {JSON.stringify(shortestPathFunc(airports, startAirport, endAirport))}
      </div>
    </div>
  );
}

export default App;
