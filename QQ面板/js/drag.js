function getByClass(clsName, parent) {
	var oParent = parent ? document.getElementById(parent) : document,
		eles = [],
		elements = oParent.getElementsByTagName('*');

	for (var i = 0; i < elements.length; i++) {
		if (elements[i].className == clsName) {
			eles.push(elements[i]);
		}
	}
	return eles;
}

window.onload = drag;
function drag() {
	var oTitle = getByClass('login_logo_webqq', 'loginPanel')[0];
	//拖曳
	oTitle.onmousedown = fndown;
	//关闭
	var oClose = document.getElementById('ui_boxyClose');
	oClose.onclick = function(){
		document.getElementById('loginPanel').style.display = 'none';
	}
}

function fndown() {
	event = event || window.event;
	var oDrag = document.getElementById('loginPanel');
	//光标按下时 光标和面板之间的距离
	var disX = event.clientX - oDrag.offsetLeft;
	var disY = event.clientY - oDrag.offsetTop;
	//移动
	document.onmousemove = function (event) {
		event = event || window.event;
		fnMove(event, disX, disY);
	}
	//释放鼠标
	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseup = null;
	}
}

function fnMove(e, posX, posY) {
	var oDrag = document.getElementById('loginPanel');
	var winW = document.documentElement.clientWidth||document.body.clientWidth;
	var winH = document.documentElement.clientHeight||document.body.clientHeight;
	var maxW = winW-oDrag.offsetWidth;
	var maxH = winH-oDrag.offsetHeight;
	var l = e.clientX - posX;
	var t = e.clientY - posY;
	if(l<0){
		l=0;
	}else if(l>maxW){
		l=maxW;
	}
	if(t<0){
		t=0
	}else if(t>maxH){
		t=maxH;
	}
	oDrag.style.left = l + 'px';
	oDrag.style.top = t + 'px';
}
