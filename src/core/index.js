;

    var options = {
      idealEdgeLength: 50,
      offset: 20,
    };


    var layoutUtilities = require("./layout-utilities");
    
    cytoscape('core', 'layoutUtilities', function (opts) {
      var cy = this;
      // If 'get' is given as the param then return the extension instance
      if (opts === 'get') {
        return getScratch(cy).instance;
      }

      $.extend(true, options, opts);

      function getScratch(eleOrCy) {
        if (!eleOrCy.scratch("_layoutUtilities")) {
          eleOrCy.scratch("_layoutUtilities", {});
        }

        return eleOrCy.scratch("_layoutUtilities");
      }


      if (!getScratch(cy).initialized) {
        getScratch(cy).initialized = true;

        // create a view utilities instance
        var instance = layoutUtilities(cy, options);

        // set the instance on the scratch pad
        getScratch(cy).instance = instance;
      }

      // return the instance of extension
      return getScratch(cy).instance;
    });

 // };

  // if (typeof module !== 'undefined' && module.exports) { // expose as a commonjs module
  //   module.exports = register;
  // }

  // if (typeof define !== 'undefined' && define.amd) { // expose as an amd/requirejs module
  //   define('cytoscape-view-utilities', function () {
  //     return register;
  //   });
  // }

  // if (typeof cytoscape !== 'undefined' && typeof $ !== "undefined") { // expose to global cytoscape (i.e. window.cytoscape)
  //   register(cytoscape, $);
  // }

// })
