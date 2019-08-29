var generalUtils = require('./general-utils');


class Polyomino {
    constructor(width,height,index,leftMostCoord,topMostCoord){        
        this.grid = new Array(width);
        for (var i = 0; i < width; i++) {
            this.grid[i] = new Array(height);
            for(var j = 0 ; j < height;j++){
                this.grid[i][j] = false;
            }
        }
        this.index = index; //index of polyomino in the input of the packing function
        this.leftMostCoord = leftMostCoord; //kept to determine the amount of shift in the output
        this.topMostCoord = topMostCoord;//kept to determine the amount of shift in the output
        this.width = width;
        this.height = height;
        this.location = new Point(-1,-1);  //the grid cell coordinates where the polyomino was placed
        this.center = new Point(Math.floor(width/2), Math.floor(height/2));// center of polyomino
        this.numberOfOccupiredCells = 0;  
    }
}

class Point{
    constructor(x , y){
        this.x = x;
        this.y = y;        
    }
}

class BoundingRectangle{
    constructor(x1,y1,x2,y2){
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;        
    }
}

class Cell{
    constructor(occupied,visited){
        this.occupied = occupied; //boolean to determine if the cell is occupied
        this.visited = visited; //boolean to determine if the cell was visited before while traversing the cells
    }
}
class Grid{
    constructor(width, height){
        this.width = width;
        this.height = height;
        //create and intialize the grid
        this.grid = new Array(width);
        for (var i = 0; i < width; i++) {
            this.grid[i] = new Array(height);
            for(var j = 0 ; j < height;j++){
                this.grid[i][j] = new Cell(false,false);
            }
        }
        this.center = new Point(Math.floor(width/2), Math.floor(height/2));
        this.occupiedRectangle = new BoundingRectangle(0,0,0,0);  // the bounding rectanble of the occupied cells in the grid
        this.numberOfOccupiredCells = 0;      
    }

    //function given a list of cells it returns the direct unvisited unoccupied neighboring cells 
    getDirectNeighbors(cells){
        var resultPoints = [];
        if(cells.length == 0){
            for(var i = 0 ; i< this.width;i++){
                for(var j = 0 ; j< this.height;j++){
                    if(this.grid[i][j].occupied){                       
                       resultPoints = resultPoints.concat(this.getCellNeighbors(i,j));
                    }
                }
            }
        }else{
            cells.forEach(function(cell){
                    resultPoints = resultPoints.concat(this.getCellNeighbors(cell.x,cell.y));
            }.bind(this));
        }
        return resultPoints;
    }

    //given a cell at locatoin i,j get the unvistied unoccupied neighboring cell
    getCellNeighbors(i,j){
        var resultPoints = [];
        //check all the 8 surrounding cells 
        if(i-1 >= 0){
            if(!this.grid[i-1][j].occupied && !this.grid[i-1][j].visited) {
                resultPoints.push({x: i-1, y:j});   
                this.grid[i-1][j].visited = true;              
            }                        
        }
        if(i+1 < this.width){
            if(!this.grid[i+1][j].occupied && !this.grid[i+1][j].visited) {
                resultPoints.push({x: i+1, y:j});
                this.grid[i+1][j].visited= true;
            }
        }
        if(j-1 >= 0){
            if(!this.grid[i][j-1].occupied && !this.grid[i][j-1].visited) {
                resultPoints.push({x: i, y:j-1});
                this.grid[i][j-1].visited= true;
            }
        }
        if(j+1 < this.height){
            if(!this.grid[i][j+1].occupied && !this.grid[i][j+1].visited) {
                resultPoints.push({x: i, y:j+1});
                this.grid[i][j+1].visited= true;
            }
        }
        if(i-1 >= 0){
            if(!this.grid[i-1][j].occupied && !this.grid[i-1][j].visited) {
                resultPoints.push({x: i-1, y:j});
                this.grid[i-1][j].visited= true;
            }
        }
        if(i-1 >=0 && j-1 >=0){
            if(!this.grid[i-1][j-1].occupied && !this.grid[i-1][j-1].visited) {
                resultPoints.push({x: i-1, y:j-1});
                this.grid[i-1][j-1].visited= true;
            }
        }

        if(i+1 < this.width && j-1 >=0){
            if(!this.grid[i+1][j-1].occupied && !this.grid[i+1][j-1].visited) {
                resultPoints.push({x: i+1, y:j-1});
                this.grid[i+1][j-1].visited= true;
            }
        }

        if(i-1 >= 0 && j+1 < this.height){
            if(!this.grid[i-1][j+1].occupied && !this.grid[i-1][j+1].visited) {
                resultPoints.push({x: i-1, y:j+1});
                this.grid[i-1][j+1].visited= true;
            }
        }
        if(i+1 < this.width && j+1 < this.height){
            if(!this.grid[i+1][j+1].occupied && !this.grid[i+1][j+1].visited) {
                resultPoints.push({x: i+1, y:j+1});
                this.grid[i+1][j+1].visited = true;
            }
        }

        return resultPoints;
        
    }

    // a function to place a given polyomino in the cell i j on the grid
    placePolyomino(polyomino, i , j){
        polyomino.location.x = i;
        polyomino.location.y = j;
        for(var k = 0 ; k< polyomino.width; k++){
            for(var l = 0 ; l < polyomino.height; l++){
                if(polyomino.grid[k][l]){ //if [k] [l] cell is occupied in polyomino
                    this.grid[k-polyomino.center.x + i][l-polyomino.center.y + j].occupied = true;
                }
            }
        }
        //update number of occupired cells
        this.numberOfOccupiredCells += polyomino.numberOfOccupiredCells;

        //update bounding rectangle and reset visited cells to none
        var x1 = 10000, x2= 0,y1 = 10000,y2=0;
        for(var x = 0 ; x<this.width; x++){
            for(var y = 0 ; y< this.height;y++){
                this.grid[x][y].visited = false;
                if(this.grid[x][y].occupied){
                    if(x <= x1) x1 = x;
                    if(y <= y1) y1 = y;
                    if(x >= x2) x2 = x;
                    if(y >= y2) y2 = y;  
                }
            }
        }
        this.occupiedRectangle.x1 = x1,
        this.occupiedRectangle.y1 = y1;
        this.occupiedRectangle.x2 = x2;
        this.occupiedRectangle.y2= y2;     
      
    }

    // a function to determine if a polyomino can be placed on the given cell i,j
    tryPlacingPolyomino(polyomino, i , j){     
        for(var k = 0 ; k< polyomino.width; k++){
            for(var l = 0 ; l < polyomino.height; l++){
                //return false if polyomino goes outside the grid when placed on i,j
                if(k-polyomino.center.x + i >= this.width || k-polyomino.center.x + i < 0 || l-polyomino.center.y + j >= this.height ||  l-polyomino.center.y + j < 0){
                    return false;
                }
                //return false if the  polymino cell and the corrosponding main grid cell are both occupied
                if(polyomino.grid[k][l] &&  this.grid[k-polyomino.center.x + i][l-polyomino.center.y + j].occupied){
                   return false;
                }
            }
        }
        return true;
    }

    //calculates the value of the utility (aspect ratio) of placing a polyomino on cell i,j
    calculateUtilityOfPlacing(polyomino, i , j,desiredAspectRatio){
       var result = {} ;
       var actualAspectRatio = 1;
       var fullness = 1;
       var adjustedFullness = 1;
       var x1 = this.occupiedRectangle.x1;
       var x2 = this.occupiedRectangle.x2;
       var y1 = this.occupiedRectangle.y1;
       var y2 = this.occupiedRectangle.y2;
       if(i - polyomino.center.x < x1) x1 = i - polyomino.center.x ;
       if(j - polyomino.center.y < y1) y1 = j - polyomino.center.y;
       if(polyomino.width - 1 - polyomino.center.x + i > x2) x2 = polyomino.width - 1 - polyomino.center.x + i;
       if(polyomino.height -1 - polyomino.center.y + j > y2) y2 = polyomino.height -1 - polyomino.center.y + j; 
        var width = x2-x1 + 1;
        var height = y2-y1 + 1;
        actualAspectRatio = width/height;
        fullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / (width * height);

        if(actualAspectRatio > desiredAspectRatio){
            adjustedFullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / (width* (width/desiredAspectRatio));
           // height = width / desiredAspectRatio;
        }else{

            adjustedFullness = (this.numberOfOccupiredCells + polyomino.numberOfOccupiredCells) / ((height* desiredAspectRatio)* height);

           // width = height * desiredAspectRatio;
        }

        result.actualAspectRatio = actualAspectRatio;
        result.fullness = fullness;
        result.adjustedFullness = adjustedFullness;
        
      return result;

    }
    
}

module.exports = {
    Grid: Grid,
    Polyomino : Polyomino,
    BoundingRectangle : BoundingRectangle,
    Point : Point
    
  };


