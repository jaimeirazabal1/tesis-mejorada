$(document).ready(function(){
    //var socket = io('http://172.16.60.50:3000');
    // var socket = io('http://192.168.1.101:3000');
    var socket = io('http://localhost:3000');
    $('#datetimepicker1').datetimepicker({
    	format : 'DD-MM-YYYY HH:mm'
    });
    $(document).on("submit","form",function(){
    	$(document).off("submit","form",function(){})
    	var data = $(this).serialize();
    	$.ajax({
            async:false,
    		type:"POST",
    		url:"/solicitud/nueva",
    		data:data,
    		success:function(r){
    			if (r.correcto) {
                    console.log(r.datos)
    				socket.emit('nueva_solicitud',r.datos);
    			}else{
    				alert("Ocurrio un error")
    				console.log(r.error);
    			}
    		}
    	});
    	return false;
    });
})
