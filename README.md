## es6-gulp-boilerplate
The project contains a boilerplate for ES6 projects.

### Project goal
The main idea is to compile ES6 code using babel, browserify and gulp. The goal is to have a build folder that has simplified structure with one JS, CSS and index.html file.

### Initial setup
```bash
# Clone the repo...
git clone https://github.com/stas-kh/es6-gulp-boilerplate
cd es6-gulp-boilerplate

# Project uses Yarn as package manager, so you have to install it globally
npm install -g yarn

# Then, you should run the following command in your terminal
run-gulp.bat
```

## Usage
### Preparation
To make a build version run:

```
run-gulp.bat
```

It runs gulp and enables watching changes in source code by means of gulp.watch.

### How to make changes
Gulp will rebuild your project each time when change has been done.
All the changes should be done in *src* folder.

#### JavaScript
All required modules should be stored as a sub-folders, for example *src/js/new-panel/* and each module should be exported to be used in another modules or *index.js* file

#### Styles
All CSS files should be located in: *src/css/* folder.

#### HTML
HTML file is located in *src/index.html* folder. You do not have to add references on your own JavaScript or CSS files into index.html, it should have only your HTML markups and links on external resources (such as fonts, libraries, external css files etc.)
