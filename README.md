# npm flower

<img src="logo.png" alt="npm flower" align="right" />

A simple foundation to use npm script as build tool !

This workflow will build html, css, js and image files in a *dist* directory ready to use.

The *package.json* file contains all the configuration needed. No bower, no Gulp/Grunt or other task runners, everything is done using the awesome npm. *.npmrc* file is used to load configuration variables in *package.json* file.

See [npm burgeon](https://github.com/AdVg/npm-burgeon) to deploy a real static app with best practices, test, security and deployment.

See also an [example of a full stack app using Express](https://github.com/AdVg/express-hero) that integrates npm flower and [Denvar](https://github.com/AdVg/denvar) (a module and command line tool to manage environment variables in development and export them in production).

## How does work the flow ?

  - **html files** are built with *pug* engine (ex *jade*). Add your favorite template engine or never use one.
  - **css files** are built with *node-sass* and *autoprefixer* then compressed. You could use *Stylus* or *less*.
  - **js files** are tested with *jshint* then built with *browserify* and minified with *uglifyjs*. You could add *Babel* to deal with ES6 great features.
  - **image files** are optimized with *imagemin*.
  - **tests** are made using *Mocha* and a pretest is done with *jshint*.

  1. **Work on your assets in realtime**

    `$ npm run dev`

    - The server is started,
    - live reload is running,
    - each modification is watched and will
      - clean *dist* directories (where distributed *js*, *html*, *css*, *img*, etc. files will be created),
      - run tests,
      - be built (not all rebuilt at the same time so if a *scss* file changes, only watcher for *scss* is activated).

  2. **Another way to work**

    - Each modification in your assets is only watched (test and build) with no live reload :

      `$ npm run watch`

    - Test and build all your assets if you were not watching them :

      `$ npm run build:all`

  3. **Environment variables**

    At the root directory, *.npmrc* file variables are in name=value format and can be used to load environment variables in *package.json* but as you could see, it's a bit repetitive :

    *.npmrc* :
    ```
    access=restricted

    ; INSTALL PREFIX FOR DEPENDENCIES (more stable for production use than ^!)
    save-prefix=~

    ; ASSETS PATHS
    ASSETS=assets/
    ASSETS_SASS=assets/sass
    ASSETS_SASS_APP=assets/sass/app.scss
    ASSETS_JS=assets/js
    ASSETS_PUG=assets/pug
    ASSETS_IMG=assets/img

    ; DIST PATHS
    DIST=dist/
    DIST_CSS=dist/css
    DIST_CSS_APP=dist/css/app.css
    DIST_JS=dist/js
    DIST_IMG=dist/img
    ```

    You can access your *npmrc* variables in *package.json* with *$npm_config_YOUR_VARIABLE* variable name :
    ```javascript
    {
      "name": "npm-flower",
      "version": "0.1.0",
      "description": "...",
      "author": "Adrien Valcke <a.valcke@free.fr>",
      "scripts": {
        "clean": "rimraf $npm_config_DIST_CSS/* && rimraf $npm_config_DIST_JS/* && rimraf $npm_config_DIST_IMG/*",
        "sass": "node-sass --output-style compressed $npm_config_ASSETS_SASS_APP $npm_config_DIST_CSS_APP",
        "autoprefixer": "postcss -u autoprefixer -b 'last 2 versions' -r $npm_config_DIST_CSS_APP"
      },
      "dependencies": {},
      "devDependencies": {
        "autoprefixer": "~6.3.6",
        "node-sass": "~3.7.0",
        "rimraf": "~2.5.2"
      }
    }
    ```

**Note** :
  - Commands order is important. Each command is chained with the next one and if one fails the script running exits. So if test script fails because something wrong happened in a *javascript* file for example, your assets won't be built.
  - Use *-s* flag after commands to make them silent :

    `$ npm run sass -s`

## How to get it

  1. **Clone the repository** and rename it at your own project name `$ git clone https://github.com/AdVg/npm-flower.git`
  2. **Now run :** `$ npm install` to install all your environment
  3. **Develop in realtime (watch build and reload) :** `$ npm run dev`.
  4. **Watch :** `$ npm run watch`.
  5. **Build all :** `$ npm run build:all`.

## Contributing

Any advices or help will be greatly welcome.

## Notes

This project was initially made to help me building assets. This structure may not match your attempts or project needs. Please feel free to fork, adapt, add front or back tools that fit your needs (Stylus, React, Angular, Babel for ES6, ...).

This work is a result of joining different sources on the internet. Here are they :

  - [NPM Scripts Example](https://github.com/keithamus/npm-scripts-example) from [Keith Cirkel](https://github.com/keithamus), largely inspired of. A big thank to you !
  - [Using NPM as a Task Runner](http://paulcpederson.com/articles/npm-run/)
  - [Testing and deploying with ordered npm run scripts](http://blog.npmjs.org/post/127671403050/testing-and-deploying-with-ordered-npm-run-scripts)
  - [Why npm Scripts?](https://css-tricks.com/why-npm-scripts/)

My english seems confusing ? Feel free to correct my 'frenchy' sentences !

## Licence

The MIT License (MIT) Copyright © 2016 Adrien Valcke

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
