
    
// class Ploynomino {
//   constructor(name, level) {
//       this.name = name;
//       this.level = level;
//   }
// }


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

  instance.placeNewNodes = function (currentNodes, eles){
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
        disconnectedNodes.push(ele)
      }
    });
    if(disconnectedNodes.length >= 1){
      console.log("leleleele");
      instance.disconnectedNodes(currentNodes, disconnectedNodes);
    }
  }

  instance.disconnectedNodes = function(currentNodes, newEles){
    var leftX = Number.MAX_VALUE;
    var rightX = Number.MIN_VALUE;
    var topY = Number.MAX_VALUE;
    var bottomY = Number.MIN_VALUE;
    // Check the x and y limits of all hidden elements and store them in the variables above
    currentNodes.forEach(function(node){
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
 
    //var numOfPieces = eles.length;
    //var angle = 360 / len;
    var radiusy = topY - bottomY;
    var radiusx = rightX - leftX;
    var radius = Math.sqrt(radiusx * radiusx + radiusy * radiusy);
    var centerX = (leftX + rightX)/2;
    var centerY = (topY + bottomY)/2;
    
    newEles.forEach(function(newEle){
      console.log("insideforeach")
      var offsetX = instance.generateRandom(radius/2, radius/2 + options.offset, 0);
      var offsetY = instance.generateRandom(radius/2, radius/2 + options.offset, 0);
      newEle.position("x", centerX + offsetX);
      newEle.position("y", centerY + offsetY);
    });
    
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

  instance.nodeWithMultipleNeighbors = function(ele){
    var neighbors = ele.neighborhood().nodes(":visible");
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

  // instance.layoutComponents= function(listOfEles){
  //   for(var i = 0; i < listOfEles.length ; i++){
  //     var disconnectedPolys;
  //     for(var j = 0; j < listOfEles[i].length; j++){
      
  //     }
  //   }
  // };

  // return the instance
  return instance;
};

module.exports = layoutUtilities;

