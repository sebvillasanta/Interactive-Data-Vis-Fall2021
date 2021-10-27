/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = {
    top: 20,
    bottom: 50,
    left: 60,
    right: 40
  };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../data/world.geo.json"),
  d3.csv("../data/owidCO2Data.csv", d3.autoType),
]).then(([geojson, co2]) => {
  console.log(geojson, co2)

  // SPECIFY PROJECTION
  const projection = d3.geoMercator()
  // .fitSize([
  //   width - margin - screenLeft - margin.right,
  //   height - margin.top - margin.bottom
  // ], geojson)
  console.log('projection :>> ', projection);


  // DEFINE PATH FUNCTION
  const pathGen = d3.geoPath(projection)

  // APPEND GEOJSON PATH  
  const svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height);

  const countries = svg.selectAll("path.countries")
    .data(geojson.features, d => d.properties.iso_a3)
    .join("path")
    .attr("class", "co2")
    .attr("stroke", "black")
    .attr("fill", "transparent")
    .attr("d", d => pathGen(d))


  // APPEND DATA AS SHAPE

});