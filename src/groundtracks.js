function groundTracks(){	
	function stack(){
		result = write()
		paths = result[0]
		lond = result[1]
		latd=result[2]
		pos=result[3]
		traj=result[4]
		
		var l = paths.length;
		    		var datas = [];
		    		if(pos>0 && nb_curve>=0){
		    			for(n=0;n<l;n=n+1){
		    			curve = { 
		    					type: "spline",
		    					markerType: "none",
		    					toolTipContent: "Longitude:{x}, Latitude:{y}",
		    					dataPoints: paths[n]
		    				};
		    			datas.push(curve);
		    			}
		    		}
		    		
//		    		if(pos<0){
//			    		past = { 
//		    					type: "spline",
//		    					markerType: "none",
//		    					toolTipContent: "Longitude:{x}, Latitude:{y}",
//		    					dataPoints: traj
//		    				};
//			    		datas.push(past);
//			    		};
			    		
		    		act = { 
							type: "scatter",
							markerType: "circle",
							markerSize: 10,
							markerColor: "black",
							toolTipContent: "Longitude:{x}, Latitude:{y}",
							dataPoints: [{x:lond, y:latd}]
						};
		    		datas.push(act);

		    		
		    		return datas
	}
	
	plot();
	chart = plot();
	
	function plot(){
    		
    		var chart = new CanvasJS.Chart("chartContainer", { 
    				backgroundColor: "", 
    				axisY: {
    					tickColor: "white",
    					tickThickness: 1,
    					labelFontColor: "white",
    					labelFontSize: 25,
    					interval: 30,
    					lineColor: "black",
    					lineThickness: 1,
    					gridColor: "black",
    					gridThickness: 1, 
    					minimum: -90, 
    					maximum: +90 
    				}, 
    				
    				axisX: {
    					tickColor: "white",
    					tickThickness: 1,
    					labelFontColor: "white",
    					labelFontSize: 25,
    					interval: 30,
    					lineColor: "black",
    					lineThickness: 1,
    					gridColor: "black",
    					gridThickness: 1,  
    					minimum: -180,
    					maximum: 180
    				},
    				data: stack()
//    				data: [ 
//    				{ 
//    					type: "spline",
//    					markerType: "none",
//    					toolTipContent: "Longitude:{x}, Latitude:{y}",
//    					dataPoints: paths[0]
//    					dataPoints: [ 
//    						{x: l, y: 3.91 },
//    						{x: 80, y: 60 }
//    					]
//    				} 
//    				] 
    			});
    		return chart
	};
	chart.render()
	upt()
	
function upt(){
		if (mode==0&&pos<0||mode==2){
			//alert("Plus en orbit!")
			flightControl();
			$("#settings").hide();
			return
		}
	size();
	chart.options.data=stack();
	chart.render();
	window.setTimeout(loop, 100);
}

function loop(){upt();};

function size(){
	var wi=$("#container").width()
	var he = wi/2
	$("#container").css("height", he)
	$("img").css("width", wi-56);
	$("img").css("height", he-64);
	var hwi=$("#hudcontainer").width()
	//var mar = (hwi-350*3)/4
	var fs=(hwi-150)*1.5/(30*3)
	$(".hud").css("font-size",fs)
	$(".hudn").css("width", 15*fs/2)
	$(".hudv").css("width", 10*fs/1.6)
	$(".hudn").css("margin-left", ((hwi-150)-(3*25*fs/2))/3)
	$("#hudA1").css("margin-left",150)
	
};

//});
};