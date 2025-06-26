// Chart dimensions and padding
const width = 800;
const height = 500;
const padding = 70;

// Data url
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

// Fetch data from the URL
d3.json(url).then(data => {
    const cyclistData = data.map(d => ({
        name: d.Name,
        nationality: d.Nationality,
        year: d.Year, // use number for x
        seconds: d.Seconds,
        timeStr: d.Time,
        doping: d.Doping,
        timeDate: new Date(1970, 0, 1, 0, Math.floor(d.Seconds / 60), d.Seconds % 60) // Date object for y
    }));

    // Calculate min/max for x
    const minYear = d3.min(cyclistData, d => d.year);
    const maxYear = d3.max(cyclistData, d => d.year);

    // Extend x domain by one year on each side
    const xDomainMin = minYear - 1;
    const xDomainMax = maxYear + 1;

    // Calculate min and max times for y (as Date objects)
    const minTime = d3.min(cyclistData, d => d.timeDate);
    const maxTime = d3.max(cyclistData, d => d.timeDate);

    /// Scales for axes
    const xScale = d3.scaleLinear()
        .domain([xDomainMin, xDomainMax])
        .range([padding, width - padding]);

    const yScale = d3.scaleTime()
        .domain([maxTime, minTime]) // invert: higher times at bottom
        .range([height - padding, padding]);

    // Create SVG container inside #chart
    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create axes
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format('d')); // integer years

    const yAxis = d3.axisLeft(yScale)
        .tickFormat(d3.timeFormat('%M:%S'));

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

    // Add y-axis label
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', padding - 60)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .attr('class', 'y-label')
        .attr('font-size', '12px')
        .text('Time in minutes');

    // Add x-axis label
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - padding + 50)
        .attr('text-anchor', 'middle')
        .attr('class', 'x-label')
        .attr('font-size', '12px')
        .text('Year');

    // Dot width calculation
    const dotWidth = 5;

    // Circles 
    svg.selectAll('.dot')
        .data(cyclistData)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.year)) // use number for x
        .attr('cy', d => yScale(d.timeDate)) // use Date object for y
        .attr('r', dotWidth)
        .attr('data-xvalue', d => d.year)
        .attr('data-yvalue', d => d.timeDate.toISOString())
        .attr('fill', d => d.doping === "" ? "orange" : "steelblue")
        .on('mouseover', function (event, d) {
            d3.select('#tooltip')
                .style('visibility', 'visible')
                .attr('data-year', d.year)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px')
                .style('text-align', 'left')
                .html(
                    `<strong>${d.name}</strong>: ${d.nationality}<br>
                    <strong>Year:</strong> ${d.year}, <strong>Time:</strong> ${d.timeStr}` +
                    (d.doping ? `<br><strong>Doping:</strong> ${d.doping}` : '')
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

    // Legend data
    const legendList = [
        { color: "steelblue", text: "Doping allegations" },
        { color: "orange", text: "No doping allegations" }
    ];

    const legendFontSize = 10;      // font size for legend text
    const legendSpacing = 19;       // spacing between legend items
    const legendRectWidth = 15;     // Legend rectangle dimensions
    const legendRectHeight = 15;
    const legendPadding = 5;        // padding between text and rect

    // Center legend vertically in the chart
    const legendY = height / 2 - (legendList.length * legendRectHeight) / 2;

    // Calculate max text width (using rough estimate)
    const maxTextLen = Math.max(...legendList.map(d => d.text.length));
    const fixedTextWidth = maxTextLen * 5; // 5px per char

    // Add legend using <g class="legend">, right aligned: text, then rect, then chart edge
    const legend = svg.selectAll('.legend')
        .data(legendList)
        .enter()
        .append('g')
        .attr('id', 'legend')
        .attr('class', 'legend')
        .attr('transform', (d, i) => {
            const x = width - padding - legendRectWidth - legendPadding - fixedTextWidth;
            const y = legendY + i * legendSpacing;
            return `translate(${x}, ${y})`;
        });

    // Draw text (right aligned, before rect)
    legend.append('text')
        .attr('x', fixedTextWidth) // right align text to rect
        .attr('y', legendRectHeight / 2)
        .attr('font-size', legendFontSize)
        .attr('alignment-baseline', 'middle')
        .attr('text-anchor', 'end')
        .text(d => d.text);

    // Draw rect after text
    legend.append('rect')
        .attr('x', fixedTextWidth + legendPadding)
        .attr('y', 0)
        .attr('width', legendRectWidth)
        .attr('height', legendRectHeight)
        .attr('fill', d => d.color);

}) // catch error if data fetch fails
    .catch(error => {
        console.error('Error fetching data:', error);
        d3.select('#chart')
            .append('p')
            .text('Failed to load data. Please try again later.');
    });