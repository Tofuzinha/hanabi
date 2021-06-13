onload = function (){
    if(window.PointerEvent){
      downEvent = "pointerdown";
    } else if(window.TouchEvent){
      downEvent = "touchstart";
    } else{
      downEvent ="mousedown";
    }
    c = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    var countEx = 1000;
    var exX = [innerWidth/2];
    var exY = [innerHeight/2];
    var exAddX = [];
    var exAddY = [];
    var exR = [];
    var exColor = [];
    var exColor1 = [];
    var exAngle;
    var exA = [];
    var exGravity = [];
    for(a = 0; a < countEx; a++){
      exX[a] = innerWidth/2;
      exY[a] = innerHeight/2;
      exR[a] = (getRandom()+3)/3*2;
      exA[a] = 1;
      exColor1[a] = `${getColor()}`;
      exAngle = getRandom();
      exAddX[a] = Math.cos(exAngle)*getRandom();
      exAddY[a] = Math.sin(exAngle)*getRandom();
      exGravity[a] = .0002;
    }
    function explode(){
        clear();
        for(a = 0; a < countEx; a++){
            exColor[a] = `${exColor1[a]}${exA[a]})`
            c.beginPath();
            c.arc(exX[a], exY[a], exR[a], 0, 2 * Math.PI);
            c.fillStyle=exColor[a];
            c.fill();
        }
      for(a = 0; a < countEx; a++){
        exX[a]+=exAddX[a];
        exY[a]+=exAddY[a]+exGravity[a];
        exA[a]-= .001;
        if(exR[a]-.001 > 0){
          exR[a]-=.001;
        }
        exGravity[a]+=.01;
      }
      for(a = 0; a < exX.length; a++){
        if(exY[a] > innerHeight || exX[a] < 0 || exX[a] > innerWidth){
          exX.splice(a,1);
          exY.splice(a,1);
          exAddX.splice(a,1);
          exAddY.splice(a,1);
          exColor.splice(a,1);
          exColor1.splice(a,1);
          exR.splice(a,1);
          exGravity.splice(a,1);
          exA.splice(a,1);
          countEx--;
        }
      }
    }
    var interval = setInterval(explode,10);
    canvas.addEventListener(downEvent, coordinates);
function coordinates(event){
    countEx+=1000;
    for(; a < countEx; a++){
        exX[a] = event.pageX;
        exY[a] = event.pageY;
        exR[a] = (getRandom()+3)/3*2;
        exA[a] = 1;
        exColor1[a] = `${getColor()}`;
        exAngle[a] = getRandom();
        exAddX[a] = Math.cos(exAngle)*getRandom();
        exAddY[a] = Math.sin(exAngle)*getRandom();
        exGravity[a] = .0002;
      }

}
    function getRandom(){
      var r = Math.random() * 6 - 3;
      return(r);
    }
    function getColor(){
      var red = Math.floor(Math.random()*56+200);
      var green = Math.floor(Math.random()*254);
      
      //var color = colors[r];
      //return(color);
      return(`rgba(${red},${green},${0},`);
    }
    
    function clear(){
      c.fillStyle = "rgba(0,0,0,0.1)";
      c.fillRect(0, 0, canvas.width, canvas.height);
    }
}