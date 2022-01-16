
class Barrage {
    constructor(canvas) {
        this.canvas = document.getElementById(canvas);
        let rect = this.canvas.getBoundingClientRect();
        this.w = rect.right - rect.left;
        this.h = rect.bottom - rect.top;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = '30px Microsoft YaHei';
        //this.ctx.font='ZCOOL KuaiLe';
        this.barrageList = [];
    }

    //添加弹幕列表
    shoot(value) {
        let top = this.getTop();
        let color = this.getColor();
        let offset = this.getOffset();
        let width = Math.ceil(this.ctx.measureText(value).width);

        let barrage = {
            value: value,
            top: top,
            left: this.w,
            color: color,
            offset: offset,
            width: width
        }
        this.barrageList.push(barrage);
    }

    //开始绘制
    draw() {
        if (this.barrageList.length) {
            this.ctx.clearRect(0, 0, this.w, this.h);
            for (let i = 0; i < this.barrageList.length; i++) {
                let b = this.barrageList[i];
                if (b.left + b.width <= 0) {
                    this.barrageList.splice(i, 1);
                    i--;
                    continue;
                }
                b.left -= b.offset;
                this.drawText(b);
            }
        }
        requestAnimationFrame(this.draw.bind(this));
    }

    //绘制文字
    drawText(barrage) {
        this.ctx.fillStyle = barrage.color;
        this.ctx.fillText(barrage.value, barrage.left, barrage.top);
    }

    //获取随机颜色
    getColor() {
        return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    }

    //获取随机top
    getTop() {
        //canvas绘制文字x,y坐标是按文字左下角计算，预留30px
        return Math.floor(Math.random() * (this.h - 30)) + 30;
    }

    //获取偏移量
    getOffset() {
        return +(Math.random() * 4).toFixed(1) + 1;
    }
}
function generateWish(){
    addr = ['肖宇梁','小月亮','梁梁','梁仔','鱼粮','梁咪']
    wish = ['暴富!!!','平安健康～','每天开心!','好吃好喝不长胖!']
    return '祝'.concat(get_random(addr), '2022', get_random(wish))
}

function randomColor(){
    color = ['#FFD700','#FF4500','#006400','#483D8B','#2F4F4F','#FF8C00','#6495ED']
    return get_random(color)
}
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
  }

let barrage = new Barrage('canvas');
barrage.draw();
let myImage = document.querySelector('#cat-xyl');
let num = 1;

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/cat.jpg') {
      myImage.setAttribute('src', 'images/cat-head.gif');
    } else {
      myImage.setAttribute('src', 'images/cat.jpg');
    }
    let wish = document.querySelector('#Wishes');
    wish.style.color=barrage.getColor();
    if (num % 5 == 0){
        wish.innerText = '肖宇梁是全天下最可爱的小猫咪！！！';
    }
    else{
        wish.innerText = generateWish();
    }
    num += 1;
    barrage.shoot(wish.innerText);
}