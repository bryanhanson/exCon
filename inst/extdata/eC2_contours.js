// exCon2 Bryan Hanson, DePauw University, June 2015
// Based on exCon by Kristina Mulry & Bryan Hanson

// Note: our map and contour areas are frequently referred to
// generically as context and focus regions in the d3 world

// xD & yD are global variables

var drawContour = function(xD, yD) { // draw the contour map
		var xContour = d3.scaleLinear() // x limits for contour map
			.domain(xD)
			.range([0, conWidth]);
		var yContour = d3.scaleLinear() // y limits for contour map
			.domain(yD)
			.range([conHeight, 0]);
		var lineCon = d3.line()
			.x(function(d) {
				return xContour(d.x);
			})
			.y(function(d) {
				return yContour(d.y);
			});
		var contour = svg.append("svg")
			.attr({
				x: lPad,
				y: tPad,
				width: conWidth,
				height: conHeight,
				"class": "contour",
				"id": "CON"
			})
			.selectAll("path")
			.data(CL.map(function(d) {
				return d3.range(d.x.length).map(function(i) {
					return {
						x: d.x[i],
						y: d.y[i]
					};
				});
			}))
			.enter().append("svg:path")
			.attr("d", lineCon)

		drawXaxis(xContour);
		drawYaxis(yContour);

	} // end of drawContour


var drawXaxis = function(xScale) {
	d3.select("#X_axis").remove(); // remove existing axis
	var xAxis = d3.axisBottom()
		.scale(xScale);
		// .orient("bottom");

	svg.append("g")
		.attr("id", "X_axis")
		.attr("class", "axis")
		// the math portion below must be in parens
		// the math is evaluated and '+' concatenates the strings
		.attr("transform", "translate(0," + (tPad + conHeight + 0.1 * gap) + ")")
		.attr("transform", "translate(" + lPad + "," +
			(tPad + conHeight + 0.1 * gap) + ")")
		.call(xAxis);
}

var drawYaxis = function(yScale) {
	d3.select("#Y_axis").remove();
	var yAxis = d3.axisRight()
		.scale(yScale);
		// .orient("right");

	svg.append("g")
		.attr("id", "Y_axis")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (tPad + conHeight + 0.1 * gap) + ")")
		.attr("transform", "translate(" + (lPad + conWidth + 0.1 * gap) + "," +
			(tPad) + ")")
		.call(yAxis);
}


var clearContour = function() {
	d3.select("#CON").remove();
}

var drawMap = function() { // draw the navigation map in the map space
		var xMap = d3.scaleLinear() // x limits for corner map
			.domain(Dx)
			.range([0, mapWidth]);
		var yMap = d3.scaleLinear() // y limits for corner map
			.domain(Dy)
			.range([mapHeight, 0]);
		var lineMap = d3.line()
			.x(function(d) {
				return xMap(d.x);
			})
			.y(function(d) {
				return yMap(d.y);
			});
		var map = svg.append("svg")
			.attr({
				x: lPad + conWidth + gap,
				y: tPad,
				"class": "map"
			})
			.selectAll("path")
			.data(CL.map(function(d) {
				return d3.range(d.x.length).map(function(i) {
					return {
						x: d.x[i],
						y: d.y[i]
					};
				});
			}))
			.enter().append("svg:path")
			.attr("d", lineMap)
	} // end of drawMap
