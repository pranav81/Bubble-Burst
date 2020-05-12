var canvas = document.querySelector('.canvas');
canvas.width = window.innerWidth-10;                //Setting canvas size
canvas.height = window.innerHeight-10;
var popSound = new Audio('bubblepop.mp3');
var gameOver = new Audio('gameover.mp3');

var ctx = canvas.getContext('2d');

var best = 0, scores = [];                          //Global variables

init();

function init(){
    
    var t = 600, i = 0, pausekey = false,score=0, gameover=false;       //Game variables
    var colorgrad = 105, colorswitch=1;
    
    canvas.addEventListener('mouseup',function(ev){
        
        if((ev.offsetX>(canvas.width - 35))&&(ev.offsetX<(canvas.width - 15))){
            if((ev.offsetY>(canvas.height-40))&&(ev.offsetY<(canvas.width-10))){
                
                window.location.reload();                               //Restart functionality
                
            }
        }

    });
    
    class Bubble{                                   //Class with properties of each bubble

        constructor(x,y,radius){

            this.rad = radius;
            this.x = x;
            this.y = y;
            this.vx = Math.random()*2.5 - 1.25;
            this.vy = Math.random()*2.5 - 1.25;
            this.flag=false;                        //Flag to indicate whether the bubble is in play

        }

        update = function() {                       //Updating the position and radius of bubbles

            this.x += this.vx;
            this.y += this.vy;
            if(this.rad<40){
                this.rad+=0.01;
            }
                    
        }

        draw = function() {                         //To draw a bubble onto the canvas

            var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.rad);
            gradient.addColorStop(0.7, 'rgb(0,68,255)');
            gradient.addColorStop(1, 'rgb(255,'+colorgrad+','+colorgrad+')');
            ctx.fillStyle = gradient;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.rad, 0, Math.PI*2);
            ctx.fill();  
            
        
            
            console.log(colorgrad);

        }

    }

    function drawRestart(){                         //Drawing the 'R' for restart 

        ctx.beginPath();
        ctx.fillStyle = 'rgb(116,201,235)';
        ctx.font = '35px sans-serif';
        
        if(gameover==false){
            ctx.fillText('R', canvas.width - 35, canvas.height - 10);
        }
        else{
            ctx.fillText('R', canvas.width - 23, canvas.height - 10);
        }
        ctx.closePath();

    }

    var b =new Array();
 
    var add = setInterval(function(){               //To add a new bubble every few milliseconds

        if((pausekey==false) && (gameover == false)){
        
            addBubble();
            if(t>50){
                t-=50;
            }
        }

    },t);
    
    var colorswitchch = setInterval(function(){     //To change the color of the bubble
        if(pausekey==false){
        colorswitch*=-1;
        }
    },15000);
    var colorchange = setInterval(function(){
        if(pausekey==false){ 
     
            colorgrad+=colorswitch;  
            if(colorgrad>255){
                colorgrad=255;
            }
            else if(colorgrad<105){
                colorgrad=105;
            }
        
        }
    },100);
    
    function drawPause(){                           //Draw the pause icon if game isn't paused

        if(pausekey==false){

            ctx.beginPath();
            ctx.fillStyle = 'rgb(116, 201, 235)';
            ctx.rect(canvas.width - 50, 15,10,30);
            ctx.rect(canvas.width - 30, 15, 10, 30);
            ctx.fill();
            
        }

        if(pausekey==true){                         //Draw the play icon if game is paused

            ctx.beginPath();
            ctx.moveTo(canvas.width-50, 15);
            ctx.lineTo(canvas.width - 50, 45);
            ctx.lineTo(canvas.width - 20, 30);
            ctx.closePath();
            ctx.fillStyle = 'rgb(116, 201, 235)';
            ctx.fill();

        }

    }

    function addBubble(){                           //Adding a new bubble with random radius and speed
                                                    
        var radius = Math.random()*25 + 25;
        var x = Math.random()*(canvas.width-(2*radius)) + radius;
        var y = Math.random()*(canvas.height-(2*radius)) + radius;
        
        if(b.length>0){
            var j=0;
            while(j<b.length){                      //Making sure the new bubble isn't drawn over another

                if(Math.sqrt(Math.pow((b[j].y - y), 2) + Math.pow((b[j].x - x), 2))<=(b[j].rad+radius)){
                    x = Math.random()*(canvas.width-(2*radius)) + radius;
                    y = Math.random()*(canvas.height-(2*radius)) + radius;
                    j=-1;
                }
                j++;

            }
        }
        
        b.push(new Bubble(x, y, radius));
        i++;                                        //i indicates the number of active bubbles
        
    }

    function checkClick(ev){

        if(pausekey==false){                        //Checking if a bubble needs to be removed
            for(var k=0;k<i;k++){
                
                if(Math.sqrt(Math.pow((b[k].y - ev.offsetY), 2) + Math.pow((b[k].x - ev.offsetX), 2))<=(b[k].rad)){
                    b[k].flag = true;
                    scoreCount(b[k]);
                    b.splice(k,1);
                    popSound.play();
                    i--;

                }
                
            }
        }

        if((ev.offsetX>(canvas.width-50))&&(ev.offsetX<(canvas.width-20))){
            if(ev.offsetY>=15 && ev.offsetY<=45){
                if(pausekey===false){               //Checking if player clicked on pause button
                    pausekey=true;
                    
                }
                else {
                    pausekey = false;
                    animate();
                }
            }
        }

    }   

    function scoreCount(e){                         //Updating the score
            
        score += (10 -((e.rad-25)/5));
        score = Math.floor(score);

        if (gameover == true){                      //If game over, push the score to scores[]
            if(score>Math.max(...scores)){    
                scores.push(score);                         
                best = Math.max(...scores);             //Update best if applicable
                if((window.localStorage.getItem('bubble-best')==null) || (best>window.localStorage.getItem('bubble-best'))){
                    window.localStorage.setItem('bubble-best', JSON.stringify(best));
                }
            }

        }

    }

    function drawText(){                            //Drawing the score and best onto the canvas
        
        ctx.font = '30px sans-serif';
        ctx.fillStyle = 'rgb(116, 201, 235)';
        ctx.strokeStyle = 'rgb(0,68,255)';        
        
        ctx.fillText('SCORE',10,35);
        ctx.strokeText('SCORE',10,35);

        ctx.fillText(score, 10,65);
        ctx.strokeText(score, 10, 65);
        
        ctx.fillText('BEST', 10, 95);
        ctx.strokeText('BEST', 10, 95);

        if (window.localStorage.getItem('bubble-best') == null){
            ctx.fillText('0', 10, 125);
            ctx.strokeText('0',10, 125);
        }
        else{
            ctx.fillText(window.localStorage.getItem('bubble-best'), 10, 125);
            ctx.strokeText(window.localStorage.getItem('bubble-best'), 10, 125);
        }

        if(gameover==true){
            ctx.font = '50px sans-serif';
            ctx.textAlign='center';
            ctx.strokeStyle = 'rgb(0,68,255)';
            ctx.fillText('GAME OVER',canvas.width/2,canvas.height/2);
            ctx.strokeText('GAME OVER',canvas.width/2,canvas.height/2);
            
        }
        
    }

    drawText();
    animate();

    function wall(){                                //Checking for collisions with walls

        b.forEach(function wallDetect(ele){

            if(((ele.x-ele.rad) <=0) || ((ele.x+ele.rad)>=canvas.width)){
                ele.vx*=-1;
            }
            if(((ele.y-ele.rad) <=0) || ((ele.y+ele.rad)>=canvas.height)){
                ele.vy*=-1;
            }

        });

    }

    function collision(){                           //Checking for collisions with other bubbles

        for(var l=0;l<i-1;l++){

            for(var m=l+1;m<i;m++){                 

                if(Math.sqrt(Math.pow((b[l].x - b[m].x),2)+Math.pow((b[l].y - b[m].y),2))<=(b[l].rad + b[m].rad)){
                    
                    var xd = b[m].x - b[l].x;       //Changing speeds assuming elastic collision
                    var yd = b[m].y - b[l].y;
                    var theta = Math.atan2(yd, xd);
                    
                    var u1x = b[l].vx*Math.cos(theta) + b[l].vy*Math.sin(theta);
                    var u1y = b[l].vy*Math.cos(theta) - b[l].vx*Math.sin(theta);
                    var u2x = b[m].vx*Math.cos(theta) + b[m].vy*Math.sin(theta);
                    var u2y = b[m].vy*Math.cos(theta) - b[m].vx*Math.sin(theta);

                    b[l].vx = u2x*Math.cos(theta) - u1y*Math.sin(theta);
                    b[l].vy = u2x*Math.sin(theta) + u1y*Math.cos(theta);
                    b[m].vx = u1x*Math.cos(theta) - u2y*Math.sin(theta);
                    b[m].vy = u1x*Math.sin(theta) + u2y*Math.cos(theta);

                }

            }

        }
        
    }

    function drawDanger(){                          //Drawing the DANGER signal 

        ctx.fillStyle = 'red';
        var tw = ctx.measureText('DANGER!!!');
        ctx.fillText('DANGER!!!', canvas.width/2 - (tw.width/2), 35);
         
    }
    
    function checkArea(){                           //Checking the % of screen covered with bubbles
        
        var area= 0;

        for(var j = 0; j<i;j++){
            area += Math.PI * (Math.pow(b[j].rad,2));
        }

        var totalArea = canvas.width*canvas.height;
        var fractionArea = area / totalArea;

        if(fractionArea>0.3){                       //Firing the DANGER signal as area increases
            drawDanger();
        }

        if(fractionArea>0.35){                      //If a major part is covered, game over
            ctx.font = '30px sans-serif';
            ctx.fillStyle = 'rgb(116, 201, 235)';
            ctx.strokeStyle = 'rgb(0,68,255)';
            if(score>Math.max(...scores)){    
                scores.push(score);                         
                best = Math.max(...scores);             //Update best if applicable
                if((window.localStorage.getItem('bubble-best')==null) || (best>window.localStorage.getItem('bubble-best'))){
                    window.localStorage.setItem('bubble-best', JSON.stringify(best));
                }
            }

            if (window.localStorage.getItem('bubble-best') == null){           
                ctx.fillText('0', 10, 125);
                ctx.strokeText('0',10, 125);
            }
            else{
                ctx.fillText(window.localStorage.getItem('bubble-best'), 10, 125);
                ctx.strokeText(window.localStorage.getItem('bubble-best'), 10, 125);
            }
            gameover = true;
            gameOver.play();
        }
        
    }
 
    function animate(){
        
        if(gameover==false){                        //If game is not over
            
            if((pausekey==false)){                  //If game is not paused
                window.requestAnimationFrame(animate);
            }

            ctx.clearRect(0,0,canvas.width,canvas.height);
            
            b.forEach(function(e){
                if(e.flag===false){
                    e.draw();
                    e.update();
                }
            });
            
            wall();
            checkArea();
            collision();
            drawPause();
            drawText();
            drawRestart();
            
        }
        
        canvas.addEventListener('mousedown',checkClick);
        
    }
        

}

