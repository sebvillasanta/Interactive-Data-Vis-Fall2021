/* CONSTANTS AND GLOBALS */
const width = 960;
const height = 500;


/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    const activities = data.map(d => d.activity)
    console.log('activities :>> ', activities);

    /* SCALES */
    /* Vertical bars*/
    /** This is where you should define your scales from data to pixel space */
    const xScale = d3.scaleBand()
      .domain(activities)
      .range([0, width])
      .paddingInner(.2);

    const getCount=d => d.count;

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, getCount))
      .range([height, 0])
      .nice()

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */
    
    const svg = d3.select("#container-vertical")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "white")

    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.activity))
      .attr("y", d => yScale(d.count))
      .attr("width", xScale.bandwidth)
      .attr("height", d => height - yScale(d.count))


  })