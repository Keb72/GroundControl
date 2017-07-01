function myEssais(){

var i = 0;
var K = 0;
var lon1 = 10.2564
var lat1 = 54.2255
var ks = []
//for(i=0;i<10;i++){
//K += 10;
//ks.push(K);
//}
var x1 = 2;
var y1 = 3;
var x2 = 3;
var y2 = 6;
var coord1 = {x:x1,y:y1};
var coord2 = {x:x2,y:y2};
var coord = [];
coord.push(coord1);
coord.push(coord2);
coord.toString()
document.getElementById("demo2").innerHTML = coord;
}