var canvas = document.querySelector('.canvas');
canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight-10;

var ctx = canvas.getContext('2d');

var t = 1000, i = 0;

//init();

function init(){
    
    class Bubble{

        constructor(){
            
            this.rad = Math.floor((Math.random() * 40) + 60);
            this.x = Math.floor((Math.random() * (canvas.width - (2*this.rad))) + this.rad);
            this.y = Math.floor((Math.random() * (canvas.height - (2*this.rad))) + this.rad);
            this.vx = Math.floor((Math.random() * 10) - 5);
            this.vy = Math.floor((Math.random() * 10) - 5);
            this.flag = false;
        
        }

        drawBubble(){
            var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.rad);
            gradient.addColorStop(0.8, 'white');
            gradient.addColorStop(0.9, 'rgb(116, 201, 235)');
            gradient.addColorStop(1, 'white');
            ctx.fillStyle = gradient;

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.rad, 0, Math.PI*2);
            ctx.fill();
            
        }

        updateBubble(){

            this.x += this.vx;
            this.y += this.vy;
            
        }

    }

    var b = new Array();
    b[i] = new Bubble();
    //b.push(new Bubble());
    
    function detectCollision(){

        // for (var j=b.length-1; j>0; j++){
        //     //if(b.length>j){
        //         if(Math.sqrt(Math.pow((b[j].y - b[j-1].y), 2) + Math.pow((b[j].x - b[j-1].x), 2))<=(b[j].rad+b[j-1].rad)){
                    
        //             b[j].vy*=-1;
        //             b[j].vx*=-1;
        //             b[j-1].vy*=-1;
        //             b[j-1].vx*=-1;
                
        //         }
        //     //}

            

        // }

        //b.
        // b.forEach(function(e){
        //     for(var j=0;j<b.length;j++){
        //         if(j!=b.indexOf(e)){
        //             if(Math.sqrt(Math.pow((b[j].y -e.y), 2) + Math.pow((b[j].x - e.x), 2))<=(b[j].rad+e.rad)){
                    
        //                             b[j].vy*=-1;
        //                             b[j].vx*=-1;
        //                             e.vy*=-1;
        //                             e.vx*=-1;
                                
        //                         }

        //         }
        //     }
            
        // });

        for(var p=0;p<=b.length-2;p++){
            for(var q=p+1;q<=length-1;q++){
                if(Math.sqrt(Math.pow((b[p].y -b[q].y), 2) + Math.pow((b[p].x - b[q].x), 2))==(b[p].rad+b[q].rad)){
                    b[p].vy*=-1;
                    b[p].vx*=-1;
                    b[q].vy*=-1;
                    b[q].vx*=-1;
                    
                }
            }
        }

        // b.forEach(function wallDetect(ele){

        //     if(((ele.x-ele.rad) <=0) || ((ele.x+ele.rad)>=canvas.width)){
        //         ele.vx*=-1;
        //     }
        //     if(((ele.y-ele.rad) <=0) || ((ele.y+ele.rad)>=canvas.height)){
        //         ele.vy*=-1;
        //     }
        // });

    }

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

    function checkClick(ev){

        for(var k=0;k<=i;k++){
            if(Math.sqrt(Math.pow((b[k].y - ev.offsetY), 2) + Math.pow((b[k].x - ev.offsetX), 2))<=(b[k].rad)){
                b[k].flag = true;
                b.splice(k,1);
                i--;

            }
        }

    }

    var generate = setInterval(function(){
        //b.push(new Bubble());
        pushBubble();

        function pushBubble(){    
            var nb = new Bubble();
            // for(var s=0;s<=b.length;s++){
            //     if(Math.sqrt(Math.pow((b[s].y - nb.y), 2) + Math.pow((b[s].x - nb.x), 2))<=(b[s].rad+nb.rad)){
            //         pushBubble();
            //         break;

            //     }
            //     b.push();
            // }

            b.forEach(function(e){
                
                if(Math.sqrt(Math.pow((e.y - nb.y), 2)) + Math.pow((e.x - nb.x), 2)<=(e.rad+nb.rad)){
                    //pushBubble();
                    nb.flag=true;
                    //break;

                }

                // if(nb.flag==true){
                //     break;
                // }

                //b.push(nb);
                    

            });
            if(nb.flag==false){
                b.push(nb);
            }
            else{
                pushBubble();
            }
            //b.push(nb);

        }
        i++;
        if(t>50){
            t-=50;
        }
        //console.log(i);
        console.log(b.length)
    },t);

    update();

    function update(){
        
        window.requestAnimationFrame(update);
        ctx.clearRect(0,0,canvas.width, canvas.height);
        b.forEach(function(ele){

            if(ele.flag==false){

                ele.drawBubble();
                ele.updateBubble();

            }

        });

        canvas.addEventListener('mousedown', checkClick);

        wall();
        //detectCollision();

    }
}