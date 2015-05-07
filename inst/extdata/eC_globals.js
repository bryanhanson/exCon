// exCon Kristina Mulry & Bryan Hanson, DePauw University, February 2014

// Global variables collected here, with NO exceptions

// Define layout variables for each subsection of the display
// These are fixed sizes, they don't change even if the window is resized
// 15" MacBookPro Retina screen is 1440 x 900

// Official abbrevs to be used: y slice area: ysl, x slice area: xsl,
// locator map: map, contour area: con
// The entire area containing all the above is the window,
// use win (the div is 'main')

var winWidth = 1200, // define sizes of windows
	winHeight = 650, // these values determine the aspect ratio of the layout
	conWidth = 0.7 * winWidth, // < 90% to allow for padding and gaps
	conHeight = 0.7 * winHeight,
	yslWidth = 0.2 * winHeight, // ysl_width must equal xsl_height
	yslHeight = conHeight,
	xslWidth = conWidth,
	xslHeight = yslWidth,
	mapWidth = yslWidth * winWidth / winHeight,
	mapHeight = yslWidth;

var gap = 0.075 * winHeight, // gap for displaying axis
	lPad = (winWidth - conWidth - gap - mapWidth) / 2,
	// this approach ensures centering in main window
	rPad = lPad,
	tPad = (winHeight - conHeight - gap - xslHeight) / 2,
	bPad = tPad;

// Define the master global variable for drawing purposes.
// Everything gets appended to this object

var svg = d3.select('#main')
	// The full window is appended to #main and named 'svg'.
	// This simply defines a variable/window into which we
	// can draw, nothing is drawn.
	.append('svg')
	.attr("width", window.innerWidth)
	.attr("height", window.innerHeight)
	// .style('width', winWidth)
	// .style('height',winHeight);

// Initialize xD & yD
// Dx & Dy are the domains passed in by the R function
// Domains are in native units, as supplied by the user
// Defaults via exCon.R are [0,1] unless user provides others

// xD & yD are the brushing coordinates always on [0,1] ????

var xD = Dx,
	yD = Dy;

// Define xF and yF; These are the amplification factors
// which control the vertical scales of the slices, and are set
// by the controls

var xF = 1.0,
	yF = 1.0;

// Define xM and yM, the position of the mouse w/i the contour area
// Need to provide initial values here

var xM = 0.5,
	yM = 0.5;

// Initialize an array with 4 elements which will hold the
// brush extent in fractional units

var brushExtent = [0, 1, 0, 1]
