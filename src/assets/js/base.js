setSize();

window.addEventListener('resize', setSize, false);

function setSize(){
    var html = document.getElementsByTagName('html')[0];
    var pageWidth = html.getBoundingClientRect().width;
    pageWidth = pageWidth > 540 ? 540 : pageWidth;
    html.style.fontSize = pageWidth / 16 + 'px';
}