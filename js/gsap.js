gsap.registerPlugin(ScrollTrigger);

const banerObj = document.querySelector('.baner'); 
const building = document.querySelector('.parallax__building'); 

//building parallax
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: banerObj,
    start: "top top", 
    end: '+=160', 
    scrub: true, 
  }
});

timeline.to(building, {
  top: '+=160', 
  ease: 'power1.out', 
  duration: 3 
});


// about
ScrollTrigger.create({
  trigger: '.about__hero', 
  start: 'top top', 
  end: () => `bottom bottom`,
  pin: '.about__content',
  pinSpacing: false, 
  markers: false, 
});

//advantages
// ScrollTrigger.create({
//   trigger: '.advantages__hero', 
//   start: 'top top', 
//   end: `bottom bottom`,
//   pin: '.about__content',
//   pinSpacing: false, 
//   markers: true, 
// });

//appartments
ScrollTrigger.create({
  trigger: '.appartments', 
  start: 'top top', 
  end: () => `bottom bottom`,
  pin: '.appartments__content',
  pinSpacing: true, 
  markers: true, 
});