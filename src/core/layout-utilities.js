
var generalUtils = require('./general-utils.js');
var polyominoPacking = require('./polyomino-packing');
var layoutUtilities = function (cy, options) {

 /*  var defaults = {
    idealEdgeLength : 50,
    offset : 20,
    desiredAspectRatio : 1,
    polyominoGridSizeFactor : 1,
    utilityFunction : 1
  };

  function extend(defaults, options) {
    var obj = {};

    for (var i in defaults) {
      obj[i] = defaults[i];
    }

    for (var i in options) {      
      obj[i] = options[i];
    }

    return obj;
  };

  options = extend(defaults, options); */
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

 
  instance.packComponents = function(components){

    var gridStep = 0;
    var totalNodes = 0;
    components.forEach(function(component){
      totalNodes += component.nodes.length;
      component.nodes.forEach(function(node){
        gridStep += node.width + node.height;
      }); 
    });

    gridStep = gridStep / (2 * totalNodes);
    gridStep = Math.floor(gridStep * options.polyominoGridSizeFactor);
    var gridWidth = 0, gridHeight = 0;
    var polyominos = [];
    var globalX1 = 10000, globalX2=0,globalY1= 10000,globalY2=0 ;
    //create polyominos for components
    components.forEach(function(component,index){
      var x1 = 10000, x2= 0,y1 = 10000,y2=0;
      component.nodes.forEach(function(node){
        if(node.x <= x1) x1 = node.x;
        if(node.y <= y1) y1 = node.y;
        if(node.x + node.width >= x2) x2 = node.x + node.width;
        if(node.y + node.height >= y2) y2 = node.y + node.height;         
      }); 

      component.edges.forEach(function(edge){
        if(edge.startX<= x1) x1 = edge.startX;
        if(edge.startY <= y1) y1 = edge.startY;
        if(edge.endX >= x2) x2 = edge.endX;
        if(edge.endY >= y2) y2 = edge.endY;         
      }); 

      if(x1<globalX1) globalX1 = x1;
      if(x2>globalX2) globalX2 = x2;
      if(y1<globalY1) globalY1 = y1;
      if(y2>globalY2) globalY2 = y2;    

      gridWidth += (x2-x1);
      gridHeight += (y2-y1);
      var componentWidth = Math.floor((x2-x1)/ gridStep) + 1;
      var componentHeight = Math.floor((y2-y1)/ gridStep) + 1;

      var componentPolyomino = new polyominoPacking.Polyomino(componentWidth,componentHeight,index,x1,y1);

      //fill nodes to polyomino cells
      component.nodes.forEach(function(node){
        //top left cell of a node
       var topLeftX = Math.floor((node.x - x1 ) / gridStep);
       var topLeftY = Math.floor((node.y - y1) / gridStep);     

       //bottom right cell of a node
       var bottomRightX = Math.floor((node.x + node.width - x1)/ gridStep);
       var bottomRightY = Math.floor((node.y+ node.height - y1)/ gridStep);

       //all cells between topleft cell and bottom right cell should be occupied
       for(var i = topLeftX ; i <= bottomRightX ; i++){
         for(var j = topLeftY; j <= bottomRightY ; j++){
           componentPolyomino.grid[i][j] = true;
           
         }
       }
      }); 

      //fill cells where edges pass 
      component.edges.forEach(function(edge){
         var p0 = {} , p1 = {};
         p0.x = (edge.startX - x1 ) / gridStep;
         p0.y = (edge.startY - y1) / gridStep;
         p1.x = (edge.endX - x1) / gridStep;
         p1.y = (edge.endY - y1) / gridStep;
         //for every edge calculate the super cover 
        var points = generalUtils.LineSuperCover(p0,p1)        
        points.forEach(function(point){          
          var indexX = Math.floor(point.x);
          var indexY = Math.floor(point.y)
          if(indexX >= 0 && indexX < componentPolyomino.width && indexY >=0 && indexY < componentPolyomino.height){
            componentPolyomino.grid[Math.floor(point.x)][Math.floor(point.y)] = true;
          }
        });
      });

      //update number of occupied cells in polyomino
      for(var i = 0 ; i <componentPolyomino.width ; i++){
        for(var j = 0; j < componentPolyomino.height ; j++){
          if(componentPolyomino.grid[i][j]) componentPolyomino.numberOfOccupiredCells++;
          
        }
      }      
      polyominos.push(componentPolyomino);       
    });

    var componentsCenter = new polyominoPacking.Point((globalX1+globalX2)/2, (globalY1+globalY2)/2);
    var componentsCenteronGrid = new polyominoPacking.Point(Math.floor(componentsCenter.x/gridStep), Math.floor(componentsCenter.y/gridStep));
    //order plyominos non-increasing order
    polyominos.sort(function(a,b){
        var aSize = a.width*a.height;
        var bSize = b.width*b.height;
        // a should come before b in the sorted order
        if(aSize > bSize){
          return -1;
        // a should come after b in the sorted order
        }else if(aSize < bSize){
          return 1;
        // a and b are the same
        }else{
          return 0;
        }
    });  

    //main grid width and height is two the times the sum of all components widths and heights (worst case scenario)
    gridWidth = Math.ceil(gridWidth*2/gridStep);
    gridHeight = Math.ceil(gridHeight*2/gridStep);
    
    //intialize the grid
    var mainGrid = new polyominoPacking.Grid(gridWidth,gridHeight);

    //place first (biggest) polyomino in the center
    mainGrid.placePolyomino(polyominos[0], mainGrid.center.x,mainGrid.center.y);
    

   
    //for every polyomino try placeing it in first neighbors and calculate utility if none then second neighbor and so on..
    for(var i = 1 ; i< polyominos.length;i++){

      var adjustedFullnessMax = 0;      
      var weigthFullnessAspectRatio = 0;
      var minAspectRatioDiff = 1000000;
      var placementFound = false;
      var cells = [];
      var resultLocation = {};
      while(!placementFound){

        cells = mainGrid.getDirectNeighbors(cells, Math.ceil(Math.max(polyominos[i].width,polyominos[i].height) / 2));
        cells.forEach(function(cell){
            if(mainGrid.tryPlacingPolyomino(polyominos[i], cell.x, cell.y)){
              placementFound = true;
              var utilityValue = mainGrid.calculateUtilityOfPlacing(polyominos[i],cell.x,cell.y, options.desiredAspectRatio); 

              if(options.utilityFunction == 1){
                if( utilityValue.adjustedFullness   > adjustedFullnessMax){
                  adjustedFullnessMax= utilityValue.adjustedFullness;
                  minAspectRatioDiff = Math.abs(utilityValue.actualAspectRatio - options.desiredAspectRatio)
                  resultLocation.x = cell.x;
                  resultLocation.y = cell.y;
                }else if(utilityValue.adjustedFullness == adjustedFullnessMax){
                  if(Math.abs(utilityValue.actualAspectRatio - options.desiredAspectRatio) <= minAspectRatioDiff){
                    adjustedFullnessMax= utilityValue.adjustedFullness;
                    minAspectRatioDiff = Math.abs(utilityValue.actualAspectRatio - options.desiredAspectRatio)
                    resultLocation.x = cell.x;
                    resultLocation.y = cell.y;
                  }
                }
              }else  if(options.utilityFunction == 2){
                var aspectRatioDiff = Math.abs(utilityValue.actualAspectRatio - options.desiredAspectRatio);
                var weightedUtility = (utilityValue.fullness * .5) + ((1- aspectRatioDiff/Math.max(utilityValue.actualAspectRatio,options.desiredAspectRatio) * .5))
                if(weightedUtility > weigthFullnessAspectRatio){
                  weigthFullnessAspectRatio = weightedUtility;
                  resultLocation.x = cell.x;
                  resultLocation.y = cell.y;
                }
               
              }
              
            }
        });
      }    
     
      mainGrid.placePolyomino(polyominos[i],resultLocation.x,resultLocation.y);
    }  

    //sort polyominos according to index of input to return correct output order
    polyominos.sort(function(a,b){
      if(a.index < b.index){
        return -1;
      }else if(a.index > b.index){
        return 1;
      }else{
        return 0;
      }
  });  
    
  var packingResult = {};
  packingResult.shifts = []
  
 /*  var shiftX = componentsCenter.x - ((mainGrid.center.x - mainGrid.occupiedRectangle.x1)*gridStep); 
  var shiftY = componentsCenter.y - ((mainGrid.center.y - mainGrid.occupiedRectangle.y1)*gridStep); 
  var occupiedCenterX = Math.floor((mainGrid.occupiedRectangle.x1 + mainGrid.occupiedRectangle.x2)/2);
  var occupiedCenterY = Math.floor((mainGrid.occupiedRectangle.y1 + mainGrid.occupiedRectangle.y2)/2); */

    polyominos.forEach(function(pol){
      var dx = (pol.location.x - pol.center.x - mainGrid.occupiedRectangle.x1) * gridStep - pol.leftMostCoord ;//+shiftX;
      var dy = (pol.location.y -pol.center.y - mainGrid.occupiedRectangle.y1) * gridStep - pol.topMostCoord;// + shiftY;
      //var dx = (pol.location.x -occupiedCenterX) * gridStep + componentsCenter.x- pol.leftMostCoord;//+shiftX;
      //var dy = (pol.location.y -occupiedCenterY) * gridStep + componentsCenter.y-pol.topMostCoord;// + shiftY;
      packingResult.shifts.push({dx: dx, dy: dy});
    });

    packingResult.aspectRatio = Math.round( ((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1)/(mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1)) * 1e2 ) / 1e2;
    packingResult.fullness = Math.round( ((mainGrid.numberOfOccupiredCells / ((mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1)*(mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1)))*100) * 1e2 ) / 1e2;
    
    if(packingResult.aspectRatio > options.desiredAspectRatio){
      var mainGridWidth = mainGrid.occupiedRectangle.x2 - mainGrid.occupiedRectangle.x1 + 1;
      packingResult.adjustedFullness = Math.round( (((mainGrid.numberOfOccupiredCells) / (mainGridWidth* (mainGridWidth/options.desiredAspectRatio))*100)) * 1e2 ) / 1e2;
     // height = width / desiredAspectRatio;
  }else{

    var mainGridheight = mainGrid.occupiedRectangle.y2 - mainGrid.occupiedRectangle.y1 + 1;
    packingResult.adjustedFullness = Math.round( (((mainGrid.numberOfOccupiredCells) / ((mainGridheight* options.desiredAspectRatio)* mainGridheight))*100) * 1e2 ) / 1e2;

     // width = height * desiredAspectRatio;
  }
     
   
    return packingResult;
  }

  return instance;
};

module.exports = layoutUtilities;
