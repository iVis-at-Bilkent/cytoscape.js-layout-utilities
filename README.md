cytoscape-layout-utilities
================================================================================


## Description

This Cytoscape.js extension provides layout utilities in order to manage the placement of the hidden nodes. 

Package of layout utilities for cytoscape.js ([demo](https://.github.io/cytoscape.js-layout-utilities))

## Dependencies

 * Cytoscape.js ^3.7.0
 * cytoscape-view-utilities.js ^3.0.0 (only for demo)


## Usage instructions

Download the library:
 * via npm: `npm install cytoscape-layout-utilities`,
 * via bower: `bower install cytoscape-layout-utilities`, or
 * via direct download in the repository (probably from a tag).

Import the library as appropriate for your project:

ES import:

```js
import cytoscape from 'cytoscape';
import layoutUtilities from 'cytoscape-layout-utilities';

cytoscape.use( layoutUtilities );
```

CommonJS require:

```js
let cytoscape = require('cytoscape');
let layoutUtilities = require('cytoscape-layout-utilities');

cytoscape.use( layoutUtilities ); // register extension
```

AMD:

```js
require(['cytoscape', 'cytoscape-layout-utilities'], function( cytoscape, layoutUtilities ){
  layoutUtilities( cytoscape ); // register extension
});
```

Plain HTML/JS has the extension registered for you automatically, because no `require()` is needed.


## API

```var instance = cy.layoutUtilities(options)```

Initializes the extension and sets options. This can be used to override default options. 

An instance has a number of functions available:

```instance.layoutHiddenNodes(mainEles)```

Layouts hidden neighbors of each given element according to their degree. If the node is a degree one node, it will be placed to a non-occupied quadrant with a random offset. Else, the geometric center of the neighbors will be calculated and the node will be placed around the center with a random offset. 


## Default Options

```
      idealEdgeLength: 50,
      offset: 20
```


## Build targets

* `npm run test` : Run Mocha tests in `./test`
* `npm run build` : Build `./src/**` into `cytoscape-layout-utilities.js`
* `npm run watch` : Automatically build on changes with live reloading (N.b. you must already have an HTTP server running)
* `npm run dev` : Automatically build on changes with live reloading with webpack dev server
* `npm run lint` : Run eslint on the source

N.b. all builds use babel, so modern ES features can be used in the `src`.


## Publishing instructions

This project is set up to automatically be published to npm and bower.  To publish:

1. Build the extension : `npm run build:release`
1. Commit the build : `git commit -am "Build for release"`
1. Bump the version number and tag: `npm version major|minor|patch`
1. Push to origin: `git push && git push --tags`
1. Publish to npm: `npm publish .`
1. If publishing to bower for the first time, you'll need to run `bower register cytoscape-layout-utilities https://github.com//cytoscape.js-layout-utilities.git`
1. [Make a new release](https://github.com//cytoscape.js-layout-utilities/releases/new) for Zenodo.

## Team
  * [Rumeysa Özaydın](https://github.com/rumeysaozaydin) and [Ugur Dogrusoz](https://github.com/ugurdogrusoz) of [i-Vis at Bilkent University](http://www.cs.bilkent.edu.tr/~ivis)
