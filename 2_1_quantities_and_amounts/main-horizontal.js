/* CONSTANTS AND GLOBALS */
const width = 960;
const height = 500;
const bar_color = 'steelblue'
const start = 55


/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    const activities = data.map(d => d.activity)
    console.log('activities :>> ', activities);

    /* Horizontal bars*/
    /** This is where you should define your scales from data to pixel space */
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.count))
      .range([width, 0])
      .nice()

    const xAxis = g =>
      g
      .attr("transform", `translate(0,0)`)
      .call(d3.axisBottom(xScale).ticks(width / 100))
      .call(g => g.select(".domain").remove());


    const yScale = d3.scaleBand()
      .domain(data.map(d => d.activity))
      .range([0, height])
      .paddingInner(.2);

    const yAxis = g =>
      g.attr("transform", `translate(${start},0)`).call(
        d3
        .axisLeft(yScale)
        .tickFormat(data => data.activity)
        .tickSizeOuter(0)
      );


    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

    const svg = d3.select("#container-horizontal")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "white")

    svg.append("g")
      .attr("fill", bar_color)
      .selectAll("rect")
      // .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("y", d => yScale(d.activity))
      .attr("x", start)
      .attr("width", d => width - xScale(d.count))
      .attr("height", yScale.bandwidth())

    svg
      .append("g")
      .attr("fill", "black")
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", start)
      .attr("y", d => yScale(d.activity))
      .attr("dy", "3.7em")
      .attr("dx", -10)
      .text(d => d.activity) //  d3.format(d.value, format)) // x.tickFormat(20, format)) //  formatlabel(d.value))
      .call(text =>
        text
        .filter(d => xScale(d.activity))
        .attr("dx", +10)
        .attr("fill", "black")
        .attr("text-anchor", "start")
      );

    // svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    return svg.node();

  })