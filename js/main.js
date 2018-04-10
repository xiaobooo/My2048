var board= new Array();
var score=0;
var hasConflicted =new Array();

var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function () {

   prepareForMobile();
    newgame();
});
function prepareForMobile(){
    if(documentWidth>500){
        gridContainerWidth=500;
        cellSapce=20;
        cellSideLength=100;

    }

    $('#grid-container').css('width',gridContainerWidth-2*cellSapce);
    $('#grid-container').css('height',gridContainerWidth-2*cellSapce);
    $('#grid-container').css('padding',cellSapce);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function newgame(){
    init();
    generateOneNumber();
    generateOneNumber();
}

function init(){

    for(var i= 0 ;i< 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-"+ i +"-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }

    }


    for(var i= 0 ;i<4;i++) {
        board[i]=new Array();
        hasConflicted[i]=new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j]=0;
            hasConflicted[i][j]=false;
        }
    }
    updateBoardView();

    score=0;
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i= 0 ;i<4;i++) {
        for (var j = 0; j < 4; j++) {
           $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $("#number-cell-"+ i +"-" + j);

            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength*0.5);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength*0.5);
                theNumberCell.text("");
            }else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j]=false;

        }

    }
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber(){
        if(nospace(board)){
        return false;
        }

    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    var times=0;
    while (times<50){
        if (board[randx][randy]==0)
            break;
        var randx=parseInt(Math.floor(Math.random()*4));
        var randy=parseInt(Math.floor(Math.random()*4));
        times++;
    }
    if(times==50){
         for(var i=0;i<4;i++){
             for(var j=0;j<4;j++){
                 if(board[i][j]==0){
                     randx=i;
                     randy=j;
                 }
             }
         }
    }
    var randNumber=Math.random()<0.5? 2 : 4;
    board[randx][randy]=randNumber;
    showNumber(randx,randy,randNumber);
    return true;
}

$(document).keydown(function(event){
    switch (event.keyCode){
        case 37:  //left
            event.preventDefault();
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38:  //up
            event.preventDefault();
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39:  //right
            event.preventDefault();
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40:   //down
            event.preventDefault();
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default:
            break;

    }

});

document.addEventListener('touchstart',function(event){
    event.preventDefault();
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});

document.addEventListener();

document.addEventListener('touchend',function(event){

    event.preventDefault();
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;

    var deltax=endx-startx;
    var deltay=endy-starty;

    if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth){
        return ;
    }
    if(Math.abs(deltax)>Math.abs(deltay)){
        if(deltax>0){
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }

        }else{
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }

        }
    }else{
        if(deltay>0){
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }

        }else{

            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }

        }

    }
});

