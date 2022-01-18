window.onload = window.onresize = function () {
    // reset size of canvas
    var canvas = document.getElementById('fireworks-canvas');
    var barrage_canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    barrage_canvas.width = canvas.width;
    barrage_canvas.height = canvas.height*0.3;
    //start the firework
    var firework = JS_FIREWORKS.Fireworks({
        id : 'fireworks-canvas',
        hue : 120,
        particleCount : 300,
        delay : 0,
        minDelay : 20,
        maxDelay : 40,
        boundaries : { // of respawn and target
            top: 50,
            bottom: 240,
            left: 50,
            right: canvas.width
        },
        fireworkSpeed : 3,
        fireworkAcceleration : 1.03,
        particleFriction : 0.96,
        particleGravity : 2.0
    });
    firework.start();
    //start the barrage
    let barrage = new Barrage('canvas');
    barrage.draw();
    let myImage = document.querySelector('#cat-matrix');
    let reset_next = false;
    myImage.onclick = function() {
        let mySrc = myImage.getAttribute('src');
        if(mySrc === 'images/cat.jpg') {
        myImage.setAttribute('src', 'images/cat-head.gif');
        } else {
        myImage.setAttribute('src', 'images/cat.jpg');
        }
        let wish = document.querySelector('#Wishes');
        wish.style.color=barrage.getColor();
        wish.innerText = generateWish();
        barrage.shoot(wish.innerText);
        if (reset_next){
            resetImages(images);
        }
        reset_next = shouldReset();
    }
};

function generateWish(){
    addr = ['肖宇梁','小月亮','梁梁','鱼粮','梁咪']
    wish = ['暴富!!!','平安健康～','每天开心!','好吃好喝不长胖!','牙牙健康白又壮','越来越帅','拍戏顺利！','可可爱爱']
    return ''.concat(get_random(addr), '2022', get_random(wish))
}

function randomColor(){
    color = ['#FFD700','#FF4500','#006400','#483D8B','#2F4F4F','#FF8C00','#6495ED']
    return get_random(color)
}
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
  }
document.addEventListener('click', musicPlay);
function musicPlay() {
      document.getElementById('hp_audio').play();
      document.removeEventListener('click', musicPlay);
}

 // show the cat images
 let cat_div = document.getElementById('cat-matrix');
 var images =new Array(9);
 for (let i = 0; i < 3; i++){
     let row_div = document.createElement('div');
     row_div.classList.add('row');
     cat_div.appendChild(row_div);
     for (let j=0; j < 3; j++){
         let col_div = document.createElement('div');
         col_div.classList.add('col');
         row_div.appendChild(col_div);
         let k = i*3+j;
         images[k] = document.createElement('img');
         col_div.appendChild(images[k]);   
     }
 }
 resetImages(images);
 for (let i=0; i < 9; i++){
     images[i].onclick=function(){
        let mySrc = images[i].getAttribute('src');
        images[i].setAttribute('src', mySrc.replace('_cat.','_xyl.'));
     }
 }
 function resetImages(images){
     var used = [];
     var excluded = [26,24,16]
     let max_idx = 38;
     let format = 'JPG';
     for (let i=0; i<9; i++){
         if (i == 4){
             max_idx = 3;
             format = 'GIF';
         }
         else{
             max_idx = 38;
             format = 'JPG';
         }
         let num = Math.floor((Math.random()*max_idx));
         while (used.includes(num)|| excluded.includes(num+1)){
            num = Math.floor((Math.random()*max_idx));
         }
         used.push(num);
         images[i].setAttribute('src', 'images/cat-sim/'.concat(String(num+1).padStart(2,'0'), '_cat.', format));
     }
 }

 function shouldReset(){
     let num_left = 0;
     for (let i = 0; i < 9; i++){
        let mySrc = images[i].getAttribute('src');
        if (mySrc.includes('_cat')){
            num_left += 1;
        }
     }
     return num_left == 0;
 }