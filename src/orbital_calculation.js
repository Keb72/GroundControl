    		var system=[{name:0,mu:0,pr:0}];
    		var quality = "normal";
    		var map_type= "sat";
    		var nb_curve= 2
    		var calc_step = 5
    		var past_traj = 200
 

    		var p_body = "white";
    		var p_quality = "normal";
    		var p_map_type= "sat";


//			for (n = 0; n < 17; n = n+1){
//    			url = "http://"+resultip+"/telemachus/datalink?name=b.name["+ String(n) +"]&mu=b.o.gravParameter["+ String(n) +"]&pr=b.rotationPeriod["+ String(n) +"]";
//    			$.getJSON(url, function(data, status){
//    				system.push(data);
//    				});
//    		};
    		
    		var jqxhr = $.getJSON("http://"+resultip+"/telemachus/datalink?size=b.number[0]", function(data, status){
					sizeSys = data;
			})
				  jqxhr.done(function() {
					n=0;
					while (n<sizeSys.size){
		       			url = "http://"+resultip+"/telemachus/datalink?name=b.name["+ String(n) +"]&mu=b.o.gravParameter["+ String(n) +"]&pr=b.rotationPeriod["+ String(n) +"]";
		    			$.getJSON(url, function(data, status){
		    					system.push(data);
		    			})
	        		n++
					}
				  })

    		
    		var traj = [];

    	function write(){
    		
    		apis = ["a=o.sma",
    		        "e=o.eccentricity",
    		        "t=o.period",
    		        "i=o.inclination",
    		        "om=o.argumentOfPeriapsis",
    		        "lona=o.lan",
    		        "ttp0=o.timeToPe",
    		        "teta0=o.trueAnomaly",
    		        "lat0=v.lat",
    		        "lon0=v.long",
    		        "body=v.body",
    		        "pe=o.PeA",
    	   	        "ap=o.ApA",
    	   	        "pause=v.missionTime"];
    		var all=call3(apis);
    		
    		var sys_length = system.length;
    		var n = 0;
    		var b = 0;
    		
    		for (n=0;n<sys_length;n++){
    			if(system[n].name == all.body){
    				b=n;
    			}
    		}
    		
    		var ap=all.ap;
    		var pe=all.pe;
    		
    		var K = Math.PI/180;
    		//Parametre du corps
    		var mu = system[b].mu;
    		var Tb = system[b].pr;

    		//Parametres orbitaux
    		var a = all.a;
    		var e = all.e;
    		var T = all.t;
    		var i = all.i*K;
    		var om = all.om*K;
    		var lona = all.om*K;

    		//Conditions initiales
    		var ttp0 = all.ttp0;
    		var teta0 = all.teta0*K;
    		var lat0 = all.lat0*K;
    		var lon0 = all.lon0*K;
    		
    		//Pour graph seulement
    		var latd = all.lat0;
    		var lond = all.lon0;
    		while (lond<-180 || lond>180){
    			lond=Math.sign(lond)*-1*360+lond
    		}
    		
    		//Calcul heure sideral initiale
    		var t0 = T-ttp0;
    		var s = Math.cos(teta0+om);

    		var lonp = lon0;
    		var dl0 = null;
    		if(s>0){
    		dl0 = Math.asin((Math.sin(om+teta0)*Math.cos(i))/Math.cos(lat0));
    		}else{
    		dl0 = Math.PI - Math.asin((Math.sin(om+teta0)*Math.cos(i))/Math.cos(lat0));
    		};
    		var ig0 = lona+dl0-lon0;

    		var j = 0;

    		var paths=[];
    		var path=[];
    		//var K = 0;
    		//var ks = []
    		//for(u=0;u<10;u++){
    		//K += 10;
    		//ks.push(K);
    		//}
    		if(T/calc_step>5000){
    			calc_step = Math.round(T/2000);
    			document.getElementById("calc_step").value=calc_step;
    		};
    		
    		if(T/calc_step<100){
    			calc_step = Math.ceil(T/2000);
    			document.getElementById("calc_step").value=calc_step;
    		};
    		
    		for(ttp = ttp0+past_traj; ttp > ttp0-10*T; ttp = ttp - calc_step){
	    		j++;
	    		var t = T-ttp;
	    		var tg = t-t0;
	    		var dl = tg*2*Math.PI/Tb;
	    		var ig = ig0+dl;
	    		var omegas = lona-ig;
	    		var m = Math.sqrt(mu/Math.pow(a,3))*t;
	    		var b = m;
	    		var c = 0;
	    		var n = 0;
	    		var er = 10;
	
	    		while(er>0.00001){
		    		n++;
		    		c = (Math.sqrt(mu/Math.pow(a,3)))*t+(e*Math.sin(b));
		    		er = Math.abs(b-c);
		    		b = c;
	    		}
	
	    		var x = a*(Math.cos(b)-e);
	    		var y = a*Math.sqrt(1-Math.pow(e,2))*Math.sin(b);
	    		var z = 0;
	
	    		var xg = z*Math.sin(i)*Math.sin(omegas)
	    				+y*(-Math.cos(omegas)*Math.sin(om)-Math.cos(i)*Math.cos(om)*Math.sin(omegas))
	    				+x*(Math.cos(om)*Math.cos(omegas)-Math.cos(i)*Math.sin(om)*Math.sin(omegas));
	    		var yg = -z*Math.cos(omegas)*Math.sin(i)
	    				+x*(Math.cos(i)*Math.cos(omegas)*Math.sin(om)+Math.cos(om)*Math.sin(omegas))
	    				+y*(Math.cos(i)*Math.cos(om)*Math.cos(omegas)-Math.sin(om)*Math.sin(omegas));
	    		var zg = z*Math.cos(i)
	    				+y*Math.cos(om)*Math.sin(i)
	    				+x*Math.sin(i)*Math.sin(om);
	
	    		var lo = Math.atan(yg/xg)+(Math.PI/2)*(1-Math.sign(xg));
	    		if(lo>Math.PI){
		    		var lon = (lo-2*Math.PI)/K;
	    		}else{
		    		var lon = lo/K;
	    		};
	    		var la = Math.atan(zg/Math.sqrt(Math.pow(xg,2)+Math.pow(yg,2)));
	    		var lat = la/K;
	
	    		var coord = {x:lon,y:lat};
	    			    		
	    		if(lonp*lon<-8100){
	    			if(paths.length===nb_curve){
	    				break;
	    			}else{
		    		paths.push(path);
		    		path = [];
	    			}
	    		}
	    		
	    			
	    	path.push(coord);
	    	lonp = lon;
    		}
    		
    		paths.push(path);
    		
    		if (all.body===undefined){
    			body = "white"	
    		}else{
    			body=all.body
    		}
    		
    		if(body!=p_body||quality!=p_quality||map_type!=p_map_type){
    			var chemin="maps/"+quality+"/"+body+"_"+map_type+".png";
    			p_body=body;
    			p_quality=quality;
    			p_map_type=map_type;
        		map = document.getElementById("map");
        		map.src = chemin;    		
    		
    			var map = ["sat","slope","color","biome"]
    			
    			function check_map(type){
		    		$.ajax({
		    		    url:"maps/"+quality+"/"+body+"_"+type+".png",
		    		    error: function()
		    		    {
		    		    	document.getElementById(type).disabled = true;
//		    		    	console.log(type+" doesn't exist")
		    		    },
		    		    success: function()
		    		    {
		    		    	document.getElementById(type).disabled = false;
//		    		    	console.log(type+" exists")
		    		    }
		    		});
    			}
    			for (i=0;i<4;i++){
    				check_map(map[i]);
    			};
    		};
    		
    		if(lond<0){
    			var lonside = "W"
    		}else{
    			var lonside = "E"
    		}
    		var abslond = Math.abs(lond)
    		
    		var londeg = Math.round(abslond)
    		if (abslond-londeg<0){
    			londeg = Math.floor(abslond)
    		}
    		if(londeg<10){
    			londeg="00"+ londeg
    		}else{
    			if(londeg<100){
    				londeg="0"+londeg
    			}
    		}
    		var lonmin = Math.round((abslond-londeg)*60)
    		if(((abslond-londeg)*60)-lonmin<0 ){
    			lonmin = Math.floor((abslond-londeg)*60)
    		}
    		if(lonmin<10){
    			lonmin = "0"+lonmin
    		}
    		var lonsec = Math.round(((abslond-londeg)*60-lonmin)*60)
    		if(lonsec<10){
    			lonsec = "0"+lonsec
    		}
    		if(latd<0){
    			var latside = "S"
    		}else{
    			var latside = "N"
    		}
    		
    		var abslat = Math.abs(latd)
    		
    		var latdeg = Math.round(abslat)
    		if (abslat-latdeg<0){
    			latdeg = Math.floor(abslat)
    		}
    		if(latdeg<10){
    			latdeg="00"+ latdeg
    		}else{
    			if(latdeg<100){
    				latdeg="0"+latdeg
    			}
    		}
    		var latmin = Math.round((abslat-latdeg)*60)
    		if(((abslat-latdeg)*60)-latmin<0 ){
    			latmin = Math.floor((abslat-latdeg)*60)
    		}
    		if(latmin<10){
    			latmin = "0"+latmin
    		}
    		var latsec = Math.round(((abslat-latdeg)*60-latmin)*60)
    		if(latsec<10){
    			latsec = "0"+latsec
    		}
    		
    		document.getElementById("hud1n").innerHTML="LONGITUDE: ";
    		document.getElementById("hud2n").innerHTML="LATITUDE: ";
    		document.getElementById("hud3n").innerHTML="APOAPSIS: ";
    		document.getElementById("hud4n").innerHTML="PERIAPSIS: ";
    		document.getElementById("hud5n").innerHTML="INCLINATION: ";
    		document.getElementById("hud6n").innerHTML="ECCENTRICITY: ";
    		
    		document.getElementById("hud1v").innerHTML=londeg+'&deg'+lonmin+"'"+lonsec+'"'+lonside;
    		document.getElementById("hud2v").innerHTML=latdeg+"&deg"+latmin+"'"+latsec+'"'+latside;
    		document.getElementById("hud3v").innerHTML=Math.round(ap)+" m";
    		document.getElementById("hud4v").innerHTML=Math.round(pe)+" m";
    		document.getElementById("hud5v").innerHTML=Math.round(i/K*100)/100+"&deg";
    		document.getElementById("hud6v").innerHTML=Math.round(e*1000)/1000;
    		
    		
    		
    		var pos = all.pe*all.ap;
    		if (all.pause==0||pos>0){
    			traj=[]
    		}else{
    			traj.push({x:lond,y:latd})
    		}
    		traj.push({x:lond,y:latd})
    		return [paths,lond,latd,pos,traj]; 		

    	};



