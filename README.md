cytoscape-layout-utilities
================================================================================

## Description

This Cytoscape.js extension provides miscellenaous layout utilities in order to manage the placement of nodes without layout information. Sometimes, your graph will have a pre-calculated layout but changes (addition and/or deletion of nodes and edges) will require an *incremental* layout to adjust the existing layout according to these changes. However, often times, the new nodes do not have a good initial position for incremental layout (randomize: false) to produce successful results. Following layout methods try to choose the best position for any node without a previous layout, so that subsequent incremental layout can achieve this. 

When doing so, these methods use the following heuristics:

- If a new node without layout has a *single* neighbor with layout information,  the idea is to split the neighboring space around the single neighbor into quadrants and scoring how crowded each quadrant is, and placing the new node in least crowded quadrant.

- If a new node without layout has *multiple* neighbors with layout information, we chose the position of the new node without layout to be the geometric center of all its neighbors.

- If a new node without layout has *no* neighbors with layout information, then we place it around the periphery of the bounding box of all nodes with pre-calculated layout.

In all of the above cases, we choose a position which is an *ideal edge length* away from a neighbor, and use a random *offset* for the final location of the node to avoid multiple nodes ending up at the exact same location since most layout algorithms will not gracefully handle such cases.

Here is a [demo](https://rawcdn.githack.com/iVis-at-Bilkent/cytoscape.js-layout-utilities/62afd4413774714810ac00e0a386bc11b11ecf99/demo.html).

Please cite the following when you use this extension:

U. Dogrusoz, A. Karacelik, I. Safarli, H. Balci, L. Dervishi, M.C. Siper, "[Efficient methods and readily customizable libraries for managing complexity of large networks](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0197238)", PLOS ONE, 13(5):e0197238, 2018.

K. Freivalds, U. Dogrusoz, and P. Kikusts, "[Disconnected Graph Layout and the Polyomino Packing Approach](http://www.springeronline.com/sgw/cda/frontpage/0,10735,5-40109-22-2208018-0,00.html)", LNCS, vol. 2265, pp. 378-391, 2002.

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

```instance.placeHiddenNodes(nodesWithLayout)```

Places hidden neighbors of each given node. It is assumed that the given nodes have pre-calculated layout, and with this method, proper initial positions are calculated for their hidden neighbors to prepare them for a successful incremental layout.

```instance.placeNewNodes(nodesWithoutLayout)```

Places each given node. It is assumed that the remaining nodes in the graph already have pre-calculated layout, whereas given nodes do not. With this method, given nodes are positioned with respect to their already laid out neighbors so that a following incremental layout produce a good layout for the entire graph. 

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
