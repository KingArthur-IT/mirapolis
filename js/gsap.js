gsap.registerPlugin(ScrollTrigger);

const banerObj = document.querySelector('.baner'); 
const building = document.querySelector('.parallax__building'); 

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


ScrollTrigger.create({
  trigger: '.about__hero', 
  start: 'top top', 
  end: () => `bottom bottom`,
  pin: '.about__content',
  pinSpacing: false, 
  markers: true, 
});
