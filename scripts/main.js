let myImage = document.querySelector('#cat-xyl');
let num = 1;

function generateWish(){
    addr = ['肖宇梁','小月亮','梁梁','梁仔','鱼粮','梁咪']
    wish = ['暴富!!!','平安健康～','每天开心!','好吃好喝不长胖!']
    return '祝'.concat(get_random(addr), '2022', get_random(wish))
}

function randomColor(){
    color = ['#FFD700','#FF4500','#006400']
    return get_random(color)
}
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
  }

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/cat.jpg') {
      myImage.setAttribute('src', 'images/cat-head.gif');
    } else {
      myImage.setAttribute('src', 'images/cat.jpg');
    }
    let wish = document.querySelector('#Wishes');
    wish.style.color=randomColor();
    if (num % 5 == 0){

        wish.innerText = '肖宇梁是全天下最可爱的小猫咪！！！';
    }
    else{
        wish.innerText = generateWish();
    }
    num += 1;
    // alert('肖宇梁2022暴富！！！');
}

