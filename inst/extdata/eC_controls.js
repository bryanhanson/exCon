// exCon Kristina Mulry & Bryan Hanson, DePauw University, February 2014

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
			.attr("stroke", "black")
			.attr("stroke-width", 1.5)
			.attr("fill", "white")

		svg.append('rect') // outline map area
			.attr("x",lPad + conWidth + gap)
			.attr("y", tPad + conHeight + gap)
			.attr("width", mapWidth)
			.attr("height", mapHeight)
			.attr("stroke", "black")
			.attr("stroke-width", 1.5)
			.attr("fill", "white")

		svg.append('rect') // outline x slice
			.attr("x", lPad)
			.attr("y", tPad)
			.attr("width", xslWidth)
			.attr("height", xslHeight)
			.attr("id", "xViewport")
			.attr("stroke", "black")
			.attr("stroke-width", 1.5)
			.attr("fill", "white")

	svg.append('rect') // outline y slice
			.attr("x", lPad + conWidth + gap)
			.attr("y", tPad)
			.attr("width", yslWidth)
			.attr("height", yslHeight)
			.attr("id", "yViewport")
			.attr("stroke", "black")
			.attr("stroke-width", 1.5)
			.attr("fill", "white")

	} // end of drawOutlines

var drawControls = function() {

		// This function draws & activates the control buttons

		// naming: R = global reset button, xR = reset x slice, yR = reset y slice
		// plusX = increase x slice amplification etc

		// button positions
		// Add x or y after button name to specify it's coordinates, e.g. xRx

		var yBut = tPad + conHeight + 0.5 * gap,
			xBut = lPad + conWidth + 0.5 * gap;
		var butInc = 0.25 * yslWidth // spacing w/i the button set
		var butSize = 0.25 * gap // radius of the button circle

		var Rx = xBut + 10, // master reset button
			Ry = yBut + 10,
			xRx = xBut, // x slice controls
			xRy = yBut + 0.5 * gap + 3 * butInc,
			plusXx = xBut,
			plusXy = yBut + 0.5 * gap + butInc,
			minusXx = xBut,
			minusXy = yBut + 0.5 * gap + 2 * butInc,
			yRx = xBut + 0.5 * gap + 3 * butInc, // y slice controls
			yRy = yBut,
			plusYx = xBut + 0.5 * gap + butInc,
			plusYy = yBut,
			minusYx = xBut + 0.5 * gap + 2 * butInc,
			minusYy = yBut;

		// Now draw, label and activate all 7 buttons in groups
		// (coordinates with CSS that way)

		var g1 = svg.append("g")

		g1.append('circle') // master reset button
			.attr("cx", Rx)
			.attr("cy", Ry)
			.attr("r", butSize)
			.attr("class", "resetButton")
			.attr("fill", "#008B00")
			.attr("onclick", resetAll())

		g1.append('text') // master reset button
			.attr("x", Rx)
			.attr("y", Rx + 7)
			.attr("font-family", "sans-serif")
			.attr("fill", "white")
			.attr("font-size", 20)
			.attr("text-anchor", "middle")
			.attr({"pointer-events", "none")
			.attr(onclick, resetAll())
			.text('R')

		g1.append('circle') // x slice reset button
			.attr("cx", xRx)
			.attr("cy", xRy)
			.attr("r", butSize)
			.attr("class", "resetButton")
			.attr("fill", "#008B00")
			.attr({"onclick", resetXslice())

		g1.append('text') // x slice reset button
			.attr("x", xRx)
			.attr("y", xRy + 7)
			.attr("font-family", "sans-serif")
			.attr("fill", "white")
			.attr("font-size", 20)
			.attr("text-anchor", "middle")
			.attr("pointer-events", "none")
			.attr("onclick", resetXslice())
			.text('R')

		g1.append('circle') // y slice reset button
			.attr("cx", yRx)
			.attr("cy", yRy)
			.attr("r", butSize)
			.attr("class", "resetButton")
			.attr("fill", "#008B00")
			.attr("onclick", resetYslice())

		g1.append('text') // y slice reset button
			.attr("x", yRx)
			.attr("y", yRy + 7 )
			.attr("font-family", "sans-serif")
			.attr("fill", "white")
			.attr("font-size", 20)
			.attr("text-anchor", "middle")
			.attr("pointer-events", "none")
			.attr("onclick", resetYslice())
			.text('R')

		var g2 = svg.append("g")

		g2.append('circle') // x slice increase button
			.attr("cx", plusXx)
			.attr("cy", plusXy)
			.attr("r", butSize)
			.attr("class", "incButton")
			.attr("onclick", increaseXslice())

		g2.append('text') // x slice increase button
			.attr("x", plusXx)
			.attr("y", plusXy + 6)
			.attr("font-family", "sans-serif")
			.attr("fill", "white")
			.attr("font-size", 20)
			.attr("text-anchor", "middle")
			.attr("pointer-events", "none")
			.attr("onclick", increaseXslice())
			.text('+')

		g2.append('circle') // y slice increase button
			.attr("cx", plusYx)
			.attr("cy", plusYy)
			.attr("r", butSize)
			.attr("class", "incButton")
			.attr("onclick", increaseYslice())

		g2.append('text') // y slice increase button
			.attr("x", plusYx)
			.attr("y", plusYy + 6)
			.attr("font-family", "sans-serif")
			.attr("fill", "white")
			.attr("font-size", 20)
			.attr("text-anchor", "middle")
			.attr("pointer-events", "none")
			.attr("onclick", increaseYslice())
			.text('+')

		var g3 = svg.append("g")

		g3.append('circle') // x slice decrease button
			.attr("cx", minusXx)
			.attr("cy", minusXy)
			.attr("r", butSize)
			.attr("class", "decButton")
			.attr("onclick", decreaseXslice())
			.text('-')

		g3.append('text') // x slice decrease button
			.attr("x", minusXx)
			.attr("y", minusXy + 9)
			.attr("font-family", "sans-serif")
			.attr("fill", "white")
			.attr("font-size", 30)
			.attr("text-anchor", "middle")
			.attr("pointer-events", "none")
			.attr("onclick", decreaseXslice())
			.text('-')

		g3.append('circle') // y slice decrease button
			.attr("cx", minusYx)
			.attr("cy", plusYy)
			.attr("r", butSize)
			.attr("class", "decButton")
			.attr("onclick", decreaseYslice())

		g3.append('text') // y slice decrease button
			.attr("x", minusYx)
			.attr("y", plusYy + 9)
			.attr("font-family", "sans-serif")
			.attr("fill", "white")
			.attr("font-size", 30)
			.attr("text-anchor", "middle")
			.attr("pointer-events", "none")
			.attr("onclick", decreaseYslice())
			.text('-')

	} // end of drawControls

var resetAll = function() {
	clearBrush();
	clearContour();
	drawContour(Dx, Dy);
	resetXslice();
	resetYslice();
	brushExtent = [0, 1, 0, 1]
}

var resetXslice = function() {
	yF = 1.0

	if (mY == 0 || mY == 1) {
		clearXslice()
	} else {
		drawXslice(getRowIndex(M, mY))
	}
}

var resetYslice = function() {
	xF = 1.0

	if (mX == 0 || mX == 1) {
		clearYslice()
	} else {
		drawYslice(getColIndex(M, mX))
	}
}

var increaseXslice = function() {
	yF = yF / 2
}

var decreaseXslice = function() {
	yF = yF * 2
}

var increaseYslice = function() {
	xF = xF / 2
}

var decreaseYslice = function() {
	xF = xF * 2
}
