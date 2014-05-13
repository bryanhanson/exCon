

// exCon Kristina Mulry & Bryan Hanson, DePauw University, February 2014

// Brush related functions

function activateBrush() { // Creates the brush, appends it, and defines its behavior

    // IMPORTANT: xD & yD are global variables

    var brush = d3.svg.brush() // Defines the brush, and calls the relevant functions
	.x(d3.scale.identity().domain([(lPad + conWidth + gap), (lPad + conWidth + gap + mapWidth)]))
	.y(d3.scale.identity().domain([(tPad + conHeight + gap), (tPad + conHeight + gap + mapHeight)]))
	.on("brushend", brushed)

    svg.append("svg") // Appends the svg to include the brush
	.attr("class", "brush")
	.call(brush)

    function brushed() { // Handles the response to brushing
	var extent = brush.extent()
	var minX = extent[0][0]
	var maxX = extent[1][0]
	var minY = extent[0][1]
	var maxY = extent[1][1]
	var x0 = lPad + conWidth + gap
	var y0 = tPad + conHeight + gap
	var x1 = x0 + mapWidth
	var y1 = y0 + mapHeight
	var xDminX = ((minX-x0)/(x1-x0))
	var xDmaxX =  ((maxX-x0)/(x1-x0))
	var yDminY = ((minY-y0)/(y1-y0))
	var yDmaxY =  ((maxY-y0)/(y1-y0))
	xD = [xDminX, xDmaxX] // update global value
	yD = [(1-yDmaxY), (1-yDminY)] // update global value
	clearContour();
	drawContour(xD, yD);
    } // end of brushed

} // end of activateBrush

var clearBrush = function() {
    d3.selectAll(".brush").remove();
    xD = [0, 1]; // reset global variables
    yD = [0, 1];
    activateBrush();
}


// Guide & slice related functions.  Note that these need to respond to brushing,
// which changes xD and yD

// A helper function first

var arraySize = function(array) { // merged from several SO post ideas
	// js is row-major
	// assumes 2D array
	// assumes each row has the same length (= no. of columns)
	var nrows = array.length
	var ncols = array[0].length // length of first row
	return [nrows, ncols]
}



// Now the create the guides & draw the slices

var activateGuides = function() {

    // Controls the guides (cursor) in the contour area
    // AND the slicing process which depends on the cursor position

    // IMPORTANT: xD & yD are global variables

    // First, everything related to the x slice

    var getXsliceLimits = function() {

	// This function gets the left & right edge indices
	// based on xD (the limits)
	// These are column numbers

	var nc = arraySize(M)[1]; // no. of columns in data set
	var xbase = d3.range(1, nc + 1); // array of column numbers 1:nc

	// The next steps find the indices corresponding to xD
	var left = Math.round(xD[0] * nc + 1); // left value of desired plotting window
	var right = Math.round(xD[1] * nc); // right value
	var lIndex = xbase.indexOf(left);
	var rIndex = xbase.indexOf(right);

	return [lIndex, rIndex];

    } // end of getXsliceLimits

    var getXsliceXvalues = function() {

	// This function creates the x values needed for the x slice
	// These are a selection of the column numbers

	var lIndex = getXsliceLimits()[0];
	var rIndex = getXsliceLimits()[1];
	var nc = arraySize(M)[1];
	var xbase = d3.range(1, nc + 1);
	var xdata = xbase.slice(lIndex, rIndex + 1);
	return xdata;

    } // end of getXsliceXvalues

    var getXsliceYvalues = function(row) {

	// This function creates the y values needed for the x slice
	// See getXsliceLimits for logic & comments

	var ybase = M[row]; // the y values in the row
	var lIndex = getXsliceLimits()[0];
	var rIndex = getXsliceLimits()[1];
	var ydata = ybase.slice(lIndex, rIndex + 1);
	return ydata;
    } // end of getXsliceYvalues

    var getRowIndex = function(M, mY) {

	var nRow = arraySize(M)[0];
	// IMPORTANT: reference point for brushing extent is lower left corner!
	//
	var yU = yD[1] * nRow; // Get upper row index
	var yL = yD[0] * nRow; // Get lower row index
	var yInd = yL + ((mY) * (yU - yL)); // get cursor position
	yInd =  Math.round(yInd);
	yInd = yInd - 1; // accts for zero-indexing in js
	// and the fact that R put the first row at the bottom!
	if (yInd < 0) {yInd = 0};
	if (yInd > nRow - 1) {yInd = nRow - 1};
    	document.Show.mouseRow.value = yInd;
	return(yInd);
    } // end of getRowIndex

    var drawXslice = function(row) {

	// WARNING: the matrix data has the columns in the correct order
	// However, row 1 of the M matrix is at the bottom of the display
	// and js counts from the top of the svg

	// start by removing any existing xslice
	d3.selectAll(".xslice") // remove previous lines
	    .remove();

	var offset = tPad + conHeight + gap;

	var xdata = getXsliceXvalues();
	var ydata = getXsliceYvalues(row);
	var xy = []; // start empty, add each element one at a time
	for(var i = 0; i < xdata.length; i++ ) {
	    xy.push({x: xdata[i], y: ydata[i]});
	}

	var xscl = d3.scale.linear()
	    .domain(d3.extent(xy, function(d) {return d.x;})) //use just the x part
	    .range([lPad, xslWidth + lPad])
	var yscl = d3.scale.linear()
        // Next line scales so that slice area is filled
	    // .domain(d3.extent(xy, function(d) {return d.y;})) // use just the y part
        // Absolute scaling
        // Keep in mind M has been scaled to 0...1 for plotting
        // Get min/max, then scale to 0...1, then multiply by
        // viewer requested scale factor, then scale to viewport
        // console.log("max of M is:", d3.max(d3.max(M)))
        // .domain(0, d3.max(d3.max(M))) // absolute scaling * ???
        .domain([d3.min(d3.min(M)), d3.max(d3.max(M))]) // absolute scaling * ???
	    .range([xslHeight + offset, offset + 5])
	var slice = d3.svg.line()
	    .x(function(d) { return xscl(d.x);}) // apply the x scale to the x data
	    .y(function(d) { return yscl(d.y);}) // apply the y scale to the y data
	svg.append("path")
	    .attr("class", "line")
	    .attr("class", "xslice")
	    .attr("d", slice(xy)) // use the return value of slice(xy) as the data, 'd'
    } // end of drawXslice




    // Now everything related to the y slice

    var getYsliceLimits = function() {

	// This function gets the bottom and top edge limits
	// based on yD
	// These are row numbers

	var nr = arraySize(M)[0]; // no. of rows in data set
	var ybase = d3.range(1, nr + 1); // array of row numbers 1:nr
	// The next steps find the indices corresponding to yD
	var bottom = Math.round(yD[0] * nr + 1); // bottom value
	var top = Math.round(yD[1] * nr); // top value of desired plotting window
	var bIndex = ybase.indexOf(bottom);
	var tIndex = ybase.indexOf(top);
	return [bIndex, tIndex];

    } // end of getYsliceLimits

    var getYsliceYvalues = function() {

	// This function creates the y values (actual data) needed for the y slice

	var bIndex = getYsliceLimits()[0];
	var tIndex = getYsliceLimits()[1];
	var nr = arraySize(M)[0];
	var ybase = d3.range(1, nr+1);
	var ydata = ybase.slice(bIndex, tIndex +1);
//	console.log("y values are:", ydata);
	return ydata;
    }

    var getYsliceXvalues = function(col){
	var xdata = []; // Get just the column of interest
	var nr = arraySize(M)[0];
	for (var i = 0; i < nr; i++){
	    xdata.push(M[i][col]);
	}
	var bIndex = getYsliceLimits()[0];
	var tIndex = getYsliceLimits()[1];
	xdata = xdata.slice(bIndex, tIndex + 1);
	return xdata;
   }

    var getColIndex = function(M, mX) { // This is a row index in the original matrix
	var nCol = arraySize(M)[1];
	var xU = xD[1] * nCol;
	var xL = xD[0] * nCol;
	var xInd = xL + ((mX) * (xU - xL));
	xInd  =  Math.round(xInd);
	xInd = xInd - 1;
	if (xInd < 0) {xInd = 0};
	if (xInd > nCol - 1) {xInd = nCol - 1};
	document.Show.mouseCol.value = xInd;
	return(xInd);
    } // end of getColIndex

    var drawYslice = function(col) {

	// WARNING: the matrix data has the columns in the correct order
	// However, row 1 of the M matrix is at the bottom of the display
	// and js counts from the top of the svg

	// start by removing any existing y slice
	d3.selectAll(".yslice") // remove previous lines
	    .remove();

	var offset = tPad;

     // Important: on the y slice, the x values are the column slice,
     // and the y values are the row numbers (since the plot is rotated 90)

	var xdata = getYsliceXvalues(col);
	var ydata = getYsliceYvalues();
	// Because of how the x data is created, we need to reverse it before
	//
	var xy = []; // start empty, add each element one at a time
	for(var i = 0; i < ydata.length; i++ ) {
	    xy.push({x: xdata[i], y: ydata[i]});
	}

	var xscl = d3.scale.linear() // range here is set so the top of the peaks point toward
	    // the contour area
	    .domain(d3.extent(xy, function(d) {return d.x;})) //use just the x part
	    .range([(lPad + conWidth + gap + yslWidth), (lPad + conWidth + gap)])
	var yscl = d3.scale.linear()
	    .domain(d3.extent(xy, function(d) {return d.y;})) // use just the y part
	    .range([yslHeight + offset, offset])
	var slice = d3.svg.line()
	    .x(function(d) { return xscl(d.x);}) // apply the x scale to the x data
	    .y(function(d) { return yscl(d.y);}) // apply the y scale to the y data
	svg.append("path")
	    .attr("class", "line")
	    .attr("class", "xslice")
	    .attr("d", slice(xy)) // use the return value of slice(xy) as the data, 'd'
    } // end of drawYslice




    // Now functions related to the cursor & guides

    var getMouseXY = function() { // get the mouse coordinates & report in terms of [0...1] in the contour area
    	var mouse = d3.mouse(document.getElementById("CON"));
    	var mX = mouse[0]; // in pixels
    	var mY = mouse[1];
    	if (mX < 0) {mX = 0}; // truncate low
    	if (mY < 0) {mY = 0};
    	if (mX > conWidth) {mX = conWidth}; // truncate high
    	if (mY > conHeight) {mY = conHeight};
    	mX = mX/conWidth // as fraction
    	mY = 1 - (mY/conHeight)
    	followMouse(mX, mY);
    	document.Show.mouseX.value = mX;
    	document.Show.mouseY.value = mY;
    	drawXslice(getRowIndex(M, mY));
	drawYslice(getColIndex(M, mX));
    } // end of getMouseXY

    var followMouse = function(mX, mY) { // This draws the guides, nothing else

	var xPos = (mX * conWidth) + lPad // mX now in pixels
	var yPos = tPad + conHeight - (mY * conHeight) // mY now in pixels

	var vertU = {x: xPos, y: tPad } // x, y at the top of window
	var vertL = {x: xPos, y: tPad + conHeight } // x, y at the bottom of window
	var vEnds = [vertU, vertL];

	var horzU = {x: lPad, y: yPos } // x, y at the left side of window
	var horzL = {x: lPad + conWidth, y: yPos } // x, y at the ride side of window
	var hEnds = [horzU, horzL];

	d3.selectAll(".cursorGuide") // remove previous lines
	    .remove();

	var line = d3.svg.line()
	    .x(function(d) { return d.x;})
	    .y(function(d) { return d.y;})

	svg.append("path")
    	    .attr("class", "line")
            .attr("class", "cursorGuide")
    	    .attr("d", line(hEnds))

	svg.append("path")
    	    .attr("class", "line")
            .attr("class", "cursorGuide")
    	    .attr("d", line(vEnds))

    } // end of followMouse

    getMouseXY(xD, yD); // This starts it all off

} // end of activateGuides
