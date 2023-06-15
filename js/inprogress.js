var isScrollDisabled = false
var isAboutSectionDelay = false
var isAboutSliderScrolling = false
var aboutSliderScrollCounter = -1
var scrollYVal = 0
var mouseYVal = 0
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
        }, 400);
        document.querySelector('.baner__hero').classList.add('shown')
        document.querySelector('.parallax').classList.add('shown')
        document.querySelector('.parallax__live').classList.add('shown')
    }, 300);

    if (window.innerWidth < 769) {
        document.querySelector('body').classList.remove('overflow-hidden')
        window.addEventListener('scroll', () => {
            animOnScrollMobile()
        }, { passive: true })
        document.addEventListener("touchmove", touchMoveHandler); 
    }
    else {
        document.querySelector('body').addEventListener('wheel', wheelEvent, { passive: false })
        document.querySelector('body').addEventListener('keydown', keyDownEvent, { passive: false })
    }
});

// -----------------------------------------------------------------



function touchMoveHandler(e) {
    // let evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
    // let touch = evt.touches[0] || evt.changedTouches[0];
    
    const offset = -topOffset(document.querySelector('.baner'))
    const deltaY = Math.sign(offset - mouseYVal)
    mouseYVal = offset

    headerEffects(mouseYVal, deltaY)
    if (mouseYVal < 30) {
        if (mouseYVal % 10 === 0)
            document.querySelector('.parallax__building').style.marginTop = `${ mouseYVal }px`
    }
    //showFullScreenAnimation
    if (mouseYVal >= 30 && deltaY > 0) {
        showFullScreenAnimation()
    }
    //hideFullScreenAnimation
    if (scrollYVal < 30 && deltaY < 0) {
        hideFullScreenAnimation()
    }
}

//------------------------------------------------------------------

function mainScroll(delta, scrollDirection) {
    //start & end of the page
    if (scrollYVal + delta < 0) {
        setTransform('main', 0)
        return
    }
    if (scrollYVal + delta > document.querySelector('main').clientHeight - window.innerHeight) return

    if (window.innerWidth > 1240) {
        //showFullScreenAnimation
        if (scrollYVal + delta >= buildingBreakpoint && scrollDirection > 0) {
            showFullScreenAnimation()
        }
        //hideFullScreenAnimation
        if (scrollYVal + delta < buildingBreakpoint && scrollDirection < 0) {
            hideFullScreenAnimation()
        }
    }

    let isReturn = false
    //aboutBeakpoint down
    if (scrollYVal + delta > aboutBeakpoint.value - window.innerHeight && !aboutBeakpoint.isPassed && scrollDirection > 0) {
        setTransform('main', aboutBeakpoint.value - window.innerHeight)
        isReturn = true
        document.querySelector('#cursor').classList.add('scroll')
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
        document.querySelector('#cursor').classList.add('scroll')
        isAboutSliderScrolling = true
        disableWheel(500)
    }

    if (isReturn) return

    addTransform('main', delta)
    headerEffects(scrollYVal, scrollDirection)
}


//------------------------------------------------------------------



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
            if (!isAboutSectionDelay) {
                isAboutSectionDelay = true
                aboutSliderScrollCounter ++
                aboutImgs[aboutSliderScrollCounter].classList.add('hide')
                setTimeout(() => {
                    isAboutSectionDelay = false
                }, 1000);
            }
        } else {
            setTimeout(() => {
                isAboutSliderScrolling = false
                document.querySelector('#cursor').classList.remove('scroll')
                aboutBeakpoint.isPassed = true
            }, 500);
        }
    else if (aboutSliderScrollCounter > 0 ) {
        aboutSliderScrollCounter = -1
        aboutImgs.forEach(img => img.classList.remove('hide'))
    } else {
        setTimeout(() => {
            isAboutSliderScrolling = false
            document.querySelector('#cursor').classList.remove('scroll')
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



window.onbeforeunload = function() {
    document.querySelector('main').classList.remove('smooth')
    setTransform('main', 0)
};

// window.addEventListener('resize', () => {
//     document.querySelector('main').classList.remove('smooth')
//     setTransform('main', 0)
//     location.reload()
// })
