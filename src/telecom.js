all={};
    	

    	function call3(api){
    		var l = api.length;
    		var url = "http://"+resultip+"/telemachus/datalink?";
    		var par = api[0];
    		for (n=1;n<l;n++){
    			par = par.concat("&",api[n]);    			
    		}
    		url = url.concat(par);
     		$.getJSON(url, function(data, status){all=data;});
    		return all;
    	}
