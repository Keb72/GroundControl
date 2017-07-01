var system = call2();

    	function call2(){
    		var system=[];
    		for (n = 1; n < 17; n = n+1){
    			url = "http://127.0.0.1:8085/telemachus/datalink?name=b.name["+ String(n) +"]&mu=b.o.gravParameter["+ String(n) +"]&pr=b.rotationPeriod["+ String(n) +"]";
    			$.getJSON(url, function(data, status){
    				system.push(data);
    				});
    		};
    		return system;
    	};
    	
//    	$(document).ready(function(){
//    		$("Button").click(function(){
//    	call2();
//		document.getElementById("demo").innerHTML=system[0].mu;
//		document.getElementById("demo2").innerHTML=465;
//    		});
//    	});