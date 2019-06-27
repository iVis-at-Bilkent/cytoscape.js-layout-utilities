
    
var layoutUtilities = function (cy, options) {

  var instance = {};

  instance.layoutHiddenNodes = function(mainEles){
    mainEles.forEach(function(mainEle){
      var hiddenEles = mainEle.neighborhood().nodes(":hidden");
      hiddenEles.forEach(function(hiddenEle){
        var neighbors = hiddenEle.neighborhood().nodes(":visible");
        if(neighbors.length > 1){
          instance.nodeWithMultipleNeighbors(hiddenEle);
        }
        else
          instance.nodeWithOneNeighbor(mainEle, hiddenEle);
      })
      
    })
  }

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

  instance.layoutComponents= function(listOfEles){
    
  };

  // return the instance
  return instance;
};

module.exports = layoutUtilities;

