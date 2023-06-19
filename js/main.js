const addTransform = (query, value) => {
  document.querySelector(query).style.transform = `translateY(${ -value }px)`
}

document.addEventListener("DOMContentLoaded", () => {
  //cursor
  const follower = document.querySelector('#cursor');
  const followerShadow = document.querySelector('#cursor-shadow');
  isCursorChangeDisable = false

  // Текущие координаты элемента
  let currentX = 0;
  let currentY = 0;

  // Целевые координаты элемента
  let targetX = 0;
  let targetY = 0;

  let xVal = 0
  let yVal = 0

  // Коэффициент инерции
  const inertia = 1;
  const radius = 100; // Здесь можно задать нужный радиус
  
  document.addEventListener('mousemove', function(event) {
    if (document.querySelector('#cursor-shadow').classList.contains('hide')) {
      setTimeout(() => {
        document.querySelector('#cursor-shadow').classList.remove('hide')
      }, 100);
      followerShadow.style.transform = `translate3d(${event.clientX - 50}px, ${event.clientY - 35}px, 0)`;
    }

    // Вычисление расстояния от исходной позиции до текущих координат курсора
    const dx = event.clientX - currentX;
    const dy = event.clientY - currentY;

    // var currentX = event.clientX;
    // var currentY = event.clientY;

    follower.style.left = event.clientX + 'px';
    follower.style.top = event.clientY + 'px';

    if (!isCursorChangeDisable) {
      if (event.clientY - yVal > 0) {
        follower.classList.remove('up')
        follower.classList.add('down')
      }
      else {
        follower.classList.remove('down')
        follower.classList.add('up')
      }
    }

    xVal = event.clientX;
    yVal = event.clientY;

    // Вычисление расстояния от исходной позиции до текущих координат курсора, ограниченное радиусом
    const distance = Math.sqrt(dx * dx + dy * dy);
    const limitedDistance = Math.min(distance, radius);

    // Вычисление направления движения курсора
    const angle = Math.atan2(dy, dx);

    // Вычисление целевых координат элемента
    targetX = currentX + Math.cos(angle) * limitedDistance;
    targetY = currentY + Math.sin(angle) * limitedDistance;
  });


  // Функция анимации элемента
  function animate() {
    // Вычисление расстояния между текущими и целевыми координатами
    const dx = targetX - currentX;
    const dy = targetY - currentY;

    // Вычисление расстояния для сглаживания
    const vx = dx * inertia;
    const vy = dy * inertia;

    // Обновление текущих координат элемента
    currentX += vx;
    currentY += vy;

    // Применение новых координат к элементу
    followerShadow.style.transform = `translate3d(${currentX - 50}px, ${currentY - 35}px, 0)`;

    // Рекурсивный вызов функции анимации
    requestAnimationFrame(animate);
  }
  animate()

  const pointerArr = [...document.querySelectorAll('.btn'), ...document.querySelectorAll('a'), ...document.querySelectorAll('input'), ...document.querySelectorAll('.video-modal'), ...document.querySelectorAll('.live-modal')]

  pointerArr.forEach(el => el.addEventListener('mouseenter', () => {
    isCursorChangeDisable = true
    follower.classList.add('pointer')
  }))
  pointerArr.forEach(el => el.addEventListener('mouseleave', () => {
    isCursorChangeDisable = false
    follower.classList.remove('pointer')
  }))


  const menu = document.querySelector('.menu')
  const callUserNameWrapper = document.querySelectorAll('.call-name')
  const callUserPhoneWrapper = document.querySelectorAll('.call-phone')

  // --- burger ---
  document.querySelector('.header__burger').addEventListener('click', (e) => {
    e.target.classList.toggle('active')
    menu.classList.toggle('active')
    document.querySelector('.header').classList.toggle('disabled')
    document.querySelector('body').classList.toggle('overflow-hidden')
    if (menu.classList.contains('active')) { //animation effect
      document.querySelector('main').classList.add('showMenu')
      addTransform('main', -window.innerHeight)
    }
    else {
      addTransform('main', 0)
      document.querySelector('.header').classList.add('menu-close')
      setTimeout(() => {
        document.querySelector('main').classList.remove('showMenu')
        document.querySelector('.header').classList.remove('menu-close')
      }, 1000);
    }
  })

  // --- menu item ---
  menu.querySelectorAll('.menu__item').forEach(el => {
    el.addEventListener('click', () => {
      addTransform('main', 0)
      const anchorName = el.getAttribute('data-anchor')
      const section = document.getElementById(anchorName)

      const offset = 0;
      const sectionTop = section.offsetTop - offset;

      setTimeout(() => {
        window.scrollTo({
          top: sectionTop,
          behavior: 'instant'
        });
        menu.classList.remove('active')
      }, 200);

      document.querySelector('.header__burger').classList.remove('active')
      document.querySelector('body').classList.remove('overflow-hidden')
      document.querySelector('.header').classList.toggle('disabled')
      document.querySelector('.header').classList.add('menu-close')
      setTimeout(() => {
        document.querySelector('main').classList.remove('showMenu')
        document.querySelector('.header').classList.remove('menu-close')
      }, 1000);
    })
  })

  // --- call me form ---
  //call me name input focus
  callUserNameWrapper.forEach(el => {
    el.querySelector('input').addEventListener('focus', () => el.classList.add('focus'))
  }) 
  callUserNameWrapper.forEach(el => {
    el.querySelector('input').addEventListener('blur', (e) => {
      if (!e.target.value)
        el.classList.remove('focus')
    })
  })

  //call me phone input focus
  callUserPhoneWrapper.forEach(el => {
    el.querySelector('input').addEventListener('focus', () => {
      el.querySelector('label').innerHTML = 'Ваш телефон'
      el.classList.add('focus')
    })
  })
  callUserPhoneWrapper.forEach(el => {
    el.querySelector('input').addEventListener('blur', (e) => {
      if (!e.target.value) {
        el.querySelector('label').innerHTML = '+7 (___) ___ - __ - __'
        el.classList.remove('focus')
      }
    })
  })
  //call me phone validation
  callUserPhoneWrapper.forEach(el => {
    el.querySelector('input').addEventListener('input', () => {
      const value = el.querySelector('input').value.replace(/\D+/g, "");
      const numberLength = 11;
      let result = '+';
  
      for (let i = 0; i < value.length && i < numberLength; i++) {
          switch (i) {
          case 0:
              result += '7 ('
              continue;
          case 4:
              result += ") ";
              break;
          case 7:
              result += "-";
              break;
          case 9:
              result += "-";
              break;
          default:
              break;
          }
          result += value[i];
      }
  
      el.querySelector('input').value = result;
    })
  })

  //close call me form
  const callModal = document.querySelector('.call-modal')
  const closeCallForm = () => {
    callModal.classList.remove('active')
    document.querySelector('body').classList.remove('overflow-hidden')
  }
  const openCallForm = (title) => {
    callModal.querySelector('.call-modal__form').classList.remove('sended')
    callModal.querySelector('.call-modal__success').classList.remove('active')
    callModal.classList.add('active')
    callModal.querySelector('.call-modal__title').innerHTML = title
    document.querySelector('body').classList.add('overflow-hidden')
  }

  document.querySelectorAll('.call-me-btn').forEach(el => el.addEventListener('click', () => {
    openCallForm('Заказать звонок')
  }))
  document.querySelector('.give-me-booklet-btn').addEventListener('click', () => {
    openCallForm('Получить буклет')
  })
  document.querySelector('.give-me-consult-btn').addEventListener('click', () => {
    openCallForm('Получить консультацию')
  })

  document.querySelector('.call-modal__close').addEventListener('click', closeCallForm )
  callModal.addEventListener('click', closeCallForm)
  document.querySelector('.call-modal__hero').addEventListener('click', (e) => e.stopPropagation())

  //submit call me form
  callModal.querySelector('button.submit').addEventListener('click', (e) => {
    e.preventDefault()
    callModal.querySelector('.call-modal__success').classList.add('active')
    callModal.querySelector('.call-modal__form').classList.add('sended')
  })

  // --- live modal ---
  const liveModal = document.querySelector('.live-modal')
  //close
  const closeLiveModal = () => {
    liveModal.classList.remove('active')
    document.querySelector('body').classList.remove('overflow-hidden')
  }
  liveModal.addEventListener('click', closeLiveModal)
  document.querySelector('.live-modal__hero').addEventListener('click', (e) => e.stopPropagation())
  document.querySelector('.live-close').addEventListener('click', () => closeLiveModal())

  //open
  document.querySelectorAll('.show-live-btn').forEach(el => el.addEventListener('click', () => {
    liveModal.classList.add('active')
    document.querySelector('body').classList.add('overflow-hidden')
  }))


  //video modal
  const videoModal = document.querySelector('.video-modal')
  //close
  const closeVideoModal = () => {
    videoModal.classList.remove('active')
    document.querySelector('body').classList.remove('overflow-hidden')
  }
  videoModal.addEventListener('click', closeVideoModal)
  document.querySelector('.video-modal__hero').addEventListener('click', (e) => e.stopPropagation())
  document.querySelector('.video-modal__close').addEventListener('click', () => closeVideoModal())

  //open
  document.querySelectorAll('.show-video-btn').forEach(el => el.addEventListener('click', () => {
    videoModal.classList.add('active')
    document.querySelector('body').classList.add('overflow-hidden')
  }))

  //video
  // if (Hls.isSupported()) {
  //   var video = document.getElementById('video1');
  //   var hls = new Hls();
  //   hls.loadSource('https://rtsp.me/b309eed7-4fa6-4029-8c18-3b1e0002c67d');
  //   hls.attachMedia(video);
  //   hls.on(Hls.Events.MANIFEST_PARSED, function () {
  //     video.play();
  //   });
  // }
  // else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  //   video.src = ' ';
  //   video.addEventListener('loadedmetadata', function () {
  //     video.play();
  //   });
  // }

  const moreButton = document.querySelector('.news__more');
  const newsWrapper = document.querySelector('.news__wrapper');

  function copyAndAppendNewsItem() {
    const newsItem = document.querySelector('.news__item');
    const clonedNewsItem = newsItem.cloneNode(true);
    newsWrapper.appendChild(clonedNewsItem);
  }

  moreButton.addEventListener('click', copyAndAppendNewsItem);


  //form send in contacts section
  document.querySelector('.contacts__form .submit').addEventListener('click', e => {
    e.preventDefault()
    document.querySelector('.contacts__success').classList.add('active')
    document.querySelector('.contacts__form').classList.add('sended')
  })


  //--- modal gallery ---
  let galleryTimer = null
  const maxGalleryTimer = 5000
  const timerGalleryStep = 100
  let timerGalleryIteration = 1
  let timerGalleryProcess = 0
  let isTimeLineRunning = false

  //open
  const galleryIntervalFunc = () => {
    timerGalleryIteration ++
    timerGalleryProcess = Math.round(100 * (timerGalleryIteration * timerGalleryStep) / maxGalleryTimer)
    document.querySelector('.gallery-modal__timeline .line').style.width = `${timerGalleryProcess}%`
    
    if (timerGalleryProcess > 100) {
      document.querySelector('.gallery-modal .controls__item.left').click()
      timerGalleryIteration = 0
      isTimeLineRunning = false
    }
  }

  setTimeout(() => { //ждем загрузку карусели чтоб работал клик по клонам
    document.querySelectorAll('.gallery__details').forEach((el, index) => el.addEventListener('click', () => {
      const imgIndex = el.getAttribute('data-img-index')
      // if (imgIndex > 0)
      //   for (let index = 0; index < imgIndex; index++)
      //     document.querySelector('.gallery-modal .controls__item.left').click()
      

      document.querySelector('.gallery-modal').classList.add('active')
  
      setTimeout(isTimeLineRunning = true, 300);  //start running after delay
  
      galleryTimer = setInterval(() => {
        if (isTimeLineRunning) {
          galleryIntervalFunc()
        } else {
          timerGalleryIteration = 0
          timerGalleryProcess = 0
          setTimeout(document.querySelector('.gallery-modal__timeline .line').style.width = 0, 200);
          setTimeout(isTimeLineRunning = true, 500);
        }
      }, timerGalleryStep);
    }))
  }, 2000);


  //play/pause btn
  const galleryModalPlayBtn = document.querySelector('.gallery-modal__play')
  galleryModalPlayBtn.addEventListener('click', () => {
    isPlaying = galleryModalPlayBtn.classList.contains('active')
    galleryModalPlayBtn.classList.toggle('active')
    if (isPlaying)
      clearInterval(galleryTimer)
    else {
      galleryTimer = setInterval(() => {
        galleryIntervalFunc()
      }, timerGalleryStep);
    }
  })

  //close
  document.querySelector('.gallery-modal__close').addEventListener('click', () => {
    document.querySelector('.gallery-modal').classList.remove('active')
    clearInterval(galleryTimer)
    timerGalleryProcess = 0
    timerGalleryIteration = 0
    document.querySelector('.gallery-modal__timeline .line').style.width = 0
  })
});