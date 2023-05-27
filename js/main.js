document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector('.menu')
  const callUserNameWrapper = document.querySelector('#call-name')
  const callUserPhoneWrapper = document.querySelector('#call-phone')

  //burger
  document.querySelector('.header__burger').addEventListener('click', (e) => {
    e.target.classList.toggle('active')
    menu.classList.toggle('active')
    document.querySelector('body').classList.toggle('overflow-hidden')
  })

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
  document.querySelector('.call-modal__close').addEventListener('click', closeCallForm )
  callModal.addEventListener('click', closeCallForm)
  document.querySelector('.call-modal__hero').addEventListener('click', (e) => e.stopPropagation())

  //open call me form
  document.querySelectorAll('.call-me-btn').forEach(el => el.addEventListener('click', () => {
    callModal.querySelector('.call-modal__form').classList.remove('sended')
    callModal.querySelector('.call-modal__success').classList.remove('active')
    callModal.classList.add('active')
    document.querySelector('body').classList.add('overflow-hidden')
  }))

  //submit call me form
  callModal.querySelector('button.submit').addEventListener('click', (e) => {
    e.preventDefault()
    callModal.querySelector('.call-modal__success').classList.add('active')
    callModal.querySelector('.call-modal__form').classList.add('sended')
  })
});
