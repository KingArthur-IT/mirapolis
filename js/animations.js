var isScrollDisabled = false
var isAboutSliderScrolling = false
var aboutSliderScrollCounter = -1
var scrollYVal = 0
const buildingBreakpoint = 160
const buildingStartOffset = 200

const parallaxTopOffset = document.querySelector('.parallax__img-wrapper').getBoundingClientRect().top - buildingStartOffset
const placesTopOffset = document.querySelector('.places').getBoundingClientRect().top
const mapTopOffset = document.querySelector('.map').getBoundingClientRect().top

const aboutBeakpoint = { value: placesTopOffset, isPassed: false }
const aboutImgs = document.querySelectorAll('.about__img')

// ------------------------------------------------------------------------

const disableWheel = (ms) => {
    isScrollDisabled = true
    setTimeout(() => {
        isScrollDisabled = false
    }, ms);
}

const getTransformValue = (query) => {
    return Number(document.querySelector(query).style.transform.replace(/[^-\d]/g, ''))
}

const getMarginValue = (query) => {
    return Number(document.querySelector(query).style.marginTop.replace(/[^-\d]/g, ''))
}

const addTransform = (query, value) => {
    scrollYVal += value
    document.querySelector(query).style.transform = `translateY(${ -scrollYVal }px)`
}

const setTransform = (query, value) => {
    document.querySelector(query).style.transform = `translateY(${ -value }px)`
    scrollYVal = value
}

const topOffset = (el) => { //?
    const rect = el.getBoundingClientRect()
    return rect.top 
}

// -----------------------------------------------------------------

window.addEventListener("load", () => {
    //baner start animations
    setTimeout(() => {
        document.querySelector('.baner__title').classList.add('shown')
        document.querySelector('.baner__label').classList.add('shown')
        setTimeout(() => {
            document.querySelector('.header').classList.add('shown')
        }, 250);
        document.querySelector('.baner__hero').classList.add('shown')
        document.querySelector('.parallax').classList.add('shown')
        document.querySelector('.parallax__live').classList.add('shown')
    }, 300);

    if (window.innerWidth < 769) {
        document.querySelector('body').classList.remove('overflow-hidden')
        window.addEventListener('scroll', () => {
            animOnScrollMobile()
        }, { passive: true })
    }
    else {
        document.querySelector('body').addEventListener('wheel', wheelEvent, { passive: false })
        document.querySelector('body').addEventListener('keydown', keyDownEvent, { passive: false })
    }
});

// -----------------------------------------------------------------

function wheelEvent(e) { 
    e.preventDefault()
    e.stopPropagation()
    if (isScrollDisabled) return

    //если открыты модалки
    if ( document.querySelector('.call-modal').classList.contains('active') || 
         document.querySelector('.live-modal').classList.contains('active') ||
         document.querySelector('.menu').classList.contains('active') 
    ) return
   
    const scrollDirection = Math.sign(e.deltaY);
    const deltaScroll = Math.floor(e.deltaY)

    wheelActions(deltaScroll, scrollDirection)
}

function wheelActions(deltaScroll, scrollDirection) {
    animOnScroll()
    if (isAboutSliderScrolling) {
        isScrollDisabled = true
        setTimeout(() => {
            isScrollDisabled = false
        }, 600);
        aboutSectionWheel(scrollDirection)
    }
    else {
        mainScroll(deltaScroll, scrollDirection)
        buildingParallaxEffect()
        changeBgColor()
    }
}

function keyDownEvent(e) {
    e = e || window.event;

    var scrollDirection = 0
    const deltaScroll = 30

    if (e.keyCode === 38)
        scrollDirection = -1
    else if (e.keyCode === 40)
        scrollDirection = 1

    if (Math.abs(scrollDirection) !== 1) return

    if ( document.querySelector('.call-modal').classList.contains('active') || 
         document.querySelector('.live-modal').classList.contains('active') ||
         document.querySelector('.menu').classList.contains('active')
    ) return

    wheelActions(deltaScroll * scrollDirection, scrollDirection)
}

//------------------------------------------------------------------

function mainScroll(delta, scrollDirection) {
    //start & end of the page
    if (scrollYVal + delta < 0) {
        setTransform('main', 0)
        return
    }
    if (scrollYVal + delta > document.querySelector('main').clientHeight - window.innerHeight) return

    //showFullScreenAnimation
    if (scrollYVal + delta >= buildingBreakpoint && scrollDirection > 0) {
        showFullScreenAnimation()
    }
    //hideFullScreenAnimation
    if (scrollYVal + delta < buildingBreakpoint && scrollDirection < 0) {
        hideFullScreenAnimation()
    }

    let isReturn = false
    //aboutBeakpoint down
    if (scrollYVal + delta > aboutBeakpoint.value - window.innerHeight && !aboutBeakpoint.isPassed && scrollDirection > 0) {
        setTransform('main', aboutBeakpoint.value - window.innerHeight)
        isReturn = true
        disableWheel(1000)
        document.querySelector('.about').querySelectorAll('.anim-item').forEach(el => el.classList.add('anim-active'))
        setTimeout(() => {
            isAboutSliderScrolling = true
        }, 300);
    }
    //aboutBeakpoint up
    if (scrollYVal + delta < aboutBeakpoint.value - window.innerHeight && aboutBeakpoint.isPassed && scrollDirection < 0) {
        setTransform('main', aboutBeakpoint.value - window.innerHeight)
        isReturn = true
        isAboutSliderScrolling = true
        disableWheel(500)
    }

    if (isReturn) return

    addTransform('main', delta)
    headerEffects(scrollDirection)
}

//------------------------------------------------------------------

function headerEffects(scrollDirection) {
    if (scrollYVal > document.querySelector('header').clientHeight && scrollDirection > 0) {
        document.querySelector('header').classList.remove('shown')
    }
    if (scrollDirection < 0) {
        document.querySelector('header').classList.add('shown')
    }
}

//------------------------------------------------------------------

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

function buildingParallaxEffect() {
    const currMainScroll = getTransformValue('main')
    if (currMainScroll > -buildingBreakpoint) {
        if (currMainScroll % 10 === 0)
            document.querySelector('.parallax__building').style.marginTop = `${ -currMainScroll }px`
    }
}

//------------------------------------------------------------------

function changeBgColor() {
    if (scrollYVal > mapTopOffset + window.innerHeight / 2) {
        document.querySelector('main').classList.add('dark')
        document.querySelector('header').classList.add('dark')
    } else {
        document.querySelector('main').classList.remove('dark')
        document.querySelector('header').classList.remove('dark')
    }
}

function changeBgColorMobile() {
    if (window.pageYOffset > mapTopOffset + window.innerHeight / 2) {
        document.querySelector('main').classList.add('dark')
    } else {
        document.querySelector('main').classList.remove('dark')
    }
}

//------------------------------------------------------------------

function aboutSectionWheel(scrollDirection) {
    if (scrollDirection > 0)
        if (aboutSliderScrollCounter >= -1 && aboutSliderScrollCounter < aboutImgs.length - 2) {
            aboutSliderScrollCounter ++
            aboutImgs[aboutSliderScrollCounter].classList.add('hide')
        } else {
            setTimeout(() => {
                isAboutSliderScrolling = false
                aboutBeakpoint.isPassed = true
            }, 500);
        }
    else if (aboutSliderScrollCounter > 0 ) {
        aboutSliderScrollCounter = -1
        aboutImgs.forEach(img => img.classList.remove('hide'))
    } else {
        setTimeout(() => {
            isAboutSliderScrolling = false
            aboutBeakpoint.isPassed = false
            hideFullScreenAnimation()
            setTransform('main', buildingBreakpoint)
        }, 500);
    }
}

// ------------------------------------------------------------------

function animOnScrollMobile() {
    changeBgColorMobile()

    const animItems = document.querySelectorAll('.anim-item');

    for (let index = 0; index < animItems.length; index++) {
        const item = animItems[index];
        const animItemHeight = item.offsetHeight;
        const animItemOffsetTop = topOffset(item);
        const animStart = 2;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if (window.pageYOffset > animItemOffsetTop + animItemPoint) {
            item.classList.add('anim-active');
        } 
    }
}

function animOnScroll() {
    const animItems = document.querySelectorAll('.anim-item');

    for (let index = 0; index < animItems.length; index++) {
        const item = animItems[index];
        // const animItemHeight = item.offsetHeight;
        const animItemOffsetTop = item.getBoundingClientRect().top;

        const animStartPoint = item.classList.contains('about__title') ? -400 : window.innerHeight / 2
        if (scrollYVal > animItemOffsetTop + animStartPoint ) {
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
                    }, 3200);
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
        div.style = `transform: translateY(100%); transition: transform .75s ease-in-out ${ind / 10}s`
        
        div.innerHTML = letter === ' ' ? '&nbsp;' : letter;                  
        item.append(div)
    })
    item.classList.add('anim-title-active')
    setTimeout(() => {
        item.classList.add('anim-active')
    }, 100);
}

window.onbeforeunload = function() {
    document.querySelector('main').classList.remove('smooth')
    setTransform('main', 0)
};

// window.addEventListener('resize', () => {
//     document.querySelector('main').classList.remove('smooth')
//     setTransform('main', 0)
//     location.reload()
// })
