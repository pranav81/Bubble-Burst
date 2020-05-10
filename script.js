var canvas = document.querySelector('.canvas');
canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight-10;

var ctx = canvas.getContext('2d');

var t = 500, i = 0, pausekey = false,score=0, gameover=false, best = 0, scores = [];

// //init();

// function init(){
    
//     class Bubble{

//         constructor(){
            
//             this.rad = Math.floor((Math.random() * 40) + 60);
//             this.x = Math.floor((Math.random() * (canvas.width - (2*this.rad))) + this.rad);
//             this.y = Math.floor((Math.random() * (canvas.height - (2*this.rad))) + this.rad);
//             this.vx = Math.floor((Math.random() * 10) - 5);
//             this.vy = Math.floor((Math.random() * 10) - 5);
//             this.flag = false;
        
//         }

//         drawBubble(){
//             var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.rad);
//             gradient.addColorStop(0.8, 'white');
//             gradient.addColorStop(0.9, 'rgb(116, 201, 235)');
//             gradient.addColorStop(1, 'white');
//             ctx.fillStyle = gradient;

//             ctx.beginPath();
//             ctx.arc(this.x, this.y, this.rad, 0, Math.PI*2);
//             ctx.fill();
            
//         }

//         updateBubble(){

//             this.x += this.vx;
//             this.y += this.vy;
            
//         }

//     }

//     var b = new Array();
//     b[i] = new Bubble();
//     //b.push(new Bubble());
    
//     function detectCollision(){

//         // for (var j=b.length-1; j>0; j++){
//         //     //if(b.length>j){
//         //         if(Math.sqrt(Math.pow((b[j].y - b[j-1].y), 2) + Math.pow((b[j].x - b[j-1].x), 2))<=(b[j].rad+b[j-1].rad)){
                    
//         //             b[j].vy*=-1;
//         //             b[j].vx*=-1;
//         //             b[j-1].vy*=-1;
//         //             b[j-1].vx*=-1;
                
//         //         }
//         //     //}

            

//         // }

//         //b.
//         // b.forEach(function(e){
//         //     for(var j=0;j<b.length;j++){
//         //         if(j!=b.indexOf(e)){
//         //             if(Math.sqrt(Math.pow((b[j].y -e.y), 2) + Math.pow((b[j].x - e.x), 2))<=(b[j].rad+e.rad)){
                    
//         //                             b[j].vy*=-1;
//         //                             b[j].vx*=-1;
//         //                             e.vy*=-1;
//         //                             e.vx*=-1;
                                
//         //                         }

//         //         }
//         //     }
            
//         // });

//         for(var p=0;p<=b.length-2;p++){
//             for(var q=p+1;q<=length-1;q++){
//                 if(Math.sqrt(Math.pow((b[p].y -b[q].y), 2) + Math.pow((b[p].x - b[q].x), 2))==(b[p].rad+b[q].rad)){
//                     b[p].vy*=-1;
//                     b[p].vx*=-1;
//                     b[q].vy*=-1;
//                     b[q].vx*=-1;
                    
//                 }
//             }
//         }

//         // b.forEach(function wallDetect(ele){

//         //     if(((ele.x-ele.rad) <=0) || ((ele.x+ele.rad)>=canvas.width)){
//         //         ele.vx*=-1;
//         //     }
//         //     if(((ele.y-ele.rad) <=0) || ((ele.y+ele.rad)>=canvas.height)){
//         //         ele.vy*=-1;
//         //     }
//         // });

//     }

//     function wall(){


//         b.forEach(function wallDetect(ele){

//             if(((ele.x-ele.rad) <=0) || ((ele.x+ele.rad)>=canvas.width)){
//                 ele.vx*=-1;
//             }
//             if(((ele.y-ele.rad) <=0) || ((ele.y+ele.rad)>=canvas.height)){
//                 ele.vy*=-1;
//             }
//         });
//     }

//     function checkClick(ev){

//         for(var k=0;k<=i;k++){
//             if(Math.sqrt(Math.pow((b[k].y - ev.offsetY), 2) + Math.pow((b[k].x - ev.offsetX), 2))<=(b[k].rad)){
//                 b[k].flag = true;
//                 b.splice(k,1);
//                 i--;

//             }
//         }

//     }

//     var generate = setInterval(function(){
//         //b.push(new Bubble());
//         pushBubble();

//         function pushBubble(){    
//             var nb = new Bubble();
//             // for(var s=0;s<=b.length;s++){
//             //     if(Math.sqrt(Math.pow((b[s].y - nb.y), 2) + Math.pow((b[s].x - nb.x), 2))<=(b[s].rad+nb.rad)){
//             //         pushBubble();
//             //         break;

//             //     }
//             //     b.push();
//             // }

//             b.forEach(function(e){
                
//                 if(Math.sqrt(Math.pow((e.y - nb.y), 2)) + Math.pow((e.x - nb.x), 2)<=(e.rad+nb.rad)){
//                     //pushBubble();
//                     nb.flag=true;
//                     //break;

//                 }

//                 // if(nb.flag==true){
//                 //     break;
//                 // }

//                 //b.push(nb);
                    

//             });
//             if(nb.flag==false){
//                 b.push(nb);
//             }
//             else{
//                 pushBubble();
//             }
//             //b.push(nb);

//         }
//         i++;
//         if(t>50){
//             t-=50;
//         }
//         //console.log(i);
//         console.log(b.length)
//     },t);

//     update();

//     function update(){
        
//         window.requestAnimationFrame(update);
//         ctx.clearRect(0,0,canvas.width, canvas.height);
//         b.forEach(function(ele){

//             if(ele.flag==false){

//                 ele.drawBubble();
//                 ele.updateBubble();

//             }

//         });

//         canvas.addEventListener('mousedown', checkClick);

//         wall();
//         //detectCollision();

//     }
// }


class Bubble{

    constructor(x,y,radius){
        this.rad = radius;
        this.x = x;
        this.y = y;
        this.vx = Math.random()*2 - 1;
        this.vy = Math.random()*2 - 1;
        this.flag=false;
    }

    update = function() {

        this.x += this.vx;
        this.y += this.vy;
        //this.draw();
    
    }

    draw = function() {

        var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.rad);
        gradient.addColorStop(0.8, 'rgb(0,68,255)');
        //gradient.addColorStop(0.9, 'rgb(116, 201, 235)');
        gradient.addColorStop(1, 'white');
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI*2);
        ctx.fill();        
    }
}



var b =new Array();


// var addTime = setInterval(function addBubble(){
    
//         var radius = Math.random()*20 + 30;
//         var x = Math.random()*(canvas.width-(2*radius)) + radius;
//         var y = Math.random()*(canvas.height-(2*radius)) + radius;
//         console.log(b.length);
//         if(b.length>0){
//             // for(var j=0; j<b.length;j++){
//             //     if(Math.sqrt(Math.pow((b[j].y - y), 2) + Math.pow((b[j].x - x), 2))<=(b[j].rad+radius)){
//             //         x = Math.random()*(canvas.width-(2*radius)) + radius;
//             //         y = Math.random()*(canvas.height-(2*radius)) + radius;
//             //         j=-1;
//             //     }
//             //     console.log(b.length);
//             // }
//             // b.forEach(function (e, ind){
//             //     if(Math.sqrt(Math.pow((e.y - y), 2) + Math.pow((e.x - x), 2))<=(e.rad+radius)){
//             //         x = Math.random()*(canvas.width-(2*radius)) + radius;
//             //         y = Math.random()*(canvas.height-(2*radius)) + radius;
//             //         //repeatfn(e);
//             //         ind = 0;
//             //     }
//             // });

//             var j=0;
//             while(j<b.length){
//                 if(Math.sqrt(Math.pow((b[j].y - y), 2) + Math.pow((b[j].x - x), 2))<=(b[j].rad+radius)){
//                     x = Math.random()*(canvas.width-(2*radius)) + radius;
//                     y = Math.random()*(canvas.height-(2*radius)) + radius;
//                     j=-1;
//                 }
//                 j++;

//             }
            
//         }
//         b.push(new Bubble(x, y, radius));
//         i++;
//         console.log(b.length);
//         function checkClick(ev){

//             for(var k=0;k<=i;k++){
//                 if(Math.sqrt(Math.pow((b[k].y - ev.offsetY), 2) + Math.pow((b[k].x - ev.offsetX), 2))<=(b[k].rad)){
//                     b[k].flag = true;
//                     b.splice(k,1);
//                     i--;
        
//                 }
//             }
        
//         }
//         // checkClick();
//         // b.forEach(function(bubble){
//         //     if(bubble.flag==false){
//         //     bubble.draw();
//         //     }
//         // });
    
//     t-=50;
// }, t);

// function checkClick(ev){

//     for(var k=0;k<=i;k++){
//         if(Math.sqrt(Math.pow((b[k].y - ev.offsetY), 2) + Math.pow((b[k].x - ev.offsetX), 2))<=(b[k].rad)){
//             b[k].flag = true;
//             b.splice(k,1);
//             i--;

//         }
//     }

// }

var add = setInterval(function(){

    if((pausekey==false) && (gameover == false)){
    
        addBubble();
    
        t-=50;
    }
},t);
function drawPause(){
    if(pausekey==false){
        ctx.beginPath();
        ctx.fillStyle = 'rgb(116, 201, 235)';
        ctx.rect(canvas.width - 50, 15,10,30);
        ctx.rect(canvas.width - 30, 15, 10, 30);
        ctx.fill();
        //ctx.closePath();
    }
    if(pausekey==true){
        ctx.beginPath();
        ctx.moveTo(canvas.width-50, 15);
        ctx.lineTo(canvas.width - 50, 45);
        ctx.lineTo(canvas.width - 20, 30);
        ctx.closePath();
        ctx.fillStyle = 'rgb(116, 201, 235)';
        ctx.fill();
    }
}



function addBubble(){
    var radius = Math.random()*25 + 25;
    var x = Math.random()*(canvas.width-(2*radius)) + radius;
    var y = Math.random()*(canvas.height-(2*radius)) + radius;
    //console.log(b.length);  
    
    if(b.length>0){
        var j=0;
        while(j<b.length){
            if(Math.sqrt(Math.pow((b[j].y - y), 2) + Math.pow((b[j].x - x), 2))<=(b[j].rad+radius)){
                x = Math.random()*(canvas.width-(2*radius)) + radius;
                y = Math.random()*(canvas.height-(2*radius)) + radius;
                j=-1;
            }
            j++;

        }
    }
    b.push(new Bubble(x, y, radius));
    i++;
    //console.log(i);
}

function checkClick(ev){

    if(pausekey==false){    
        for(var k=0;k<i;k++){
            if(Math.sqrt(Math.pow((b[k].y - ev.offsetY), 2) + Math.pow((b[k].x - ev.offsetX), 2))<=(b[k].rad)){
                b[k].flag = true;
                scoreCount(b[k]);
                b.splice(k,1);
                i--;

            }
        }
    }

    if((ev.offsetX>(canvas.width-50))&&(ev.offsetX<(canvas.width-20))){
        if(ev.offsetY>=15 && ev.offsetY<=45){
            if(pausekey===false){
                pausekey=true;
                
            }
            else {
                pausekey = false;
                animate();
            }
        }
    }

}

function scoreCount(e){
        
    score += (10 -((e.rad-25)/5));
    score = Math.floor(score);
    console.log(score);


    if (gameover == true){                           //If game over, push the score to scores[]
            
        scores.push(score);                         
        best = Math.max(...scores);              //Update best if applicable
        if(best>window.localStorage.getItem('best')){
        window.localStorage.setItem('best', JSON.stringify(best));
        }

    }


    //drawText();
}

function drawText(){

    ctx.font = '30px sans-serif';
    ctx.fillStyle = 'rgb(116, 201, 235)';
    
    ctx.fillText('SCORE',10,35);
    ctx.fillText(score, 10,75);
    console.log('drawScore()');
    
    ctx.fillText('BEST', 10, 115);
    if (window.localStorage.getItem == null){
        ctx.fillText('0', 10, 155);
    }
    else{
        ctx.fillText(window.localStorage.getItem('best'), 10, 155);
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

function wall(){


    b.forEach(function wallDetect(ele){

        if(((ele.x-ele.rad) <=0) || ((ele.x+ele.rad)>=canvas.width)){
            ele.vx*=-1;
        }
        if(((ele.y-ele.rad) <=0) || ((ele.y+ele.rad)>=canvas.height)){
            ele.vy*=-1;
        }
    });
}

function collision(){

    for(var l=0;l<i-1;l++){
        for(var m=l+1;m<i;m++){
            if(Math.sqrt(Math.pow((b[l].x - b[m].x),2)+Math.pow((b[l].y - b[m].y),2))<=(b[l].rad + b[m].rad)){
                
                var xd = b[m].x - b[l].x;
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

function checkArea(){

    var area= 0;
    for(var j = 0; j<i;j++){
        
        area += Math.PI * (Math.pow(b[j].rad,2));


    }
    var totalArea = canvas.width*canvas.height;
    var fractionArea = area / totalArea;
    console.log(fractionArea);
    if(fractionArea>0.3){
        gameover = true;
    }
}

//document.addEventListener('keydown',pause);

// function pause(e){  

//     switch(e.keyCode){
        
//         case 80:
            
//             if(pausekey===false){
//                 pausekey=true;
                
//             }
//             else {
//                 pausekey = false;
//                 animate();
//             }
//             console.log(pausekey);
            

//     }
// }

function animate(){
    if(gameover==false){
        if((pausekey==false)){
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
        
        //canvas.addEventListener('mousedown',checkClick);
    }
    canvas.addEventListener('mousedown',checkClick);
}

// b.forEach(function(bubble){
//     bubble.update();
// });
//addBubble();
//setInterval(addBubble,1000);