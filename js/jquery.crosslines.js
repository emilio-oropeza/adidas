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
			methods:{
				init:function(){
					componentObj.ctx = document.getElementById("lineas").getContext("2d");
					componentObj.ctx.texture = document.getElementById("indepth_texture");
					componentObj.pattern = componentObj.ctx.createPattern(componentObj.ctx.texture, "repeat");
					componentObj.methods.random();
					componentObj.methods.resize_canvas();
					$(window).resize(function(){
						componentObj.methods.resize_canvas();
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
							var x1 = $(ui.draggable).attr("pos");
							var x2 = $(this).attr("pos");
							componentObj.methods.dibujarLinea(componentObj.posiciones[x1], componentObj.posiciones[x2]);
							$(this).removeClass("over");
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
						jugadores[i].setPosJ((pos1-1));
						jugadores[i].setPosO((pos2-1));
					}
					componentObj.methods.muestra_jugadores();				
				},
				muestra_jugadores:function(){
					for (var i = 0; i < jugadores.length; i++) {
						var indexJ = jugadores[i].getPosJ();
						var indexO = jugadores[i].getPosO();
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
						$(foto).css({
							"background-image": 'url("images/jugadores/'+jugadores[i].getImg()+'.jpg")'
						})
						$('<span class="nombre">'+jugadores[i].getNombre()+'</span>').appendTo(divJ);
						$('<span class="nombre">'+jugadores[i].getOrigen()+'</span>').appendTo(divO);
						$(divJ).attr("pos",jugadores[i].getPosJ());
						$(divO).attr("pos",jugadores[i].getPosO());
					}
				},
				dibujarLinea: function(y1,y2){
					componentObj.ctx.beginPath();
					componentObj.ctx.moveTo(0,y1);
					componentObj.ctx.lineTo(componentObj.canvas_width,y2)
				    componentObj.ctx.lineWidth = 10;
					componentObj.ctx.strokeStyle = componentObj.pattern;
				    componentObj.ctx.stroke();
					componentObj.ctx.closePath();
				},
				resize_canvas:function(){
					componentObj.canvas_width = $("#indepth_lineas").width();
					componentObj.canvas_height = $("#indepth_lineas").height();
					$("#lineas").attr("width",componentObj.canvas_width);
					$("#lineas").attr("height",componentObj.canvas_height);
					$(".indepth_con_jugadores").each(function(){
						$(this).width(componentObj.canvas_width);
					});
					$(".indepth_con_equipos").each(function(){
						$(this).width(componentObj.canvas_width);
					});
				},
				dibujarGrid: function(){
					var ancho = $(target).find("#lineas").width();
					var alto = $(target).find("#lineas").height();
					var linea;
					var anchoLinea = 50;
					var limiteX = ancho / anchoLinea;
					var limiteY = alto / anchoLinea;
					componentObj.ctx.strokeStyle = "#000";
					for (var linea = 0; linea <= limiteX; linea++) {
						componentObj.ctx.beginPath();		
						componentObj.ctx.moveTo(linea * anchoLinea, 0);
						componentObj.ctx.lineTo(linea * anchoLinea, alto);
						componentObj.ctx.stroke();
						componentObj.ctx.closePath();
					};
					for (var linea = 0; linea <= limiteY; linea++) {
						componentObj.ctx.beginPath();
						componentObj.ctx.strokeStyle = "#000";
						componentObj.ctx.moveTo(0, linea * anchoLinea);
						componentObj.ctx.lineTo(ancho, linea * anchoLinea);
						componentObj.ctx.stroke();
						componentObj.ctx.closePath();
					};
				}
			}
		};
		return componentObj;
	};	
})(jQuery);
$(document).ready(function(){
	$("#indepth_concurso").crosslines();
});



