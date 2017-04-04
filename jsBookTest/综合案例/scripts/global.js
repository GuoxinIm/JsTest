
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

//Home
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

/**
 * 添加图片属性
 * 
 * @returns 
 */
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
    var fram = document.createElement("img");
    fram.setAttribute("id", "fram");
    fram.setAttribute("src", "images/frame.gif");
    fram.setAttribute("alt", "");
    slideshow.appendChild(fram);
    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);
    var links = document.getElementsByTagName("a");
    var destination;
    for (var i = 0; i < links.length; i++) {
        links[i].onmouseover = function () {
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != 1) {
                moveElement("preview", 0, 0, 5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview", -150, 0, 0, 5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview", -300, 0, 0, 5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview", -450, 0, 0, 5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview", -600, 0, 0, 5);
            }
        }
    }
}
addLoadEvent(prepareSlideshow);

//About
/**
 * 修改每个部分display的属性样式
 * 
 * @param {any} id 
 */
function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") != id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function prepareInternalnav() {
    if (!document.getElementById || !document.getElementsByTagName) {
        return false;
    }
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) {
        return false;
    }
    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0) {
        return false;
    }
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(sectionId)) {
            continue;
        }
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function () {
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);

//Photos
function showPic(whichpic) {
    if (!document.getElementById("placeholder")) {
        return true;
    }
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    if (!document.getElementById("description")) {
        return false;
    }
    if (whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return false;
}

function preparePlaceholder() {
    if (!document.createElement) {
        return false;
    }
    if (!document.createTextNode) {
        return false;
    }
    if (!document.getElementById) {
        return false;
    }
    if (!document.getElementById("imagegallery")) {
        return false;
    }
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(description, gallery);
    insertAfter(placeholder, description);
}
function prepareGallery() {
    if (!document.getElementsByTagName) {
        return false;
    }
    if (!document.getElementById) {
        return false;
    }
    if (!document.getElementById("imagegallery")) {
        return false;
    }
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return showPic(this);
        }
        links[i].onkeypress = links[i].onclick;
    }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

//live
function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
                addClass(rows[j], "odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}
function displayAbbreviations() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        if (current_abbr.childNodes.length < 1) continue;
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    var dlist = document.createElement("dl");
    for (key in defs) {
        var definition = defs[key];
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    articles[0].appendChild(header);
    articles[0].appendChild(dlist);
}

function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].oldClassName = rows[i].className
        rows[i].onmouseover = function () {
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function () {
            this.className = this.oldClassName
        }
    }
}
addLoadEvent(displayAbbreviations);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);

//contact

/**
 * 单击标签把焦点转移到关联的表单字段中
 * 
 * @returns 
 */
function focusLabels() {
    if (!document.getElementsByTagName) {
        return false;
    }
    var labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
        if (!labels[i].getAttribute("for")) {
            continue;
        }
        labels[i].onclick = function () {
            var id = this.getAttribute("for");
            if (!document.getElementById(id)) {
                return false;
            }
            var element=document.getElementById(id);
            element.focus();
        }
    }
}
addLoadEvent(focus);

function resetFields(whichform) {
  if (Modernizr.input.placeholder) return;
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.type == "submit") continue;
    if (!element.getAttribute('placeholder')) continue;
    element.onfocus = function() {
    if (this.value == this.getAttribute('placeholder')) {
      this.value = "";
     }
    }
    element.onblur = function() {
      if (this.value == "") {
        this.value = this.getAttribute('placeholder');
      }
    }
    element.onblur();
  }
}