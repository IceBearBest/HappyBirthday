let myImage = document.querySelector('#cat-xyl');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/cat.jpg') {
      myImage.setAttribute('src', 'images/cat-head.gif');
    } else {
      myImage.setAttribute('src', 'images/cat.jpg');
    }
    alert('肖宇梁2022暴富！！！')
}