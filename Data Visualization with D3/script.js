// Chart dimensions and padding
const width = 800;
const height = 500;
const padding = 60;

// Data source URL
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

// Fetch and process data
d3.json(url).then(data => {
    // Parse data: convert date strings to Date objects
    const gdpData = data.data.map(d => ({
        date: new Date(d[0]),
        gdp: d[1]
    }));

    // Scales for axes
    const xScale = d3.scaleTime()
        .domain(d3.extent(gdpData, d => d.date))
        .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(gdpData, d => d.gdp)])
        .range([height - padding, padding]);

    // Create SVG container inside #chart
    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append x-axis
    svg.append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${height - padding})`)
        .call(xAxis);

    // Append y-axis
    svg.append('g')
        .attr('id', 'y-axis')
        .attr('transform', `translate(${padding}, 0)`)
        .call(yAxis);

    // Bar width calculation
    const barWidth = (width - 2 * padding) / gdpData.length - 1;

    // Bars (User Stories #5-11)
    svg.selectAll('.bar')
        .data(gdpData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.date))
        .attr('y', d => yScale(d.gdp))
        .attr('width', barWidth)
        .attr('height', d => height - padding - yScale(d.gdp))
        .attr('data-date', d => d.date.toISOString().split('T')[0])
        .attr('data-gdp', d => d.gdp)
        .attr('fill', 'steelblue')
        .on('mouseover', function (event, d) {
            d3.select('#tooltip')
                .style('visibility', 'visible')
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px')
                .attr('data-date', d.date.toISOString().split('T')[0])
                .html(
                    `<strong>Date:</strong> ${d.date.toISOString().split('T')[0]}<br>
                     <strong>GDP:</strong> $${d.gdp} Billion`
                );
        })
        .on('mousemove', function (event) {
            d3.select('#tooltip')
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function () {
            d3.select('#tooltip')
                .style('visibility', 'hidden');
        });
}).catch(error => {
    console.error('Error fetching or processing data:', error);
});
