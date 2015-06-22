// exCon2 Bryan Hanson, DePauw University, June 2015
// Based on exCon by Kristina Mulry & Bryan Hanson

// Global variables collected here, with NO exceptions
// Function drawOutlines also here for convenience

// Define layout variables for each subsection of the display

// Official abbrevs to be used:
// locator map: map, contour area: con
// The entire area containing all the above is the window,
// use win (the div is 'main')

var winWidth = 0.9*screen.width, // define sizes of windows
    winHeight = 0.7*screen.height, // these values determine the aspect ratio of the layout
    conWidth = 0.77*winWidth, // < 90% to allow for padding and gaps
    conHeight = 0.95*winHeight,
    mapWidth = 0.2*winWidth,
    mapHeight = 0.18*winHeight;

var gap = 0.05*winWidth, // gap for aesthetics
    lPad = (screen.width - conWidth - gap - mapWidth)/2,
    // this approach ensures centering in main window
    tPad = (winHeight - conHeight)/2;

// Define the master global variable for drawing purposes.
// Everything gets appended to this object

var svg = d3.select('#main')
	// The full window is appended to #main and named 'svg'.
	// This simply defines a variable/window into which we
	// can draw, nothing is drawn.
	.append('svg')
	.attr("width", window.innerWidth)
	.attr("height", window.innerHeight)

// Initialize xD & yD
// Dx & Dy are the domains passed in by the R function
// Domains are in native units, as supplied by the user
// Defaults via exCon.R are [0,1] unless user provides others

// xD & yD are the brushing coordinates always on [0,1] ????

var xD = Dx,
	  yD = Dy;

// Define xM and yM, the position of the mouse w/i the contour area
// Need to provide initial values here

var xM = 0.5,
	  yM = 0.5;

// Initialize an array with 4 elements which will hold the
// brush extent in fractional units

var brushExtent = [0, 1, 0, 1]

// drawOutlines here for convenience

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
			.attr({
				x: lPad,
				y: tPad,
				width: conWidth,
				height: conHeight,
				stroke: 'black',
				'stroke-width': 1.5,
				fill: 'white'
			});

		svg.append('rect') // outline map area
			.attr({
				x: lPad + conWidth + gap,
				y: tPad,
				width: mapWidth,
				height: mapHeight,
				stroke: 'black',
				'stroke-width': 1.5,
				fill: 'white'
			});

	} // end of drawOutlines
