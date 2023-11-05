
var touchDevice = ('ontouchstart' in document.documentElement);

try {
    let boardId = document.getElementById('box');
    // let cellC=document.getElementsByClassName('cell');
    if (touchDevice) {
        boardId.addEventListener('click', pnt => {
            var newP = document.createElement('div');
            newP.className = "touch";
            newP.setAttribute('id','demo');
            newP.style.top = pnt.touches[0].pageY + 'px';
            newP.style.left = pnt.touches[0].pageX + 'px';
            boardId.appendChild(newP);
            // cellC.appendChild(newP);
        })
    }
    else {
        boardId.addEventListener('click', pnt => {
            var newP = document.createElement('div');
            newP.className = "touch";
            newP.setAttribute('id','demo');
            newP.style.top = pnt.pageY + 'px';
            newP.style.left = pnt.pageX + 'px';
            boardId.appendChild(newP);
            // cellC.appendChild(newP);
        })
    }
}

catch (e) {};


// function clean(){
//     let del=document.getElementById('box');
//     del.removeChild(document.getElementById('demo'));
// }
function clean(){
    let del = document.getElementById('box');
    let demoElement = document.getElementById('demo');
    if(demoElement && del.contains(demoElement)) {
        del.removeChild(demoElement);
    }
}
setInterval(clean,3000);
