[![Project Status: Active - The project has reached a stable, usable state and is being actively developed.](http://www.repostatus.org/badges/latest/active.svg)](http://www.repostatus.org/#active)

### exCon: Interactive Exploration of Contour Data

`exCon` is an interactive tool to explore topographic-like data sets. Such data sets take the form of a matrix in which the rows and columns provide location/frequency information, and the matrix elements contain altitude/response information.  Such data is found in cartography, 2D spectroscopy and chemometrics.  The functions in this package create interactive web pages showing the contoured data, possibly with slices from the original matrix parallel to each dimension. The interactive behavior is created using the D3.js JavaScript library by Mike Bostock.

#### Installation from Github using R:

````r
install.packages("devtools")
library("devtools")
install_github(repo = "bryanhanson/exCon@master")
library("exCon")
````
If you use `@some_other_branch` you can get other branches that might be available.  They may or may not pass CRAN checks and thus may not install automatically using the method above.  Check the NEWS file to see what's up.

#### Installation from CRAN using R:

````r
chooseCRANmirror() # choose a CRAN mirror
install.packages("exCon")
library("exCon")
````

#### Authors

`exCon` was developed by Kristina R. Mulry and Bryan A. Hanson starting in the Spring of 2014, at DePauw University.  Contributions from others listed in the NEWS file.

#### License Information

`exCon` is distributed under the GPL-3 license.  For more info, see the [GPL site.](https://gnu.org/licenses/gpl.html)

Questions?  hanson@depauw.edu

#### Action! The `volcano` data set from `R` viewed with `exCon`.

[Click here to see exCon in action](http://bryanhanson.github.io/exCon/exCon.html)
