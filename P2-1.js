var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');
var canvas3 = document.getElementById('canvas3');
var ctx3 = canvas3.getContext('2d');
var canvas4 = document.getElementById('canvas4');
var ctx4 = canvas4.getContext('2d');

ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
ctx3.fillRect(0, 0, canvas3.width, canvas3.height);
ctx4.fillRect(0, 0, canvas4.width, canvas4.height);

canvas.width=660;
canvas.height= 320;
canvas2.width =  660; //TAMANHO TELA FULL
canvas2.height =  320;
canvas3.width=660;
canvas3.height= 320;
canvas4.width=660;
canvas4.height= 320;

var qtpontos = 0;
var pontx=0;
var ponty=0;
var Px = []; //PONTOS  X DE TODOS OS CLICKS
var Py = []; //PONTOS  Y DE TODOS OS CLICKS
var D1x=[];
var D1y=[];
var D2x=[];
var D2y=[];
var D3x=[];
var D3y=[];
var poss = 0;
var moved = false;
var DCurva=true;
var poligonal=true;
var pontos=true;
var avaliações=100;
function newAvaliação(){
	var n=document.getElementById("1").value;
	if (n>=0){
		avaliações=n;
		redrawn();
	}
}
function reset(){
	qtpontos=0;
	redrawn();
}

function onCurva(){
  if(DCurva){
    DCurva=false;
  }else{
    DCurva=true;
  }
  redrawn();
}
function onPoligonal(){
  if(poligonal){
    poligonal=false;
  }else{
    poligonal=true;
  }
  redrawn();
}
function onPontos(){
  if(pontos){
    pontos=false;
  }else{
    pontos=true;
  }
  redrawn();
}
function Cponto(curva){
  var Xponts=[];
  var Yponts=[];
  for(var i=0;i<curva.npontos;i++){
  Xponts[i]=[];
  Yponts[i]=[];
  }
  for(i=0;i<curva.npontos;i++){
  Xponts[0][i]=curva.px[i];
  Yponts[0][i]=curva.py[i];
  }
 for(i=1;i<curva.npontos;i++){
  for(var j=0;j<curva.npontos-i;j++){
    Xponts[i][j]=Xponts[i-1][j]*(1-t)+Xponts[i-1][j+1]*t;
    Yponts[i][j]=Yponts[i-1][j]*(1-t)+Yponts[i-1][j+1]*t;
  }
 }
  
    pontx=Xponts[curva.npontos-1][0];
    ponty=Yponts[curva.npontos-1][0];
    
  
}
function curve(curva){
  var xponts=[];
  var yponts=[];
  
    
  for(var i=0;i<=avaliações;i++){
    t=i/avaliações;
    Cponto(curva);
    xponts [i]=pontx;
    yponts [i]=ponty;
    
  }
  
  if(DCurva){
    curva.ctxN.beginPath();
    curva.ctxN.moveTo(xponts[0],yponts[0]);
    for(i=1;i<=avaliações;i++){
      curva.ctxN.lineTo(xponts[i],yponts[i]);
    }
     curva.ctxN.stroke();
     
  }
  
}
function redrawn() { //limpa a tela e desenha denovo
  var Xaux=0;
  var Yaux=0;
  var Divaux=1;
  var Paux=0;
  var count=1;
  var outbound=false;
  var xtst=0;
  var ytst=0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
  ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
  if(pontos){
    for (var s = 0; s < qtpontos; s++) {
      ctx.beginPath();
      ctx.arc(Px[s], Py[s], 3, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
  }
  
  if(poligonal){
    for (var s = 0; s < qtpontos-1; s++) {
      ctx.beginPath();
      ctx.moveTo(Px[s],Py[s]);
      ctx.lineTo(Px[s+1],Py[s+1]);
      ctx.stroke();
    }
  }
  
  
  for(s=0;s<qtpontos-1;s++){
   D1x[s]=Px[s+1]-Px[s];
   D1y[s]=Py[s+1]-Py[s];
   if(D1x[s]<0&&Xaux>D1x[s]){
     Xaux=D1x[s];
   }
   if(D1y[s]<0&&Yaux>D1y[s]){
    Yaux=D1y[s];
  }
  }
  for(s=0;s<qtpontos-1&&(Xaux<0||Yaux<0 );s++){
    D1x[s]=D1x[s]-Xaux;
    D1y[s]=D1y[s]-Yaux;
    if(D1x[s]>660||D1y[s]>320){
        if(Divaux<Math.sqrt(Math.pow(D1x[s],2)+Math.pow(D1y[s],2))){
          Divaux=Math.sqrt(Math.pow(D1x[s],2)+Math.pow(D1y[s],2));
          Paux=s;
          outbound=true;
        }
    }
  }
    xtst=D1x[Paux];
    ytst=D1y[Paux];
if(outbound){
    
  for(var b=false;!b;count++){
    xtst=xtst/2;
    ytst=ytst/2;
    if(xtst<660&&ytst<320){
      b=true;
    }
  }
}
  
  for(s=0;s<qtpontos-1;s++){
    D1x[s]=D1x[s]/Math.pow(count,2);
    D1y[s]=D1y[s]/Math.pow(count,2);
    if(pontos){
      ctx2.beginPath();
      ctx2.arc(D1x[s], D1y[s], 3, 0, 2 * Math.PI);
      ctx2.stroke();
      ctx2.fill();
    }
    
  }
  Paux=0;
  Divaux=1;
  xtst=0;
  ytst=0;
  count=1;
  outbound=false

  for(s=0;s<qtpontos-2;s++){
    D2x[s]=D1x[s+1]-D1x[s];
    D2y[s]=D1y[s+1]-D1y[s];
    if(D2x[s]<0&&Xaux>D2x[s]){
      Xaux=D2x[s];
    }
    if(D2y[s]<0&&Yaux>D2y[s]){
     Yaux=D2y[s];
   }
   }
   for(s=0;s<qtpontos-2&&(Xaux<0||Yaux<0 );s++){
     D2x[s]=D2x[s]-Xaux;
     D2y[s]=D2y[s]-Yaux;
     if(D2x[s]>660||D2y[s]>320){
         if(Divaux<Math.sqrt(Math.pow(D2x[s],2)+Math.pow(D2y[s],2))){
           Divaux=Math.sqrt(Math.pow(D2x[s],2)+Math.pow(D2y[s],2));
           Paux=s;
           outbound=true;
         }
     }
   }
     xtst=D2x[Paux];
     ytst=D2y[Paux];
 if(outbound){
     
   for(var b=false;!b;count++){
     xtst=xtst/2;
     ytst=ytst/2;
     if(xtst<660&&ytst<320){
       b=true;
     }
   }
 }
   
   for(s=0;s<qtpontos-2;s++){
     D2x[s]=D2x[s]/Math.pow(count,2);
     D2y[s]=D2y[s]/Math.pow(count,2);
     if(pontos){
      ctx3.beginPath();
      ctx3.arc(D2x[s], D2y[s], 3, 0, 2 * Math.PI);
      ctx3.stroke();
      ctx3.fill();
     }
     
   }
   Paux=0;
   Divaux=1;
   xtst=0;
   ytst=0;
   count=1;
   outbound=false

   for(s=0;s<qtpontos-3;s++){
    D3x[s]=D2x[s+1]-D2x[s];
    D3y[s]=D2y[s+1]-D2y[s];
    if(D3x[s]<0&&Xaux>D3x[s]){
      Xaux=D3x[s];
    }
    if(D3y[s]<0&&Yaux>D3y[s]){
     Yaux=D3y[s];
   }
   }
   for(s=0;s<qtpontos-3&&(Xaux<0||Yaux<0 );s++){
     D3x[s]=D3x[s]-Xaux;
     D3y[s]=D3y[s]-Yaux;
     if(D3x[s]>660||D3y[s]>320){
         if(Divaux<Math.sqrt(Math.pow(D3x[s],2)+Math.pow(D3y[s],2))){
           Divaux=Math.sqrt(Math.pow(D3x[s],2)+Math.pow(D3y[s],2));
           Paux=s;
           outbound=true;
         }
     }
   }
     xtst=D3x[Paux];
     ytst=D3y[Paux];
 if(outbound){
     
   for(var b=false;!b;count++){
     xtst=xtst/2;
     ytst=ytst/2;
     if(xtst<660&&ytst<320){
       b=true;
     }
   }
 }
   
   for(s=0;s<qtpontos-3;s++){
     D3x[s]=D3x[s]/Math.pow(count,2);
     D3y[s]=D3y[s]/Math.pow(count,2);
     if(pontos){
      ctx4.beginPath();
      ctx4.arc(D3x[s], D3y[s], 3, 0, 2 * Math.PI);
      ctx4.stroke();
      ctx4.fill();
     }
    
   }
   if(DCurva){
    curve({
      px:Px,
      py:Py,
      npontos:qtpontos,
      ctxN:ctx
    });
    curve({px:D1x,
     py:D1y,
     npontos:qtpontos-1,
     ctxN:ctx2});
     curve({px:D2x,
       py:D2y,
       npontos:qtpontos-2,
       ctxN:ctx3});
       curve({px:D3x,
         py:D3y,
         npontos:qtpontos-3,
         ctxN:ctx4});
   }
  
}
canvas.addEventListener('click', function(e) { //criar um ponto ao clicar
  if (!CicleExist({
      x: e.offsetX,
      y: e.offsetY
    })&&pontos) {
    Px[qtpontos] = [e.offsetX];
    Py[qtpontos] = [e.offsetY];
    qtpontos++;
    redrawn();
  }





});
canvas.addEventListener('dblclick', function(e) { // deleta um ponto ao dar doubleclick
  if (CicleExist({
      x: e.offsetX,
      y: e.offsetY
    })&&pontos) {
    Px.splice(poss, 1);
    Py.splice(poss, 1);
    qtpontos--;
    redrawn();
  }
})

function CicleExist(click) {
  for (var j = 0; j < qtpontos; j++) { // ve se esta clicando em um ponto                              
    var v = {
      x: click.x - Px[j],
      y: click.y - Py[j],
    };
    if ((Math.sqrt(v.x * v.x + v.y * v.y) <= 3)) {
      poss = j;
      return true;
    }
  }
  return false;
}
var move = false;

canvas.addEventListener('mousedown', function(e) { //MOVE SE UM CIRCULO FOI CLICADO
  move = CicleExist({
    x: e.offsetX,
    y: e.offsetY
  });

});

canvas.addEventListener('mousemove', function(e) { //SE ESTA MOVENDO ENTAO O X E O Y DO CIRCULO CLICADO ACOMPANHA OS OFFSETS DO MOUSE 
  if (move&&pontos) {
    Px[poss] = e.offsetX;
    Py[poss] = e.offsetY;
    redrawn();
  }
});

canvas.addEventListener('mouseup', function(e) { //LIMPA
  poss = 0;
  move = false;
});
