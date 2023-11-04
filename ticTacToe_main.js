

const form = document.getElementById('form');
const box=document.getElementById('box');
form.addEventListener('submit', (event) => { 
    event.preventDefault(); 
    box.style.display='block';
    board_display();
});

var k;
var p_coord = { 1: [], 2: [] };
var board=[];

//making the boxes
function board_display() {
   let kId =document.getElementById('key').value;
     k=Number(kId);
    // console.log(k);
    form.style.display = 'none';
    const parentClass = document.getElementById('box');
    for (let i = 0; i < k; i++) {
        for (let j = 0; j < k; j++) {
            let newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'cell');
            newDiv.setAttribute('onclick', 'display_cross(this.id)');
            const cell = parentClass.appendChild(newDiv);
            cell.setAttribute('id', `${i},${j}`);
            cell.setAttribute('style', `--size:${100 / k}%`)

        }
    }
    //initializing board
    for(let i=0; i<k; i++){
        board[i]=[];
        for(let j=0; j<k; j++){
            board[i][j]=0;
        }
    }
}
// console.log(k);


function input(coordinate,player){
        let newCoord = coordinate.split(',').map(Number); //here we will get new id as coordinate
        let [x, y] = newCoord;
        board[x][y]=player;              //fixing position of that player in the board
        p_coord[player].push(newCoord); //storing coordinate of that player in the p_coord object
      
}

//main function for evaluation
function main() {
    const dx = [0, -1, -1, -1];
    const dy = [1, 1, 0, -1];

    //check function
    function check(x, y, type, k) {
        let possible;
        let cnt = 0;
        for (let i = 0; i < 4; i++) {
            cnt++;
            possible = true;
            for (let dis = 0; dis < k; dis++) {
                if (board[x + dis * dx[i][y + dis * dy[i]] != type]) {
                    possible = false;
                    break;
                }
            }
            if (possible) break;
        }

        return possible;
    }

    function solve() {
        let p1 = false;
        let p2 = false;
        for (let i = 0; i < k * k; i++) {

            //iterating over players coordinates of one and checking for win case
            for (let key of p_coord[1]) {
                    console.log(key[0]);
                    console.log(key[1]);
                    if (check(key[0], key[1], 1, k)) {
                        p1 = true;
                        break;
                    }
                
            }
            if (p1) break;

            //checking for win of player 2
            for (let key of p_coord[2]) {
                    if (check(key[0], key[1], 2, k)) {
                        p2 = true;
                        break;
                    }
                
            }
            if (p2) break;


        }
        if (p1) console.log("player-1 wins");
        else if (p2) console.log('player-2 wins');
        else console.log('Match Tie');
    }

    solve();
}



var count = 0;
let history=[];

//for crosses
function display_cross(id) {
    count++;
    const cellId = document.getElementById(`${id}`);
    cellId.innerHTML = "&#10006";
    const cellClass = document.querySelectorAll('.cell');
    history.push(id);
    for(let m=0; m<cellClass.length; m++){
        
        if(history.includes(cellClass[m].id)) {continue;}
        else {
            element=document.getElementById(cellClass[m].id);
            element.setAttribute('onclick','display_zero(this.id)');
        }
    }
    cellId.removeAttribute('onclick');
    input(id,1);
    if(count>4) main();
}

//for zeros
function display_zero(id) {
    count++;
    const cellId = document.getElementById(`${id}`);
    cellId.innerHTML = "O";
    const cellClass = document.querySelectorAll('.cell');
    history.push(id);
    // cellClass.forEach(ele=>{ele.setAttribute('onclick','display_cross(this.id)')});
    for(let m=0; m<cellClass.length; m++){
        if(history.includes(cellClass[m].id)) {continue;}
        else {
            element=document.getElementById(cellClass[m].id);
            element.setAttribute('onclick','display_cross(this.id)');
        }
    }
    cellId.removeAttribute('onclick');
    input(id,2);
    if(count>4) main();
}


//reset button
let reset=document.getElementById('reset');
reset.addEventListener('click',(event)=>{
    event.preventDefault;
    form.style.display='inline-block';
    box.style.display='none';
    while(box.hasChildNodes()){
        box.removeChild(box.firstChild);
    }
    count=0;
    history=[];
    p_coord = { 1: [], 2: [] };
    board=[];
})