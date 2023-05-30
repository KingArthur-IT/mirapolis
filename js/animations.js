var scrollYVal = 0
var activeSectionIndex = 1
var isScrollDisabled = false

const disableWheel = (ms) => {
    isScrollDisabled = true
    setTimeout(() => {
        isScrollDisabled = false
    }, ms);
}

const nextScreen = (max) => {
    if (scrollYVal > max) {
        scrollYVal = 0
        activeSectionIndex ++
        disableWheel(1000)
        return true
    } return false
}
const prevScreen = (min) => {
    if (scrollYVal < min) {
        scrollYVal = 0
        activeSectionIndex --
        disableWheel(1000)
        return true
    } return false
}

const anchorJump = (anchor) => {
    setTimeout(() => {
        document.getElementById(anchor).scrollIntoView({ alignToTop: true, behavior: "smooth" })
    }, 0);
    setTimeout(() => {
        document.getElementById(anchor).scrollIntoView({ alignToTop: true, behavior: "smooth" })
    }, 1000);
}

const offset = (el) => {
    const rect = el.getBoundingClientRect()
    return { top: rect.top, left: rect.left  } 
}

const noScroll = (ms) => {
    document.querySelector('body').classList.add('overflow-hidden')
    setTimeout(() => {
        document.querySelector('body').classList.remove('overflow-hidden')
    }, ms);
}

window.addEventListener("load", () => {
    //baner start animations
    setTimeout(() => {
        document.querySelector('.baner__title').classList.add('shown')
        document.querySelector('.baner__label').classList.add('shown')
        document.querySelector('.header').classList.add('shown')
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
    if (isScrollDisabled) {
        e.preventDefault()
        e.stopPropagation()
        return
    }
    const isMouseWheel = !(Math.abs(e.wheelDeltaY) % 120 != 0 || Math.abs(e.wheelDeltaY) == Math.abs(e.deltaY))

    const scrollDirection = Math.sign(e.deltaY);
    const scrollStep = isMouseWheel ? 5 : 1
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
        placesSectionWheel()
}

//baner animation index === 1
function banerSectionWheel() {
    document.querySelector('.parallax__building').style.marginTop = `${ scrollYVal * 3 }px`
    nextScreen(50)
}

//img full animation index === 2 
function fullImgSectionWheel() {
    //on show
    const parallaxSection = document.querySelector('.parallax');
    const parallaxWrapper = parallaxSection.querySelector('.parallax__img-wrapper');
    const animItemOffsetTop = offset(parallaxSection).top;

    parallaxWrapper.classList.add('full')
    parallaxSection.querySelector('.parallax__live').classList.add('hide')
    parallaxSection.querySelector('.parallax__building').classList.add('hide')
    document.querySelector('.baner__hero').classList.remove('shown')
    document.querySelector('.header').classList.remove('shown')

    parallaxWrapper.style.transform = `translateY(-${animItemOffsetTop}px)`

    if (nextScreen(30)) {
        anchorJump('about')
        setTimeout(() => {
            const aboutSection = document.querySelector('.about')
            aboutSection.querySelectorAll('.about__title').forEach(el => el.classList.add('shown'))
            aboutSection.querySelectorAll('.anim-item').forEach(el => el.classList.add('anim-active'))
        }, 500);
    }
    if (prevScreen(-5)) {
        parallaxWrapper.classList.remove('full')
        parallaxSection.querySelector('.parallax__live').classList.remove('hide')
        parallaxSection.querySelector('.parallax__building').classList.remove('hide')
        parallaxWrapper.style.transform = `translateY(0px)`
        document.querySelector('.baner__hero').classList.add('shown')
        document.querySelector('.header').classList.add('shown')
        setTimeout(() => {
            document.querySelector('.parallax__building').style.marginTop = `0px`
        }, 500);
    }   
}

//about animation index === 3
function aboutSectionWheel() {
    const speed = 6
    const maxTransform = document.querySelector('.about__slider').offsetHeight - document.querySelector('.about__slider-wrapper').offsetHeight
    const aboutSection = document.querySelector('.about')

    if (scrollYVal > 10 && scrollYVal < maxTransform / speed + 30) {
        document.querySelector('.about__slider').style.transform = `translateY(${ 15 * speed - speed * scrollYVal }px)`
    }

    if (nextScreen(maxTransform / speed + 100)) {
        anchorJump('places')
        setTimeout(() => {
            aboutSection.querySelectorAll('.about__title').forEach(el => el.classList.remove('shown'))
            aboutSection.querySelectorAll('.anim-item').forEach(el => el.classList.remove('anim-active'))
        }, 500);
    }

    if (prevScreen(-5)) {
        aboutSection.querySelectorAll('.about__title').forEach(el => el.classList.remove('shown'))
        aboutSection.querySelectorAll('.anim-item').forEach(el => el.classList.remove('anim-active'))
        document.querySelector('.about__slider').style.transform = `translateY(0px)`

        anchorJump('baner')
    }
}

//places animation index === 4
function placesSectionWheel() {
    const placesSection = document.querySelector('.places')
    setTimeout(() => {
        placesSection.querySelectorAll('.anim-item').forEach(el => el.classList.add('anim-active'))
    }, 500);

    const offsetVal = offset(document.querySelector('.places'))
    if (offsetVal.top <= 0)
        document.querySelector('body').classList.remove('overflow-hidden')
    else {
        if (prevScreen(-5)) {
            document.querySelector('body').classList.add('overflow-hidden')
            anchorJump('about')
            placesSection.querySelectorAll('.anim-item').forEach(el => el.classList.remove('anim-active'))
            setTimeout(() => {
                const aboutSection = document.querySelector('.about')
                aboutSection.querySelectorAll('.about__title').forEach(el => el.classList.add('shown'))
                aboutSection.querySelectorAll('.anim-item').forEach(el => el.classList.add('anim-active'))
            }, 500);
            const speed = 6
            const currTransformValue = Number(document.querySelector('.about__slider').style.transform.replace(/[^-\d]/g, ''))
            scrollYVal = 15 - currTransformValue / speed
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

    const scrollStep = 20
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
        placesSectionWheel()

}

function animOnScroll() {
    const animItems = document.querySelectorAll('.anim-item');

    for (let index = 0; index < animItems.length; index++) {
        const item = animItems[index];
        const animItemHeight = item.offsetHeight;
        const animItemOffsetTop = offset(item).top;
        const animStart = 2;

        let animItemPoint = window.innerHeight - 100 //animItemHeight / animStart;
        // if (animItemHeight > window.innerHeight) {
        //     animItemPoint = window.innerHeight - window.innerHeight / animStart;
        // }
        
        if (animItemOffsetTop < animItemPoint)
            item.classList.add('anim-active');
        else item.classList.remove('anim-active');
    }

    const aboutTitles = document.querySelectorAll('.about__title')

    for (let index = 0; index < aboutTitles.length; index++) {
        const item = aboutTitles[index];
        const animItemHeight = item.offsetHeight;
        const animItemOffsetTop = offset(item).top;
        const animStart = 2;

        let animItemPoint = window.innerHeight - 100 //animItemHeight / animStart;
        // if (animItemHeight > window.innerHeight) {
        //     animItemPoint = window.innerHeight - window.innerHeight / animStart;
        // }
        
        if (animItemOffsetTop < animItemPoint)
            item.classList.add('shown');
        else item.classList.remove('shown');
    }
}