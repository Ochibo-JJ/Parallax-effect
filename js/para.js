/*var parallaxContainer = document.getElementById('parallaxContainer');
for (var i = 0;i < 0; i++) {
	//create a new element with parallax-item className
	var item = document.createElement('div');
	item.className = 'leaf';
	
	//create a new leaf for inside element with leaf className
	var leaf = document.createElement('div');
	item.className = 'leaf';
	item.appendChild(leaf);
	//add element container
	parallaxContainer.appendChild(item);
	//random width,height,depth,rotation,background-image
	//adjust blur on depth
}*/


 Project practice
//html setup
var itemsHTMLCollection = document.getElementsByClassName('parallax-item');
var itemsArray = Array.from(itemsHTMLCollection);
// console.log('pupilsArray',pupilsArray)

//input setup
var input = {
	mouseX: {
		start: 0,
		end: window.innerWidth,
		current: 0,
	},
	mouseY: {
		start: 0,
		end: window.innerHeight,
		current: 0,
	}
};

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

//output setup
var output = {
	x: {
		start: -100,
		end: 100,
		current: 0,
	},
	y: {
		start: -100,
		end: 100,
		current: 0,
	},
	zIndex: {
		range: 10000
	},
	scale: {
		start: 1,
		end: 0,
	},
	blur: {
		startingDepth: 0.5,
		end: 20,
	},
}
output.blur.range = output.blur.end - output.blur.start;
output.scale.range = output.scale.end - output.scale.start;
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;


var mouse = {
	x: window.innerWidth * .5,
	y: window.innerHeight * .5,
}
 
var updateInputs = function () {
	//mouseX
	input.mouseX.current = mouse.x;
	input.mouseX.fraction= (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
	//mouseY
	input.mouseY.current = mouse.y;
	input.mouseY.fraction= (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
}

var updateOutputs = function () {
	//output x and y
		output.x.current = output.x.start + (input.mouseX.fraction * output.x.range);
		output.y.current = output.y.start + (input.mouseY.fraction * output.y.range);
}

var updateEachParallaxItem = function () {
	//APPLY OUTPUT TO HTML
	itemsArray.forEach(function (item, k) {
		var depth = parseFloat(item.dataset.depth, 10);
		var itemOutput = {
			x: output.x.current - (output.x.current * depth),
			y: output.y.current - (output.y.current * depth),
			zIndex: output.zIndex.range - (output.zIndex.range * depth),
			scale: output.scale.start + (output.scale.range * depth),
			blur: (depth - output.blur.startingDepth) * output.blur.range,
		};
		//console.log(k ,'depth' ,depth)
		item.style.filter = 'blur('+itemOutput.blur+'px)'
		item.style.zIndex = itemOutput.zIndex;
	    item.style.transform='scale('+itemOutput.scale+') translate('+itemOutput.x+'px,'+itemOutput.y+'px)';
	});
}

var handleMouseMove = function (event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	updateInputs();
	updateOutputs();
	updateEachParallaxItem();		
}

//[1]makes sure the fraction value is between 0 and 1 whenever you resize the window page
var handleResize = function () {
	//mouseX
	input.mouseX.end = window.innerWidth;
	input.mouseX.range = input.mouseX.end - input.mouseX.start;

	//mouseY
	input.mouseY.end = window.innerHeight;
	input.mouseY.range = input.mouseY.end - input.mouseY.start;
}
//[2]
window.addEventListener('mousemove', handleMouseMove)
//[1]
window.addEventListener('resize', handleResize)

updateInputs();
updateOutputs();
updateEachParallaxItem();