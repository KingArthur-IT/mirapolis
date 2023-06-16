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

//appartments
// ScrollTrigger.create({
//   trigger: '.appartments', 
//   start: 'top top', 
//   end: () => `bottom bottom`,
//   pin: '.appartments__content',
//   pinSpacing: false, 
//   markers: false, 
// });

//advantages
// Задайте селекторы для ваших колонок с картинками
const img1 = document.querySelector('.advantages__left-list .advantages__item');
const img2 = document.querySelectorAll('.advantages__left-list .advantages__item')[1];
const img3 = document.querySelector('.advantages__right-list .advantages__item');
const img4 = document.querySelectorAll('.advantages__right-list .advantages__item')[1];

const animation1 = gsap.fromTo(
  img1,
  { y: 100 }, // Начальные стили
  { y: 0, duration: 1, ease: 'power1.out' } // Конечные стили и параметры анимации
);

const animation2 = gsap.fromTo(
  img2,
  { y: 100 }, // Начальные стили
  { y: 0, duration: 1, ease: 'power3.out' } // Конечные стили и параметры анимации
);


const animation3 = gsap.fromTo(
  img3,
  { y: 150, }, // Начальные стили
  { y: 0, duration: 1, ease: 'power2.out' } // Конечные стили и параметры анимации
);

const animation4 = gsap.fromTo(
  img4,
  { y: 150, }, // Начальные стили
  { y: 0, duration: 1, ease: 'power2.out' } // Конечные стили и параметры анимации
);

ScrollTrigger.create({
  trigger: img1, // Триггер первой колонки
  start: 'top 80%', // Начало анимации при достижении 80% высоты триггера
  animation: animation1, // Анимация для первой колонки
  scrub: true, // Включение плавного скролла анимации
});

ScrollTrigger.create({
  trigger: img2, // Триггер второй колонки
  start: 'top 80%', // Начало анимации при достижении 80% высоты триггера
  animation: animation2, // Анимация для второй колонки
  scrub: true, // Включение плавного скролла анимации
});

// Задайте триггеры для запуска анимации
ScrollTrigger.create({
  trigger: img3, // Триггер первой колонки
  start: 'top 80%', // Начало анимации при достижении 80% высоты триггера
  animation: animation3, // Анимация для первой колонки
  scrub: true, // Включение плавного скролла анимации
});

ScrollTrigger.create({
  trigger: img4, // Триггер второй колонки
  start: 'top 80%', // Начало анимации при достижении 80% высоты триггера
  animation: animation4, // Анимация для второй колонки
  scrub: true, // Включение плавного скролла анимации
});
