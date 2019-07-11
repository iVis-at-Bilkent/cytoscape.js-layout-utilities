

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
    var disconnectedNodes = [];
    eles.forEach(function (ele){
      var neighbors = ele.neighborhood().nodes(":visible");
      if(neighbors.length > 1){
        instance.nodeWithMultipleNeighbors(ele);
      }
      else if (neighbors.length == 1){
        instance.nodeWithOneNeighbor(neighbors[0], ele);
      }
      else{
        disconnectedNodes.push(ele);
      }
    });
    if(disconnectedNodes.length >= 1){
      instance.disconnectedNodes(disconnectedNodes);
    }
  };

  instance.disconnectedNodes = function (newEles){
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
    var outerRadius = innerRadius + options.offset;
    var centerX = (leftX + rightX)/2;
    var centerY = (topY + bottomY)/2;
    var components = this.findComponents(newEles);
    var numOfComponents = components.length;
    var angle = 360/numOfComponents;
    var count = 1;


    components.forEach(function(component){
      // var horizontalParam = instance.generateRandom(200, 250 , 0);
      // var verticalParam = instance.generateRandom(200, 250, 0);
      // var newCenterX = centerX  + horizontalParam;
      // var newCenterY = centerY + verticalParam;

      var distFromCenter = innerRadius + Math.random() * (outerRadius - innerRadius);
      var curAngle = angle * count;
      var x = distFromCenter * Math.cos(curAngle);
      var y = distFromCenter * Math.sin(curAngle);

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
          var neighbors = component[i].neighborhood().nodes();
          if(neighbors.length > max){
            max = neighbors.length;
            index = i;
          }
        }

        positioned[index] = true;
        component[index].position("x", x);
        component[index].position("y", y);
          
        for(var i=0; i<component.length; i++){
          if(i != index){
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
              var horizontalP = instance.generateRandom(20, 60 , 0);
              var verticalP = instance.generateRandom(20, 60, 0);
              component[i].position("x", x + horizontalP);
              component[i].position("y", y + verticalP);
            }
          }
          positioned[i] = true;
        }
      }
      count++;
    });
  };

  instance.findComponents = function(newEles){
    
    var adjListArray = [];

    newEles.forEach(function(ele){
      var neighbors = ele.neighborhood().nodes();
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
    ///var neighbors = ele.neighborhood().nodes(":visible");
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
