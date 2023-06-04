var isScrollDisabled = false
var isAboutSliderScrolling = false
var aboutSliderScrollCounter = -1
var scrollYVal = 0
const buildingBreakpoint = 150
const buildingStartOffset = 200

const parallaxTopOffset = document.querySelector('.parallax__img-wrapper').getBoundingClientRect().top - buildingStartOffset
const placesTopOffset = document.querySelector('.places').getBoundingClientRect().top

const imgBreakpoint = { value: 150, isPassed: false }
const aboutBeakpoint = { value: placesTopOffset, isPassed: false }

const aboutImgs = document.querySelectorAll('.about__img')

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
            animOnScroll()
        }, { passive: true })
    }
    else {
        document.querySelector('body').addEventListener('wheel', wheelEvent, { passive: false })
        document.querySelector('body').addEventListener('keydown', keyDownEvent, { passive: false })
    }
});

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

    // showAboutSection()
    if (isAboutSliderScrolling) {
        isScrollDisabled = true
        setTimeout(() => {
            isScrollDisabled = false
        }, 1000);
        aboutSectionWheel(scrollDirection)
    }
    else {
        mainScroll(deltaScroll, scrollDirection)
        buildingParallaxEffect()
    }
}

//------------------------------------------------------------------

function mainScroll(delta, scrollDirection) {
    if (scrollYVal + delta < 0) {
        setTransform('main', 0)
        return
    }

    let isReturn = false
    if (scrollYVal + delta >= imgBreakpoint.value && !imgBreakpoint.isPassed && scrollDirection > 0) { //учесть обратный скролл !!
        setTransform('main', imgBreakpoint.value)
        disableWheel(1000)
        setTimeout(() => {
            imgBreakpoint.isPassed = true
        }, 300);
        showFullScreenAnimation()
        isReturn = true
    }
    if (scrollYVal + delta <= imgBreakpoint.value && imgBreakpoint.isPassed && scrollDirection < 0) {
        setTransform('main', imgBreakpoint.value)
        disableWheel(1000)
        setTimeout(() => {
            imgBreakpoint.isPassed = false
        }, 300);
        hideFullScreenAnimation()
        isReturn = true
    }
    if (scrollYVal + delta > aboutBeakpoint.value - window.innerHeight && !aboutBeakpoint.isPassed && scrollDirection > 0) {
        setTransform('main', aboutBeakpoint.value - window.innerHeight)
        isReturn = true
        disableWheel(1000)
        setTimeout(() => {
            isAboutSliderScrolling = true
        }, 300);
    }
    if (scrollYVal + delta < aboutBeakpoint.value - window.innerHeight && aboutBeakpoint.isPassed && scrollDirection < 0) {
        setTransform('main', aboutBeakpoint.value - window.innerHeight)
        isReturn = true
        disableWheel(500)
        hideFullScreenAnimation()
        setTransform('main', 150)
    }

    if (isReturn) return

    addTransform('main', delta)


    if (scrollYVal > document.querySelector('header').clientHeight && scrollDirection > 0)
        document.querySelector('header').classList.remove('shown')
    if (scrollDirection < 0)
        document.querySelector('header').classList.add('shown')
}

//------------------------------------------------------------------

function buildingParallaxEffect() {
    const currMainScroll = getTransformValue('main')
    if (currMainScroll > -buildingBreakpoint) {
        document.querySelector('.parallax__building').style.marginTop = `${ -currMainScroll }px`
    }
}

//------------------------------------------------------------------

function showFullScreenAnimation() {
    const parallaxSection = document.querySelector('.parallax');
    const parallaxWrapper = parallaxSection.querySelector('.parallax__img-wrapper');

    parallaxWrapper.classList.add('full')
    parallaxSection.querySelector('.parallax__live').classList.add('hide')
    parallaxSection.querySelector('.parallax__building').classList.add('hide')
    document.querySelector('.baner__hero').classList.remove('shown')

    parallaxWrapper.style.transform = `translateY(-${parallaxTopOffset - buildingBreakpoint}px)`
}

function hideFullScreenAnimation() {
    const parallaxSection = document.querySelector('.parallax');
    const parallaxWrapper = parallaxSection.querySelector('.parallax__img-wrapper');

    parallaxWrapper.classList.remove('full')
    parallaxSection.querySelector('.parallax__live').classList.remove('hide')
    parallaxSection.querySelector('.parallax__building').classList.remove('hide')
    document.querySelector('.baner__hero').classList.add('shown')

    parallaxWrapper.style.transform = `translateY(0px)`
}

//------------------------------------------------------------------

function showAboutSection() {
    if (scrollYVal > window.innerHeight / 2) { //aboutTopOffset
        const aboutSection = document.querySelector('.about')
        aboutSection.querySelectorAll('.about__title').forEach(el => el.classList.add('shown'))
        // aboutSection.querySelectorAll('.anim-item').forEach(el => el.classList.add('anim-active'))
    }
}

//------------------------------------------------------------------

//about animation index === 3
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
        }, 500);
    }
}

//places animation index === 4
function placesSectionWheel(direction) {
    const placesSection = document.querySelector('.places')
    setTimeout(() => {
        placesSection.querySelectorAll('.anim-item').forEach(el => el.classList.add('anim-active'))
    }, 500);

    if (window.scrollY <= 0 && direction < 0) {
        if (prevScreen(-5)) {
            document.querySelector('body').classList.add('overflow-hidden')
            changeScreen(-1)
            placesSection.querySelectorAll('.anim-item').forEach(el => el.classList.remove('anim-active'))
            setTimeout(() => {
                const aboutSection = document.querySelector('.about')
                aboutSection.querySelectorAll('.about__title').forEach(el => el.classList.add('shown'))
                aboutSection.querySelectorAll('.anim-item').forEach(el => el.classList.add('anim-active'))
                placesSection.querySelectorAll('.anim-item').forEach(el => el.classList.remove('anim-active'))
            }, 100);
            const speed = 8

            const maxTransform = document.querySelector('.about__slider').offsetHeight - document.querySelector('.about__slider-wrapper').offsetHeight
            scrollYVal = maxTransform / speed - 30
        }
    }
}

function keyDownEvent(e) {
    e = e || window.event;

    var scrollDirection = 0
    if (e.keyCode === 38)
        scrollDirection = -1
    else if (e.keyCode === 40)
        scrollDirection = 1

    if (Math.abs(scrollDirection) !== 1) return

    if ( document.querySelector('.call-modal').classList.contains('active') || 
         document.querySelector('.live-modal').classList.contains('active') ||
         document.querySelector('.menu').classList.contains('active')
    ) return

    const scrollStep = 5
    const newScrollVal = scrollYVal + scrollDirection * scrollStep
    if (newScrollVal >= -10) {
        scrollYVal = newScrollVal
    }

    if (activeSectionIndex === 1)
        banerSectionWheel()
    if (activeSectionIndex === 2)
        fullImgSectionWheel()
    if (activeSectionIndex === 3)
        aboutSectionWheel()
    if (activeSectionIndex === 4)
        placesSectionWheel(scrollDirection)

}

function animOnScroll() {
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

            if ((window.pageYOffset > animItemOffsetTop - animItemPoint) && (window.pageYOffset < animItemOffsetTop + animItemHeight))
            {
                item.classList.add('anim-active');
            } else {
                item.classList.remove('anim-active');
            }
    }
}