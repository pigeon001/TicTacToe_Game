//declaring variable
var k;
var dx = [0, -1, -1, -1];
var dy = [1, 1, 0, -1];
var p_coord = { 1: [], 2: [] };
var board = [];
var count=0;
let history=[];

const form = document.getElementById('form');
const box = document.getElementById('box');

//changing font size on changing device width and cell width
window.addEventListener('resize', (eve)=>{
    font();
})

//onsubmit event of form
form.addEventListener('submit', (event) => {
    event.preventDefault();
    k = Number(document.getElementById('key').value);
    if (k < 1) {
        window.alert('Enter a valid number');
        sad();
        }
    else {
        happy();
        setTimeout(()=>{
        $('.reset').css('display','block');
        box.style.display = 'block';
        board_display();
        $('.action').css('top','1vh');
        $('.reset').css('display','block');
    },2000);
    }
});



//making the boxes
function board_display() {
    form.style.display = 'none';
    const parentClass = document.getElementById('box');
    for (let i = 0; i < k; i++) {
        for (let j = 0; j < k; j++) {
            let newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'cell');
            newDiv.setAttribute('onclick', 'display_cross(this.id)');
            const cell = parentClass.appendChild(newDiv);
            cell.setAttribute('id', `${i+1},${j+1}`);
            cell.setAttribute('style', `--size:${100 / k}%`)
            
        }
    }
    font();
    $('#reset').css('display','block'); //displaying reset button for board
    //initializing virtual board
    for (let i = 0; i <=k+1; i++) {
        board[i] = [];
        for (let j = 0; j <=k+1; j++) {
            board[i][j] = 0;
        }
    }
    $('.wrap').css('display','none');
}


//setting .cell font size 
function font(){
    let width=$('.cell').width();
    // console.log(width);
    $('.cell').css('--font_size',`${5.5*width}%`);

}


//condition check function
function check(x, y, type, k) {
    let possible;
    let cnt = 0;
    for (let i = 0; i < 4; i++) {
        cnt++;
        possible = true;
        for (let dis = 0; dis < k; dis++) {
            if (board[x + dis * dx[i]][y + dis * dy[i]] != type) {
                possible = false;
                break;
            }
        }
        if (possible) break;
    }

    return possible;
}

//solving function
function solve(player,coordinate) {
    let newCoord = coordinate.split(',').map(Number); //here we will get new id as coordinate
    let [x, y] = newCoord;
    board[x][y] = player;              //fixing position of that player in the board
    p_coord[player].push(newCoord); //storing coordinate of that player in the p_coord object
    
    let p=false
        //iterating over players coordinates of one and checking for win case
        for (let key of p_coord[player]) {
            if (check(key[0], key[1], player, k)) {
                p = true;
                break;
            }

        }
        if(p) {
            window.alert(`Player-${player} Wins!`);
            $('.reset').css('display','none');
            setTimeout(reset,2000);
            return true;
        }

        else if(count==k*k){
            window.alert('Match Tie');
            $('.reset').css('display','none');
            setTimeout(reset,2000);
            return false;
        }

        else return false;


    }

//cross displays

function display_cross(id) {
        count++;
        const cellId = document.getElementById(`${id}`);
        cellId.style.animationName='font';
        cellId.innerHTML = "X";
        // history.push(`${id}`);
        const cellClass = document.querySelectorAll('.cell');
        reverse('zero',id);
        solve(1,id);
    }

//displaying zero
function display_zero(id) {
    count++;
    const cellId = document.getElementById(`${id}`);
    cellId.style.animationName='font';
    cellId.innerHTML = "O";
    // history.push(id);
    reverse('cross',id);
    solve(2,id);
}



// rerversing function to alternate text
function reverse(type,id){
    const cellClass = document.querySelectorAll('.cell');
    // history.push(id);
    history.push(id);
    for (let m = 0; m < cellClass.length; m++) {
        if (history.includes(cellClass[m].id)) { continue; }
        else {
            element = document.getElementById(cellClass[m].id);
            element.setAttribute('onclick', `display_${type}(this.id)`);
        }
    }
    let cellId=document.getElementById(id);
    cellId.removeAttribute('onclick');
    // $(id).removeAttr('onclick');
}

//reset function

function reset(){
    form.style.display = 'block';
    box.style.display = 'none';
    $('#reset').css('display','none'); // setting button to display none to remove it from screen
    $('.action').css('top','30vh'); // setting form position from top
    $('#key').val(null); //reseting input value to null
    $('.wrap').css('display','block'); //resetting to default view
    form.style.borderRadius="60%";
    while (box.hasChildNodes()) {
        box.removeChild(box.firstChild);
    }
    count = 0;
    history = [];
    p_coord = { 1: [], 2: [] };
    board = [];
}
let res_button = document.getElementById('reset');
res_button.addEventListener('click', (event) => {
    event.preventDefault;
   reset();
})

function sad(){
    form.style.borderRadius="0%";
    form.style.paddingBottom='2em';
    let inp_res=document.getElementById('inp_res');
    let inp_sub=document.getElementById('inp_sub');
    inp_sub.style.paddingTop='.1em';
    inp_res.style.paddingTop='.1em';
    $('#inp_sub').removeClass('eyeSrink');
    $('#inp_sub').removeClass('inp');
    $('#inp_res').removeClass('inp');
    $('#key').removeClass('rotate');

    $('#inp_res').addClass('eyeShort');
    $('#inp_sub').addClass('eyeShort');
}

function happy(){
    form.style.borderRadius="60%";
    form.style.paddingBottom='10em';
    $('#inp_res').css('padding-top','1em');
    $('#inp_sub').css('padding-top','1em');
    $('#inp_res').removeClass('eyeShort');
    $('#inp_sub').removeClass('eyeShort');

    $('#inp_sub').addClass('eyeSrink');
    $('#inp_sub').addClass('inp');
    $('#inp_res').addClass('inp');
    $('#key').addClass('rotate');
}

// function lefteye(){
//     $('#inp_res').addClass('leftEye');
//     $('#inp_sub').addClass('leftEye');
// }

// function righteye(){
//     $('#inp_res').addClass('rightEye');
//     $('#inp_sub').addClass('rightEye');
// }


// function input(coordinate, player) {
//     let newCoord = coordinate.split(',').map(Number); //here we will get new id as coordinate
//     let [x, y] = newCoord;
//     board[x][y] = player;              //fixing position of that player in the board
//     p_coord[player].push(newCoord); //storing coordinate of that player in the p_coord object

// }

// //main function for evaluation
// function main() {


//     //check function
//     function check(x, y, type, k) {
//         let possible;
//         let cnt = 0;
//         for (let i = 0; i < 4; i++) {
//             cnt++;
//             possible = true;
//             for (let dis = 0; dis < k; dis++) {
//                 if (board[x + dis * dx[i][y + dis * dy[i]] != type]) {
//                     possible = false;
//                     break;
//                 }
//             }
//             if (possible) break;
//         }

//         return possible;
//     }

//     function solve() {
//         let p1 = false;
//         let p2 = false;
//         for (let i = 0; i < k * k; i++) {

//             //iterating over players coordinates of one and checking for win case
//             for (let key of p_coord[1]) {
//                 console.log(key[0]);
//                 console.log(key[1]);
//                 if (check(key[0], key[1], 1, k)) {
//                     p1 = true;
//                     break;
//                 }

//             }
//             if (p1) break;

//             //checking for win of player 2
//             for (let key of p_coord[2]) {
//                 if (check(key[0], key[1], 2, k)) {
//                     p2 = true;
//                     break;
//                 }

//             }
//             if (p2) break;


//         }
//         if (p1) console.log("player-1 wins");
//         else if (p2) console.log('player-2 wins');
//         else console.log('Match Tie');
//     }

//     solve();
// }



// var count = 0;
// let history = [];

// //for crosses
// function display_cross(id) {
//     count++;
//     const cellId = document.getElementById(`${id}`);
//     cellId.innerHTML = "&#10006";
//     const cellClass = document.querySelectorAll('.cell');
//     history.push(id);
//     for (let m = 0; m < cellClass.length; m++) {

//         if (history.includes(cellClass[m].id)) { continue; }
//         else {
//             element = document.getElementById(cellClass[m].id);
//             element.setAttribute('onclick', 'display_zero(this.id)');
//         }
//     }
//     cellId.removeAttribute('onclick');
//     input(id, 1);
//     if (count > 4) main();
// }

// //for zeros
// function display_zero(id) {
//     count++;
//     const cellId = document.getElementById(`${id}`);
//     cellId.innerHTML = "O";
//     const cellClass = document.querySelectorAll('.cell');
//     history.push(id);
//     // cellClass.forEach(ele=>{ele.setAttribute('onclick','display_cross(this.id)')});
//     for (let m = 0; m < cellClass.length; m++) {
//         if (history.includes(cellClass[m].id)) { continue; }
//         else {
//             element = document.getElementById(cellClass[m].id);
//             element.setAttribute('onclick', 'display_cross(this.id)');
//         }
//     }
//     cellId.removeAttribute('onclick');
//     input(id, 2);
//     if (count > 4) main();
// }


// //reset button
// let reset = document.getElementById('reset');
// reset.addEventListener('click', (event) => {
//     event.preventDefault;
//     form.style.display = 'inline-block';
//     box.style.display = 'none';
//     while (box.hasChildNodes()) {
//         box.removeChild(box.firstChild);
//     }
//     count = 0;
//     history = [];
//     p_coord = { 1: [], 2: [] };
//     board = [];
// })