$(document).ready(function(){
	$("body").on("click","#btn_crear_usuario",function(){
		$("body").off("click","#btn_crear_usuario",function(){})
		var data = $("#form_nuevo_usuario").serialize();
		$.ajax({
			url:"/users/crear",
			type:"POST",
			data:data,
			dataType:"json",
			success:function(r){
				if (r.respuesta) {
					$(".modal-title").append("<div class='alert alert-success'>Usuario Creado "+
											"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
  												"<span aria-hidden=\"true\">&times;</span>"+
											"</button></div>");
					llenarTabla(r);
				}else{
					$(".modal-title").append("<div class='alert alert-danger'>"+r.mensaje+" "+
											"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
  												"<span aria-hidden=\"true\">&times;</span>"+
											"</button></div>");
				}
				console.log(r)
			}
		})
	})
	$("body").on("click",".eliminar_usuario",function(){
		$("body").off("click",".eliminar_usuario",function(){})
		var este = $(this);
		var id = $(this).attr("id");
		if (confirm("Esta seguro?")) {

			$.ajax({
				url:"/users/eliminar/"+id,
				dataType:"json",
				success:function(r){
					if (r.respuesta) {
						este.parent().parent().parent().remove();
					}else{
						alert("Ocurrio un Error");
					}
				}
			})
		};
	})
	$("body").on("click","#btn_cambio_clave",function(){
		$("body").off("click","#btn_cambio_clave",function(){})
		if (confirm("Esta seguro?")) {
			var data = $("#form_cambio_clave").serialize();
			var id = $(this).attr("ide");
			$.ajax({
				url:"/users/cambioclave/"+id,
				type:"post",
				data:data,
				dataType:"json",
				success:function(r){
					if (r.respuesta) {
						$(".modal-title").append("<div class='alert alert-success'>Clave Cambiada "+
											"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
  												"<span aria-hidden=\"true\">&times;</span>"+
											"</button></div>");
					}else{
						alert("Ocurrio un Error")
					}
				}
			})
		};
	})
	$("body").on("click",".cambiar_password",function(){
		$("body").off("click",".cambiar_password",function(){})
		var id = $(this).attr("id");
		$("#btn_cambio_clave").attr("ide",id)
	})
	// var socket = io('http://172.16.60.50:3000');
	var socket = io('http://localhost:3000');
	socket.emit('login',{login:true});
	
	socket.on('toClient', function (msg) {
		console.log(msg)
		$(".consola").append(msg+"<br>")
	});
	socket.on("visitantes", function (msg){
		console.log("Nuevo registro en visitantes : "+new Date()+" -> "+msg)
		$(".consola").append(msg+"<br>")
	})
	socket.on('usuarios', function (msg) {
		console.log(msg)
		$(".consola").append(msg+"<br>")
	});
	/*functions*/
	function llenarTabla(r){
		$("tbody").html("")
		for (var i = 0 ; i < r.usuarios.length; i++) {
			$("tbody").append("<tr>"+
								"<td>"+r.usuarios[i].id+"</td>"+
								"<td>"+r.usuarios[i].correo+"</td>"+
								"<td>"+r.usuarios[i].created+"</td>"+
								"<td>"+
									"<div class=\"btn-group btn-group-xs\" role=\"group\" aria-label=\"Extra-small button group\">"+
					    				"<button class=\"btn btn-danger btn-xs eliminar_usuario\" id=\""+r.usuarios[i].id+"\">Eliminar</button>"+
					    				"<button class=\"btn btn-default btn-xs cambiar_password\" id=\""+r.usuarios[i].id+"\">Cambiar Clave</button>"+
					    			"</div>"+
								"</td>"+
							"</tr>");
		};
	}
})