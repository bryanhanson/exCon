
## exCon: Interactive Exploration of Contour Data

`exCon` is an interactive tool to explore topographic-like data
sets.  Such data sets take the form of a matrix in which the rows and
columns provide location/frequency information, and the matrix elements
contain altitude/response information.  Such data is found in cartography,
2D spectroscopy and chemometrics.  `exCon` creates an interactive web page
showing the contoured data set along with slices from the original matrix
parallel to each dimension. The page is written in `d3/javascript`.

### Installation from Github using R:

````r
install.packages("devtools")
library("devtools")
install_github(repo = "bryanhanson/ChemoSpec", ref = "master")
library("ChemoSpec")
````
If you use `ref = "some_other_branch"` you can get other branches that might be available.  They may or may not pass CRAN checks and thus may not install automatically using the method above.  Check the NEWS file to see what's up.

### Installation from CRAN using R:

````r
chooseCRANmirror() # choose a CRAN mirror
install.packages("exCon")
library("exCon")
````

### To-Do

* Extend guides into slice areas?
* Make layout responsive to dimensions & aspect ratio of original data.
* Color different contour levels & add scale.

### Authors

`exCon` was developed by Kristina R. Mulry and Bryan A. Hanson starting in the Spring of 2014, at DePauw University.

### License Information

`exCon` is distributed under the GPL-3 license.  For more info, see the [GPL site.](https://gnu.org/licenses/gpl.html)

Questions?  hanson@depauw.edu

### Action! The `volcano` data set from `R` viewed with `exCon`.

<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="eC.css">

<div class = "inputData">
<form name = "Show">
row <input type = "text" name = "mouseRow" value = "0" size = "1">
col <input type = "text" name = "mouseCol" value = "0" size = "1">
x native <input type = "text" name = "mouseXnat" value = "0" size = "2">
y native <input type = "text" name = "mouseYnat" value = "0" size = "2">
x cursor <input type = "text" name = "mouseX" value = "0" size = "2">
y cursor <input type = "text" name = "mouseY" value = "0" size = "2">
</form>
</div>

<div id = "main", class = "BigSVG"> </div>

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src = "exCon.js"> </script>
