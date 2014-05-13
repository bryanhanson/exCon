

exCon <- function(M = NULL, nlevels = 5, levels, dataSetName) {
	
	# Bryan A. Hanson, DePauw University, April 2014
	# This is the R front end controlling everything
	# The html and js files called indirectly written by
	# Kristina Mulry and Bryan A. Hanson
	
	if (is.null(M)) stop("You must provide a matrix M")
	if (!is.matrix(M)) stop("M must be a matrix")
	require("jsonlite")
	
	# M is the raw, topographic data matrix:
	# think of it as altitudes on an x,y grid
	
	# Major steps
	# 1. Convert M to contour lines (CL)
	# 2. Read in the existing js, then pre-pend
	#    M and CL to to it and write it back out
	# 3. Call a browser on the html to open it automatically
	
	# Compute contour lines
	# (Eventually need to supply nlevels & levels,
	# Also a name for the data set)
	dimnames(M) <- list(rep("x", nrow(M)), rep("y", ncol(M)))
	CL <- contourLines(z = M, nlevels = nlevels)

	# Get the contour lines into JSON format
	
	# This is the manual approach, from Yihui Xie's blog
	# [ { "x": [...], "y": [....] } ]
	# CL = paste(unlist(lapply(CL, function(z) {
	  # xs = paste(round(z$x, 3), collapse = ',')
	  # ys = paste(round(z$y, 3), collapse = ',')
	  # sprintf('{"x": [%s], "y": [%s]}', xs, ys)})), collapse = ',')
	# CL <- paste("[", CL, "]") # this completes the proper JSON format
	
	# This is the automated approach which brings along extra info
	# but it is ignored since it is never requested.
	
	CL <- toJSON(CL)
	
	# Get M into JSON format
	# [ [row1...], [row2...], [lastRow...] ]
	
	M <- toJSON(t(M))
	
	# Read in the JavaScript modules, and pre-pend M & CL
	# Write out as a new file, updatedPage.js

	data1 <- paste("var CL = ", CL, sep = "")
	data2 <- paste("var M = ", M, sep = "")
	js1 <- readLines(con = "eC_globals.js")
	js2 <- readLines(con = "eC_controls.js")
	js3 <- readLines(con = "eC_contours.js")
	js4 <- readLines(con = "eC_brushNguides.js")
	js5 <- readLines(con = "eC_main.js")
	writeLines(text = c(data1, data2, js1, js2, js3, js4, js5), sep  = "",
		con = "exCon.js")
	
	# Open the file in a browser
	# Requires Chrome (should check, and find on any platform)
	
	pg <- "exCon.html"
	# this next line probably only works on Mac/Unix platforms
	browseURL(pg, browser = "/usr/bin/open -a 'Google Chrome'")
	invisible()
}