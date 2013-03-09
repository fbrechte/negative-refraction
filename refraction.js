//**** Negative Refraction of Light Rays *******
//**********************************************

var d0=1.5, d2=1.0, d3=2.0;
var n1=1, n3=1;
var nRays=15;
var n2=-1.2;
var d1=0.5;

var y1 = new Array(nRays+1);
var y2 = new Array(nRays+1);
var y3 = new Array(nRays+1);
y1[0]=0, y2[0]=0, y3[0]=0;

var canvas;
var ctx;

function init0(){
	initCanvas();
	//makeNewDrawing(); 

	window.onresize=initCanvas;
	
	// init sliders
	$('#slider-n2').bind('slidestop', function(e){
		n2 = $('#slider-n2').val();
		//console.log(n2);
		makeNewDrawing();
	});
	$('#slider-d1').bind( 'slidestop', function(e) { 
		d1 = $('#slider-d1').val();
		//console.log(d1);
		makeNewDrawing();
	});
	$('#slider-nRays').bind( 'slidestop', function(e) { 
		nRays = $('#slider-nRays').val();
		//console.log(d1);
		makeNewDrawing();
	});
	$('#slider-n2').val(n2);
	$('#slider-n2').slider('refresh');
	$('#slider-d1').val(d1);
	$('#slider-d1').slider('refresh');
	$('#slider-nRays').val(nRays);
	$('#slider-nRays').slider('refresh');
}

function initCanvas(){
	canvas = document.getElementById('canvas');
	var windowWidth=window.innerWidth;
	canvas.width=0.9*windowWidth;
	var windowHeight=window.innerHeight;
	var h1 = document.getElementById("header").offsetHeight;
	var h2 = document.getElementById("slider-group").offsetHeight;
	canvas.height = Math.max(0.8*windowHeight-h1-h2, 150);
	
	ctx = canvas.getContext('2d');
	ctx.save();
	
	makeNewDrawing(); 
}

function makeNewDrawing(){
	calc();
	draw();
};

function calc(){
	var phiMax=0.43*Math.PI;
	var dphi=phiMax/nRays;
	var phi1, phi2, phi3;
	for (var i = 1; i <= nRays; i++) {
		//console.log(i);
		phi1=i*dphi;
		y1[i] = d1*Math.tan(phi1);
		phi2=Math.asin((n1/n2)*Math.sin(phi1));
		y2[i] = y1[i] + d2*Math.tan(phi2);
		phi3 =Math.asin((n2/n3)*Math.sin(phi2));
		y3[i] = y2[i] + d3*Math.tan(phi3);
	}
}
		
function draw(){
	/*var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d'); */

	var w = canvas.width;
	var h = canvas.height;
	var scal = w/(d0+d2+d3);
	var rSource=5;
	var x0=-d1;
	var x1=0;
	var x2=d2;
	var x3=d2+d3;
	
	// get default canvas state and keep it saved
	ctx.restore();
	ctx.save();
	
	// background
	ctx.fillStyle="black";
	ctx.fillRect(0,0,w,h);
	
	// plate
	ctx.translate(scal*d0,0);
	ctx.fillStyle="blue";
	ctx.fillRect(0,0,scal*d2,h);
	
	// description
	ctx.font = "12px Times New Roman";
	ctx.fillStyle="white";
	ctx.textAlign="center";
	ctx.textBaseline ="top";
	ctx.fillText("Air",-scal*d0/2,0);
	ctx.fillText("Air",scal*(d2+d3/2),0);
	ctx.fillText("Plate n=" + n2,scal*d2/2,0);
	
	// source
	ctx.translate(0,h/2);
	ctx.fillStyle="yellow";
	ctx.beginPath();
	ctx.arc(-scal*d1,0,rSource,0,2*Math.PI,true);
	ctx.fill();	
	ctx.font = "12px Times New Roman";
	ctx.fillStyle="white";
	ctx.textAlign="right";
	ctx.textBaseline ="alphabetic";
	ctx.fillText("S",-scal*d1-rSource,-rSource);
	
	// rays
	ctx.scale(scal,scal);
	ctx.lineWidth = ctx.lineWidth/scal;
	ctx.strokeStyle="yellow";
	ctx.beginPath();
	ctx.moveTo(x0,0);
	ctx.lineTo(x3,0);
	ctx.stroke();
	for (var i = 1; i <= nRays; i++) {
		ctx.beginPath();
		ctx.moveTo(x0,0);
		ctx.lineTo(x1,y1[i]);
		ctx.lineTo(x2,y2[i]);
		ctx.lineTo(x3,y3[i]);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x0,0);
		ctx.lineTo(x1,-y1[i]);
		ctx.lineTo(x2,-y2[i]);
		ctx.lineTo(x3,-y3[i]);
		ctx.stroke();
	} 
}
		