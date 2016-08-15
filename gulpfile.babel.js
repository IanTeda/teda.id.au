"use strict";

// Import Gulp module
import gulp from "gulp";
// Gulp GH Pages
var ghPages = require("gulp-gh-pages");

const options = {
  branch: "gh-pages",
  remoteUrl: "git@github.com:IanTeda/teda.id.au.git"
};

gulp.task("default", function() {
  return gulp.src("./src/**/*")
    .pipe(ghPages(options));
});
