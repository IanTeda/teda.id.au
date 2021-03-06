"use strict";

var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var csswring = require("csswring");
var pngquant = require("imagemin-pngquant");

const src = "src/";
const assets = "assets/";
const build = "build/";
const tmp = ".tmp/";
const nodeModules = "node_modules/";
const release = ".release";

module.exports = {
  browserSync: {
    development: [tmp, build],
    production: build
  },
  downloads: {
    src: src + assets + "/downloads/**/*",
    dest: tmp + assets + "downloads"
  },
  fonts: {
    src: [
      nodeModules + "font-awesome/fonts/**/*.{eot,svg,ttf,woff,woff2,otf}",
      src + assets + "fonts/**/*.{eot,svg,ttf,woff,woff2,otf}"
    ],
    dest: tmp + assets + "fonts"
  },
  ghPages: {
    options: {
      branch: "gh-pages",
      cacheDir: release,
      remoteUrl: "git@github.com:IanTeda/teda.id.au.git"
    }
  },
  gulpLoadPlugins: {
    options: {
      DEBUG: false, // when set to true, the plugin will log info to console
      pattern: ["gulp-*", "gulp.*", "del", "merge2", "shelljs"], // the glob(s) to search for in package.json
      camelize: true, // if true, transforms hyphenated plugins names to camel case
      lazy: true // whether the plugins should be lazy loaded on demand
    }
  },
  gzip: {
    options: {
      append: true
    }
  },
  html: {
    src: build + "**/*.html",
    dest: build
  },
  htmlmin: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    }
  },
  inject: {
    ignorePath: tmp,
    options: {
      read: false
    },
    scripts: {
      target: src + "_includes/scripts.html",
      references: tmp + assets + "scripts/*.js",
      destination: src + "_includes/"
    },
    styles: {
      target: src + "_includes/styles.html",
      references: tmp + assets + "styles/*.css",
      destination: src + "_includes/"
    }
  },
  images: {
    src: src + assets + "images/**/*.{png,gif,jpg}",
    dest: tmp + assets + "images"
  },
  imagemin: {
    options: {
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }
  },
  jekyll: {
    dest: build,
    deploy: build + "**/*",
    assets: build + assets,
    tmp: tmp + assets
  },
  jsdoc3: {
    src: [
      "./gulp/README.md",
      "./gulp/**/*.js"
    ],
    options: {
      opts: {
        encoding: 'utf8',
        destination: "./gulp/docs",
        recurse: true,
        access: 'all'
      },
      plugins: [
        "node_modules/jsdoc/plugins/markdown"
      ],
      templates: {
        cleverLinks: false,
        monospaceLinks: false,
        default: {
          outputSourceFiles: true
        },
        path: "ink-docstrap",
        theme: "cerulean",
        navType: "vertical",
        linenums: true,
        dateFormat: "MMMM Do YYYY, h:mm:ss a"
      }
    }
  },
  postcss: {
    processors: [
      autoprefixer({
        browsers: ["last 1 version"]
      }),
      mqpacker,
      csswring
    ]
  },
  scripts: {
    filename: "main.js",
    src: [
      nodeModules + "jquery/dist/jquery.js",
      nodeModules + "wow.js/dist/wow.js",
      nodeModules + "fitvids/fitvids.js",
      src + assets + "scripts/main.js"
    ],
    dest: tmp + assets + "scripts",
    build: build + assets + "scripts"
  },
  styles: {
    filename: "main.css",
    css: [
      nodeModules + "/animate.css/animate.css",
      nodeModules + "/font-awesome/css/font-awesome.css",
      src + assets + "styles/screen.css",
      src + assets + "styles/syntax.css"
    ],
    sass: src + assets + "sass/main.scss",
    dest: tmp + assets + "styles"
  },
  uglify: {
    options: {
    }
  }
};
