var currentScrollValue = 0
var scrollDirection = 1

const buildingBreakpoint = 160

const baner = document.querySelector('.baner')

const topOffset = (el) => { //?
    const rect = el.getBoundingClientRect()
    return rect.top 
}

window.addEventListener("load", () => {
    //baner start animations
    setTimeout(() => {
        document.querySelector('.baner__title').classList.add('shown')
        document.querySelector('.baner__label').classList.add('shown')
        setTimeout(() => {
            document.querySelector('.header').classList.add('shown')
        }, 400);
        document.querySelector('.baner__hero').classList.add('shown')
        document.querySelector('.parallax').classList.add('shown')
        document.querySelector('.parallax__live').classList.add('shown')
    }, 300);

    // if (window.innerWidth < 769) {
    //     document.querySelector('body').classList.remove('overflow-hidden')
    //     window.addEventListener('scroll', () => {
    //         animOnScrollMobile()
    //     }, { passive: true })
    //     document.addEventListener("touchmove", touchMoveHandler); 
    // }
    // else {
        // document.querySelector('body').addEventListener('scroll', scrollEvent)
        document.addEventListener('scroll', scrollEvent)
    // }
});

function scrollEvent() {
    const newScrollVal = -topOffset(baner)
    scrollDirection = Math.sign(newScrollVal - currentScrollValue)
    currentScrollValue = newScrollVal

    console.log(currentScrollValue);

    // buildingParallaxEffect()
    headerEffects()
    fullScreenAnimation()
    animOnScroll()
    // changeBgColor()
    // aboutAnimation()
    
}

function buildingParallaxEffect() {
    if (currentScrollValue < buildingBreakpoint) {
        if (currentScrollValue % 2 === 0)
            document.querySelector('.parallax__building').style.marginTop = `${ currentScrollValue }px`
    }
}

//------------------------------------------------------------------

function fullScreenAnimation() {
    if (currentScrollValue > buildingBreakpoint && scrollDirection > 0) {
        showFullScreenAnimation()
    }
    if (currentScrollValue < buildingBreakpoint && scrollDirection < 0) {
        hideFullScreenAnimation()
    }
}

function showFullScreenAnimation() {
    const parallaxSection = document.querySelector('.parallax');
    const parallaxWrapper = parallaxSection.querySelector('.parallax__img-wrapper');

    parallaxWrapper.classList.add('full')
    parallaxSection.classList.add('hide')
    document.querySelector('.header').classList.remove('shown')
}

function hideFullScreenAnimation() {
    const parallaxSection = document.querySelector('.parallax');
    const parallaxWrapper = parallaxSection.querySelector('.parallax__img-wrapper');

    parallaxWrapper.classList.remove('full')
    parallaxSection.classList.remove('hide')
}

//------------------------------------------------------------------

function headerEffects() {
    if (currentScrollValue > document.querySelector('header').clientHeight && scrollDirection > 0) {
        document.querySelector('header').classList.remove('shown')
        document.querySelector('header').classList.remove('fill')
    }
    if (scrollDirection < 0) {
        document.querySelector('header').classList.add('shown')
        document.querySelector('header').classList.add('fill')
    }
}

//------------------------------------------------------------------

function changeBgColor() {
    const section = document.querySelector('.map')
    const offset = topOffset(section)
    const animStartPoint = window.innerHeight

    if (offset < animStartPoint){ // && offset > -section.clientHeight) {
        document.querySelector('main').classList.add('dark')
        document.querySelector('header').classList.add('dark')
    } else {
        document.querySelector('main').classList.remove('dark')
        document.querySelector('header').classList.remove('dark')
    }
}

//------------------------------------------------------------------

function animOnScroll() {
    const animItems = document.querySelectorAll('.anim-item');

    for (let index = 0; index < animItems.length; index++) {
        const item = animItems[index];
        const animItemOffsetTop = topOffset(item)

        // const animStartPoint = item.classList.contains('about__title') ? -400 : window.innerHeight / 2
        const animStartPoint = window.innerHeight
  
        if (animItemOffsetTop < animStartPoint ) {
            //если это не title
            if (!item.classList.contains('anim-title') && !item.classList.contains('anim-title-active'))
                item.classList.add('anim-active')
            //для title
            else if (!item.classList.contains('anim-title-active') && !item.classList.contains('delay-1')) { //если еще не активная или не вторая строка
                splitText(item) //добавить анимация слова
                if (item.classList.contains('about__title')) { //если среагировало на текст в первой строке about то запустить вторую
                    const secondLine = document.querySelector('.about__title.anim-item.anim-title.delay-1')
                    setTimeout(() => {
                        splitText(secondLine)
                    }, 1000);
                }
            }
        }
    }
}

function splitText(item) {
    const text = item.innerHTML
    item.innerHTML = ''
    text.split('').forEach((letter, ind) => {
        const div = document.createElement('div');
        div.style = `transform: translateY(100%); transition: transform .5s ease-in-out ${ind / 30}s`
        
        div.innerHTML = letter === ' ' ? '&nbsp;' : letter;                  
        item.append(div)
    })
    item.classList.add('anim-title-active')
    setTimeout(() => {
        item.classList.add('anim-active')
    }, 100);
}

// --------------------------------------------------------------------

function aboutAnimation() {
    const section = document.querySelector('.about__hero')
    const offset = topOffset(section)
    const animStartPoint = window.innerHeight / 4

    if (offset < animStartPoint){ // && offset > -section.clientHeight) {
        console.log(offset);
        const scaleVal = -0.2 * (offset - animStartPoint) / section.clientHeight + 1
        const translateYVal = 1000 * (offset - animStartPoint) / section.clientHeight
        section.querySelectorAll('.about__img img').forEach(el => {
            el.style.transform = `scale(${scaleVal})`
        })
        section.querySelectorAll('.about__img').forEach((el, i) => {
            el.style.transform = `translateY(${translateYVal }px)` //+ translateYVal * (3 - i) * 2
        })
    }
}