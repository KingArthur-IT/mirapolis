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

  //call me name
  callUserNameWrapper.querySelector('input').addEventListener('focus', () => callUserNameWrapper.classList.add('focus'))
  callUserNameWrapper.querySelector('input').addEventListener('blur', (e) => {
    if (!e.target.value)
      callUserNameWrapper.classList.remove('focus')
  })

  //call me phone
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

  //close form
  const callModal = document.querySelector('.call-modal')
  document.querySelector('.call-modal__close').addEventListener('click', () => callModal.classList.remove('active'))
  callModal.addEventListener('click', () => callModal.classList.remove('active'))
  document.querySelector('.call-modal__hero').addEventListener('click', (e) => e.stopPropagation())

  //open
  document.querySelectorAll('.call-me-btn').forEach(el => el.addEventListener('click', () => {
    callModal.querySelector('.call-modal__form').classList.remove('sended')
    callModal.querySelector('.call-modal__success').classList.remove('active')
    callModal.classList.add('active')
  }))

  //submit call form
  callModal.querySelector('button.submit').addEventListener('click', (e) => {
    e.preventDefault()
    callModal.querySelector('.call-modal__success').classList.add('active')
    callModal.querySelector('.call-modal__form').classList.add('sended')
  })
});
