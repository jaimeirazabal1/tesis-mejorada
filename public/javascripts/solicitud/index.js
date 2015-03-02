$(document).ready(function(){
	//var socket = io('http://172.16.60.50:3000');
	// var socket = io('http://192.168.1.101:3000');
	var socket = io('http://localhost:3000');
	socket.on('cambiar_status_solicitud',function(obj){
		var id_ = obj.id.id
		este = $("#"+id_);
		valor = este.val();
		if (valor == "Desactivar") {
			este.removeClass("btn-success")
			este.addClass("btn-danger")
			este.val("Activar")
			//socket.emit('cambiar_status_solicitud',{id:id});
		}else{
			este.addClass("btn-success")
			este.removeClass("btn-danger")
			este.val("Desactivar")
			//socket.emit('cambiar_status_solicitud',{id:id});
		}
	});

	socket.on("nueva_solicitud",function(datos){
		// console.log(datos);
		if (datos.activo) {
			var boton = '<input type="button" id="'+datos.id+'" class="solicitud_activacion btn btn-success btn-xs" value="Desactivar">';
		}else{
			var boton = '<input type="button" id="'+datos.id+'" class="solicitud_activacion btn btn-danger btn-xs" value="Activar">';
		}
		$("#cuerpo_tabla").append("<tr>"+
									  "<td>"+datos.prioridad_id+"</td>"+
									  "<td>"+datos.descripcion+"</td>"+
									  "<td>"+datos.fecha+"</td>"+
									  "<td>"+datos.usuario_id.split('@')[0]+"</td>"+
									  "<td>"+boton+"</td>"+
									  "<td>"+datos.solicitante+"</td>"+
									  "<td>"+datos.telefono_solicitante+"</td>"+
									  "<td>"+datos.ubicacion+"</td>"+
								  "<tr>")
	})

	$(document).on("click",".solicitud_activacion",function(){
		$(document).off("click",".solicitud_activacion",function(){})
		var id = $(this).attr("id")
		var este = $(this);
		// console.log(id)
		$.ajax({
			url:"/solicitud/cambiarstatus/"+id,
			success:function(r){
				if (r.error) {
					alert("Ocurrio un error")
				}else{
					valor = este.val();
					if (valor == "Desactivar") {
						este.removeClass("btn-success")
						este.addClass("btn-danger")
						este.val("Activar")
						socket.emit('cambiar_status_solicitud',{id:id});
					}else{
						este.addClass("btn-success")
						este.removeClass("btn-danger")
						este.val("Desactivar")
						socket.emit('cambiar_status_solicitud',{id:id});
					}
				}
			}
		})
		return false;
	})
})