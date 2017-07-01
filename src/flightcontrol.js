function flightControl(){	
	result1 = flight()
	alt = result1[0]
	th = result1[1]
	pmt=result1[2]
	pv=result1[3]
	psp=result1[6]
	pos=result[5]
	if (pos>0){
		//alert("Plus en orbit!")
		groundTracks();
		$("#settings").show();
		return
	}
	pdis=0
	pDisPar=0
	dis = 0
	
	var chart2 = new CanvasJS.Chart("chartContainer", { 
		backgroundColor: "", 
		axisY: {
			lineColor: "grey",
			lineThickness: 1,
			gridColor: "grey",
			gridThickness: 1, 
			maximum: 1000,
		}, 
		
		axisX: {
			lineColor: "grey",
			lineThickness: 1,
			gridColor: "grey",
			gridThickness: 1,
//			minimum: 0,
//			maximum: 100
		},
		data: [
		{ 
			type: "spline",
			markerType: "none",
			dataPoints: [ 
				{x: pdis, y: alt }
			]
		} ,
		{ 
			type: "splineArea",
			markerType: "none",
			color: "rgba(54,158,173,.7)",
			dataPoints: [ 
				{x: pdis, y: th }
			]
		},{ 
			type: "scatter",
			markerType: "circle",
			markerSize: 10,
			markerColor: "white",
			toolTipContent: "Altitude:{y}",
			dataPoints: [{x:0, y:alt}]
//			dataPoints: [ 
//				{x: l, y: 3.91 },
//				{x: 80, y: 60 }
//			]
		}
		] 
	});
	
	chart2.render();
	upt2()

function upt2(){
//		datas = stack()
 	result = flight()
	alt = result[0]
	th = result[1]
	var mt=result[2]
	var v=result[3]
	var ht=result[4]
 	var sp=result[6]
 	pos=result[5]
 	//var va=result[6]
	if (mode==0&&pos>0||mode==1){
		groundTracks();
		$("#settings").show();
		return
	}

	var dis = pdis + ((mt-pmt)*((pv+v)/2))
	var disForG = dis/1000
	//var disPar = pDisPar+(mt-pmt)*((pva+va)/2)
	if(ht<0 || th<0){th=0}
	
	chart2.options.data[0].dataPoints.push({x:disForG,y:alt});
	chart2.options.data[1].dataPoints.push({x:disForG,y:th});
	chart2.options.data[2].dataPoints[0].y=alt;
	chart2.options.data[2].dataPoints[0].x=disForG;
	chart2.options.axisX.maximum=12;
	chart2.options.axisX.minimum=-0.9;
	chart2.options.axisX.interval=1
	if (alt>1000){
		chart2.options.axisY.maximum=null;
	}
	
	if(dis>10000){
		chart2.options.axisX.minimum=disForG-10;
		chart2.options.axisX.maximum=disForG+2;

	}else{
		chart2.options.axisX.maximum=12;
	}
	
	//var x0=chart2.options.data[0].dataPoints[0].x
	var x1=chart2.options.data[0].dataPoints[0].x
	
	while(x1<chart2.options.axisX.minimum-0.1 || isNaN(x1)){
		chart2.options.data[0].dataPoints.splice(0,1)
		chart2.options.data[1].dataPoints.splice(0,1)
		x1=chart2.options.data[0].dataPoints[1].x
	}
	
	//acc = (sp-psp)/(mt-pmt)
	
	//if (isNAN(acc)){
	//	acc=0
	//}
	
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
	$(".hudv").css("width", 10*fs/2)
	$(".hudn").css("margin-left", ((hwi-150)-(3*25*fs/2))/3)
	$("#hudA1").css("margin-left",150)
		
	chart2.render();
	//document.getElementById("hud6v").innerHTML=Math.round(acc*100)/100+" m/s&sup2";
	//document.getElementById("demo2").innerHTML=disPar;
	
	pmt=mt;
	pv=v;
	psp=sp;
	//pva=va;
		if(isNaN(dis)){
		if(pdis!=0){}else{pdis=0}
	}else{
		pdis=dis;
		//pDisPar=disPar;
	}
	
	window.setTimeout(loop2, 100);
}

	
function loop2(){upt2();};

};