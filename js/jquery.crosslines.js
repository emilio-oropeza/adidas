(function($){
	$.fn.crosslines = function(options){
		return this.each(function() {
			var element = $(this);						
			if (element.data('crosslines')) return;
			var myplugin = new Crosslines(this);
			element.data('crosslines', myplugin);
			element.data('crosslines').methods.init();
			
		});
	};
	
	var Crosslines = function(target, options ){
		var componentObj = {
			ctx:null,
			texture:null,
			pattern: null,
			posiciones:[20,80,140,200,260,320,380],
			canvas_width: null,
			canvas_height: null,
			res: [],
			scala: 1,
			methods:{
				init:function(){
					componentObj.ctx = document.getElementById("lineas").getContext("2d");
					componentObj.ctx.texture = document.getElementById("indepth_texture");
					componentObj.pattern = componentObj.ctx.createPattern(componentObj.ctx.texture, "repeat");
					componentObj.methods.random();
					componentObj.methods.resize_canvas();
					componentObj.methods.obtenerScala();
					$(window).resize(function(){
						componentObj.methods.resize_canvas();
						componentObj.methods.redibujar();
					});
					$(".indepth_con_jugadores").draggable({
						revert: true,
						disabled: false,
						start: function(){
							$(this).addClass("select");
						},
						stop:function(){
							$(this).removeClass("select");
						}
					})
					$(".indepth_con_equipos").droppable({
						disabled: false,
						drop: function(e, ui) {
							$( this ).droppable( "option", "disabled", true );
							$(ui.draggable).draggable( "option", "disabled", true);
							$(this).removeClass("over");
							componentObj.res.push([ui.draggable, this]);
							componentObj.methods.resize_canvas();
							componentObj.methods.redibujar();
							//componentObj.methods.redibujar();
							componentObj.methods.validar();
						},
						over: function(){
							$(this).addClass("over");
						},
						out: function(){
							$(this).removeClass("over");
						}
					});	
				},
				random: function(){
					var arr1 = [1,2,3,4,5,6,7];
					var arr2 = [1,2,3,4,5,6,7];
					for (var i = 0; i < jugadores.length; i++) {
						var flag1 = false;
						var flag2 = false;
						var pos1;
						var pos2;
						while(!flag1){
							var random = Math.floor(Math.random() * 7);
							if(arr1[random] != null){
								pos1 = arr1[random];
								arr1[random] = null;
								flag1 = true;
							}
						}
						while(!flag2){
							var random = Math.floor(Math.random() * 7);
							if(arr2[random] != null){
								pos2 = arr2[random];
								arr2[random] = null;
								flag2 = true;
							}
						}
						jugadores[i].pos_jugador = (pos1-1);
						jugadores[i].pos_origen = (pos2-1);
					}
					componentObj.methods.muestra_jugadores();				
				},
				muestra_jugadores:function(){
					for (var i = 0; i < jugadores.length; i++) {
						var indexJ = jugadores[i].pos_jugador;
						var indexO = jugadores[i].pos_origen;
						var divJ = null;
						var divO = null;
						$(".indepth_con_jugadores").each(function(x, val){
							if(indexJ == x){
								divJ = $(this);
							}
						});
						$(".indepth_con_equipos").each(function(x, val){
							if(indexO == x){
								divO = $(this);
							}
						});
						var foto = $('<span class="foto"></span>').appendTo(divJ);
						var foto2 = $('<span class="foto"></span>').appendTo(divO);
						$(foto).css({
							"background-image": 'url("images/jugadores/'+jugadores[i].img+'.jpg")'
						})
						$(foto2).css({
							"background-image": 'url("images/equipos/'+jugadores[i].imgo+'.png")'
						})
						$('<span class="nombre">'+jugadores[i].nombre+'</span>').appendTo(divJ);
						$('<span class="nombre_movil">'+jugadores[i].nombreMovil+'</span>').appendTo(divJ);
						$('<span class="nombre">'+jugadores[i].origen+'</span>').appendTo(divO);
						$('<span class="nombre_movil">'+jugadores[i].origenMovil+'</span>').appendTo(divO);
						$(divJ).attr("pos",jugadores[i].pos_jugador);
						$(divO).attr("pos",jugadores[i].pos_origen);
					}
				},
				dibujarLinea: function(y1,y2){
					componentObj.ctx.beginPath();
					componentObj.ctx.moveTo(0,y1);
					componentObj.ctx.lineTo(300,y2)
				    componentObj.ctx.lineWidth = 10;
					componentObj.ctx.strokeStyle = componentObj.pattern;
				    componentObj.ctx.stroke();
				    componentObj.ctx.closePath();
				},
				resize_canvas:function(){
					$("#indepth_resultado").height($("#indepth_concurso").height());
					componentObj.methods.obtenerScala();
					componentObj.canvas_width = $("#indepth_lineas").width();
					componentObj.canvas_height = $("#indepth_lineas").height();
					$("#lineas").attr("width",componentObj.canvas_width);
					$("#lineas").attr("height",componentObj.canvas_height);
					$(".indepth_con_jugadores").each(function(){
						if($(window).width() >= 600){
							$(this).width(componentObj.canvas_width);
						}else if($(window).width() >= 500 && $(window).width() < 600){
							$(this).width(200);
						}else{
							$(this).width(120);
						}
					});
					$(".indepth_con_equipos").each(function(){
						if($(window).width() >= 600){
							$(this).width(componentObj.canvas_width);
						}else if($(window).width() > 500 && $(window).width() < 600){
							$(this).width(200);
						}else{
							$(this).width(120);
						}
					});
				},
				dibujar: function(){
					componentObj.ctx.clearRect(0, 0, 300, 400);
					for (var i = 0; i < componentObj.res.length; i++) {						
						var x1 = $(componentObj.res[i][0]).attr("pos");
						var x2 = $(componentObj.res[i][1]).attr("pos");
						componentObj.methods.dibujarLinea(componentObj.posiciones[x1], componentObj.posiciones[x2]);
					}
				},
				redibujar: function(){					
					componentObj.ctx.width = 300 * componentObj.scala;
					componentObj.ctx.scale(componentObj.scala, 1);
					componentObj.methods.dibujar();
					componentObj.ctx.scale(-componentObj.scala, 1);
				},
				obtenerScala: function(){
					if($(window).width() >= 900 ){
						componentObj.scala = 1;
					}else if($(window).width() >= 600 && $(window).width() < 900 ){
						componentObj.scala = 200/300;
					}else if($(window).width() >= 500 && $(window).width() < 600 ){
						componentObj.scala = 100/300;
					}else{
						componentObj.scala = 80/300;
					}
				},
				validar: function(){
					var contador = 0;
					if(componentObj.res.length == 7){						
						for (var i = 0; i <  componentObj.res.length; i++) {
							var pregunta = componentObj.res[i][0];
							var respuesta = componentObj.res[i][1];
							var nombre = $(pregunta).find(".nombre").text();
							var origen = $(respuesta).find(".nombre").text();
							for (var j = 0; j < jugadores.length; j++) {
								if(jugadores[j].nombre === nombre){
									if(jugadores[j].valido(nombre, origen)){
										contador++;
									}
								}
							}
						}						
						componentObj.methods.display_res(contador);
					}	
				},
				display_res: function(res){
					var s = (res == 1)?'':'s';
					var msg = "https://twitter.com/intent/tweet?via=Juanfutbol&text=¡Acerté "+res+
					" de 7! Ahí va mi pronóstico del Málaga-Real Madrid para ganar unos adidas&hashtags=ACE16,BeTheDifference,JuanACE16"
					var text = "javascript:sharePopUp('tw', '"+encodeURIComponent(msg)+"');"
					$("#share_tw").attr("href",text);
					$("#indepth_concurso").fadeOut("slow");
					$("#indepth_resultado").fadeIn("slow");
					$("#inpdeth_score").find("span").text("0"+res);
				}
			}
		};
		return componentObj;
	};	
})(jQuery);
$(document).ready(function(){
	$("#indepth_concurso").crosslines();
});