/* CONSTANTS AND GLOBALS */
const width = 600,
  height = 600,
  margin = 40,
  radius = 5;

/* LOAD DATA */
d3.csv("../data/owidCO2Data.csv", d3.autoType)
  .then(co2 => {
    // console.log(co2)

    const year = co2.filter(d => d.year === 2019)
    console.log(year)

    const svg = d3.select("#container")
      .append('svg')
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "white")


    /* SCALES */
    const xScale = d3.scaleLinear()
      .domain(d3.extent(co2, d => d.co2))
      .range([margin, width - margin])
      .nice()

    const yScale = d3.scaleLinear()
      .domain(d3.extent(co2, d => d.gdp))
      .range([height - margin, margin])
      .nice()

    // const sizeScale = d3.scaleSqrt()
    //   .domain([0, 100])
    //   .range([0, 30])   tried this but didn't work

    /* AXES */
    const xAxis = d3.axisBottom()
      .scale(xScale);
    const xAxisTranslate = height - margin

    svg.append('g')
      .attr('transform', `translate(0, ${xAxisTranslate})`)
      .call(xAxis);

    const yAxis = d3.axisLeft()
      .tickFormat(d3.format('~s'))
      .scale(yScale);

    svg.append('g')
      .attr('transform', `translate(${margin}, 0)`)
      .call(yAxis)

    /* HTML ELEMENTS */
    svg.selectAll(".dot")
      .data(co2)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.co2))
      .attr("cy", d => yScale(d.gdp))
      .attr("r", radius)
      // .attr("area", sizeScale)
      .style("fill", "red")

  });