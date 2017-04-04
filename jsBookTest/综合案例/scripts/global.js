
/**
 * 等同于window.onload=xxxxx
 * 
 * @param {function} func 
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

/**
 * 与insertBefore方法对应
 * 在目标节点之后插入新节点
 * @param {新节点} newElement 
 * @param {目标节点} targetElement 
 */
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}


/**
 * 添加一个类名
 * 
 * @param {为谁添加} element 
 * @param {类名} value 
 */
function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

/**
 * 为匹配的URL链接添加class属性
 * 
 * @param {any} href 
 * @returns 
 */
function highlightPage(href) {
    if (!document.getElementById || !document.getElementsByTagName) {
        return false;
    }
    var headers = document.getElementsByTagName('header');
    if (headers.length == 0) {
        return false;
    }
    var navs = document.getElementsByTagName('nav')
    if (navs.length == 0) {
        return false;
    }
    var links = navs[0].getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var linkurl;
        for (var i = 0; i < links.length; i++) {
            linkurl = links[i].getAttribute('href');
            if (window.location.href.indexOf(linkurl) != -1) {
                links[i].className = "here";
                var linktext = links[i].lastChild.nodeValue.toLowerCase();
                document.body.setAttribute("id", linktext);
            }
        }
    }
}
addLoadEvent(highlightPage)

/**
 * 添加动画效果 
 * 
 * @param {string} elementID 
 * @param {num} final_x 
 * @param {num} final_y 
 * @param {num} interval 
 * @returns 
 */
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById || !document.getElementById(elementID)) {
        return false;
    }
    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var dist = 0;
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        dist = Math.ceil((final_x - xpos) / 10)
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        dist = Math.ceil((xpos - final_x) / 10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil((final_y - ypos) / 10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        dist = Math.ceil((ypos - final_y) / 10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + 'px';
    elem.style.ypos = ypos + 'px';
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")"
    elem.movement = setTimeout(repeat, interval);
}

function prepareSlideshow() {
    //确保浏览器支持DOM方法
    if (!document.getElementById || !document.getElementsByTagName) {
        return false;
    }
    if (!document.getElementById("intro")) {
        return false;
    }
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);
    var links = intro.getElementsByTagName("a");
    var destination;
    for (var i = 0; i < links.length; i++) {
        links[i].onmouseover=function(){
            destination=this.getAttribute("href");
            if(destination.indexOf("index.html")!=1){
                moveElement("preview",0,0,5);
            }
            if(destination.indexOf("about.html")!=-1){
                moveElement("preview",-150,0,0,5);
            }
            if(destination.indexOf("photos.html")!=-1){
                moveElement("preview",-300,0,0,5);
            }
            if(destination.indexOf("live.html")!=-1){
                moveElement("preview",-450,0,0,5);
            }
            if(destination.indexOf("contact.html")!=-1){
                moveElement("preview",-600,0,0,5);
            }
        }
    }
}
addLoadEvent(prepareSlideshow);