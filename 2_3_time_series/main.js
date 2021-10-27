 /* CONSTANTS AND GLOBALS */
 const width = 600,
   height = 600,
   margin = 20;

 /* LOAD DATA */
 d3.csv('../data/owidCO2Data.csv', d => {
   return {
     year: new Date(+d.year, 0, 1),
     country: d.iso_code,
     co2_per_capita: +d.co2_per_capita
   }
 }).then(data => {
   console.log('data :>> ', data);

   const col = data.filter(d => d.country === 'COL')
   console.log(col)

   // SCALES
   const xScale = d3.scaleTime()
     .domain(d3.extent(col, d => d.year))
     .range([margin, width - margin])

   const yScale = d3.scaleLinear()
     .domain(d3.extent(col, d => d.co2_per_capita))
     .range([height - margin, margin])

   // CREATE SVG ELEMENT
   const svg = d3.select("#container")
     .append("svg")
     .attr("width", width)
     .attr("height", height)

   // BUILD AND CALL AXES

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

   // AREA CHART 

   const area = d3.area()
     .x(d => xScale(d.year))
     .y1(d => yScale(d.co2_per_capita))
     .y0(yScale(0))

   // LINE GENERATOR FUNCTION
   //  const lineGen = d3.line()
   //    .x(d => xScale(d.year))
   //    .y(d => yScale(d.co2_per_capita))

   //  const countriesMap = d3.group(col, d => d.country)
   //  console.log('countriesMap :>> ', countriesMap);

   //  const countriesArray = Array.from(countriesMap)
   //  console.log('countriesArray :>> ', countriesArray);

   //  const countriesData = countriesArray.map(([key, col]) => col)
   //  console.log('countriesData :>> ', countriesData);

   // DRAW AREA

   svg.append('path')
     .attr('d', area(col))
     .attr('stroke', '#147F90')
     .attr('stroke.width', '2px')
     .attr('fill', '#A6E8F2')

   // DRAW LINE
   //  svg.selectAll(".trend")
   //    .data([col])
   //    .join("path")
   //  .attr("class", "trend")
   //  .attr("stroke", "red")
   //  .attr("fill", "none")
   //  .attr("d", d => lineGen(d))

 });