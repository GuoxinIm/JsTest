function getByClass(clsName,parent){
	var oParent = parent?document.getElementById(parent):document,
	eles[],
	elements = oParent.getElementsTagName('*');

	for(var i=0;i<elements.length;i++){
		if(elements[i].className==clsName){
			eles.push(elements[i]);
		}
	}
	return eles;
}

window.onload=drag;
function drag(){
	var oTitle = getByClass('login_logo_webqq','loginPanel')[0];
	//拖曳
	oTitle.onmousedown=fndown;
}

function fndown(){
	event = event||window.event;
	var oDrag = document.getElementById('loginPanel');
	//光标按下时 光标和面板之间的距离
	var disX = event.clientX-oDrag.offsetLeft;
	var disY = event.clientY-oDrag.offsetTop;
	//移动
	document.onmousedown = function(event){
		event = event||window.event;
		fnMove(event,disX,disY);
	}
}

function fnMove(e,posX,posY){
	
}
