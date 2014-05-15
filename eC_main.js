
// exCon Kristina Mulry & Bryan Hanson, DePauw University, February 2014

// These function calls return nothing: they draw something, or define behaviors
// All cause things to be appended to global variable 'svg'
// defined in eC_globals.js
// Many modify or use the key global variables xD, yD, xF, yF

drawOutlines(); // Appends rectangles outlining the areas we'll be using.
drawControls();
drawMap(); // Appends an svg:path object (the contour lines)
// and draws them in the map region.

// On first run, draw the full domain in the contour area:
drawContour([0,1],[0,1]); // Works as drawMap does, just in a different region.

// These next two control behaviors and depend on xD & yD
activateBrush(); // Handles all the brush tasks
svg.on('mousemove', activateGuides); // Controls mouse behavior &
// drawing of slices
