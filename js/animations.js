window.addEventListener("load", () => {
    //baner start animations
    document.querySelector('.baner__title').classList.add('shown')
    document.querySelector('.baner__label').classList.add('shown')
    document.querySelector('.header').classList.add('shown')
    document.querySelector('.baner__hero').classList.add('shown')
    document.querySelector('.parallax').classList.add('shown')

    let lastScrollValue = 0
    let isDownScrollDirection = true

    window.addEventListener('scroll', () => {
        isDownScrollDirection = window.pageYOffset - lastScrollValue > 0
        lastScrollValue = window.pageYOffset

        fullScreenAnimation()

        const aboutSection = document.querySelector('.about')
        const animItemOffsetTop = offset(aboutSection).top;
        const height = 200
        const isParallaxPasses = document.querySelector('.parallax__img-wrapper').classList.contains('passed')
        const isMovingPasses = document.querySelector('.parallax').classList.contains('moved')

        const offsetVal = animItemOffsetTop - window.innerHeight + height
        if (offsetVal < 0 && isDownScrollDirection && isParallaxPasses && !isMovingPasses) {
            noScroll(1000)
            document.querySelector('.parallax').classList.add('moved')
        } 
        if (offsetVal > -100 && !isDownScrollDirection && isParallaxPasses && isMovingPasses) {
            noScroll(1000)
            document.querySelector('.parallax').classList.remove('moved')
        }
    })
});

function offset(el) {
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top, left: rect.left + scrollLeft }
    // return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function noScroll(ms) {
    document.querySelector('body').classList.add('overflow-hidden')
    setTimeout(() => {
        document.querySelector('body').classList.remove('overflow-hidden')
    }, ms);
}

function fullScreenAnimation() {
    const parallaxSection = document.querySelector('.parallax');
    const parallaxWrapper = parallaxSection.querySelector('.parallax__img-wrapper');

    if (window.innerWidth < 768) return
  
        const animItemHeight = parallaxSection.offsetHeight;
        const animItemOffsetTop = offset(parallaxSection).top;
        const animStart = 2;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;

        //building anim
        if (window.pageYOffset < animItemPoint) {
            parallaxSection.querySelector('.parallax__building').style.marginTop = `${window.pageYOffset}px`
        }
        //fullscreen img animation
        const hasFullClass = parallaxWrapper.classList.contains('full')
        if (window.pageYOffset > animItemOffsetTop - animItemPoint) { //&& (window.pageYOffset < animItemOffsetTop + animItemHeight)
            if (!hasFullClass) {
                parallaxWrapper.classList.add('full')
                parallaxSection.querySelector('.parallax__live').classList.add('hide')
                parallaxSection.querySelector('.parallax__building').classList.add('hide')
                parallaxWrapper.style.transform = `translateY(-${animItemOffsetTop}px)`
                document.querySelector('body').classList.add('overflow-hidden')
                setTimeout(() => {
                    document.querySelector('body').classList.remove('overflow-hidden')
                    parallaxWrapper.classList.add('passed')
                }, 1000);
            }
        }
        else if (hasFullClass) {
            parallaxWrapper.classList.remove('full')
            parallaxSection.querySelector('.parallax__live').classList.remove('hide')
            parallaxSection.querySelector('.parallax__building').classList.remove('hide')
            parallaxWrapper.style.transform = `translateY(0px)`
            parallaxWrapper.classList.remove('passed')
            document.querySelector('.parallax').classList.remove('moved')
        }
}