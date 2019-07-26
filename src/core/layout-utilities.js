

var layoutUtilities = function (cy, options) {

  var instance = {};

  instance.placeHiddenNodes = function (mainEles) {
    mainEles.forEach(function (mainEle) {
      var hiddenEles = mainEle.neighborhood().nodes(":hidden");
      hiddenEles.forEach(function (hiddenEle) {
        var neighbors = hiddenEle.neighborhood().nodes(":visible");
        if (neighbors.length > 1) {
          instance.nodeWithMultipleNeighbors(hiddenEle);
        } else instance.nodeWithOneNeighbor(mainEle, hiddenEle);
      });
    });
  };

  instance.placeNewNodes = function (eles){
    var components = this.findComponents(eles);
    var disconnectedComp = [];
    for(var i =0; i< components.length ; i++){
      var oneNeig = false;
      var multNeig = false;
      var mainEle;
      var multneighbors = [];
      var positioned = [];
      var x =0;
      var y = 0;
      var isPositioned = false;
      for(var j=0; j<components[i].length ; j++){
        var neighbors = components[i][j].neighborhood().nodes().difference(eles);
        positioned.push(false);
        if(neighbors.length > 1 && !isPositioned){
          multNeig = true;
          positioned[j] = true;
          multneighbors = neighbors;
          instance.nodeWithMultipleNeighbors(components[i][j], multneighbors);
          x = components[i][j].position("x");
          y = components[i][j].position("y");
          isPositioned = true;
        }
        else if(neighbors.length == 1 && !isPositioned){
          oneNeig = true;
          mainEle = neighbors[0];
          positioned[j] = true;
          instance.nodeWithOneNeighbor(mainEle, components[i][j]);
          x = components[i][j].position("x");
          y = components[i][j].position("y");
          isPositioned = true;
        }
      }
      
      if(oneNeig || multNeig){
        for(var j=0; j<components[i].length; j++){
          if(positioned[j] == false){
            var neighbors = components[i][j].neighborhood().nodes();
            var positionedNeigbors = [];
            var curr = components[i][j].neighborhood().nodes().difference(eles);
            curr.forEach(function(ele){
              positionedNeigbors.push(ele);
            })
           
            for(var k =0; k< neighbors.length; k++){
              if(positioned[components[i].indexOf(neighbors[k])]){
                positionedNeigbors.push(neighbors[k]);
              }
            }
            if (positionedNeigbors.length > 1) {
              instance.nodeWithMultipleNeighbors(components[i][j], positionedNeigbors);
            } else if(positionedNeigbors.length == 1) instance.nodeWithOneNeighbor(positionedNeigbors[0], components[i][j]);
            else{
              var horizontalP = instance.generateRandom(options.offset, options.offset *2 , 0);
              var verticalP = instance.generateRandom(options.offset, options.offset *2, 0);
              components[i][j].position("x", x + horizontalP);
              components[i][j].position("y", y + verticalP);
            }
            positioned[j] = true;
          }
        }
      }
      else{
        disconnectedComp.push(components[i]);
      }
    }

    if(disconnectedComp.length >= 1){
      instance.disconnectedNodes(disconnectedComp);
    }
  };

  instance.disconnectedNodes = function (components){
    var leftX = Number.MAX_VALUE;
    var rightX = Number.MIN_VALUE;
    var topY = Number.MAX_VALUE;
    var bottomY = Number.MIN_VALUE;
    // Check the x and y limits of all hidden elements and store them in the variables above
    cy.nodes(':visible').forEach(function(node){
      var halfWidth = node.outerWidth()/2;
      var halfHeight = node.outerHeight()/2;
      if (node.position("x") - halfWidth < leftX)
        leftX = node.position("x") - halfWidth;
      if (node.position("x") + halfWidth > rightX)
        rightX = node.position("x") + halfWidth;
      if (node.position("y") - halfHeight < topY)
        topY = node.position("y") - halfHeight;
      if (node.position("y") + halfHeight > bottomY)
        bottomY = node.position("y") + halfHeight;
    });
 
    var radiusy = topY - bottomY;
    var radiusx = rightX - leftX;
    var innerRadius = (Math.sqrt(radiusx * radiusx + radiusy * radiusy)) / 2;
    var centerX = (leftX + rightX)/2;
    var centerY = (topY + bottomY)/2;
    //var components = this.findComponents(newEles);
    var numOfComponents = components.length;
    var angle = 360/numOfComponents;
    var count = 1;

    components.forEach(function(component){

      var distFromCenter = instance.generateRandom(innerRadius + options.offset * 6, innerRadius + options.offset * 8, 1);
      var curAngle = angle * count;
      var angleInRadians = curAngle * Math.PI /180;
      var x = centerX + distFromCenter * Math.cos(angleInRadians);
      var y = centerY + distFromCenter * Math.sin(angleInRadians);

      if(component.length == 1){
        component[0].position("x", x);
        component[0].position("y", y);
      }
      else{
        var max = 0;
        var index = 0;
        var positioned = [];
        for(var i=0; i<component.length; i++){
          positioned.push(false);
        }

        positioned[0] = true;
        component[0].position("x", x);
        component[0].position("y", y);
          
        for(var i=1; i<component.length; i++){
          var neighbors = component[i].neighborhood().nodes();
          var positionedNeigbors = [];
          for(var j =0; j< neighbors.length; j++){
            if(positioned[component.indexOf(neighbors[j])]){
              positionedNeigbors.push(neighbors[j]);
            }
          }
          if (positionedNeigbors.length > 1) {
            instance.nodeWithMultipleNeighbors(component[i], positionedNeigbors);
          } else if(positionedNeigbors.length == 1) instance.nodeWithOneNeighbor(positionedNeigbors[0], component[i]);
          else{
            var horizontalP = instance.generateRandom(options.offset, options.offset *2 , 0);
            var verticalP = instance.generateRandom(options.offset, options.offset *2, 0);
            component[i].position("x", x + horizontalP);
            component[i].position("y", y + verticalP);
          }
          positioned[i] = true;
        }
      }
      count++;
    });
  };

  instance.findComponents = function(newEles){
    
    var adjListArray = [];
    var current = cy.nodes().difference(newEles);
    newEles.forEach(function(ele){
      var neighbors = ele.neighborhood().nodes().difference(current);
      var listOfIndexes = [];
      neighbors.forEach(function(neigbor){
          var index = newEles.indexOf(neigbor);
          listOfIndexes.push(index);
      });
      adjListArray.push(listOfIndexes);
    });

    // Mark all the vertices as not visited 
    var visited = []; 
    for(var v = 0; v < newEles.length; v++){
        visited.push(false); 
    }

    var listOfComponents = [];
    
  
    for (var v=0; v<newEles.length; v++) 
    { 
        var elesOfComponent = [];
        if (visited[v] == false) 
        { 
            // print all reachable vertices 
            // from v 
            this.DFSUtil(v, visited, adjListArray, newEles, elesOfComponent); 
            listOfComponents.push(elesOfComponent);
        } 
    }
    
    return listOfComponents;
  };

  instance.DFSUtil = function(v, visited, adjListArray, newEles, elesOfComponent){
    // Mark the current node as visited and print it 
    visited[v] = true; 
    elesOfComponent.push(newEles[v]);
    // Recur for all the vertices 
    // adjacent to this vertex 
    for (var i=0; i<adjListArray[v].length ; i++) { 
      if(!visited[adjListArray[v][i]]) this.DFSUtil(adjListArray[v][i], visited, adjListArray, newEles, elesOfComponent); 
    } 
  }; 

  instance.nodeWithOneNeighbor = function(mainEle, hiddenEle) {
    var quadrants = instance.checkOccupiedQuadrants(mainEle, hiddenEle);
    var freeQuadrants = [];
    for (var property in quadrants) {
        if (quadrants[property] === "free")
            freeQuadrants.push(property);
    }
    //Can take values 1 and -1 and are used to place the hidden nodes in the random quadrant
    var horizontalMult;
    var verticalMult;
    if (freeQuadrants.length > 0)
    {
      if (freeQuadrants.length === 3)
      {
        if (freeQuadrants.includes('first') && freeQuadrants.includes('second') && freeQuadrants.includes('third'))
        {
          horizontalMult = -1;
          verticalMult = -1;
        }
        else if (freeQuadrants.includes('first') && freeQuadrants.includes('second') && freeQuadrants.includes('fourth'))
        {
          horizontalMult = 1;
          verticalMult = -1;
        }
        else if (freeQuadrants.includes('first') && freeQuadrants.includes('third') && freeQuadrants.includes('fourth'))
        {
          horizontalMult = 1;
          verticalMult = 1;
        }
        else if (freeQuadrants.includes('second') && freeQuadrants.includes('third') && freeQuadrants.includes('fourth'))
        {
          horizontalMult = -1;
          verticalMult = 1;
        }
      }
      else
      {
        //Randomly picks one quadrant from the free quadrants
        var randomQuadrant = freeQuadrants[Math.floor(Math.random()*freeQuadrants.length)];

        if (randomQuadrant === "first") {
            horizontalMult = 1;
            verticalMult = -1;
        }
        else if (randomQuadrant === "second") {
            horizontalMult = -1;
            verticalMult = -1;
        }
        else if (randomQuadrant === "third") {
            horizontalMult = -1;
            verticalMult = 1;
        }
        else if (randomQuadrant === "fourth") {
            horizontalMult = 1;
            verticalMult = 1;
        }
      }
    }
    else
    {
        horizontalMult = 0;
        verticalMult = 0;
    }
    //Change the position of hidden elements
  
    var horizontalParam = instance.generateRandom(options.idealEdgeLength - options.offset, options.idealEdgeLength + options.offset, horizontalMult);
    var verticalParam = instance.generateRandom(options.idealEdgeLength - options.offset, options.idealEdgeLength + options.offset, verticalMult);
    var newCenterX = mainEle.position("x") + horizontalParam;
    var newCenterY = mainEle.position("y") + verticalParam;
    hiddenEle.position("x", newCenterX);
    hiddenEle.position("y",newCenterY);
  };

  instance.nodeWithMultipleNeighbors = function(ele, neighbors){
    if(neighbors == null){
      var neighbors = ele.neighborhood().nodes(":visible");
    }
      var x = 0;
      var y = 0;
      var count = 0;
      neighbors.forEach(function(ele1){
        x += ele1.position("x");
        y += ele1.position("y");
        count ++;
      });
      x = x / count;
      y = y / count ;
      var diffx = instance.generateRandom(0, options.offset/2, 0);
      var diffy = instance.generateRandom(0, options.offset/2, 0);
      ele.position("x", x + diffx);
      ele.position("y", y + diffy);
  }

  instance.generateRandom = function(min, max, mult) {
    var val = [-1,1];
    if (mult === 0)
        mult = val[Math.floor(Math.random()*val.length)];
    return (Math.floor(Math.random() * (max - min + 1)) + min) * mult;
  };

  instance.checkOccupiedQuadrants = function(mainEle, hiddenEles) {
    var visibleEles = mainEle.neighborhood().difference(hiddenEles).nodes();
    var occupiedQuadrants = {first:"free", second:"free", third:"free", fourth:"free"};

    visibleEles.forEach(function( ele ){
        if (ele.data('class') != 'compartment' &&  ele.data('class') != 'complex')
        {
            if (ele.position("x") < mainEle.position("x") && ele.position("y") < mainEle.position("y"))
                occupiedQuadrants.second = "occupied";
            else if (ele.position("x") > mainEle.position("x") && ele.position("y") < mainEle.position("y"))
                occupiedQuadrants.first = "occupied";
            else if (ele.position("x") < mainEle.position("x") && ele.position("y") > mainEle.position("y"))
                occupiedQuadrants.third = "occupied";
            else if (ele.position("x") > mainEle.position("x") && ele.position("y") > mainEle.position("y"))
                occupiedQuadrants.fourth = "occupied";
        }
    });
    return occupiedQuadrants;
  };

  return instance;
};

module.exports = layoutUtilities;
