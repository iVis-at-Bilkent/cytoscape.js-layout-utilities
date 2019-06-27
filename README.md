cytoscape-layout-utilities
================================================================================

## Description

This Cytoscape.js extension provides miscellenaous layout utilities in order to manage the placement of nodes. 

Here is a ([demo](https://rawcdn.githack.com/iVis-at-Bilkent/cytoscape.js-layout-utilities/62afd4413774714810ac00e0a386bc11b11ecf99/demo.html)).

## Dependencies

 * Cytoscape.js ^3.7.0

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

```instance.layoutHiddenNodes(eles)```

Lays out hidden neighbors of each given element in `eles` according to their degree. If the neighbor is a degree one node, it will be placed to a non-occupied quadrant with respect to the element with a random offset. If the hidden node is connected to multiple nodes in the current shown graph, the geometric center of its neighbors will be calculated and the hidden node will be placed around this center with a random offset. 


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
