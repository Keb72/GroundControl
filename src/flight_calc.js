    	function flight(){
    		
    		apis = ["alt=v.altitude",
    		        "ht=v.heightFromTerrain",
    		        "th=v.terrainHeight",
    		        "mt=v.missionTime",
    		        "v=v.surfaceSpeed",
    		        "pe=o.PeA",
    	   	        "ap=o.ApA",
    	   	        "vsp=v.verticalSpeed",
    	   	        "g=v.geeForce"];
    		var all=call3(apis);
    		
    		var alt=all.alt;
    		var th=all.th;
    		var mt=all.mt;
    		var v=all.v;
    		var ht=all.ht;
    		var sp=all.sp;
    		var vsp=all.vsp;
    		var g=all.g;
    		var ap=all.ap;
    		var sp=Math.sqrt(Math.pow(v,2)+Math.pow(vsp,2))
    		
    		var aht = alt-th
    		
    		if (aht<0||aht>alt){
    			aht=alt
    		};
    		
    		document.getElementById("hud1n").innerHTML="Altitude:";
    		document.getElementById("hud2n").innerHTML="Terrain:";
    		document.getElementById("hud3n").innerHTML="Speed:";
    		document.getElementById("hud4n").innerHTML="Vertical Speed:";
    		document.getElementById("hud5n").innerHTML="G-force:";
    		document.getElementById("hud6n").innerHTML="Apoapsis:";
    		
    		document.getElementById("hud1v").innerHTML=Math.round(alt)+" m";
    		document.getElementById("hud2v").innerHTML=Math.round(aht)+" m";
    		document.getElementById("hud3v").innerHTML=Math.round(sp)+" m/s";
    		document.getElementById("hud4v").innerHTML=Math.round(vsp*100)/100+" m/s";
    		document.getElementById("hud5v").innerHTML=Math.round(g*100)/100+" g";
    		document.getElementById("hud6v").innerHTML=Math.round(ap)+" m";
    		
    		map = document.getElementById("map");
    		map.src = "maps/white.png"
    		var pos = all.pe*all.ap;
    		return [alt,th,mt,v,ht,pos,sp]; 		

    	};



