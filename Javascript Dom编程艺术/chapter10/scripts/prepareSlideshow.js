function prepareSlideshow() {
    //确保浏览器支持DOM方法
    if (!document.getElementById || !document.getElementsByTagName) {
        return false;
    }
    //确保元素存在
    if (!document.getElementById("linklist")) {
        return false;
    }
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview=document.createElement("img");
    preview.setAttribute("id","preview");
    preview.setAttribute("alt","building blocks of web design")
    preview.setAttribute("src","topics.gif");
    slideshow.appendChild(preview);
    var list = document.getElementById("linklist")
    insertAfter(slideshow,list);
    //取得列表中所有的链接
    var list = document.getElementById("linklist");
    var links = list.getElementsByTagName("a");
    //为mousrover时间添加动画效果
    links[0].onmouseover=function(){
        moveElement("preview",-100,0,10);
    }
    links[1].onmouseover=function(){
        moveElement("preview",-200,0,10);
    }
    links[2].onmouseover=function(){
        moveElement("preview",-300,0,10);
    }
}
addLoadEvent(prepareSlideshow);