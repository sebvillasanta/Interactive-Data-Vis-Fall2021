/* CONSTANTS AND GLOBALS */
const width = 960;
const height = 500;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)
    
    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "white")
    
    const activities = data.map(d => d.activity)
    console.log('activities :>> ', activities);

    /* SCALES */
    // /* Vertical bars*/
    // /** This is where you should define your scales from data to pixel space */
    // const xScale = d3.scaleBand()
    //   .domain(data.map(d => d.activity))
    //   .range([0, width])
    //   .paddingInner(.2);

    // const yScale = d3.scaleLinear()
    //   .domain(d3.extent(data, d => d.count))
    //   .range([height, 0])
    //   .nice()

    // /* HTML ELEMENTS */
    // /** Select your container and append the visual elements to it */

    // svg.selectAll(".bar")
    //   .data(data)
    //   .join("rect")
    //   .attr("class", "bar")
    //   .attr("x", d => xScale(d.activity))
    //   .attr("y", d => yScale(d.count))
    //   .attr("width", xScale.bandwidth)
    //   .attr("height", d => height - yScale(d.count))

    /* Horizontal bars*/
    /** This is where you should define your scales from data to pixel space */
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.activity))
      .range([height, 0])
      .paddingInner(.2);


    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.count))
      .range([width, 0])
      .nice()

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */
    
    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("y", d => yScale(d.activity))
      .attr("x", d => xScale(d.count))
      .attr("width", d => width - xScale(d.count))
      .attr("height", yScale.bandwidth())
    

  })