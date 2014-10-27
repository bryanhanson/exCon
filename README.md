
## exCon: Interactive Exploration of Contour Data

`exCon` is an `R` package under development.  `exCon` is an interactive tool to explore topographic-like data sets.  Such data sets take the form of a matrix in which the rows and columns provide location/frequency information, and the matrix elements contain altitude/response information.  Such data is found in cartography, 2D spectroscopy and chemometrics.

Use of `exCon` will be very simple: call the `R` function `exCon` with a matrix as the argument, and `R` will create an interactive web page showing the contoured data set along with slices from the original matrix parallel to each dimension.

Currently, we are working on the package infrastructure.

### Performance

In testing so far, a 4000 x 4000 matrix with 5 contour levels requires about 30 seconds to create the contours (done by `R` function `contour`, not part of the `javascrip`).  The resulting web page in Chrome appears to be about 85 Mb in size and the guide movements lag the mouse movements quite a bit, but it is still usable.  A 5000 x 5000 matrix causes Chrome to crash.

### To-Do

* Handling different browsers.
* Dynamic page title?
* Extend guides into slice areas?
* Make layout responsive to dimensions & aspect ratio of original data.
* Color different contour levels & add scale

### Authors

`exCon` was developed by Kristina R. Mulry and Bryan A. Hanson starting in the Spring of 2014, at DePauw University.

### License Information

`exCon` is distributed under the GPL-3 license.  For more info, see the [GPL site.](https://gnu.org/licenses/gpl.html)

Questions?  hanson@depauw.edu
