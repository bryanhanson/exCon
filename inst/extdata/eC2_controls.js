// exCon2 Kristina Mulry & Bryan Hanson, DePauw University, June 2015

var drawOutlines = function() {
		// Outline the areas in which we will draw things

		// svg.append('rect') // outline main window (for troubleshooting, probably not in final version)
		// 	.attr({x: 0, y: 0,
		// 	       width:(winWidth),
		// 	       height: (winHeight),
		// 	       stroke: 'black',
		// 	       'stroke-width': 3,
		// 	       fill:'white'});

		svg.append('rect') // outline contour area
			.attr("x", lPad)
			.attr("y", tPad)
			.attr("width", conWidth)
			.attr("height", conHeight)
			.attr("stroke", 'black')
			.attr('stroke-width', 1.5)
			.attr("fill", 'white')

		svg.append('rect') // outline map area
			.attr("x", lPad + conWidth + gap)
			.attr("y", tPad + conHeight + gap)
			.attr("width", mapWidth)
			.attr("height", mapHeight)
			.attr("stroke", 'black')
			.attr('stroke-width', 1.5)
			.attr("fill", 'white')

	} // end of drawOutlines
