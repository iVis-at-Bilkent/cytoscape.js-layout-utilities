var generalUtils = {};
var polyominoPacking = require('./polyomino-packing');


//a function to remove duplicate object in array
generalUtils.uniqueArray =  function( ar ) {
    var j = {};  
    ar.forEach( function(v) {
      j[v+ '::' + typeof v] = v;
    });  
    return Object.keys(j).map(function(v){
      return j[v];
    });
};

//a function to determine the grid cells where a line between point p0 and p1 pass through
generalUtils.LineSuperCover = function(p0,p1){
  var dx = p1.x-p0.x, dy = p1.y-p0.y;
  var nx = Math.abs(dx), ny = Math.abs(dy);
  var sign_x = dx > 0? 1 : -1, sign_y = dy > 0? 1 : -1;

  var p = new polyominoPacking.Point(p0.x, p0.y);
  var points = [new polyominoPacking.Point(p.x, p.y)];
  for (var ix = 0, iy = 0; ix < nx || iy < ny;) {
      if ((0.5+ix) / nx == (0.5+iy) / ny) {
          // next step is diagonal
          p.x += sign_x;
          p.y += sign_y;
          ix++;
          iy++;
      } else if ((0.5+ix) / nx < (0.5+iy) / ny) {
          // next step is horizontal
          p.x += sign_x;
          ix++;
      } else {
          // next step is vertical
          p.y += sign_y;
          iy++;
      }
      points.push(new polyominoPacking.Point(p.x, p.y));
  }
  return points;
};

module.exports = generalUtils;
  
