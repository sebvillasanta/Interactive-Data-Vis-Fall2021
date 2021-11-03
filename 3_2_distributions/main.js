/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = {top: 20, bottom: 60, left: 60, right: 40},
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let colorScale;

/* APPLICATION STATE */
let co2 = {
  data: [],
  selectedcountry: "All" // + YOUR INITIAL FILTER SELECTION
};

/* LOAD DATA */
d3.csv("../data/owidCO2Data.csv", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("data", raw_data);
  const year = raw_data.filter(d => d.year === 2019)
  // save our data to application co2
  co2.data = year;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
xScale = d3.scaleLinear()
  .domain(d3.extent(co2.data, d => d.co2))
  .range([margin.left, width - margin.right])

.yScale = d3.scaleLinear()
  .domain(d3.extent(co2.data, d => d.gdp))
  .range([height -margin.bottom, margin.bottom])

  // + AXES
const xAxis = d3.axisBottom(xScale)
const yAxis = d3.axisLeft(yScale)

  // + UI ELEMENT SETUP
const selectElement = d3.select("#dropdown") // select dropdown element from HTML
// add in dropdown options
.data(
  Array.from(new Set(data.map(d=> d.region)))
  
  // [
  // { key: "All", label: "All"}
  // ]
  )


  // + CREATE SVG ELEMENT
svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

  // + CALL AXES
const xAxisGroup = svg.append("g")
  .attr("class", 'xAxis')
  .attr("transform", `translate(${0}, ${height - margin.bottom})`)
  .call(xAxis)

const yAxisGroup = svg.append("g")
  .attr("Class", 'yAxis')
  .attr("transform", `translate(${margin.left}, ${0})`)
  .call(yAxis)

xAxisGroup.append("text")
  .attr("class", 'axis-title')
  .attr("x", width / 2)
  .attr("y", 40)
  .attr("text-anchor", "middle")
  .text("CO2 emissions")

yAxisGroup.append("text")
  .attr("class", 'axis-title')
  .attr("x", -40)
  .attr("y", height / 2)
  .attr("writing-mode", "vertical-lr")
  .attr("text-anchor", "middle")
  .text("GDP")

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = co2.data
    .filter(d => co2.selectedregion === "All" || co2.selectedregion === d.co2)
  

  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.country)
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter,

      // + HANDLE UPDATE SELECTION
      update => update,

      // + HANDLE EXIT SELECTION
      exit => exit
    );
}