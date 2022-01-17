window.onload = window.onresize = function () {
    var canvas = document.getElementById('fireworks-canvas');
    var barrage_canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    barrage_canvas.width = canvas.width;
    barrage_canvas.height = canvas.height*0.5;
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
    let barrage = new Barrage('canvas');
    barrage.draw();
    let myImage = document.querySelector('#cat-xyl');
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
    }
};

function generateWish(){
    addr = ['肖宇梁','小月亮','梁梁','梁仔','鱼粮','梁咪']
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
