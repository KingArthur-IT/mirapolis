document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0 ,0)
  
  const menu = document.querySelector('.menu')
  const callUserNameWrapper = document.querySelector('#call-name')
  const callUserPhoneWrapper = document.querySelector('#call-phone')

  // --- burger ---
  document.querySelector('.header__burger').addEventListener('click', (e) => {
    e.target.classList.toggle('active')
    menu.classList.toggle('active')
    document.querySelector('body').classList.toggle('overflow-hidden')
  })

  // --- menu item ---
  menu.querySelectorAll('.menu__item').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelector('.header__burger').classList.remove('active')
      menu.classList.remove('active')
      document.querySelector('body').classList.remove('overflow-hidden')
      document.querySelector('.parallax').classList.add('moved')
      document.querySelectorAll('.about__title').forEach(el => el.classList.add('shown'))
    })
  })

  // --- call me form ---
  //call me name input focus
  callUserNameWrapper.querySelector('input').addEventListener('focus', () => callUserNameWrapper.classList.add('focus'))
  callUserNameWrapper.querySelector('input').addEventListener('blur', (e) => {
    if (!e.target.value)
      callUserNameWrapper.classList.remove('focus')
  })

  //call me phone input focus
  callUserPhoneWrapper.querySelector('input').addEventListener('focus', () => {
    callUserPhoneWrapper.querySelector('label').innerHTML = 'Ваш телефон'
    callUserPhoneWrapper.classList.add('focus')
  })
  callUserPhoneWrapper.querySelector('input').addEventListener('blur', (e) => {
    if (!e.target.value) {
      callUserPhoneWrapper.querySelector('label').innerHTML = '+7 (___) ___ - __ - __'
      callUserPhoneWrapper.classList.remove('focus')
    }
  })
  //call me phone validation
  callUserPhoneWrapper.querySelector('input').addEventListener('input', () => {
    const value = callUserPhoneWrapper.querySelector('input').value.replace(/\D+/g, "");
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

    callUserPhoneWrapper.querySelector('input').value = result;
  })

  //close call me form
  const callModal = document.querySelector('.call-modal')
  const closeCallForm = () => {
    document.querySelector('body').classList.remove('overflow-hidden')
    callModal.classList.remove('active')
  }
  const openCallForm = (title) => {
    callModal.querySelector('.call-modal__form').classList.remove('sended')
    callModal.querySelector('.call-modal__success').classList.remove('active')
    callModal.classList.add('active')
    document.querySelector('body').classList.add('overflow-hidden')
    callModal.querySelector('.call-modal__title').innerHTML = title
  }

  document.querySelectorAll('.call-me-btn').forEach(el => el.addEventListener('click', () => {
    openCallForm('Заказать звонок')
  }))
  document.querySelector('.give-me-booklet-btn').addEventListener('click', () => {
    openCallForm('Получить буклет')
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
    document.querySelector('body').classList.remove('overflow-hidden')
    liveModal.classList.remove('active')
    document.querySelectorAll('.live-modal__item iframe').forEach(frame => frame.removeAttribute('src'))
  }
  liveModal.addEventListener('click', closeLiveModal)
  document.querySelector('.live-modal__hero').addEventListener('click', (e) => e.stopPropagation())

  //open
  document.querySelectorAll('.show-live-btn').forEach(el => el.addEventListener('click', () => {
    const frameSrc = [
      'https://www.youtube.com/embed/Rl9bWV0ZA4I',
      'https://www.youtube.com/embed/Rl9bWV0ZA4I',
      'https://www.youtube.com/embed/Rl9bWV0ZA4I',
    ]
    document.querySelectorAll('.live-modal__item iframe').forEach((frame, index) => {
      frame.setAttribute('src', frameSrc[index])
    })
    liveModal.classList.add('active')
    document.querySelector('body').classList.add('overflow-hidden')
  }))
});
