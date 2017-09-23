/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


  var canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 550;
  canvas.style.backgroundColor = '#797';
 
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  
  canvas.onmousedown = handleMouseDown;
  canvas.onmousemove=handleMouseMove;
 var mode='play';mode='gameOver';
 var mess="White's turn";
 var mouseX=0;
 var mouseY=0;
function handleMouseMove(event){
    var rect = canvas.getBoundingClientRect();
  mouseX = event.clientX-rect.left;
  mouseY = event.clientY-rect.top; 
}
  



//var canvas = document.getElementById("myCanvas");
//var ctx = canvas.getContext("2d");


var board=[];
var player='white';
var passLastRound=false;
var numRows=8;
var numColls=8;
var tileSize=50;
for (var row=0;row<numRows;row++){
    var newRow=[];
    for(var coll=0;coll<numColls;coll++){
        newRow.push('e');
    }
    board.push(newRow);
}
board[3][3]='w';
board[4][4]='w';
board[3][4]='b';
board[4][3]='b';

function setup(){
   board=[];
player='white';
mess="White's turn";
 passLastRound=false;
numRows=8;
 numColls=8;
tileSize=50;
for (var row=0;row<numRows;row++){
    var newRow=[];
    for(var coll=0;coll<numColls;coll++){
        newRow.push('e');
    }
    board.push(newRow);
}
board[3][3]='w';
board[4][4]='w';
board[3][4]='b';
board[4][3]='b';
}

function draw() {
  
    document.body.style.cursor = "auto";
    if(mode==='gameOver'){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle='#7C7';
        ctx.fillRect(0, 0, 850, 850);
        ctx.fillStyle = 'black';
ctx.font = "70px Arial";

ctx.fillText("Game over",35,150);
ctx.font = "60px Arial";
var score=getScore();
if(score[0]>score[1]){
    ctx.fillStyle = '#CCC';
  ctx.fillText("White won",80,230);  
}
else if(score[0]<score[1]){
    ctx.fillStyle = '#333';
    ctx.fillText("Black won",80,230); 
}
else if(score[0]===score[1]){
    ctx.fillStyle = '#888';
    ctx.fillText("Tie",170,230); 
}
    ctx.beginPath();
    ctx.fillStyle = '#88A';
    ctx.fillRect(50,370,320, 115);
   if(mouseX>50 && mouseX< 370 && mouseY>370&& mouseY< 485){
                document.body.style.cursor = "pointer";
            }
    ctx.fillStyle = '#161';
    
    ctx.fillText("Play again",70,445);     

return;
    }
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.stroke();
for(var r=0;r<board.length;r++){
   var row=board[r];
   for(var c=0;c<row.length;c++){
       ctx.lineWidth=5;
       ctx.strokeStyle="#AA5"; 
       ctx.beginPath();      
       ctx.rect(r*tileSize,c*tileSize,tileSize-3,tileSize-3)
        ctx.stroke();    
       ctx.fillStyle="#CC7";
       ctx.fillRect(r*tileSize,c*tileSize,tileSize-5,tileSize-5);
      
       if(row[c]==='e'){ 
           
           
           
       }
       else if(row[c]==='b'){
      
      ctx.beginPath();
      ctx.strokeStyle='black';
      ctx.fillStyle = 'black';
      ctx.arc(r*50+24, c*50+24, 15, 0, 2 * Math.PI, false);      
      ctx.fill();
          
       }
       else if(row[c]==='w'){
      
      ctx.strokeStyle='white';
      ctx.fillStyle = 'white';
      ctx.beginPath();
      
      ctx.arc(r*50+25, c*50+25, 15, 0, 2 * Math.PI, true);
      
      ctx.fill();
        
       }
      
   }
}

if(player==='white'){
  ctx.beginPath(); 
  ctx.fillStyle='#FFF';
  ctx.fillRect(0,400,400,50);
}
else if(player==='black'){
   ctx.beginPath(); 
  ctx.fillStyle='#222';
  ctx.fillRect(0,400,400,50); 
}

ctx.fillStyle = '#888';
ctx.font = "30px Arial";
ctx.fillText(mess,190-mess.length*6,430);
var scores=getScore();
ctx.fillStyle = '#FFF';  
ctx.font = "30px Arial";
ctx.beginPath();
ctx.arc(100, 500, 35, 0, 2 * Math.PI, false);      
ctx.fill();

ctx.fillStyle = '#111';  
ctx.font = "35px Arial";

ctx.beginPath();
ctx.arc(300, 500, 35, 0, 2 * Math.PI, false);      
ctx.fill();

ctx.fillStyle = '#777'; 
ctx.fillText(scores[0],82,510); 
ctx.fillText(scores[1],282,510); 

var moves=getLegalMoves();

var pass=true;
for (var r=0;r<numRows;r++){    
    for(var c=0;c<numColls;c++){
        if(moves[r][c]===true){
            pass=false;
            ctx.beginPath();
            ctx.lineWidth=5;
            ctx.strokeStyle="#BFB";            
             
            ctx.rect(r*50+2,c*50+2,42,42);
            ctx.stroke();
            
            if(mouseX>r*50 && mouseX< r*50+tileSize && mouseY>c*50 && mouseY< c*50+tileSize){
                document.body.style.cursor = "pointer";
                
                if(player==='white'){
                ctx.fillStyle = '#EEE';
                ctx.beginPath();
      
                ctx.arc(r*50+23, c*50+23, 15, 0, 2 * Math.PI, true);
      
                ctx.fill();  
                }
                else if(player==='black'){
                 ctx.fillStyle = '#666';
                ctx.beginPath();
      
                ctx.arc(r*50+23, c*50+23, 15, 0, 2 * Math.PI, true);
      
                ctx.fill();    
                }
                
            }
             
          
        }
    }
   
}
if(pass && passLastRound){
    //game over
    
    mode='gameOver';
    
    
}
if(pass){
    
    passLastRound=true;
    if(player==='white'){
       player='black'; 
       mess="White passed, Black's turn"
    }
    else if(player==='black'){
        player='white';
        mess="Black passed, White's turn"
    }
}
else if(!pass){
    passLastRound=false;
}

}
setInterval(draw, 10);

function getLegalMoves(){
   var moves=[];
   var directions=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
   for (var row=0;row<numRows;row++){
    var newRow=[];
    for(var coll=0;coll<numColls;coll++){
        newRow.push(false);
    }
    moves.push(newRow);  
} 

   for(var r=0;r<numRows;r++){
       
       
    for(var c=0;c<numColls;c++){
        
        if(board[r][c]!=='e'){
            continue;
        }
        
        var isLegal=false;
        if(player==='white'){
            
            for(var d=0;d<8;d++){
                if(isLegal){
                    
                    break;
                }
                var direction=directions[d];
                var nextTile=[r+direction[0],c+direction[1]];
                if(nextTile[0]<0 || nextTile[0]>=numRows || nextTile[1]<0 || nextTile[1]>=numColls){
                        continue; 
                }
                if(board[nextTile[0]][nextTile[1]]!=='b'){
                        continue;
                }
                while(true){
                    nextTile=[nextTile[0]+direction[0], nextTile[1]+direction[1]];
                    
                    if(nextTile[0]<0 || nextTile[0]>=numRows || nextTile[1]<0 || nextTile[1]>=numColls){
                       break; 
                }
                if(board[nextTile[0]][nextTile[1]]==='w'){
                    isLegal=true;
                    break;
                }
                 if(board[nextTile[0]][nextTile[1]]!=='b'){                    
                        break;
                }
                }
                
                
            }
          if(isLegal===true){
             moves[r][c]=true;
             //window.alert("Nalezen legani tah na pozici"+r+" "+c);
          }  
        }
        else if(player==='black'){
            for(var d=0;d<8;d++){
                if(isLegal){
                    
                    break;
                }
                var direction=directions[d];
                var nextTile=[r+direction[0],c+direction[1]];
                if(nextTile[0]<0 || nextTile[0]>=numRows || nextTile[1]<0 || nextTile[1]>=numColls){
                        continue; 
                }
                if(board[nextTile[0]][nextTile[1]]!=='w'){
                        continue;
                }
                while(true){
                    nextTile=[nextTile[0]+direction[0], nextTile[1]+direction[1]];
                    
                    if(nextTile[0]<0 || nextTile[0]>=numRows || nextTile[1]<0 || nextTile[1]>=numColls){
                       break; 
                }
                if(board[nextTile[0]][nextTile[1]]==='b'){
                    isLegal=true;
                    break;
                }
                 if(board[nextTile[0]][nextTile[1]]!=='w'){                    
                        break;
                }
                }
                
                
            }
          if(isLegal===true){
             moves[r][c]=true;
             //window.alert("Nalezen legani tah na pozici"+r+" "+c);
          }  
            
            
        }
    }
      

} 

return moves;
}

function getScore(){
    var wScore=0;
    var bScore=0;
    for(var x=0;x<numRows; x++){
        for(var y=0; y<numColls;y++){
            if(board[x][y]==='w'){
                wScore++;
            }
            else if(board[x][y]==='b'){
                bScore++;
            }
        }
    }
    return [wScore, bScore];
}




function handleMouseDown(event) {
    if(mode==='gameOver'){
       mode='play'; 
       setup();
       
    }
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX-rect.left;
  var y = event.clientY-rect.top;
  
  var moves=getLegalMoves();
  
  var xTile=Math.floor(x/tileSize);
  var yTile=Math.floor(y/tileSize);
  if (xTile>=0 && xTile<numRows && yTile>=0 && yTile<numColls){
      if(moves[xTile][yTile]===true){
          var directions=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
          if(player==='white'){
              board[xTile][yTile]='w';
              
              var changeList=[];
               for(var d=0;d<8;d++){
               var partialChangeList=[];
                var direction=directions[d];
                var nextTile=[xTile+direction[0],yTile+direction[1]];
                var arr=[nextTile[0],nextTile[1]];
                partialChangeList.push(arr);
                if(nextTile[0]<0 || nextTile[0]>=numRows || nextTile[1]<0 || nextTile[1]>=numColls){
                        continue; 
                }
                if(board[nextTile[0]][nextTile[1]]!=='b'){
                        continue;
                }
                
                while(true){
                    nextTile=[nextTile[0]+direction[0], nextTile[1]+direction[1]];
                    var arr=[nextTile[0],nextTile[1]];
                    partialChangeList.push(arr);
                    if(nextTile[0]<0 || nextTile[0]>=numRows || nextTile[1]<0 || nextTile[1]>=numColls){
                       break; 
                }
                if(board[nextTile[0]][nextTile[1]]==='w'){
                    for(var a=0;a<partialChangeList.length;a++){
                        changeList.push(partialChangeList[a]);
                    }
                    break;
                }
                 if(board[nextTile[0]][nextTile[1]]!=='b'){                    
                        break;
                }
                }
                
                
            }
            for(var i=0;i<changeList.length;i++){
                board[changeList[i][0]][changeList[i][1]]='w';
            }
              
              
              
              player='black';
              mess="Black's turn";
          }
          else if(player==='black'){
              board[xTile][yTile]='b';
               
              
              var changeList=[];
               for(var d=0;d<8;d++){
               var partialChangeList=[];
                var direction=directions[d];
                var nextTile=[xTile+direction[0],yTile+direction[1]];
                var arr=[nextTile[0],nextTile[1]];
                partialChangeList.push(arr);
                if(nextTile[0]<0 || nextTile[0]>=numRows || nextTile[1]<0 || nextTile[1]>=numColls){
                        continue; 
                }
                if(board[nextTile[0]][nextTile[1]]!=='w'){
                        continue;
                }
                
                while(true){
                    nextTile=[nextTile[0]+direction[0], nextTile[1]+direction[1]];
                    var arr=[nextTile[0],nextTile[1]];
                    partialChangeList.push(arr);
                    if(nextTile[0]<0 || nextTile[0]>=numRows || nextTile[1]<0 || nextTile[1]>=numColls){
                       break; 
                }
                if(board[nextTile[0]][nextTile[1]]==='b'){
                    for(var a=0;a<partialChangeList.length;a++){
                        changeList.push(partialChangeList[a]);
                    }
                    break;
                }
                 if(board[nextTile[0]][nextTile[1]]!=='w'){                    
                        break;
                }
                }
                
                
            }
            for(var i=0;i<changeList.length;i++){
                board[changeList[i][0]][changeList[i][1]]='b';
            }
              
              
              player='white';
              mess="White's turn";
          }
         
      }
  }
  
}