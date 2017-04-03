
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
    var parent = targetElement.parenNode;
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