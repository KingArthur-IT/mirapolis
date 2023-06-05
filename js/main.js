document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector('.menu')
  const callUserNameWrapper = document.querySelector('#call-name')
  const callUserPhoneWrapper = document.querySelector('#call-phone')

  // --- burger ---
  document.querySelector('.header__burger').addEventListener('click', (e) => {
    e.target.classList.toggle('active')
    menu.classList.toggle('active')
    document.querySelector('.header').classList.toggle('disabled')
    if (menu.classList.contains('active')) {
      document.querySelector('main').classList.add('showMenu')
      addTransform('main', -window.innerHeight)
    }
    else {
      addTransform('main', window.innerHeight)
      setTimeout(() => {
        document.querySelector('main').classList.remove('showMenu')
      }, 1000);
    }
  })

  // --- menu item ---
  menu.querySelectorAll('.menu__item').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelector('.header__burger').classList.remove('active')
      menu.classList.remove('active')
      document.querySelector('.header').classList.toggle('disabled')
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
    callModal.classList.remove('active')
  }
  const openCallForm = (title) => {
    callModal.querySelector('.call-modal__form').classList.remove('sended')
    callModal.querySelector('.call-modal__success').classList.remove('active')
    callModal.classList.add('active')
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
    liveModal.classList.remove('active')
  }
  liveModal.addEventListener('click', closeLiveModal)
  document.querySelector('.live-modal__hero').addEventListener('click', (e) => e.stopPropagation())
  document.querySelector('.live-close').addEventListener('click', () => closeLiveModal())

  //open
  document.querySelectorAll('.show-live-btn').forEach(el => el.addEventListener('click', () => {
    liveModal.classList.add('active')
    document.querySelector('body').classList.add('overflow-hidden')
  }))

  // --- эффект потери фокуса для кнопок ---
  const allBtns = document.querySelectorAll('.primary-btn')
  const allCloseFocusEffBtns = document.querySelectorAll('.close-focus-btn')
  // const inputsFocusEff = document.querySelectorAll('.call-modal__form input')
  allBtns.forEach(btn => btn.addEventListener('mouseleave', () => {
    btn.classList.add('leaved') //добавить эфф при уходе
  }))


  //убрать эффект при заходе на другие
  allBtns.forEach(btn => btn.addEventListener('mouseenter', () => {
    allBtns.forEach(b => b.classList.remove('leaved'))
  }))
  allCloseFocusEffBtns.forEach(btn => btn.addEventListener('mouseenter', () => {
    allBtns.forEach(b => b.classList.remove('leaved'))
  }))

  //убрать при клике на тело
  document.querySelector('body').addEventListener('click', () => {
    allBtns.forEach(b => b.classList.remove('leaved'))
  })
});