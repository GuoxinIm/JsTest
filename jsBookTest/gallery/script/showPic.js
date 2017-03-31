/**
 * 设置占位符图标路径 得到即时显示效果
 * 
 * @param {any} whichpic 
 * @returns 
 */
function showPic(whichpic) {
	if(!document.getElementById("placeholder")) {
		return true;
	}
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
	if(!document.getElementById("description")) {
		return false;
	}
	if(whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");
	} else {
		var text = "";
	}
	var description = document.getElementById("description");
	if(description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = text;
	}
	return false;
}

/**
 * 点击事件 遍历每个链接 点击调用showPic
 * 
 * @returns 
 */
function prepareGallery() {
	if(!document.getElementsByTagName) {
		return false;
	}
	if(!document.getElementById) {
		return false;
	}
	if(!document.getElementById("imagegallery")) {
		return false;
	}
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this);
		}
		links[i].onkeypress = links[i].onclick;
	}
}

/**
 * 创建img和p的元素节点 插入到图片库清单后面
 * 
 * @returns 
 */
function preparePlaceholder(){
	if(!document.createElement){
		return false;
	}
	if(!document.createTextNode){
		return false;
	}
	if(!document.getElementById){
		return false;
	}
	if(!document.getElementById("imagegallery")){
		return false;
	}
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
}

/**
 * 相当于 window.onload
 * 
 * @param {function} func 
 */
function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);

/**
 * 把节点插入到另一节点之后
 * 
 * @param {any} newElement 新节点
 * @param {any} targetElement 目标节点
 */
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSbiling);
	}
}