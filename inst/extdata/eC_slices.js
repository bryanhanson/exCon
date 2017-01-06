// exCon Kristina Mulry & Bryan Hanson, DePauw University, February 2014

// Slice related functions. Note that these need to respond to brushing,
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


var getXsliceLimits = function() {

		// This function gets the left & right edge indices
		// starting from native units (ie Dx, Dx units) ????
		// and taking brushing into account.
		// Answer in terms of column indices
		var nc = arraySize(M)[1];
		var left = Math.floor(brushExtent[0] * nc);
		var right = Math.ceil(brushExtent[1] * nc);
		if (left < 1) left = 1 // Compensate for rounding
		if (right > nc) right = nc
		return [left, right];
	} // end of getXsliceLimits


var getXsliceXvalues = function() {

		// This function creates the x values needed for the x slice
		// These are a selection of the column numbers

		var lIndex = getXsliceLimits()[0];
		var rIndex = getXsliceLimits()[1];
		// console.log(lIndex)
		// console.log(rIndex)
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


var getRowIndex = function(M, mY) { // do we need to specify the args?

		// See getColIndex for more comments
		// IMPORTANT: reference point for brushing extent is lower left corner!
		var yNat = yD[0] + ((mY) * (yD[1] - yD[0]))
		document.Show.mouseYnat.value = yNat
		var nRow = arraySize(M)[0]
		var nRowAdj = nRow * (brushExtent[3] - brushExtent[2])
		var yInd = (mY * nRowAdj + nRow * brushExtent[2])
		yInd = Math.round(yInd);
		document.Show.mouseRow.value = yInd;
		return (yInd);
	} // end of getRowIndex

var clearXslice = function() {
	d3.selectAll(".xslice")
		.remove();
}

var drawXslice = function(row) {

		// WARNING: the matrix data has the columns in the correct order
		// However, row 1 of the M matrix is at the bottom of the display
		// and js counts from the top of the svg

		// Start by removing any existing xslice and associated clipping elements.
		d3.selectAll(".xslice")
			.remove();
		d3.selectAll(".xViewport")
			.remove();
		d3.selectAll("#xClipBox")
			.remove();
		// d3.selectAll("defs") // w/o this empty tags accumulate
		// 	.remove();

		var xdata = getXsliceXvalues();
		var ydata = getXsliceYvalues(row);
		var xy = []; // start empty, add each element one at a time
		for (var i = 0; i < xdata.length; i++) {
			xy.push({
				x: xdata[i],
				y: ydata[i]
			});
		}

		var xscl = d3.scaleLinear()
			.domain(d3.extent(xy, function(d) {
				return d.x;
			})) //use just the x part
			.range([0, xslWidth])

		var minM = d3.min(M, function(d) {
			return d3.min(d);
		});
		var maxM = d3.max(M, function(d) {
			return d3.max(d);
		});

		var yscl = d3.scaleLinear()
			.domain([minM, ((maxM - minM) * yF + minM)])
			.range([xslHeight - 5, 5]) // keeps line from touching outline

		var slice = d3.line()
			.x(function(d) {
				return xscl(d.x);
			}) // apply the x scale to the x data
			.y(function(d) {
				return yscl(d.y);
			}) // apply the y scale to the y data

		// This approach permits re-use of #xViewport (defined in eC_controls.js)

		var clip = svg.append("defs").append("clipPath")
			.attr("id", "xClipBox")

		clip.append("use").attr("xlink:href", "#xViewport");

		var xSlice = svg.append("g")
			.attr("clip-path", "url(#xClipBox)")
			.attr("class", "xViewport") // needs a class to be able to clear

		xSlice.append("path")
			.attr("transform", "translate(" + lPad + "," + (tPad + conHeight + gap) + ")")
			.attr({
				width: xslWidth,
				height: xslHeight,
				"class": "line",
				"class": "xslice",
				"d": slice(xy)
			}) // use the return value of slice(xy) as 'd'

	} // end of drawXslice


// ----- Now everything related to the y slice -----

var getYsliceLimits = function() {

		// See notes in getXsliceLimits
		var nr = arraySize(M)[0];
		var bottom = Math.floor(brushExtent[2] * nr);
		var top = Math.ceil(brushExtent[3] * nr);
		if (bottom < 1) bottom = 1
		if (top > nr) top = nr
		return [bottom, top];
	} // end of getYsliceLimits


var getYsliceYvalues = function() {

	// This function creates the y values (actual data) needed for the y slice

	var bIndex = getYsliceLimits()[0];
	var tIndex = getYsliceLimits()[1];
	var nr = arraySize(M)[0];
	var ybase = d3.range(1, nr + 1);
	var ydata = ybase.slice(bIndex, tIndex + 1);
	return ydata;
}


var getYsliceXvalues = function(col) {
	var xdata = []; // Get just the column of interest
	var nr = arraySize(M)[0];
	for (var i = 0; i < nr; i++) {
		xdata.push(M[i][col]);
	}
	var bIndex = getYsliceLimits()[0];
	var tIndex = getYsliceLimits()[1];
	xdata = xdata.slice(bIndex, tIndex + 1);
	return xdata;
}


var getColIndex = function(M, mX) {

		// Report the mouse position in native coordinates

		var xNat = xD[0] + ((mX) * (xD[1] - xD[0]))
		document.Show.mouseXnat.value = xNat

		// Report the mouse position as a column

		var nCol = arraySize(M)[1] // No. rows in the original matrix
			// Adjust no. cols to acct for brushing
		nColAdj = nCol * (brushExtent[1] - brushExtent[0])
		var xInd = nCol * brushExtent[0] + mX * nColAdj
		xInd = Math.round(xInd);
		document.Show.mouseCol.value = xInd;
		return (xInd);
	} // end of getColIndex

var clearYslice = function() {
	d3.selectAll(".yslice")
		.remove();
}

var drawYslice = function(col) {

		// The Y slice is the slice parallel to the y direction
		// See drawXslice for additional detailed comments

		d3.selectAll(".yslice")
			.remove();
		d3.selectAll(".yViewport")
			.remove();
		d3.selectAll("#yClipBox")
			.remove();
		// d3.selectAll("defs")
		// 	.remove();

		// Important: on the Y slice, the x values are the column slice,
		// and the y values are the row numbers (since the plot is rotated 90)

		var xdata = getYsliceXvalues(col);
		var ydata = getYsliceYvalues();
		// Because of how the x data is referenced (top is 0),
		// we need to reverse it
		var xy = []; // start empty, add each element one at a time
		for (var i = 0; i < ydata.length; i++) {
			xy.push({
				x: xdata[i],
				y: ydata[i]
			});
		}

		var minM = d3.min(M, function(d) {
			return d3.min(d);
		});
		var maxM = d3.max(M, function(d) {
			return d3.max(d);
		});

		var xscl = d3.scaleLinear()
			.domain([minM, ((maxM - minM) * xF + minM)])
			// range is set so the top of the peaks point toward the contour area
			.range([yslWidth - 5, 5])

		var yscl = d3.scaleLinear()
			.domain(d3.extent(xy, function(d) {
				return d.y;
			}))
			.range([yslHeight + tPad, tPad])

		var slice = d3.line()
			.x(function(d) {
				return xscl(d.x);
			})
			.y(function(d) {
				return yscl(d.y);
			})

		var clip = svg.append("defs").append("clipPath")
			.attr("id", "yClipBox")

		clip.append("use").attr("xlink:href", "#yViewport");

		var ySlice = svg.append("g")
			.attr("clip-path", "url(#yClipBox)")
			.attr("class", "yViewport")

		ySlice.append("path")
			.attr("transform", "translate(" + (lPad + conWidth + gap) + "," + (0) + ")")
			.attr({
				width: yslWidth,
				height: yslHeight,
				"class": "line",
				"class": "yslice",
				"d": slice(xy)
			})

	} // end of drawYslice
