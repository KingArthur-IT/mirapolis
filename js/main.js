document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector('.menu')

  document.querySelector('.header__burger').addEventListener('click', (e) => {
    e.target.classList.toggle('active')
    menu.classList.toggle('active')
  })

});