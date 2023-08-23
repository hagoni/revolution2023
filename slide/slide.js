const slide = document.querySelector('.slide');
const home = document.querySelector('.home');
const swiperDOM = document.querySelector('.swiper');
const slideItem = document.querySelectorAll('.swiper-slide');
let trigger = false;
let options = {
  // threshold: 1.0,
}
let detector;

const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.intersectionRatio == 0) {
      slide.style.position = 'sticky';
      trigger = true;
      window.addEventListener("wheel", function(e){
        e.preventDefault();
      }, {passive : false});
    }
  })
}, options);

io.observe(home);

let counter = 1;
let deltaX;
window.addEventListener('wheel', (e) => {
  if(trigger && (e.wheelDeltaY < 0)) {
    console.log(counter);
    slideItem.forEach(el => {
      el.style.transform = `translateX(-${counter * 500}px)`;
    });
    deltaX = counter * 500;
    counter++;
  } else if(trigger && (e.wheelDeltaY > 0)) {
    slideItem.forEach(el => {
      el.style.transform = `translateX(${deltaX - 500}px)`;
    });
    counter++;
  }
});



